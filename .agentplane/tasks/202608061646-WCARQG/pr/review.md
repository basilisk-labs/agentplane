# PR Review

Created: 2026-08-06T16:48:32.143Z

## Task

- Task: `202608061646-WCARQG`
- Title: Add explainable per-task workflow routing
- Status: DOING
- Branch: `task/202608061646-WCARQG/add-explainable-per-task-workflow-routing`
- Canonical task record: `.agentplane/tasks/202608061646-WCARQG/README.md`

## Verification

- State: ok
- Note: Post-commit verification binds the passing focused tests, 119 core task tests, typecheck, schema parity, and policy routing evidence to implementation commit b060e9b18.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T16:48:32.143Z
- Branch: task/202608061646-WCARQG/add-explainable-per-task-workflow-routing
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/backends/task-backend/shared/record.ts     |  30 ++
 .../src/backends/task-backend/shared/types.ts      |   2 +
 .../src/cli/run-cli.core.route-decision.test.ts    | 104 +++++++
 .../src/cli/run-cli.core.tasks.create.test.ts      |  44 +++
 .../src/commands/blueprint/task-input.test.ts      |  21 ++
 .../src/commands/blueprint/task-input.ts           |   3 +-
 .../src/commands/branch/work-start.command.ts      |   8 +-
 .../src/commands/shared/route-decision-types.ts    |   2 +
 .../src/commands/shared/route-decision.ts          |   8 +-
 .../agentplane/src/commands/shared/task-backend.ts |   1 +
 .../agentplane/src/commands/task/begin.command.ts  |   1 +
 .../task/branch-task-supervisor-operations.ts      |   7 +-
 .../agentplane/src/commands/task/brief-model.ts    |   4 +-
 .../agentplane/src/commands/task/brief-render.ts   |  15 +
 packages/agentplane/src/commands/task/new.spec.ts  |  10 +
 packages/agentplane/src/commands/task/new.ts       |  15 +
 .../src/commands/task/next-action.command.ts       |  16 ++
 .../agentplane/src/commands/task/run.command.ts    |  14 +-
 .../src/runtime/task-intake/resolve-materialize.ts |   3 +
 .../src/runtime/task-intake/resolve-normalize.ts   |   1 +
 .../agentplane/src/runtime/task-intake/types.ts    |   2 +
 .../agentplane/src/runtime/task-routing/index.ts   |   5 +
 .../src/runtime/task-routing/resolve.test.ts       |  75 +++++
 .../agentplane/src/runtime/task-routing/resolve.ts | 115 ++++++++
 .../schemas/task-readme-frontmatter.schema.json    | 305 ++++++++++++++++++---
 packages/core/schemas/tasks-export.schema.json     | 291 +++++++++++++++++---
 packages/core/src/tasks/index.ts                   |   3 +
 .../core/src/tasks/task-artifact-schema.task.ts    |  12 +
 .../src/tasks/task-provider-safe-projection.ts     |   3 +
 packages/core/src/tasks/task-readme.ts             |   1 +
 packages/core/src/tasks/task-store.ts              |  12 +
 packages/core/src/tasks/tasks-export.ts            |   3 +
 .../schemas/task-readme-frontmatter.schema.json    | 305 ++++++++++++++++++---
 packages/spec/schemas/tasks-export.schema.json     | 291 +++++++++++++++++---
 schemas/task-readme-frontmatter.schema.json        | 305 ++++++++++++++++++---
 schemas/tasks-export.schema.json                   | 291 +++++++++++++++++---
 36 files changed, 2088 insertions(+), 240 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
