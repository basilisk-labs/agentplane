# PR Review

Created: 2026-04-17T15:23:32.504Z
Branch: task/202604171522-TZMHEY/command-catalog-needs-union

## Summary

Refactor command catalog dispatch metadata into needs union

Replace repeated needsProject/needsLoadedConfig/needsTaskContext metadata in the CLI command catalog with a single declared needs union while preserving dispatch behavior and help/lookup contracts.

## Scope

- In scope: Replace repeated needsProject/needsLoadedConfig/needsTaskContext metadata in the CLI command catalog with a single declared needs union while preserving dispatch behavior and help/lookup contracts.
- Out of scope: unrelated refactors not required for "Refactor command catalog dispatch metadata into needs union".

## Verification

### Plan

1. Inspect packages/agentplane/src/cli/run-cli/command-catalog/shared.ts and touched catalog modules. Expected: repeated needsProject/needsLoadedConfig/needsTaskContext metadata is replaced by a single declared needs contract, and dispatch normalization still yields the same booleans for existing commands.
2. Run bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog.test.ts. Expected: longest-prefix matching, direct-child discovery, and dispatch metadata assertions stay green.
3. Run bun run typecheck. Expected: the new helper and migrated catalog modules typecheck without changing command loader signatures or invocation contracts.

### Current Status

- State: ok
- Note: Command catalog metadata now uses a canonical needs union; focused command-catalog tests and repository typecheck passed.

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-17T18:42:30.213Z
- Branch: task/202604171522-TZMHEY/command-catalog-needs-union
- Head: 889ae2614ba8

```text
 .../src/cli/run-cli/command-catalog.test.ts        |   3 +
 .../src/cli/run-cli/command-catalog/core.ts        | 116 ++++++---------------
 .../src/cli/run-cli/command-catalog/lifecycle.ts   |  16 +--
 .../src/cli/run-cli/command-catalog/project.ts     |  32 ++----
 .../src/cli/run-cli/command-catalog/shared.ts      |  46 +++++---
 .../src/cli/run-cli/command-catalog/task.ts        |  24 ++---
 6 files changed, 84 insertions(+), 153 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
