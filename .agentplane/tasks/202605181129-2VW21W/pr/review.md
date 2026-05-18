# PR Review

Created: 2026-05-18T11:30:12.696Z

## Task

- Task: `202605181129-2VW21W`
- Title: Require evaluator quality gate after verification
- Status: DOING
- Branch: `task/202605181129-2VW21W/evaluator-quality-gate`
- Canonical task record: `.agentplane/tasks/202605181129-2VW21W/README.md`

## Verification

- State: ok
- Note: EVALUATOR quality gate passed for commit c1b49d671.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T11:42:43.344Z
- Branch: task/202605181129-2VW21W/evaluator-quality-gate
- Head: c1b49d671316

```text
 .../blueprint/resolved-snapshot.json               | 570 +++++++++++++++++++++
 .../agentplane/src/backends/task-backend/shared.ts |   3 +
 .../src/backends/task-backend/shared/normalize.ts  |  38 ++
 .../src/backends/task-backend/shared/record.ts     |   3 +
 .../src/backends/task-backend/shared/types.ts      |   4 +
 .../agentplane/src/blueprints/builtin-builder.ts   |   6 +
 .../src/blueprints/builtins-specialized.ts         |  20 +
 packages/agentplane/src/blueprints/builtins.ts     |  14 +
 packages/agentplane/src/blueprints/model.ts        |   2 +
 packages/agentplane/src/blueprints/validate.ts     |   1 +
 .../commands/pr/integrate/internal/prepare.test.ts |  21 +-
 .../src/commands/pr/integrate/internal/prepare.ts  |   6 +
 .../agentplane/src/commands/shared/task-backend.ts |   1 +
 .../src/commands/task/finish-blueprint-evidence.ts |  20 +
 .../agentplane/src/commands/task/finish-execute.ts |  10 +-
 .../commands/task/finish.validation.unit.test.ts   |  10 +
 .../src/commands/task/quality-review-gate.ts       |  74 +++
 .../commands/task/quality-review-gate.unit.test.ts |  96 ++++
 .../src/commands/task/verify-record-execute.ts     |  39 ++
 packages/agentplane/src/runtime/sgr/contracts.ts   |   1 +
 .../agentplane/src/workflow-lifecycle/contract.ts  |  30 +-
 .../schemas/task-readme-frontmatter.schema.json    | 250 +++++++--
 packages/core/schemas/tasks-export.schema.json     | 252 +++++++--
 packages/core/src/tasks/index.ts                   |   2 +
 .../core/src/tasks/task-artifact-schema.task.ts    |   3 +
 .../src/tasks/task-artifact-schema.verification.ts |  20 +
 packages/core/src/tasks/task-readme.ts             |  12 +
 packages/core/src/tasks/task-store.ts              |  13 +
 .../schemas/task-readme-frontmatter.schema.json    | 250 +++++++--
 packages/spec/schemas/tasks-export.schema.json     | 252 +++++++--
 schemas/task-readme-frontmatter.schema.json        | 250 +++++++--
 schemas/tasks-export.schema.json                   | 252 +++++++--
 32 files changed, 2345 insertions(+), 180 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
