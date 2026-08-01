# PR Review

Created: 2026-08-01T02:58:47.934Z

## Task

- Task: `202607221908-RC1DX8`
- Title: Migrate runner and Hermes command boundaries
- Status: DONE
- Branch: `task/202607221908-RC1DX8/migrate-runner-and-hermes-command-boundaries`
- Canonical task record: `.agentplane/tasks/202607221908-RC1DX8/README.md`

## Verification

- State: ok
- Note: PASS hosted-contract rework at 70dbba1ebf95e36842902ac0f3d5e23fb45b31cc: Hermes catalog extraction restores the 600-line hotspot invariant without changing command graph or authority selection.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T02:59:16.058Z
- Branch: task/202607221908-RC1DX8/migrate-runner-and-hermes-command-boundaries
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-run.test.ts          |  80 +++++++------
 .../src/cli/run-cli/command-catalog.test.ts        | 119 ++++++++++++++++++++
 .../command-catalog/command-context-port.ts        |   1 +
 .../src/cli/run-cli/command-catalog/core.ts        |  16 ++-
 .../src/cli/run-cli/command-catalog/hermes.ts      |  92 +++++++++++++++
 .../src/cli/run-cli/command-catalog/kernel.test.ts |  67 +++++++++++
 .../src/cli/run-cli/command-catalog/kernel.ts      |  61 ++++++++++
 .../src/cli/run-cli/command-catalog/project.ts     |  22 +---
 .../runner-hermes-capability-profiles.ts           |  72 ++++++++++++
 .../src/cli/run-cli/command-catalog/task.ts        |  49 ++++++--
 .../src/cli/run-cli/command-loaders/core.ts        |  14 +--
 .../src/cli/run-cli/command-loaders/project.ts     |  74 +++++++++---
 .../src/cli/run-cli/command-loaders/task.ts        |  63 ++++++++---
 .../src/cli/run-cli/registry.run.test.ts           | 124 +++++++++++++++++++++
 .../src/commands/hermes/hermes.command.ts          |  46 +++++---
 .../src/commands/insights/insights-report.ts       |  10 +-
 .../src/commands/insights/insights.command.ts      |  19 +++-
 .../agentplane/src/commands/task/run.command.ts    |  27 ++++-
 18 files changed, 824 insertions(+), 132 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
