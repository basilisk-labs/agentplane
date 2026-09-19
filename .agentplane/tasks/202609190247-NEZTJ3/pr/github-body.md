Task: `202609190247-NEZTJ3`
Title: Land the verified 0.7.10 canonical release recovery fixes with independent evidence
Canonical task record: `.agentplane/tasks/202609190247-NEZTJ3/README.md`

## Summary

Land the verified 0.7.10 canonical release recovery fixes with independent evidence

Land the verified 0.7.10 canonical release recovery fixes with independent evidence

## Scope

- In scope: Land the verified 0.7.10 canonical release recovery fixes with independent evidence.
- Out of scope: unrelated refactors not required for "Land the verified 0.7.10 canonical release recovery fixes with independent evidence".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-19T03:38:19.549Z
- Branch: task/202609190247-NEZTJ3/canonical-release-recovery
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |   1 +
 .../src/cli/run-cli.core.kernel-transport.test.ts  |  94 +++-
 .../shared/canonical-pre-merge-evidence.ts         |  41 ++
 .../shared/route-decision-blockers.kernel.test.ts  |  82 +++
 .../src/commands/shared/route-decision-blockers.ts |  15 +-
 .../shared/side-effect-authority-policy.ts         | 203 +++++++
 .../commands/shared/side-effect-authority.test.ts  | 110 +++-
 .../src/commands/shared/side-effect-authority.ts   | 273 +++-------
 .../src/commands/shared/task-mutation.test.ts      |  43 ++
 .../src/commands/shared/task-mutation.ts           |  17 +-
 .../src/commands/task/advance.command.ts           |  22 +-
 .../commands/task/direct-task-verification.test.ts | 157 +++---
 .../src/commands/task/direct-task-verification.ts  |  12 +-
 .../external-agent-implementation-finalization.ts  |   7 +-
 .../agentplane/src/commands/task/finish-execute.ts |   4 +
 .../src/commands/task/finish-quality-evidence.ts   |  18 +-
 .../agentplane/src/commands/task/finish-shared.ts  |   2 +
 .../task/finish.quality-review-target.unit.test.ts |  25 +
 .../src/commands/task/git-status-path.test.ts      |  21 +
 .../src/commands/task/git-status-path.ts           |  64 +++
 .../src/commands/task/kernel-advance.test.ts       | 334 ++++++++++++
 .../agentplane/src/commands/task/kernel-advance.ts | 461 ++++++++++------
 .../task/kernel-controller-handoff.test.ts         | 284 ++++++++++
 .../src/commands/task/kernel-controller-handoff.ts | 400 ++++++++++++++
 .../src/commands/task/kernel-effect-coordinator.ts | 193 +++++++
 .../src/commands/task/kernel-exchange.test.ts      | 110 ++++
 .../src/commands/task/kernel-exchange.ts           |  52 +-
 .../src/commands/task/kernel-final-validation.ts   | 134 ++++-
 .../src/commands/task/kernel-inspection.ts         | 111 +++-
 .../task/kernel-operational-projection.test.ts     | 211 ++++++++
 .../commands/task/kernel-operational-projection.ts | 168 ++++++
 .../agentplane/src/commands/task/kernel-plan.ts    |  67 ++-
 .../kernel-provider-effect-coordinator.test.ts     | 337 ++++++++++++
 .../task/kernel-provider-effect-coordinator.ts     | 489 +++++++++++++++++
 .../task/kernel-repository-coordinator.test.ts     | 412 ++++++++++++++
 .../commands/task/kernel-repository-coordinator.ts | 599 +++++++++++++++++++++
 .../src/commands/task/kernel-run.test.ts           | 140 +++++
 .../agentplane/src/commands/task/kernel-run.ts     |  29 +-
 .../commands/task/kernel-semantic-result.test.ts   |  81 +++
 .../src/commands/task/kernel-semantic-result.ts    | 286 ++++++++++
 .../src/commands/task/kernel-work-order.ts         |  57 +-
 .../src/commands/task/plan-set.command.ts          |  23 +-
 .../agentplane/src/commands/task/run.command.ts    |  26 +-
 .../src/commands/task/show-kernel.test.ts          | 113 +++-
 packages/agentplane/src/commands/task/show.ts      |  36 ++
 .../src/commands/task/verify-record-execute.ts     |  17 +-
 .../agentplane/src/commands/task/verify-record.ts  |   1 +
 .../src/commands/task/verify-record.types.ts       |   1 +
 .../src/runner/usecases/kernel-authority.ts        |  36 +-
 .../runner/usecases/kernel-task-lifecycle.test.ts  |   1 +
 .../src/tasks/task-kernel/authority-lineage.ts     | 166 +++++-
 packages/core/src/tasks/task-kernel/index.ts       |   3 +
 packages/core/src/tasks/task-kernel/kernel.test.ts | 273 ++++++----
 packages/core/src/tasks/task-kernel/kernel.ts      |  55 +-
 54 files changed, 6252 insertions(+), 665 deletions(-)
```

</details>
