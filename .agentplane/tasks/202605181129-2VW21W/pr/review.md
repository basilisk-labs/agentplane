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
- Note: EVALUATOR quality gate refreshed for implementation head de0f4b28c after fail-open fixes.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T13:00:25.698Z
- Branch: task/202605181129-2VW21W/evaluator-quality-gate
- Head: de0f4b28c03e

```text
 .../blueprint/resolved-snapshot.json               | 570 +++++++++++++++++++++
 packages/agentplane/assets/AGENTS.md               |   2 +-
 .../src/backends/task-backend/shared/normalize.ts  |  38 ++
 .../src/backends/task-backend/shared/record.ts     |   3 +
 .../src/backends/task-backend/shared/types.ts      |   3 +
 .../agentplane/src/blueprints/builtin-builder.ts   |   6 +
 .../src/blueprints/builtins-specialized.ts         |   9 +
 packages/agentplane/src/blueprints/builtins.ts     |  19 +
 packages/agentplane/src/blueprints/model.ts        |   2 +
 packages/agentplane/src/blueprints/validate.ts     |   1 +
 .../src/cli/release-critical-lifecycle.test.ts     |  10 +
 .../commands/pr/integrate/internal/prepare.test.ts |  51 +-
 .../src/commands/pr/integrate/internal/prepare.ts  |  36 ++
 .../agentplane/src/commands/shared/task-backend.ts |   1 +
 .../src/commands/task/finish-blueprint-evidence.ts |  20 +
 .../agentplane/src/commands/task/finish-execute.ts |  10 +-
 .../commands/task/finish.close-tail.unit.test.ts   |  30 +-
 .../src/commands/task/finish.state.unit.test.ts    |  30 +-
 .../commands/task/finish.validation.unit.test.ts   |  33 +-
 .../src/commands/task/quality-review-gate.ts       |  70 +++
 .../commands/task/quality-review-gate.unit.test.ts | 139 +++++
 .../src/commands/task/verify-record-execute.ts     |  39 ++
 packages/agentplane/src/commands/workflow.test.ts  |  10 +
 .../src/commands/workflow.verify-hooks.test.ts     |  10 +
 packages/agentplane/src/runtime/sgr/contracts.ts   |   1 +
 .../agentplane/src/workflow-lifecycle/contract.ts  |  30 +-
 .../schemas/task-readme-frontmatter.schema.json    |  55 ++
 packages/core/schemas/tasks-export.schema.json     |  55 ++
 packages/core/src/tasks/index.ts                   |   2 +
 .../core/src/tasks/task-artifact-schema.task.ts    |   3 +
 .../src/tasks/task-artifact-schema.verification.ts |  20 +
 packages/core/src/tasks/task-readme.ts             |  68 ++-
 packages/core/src/tasks/task-store.ts              |  13 +
 .../schemas/task-readme-frontmatter.schema.json    |  55 ++
 packages/spec/schemas/tasks-export.schema.json     |  55 ++
 schemas/task-readme-frontmatter.schema.json        |  55 ++
 schemas/tasks-export.schema.json                   |  55 ++
 37 files changed, 1521 insertions(+), 88 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
