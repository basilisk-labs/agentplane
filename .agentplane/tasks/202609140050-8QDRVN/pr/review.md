# PR Review

Created: 2026-09-14T00:54:28.900Z

## Task

- Task: `202609140050-8QDRVN`
- Title: Recover an external-agent result rejected during supervisor application
- Status: DOING
- Branch: `task/202609140050-8QDRVN/recover-an-external-agent-result-rejected-during`
- Canonical task record: `.agentplane/tasks/202609140050-8QDRVN/README.md`

## Verification

- State: needs_rework
- Note: Rework: Declared check failed: bun run ci:local:full
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-14T01:11:18.204Z
- Branch: task/202609140050-8QDRVN/recover-an-external-agent-result-rejected-during
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-advance-effect-recovery.test.ts | 127 +++++++++++++++++++++
 .../external-agent-result-rejection-recovery.ts    |  88 ++++++++++++++
 .../task/external-agent-supervisor-recovery.ts     |  55 +++++++++
 .../src/commands/task/external-agent-supervisor.ts |  25 ++--
 4 files changed, 282 insertions(+), 13 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
