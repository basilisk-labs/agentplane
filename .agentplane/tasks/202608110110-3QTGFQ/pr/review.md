# PR Review

Created: 2026-08-11T01:10:43.816Z

## Task

- Task: `202608110110-3QTGFQ`
- Title: Advance the integration queue in the foreground supervisor
- Status: DONE
- Branch: `task/202608110110-3QTGFQ/advance-the-integration-queue-in-the-foreground`
- Canonical task record: `.agentplane/tasks/202608110110-3QTGFQ/README.md`

## Verification

- State: ok
- Note: Foreground queue recovery verified at 4f552f312: temporary provider gates requeue safely and protected-base completion handoffs finish the worker cycle without false failures.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-11T01:26:23.793Z
- Branch: task/202608110110-3QTGFQ/advance-the-integration-queue-in-the-foreground
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.pr-flow.test.ts           | 112 +++++++++++++++++++++
 .../src/commands/integrate-queue-lane.test.ts      |  19 +++-
 .../src/commands/integrate-queue-lane.ts           |  11 +-
 .../src/commands/integrate-queue-reservation.ts    |  14 ++-
 .../src/commands/integrate-queue.command.test.ts   |  41 +++++++-
 .../src/commands/integrate-queue.command.ts        |  12 ++-
 .../commands/shared/side-effect-authority.test.ts  |   4 +
 .../src/commands/shared/side-effect-authority.ts   |  14 +++
 .../commands/shared/workflow-operation-effects.ts  |   1 +
 .../commands/shared/workflow-operation-prefix.ts   |   1 +
 .../workflow-operation-projection.registry.test.ts |   4 +
 .../shared/workflow-operation-projection.ts        |   3 +
 .../src/commands/shared/workflow-postconditions.ts |   7 ++
 .../workflow-step-integration-projections.test.ts  |  60 ++++++++++-
 .../shared/workflow-step-integration-queue.ts      |  18 +++-
 .../src/commands/shared/workflow-step.ts           |  20 ++++
 .../task/branch-task-supervisor-operations.test.ts |  83 +++++++++++++++
 .../task/branch-task-supervisor-operations.ts      |  44 ++++++++
 .../commands/task/branch-task-supervisor.test.ts   |  15 ++-
 19 files changed, 450 insertions(+), 33 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
