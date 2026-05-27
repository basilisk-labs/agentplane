Task: `202605271841-QKDHZY`
Title: Add runner observability foundation
Canonical task record: `.agentplane/tasks/202605271841-QKDHZY/README.md`

## Summary

Add runner observability foundation

Add public runner status/inspect/logs surfaces and coordination/authority prompt contracts so independent Codex task runners can be monitored safely before adding parallelization recipes.

## Scope

- In scope: Add public runner status/inspect/logs surfaces and coordination/authority prompt contracts so independent Codex task runners can be monitored safely before adding parallelization recipes.
- Out of scope: unrelated refactors not required for "Add runner observability foundation".

## Verification

- State: ok
- Note: Runner observability foundation implemented and locally verified.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-27T18:42:53.887Z
- Branch: task/202605271841-QKDHZY/runner-observability-foundation
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  75 ++++
 docs/user/commands.mdx                             |  11 +
 docs/user/configuration.mdx                        |   4 +-
 .../src/cli/run-cli.core.task-handoff.test.ts      |   4 +-
 .../src/cli/run-cli.core.task-run.test.ts          | 122 ++++++-
 .../src/cli/run-cli/command-catalog/task.ts        |  13 +-
 .../src/cli/run-cli/command-loaders/task.ts        |  12 +
 .../agentplane/src/commands/shared/task-handoff.ts |  46 ++-
 .../agentplane/src/commands/task/run.command.ts    | 382 +++++++++++++++++++++
 .../src/runner/usecases/task-run-blueprint.test.ts |   3 +
 .../src/runner/usecases/task-run-bootstrap.ts      |   3 +
 11 files changed, 666 insertions(+), 9 deletions(-)
```

</details>
