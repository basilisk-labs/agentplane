# PR Review

Created: 2026-09-22T07:52:49.181Z

## Task

- Task: `202609220730-N4NG4B`
- Title: Harden AgentPlane 0.7.11 lifecycle boundaries and recovery
- Status: DOING
- Branch: `task/202609220730-N4NG4B/harden-lifecycle-boundaries`
- Canonical task record: `.agentplane/tasks/202609220730-N4NG4B/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-22T07:52:49.181Z
- Branch: task/202609220730-N4NG4B/harden-lifecycle-boundaries
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/shared/merged-branch-cleanup.test.ts  |  34 ++++-
 .../src/commands/shared/merged-branch-cleanup.ts   |   8 +-
 .../shared/supervisor-execution-episode.test.ts    |  63 +++++++++
 .../shared/supervisor-execution-episode.ts         |  35 +++++
 .../src/commands/task/agent-action-packet.test.ts  |   1 +
 .../src/commands/task/agent-action-packet.ts       |   8 +-
 .../src/commands/task/doc-set.command.ts           |  15 +-
 .../agentplane/src/commands/task/doc.unit.test.ts  |  11 ++
 .../task/external-agent-supervisor.test.ts         | 152 +++++++++++++++++++++
 .../src/commands/task/plan-set.command.ts          |  24 ++--
 .../agentplane/src/commands/task/plan.unit.test.ts |  11 ++
 packages/core/src/tasks/index.ts                   |   1 +
 .../core/src/tasks/plan-execution-grant.test.ts    |  20 ++-
 packages/core/src/tasks/plan-execution-grant.ts    |  52 ++++---
 .../core/src/tasks/task-kernel/invariants.test.ts  |  42 ++++++
 packages/core/src/tasks/task-kernel/invariants.ts  |  11 ++
 16 files changed, 440 insertions(+), 48 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
