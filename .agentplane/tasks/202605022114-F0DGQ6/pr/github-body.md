Task: `202605022114-F0DGQ6`
Title: Fix repo-local handoff dependency detection

## Summary

Fix repo-local handoff dependency detection

Avoid false missing-dependency reports when the repo-local wrapper resolves @agentplaneorg/core through workspace conditional exports instead of package-local node_modules.

## Scope

- In scope: Avoid false missing-dependency reports when the repo-local wrapper resolves @agentplaneorg/core through workspace conditional exports instead of package-local node_modules.
- Out of scope: unrelated refactors not required for "Fix repo-local handoff dependency detection".

## Verification

- State: ok
- Note: Verified: repo-local handoff dependency detection now accepts workspace-local @agentplaneorg/core resolution and rejects missing package-local installs when resolution escapes the framework checkout. Evidence: bun test packages/agentplane/src/cli/repo-local-handoff.test.ts passed 7/7; combined affected suite passed 14/14; prettier check passed; git diff --check passed; agentplane doctor passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- 2026-05-02T21:26:55Z CODER: Related task included: 202605022118-M0GKG8 fixes current release lint drift discovered during patch-release readiness checks. Verification: lint:core passed, generate-release-distribution-script.test.ts passed 2/2, combined affected suite passed 14/14.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-02T21:26:26.141Z
- Branch: task/202605022114-F0DGQ6/repo-local-handoff-deps
- Head: e0736895b5e9

```text
 .agentplane/tasks/202605022118-M0GKG8/README.md    | 118 +++++++++++++++++++++
 packages/agentplane/bin/agentplane.js              |   7 +-
 .../agentplane/src/cli/repo-local-handoff.test.ts  |   9 +-
 .../generate-release-distribution-script.test.ts   |   4 +-
 scripts/generate-release-distribution.mjs          |   9 +-
 scripts/generate-standalone-cli-assets.mjs         |   4 +-
 6 files changed, 139 insertions(+), 12 deletions(-)
```

</details>
