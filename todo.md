# XR Showcase TODO

## Bug Fixes & Regressions

- [x] [Bug · Origin: Phase 0] Work around Windows shell parsing of qubit notation in MDS generation arguments; preserve the original canonical notation in project docs.
- [x] [Bug · Origin: Phase 0] Align the generated Expo 56 template with Expo 57/RN 0.86/Viro 3, update compatible starter packages, and deduplicate react-native-screens.
- [x] [Bug · Origin: Phase 0] Fix the generated Settings route importing an auth adapter that its screen does not export.
- [x] [Bug · Origin: Phase 0] Remove the react-doctor script/bin collision and add an iOS export build entry point for CI.
- [x] [Bug · Origin: Phase 0] Review npm audit advisories. The old 31-entry count was stale: current audit fell from 30 to 19 high affected entries after tested URI-decoder/UUID fixes. Remaining upstream advisories are tracked below; no unsupported SDK changes were forced. See [release-health evidence](release-health/README.md).
- [x] [Bug · Origin: Phase 0] Triage the retained developer references. Settings/Stylist/exposition routes and the compiler opt-out are gone; remaining mock tasks and unused adapters were removed. Live theme tokens are retained. React Doctor now has zero errors; current advisories are tracked below.

- [ ] [Bug · Origin: Phase 0] Apply published fixes for `braces` and `node-forge` when available. As of October 12, 2026, neither has a patched release; their dependency chains account for 19 remaining high audit entries. See [advisory triage](release-health/README.md).
- [ ] [Bug · Origin: Phase 5] Address the current React Doctor advisories: 26 warnings, zero errors, across 16 source files. These are current layout/performance/maintainability findings, distinct from the removed starter compiler issues; see [full diagnostics](release-health/react-doctor.json).
- [x] [Bug · Origin: Phase 3] Preserve hashed medical metadata bytes across Windows checkouts. A `.gitattributes` rule fixes CRLF-induced source-hash validation failure; verified with a fresh CRLF-configured checkout.

Add new defects only as `- [ ] [Bug · Origin: Phase N] <concrete defect>`; do not duplicate them in a phase.

## Phase 0 — Orientation And Planning

Product tasks take precedence over retained starter checklist items. SQLite/data/exposition samples are development references; no new app database, public release or remote repository is required for this private prototype.

- [x] Capture the live Unreal Qubit reference, including simulator and hardware modes, in project/references/guess-the-qubit-unreal.md.
- [x] Confirm iOS-first targeting and the scoped Uniwind/Expo UI component policy.
- [x] Verify repaired Expo 57/RN 0.86/Viro 3 dependencies, Uniwind configuration, type checks and iOS JavaScript bundling. See project/setup-validation.md.
- [x] Sign into EAS, verify bundle identifier com.djleg.xrshowcase, register the physical iPhone and build/install the development profile.
- [x] Configure existing Studio credentials privately; inspect Fight Arena scene a46c0453-e96b-4d66-8e4b-1f603e20a274 for model/clip/logic readiness.
- [x] Obtain a licensed CT-derived skull, record provenance, optimize it for mobile and calibrate anatomical label anchors. (deferred for now)
- [x] Confirm existing Quantum API development-key access and backend ibm_kingston/profile Unreal Engine Demos availability without credential administration.


- [x] Confirm the Phase 0 component strategy in `project/info.md` (style library, Expo UI / Universal Components / NativeTabs, and any listed conflicts). Set Decision to confirmed after you review the generated app.
- [x] Review the ejection inventory with `mds eject` and confirm retain/eject decisions for generated starter and template components. Set Decision to confirmed after you finish.
- [x] Browse exposition pages to understand included base packages.
- [x] Review styling in the 'Stylist' page.
- [x] Review `project/` files for accuracy and planning adjustments.
- [x] Run or defer `eject-stylist`; mark this todo done after ejection or deciding to defer (if you want to keep the stylist around for tinkering).
- [x] Run `mds eject` and keep only the generated sections you want to retain.
- [x] Sign in and set up EAS in the terminal.
- [x] Resolve every `# TodoForContext(optional):` marker in `project/info.md` by filling the section underneath or deleting the marker line to acknowledge no extra context is needed.
- [x] Confirm visual direction in `project/style.md` after using the Stylist page.
- [x] After the `project/info.md` markers are resolved, review the `mds roadmap` proposal and approve any task wording and target phase before using `mds roadmap --append --phase N`.
- [x] Keep or prune included package examples after reviewing `/exposition`.
- [x] Remove exposition pages before production once their lessons are absorbed.

## Phase 1 — App Shell And First Flow

- [x] Replace starter Home with responsive Arena Fighter, Medical Viewer and Guess the Qubit entry cards that go to blank screens.
- [x] Add a shared AR session boundary that mounts one navigator, handles camera denial/unsupported devices/backgrounding, and tears down on Home.
- [x] Add recoverable loading/error states, safe-area native controls, and accessibility labels.

- [x] Establish the app shell and first implementation-ready route in `src/app` being the home and blank screens.

## Phase 2 — Arena Fighter And Data Boundary

- [x] Integrate the existing Studio Fight Arena scene using sceneId and documented native plugin configuration.
- [x] Verify two fighters and idle/attack/hit/defeat clips/triggers; implement health, winner feedback and restart with an authoritative combat controller.
- [x] Verify plane placement, model scale and restart behavior on iPhone; do not treat a published scene name as proof that combat works.


