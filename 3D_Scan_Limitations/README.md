# Medical 3D Scan: iPhone failure and investigation kit

Updated **October 12, 2026**. **GPU volume rendering remains unresolved on iPhone:** opaque black/white cubes, stripes or noise despite passing desktop checks. The default uses real CT/MRI data as 48 transparent axial planes, with bands and weak edge-on visibility. Owner feedback confirms improved fallback visibility, not ray marching or complete device acceptance.

Code/scan PNGs: [tested app commit][app] `e1a0042aba53959018f7cba78e85d9dc41affc63`. This kit supplies missing evidence. [MANIFEST.json](MANIFEST.json) records versions, sizes, SHA-256 hashes, provenance and technical coverage; external-source hashes identify Git blob bytes. Original Slicer bundle, duplicate app and credentials are excluded.

Verify downloaded evidence and the pinned checkout with `node "<KIT_DIRECTORY>/repro/verify-package.cjs" "<APP_CHECKOUT>"` (omit the checkout argument for evidence-only verification).

## Data and intended rendering

| Item | Specification |
| --- | --- |
| Source | Slicer 5.12.4 `2026-10-08-Scene.mrb`: **CT Head**, registered **MRI_Elastix**. CT correction once; MRI registration not reapplied; source nodes preserved. |
| Provenance | NLM Visible Human Project Additional Head Images; NLM / BWH / Harvard, Peter Ratiu et al. Full attribution, URL and scene hash: manifest. |
| Original / export | Each source 512 × 512 × 463 at approximately 0.489 × 0.489 × 0.503 mm; common world-RAS grid **160 × 160 × 149**, isotropic **1.574841145 mm**, 3,814,400 samples/modality (3.14% of original count). |
| Scalar atlases | Six RGBA8 PNGs, **11,822,292 bytes** (11.27 MiB): high/low uint16 bytes and validity in **alpha**, bypassing sRGB color conversion. Decode `high.a*65280 + low.a*255`, apply offset/scale; normalize interpolated codes by validity. |
| Packing | 2106 × 1944; 13 columns, 149 tiles of 162 × 162 including one-pixel repeated-edge gutters. Linear filtering, adjacent-tile interpolation, clamp, no mipmaps. Grid Z/Y/X increase S/A/R; Viro maps `(R,S,-A)` about the grid midpoint. |
| Quantization | Max error MRI **0.0711243** signal units; CT **0.0253285 HU**. Matrices, transforms, bounds, scalar ranges/decoding: [metadata](evidence/data/volumes-metadata.json). |
| Intended shader | One proxy box; ray/box intersection, trilinear sampling, front-to-back premultiplied accumulation converted to straight-alpha output, step-corrected opacity, early termination, approximate gradient lighting and grayscale crop-entry faces. Viro supplies model/camera transforms; avoid unsupported custom vec2/matrix updates. |
| Placement / quality | Longest extent 55 cm; initial center two feet (0.6096 m) above the surface; yaw 135°. Fast 96 / Balanced 192 ray samples. Constant lighting, Alpha blend, front-face culling, depth reads on / writes off. |
| Presets | MRI window/level **5589/2671.5**, threshold 0.1; CT Bone **1800/400**, threshold 0.4; CT Soft Tissue **150/40**, threshold 0.1. Transfer functions, opacity-per-mm and crop-face formula are retained in metadata and [shader source][shader]. |

The half-head was the planned left-midpoint crop, not a partial export. New sessions, Reset Scan and Full Scan now restore full bounds. Metadata `defaults` is historical; [current defaults][defaults] is authoritative.

## Trials, corrections and remaining uncertainty

| Stage | Evidence and result |
| --- | --- |
| First native trial | [MRI](evidence/device/IMG_3669.png), [CT](evidence/device/IMG_3670.png): opaque black/white geometry instead of anatomy. |
| Precision fix | `highp` samplers **and intermediates** before uint16 arithmetic; destination precision alone is insufficient. Harness added native Constant GLSL/full-range/transform checks. [MRI](evidence/device/IMG_3676.png), [CT](evidence/device/IMG_3677.png): still white. |
| Material-copy fix | `materials` clones `VROMaterial` without custom textures. `shaderOverrides` copies samplers, float/vec3/vec4 and authored lighting/blend/cull/depth. Source/binary/wiring checks corroborate the omission; [next trial](evidence/device/IMG_3682.png) still failed. |
| Diagnostics / ordering | Nine stages, scoped probes/errors, 30-second deadline; geometry deferred two frames. Registration has no native acknowledgement. Load success and `VRTMaterialManager lookup: FOUND` do not prove drawing. |
| Initial fallback | [MRI](evidence/device/IMG_3685.png): dark, partial head; [CT](evidence/device/IMG_3686.png): faint. Later owner feedback: “a bit better” after visibility changes. |

Committed history: feature `e798b542…`, fallback/visibility `5ad11b4b…`, tested revision `e1a0042a…`. Caption changed from “Stacked-slice visualization · temporary fallback” to “3D preview · scan layers”; method unchanged. Historical rendering reports: manifest.

