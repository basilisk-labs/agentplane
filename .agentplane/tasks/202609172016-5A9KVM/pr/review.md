# PR Review

Created: 2026-09-17T22:51:10.201Z

## Task

- Task: `202609172016-5A9KVM`
- Title: Complete canonical Task application coordinator for 0.7.10
- Status: DOING
- Branch: `task/202609172016-5A9KVM/canonical-application-coordinator`
- Canonical task record: `.agentplane/tasks/202609172016-5A9KVM/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-17T22:51:10.201Z
- Branch: task/202609172016-5A9KVM/canonical-application-coordinator
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.kernel-transport.test.ts  |  51 ++-
 .../src/commands/pr/integrate/internal/finalize.ts |   4 +-
 .../shared/route-decision-blockers.kernel.test.ts  |  67 +++
 .../src/commands/shared/route-decision-blockers.ts |  41 +-
 .../commands/shared/side-effect-authority.test.ts  | 110 ++++-
 .../src/commands/shared/side-effect-authority.ts   |  77 ++++
 .../src/commands/task/advance.command.ts           |  22 +-
 .../src/commands/task/kernel-advance.test.ts       | 290 ++++++++++++
 .../agentplane/src/commands/task/kernel-advance.ts | 204 ++++++++-
 .../task/kernel-controller-handoff.test.ts         | 284 ++++++++++++
 .../src/commands/task/kernel-controller-handoff.ts | 400 +++++++++++++++++
 .../src/commands/task/kernel-effect-coordinator.ts | 193 ++++++++
 .../src/commands/task/kernel-exchange.test.ts      | 110 +++++
 .../src/commands/task/kernel-exchange.ts           |  52 ++-
 .../src/commands/task/kernel-final-validation.ts   |  14 +
 .../src/commands/task/kernel-inspection.ts         | 111 ++++-
 .../task/kernel-operational-projection.test.ts     | 166 +++++++
 .../commands/task/kernel-operational-projection.ts | 131 ++++++
 .../agentplane/src/commands/task/kernel-plan.ts    |  67 ++-
 .../kernel-provider-effect-coordinator.test.ts     | 337 ++++++++++++++
 .../task/kernel-provider-effect-coordinator.ts     | 489 +++++++++++++++++++++
 .../task/kernel-repository-coordinator.test.ts     | 251 +++++++++++
 .../commands/task/kernel-repository-coordinator.ts | 425 ++++++++++++++++++
 .../src/commands/task/kernel-run.test.ts           | 140 ++++++
 .../agentplane/src/commands/task/kernel-run.ts     |  29 +-
 .../src/commands/task/kernel-work-order.ts         |  50 ++-
 .../src/commands/task/plan-set.command.ts          |  23 +-
 .../agentplane/src/commands/task/run.command.ts    |  26 +-
 .../src/runner/usecases/kernel-authority.ts        |   4 +
 .../src/tasks/task-kernel/authority-lineage.ts     |  92 +++-
 packages/core/src/tasks/task-kernel/index.ts       |   2 +
 packages/core/src/tasks/task-kernel/kernel.test.ts |  67 +++
 packages/core/src/tasks/task-kernel/kernel.ts      |  52 ++-
 33 files changed, 4308 insertions(+), 73 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
