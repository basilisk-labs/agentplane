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

- State: ok
- Note:

```text
PASS: runner/Hermes capability profiles, lazy preparation/execution boundaries, typed in-process
supervision, and human/JSON/insights compatibility verified; focused 46/46, critical 12/12,
typecheck, guards, lifecycle 8/8, architecture, format, lint, and Knip 545/545 passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-01T02:59:16.058Z
- Branch: task/202607221908-RC1DX8/migrate-runner-and-hermes-command-boundaries
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-run.test.ts          | 80 ++++++++++++----------
 .../src/cli/run-cli/command-catalog.test.ts        | 80 ++++++++++++++++++++++
 .../command-catalog/command-context-port.ts        |  1 +
 .../src/cli/run-cli/command-catalog/core.ts        | 16 +++--
 .../src/cli/run-cli/command-catalog/kernel.test.ts | 38 ++++++++++
 .../src/cli/run-cli/command-catalog/project.ts     | 41 ++++++++---
 .../runner-hermes-capability-profiles.ts           | 54 +++++++++++++++
 .../src/cli/run-cli/command-catalog/task.ts        | 49 ++++++++++---
 .../src/cli/run-cli/command-loaders/core.ts        | 14 ++--
 .../src/cli/run-cli/command-loaders/project.ts     | 49 +++++++++----
 .../src/cli/run-cli/command-loaders/task.ts        | 63 ++++++++++++-----
 .../src/cli/run-cli/registry.run.test.ts           | 47 +++++++++++++
 .../src/commands/hermes/hermes.command.ts          | 45 ++++++++----
 .../src/commands/insights/insights-report.ts       | 10 ++-
 .../src/commands/insights/insights.command.ts      | 19 +++--
 .../agentplane/src/commands/task/run.command.ts    | 27 +++++++-
 16 files changed, 513 insertions(+), 120 deletions(-)
```

</details>