**Runtime:** owner identified `839c8e3`; EAS build `02d480be-4fe7-468c-8be2-539da629e826`, created October 10, 9:28 PM Eastern / October 11 **01:28:50 UTC**. [Original pod record](evidence/build/viro-pod-install-excerpt.jsonl): `Installing ViroReact (3.0.3)`, **01:29:44 UTC**. [Metadata](evidence/build/build-metadata.json) retains full commit, SDK 57/app 1.0.0/build 1. No direct phone-binary interrogation or native version getter; evidence supports the identified build, not current installation. Fixes changed JS/GLSL/assets, without native dependency/configuration changes or new EAS builds.

**[Native sources](native):** VRTNode/material manager, VROMaterial, all Constant GLSL resources, iOS image decoding, OpenGL blending, compiler and logging; licenses included. Core pin `e75ddffc19ea8d006baab434fca495e68556a31b`. Manifest records the rechecked arm64 binary hash and npm integrity; `npm ci` retrieves that binary.

Unresolved candidates: modifier application, compiler/driver, binding, uniforms/transforms, registration. All-white samplers causing saturated scalar/opacity is a hypothesis. Isolate the first failing device stage; don't repeat fixes without new evidence.

## Workaround and constraints

The generator decodes the validated atlases into **48 × 160 × 160** RGBA planes per MRI/Bone/Soft preset: 144 PNGs, **1,235,361 bytes** (1.178 MiB). Axial indices span 0–148 at every third/fourth grid sample: **4.72/6.30 mm** separation. R/A crops change quad size/UVs; S crops exclude planes. Native quads require four flat UV scalars despite the nested TypeScript declaration. Depth order reverses across the plane normal; two-sided Constant/Alpha materials read depth but do not write it.

| Visibility parameter | Original fallback | Current |
| --- | --- | --- |
| Baked alpha × validity | `min(.22, density*.35)`; max 56/255 | `min(.40, density*.70)`; max 102/255 |
| Appearance → node opacity | 1 → 0.5 | 1.6 → 0.8; Transparency 20% |
| Strong-tissue effective alpha/plane | ≈0.11 | ≈0.32 |

iOS UIImage decoding premultiplies encoded RGB (`kCGImageAlphaPremultipliedLast`); the examined diffuse/Alpha path multiplies alpha again, causing darkening. The [iOS-only correction][color] converts sampled linear RGB to encoded sRGB, divides by **source texture alpha**, then converts back, keeping node opacity separate. Android bypasses it. The initial fallback had no custom shader; the current small fragment modifier uses ordinary diffuse textures, **no custom atlas samplers/uniforms or proxy box**. Its measured contribution to photographed faintness is unknown.

Preserved: modality/presets, transparency, six crops, independent transforms, one AR scene/anchor and ownership/navigation. Session/placement/request scopes reject stale events; lifecycle revokes magenta confirmation; updates coalesce/frame; exit cancels pending work and deletes bounded `medicalVolume` / `medicalStack0..47` materials.

Limits: axial bands/gaps and edge-on fading; additional reduction from the source to the exported grid to 48 planes; eight-bit baked appearance; no interactive window/level or ray-quality effect; no continuously sampled crop caps; thin S crops can contain zero planes. Decoded RGBA is **4.6875 MiB/preset**, 14.0625 MiB/all presets, versus about **46.85 MiB** for one modality's three atlases, before other resources. Native image/material-definition caches persist; deletion is not eviction. Denser/multi-axis stacks or another native renderer are unimplemented options with performance/feasibility costs.

## Results and reproduction

Historical checks: corrected shader **189** unit tests; fallback/visibility **195** (14 AR + 108 Qubit + 73 medical), lint/formatting/TypeScript, GPU fixtures, Expo Doctor **21/21**, MDS **100/100** with seven existing unrelated warnings; visibility iOS export **336 assets** and whitespace checks. Slicer spatial/packing tests **14/14**, source hashes unchanged. `build:ios` means Expo JS/Hermes/asset export, not an Xcode/device test.

**October 12 regeneration:** [86/86 medical tests](evidence/desktop/test-medical.log), [shader output](evidence/desktop/test-medical-shader.log), [fresh-checkout reproduction](evidence/desktop/fresh-checkout-reproduction.log), [synthetic](evidence/desktop/shader-proof.json), [real scalar](evidence/desktop/real-shader-proof.json), [nine-stage](evidence/desktop/diagnostics-proof.json), [48-probe color](evidence/desktop/stack-color-proof.json), [stack](evidence/desktop/stack-proof.json) proofs. Exact errors: JSON. Color fixture: white texel/source alpha 56/255/node 0.8 gives RGB **10→255**, alpha unchanged **45/255**. Shader/stack previews: [MRI](evidence/desktop/mri-grayscale-shader.png) / [layers](evidence/desktop/mri-grayscale-stack.png), [Bone](evidence/desktop/ct-bone-shader.png) / [layers](evidence/desktop/ct-bone-stack.png), [Soft](evidence/desktop/ct-soft-tissue-shader.png) / [layers](evidence/desktop/ct-soft-tissue-stack.png).

