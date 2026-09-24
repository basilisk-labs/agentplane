# PR Review

Created: 2026-09-24T14:39:05.856Z

## Task

- Task: `202609232231-BYSVV6`
- Title: Reduce AgentPlane workspace disk usage while preserving canonical task history
- Status: DOING
- Branch: `task/202609232231-BYSVV6/compact-task-history`
- Canonical task record: `.agentplane/tasks/202609232231-BYSVV6/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
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
<!-- END AUTO SUMMARY -->
