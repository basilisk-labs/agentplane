# PR Review

Created: 2026-08-06T16:48:32.143Z

## Task

- Task: `202608061646-WCARQG`
- Title: Add explainable per-task workflow routing
- Status: DONE
- Branch: `task/202608061646-WCARQG/add-explainable-per-task-workflow-routing`
- Canonical task record: `.agentplane/tasks/202608061646-WCARQG/README.md`

## Verification

- State: ok
- Note: Implementation 1c7849f0e is accepted for integration with concrete check evidence.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T17:49:35.409Z
- Branch: task/202608061646-WCARQG/add-explainable-per-task-workflow-routing
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |   1 +
 .../src/backends/task-backend/shared/record.ts     |  30 +++++
 .../src/backends/task-backend/shared/types.ts      |   2 +
 .../src/cli/run-cli.core.task-routing.test.ts      | 134 +++++++++++++++++++++
 .../src/cli/run-cli.core.tasks.create.test.ts      |  44 +++++++
 .../src/commands/blueprint/task-input.test.ts      |  21 ++++
 .../src/commands/blueprint/task-input.ts           |   3 +-
 .../src/commands/branch/work-start.command.ts      |   8 +-
 .../src/commands/shared/route-decision-types.ts    |   2 +
 .../src/commands/shared/route-decision.ts          |   8 +-
 .../agentplane/src/commands/shared/task-backend.ts |   1 +
 .../agentplane/src/commands/task/begin.command.ts  |   1 +
 .../task/branch-task-supervisor-operations.ts      |   7 +-
 .../agentplane/src/commands/task/brief-model.ts    |   4 +-
 .../agentplane/src/commands/task/brief-render.ts   |  15 +++
 packages/agentplane/src/commands/task/new.spec.ts  |  10 ++
 packages/agentplane/src/commands/task/new.ts       |  15 +++
 .../src/commands/task/next-action.command.ts       |  16 +++
 .../agentplane/src/commands/task/run.command.ts    |  14 ++-
 .../src/runtime/task-intake/resolve-materialize.ts |   3 +
 .../src/runtime/task-intake/resolve-normalize.ts   |   1 +
 .../agentplane/src/runtime/task-intake/types.ts    |   3 +-
 .../agentplane/src/runtime/task-routing/index.ts   |   5 +
 .../src/runtime/task-routing/resolve.test.ts       |  75 ++++++++++++
 .../agentplane/src/runtime/task-routing/resolve.ts | 126 +++++++++++++++++++
 .../schemas/task-readme-frontmatter.schema.json    |  42 +++++++
 packages/core/schemas/tasks-export.schema.json     |  42 +++++++
 packages/core/src/tasks/index.ts                   |   3 +
 .../core/src/tasks/task-artifact-schema.task.ts    |  12 ++
 .../src/tasks/task-provider-safe-projection.ts     |   3 +
 packages/core/src/tasks/task-readme.ts             |   1 +
 packages/core/src/tasks/task-store.ts              |  12 ++
 packages/core/src/tasks/tasks-export.ts            |   3 +
 .../schemas/task-readme-frontmatter.schema.json    |  42 +++++++
 packages/spec/schemas/tasks-export.schema.json     |  42 +++++++
 schemas/task-readme-frontmatter.schema.json        |  42 +++++++
 schemas/tasks-export.schema.json                   |  42 +++++++
 37 files changed, 825 insertions(+), 10 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
