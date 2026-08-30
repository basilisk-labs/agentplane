Task: `202608291006-2A6BJC`
Title: Add compatibility adapters and replay migration
Canonical task record: `.agentplane/tasks/202608291006-2A6BJC/README.md`

## Summary

Add compatibility adapters and replay migration

Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.

## Scope

- In scope: Connect legacy CLI and repository surfaces to the canonical Task kernel through explicit adapters. Add one-time migration, dual-read or shadow execution where needed, exact replay fixtures, state equivalence checks, rollback receipts, and fail-closed handling for unknown legacy layouts.
- Out of scope: unrelated refactors not required for "Add compatibility adapters and replay migration".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-30T04:09:19.506Z
- Branch: task/202608291006-2A6BJC/add-compatibility-adapters-and-replay-migration
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/harness-dev.mdx                     |  29 ++
 .../task-backend/kernel-backend-adapter.test.ts    | 456 +++++++++++++++++++++
 .../task-backend/kernel-backend-adapter.ts         | 193 +++++++++
 .../adapters/task-backend/kernel-observations.ts   |  95 +++++
 .../src/adapters/task-backend/kernel-projector.ts  |  36 ++
 .../task-backend/kernel-record-invariants.ts       |  90 ++++
 .../src/adapters/task-backend/kernel-record.ts     | 271 ++++++++++++
 .../task-backend/task-centric-backend-runtime.ts   |  13 +-
 .../src/backends/task-backend/local-backend.ts     |   1 +
 .../src/backends/task-backend/shared/types.ts      |   2 +
 .../src/commands/task/show-kernel.test.ts          |  69 ++++
 packages/agentplane/src/commands/task/show.ts      |  40 ++
 12 files changed, 1294 insertions(+), 1 deletion(-)
```

</details>
