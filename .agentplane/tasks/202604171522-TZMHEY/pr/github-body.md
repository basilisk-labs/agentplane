## Summary

Refactor command catalog dispatch metadata into needs union

Replace repeated needsProject/needsLoadedConfig/needsTaskContext metadata in the CLI command catalog with a single declared needs union while preserving dispatch behavior and help/lookup contracts.

## Scope

- In scope: Replace repeated needsProject/needsLoadedConfig/needsTaskContext metadata in the CLI command catalog with a single declared needs union while preserving dispatch behavior and help/lookup contracts.
- Out of scope: unrelated refactors not required for "Refactor command catalog dispatch metadata into needs union".

## Verification

- State: ok
- Note: Command catalog metadata now uses a canonical needs union; focused command-catalog tests and repository typecheck passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T19:59:25.133Z
- Branch: task/202604171522-TZMHEY/command-catalog-needs-union
- Head: 3ca5957bc56e

```text
 .../src/cli/run-cli/command-catalog.test.ts        |   3 +
 .../src/cli/run-cli/command-catalog/core.ts        | 116 ++++++---------------
 .../src/cli/run-cli/command-catalog/lifecycle.ts   |  16 +--
 .../src/cli/run-cli/command-catalog/project.ts     |  32 ++----
 .../src/cli/run-cli/command-catalog/shared.ts      |  50 ++++++---
 .../src/cli/run-cli/command-catalog/task.ts        |  24 ++---
 6 files changed, 88 insertions(+), 153 deletions(-)
```

</details>
