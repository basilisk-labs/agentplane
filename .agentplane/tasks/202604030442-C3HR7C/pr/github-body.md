## Summary

F-005 Expand policy taxonomy

Broaden policy action taxonomy so risky and mutating framework actions are classified centrally.

## Scope

- In scope: Broaden policy action taxonomy so risky and mutating framework actions are classified centrally.
- Out of scope: unrelated refactors not required for "F-005 Expand policy taxonomy".

## Verification

### Plan

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

### Current Status

- State: ok
- Note: Implemented a unified policy taxonomy and classifier across the framework policy engine, approval gateway, task mutation hooks, and runner entrypoints; verified with typecheck plus targeted policy/task/runner/backend/recipes/upgrade/release test suites.

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

- Updated: 2026-04-03T10:42:42.731Z
- Branch: task/202604030442-C3HR7C/policy-taxonomy
- Head: 54c381ae0f3c

```text
 packages/agentplane/src/commands/backend.ts        |   4 +
 .../src/commands/recipes/impl/commands/install.ts  |   2 +-
 .../commands/recipes/impl/commands/list-remote.ts  |   1 +
 .../src/commands/release/apply.command.ts          |   1 +
 .../commands/shared/approval-requirements.test.ts  |  17 +-
 .../src/commands/shared/approval-requirements.ts   |  61 +++-
 .../src/commands/shared/network-approval.ts        |   4 +-
 .../src/commands/shared/task-mutation.ts           |  10 +
 packages/agentplane/src/commands/task/block.ts     |   1 +
 .../agentplane/src/commands/task/close-shared.ts   |   1 +
 .../agentplane/src/commands/task/set-status.ts     |   1 +
 .../src/commands/task/shared/transition-command.ts |   3 +
 packages/agentplane/src/commands/task/start.ts     |   1 +
 packages/agentplane/src/commands/upgrade.ts        |   7 +-
 packages/agentplane/src/policy/engine.test.ts      |  15 +-
 packages/agentplane/src/policy/engine.ts           |  22 +-
 packages/agentplane/src/policy/taxonomy.test.ts    |  56 +++
 packages/agentplane/src/policy/taxonomy.ts         | 376 +++++++++++++++++++++
 packages/agentplane/src/policy/types.ts            |   3 +-
 .../agentplane/src/runner/usecases/task-run.ts     |   9 +-
 .../src/usecases/task/task-list-usecase.ts         |   6 +
 .../usecases/task/task-list-usecase.unit.test.ts   |   6 +-
 22 files changed, 564 insertions(+), 43 deletions(-)
```

</details>
