# PR Review

Created: 2026-09-20T02:16:12.463Z

## Task

- Task: `202609200157-HJ7KZE`
- Title: Add canonical blocked-plan replanning transition
- Status: DOING
- Branch: `task/202609200157-HJ7KZE/canonical-hj7kze`
- Canonical task record: `.agentplane/tasks/202609200157-HJ7KZE/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-20T02:16:12.463Z
- Branch: task/202609200157-HJ7KZE/canonical-hj7kze
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/kernel-runtime-context.ts    |   9 +-
 .../src/commands/task/plan-reject.command.test.ts  | 105 ++++++++++++++
 .../src/commands/task/plan-reject.command.ts       |  70 +++++++++-
 .../src/tasks/task-kernel/kernel-replan.test.ts    | 154 +++++++++++++++++++++
 packages/core/src/tasks/task-kernel/kernel.ts      |  15 +-
 packages/core/src/tasks/task-kernel/model.ts       |   9 +-
 6 files changed, 358 insertions(+), 4 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
