Task: `202610242304-KB0ERQ`
Title: Complete canonical USER-approved timing-only final-validation exception for issue 6918
Canonical task record: `.agentplane/tasks/202610242304-KB0ERQ/README.md`

## Summary

Complete canonical USER-approved timing-only final-validation exception for issue 6918

Finish the provider-neutral canonical timing exception implementation from the blocked predecessor. Preserve FAILED local validation and expose a distinct accepted_timing_exception state. Require explicit USER manual operator approval or configured signed receipt, exact failure/report/plan/implementation binding, a finite timing-only bound, complete exact-SHA hosted success including required jobs, and fail-closed replay and post-merge routes. Preserve legacy aggregate serialization compatibility. Synchronize exactly six generated task artifact schemas. Retain predecessor failed full-CI evidence, then rerun all native gates.

## Scope

- In scope: Finish the provider-neutral canonical timing exception implementation from the blocked predecessor. Preserve FAILED local validation and expose a distinct accepted_timing_exception state. Require explicit USER manual operator approval or configured signed receipt, exact failure/report/plan/implementation binding, a finite timing-only bound, complete exact-SHA hosted success including required jobs, and fail-closed replay and post-merge routes. Preserve legacy aggregate serialization compatibility. Synchronize exactly six generated task artifact schemas. Retain predecessor failed full-CI evidence, then rerun all native gates.
- Out of scope: unrelated refactors not required for "Complete canonical USER-approved timing-only final-validation exception for issue 6918".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-25T08:10:49.193Z
- Branch: task/202610242304-KB0ERQ/complete-canonical-user-approved-timing-only-fin
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/canonical-final-timing-exception.md           |  11 +
 .../adapters/authority/user-approval-receipt.ts    |  13 +-
 .../task-backend/kernel-backend-adapter.test.ts    |  15 ++
 .../kernel-final-timing-exception.test-fixtures.ts |  51 ++++
 .../task-backend/kernel-record-invariants.ts       |   3 +-
 .../src/adapters/task-backend/kernel-record.ts     |  37 +++
 .../cli/run-cli/command-catalog/task-recovery.ts   |   8 +
 .../src/cli/run-cli/command-loaders/task.ts        |   5 +
 .../src/commands/pr/flow-status.pre-merge.test.ts  |  15 ++
 packages/agentplane/src/commands/pr/flow-status.ts |  11 +-
 .../src/commands/pr/hosted-checks.gitlab.test.ts   |  87 +++++++
 .../agentplane/src/commands/pr/hosted-checks.ts    |  35 ++-
 .../shared/canonical-pre-merge-evidence.test.ts    |  61 +++++
 .../shared/canonical-pre-merge-evidence.ts         |   4 +-
 .../commands/shared/canonical-timing-exception.ts  |  55 +++++
 .../src/commands/shared/route-decision-blockers.ts |   4 +-
 .../shared/route-decision-verification-blocker.ts  |   5 +-
 .../shared/route-decision-verification.test.ts     | 110 +++++++++
 .../commands/shared/route-decision-verification.ts |  26 +++
 .../src/commands/shared/workflow-step-branch.ts    |   3 +-
 .../commands/shared/workflow-step-projections.ts   |   3 +-
 .../src/commands/task/advance-task-step.ts         |   4 +-
 .../task/final-timing-exception.command.ts         | 196 ++++++++++++++++
 .../kernel-final-timing-exception-evidence.test.ts | 150 ++++++++++++
 .../task/kernel-final-timing-exception-evidence.ts | 164 +++++++++++++
 .../task/kernel-final-timing-exception.test.ts     | 259 +++++++++++++++++++++
 .../commands/task/kernel-final-timing-exception.ts | 241 +++++++++++++++++++
 .../task/kernel-operational-projection.test.ts     |  86 +++++++
 .../commands/task/kernel-operational-projection.ts |  15 +-
 .../commands/task/roadmap-terminal-noop.test.ts    | 108 +++++++++
 .../commands/task/user-approval-receipt.test.ts    |  33 +++
 .../src/commands/task/user-approval-receipt.ts     |   4 +-
 .../schemas/task-readme-frontmatter.schema.json    |   2 +-
 packages/core/schemas/tasks-export.schema.json     |   8 +-
 .../core/src/tasks/task-artifact-schema.task.ts    |   1 +
 .../src/tasks/task-artifact-schema.verification.ts |   1 +
 packages/core/src/tasks/task-kernel/index.ts       |   1 +
 .../kernel-final-timing-exception.test.ts          | 136 +++++++++++
 packages/core/src/tasks/task-kernel/kernel.ts      | 122 +++++++++-
 packages/core/src/tasks/task-kernel/model.ts       |  30 +++
 packages/core/src/tasks/task-store.ts              |   3 +-
 .../schemas/task-readme-frontmatter.schema.json    |   2 +-
 packages/spec/schemas/tasks-export.schema.json     |   8 +-
 schemas/task-readme-frontmatter.schema.json        |   2 +-
 schemas/tasks-export.schema.json                   |   8 +-
 45 files changed, 2115 insertions(+), 31 deletions(-)
```

</details>
