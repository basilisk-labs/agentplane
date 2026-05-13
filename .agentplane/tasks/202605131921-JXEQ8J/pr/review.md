# PR Review

Created: 2026-05-13T19:40:40.747Z

## Task

- Task: `202605131921-JXEQ8J`
- Title: Cloud backend: optional auto-push task status changes to remote
- Status: DOING
- Branch: `task/202605131921-JXEQ8J/cloud-auto-sync`
- Canonical task record: `.agentplane/tasks/202605131921-JXEQ8J/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T19:40:40.747Z
- Branch: task/202605131921-JXEQ8J/cloud-auto-sync
- Head: e4f235b15a4d

```text
 .../blueprint/resolved-snapshot.json               | 551 +++++++++++++++++++++
 docs/user/backends/cloud.mdx                       |  21 +
 .../src/backends/task-backend/cloud-backend.ts     |   6 +
 .../src/cli/run-cli.core.backend-sync.test.ts      |  49 ++
 packages/agentplane/src/commands/backend.ts        |  87 +++-
 .../src/commands/backend/sync.command.ts           |  26 +
 .../src/commands/task/shared/transition-command.ts |  53 +-
 .../task/shared/transition-command.unit.test.ts    |  96 ++++
 8 files changed, 882 insertions(+), 7 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
