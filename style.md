# XR Showcase Style

Use a coherent dark control shell across the three experiences. Qubit mirrors the inspected Unreal project: cyan translucent sphere and axis/ring geometry, magenta arrow and state point, warm pale labels, mint-bordered dark guess/reset controls, green win and red loss feedback, and a clear hardware status line with a pulsing state marker. Rebuild geometry with Viro primitives rather than importing Unreal .uasset files. Normalize the globe to about 0.25m diameter on a tabletop while preserving relative proportions and label offsets. Map Unreal Z-up coordinates to Viro Y-up and keep |0⟩ above |1⟩. Never animate or force the phone's AR camera.

Use responsive safe-area layouts and accessible touch targets instead of copying desktop canvas offsets. Keep view space clear for AR; group simulator and hardware guess controls in a compact bottom HUD with Reset and Home. Native home cards introduce the three experiences. Medical labels remain readable and calibrated to the model; Arena overlays expose health/winner/restart without competing with the scene.

Uniwind styles shared React Native screens and HUD surfaces. Expo UI native/universal controls use their supported APIs/modifiers, not Uniwind classes. Avoid duplicated style systems on the same component. Respect reduced motion in native UI while preserving necessary gate/collapse explanations.

## Typography and Accessibility
Use the system font for native controls and readable, high-contrast labels. Respect Dynamic Type, safe areas, reduced motion and minimum 44pt touch targets on iOS. Win/loss and loading states must have text as well as color.

## Theme Source
Editable native theme tokens remain in project/theme.json and src/theme/tokens.ts. The temporary Stylist tool is retained for development; its preview tokens do not override the confirmed cyan/magenta Qubit reference or the native-control styling boundary.
