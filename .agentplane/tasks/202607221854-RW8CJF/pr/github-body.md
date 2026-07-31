Task: `202607221854-RW8CJF`
Title: Define granular CommandSession capabilities and migrate a pilot slice
Canonical task record: `.agentplane/tasks/202607221854-RW8CJF/README.md`

## Summary

Define granular CommandSession capabilities and migrate a pilot slice

RF-24a: replace coarse CommandNeeds with composable project/config/backend/task/Git/route/policy/approval/context/provider/output capabilities and prove typed lazy resolution on representative commands.

## Scope

- In scope: capability type model, command catalog declaration, typed handler subsets, lazy resolver graph, preparation tracing hooks, and pilot migration of simple/read, task, route, and provider commands.
- Out of scope: migrating every command family in one big-bang.

## Verification

- State: ok
- Note:

```text
CommandSession capability pilot passed typed denial, laziness, trace, architecture, critical CLI,
typecheck, and bundle gates at implementation SHA 33e59899d.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T20:23:47.343Z
- Branch: task/202607221854-RW8CJF/define-granular-commandsession-capabilities-and
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/agentplane/src/cli/run-cli.core.test.ts   |  27 +++
 packages/agentplane/src/cli/run-cli.ts             |  13 +
 .../src/cli/run-cli/command-catalog.test.ts        |  39 +++
 .../agentplane/src/cli/run-cli/command-catalog.ts  |   9 +-
 .../cli/run-cli/command-catalog/command-session.ts | 262 +++++++++++++++++++++
 .../src/cli/run-cli/command-catalog/core.ts        |  11 +-
 .../src/cli/run-cli/command-catalog/kernel.test.ts | 139 +++++++++++
 .../src/cli/run-cli/command-catalog/kernel.ts      | 158 +++++++++++--
 .../src/cli/run-cli/command-catalog/lifecycle.ts   |   6 +-
 .../src/cli/run-cli/command-catalog/project.ts     |  18 +-
 .../src/cli/run-cli/command-catalog/task.ts        |  21 +-
 .../src/cli/run-cli/command-loaders/core.ts        |  18 +-
 .../src/cli/run-cli/command-loaders/lifecycle.ts   |   6 +-
 .../src/cli/run-cli/command-loaders/project.ts     |  24 +-
 .../src/cli/run-cli/command-loaders/task.ts        |  32 ++-
 .../agentplane/src/cli/run-cli/commands/config.ts  |   6 +-
 .../src/cli/run-cli/commands/core/agents.ts        |   4 +-
 .../agentplane/src/cli/run-cli/registry.run.ts     |  17 +-
 .../src/commands/task/next-action.command.ts       |  10 +-
 19 files changed, 765 insertions(+), 55 deletions(-)
```

</details>
