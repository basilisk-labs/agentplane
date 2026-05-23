# PR Review

Created: 2026-05-23T18:12:14.991Z

## Task

- Task: `202605231803-M9TK2M`
- Title: Fix agent context cognitive-load regressions
- Status: DOING
- Branch: `task/202605231803-M9TK2M/fix-agent-context-load`
- Canonical task record: `.agentplane/tasks/202605231803-M9TK2M/README.md`

## Verification

- State: ok
- Note: Focused CLI regression tests, typecheck, lint, format, and live task active/brief checks passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T18:12:14.991Z
- Branch: task/202605231803-M9TK2M/fix-agent-context-load
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.route-decision.test.ts    | 18 ++++++++--
 .../src/commands/shared/route-decision.ts          | 26 ++++++++++++--
 .../src/commands/shared/task-backend.test.ts       | 29 +++++++++++++++
 .../agentplane/src/commands/shared/task-backend.ts | 20 ++++++++---
 .../agentplane/src/commands/task/active.command.ts |  1 +
 .../agentplane/src/commands/task/brief.command.ts  | 41 ++++++++++++++++++++--
 packages/agentplane/src/commands/task/list.ts      |  5 ++-
 7 files changed, 127 insertions(+), 13 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
