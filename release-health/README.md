# Release content and dependency review

October 12, 2026. Fixes are committed at [9168043](https://github.com/DavidJGrimsley/xr-showcase/commit/916804317835e5d1b5ccf98f527f955600f4489b) and proposed for app `main` in [PR #8](https://github.com/DavidJGrimsley/xr-showcase/pull/8). The project TODO records completed work on this verified branch; merge remains separate.

| Check | Before | After |
| --- | --- | --- |
| MDS content report | 6 mock-data findings | **0 findings** |
| MDS Doctor CI | 83/100; SDK mismatch error | **99/100; 0 errors**, 1 aggregate advisory |
| Expo Doctor | 20/21 | **21/21** |
| React Doctor | 1 error, 27 warnings | **0 errors, 26 warnings** |
| npm audit | 30 affected entries: 11 moderate/19 high | **19 high entries**, inherited from 2 upstream advisories |

The older TODO's “31 advisories” and “5 compiler TODOs/17 warnings” were historical snapshots, not current app bug counts. Audit counts include packages inheriting the same underlying advisory. Review is complete; remaining defects have explicit follow-up rows rather than being declared fixed.

## Changes

- Home now uses real product metadata in the experience catalog. Removed the unused starter task data, exposition adapters and SQLite dependency. Settings/Stylist/exposition routes and compiler opt-out were already absent; Stylist-named live theme tokens remain.
- Installed Expo's five recommended SDK 57 patch updates: Expo 57.0.28, UI 57.0.23, dev client 57.0.20, Router 57.0.26 and splash screen 57.0.10. No SDK major upgrade/downgrade.
- Applied patched `uuid@11.1.1` only beneath `xcode@3.0.1`. Upgraded Router's URI decoder to 0.5.0. A checksum-verified install bridge adapts its ESM export to CommonJS without changing the upstream algorithm; native bundling and both module forms are verified. Tests cover query round trips, malformed-input completion, Xcode IDs and UUID buffer bounds.
- Arena diagnostic and polling intervals now own independent cleanup. The full scan metadata is marked `-text` because its exact bytes are hashed; a fresh Windows checkout with CRLF enabled preserves that hash. Scan data and PNGs did not change.
- Corrected canonical project memory's outdated styling/ejection descriptions and the workspace's `REQUIRED` remote placeholder. Existing owner TODO/info edits are included in the project commit.

## Remaining findings

**No published patch:** [braces stack exhaustion](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), installed 3.0.3; [node-forge signature validation](https://github.com/advisories/GHSA-86w9-cpqp-85rv), installed 1.4.0. Both are in the Expo/Metro build-tool dependency graph. No direct app imports were found; that is not a blanket claim of unreachability. The 19 inherited high entries remain open until maintainers publish fixes or a validated alternative is integrated. `npm audit fix --force` suggestions were not applied.

React Doctor's remaining 26 warnings concern layout, performance and maintainability; [full diagnostics](react-doctor.json) retain exact files/rules. They are not the old starter/compiler failures and are not suppressed. MDS's four expected skips are: removed utility styling libraries, absent API routes, web SEO for a native app, and the full native build profile outside CI mode.

## Recheck and evidence

From the app checkout, run `npm ci` with install scripts enabled, `npm run test:dependencies`, `mds report . --kind content`, and MDS `doctor_scan_project` with `{ projectPath: <APP_CHECKOUT>, mode: "ci", runScripts: true }` (CLI equivalent: `mds doctor . --ci`).

Lint/formatting, TypeScript, every test script and iOS JS/asset export passed. A fresh dependency install exercised the bridge; a fresh CRLF-configured checkout verified metadata bytes. CI/export results do not establish physical-device acceptance. SDK native package patches should be included in the next native development/release build; no cloud build was launched here. The existing [3D Scan limitation](../3D_Scan_Limitations/README.md) remains separate.

Archived reports: [content before](content-before.json) / [after](content-after.json), [Doctor before](doctor-before.json) / [after](doctor-ci.json), [audit before](audit-before.json) / [after](audit-after.json), [React Doctor](react-doctor.json). Owner-specific checkout paths are replaced with `<APP_CHECKOUT>`; credentials and private runtime configuration are excluded.