WebGL2/ANGLE SwiftShader manually binds textures using installed iOS GLSL; it bypasses native cloning/queues/UIImage/caches/Apple GPU. Native logs, successful staged phone proof, FPS/memory and original Slicer reference previews are unavailable.

From any new working directory, using **Node 24.16.0/npm 10.9.8** (the recorded environment):

```sh
git clone --config core.autocrlf=false https://github.com/DavidJGrimsley/xr-showcase.git xr-showcase
cd xr-showcase
git checkout --detach e1a0042aba53959018f7cba78e85d9dc41affc63
npm ci
npm run test:medical
```

The pinned app lockfile provides `playwright-core@1.64.0` transitively. For explicit isolation, run `npm ci` in this kit's `repro` directory. From the **app checkout**:

```powershell
# PowerShell: replace placeholders with your own paths.
$env:NODE_PATH = '<KIT_DIRECTORY>/repro/node_modules'
$env:MEDICAL_TEST_BROWSER = '<CHROMIUM_EXECUTABLE>'
npm run test:medical:shader
```

```sh
# macOS/Linux equivalent; executable must be Chromium-compatible.
NODE_PATH='<KIT_DIRECTORY>/repro/node_modules' MEDICAL_TEST_BROWSER='<CHROMIUM_EXECUTABLE>' npm run test:medical:shader
```

Recorded browser: Chrome **154.0.8037.99**; requires WebGL2 float rendering. Outputs: `.expo/medical-volumes`. [Generators][tools] require NumPy; source re-export/spatial tests also need Slicer/original scene. Renderer debugging/layer regeneration need only exported data. Preserve the **48-plane** readiness limit; format source metadata first because layers hash it.

Phone: ARKit-capable iPhone, **ViroReact 3.0.3 native dev client**; Expo Go/browser/simulator is insufficient. Build EAS `development` with your configuration/signing if needed. Otherwise close/reopen the matching client and connect to `npm start -- --clear --port 8081`; no rebuild for these JS/assets.

1. Place Medical Viewer → 3D Scan. Check full MRI, Bone/Soft, Transparency (initial 20%; toward 0% is denser), all crop directions/Full Scan/Reset Scan, transforms, background/resume, Restart AR and Home/reopening all experiences.
2. **Scan Controls → Diagnostics → Shader tests**. Return to the AR view: first require a uniformly **magenta** proxy with no textures/custom uniforms. Only after actually seeing it select **I see magenta**. Failure here implicates shader application/compilation/mounting before atlas sampling.
3. High/Low/Validity: magenta edge; matching sampled/reference bands; invalid band black. MRI IJK **[99,23,77]**, UV **[.9707977208,.4292695473]**, alpha **68/190/255**, scalar **2056.4223**. CT **[47,91,73]**, UV **[.6384140551,.4642489712]**, alpha **108/171/255**, scalar **209.2258 HU**. Use current panel values after regeneration.
4. Coordinates: R/A/S RGB gradients remain fixed through transforms; camera-origin strip responds to camera. Uniforms: left green (red fails), right crop-min RGB, bottom grayscale responds to Window. Ray: green/cyan hits, magenta misses. Opacity: responds to transparency, black at 100%. Then ray march: actual tissue, transparent surroundings. A white cube still fails.
5. Save the **first failure**, mode/modality, screenshot, request/session, exact iPhone/iOS/client/build and native logs; change one implicated layer at a time. Mac Console → connected iPhone/app process or Xcode device console: capture `Shader compile log:`, `Failed to compile fragment shader`, `Program link log:`, `Failed to link program`, `Material`, `medicalVolume`. Core GL compile/link checks use `NSLog` and are not all forwarded to Metro/JS.
6. After drawing succeeds, measure sustained **≥30 FPS in Fast during 60 seconds** walking around/inside the volume; memory after **1/10/30 modality round trips** and Home/reopen. Exact device identity, FPS, memory and remaining white-cube cause are currently unknown.

[app]: https://github.com/DavidJGrimsley/xr-showcase/tree/e1a0042aba53959018f7cba78e85d9dc41affc63
[shader]: https://github.com/DavidJGrimsley/xr-showcase/blob/e1a0042aba53959018f7cba78e85d9dc41affc63/src/features/medical-viewer/medical-volume-shader.ts
[defaults]: https://github.com/DavidJGrimsley/xr-showcase/blob/e1a0042aba53959018f7cba78e85d9dc41affc63/src/features/medical-viewer/medical-volumes.ts
[color]: https://github.com/DavidJGrimsley/xr-showcase/blob/e1a0042aba53959018f7cba78e85d9dc41affc63/src/features/medical-viewer/medical-stack-color.ts
[tools]: https://github.com/DavidJGrimsley/xr-showcase/tree/e1a0042aba53959018f7cba78e85d9dc41affc63/tools/medical
