# PR Review

Created: 2026-08-30T21:48:11.941Z

## Task

- Task: `202608291006-255K66`
- Title: Cut over to the canonical Task kernel and retire legacy core paths
- Status: DOING
- Branch: `task/202608291006-255K66/cut-over-to-the-canonical-task-kernel-and-retire`
- Canonical task record: `.agentplane/tasks/202608291006-255K66/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-30T21:48:11.941Z
- Branch: task/202608291006-255K66/cut-over-to-the-canonical-task-kernel-and-retire
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/harness-dev.mdx                     |  99 +++++++++++++++++
 .../adapters/task-backend/kernel-next-action.ts    |  10 +-
 .../run-cli.core.task-status-token-usage.test.ts   |  73 +++++++++++++
 .../agentplane/src/commands/task/active.command.ts | 110 ++++++++++++++-----
 .../src/commands/task/active.command.unit.test.ts  |  51 +++++++++
 .../agentplane/src/commands/task/brief.command.ts  |   5 +
 .../task/execution-authority-context.test.ts       |  28 ++++-
 .../commands/task/execution-authority-context.ts   |   4 +
 .../agentplane/src/commands/task/kernel-read.ts    |  91 ++++++++++++++++
 .../src/commands/task/next-action.command.ts       |   5 +
 packages/agentplane/src/commands/task/ready.ts     |   6 +
 .../src/commands/task/show-kernel.test.ts          | 121 +++++++++++++++++++++
 packages/agentplane/src/commands/task/show.ts      |  15 +--
 .../agentplane/src/commands/task/status.command.ts |   5 +
 14 files changed, 581 insertions(+), 42 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
