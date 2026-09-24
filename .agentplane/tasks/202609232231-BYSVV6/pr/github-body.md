Task: `202609232231-BYSVV6`
Title: Reduce AgentPlane workspace disk usage while preserving canonical task history
Canonical task record: `.agentplane/tasks/202609232231-BYSVV6/README.md`

## Summary

Reduce AgentPlane workspace disk usage while preserving canonical task history

Avoid materializing completed .agentplane/tasks history in each new task worktree; keep authoritative access through the canonical task store. Add a size inventory and safe cleanup route for retained task worktrees and nested base repositories. Preserve dirty work, Git/provider/task evidence, and current task behavior. Verify focused tests and measured disk behavior.

## Scope

- In scope: Avoid materializing completed .agentplane/tasks history in each new task worktree; keep authoritative access through the canonical task store. Add a size inventory and safe cleanup route for retained task worktrees and nested base repositories. Preserve dirty work, Git/provider/task evidence, and current task behavior. Verify focused tests and measured disk behavior.
- Out of scope: unrelated refactors not required for "Reduce AgentPlane workspace disk usage while preserving canonical task history".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-24T14:39:05.856Z
- Branch: task/202609232231-BYSVV6/compact-task-history
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/backends/task-backend.local.test.ts        |  50 ++++++
 .../agentplane/src/backends/task-backend/load.ts   |  62 ++++++-
 .../backends/task-backend/local-backend-read.ts    |  18 ++-
 .../backends/task-backend/local-backend-write.ts   |  19 ++-
 .../src/backends/task-backend/local-backend.ts     | 104 ++++++++++--
 .../run-cli.core.pr-flow.worktree-runtime.test.ts  |   6 +
 .../branch/work-start.compact-tasks.test.ts        | 180 +++++++++++++++++++++
 .../commands/branch/work-start.compact-tasks.ts    |  58 +++++++
 .../src/commands/branch/work-start.materialize.ts  |  18 ++-
 .../agentplane/src/commands/branch/work-start.ts   |  27 +++-
 10 files changed, 506 insertions(+), 36 deletions(-)
```

</details>
