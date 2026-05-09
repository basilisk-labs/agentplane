Task: `202605091617-83FQ3C`
Title: Introduce bounded EVALUATOR rework loop with return-to-previous-agent
Canonical task record: `.agentplane/tasks/202605091617-83FQ3C/README.md`

## Summary

Introduce bounded EVALUATOR rework loop with return-to-previous-agent

Add bounded evaluation loop so results are reviewed against task goals, best coding practices, and repository rules; on rework return to previous agent with reason and max-attempts guard in configuration/settings.

## Scope

- In scope: Add bounded evaluation loop so results are reviewed against task goals, best coding practices, and repository rules; on rework return to previous agent with reason and max-attempts guard in configuration/settings.
- Out of scope: unrelated refactors not required for "Introduce bounded EVALUATOR rework loop with return-to-previous-agent".

## Verification

- State: ok
- Note: Verified bounded evaluator rework loop batch.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T16:50:44.513Z
- Branch: task/202605091617-83FQ3C/bounded-evaluator-loop
- Head: 04b39e02421c

```text
 .agentplane/tasks/202605091617-362W7W/README.md    | 131 +++++
 .../blueprint/resolved-snapshot.json               | 504 +++++++++++++++++++
 .agentplane/tasks/202605091617-96XQSV/README.md    | 131 +++++
 .../blueprint/resolved-snapshot.json               | 544 +++++++++++++++++++++
 .agentplane/tasks/202605091617-CBKJSC/README.md    | 131 +++++
 .../blueprint/resolved-snapshot.json               | 504 +++++++++++++++++++
 .agentplane/tasks/202605091617-MK6T79/README.md    | 130 +++++
 .../blueprint/resolved-snapshot.json               | 348 +++++++++++++
 .../evaluation-and-recursive-improvement.mdx       |  14 +
 .../src/backends/task-backend/shared/export.ts     |   1 +
 .../src/backends/task-backend/shared/normalize.ts  |  21 +-
 .../src/backends/task-backend/shared/types.ts      |   2 +-
 .../src/commands/task/hosted-close-recovery.ts     |   2 +-
 .../task/shared/workflow-transition-service.ts     |  45 +-
 .../src/commands/task/verify-record-execute.ts     |   1 +
 .../task/workflow-transition-service.unit.test.ts  |  62 +++
 packages/agentplane/src/workflow-runtime/build.ts  |   1 +
 packages/core/schemas/config.schema.json           |  15 +
 .../schemas/task-readme-frontmatter.schema.json    |   8 +-
 packages/core/schemas/tasks-export.schema.json     |   8 +-
 packages/core/src/config/schema.impl.ts            |   8 +
 .../core/src/tasks/task-artifact-schema.task.ts    |  18 +-
 .../src/tasks/task-artifact-schema.verification.ts |   8 +-
 packages/core/src/tasks/task-store.ts              |   4 +-
 packages/core/src/tasks/tasks-export.ts            |  71 ++-
 packages/spec/examples/config.json                 |   3 +
 packages/spec/schemas/config.schema.json           |  15 +
 .../schemas/task-readme-frontmatter.schema.json    |   8 +-
 packages/spec/schemas/tasks-export.schema.json     |   8 +-
 schemas/config.schema.json                         |  15 +
 schemas/task-readme-frontmatter.schema.json        |   8 +-
 schemas/tasks-export.schema.json                   |   8 +-
 32 files changed, 2726 insertions(+), 51 deletions(-)
```

</details>
