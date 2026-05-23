Task: `202605221744-GF25D1`
Title: Add agent task brief command
Canonical task record: `.agentplane/tasks/202605221744-GF25D1/README.md`

## Summary

Add agent task brief command

Add a compact task brief surface that merges route decision, checkout role, next action, blockers, Verify Steps, blueprint evidence, and stop rules into one agent-ready view.

## Scope

- In scope: Add a compact task brief surface that merges route decision, checkout role, next action, blockers, Verify Steps, blueprint evidence, and stop rules into one agent-ready view.
- Out of scope: unrelated refactors not required for "Add agent task brief command".

## Verification

- State: ok
- Note:

```text
Evaluator check: task brief satisfies approved local-first agent context scope. Evidence covers text
and JSON output, no default gh lookup regression, generated CLI docs, typecheck, lint, format, and
runtime bootstrap.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T01:10:07.020Z
- Branch: task/202605221744-GF25D1/agent-task-brief
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  36 ++++
 .../src/cli/run-cli.core.route-decision.test.ts    |  96 ++++++++-
 .../src/cli/run-cli/command-catalog/task.ts        |   3 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../src/commands/shared/route-decision.ts          |   3 +-
 .../agentplane/src/commands/task/brief.command.ts  | 224 +++++++++++++++++++++
 .../agentplane/src/commands/task/task.command.ts   |   4 +
 7 files changed, 368 insertions(+), 2 deletions(-)
```

</details>
