Task: `202608110110-3QTGFQ`
Title: Advance the integration queue in the foreground supervisor
Canonical task record: `.agentplane/tasks/202608110110-3QTGFQ/README.md`

## Summary

Advance the integration queue in the foreground supervisor

Make branch_pr task supervision enqueue and then serialize its own integration queue through typed deterministic operations, recover handoffs without semantic rework, and prevent stale base task replicas while preserving parallel per-task worktrees.

## Scope

- In scope: Make branch_pr task supervision enqueue and then serialize its own integration queue through typed deterministic operations, recover handoffs without semantic rework, and prevent stale base task replicas while preserving parallel per-task worktrees.
- Out of scope: unrelated refactors not required for "Advance the integration queue in the foreground supervisor".

## Verification

- State: ok
- Note:

```text
Verified the CI lint correction at 573f88809; production behavior is unchanged and prior full-suite
evidence remains applicable.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-11T01:26:23.793Z
- Branch: task/202608110110-3QTGFQ/advance-the-integration-queue-in-the-foreground
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.pr-flow.test.ts           | 112 +++++++++++++++++++++
 .../src/commands/integrate-queue-lane.test.ts      |  19 +++-
 .../src/commands/integrate-queue-lane.ts           |  11 +-
 .../src/commands/integrate-queue.command.test.ts   |  19 +++-
 .../src/commands/integrate-queue.command.ts        |   9 ++
 .../commands/shared/side-effect-authority.test.ts  |   4 +
 .../src/commands/shared/side-effect-authority.ts   |  14 +++
 .../commands/shared/workflow-operation-effects.ts  |   1 +
 .../commands/shared/workflow-operation-prefix.ts   |   1 +
 .../workflow-operation-projection.registry.test.ts |   4 +
 .../shared/workflow-operation-projection.ts        |   3 +
 .../src/commands/shared/workflow-postconditions.ts |   7 ++
 .../workflow-step-integration-projections.test.ts  |  46 +++++++--
 .../shared/workflow-step-integration-queue.ts      |  18 +++-
 .../src/commands/shared/workflow-step.ts           |  20 ++++
 .../task/branch-task-supervisor-operations.test.ts |  49 +++++++++
 .../task/branch-task-supervisor-operations.ts      |  25 +++++
 .../commands/task/branch-task-supervisor.test.ts   |  15 ++-
 18 files changed, 347 insertions(+), 30 deletions(-)
```

</details>
