Task: `202607221908-RC1DX8`
Title: Migrate runner and Hermes command boundaries
Canonical task record: `.agentplane/tasks/202607221908-RC1DX8/README.md`

## Summary

Migrate runner and Hermes command boundaries

RF-24/RF-25 vertical slice: move runner/Hermes surfaces onto minimal session capabilities, shared supervisor use cases, typed episode results, and compatibility renderers.

## Scope

- In scope: task run/bootstrap/status/insights and Hermes projection/supervision commands, runner/process/Git/policy/knowledge capability sets, typed results/errors, human/JSON renderers, and removal of internal AgentPlane subprocess parsing.
- Out of scope: provider release operations and context/evaluator commands.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T02:59:16.058Z
- Branch: task/202607221908-RC1DX8/migrate-runner-and-hermes-command-boundaries
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-run.test.ts          | 14 ++++-
 .../src/cli/run-cli/command-catalog.test.ts        | 65 ++++++++++++++++++++++
 .../src/cli/run-cli/command-catalog/core.ts        | 16 ++++--
 .../src/cli/run-cli/command-catalog/kernel.test.ts | 36 ++++++++++++
 .../src/cli/run-cli/command-catalog/project.ts     | 40 ++++++++++---
 .../runner-hermes-capability-profiles.ts           | 45 +++++++++++++++
 .../src/cli/run-cli/command-catalog/task.ts        | 31 ++++++++---
 .../src/cli/run-cli/command-loaders/core.ts        | 14 ++---
 .../src/cli/run-cli/command-loaders/project.ts     | 48 ++++++++++++----
 .../src/cli/run-cli/command-loaders/task.ts        | 59 ++++++++++++++------
 .../src/commands/hermes/hermes.command.ts          | 45 ++++++++++-----
 .../src/commands/insights/insights-report.ts       | 10 +++-
 .../src/commands/insights/insights.command.ts      | 19 +++++--
 .../agentplane/src/commands/task/run.command.ts    | 21 ++++++-
 14 files changed, 381 insertions(+), 82 deletions(-)
```

</details>
