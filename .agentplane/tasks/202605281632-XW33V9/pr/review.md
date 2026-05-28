# PR Review

Created: 2026-05-28T16:32:53.504Z

## Task

- Task: `202605281632-XW33V9`
- Title: Remove runtime tasks.json dependencies
- Status: DOING
- Branch: `task/202605281632-XW33V9/remove-runtime-tasks-json-dependencies`
- Canonical task record: `.agentplane/tasks/202605281632-XW33V9/README.md`

## Verification

- State: ok
- Note: Focused tests, typecheck, eslint, routing check, and doctor passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-28T16:32:53.504Z
- Branch: task/202605281632-XW33V9/remove-runtime-tasks-json-dependencies
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/branch/work-start.direct.test.ts  |  42 +++++
 .../src/commands/branch/work-start.direct.ts       |   1 -
 .../src/commands/doctor.command.open-pr.test.ts    |  44 -----
 .../src/commands/doctor.command.task-docs.test.ts  | 202 +++++++++++----------
 packages/agentplane/src/commands/doctor.run.ts     |   7 +-
 .../agentplane/src/commands/doctor/archive.test.ts |  28 ++-
 packages/agentplane/src/commands/doctor/archive.ts |  50 +++--
 .../agentplane/src/commands/doctor/branch-pr.ts    |  49 +++--
 .../src/commands/doctor/workspace-task-state.ts    |  54 +++---
 9 files changed, 260 insertions(+), 217 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
