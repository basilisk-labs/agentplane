# PR Review

Created: 2026-05-05T15:29:48.806Z
Branch: task/202605051529-S59Z44/commit-auto-acr-artifacts

## Summary

Commit automatic ACR artifacts on finish

Fix the finish/close lifecycle so automatically generated task-local acr.json files are staged and committed with the deterministic task close artifacts instead of being left untracked.

## Scope

- In scope: Fix the finish/close lifecycle so automatically generated task-local acr.json files are staged and committed with the deterministic task close artifacts instead of being left untracked.
- Out of scope: unrelated refactors not required for "Commit automatic ACR artifacts on finish".

## Verification

### Plan

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

### Current Status

- State: ok
- Note: Command: bunx vitest run packages/agentplane/src/commands/task/finish.validation.unit.test.ts. Result: pass. Evidence: 19 tests passed. Scope: finish validation and ACR refresh status invalidation. Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts. Result: pass. Evidence: 4 tests passed and hosted-close now asserts tracked acr.json. Scope: hosted close lifecycle. Command: bunx vitest run packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts. Result: pass. Evidence: 6 tests passed. Scope: integrate finalization ACR refresh handoff. Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: workspace TypeScript. Command: eslint/prettier/git diff --check/check-routing/doctor. Result: pass. Evidence: lint clean, Prettier matched, policy routing OK, doctor OK with 0 errors and 0 warnings. Scope: touched files and repo policy health.

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

- Updated: 2026-05-05T15:37:13.340Z
- Branch: task/202605051529-S59Z44/commit-auto-acr-artifacts
- Head: 86a435049204

```text
 .../src/cli/run-cli.core.task-hosted-close.test.ts |  9 ++++
 .../pr/integrate/internal/finalize.test.ts         |  9 ++++
 .../src/commands/pr/integrate/internal/finalize.ts | 17 ++++++-
 .../agentplane/src/commands/task/finish-execute.ts | 49 +++-----------------
 .../agentplane/src/commands/task/finish-shared.ts  | 53 ++++++++++++++++++++++
 .../commands/task/finish.validation.unit.test.ts   |  2 +
 .../src/commands/task/hosted-close.command.ts      | 14 +++++-
 7 files changed, 107 insertions(+), 46 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
