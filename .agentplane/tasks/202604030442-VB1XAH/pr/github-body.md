## Summary

F-007 Operationalize execution profiles

Turn execution profiles into executable runtime behavior for budgets, stop, handoff, timeout, and trace policies.

## Scope

- In scope: Turn execution profiles into executable runtime behavior for budgets, stop, handoff, timeout, and trace policies.
- Out of scope: unrelated refactors not required for "F-007 Operationalize execution profiles".

## Verification

### Plan

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Verified: bun run typecheck; node scripts/run-pre-commit-hook.mjs; bunx vitest run packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runtime/execution-profile/resolve.test.ts packages/agentplane/src/usecases/context/resolve-context.unit.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts --hookTimeout 60000 --testTimeout 60000

## Risks

- Risk level: not recorded
- Breaking change: no

### Rollback

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-03T11:21:57.970Z
- Branch: task/202604030442-VB1XAH/execution-profiles
- Head: 8628a870ad7d

```text
 .../src/cli/run-cli.core.tasks.query.test.ts       |  25 +++++
 .../agentplane/src/cli/run-cli.scenario.test.ts    |   1 +
 .../src/runner/context/base-prompts.test.ts        |  32 +++++++
 .../agentplane/src/runner/context/base-prompts.ts  |  68 ++++++++++++--
 packages/agentplane/src/runner/types.ts            |   2 +
 .../agentplane/src/runner/usecases/task-run.ts     |  17 +++-
 .../src/runtime/execution-profile/index.ts         |   6 ++
 .../src/runtime/execution-profile/resolve.test.ts  |  74 +++++++++++++++
 .../src/runtime/execution-profile/resolve.ts       | 103 +++++++++++++++++++++
 .../src/runtime/execution-profile/types.ts         |  29 ++++++
 .../src/usecases/context/resolve-context.ts        |   7 ++
 .../usecases/context/resolve-context.unit.test.ts  |  37 ++++++++
 12 files changed, 389 insertions(+), 12 deletions(-)
```

</details>
