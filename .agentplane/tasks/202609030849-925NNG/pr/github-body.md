Task: `202609030849-925NNG`
Title: Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-...
Canonical task record: `.agentplane/tasks/202609030849-925NNG/README.md`

## Summary

Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation

Authorized bootstrap recovery only. Reproduce and fix the root cause where task plan reject updates README without atomically applying the canonical task-centric aggregate transition, revision, event, receipt, plan invalidation, and route. Add focused regression and interruption tests, mismatch diagnostics, deterministic auditable CLI recovery, then run the requested verification gates, obtain independent EVALUATOR review, integrate through branch_pr, and only on fresh main recover 202609021331-5FPZAB using the new CLI operation. Preserve its worktree, commits, rejected-plan note, five WorkItems, and evidence. Do not continue Clean Core and do not approve any plan for 202609021331-5FPZAB.

## Scope

- In scope: Authorized bootstrap recovery only. Reproduce and fix the root cause where task plan reject updates README without atomically applying the canonical task-centric aggregate transition, revision, event, receipt, plan invalidation, and route. Add focused regression and interruption tests, mismatch diagnostics, deterministic auditable CLI recovery, then run the requested verification gates, obtain independent EVALUATOR review, integrate through branch_pr, and only on fresh main recover 202609021331-5FPZAB using the new CLI operation. Preserve its worktree, commits, rejected-plan note, five WorkItems, and evidence. Do not continue Clean Core and do not approve any plan for 202609021331-5FPZAB.
- Out of scope: unrelated refactors not required for "Repair task-centric plan-rejection projection atomicity and recover task 202609021331-5FPZAB via a CLI-owned receipt-backed operation".

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-03T11:28:55.901Z
- Branch: task/202609030849-925NNG/repair-task-centric-plan-rejection-projection-at
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-centric-backend-adapter.test.ts           | 169 +++++++++++++++
 .../task-backend/task-centric-backend-adapter.ts   |  29 +++
 .../task-backend/task-centric-backend-runtime.ts   |   7 +-
 .../task-backend/task-centric-plan-rejection.ts    | 232 ++++++++++++++++++++
 packages/agentplane/src/cli/group-command.test.ts  |   1 +
 .../src/cli/run-cli.core.help-contract.test.ts     |   8 +-
 .../src/cli/run-cli.core.lifecycle.plan.test.ts    | 240 +++++++++++++++++++++
 ...-cli.critical.agent-efficiency-baseline.test.ts |   7 +-
 .../src/cli/run-cli/command-catalog.test.ts        |   7 +-
 .../src/cli/run-cli/command-catalog/task.ts        |   8 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../commands/doctor/workspace-task-state.test.ts   |  61 ++++++
 .../src/commands/doctor/workspace-task-state.ts    |  81 ++++++-
 .../agentplane/src/commands/doctor/workspace.ts    |   7 +-
 .../task/external-agent-planning-authority.ts      |   1 +
 .../src/commands/task/plan-approval-guard.ts       |  23 ++
 .../task/plan-recover-rejection.command.ts         | 126 +++++++++++
 .../commands/task/plan-rejection-recovery.test.ts  |  95 ++++++++
 .../src/commands/task/plan-rejection-recovery.ts   |  79 +++++++
 .../agentplane/src/commands/task/plan.command.ts   |   4 +-
 packages/agentplane/src/commands/task/plan.ts      |  54 ++++-
 .../baselines/v0.7-compatibility-candidate.json    | 140 +++++++++++-
 .../check-compatibility-contract-baseline.mjs      |  97 +++++++++
 23 files changed, 1449 insertions(+), 31 deletions(-)
```

</details>
