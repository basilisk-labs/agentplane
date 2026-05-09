# PR Review

Created: 2026-05-09T15:51:06.784Z

## Task

- Task: `202605091549-JAE983`
- Title: Make finish close-commit atomic under dirty lifecycle state
- Status: DOING
- Branch: `task/202605091549-JAE983/lifecycle-followups`
- Canonical task record: `.agentplane/tasks/202605091549-JAE983/README.md`

## Verification

- State: ok
- Note: Verified close-commit preflight rejects dirty tracked state before task mutation.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-09T16:22:02.240Z
- Branch: task/202605091549-JAE983/lifecycle-followups
- Head: 286be3dcebcc

```text
 .agentplane/tasks/202605091549-65ANX7/README.md    | 128 ++++++
 .../blueprint/resolved-snapshot.json               | 427 ++++++++++++++++++
 .agentplane/tasks/202605091549-8Z3MZ5/README.md    |  99 ++++
 .../blueprint/resolved-snapshot.json               | 496 +++++++++++++++++++++
 .agentplane/tasks/202605091549-TAQM7T/README.md    |  99 ++++
 .../blueprint/resolved-snapshot.json               | 496 +++++++++++++++++++++
 docs/developer/blueprints.mdx                      |   4 +
 docs/user/cli-reference.generated.mdx              |   2 +-
 .../src/backends/task-backend/shared/record.ts     |   1 +
 .../src/backends/task-backend/shared/types.ts      |   1 +
 .../src/blueprints/builtins-specialized.ts         |  91 ++++
 packages/agentplane/src/blueprints/model.ts        |   1 +
 packages/agentplane/src/blueprints/resolve.test.ts |   9 +-
 packages/agentplane/src/blueprints/resolve.ts      |  18 +
 .../agentplane/src/blueprints/validate.test.ts     |   3 +-
 packages/agentplane/src/commands/backend.ts        |  13 +
 .../src/commands/blueprint/task-input.ts           |   1 +
 .../commands/branch/work-start.hook-shim.test.ts   |  38 ++
 .../src/commands/branch/work-start.materialize.ts  |  25 ++
 .../agentplane/src/commands/branch/work-start.ts   |   1 +
 .../agentplane/src/commands/doctor/workspace.ts    |  62 ++-
 .../src/commands/hooks/run.commit-msg.ts           |   1 +
 .../src/commands/hooks/run.pre-commit.ts           |   1 +
 .../agentplane/src/commands/task/finish-execute.ts |  41 ++
 .../commands/task/finish.validation.unit.test.ts   |  66 ++-
 packages/agentplane/src/commands/task/new.spec.ts  |   1 +
 packages/agentplane/src/commands/task/new.ts       |   1 +
 .../schemas/task-readme-frontmatter.schema.json    |   1 +
 packages/core/schemas/tasks-export.schema.json     |   1 +
 packages/core/src/commit/commit-policy.ts          |   1 +
 .../core/src/tasks/task-artifact-schema.task.ts    |   1 +
 .../schemas/task-readme-frontmatter.schema.json    |   1 +
 packages/spec/schemas/tasks-export.schema.json     |   1 +
 schemas/task-readme-frontmatter.schema.json        |   1 +
 schemas/tasks-export.schema.json                   |   1 +
 35 files changed, 2128 insertions(+), 6 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
