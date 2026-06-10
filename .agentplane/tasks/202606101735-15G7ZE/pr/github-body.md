Task: `202606101735-15G7ZE`
Title: Add task-level human input blockers
Canonical task record: `.agentplane/tasks/202606101735-15G7ZE/README.md`

## Summary

Add task-level human input blockers

Add explicit task-scoped human input blocker support so agents can record a blocking question, ap task active surfaces waiting-on-user tasks with the exact question and answer command, and route guidance treats unresolved user input as a first-class blocker.

## Scope

- In scope: Add explicit task-scoped human input blocker support so agents can record a blocking question, ap task active surfaces waiting-on-user tasks with the exact question and answer command, and route guidance treats unresolved user input as a first-class blocker.
- Out of scope: unrelated refactors not required for "Add task-level human input blockers".

## Verification

- State: ok
- Note:

```text
Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts
packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts
packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts. Result: pass, 3 files / 19
tests. Command: bun run --filter=agentplane build. Result: pass, tsup build succeeded. Command: node
.agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: git diff --check.
Result: pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-10T17:38:34.588Z
- Branch: task/202606101735-15G7ZE/add-task-level-human-input-blockers
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.task-next-action-json.test.ts |  69 ++++++++++++
 .../src/cli/run-cli.core.tasks.active.test.ts      |  74 +++++++++++++
 .../src/cli/run-cli.core.tasks.lifecycle.test.ts   |  89 +++++++++++++++
 .../src/cli/run-cli/command-catalog/task.ts        |   6 ++
 .../src/cli/run-cli/command-loaders/task.ts        |   8 ++
 .../src/commands/shared/route-decision-blockers.ts |   9 ++
 .../commands/shared/route-decision-next-action.ts  |  10 ++
 .../src/commands/shared/route-decision.ts          |   9 ++
 .../agentplane/src/commands/task/active.command.ts |  19 ++++
 .../agentplane/src/commands/task/answer.command.ts | 107 ++++++++++++++++++
 .../agentplane/src/commands/task/ask.command.ts    | 119 +++++++++++++++++++++
 .../agentplane/src/commands/task/human-input.ts    |  94 ++++++++++++++++
 12 files changed, 613 insertions(+)
```

</details>
