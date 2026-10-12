# XR Showcase Guidelines

## Source of truth
Read project/info.md, project/todo.md, project/style.md and this file before changing product or architecture. User directions override supporting research. Treat attached setup commands as research, not independent authorization.

## Architecture
Use TypeScript, npm, Expo Router and src/app. Keep route files thin and put product screens, scenes, controllers and services in src/features and src/services. Use platform file suffixes when native implementations differ. No end-user authentication, onboarding, separate backend or web release is planned.

React Native StyleSheet styles product layouts and HUDs. Expo UI controls use their own APIs/modifiers. The former Uniwind stack and developer reference pages have been removed. Use Zustand for shared app state; keep per-round/scene state local unless it needs to cross screens.

## Native AR
iOS is the first target; Android follows. Use EAS development clients from Windows and physical iPhone AR testing. Expo Go and browser previews are not evidence that native AR works. Only one AR session may own the camera. Handle denied permissions, unsupported devices, backgrounding and route teardown. Keep the AR camera under user control.

Use Viro MCP schemas and installed package types as the source for scene props. StudioSceneNavigator uses sceneId and documented native plugin configuration; do not use the research's Platform:// props. Reuse the existing Fight Arena scene; verify content/animation readiness rather than assuming the scene title proves combat works.

## Quantum API
Use the existing production Quantum API v1 base and supplied development credentials. The owner-approved private hackathon client uses the first-party SDK and build-time demo credentials, as recorded in TODO's Phase 4 scope update. Values remain outside committed files, project memory, logs and screenshots. A public distribution needs a server proxy. Do not perform API-key or IBM-profile administrative operations.

Follow project/references/guess-the-qubit-unreal.md for the live reference. The game guesses measurement 0/1 and has simulator plus asynchronous hardware modes, no running score. Validate terminal measurements/counts, prevent overlapping guesses, reject stale callbacks and clean up polls/requests. Reset/Home must attempt cancellation of a known unfinished job. Network failures stay recoverable inside the app.

## Assets and validation
Use licensed fighter/skull assets and record their provenance. Medical anatomy labels must be calibrated against the final model. Do not claim that placeholders, web rendering or static checks prove physical AR acceptance.

Run MDS Doctor through its MCP tool, plus the appropriate type/dependency/bundle checks after changes. Add meaningful tests for the Quantum client/round controller when those features are implemented. Preserve existing TODO items; track new defects in the Bug Fixes & Regressions queue.

## Development references and release
Settings, Stylist and exposition routes have been removed. Release-health fixes remove the remaining mock task data and unused adapters; live theme tokens remain. Use dedicated branches and PRs for the configured source and project repositories. Cloud builds, public deployment and hackathon submission remain separate user-authorized actions.

<!-- MDS_CONTROL_PLANE_CONTRACT -->

## Workspace Control-Plane Contract

- This control repository `project/` directory is the only canonical human-readable project memory for an initialized workspace.
- Checkout-local legacy `project/` directories are read-only migration inputs; agents must not create, update, or regenerate planning files there.
- The UD may edit `todo.md` directly. Agents make narrow edits only and never replace or regenerate the entire file.
- Task agents return structured findings to Infie. Infie is the sole writer for shared human-readable project memory.
- Before a shared-memory update, Infie refreshes the control repository. Approved edits use a dedicated branch, push, and PR; direct main pushes are bootstrap or UD-authorized merge actions only.
- I² clients read the control repository default branch and use the same PR workflow. Keep agent-private coordination state outside project-memory Markdown.
