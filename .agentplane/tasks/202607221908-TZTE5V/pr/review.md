# PR Review

Created: 2026-08-01T00:02:28.030Z

## Task

- Task: `202607221908-TZTE5V`
- Title: Migrate project, config, help, and docs command boundaries
- Status: DOING
- Branch: `task/202607221908-TZTE5V/migrate-project-config-help-and-docs-command-bou`
- Canonical task record: `.agentplane/tasks/202607221908-TZTE5V/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T00:02:28.030Z
- Branch: task/202607221908-TZTE5V/migrate-project-config-help-and-docs-command-bou
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../run-cli.core.help-snap.test.ts.snap            |  14 ++-
 .../src/cli/run-cli.core.command-session.test.ts   |  69 ++++++++++++++
 .../src/cli/run-cli/command-catalog.test.ts        |  43 ++++++++-
 .../src/cli/run-cli/command-catalog/core.ts        |  77 +++++++++++----
 .../src/cli/run-cli/command-catalog/kernel.test.ts |  23 +++++
 .../src/cli/run-cli/command-catalog/lifecycle.ts   |   3 +-
 .../command-catalog/project-capability-profiles.ts |  17 ++++
 .../src/cli/run-cli/command-loaders/core.ts        |  78 +++++++++++----
 .../src/cli/run-cli/command-loaders/lifecycle.ts   |   5 +-
 .../agentplane/src/cli/run-cli/commands/config.ts  | 105 ++++++++++++++-------
 .../agentplane/src/cli/run-cli/commands/ide.ts     |   4 +-
 .../src/cli/run-cli/commands/platform.ts           |  10 +-
 packages/agentplane/src/cli/spec/help.ts           |  78 ++++++++-------
 .../agentplane/src/commands/docs/cli.command.ts    |  27 +++++-
 .../src/commands/runtime.command.test.ts           |   6 +-
 .../agentplane/src/commands/runtime.command.ts     |  72 ++++++++------
 16 files changed, 478 insertions(+), 153 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
