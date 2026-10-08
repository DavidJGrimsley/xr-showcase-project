# XR Showcase TODO

## Bug Fixes & Regressions

- [x] [Bug · Origin: Phase 0] Work around Windows shell parsing of qubit notation in MDS generation arguments; preserve the original canonical notation in project docs.
- [x] [Bug · Origin: Phase 0] Align the generated Expo 56 template with Expo 57/RN 0.86/Viro 3, update compatible starter packages, and deduplicate react-native-screens.
- [x] [Bug · Origin: Phase 0] Fix the generated Settings route importing an auth adapter that its screen does not export.
- [x] [Bug · Origin: Phase 0] Remove the react-doctor script/bin collision and add an iOS export build entry point for CI.
- [ ] [Bug · Origin: Phase 0] Review 31 npm audit advisories (11 moderate, 20 high). Compatible audit fixes do not resolve them; do not force unsupported SDK downgrades or major upgrades.
- [ ] [Bug · Origin: Phase 0] Triage the retained developer references: React Doctor reports 5 compiler TODO diagnostics and 17 warnings. Refactor or eject Stylist and remove its temporary compiler opt-out before the demo.

Add new defects only as `- [ ] [Bug · Origin: Phase N] <concrete defect>`; do not duplicate them in a phase.

## Phase 0 — Orientation And Planning

Product tasks take precedence over retained starter checklist items. SQLite/data/exposition samples are development references; no new app database, public release or remote repository is required for this private prototype.

- [x] Capture the live Unreal Qubit reference, including simulator and hardware modes, in project/references/guess-the-qubit-unreal.md.
- [x] Confirm iOS-first targeting and the scoped Uniwind/Expo UI component policy.
- [x] Verify repaired Expo 57/RN 0.86/Viro 3 dependencies, Uniwind configuration, type checks and iOS JavaScript bundling. See project/setup-validation.md.
- [ ] Sign into EAS, verify bundle identifier com.djleg.xrshowcase, register the physical iPhone and build/install the development profile.
- [ ] Configure existing Studio credentials privately; inspect Fight Arena scene a46c0453-e96b-4d66-8e4b-1f603e20a274 for model/clip/logic readiness.
- [ ] Obtain a licensed CT-derived skull, record provenance, optimize it for mobile and calibrate anatomical label anchors.
- [ ] Confirm existing Quantum API development-key access and backend ibm_kingston/profile Unreal Engine Demos availability without credential administration.
- [ ] Run a physical iPhone Viro plane-detection smoke test before beginning scene acceptance.

- [x] Confirm the Phase 0 component strategy in `project/info.md` (style library, Expo UI / Universal Components / NativeTabs, and any listed conflicts). Set Decision to confirmed after you review the generated app.
- [ ] Review the ejection inventory with `mds eject` and confirm retain/eject decisions for generated starter and template components. Set Decision to confirmed after you finish.
- [ ] Browse exposition pages to understand included base packages.
- [ ] Review styling in the 'Stylist' page.
- [x] Review `project/` files for accuracy and planning adjustments.
- [x] Run or defer `eject-stylist`; mark this todo done after ejection or deciding to defer (if you want to keep the stylist around for tinkering).
- [ ] Run `mds eject` and keep only the generated sections you want to retain.
- [ ] Sign in and set up EAS in the terminal.
- [x] Resolve every `# TodoForContext(optional):` marker in `project/info.md` by filling the section underneath or deleting the marker line to acknowledge no extra context is needed.
- [ ] Confirm visual direction in `project/style.md` after using the Stylist page.
- [x] After the `project/info.md` markers are resolved, review the `mds roadmap` proposal and approve any task wording and target phase before using `mds roadmap --append --phase N`.
- [ ] Keep or prune included package examples after reviewing `/exposition`.
- [ ] Remove exposition pages before production once their lessons are absorbed.

## Phase 1 — App Shell And First Flow

- [ ] Replace starter Home with responsive Arena Fighter, Medical Viewer and Guess the Qubit entry cards.
- [ ] Add a shared AR session boundary that mounts one navigator, handles camera denial/unsupported devices/backgrounding, and tears down on Home.
- [ ] Add recoverable loading/error states, safe-area native controls, and accessibility labels.

- [ ] Establish the app shell and first implementation-ready route in `src/app`.
- [ ] Implement the first concrete product flow from `project/info.md` and the roadmap.

## Phase 2 — Arena Fighter And Data Boundary

- [ ] Integrate the existing Studio Fight Arena scene using sceneId and documented native plugin configuration.
- [ ] Verify two fighters and idle/attack/hit/defeat clips/triggers; implement health, winner feedback and restart with an authoritative combat controller.
- [ ] Verify plane placement, model scale and restart behavior on iPhone; do not treat a published scene name as proof that combat works.

- [ ] Implement the initial data layer using local dummy data with Expo SQLite.

## Phase 3 — Medical Viewer And Product Flows

- [ ] Implement Medical Viewer with the packaged CT-derived skull, plane placement and calibrated anatomy labels.
- [ ] Add bounded pinch/rotate gestures and reset placement; validate readability, loading errors and asset provenance on iPhone.

- [ ] Build the remaining core flows from `project/info.md` phase by phase.
- [ ] Adapt the working MVP flow for the remaining target platforms after the primary flow is stable.
- [ ] Configure EAS for building.

## Phase 4 — Guess The Qubit, Safeguards, And Release

- [ ] Recreate the Unreal Bloch sphere/axes/rings/basis labels and magenta vector/state point using Viro primitives at tabletop scale.
- [ ] Implement simulator and Hardware Jobs 0/1 guesses, pi/2 intro, valid-result collapse, win/loss feedback, Reset, status and waiting pulse.
- [ ] Implement the typed Quantum API client and SecureStore runtime-key configuration; keep private values out of source, config and logs.
- [ ] Use one-shot ry(pi/2) hardware jobs, poll every 15 seconds and validate terminal counts; block duplicate submission and automatic resubmission.
- [ ] Test 0/1 outcomes, fast/slow response ordering, invalid results, credentials/rate limits/offline failures, queued/running/succeeded/failed/cancelled states, Reset/Home during submission or polling, and late responses.
- [ ] Keep errors recoverable; abort requests/stop polls and attempt unfinished-job cancellation on Reset/Home.

- [ ] Run `mds report --kind content` and replace remaining placeholder or example copy before release.
- [ ] Run `mds doctor --ci` and address errors.
- [ ] Follow `project/release-flow.md` for test-to-main development.
- [ ] Complete the one-time GitHub repo setup from `project/release-flow.md` so `test` and `main` are protected correctly.
- [ ] Add GitHub branch protection so PR checks pass before merging into `test` or `main`.

## Phase 5 — Device Acceptance And Demo

- [ ] Validate Viro scene schemas and supported previews without claiming they prove native AR.
- [ ] Complete physical iPhone tests for all three experiences, camera denial, background/resume, rapid Home/scene switching, gestures, and teardown.
- [ ] Repeat native acceptance on Android after the iOS flow is stable.
- [ ] Remove developer exposition/reference routes before the demo; verify no placeholder assets or misleading completed-feature claims remain.
- [ ] Record the demo/screenshots and verify current hackathon submission requirements; submission is a separate user-authorized action.
