# PR Review

Created: 2026-08-03T21:35:42.405Z

## Task

- Task: `202608032116-V9DBA5`
- Title: Restore ACR generation in hosted close qualification
- Status: DOING
- Branch: `task/202608032116-V9DBA5/restore-acr-generation-in-hosted-close-qualifica`
- Canonical task record: `.agentplane/tasks/202608032116-V9DBA5/README.md`

## Verification

- State: ok
- Note: PASS: hosted close now writes a valid tracked ACR with token usage and fails closed on required ACR refresh errors without changing ordinary finish fallback semantics.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T21:36:24.646Z
- Branch: task/202608032116-V9DBA5/restore-acr-generation-in-hosted-close-qualifica
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/commands.mdx                             |  2 +-
 .../src/cli/run-cli.core.task-hosted-close.test.ts |  3 +++
 packages/agentplane/src/commands/acr/generate.ts   |  2 +-
 .../commands/task/finish-acr-refresh.unit.test.ts  | 27 ++++++++++++++++++++++
 .../agentplane/src/commands/task/finish-shared.ts  | 21 +++++++++++++++--
 .../src/commands/task/hosted-close.command.ts      |  1 +
 6 files changed, 52 insertions(+), 4 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