## Phase 3 — Medical Viewer And Product Flows

- [x] Add a Scan Slices option to Medical Viewer for actual CT and registered MRI axial images in AR, with a 3D Slicer exporter, generated static asset mappings, modality selection and slice navigation; preserve the separate 3D Anatomy mode.

- [x] Add the user-supplied MRI-derived brain 3D model to Medical Viewer and a third dropdown option, Both, that displays the user-supplied half-skull and brain models together; both aligned GLBs are packaged with dataset provenance.
  - Completion: [integrated assets and Both mode](https://github.com/DavidJGrimsley/xr-showcase/commit/559be692209fdc736ad127cb6933db1c6723c4ee), verified reachable from app `main`; [brain provenance](https://github.com/DavidJGrimsley/xr-showcase/blob/559be692209fdc736ad127cb6933db1c6723c4ee/assets/medical/brain-provenance.json) and [half-skull provenance](https://github.com/DavidJGrimsley/xr-showcase/blob/559be692209fdc736ad127cb6933db1c6723c4ee/assets/medical/half-skull-provenance.json).

- [x] Implement Medical Viewer with the packaged CT-derived skull, plane placement and calibrated anatomy labels.
- [x] Add bounded pinch/rotate gestures and reset placement; validate readability, loading errors and asset provenance on iPhone.


## Phase 4 — Guess The Qubit

- [x] Recreate the Unreal Bloch sphere/axes/rings/basis labels and magenta vector/state point using Viro primitives at tabletop scale.
  - Completion: [verified implementation commit](https://github.com/DavidJGrimsley/xr-showcase/commit/6fcdf0ad749893e2c39ef1bd7fca7a591db9c281).
- [x] Implement simulator and Hardware Jobs 0/1 guesses, pi/2 intro, valid-result collapse, win/loss feedback, Reset, status and waiting pulse.
  - Completion: [verified implementation commit](https://github.com/DavidJGrimsley/xr-showcase/commit/6fcdf0ad749893e2c39ef1bd7fca7a591db9c281).
- [x] Implement the typed Quantum API client and SecureStore runtime-key configuration; keep private values out of source, config and logs.
  - Owner-approved scope update: SecureStore/player key entry was superseded by first-party npm SDK integration and build-time demo credentials. Credential values remain outside committed files and logs; the private hackathon client intentionally bundles the key.
  - Completion: [verified implementation commit](https://github.com/DavidJGrimsley/xr-showcase/commit/bc6aff00227a27dce1d6e0c8e915707060675384).
- [x] Use one-shot ry(pi/2) hardware jobs, poll every 15 seconds and validate terminal counts; block duplicate submission and automatic resubmission.
  - Completion: [verified implementation commit](https://github.com/DavidJGrimsley/xr-showcase/commit/6fcdf0ad749893e2c39ef1bd7fca7a591db9c281).
- [x] Test 0/1 outcomes, fast/slow response ordering, invalid results, credentials/rate limits/offline failures, queued/running/succeeded/failed/cancelled states, Reset/Home during submission or polling, and late responses.
  - Completion: [verified implementation commit](https://github.com/DavidJGrimsley/xr-showcase/commit/b263fc44539eb3efcb141828217fd88917ae5ace).
- [x] Keep errors recoverable; abort requests/stop polls and attempt unfinished-job cancellation on Reset/Home.
  - Completion: [verified implementation commit](https://github.com/DavidJGrimsley/xr-showcase/commit/6fcdf0ad749893e2c39ef1bd7fca7a591db9c281).

Implementation complete on the published phase-4-qubit branch; main integration and Phase 6 device acceptance remain separate.


## Phase 5 — Style
- [x] Ensure Expo UI and universal components are used.
- [ ] The option chosen for a family of colors for the background doesn't seem to work on iphone.

## Phase 5 — Safeguards And Release

- [x] Run `mds report --kind content` and replace remaining placeholder or example copy before release. Zero findings after cleanup; source fixes are in [PR #8](https://github.com/DavidJGrimsley/xr-showcase/pull/8).
- [x] Run `mds doctor --ci` and address errors. Verified through the MDS MCP CI workflow: 99/100, zero errors; lint, types, tests, Expo Doctor 21/21 and iOS export pass. See [release-health evidence](release-health/README.md).
- [ ] Complete the one-time GitHub repo setup from `project/release-flow.md` so `test` and `main` are protected correctly.
- [ ] Add GitHub branch protection so PR checks pass before merging into `test` or `main`

## Phase 6 — Device Acceptance And Demo

- [x] Validate Viro scene schemas and supported previews without claiming they prove native AR.
- [ ] Complete physical iPhone tests for all three experiences, camera denial, background/resume, rapid Home/scene switching, gestures, and teardown.
  - Owner confirmed partial testing on October 12, 2026; full device acceptance remains open.
- [ ] Repeat native acceptance on Android after the iOS flow is stable.
- [ ] Remove developer exposition/reference routes before the demo; verify no placeholder assets or misleading completed-feature claims remain.
- [ ] Record the demo/screenshots and verify current hackathon submission requirements; submission is a separate user-authorized action.
