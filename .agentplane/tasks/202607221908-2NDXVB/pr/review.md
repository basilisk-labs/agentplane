# PR Review

Created: 2026-07-31T23:00:26.855Z

## Task

- Task: `202607221908-2NDXVB`
- Title: Migrate task, lifecycle, and route command boundaries
- Status: DONE
- Branch: `task/202607221908-2NDXVB/migrate-task-lifecycle-and-route-command-boundar`
- Canonical task record: `.agentplane/tasks/202607221908-2NDXVB/README.md`

## Verification

- State: ok
- Note: Passed: granular capability denial, lazy remote provider resolution, typed lifecycle rendering, invariants, guards, typecheck, architecture, critical and focused matrices. Full-suite timeout classified against clean main.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T23:35:34.211Z
- Branch: task/202607221908-2NDXVB/migrate-task-lifecycle-and-route-command-boundar
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.command-session.test.ts   |  57 ++++-
 .../src/cli/run-cli/command-catalog.test.ts        |  96 +++++++++
 .../src/cli/run-cli/command-catalog/kernel.test.ts |  27 +++
 .../src/cli/run-cli/command-catalog/lifecycle.ts   |  27 ++-
 .../command-catalog/task-capability-profiles.ts    |  54 +++++
 .../src/cli/run-cli/command-catalog/task.ts        | 170 ++++++++++-----
 .../src/cli/run-cli/command-loaders/lifecycle.ts   |  49 +++--
 .../src/cli/run-cli/command-loaders/task.ts        | 231 ++++++++++++---------
 .../commands/task/authority-grant.command.test.ts  |  51 ++++-
 .../src/commands/task/authority-grant.command.ts   |   9 +-
 .../agentplane/src/commands/task/begin.command.ts  |  37 +---
 .../agentplane/src/commands/task/brief.command.ts  |   9 +-
 packages/agentplane/src/commands/task/plan.ts      |  18 +-
 .../agentplane/src/commands/task/status.command.ts |   9 +-
 14 files changed, 635 insertions(+), 209 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
