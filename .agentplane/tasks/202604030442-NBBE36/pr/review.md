# PR Review

Created: 2026-04-03T11:24:23.063Z
Branch: task/202604030442-NBBE36/task-intake-contracts

## Summary

F-008 Introduce task intake contracts

Define framework-level intake, clarification, graph draft, and materialization contracts for task create flows.

## Scope

- In scope: Define framework-level intake, clarification, graph draft, and materialization contracts for task create flows.
- Out of scope: unrelated refactors not required for "F-008 Introduce task intake contracts".

## Verification

### Plan

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified: bun run typecheck; bunx vitest run packages/agentplane/src/runtime/task-intake/resolve.test.ts packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/scenario-materialize-task.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000; node scripts/run-pre-commit-hook.mjs

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

- Updated: 2026-04-03T13:35:42.325Z
- Branch: task/202604030442-NBBE36/task-intake-contracts
- Head: 5cd6001cd65c

```text
 packages/agentplane/src/commands/task/new.ts       | 106 ++++--
 .../runner/usecases/scenario-materialize-task.ts   |  80 ++++-
 .../agentplane/src/runtime/task-intake/index.ts    |  23 ++
 .../src/runtime/task-intake/resolve.test.ts        | 237 ++++++++++++
 .../agentplane/src/runtime/task-intake/resolve.ts  | 400 +++++++++++++++++++++
 .../agentplane/src/runtime/task-intake/types.ts    | 141 ++++++++
 .../src/usecases/context/resolve-context.ts        |  31 +-
 .../usecases/context/resolve-context.unit.test.ts  |  46 ++-
 8 files changed, 1024 insertions(+), 40 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
