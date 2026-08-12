# PR Review

Created: 2026-08-12T00:34:37.819Z

## Task

- Task: `202608112232-3NC7Y4`
- Title: Make execution strategy risk-adaptive and agent-selected
- Status: DONE
- Branch: `task/202608112232-3NC7Y4/make-execution-strategy-risk-adaptive-and-agent`
- Canonical task record: `.agentplane/tasks/202608112232-3NC7Y4/README.md`

## Verification

- State: ok
- Note: Rework verified at 16629e79b: observed scope enforcement, mode-stable verification, and realistic direct/branch lifecycle coverage pass.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-12T01:36:18.027Z
- Branch: task/202608112232-3NC7Y4/make-execution-strategy-risk-adaptive-and-agent
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/workflow.mdx                             |  42 +
 .../agentplane/src/backends/task-backend.test.ts   |  52 ++
 .../src/backends/task-backend/shared/record.ts     | 229 +++++
 .../src/backends/task-backend/shared/types.ts      |   2 +
 packages/agentplane/src/blueprints/resolve.test.ts |  15 +-
 packages/agentplane/src/blueprints/resolve.ts      | 132 +--
 ...run-cli.core.task-create-planner-intent.test.ts | 948 +++++++++++++++++++--
 .../src/cli/task-create-planner-intent.testkit.ts  | 231 +++++
 .../src/commands/blueprint/task-input.test.ts      |  32 +
 .../src/commands/blueprint/task-input.ts           |  73 +-
 .../src/commands/shared/reconcile-check.test.ts    |  26 +
 .../src/commands/shared/reconcile-check.ts         |  38 +-
 .../src/commands/shared/route-decision-types.ts    |   2 +
 .../agentplane/src/commands/shared/task-backend.ts |   1 +
 .../shared/workflow-step-fingerprint.test.ts       |   2 +
 .../src/commands/task/agent-action-packet.ts       |   2 +-
 .../task/branch-task-supervisor-episodes.ts        |  22 +
 .../agentplane/src/commands/task/brief-model.ts    |   8 +-
 .../agentplane/src/commands/task/brief-render.ts   |  29 +
 .../agentplane/src/commands/task/create.command.ts |  16 +-
 .../commands/task/direct-task-finalization.test.ts |   1 +
 .../src/commands/task/direct-task-finalization.ts  |  21 +-
 .../task/direct-task-supervisor-closeout.test.ts   |  74 +-
 .../commands/task/direct-task-supervisor-result.ts |   1 +
 .../commands/task/direct-task-supervisor.test.ts   |   1 +
 .../src/commands/task/direct-task-supervisor.ts    |  38 +-
 .../commands/task/direct-task-verification.test.ts |  76 ++
 .../src/commands/task/direct-task-verification.ts  |   9 +-
 .../external-agent-implementation-authority.ts     |  23 +
 .../task/external-agent-planning-authority.ts      |  30 +-
 packages/agentplane/src/commands/task/new.ts       |  24 +-
 .../src/commands/task/next-action.command.ts       |  22 +
 packages/agentplane/src/commands/task/plan.ts      |   8 +-
 .../src/commands/task/run-execution-preview.ts     |   9 +-
 .../agentplane/src/commands/task/status.command.ts |   5 +-
 .../task-execution-contract-observation.test.ts    | 150 ++++
 .../task/task-execution-contract-observation.ts    |  84 ++
 .../src/commands/task/verify-record-execute.ts     |  42 +-
 .../task/verify-record.durability.unit.test.ts     |  68 ++
 .../src/commands/task/verify-record.unit.test.ts   |   2 +-
 .../agentplane/src/runner/context/task-context.ts  |   3 +
 packages/agentplane/src/runner/types/context.ts    |   2 +
 .../src/runner/usecases/agent-work-order-build.ts  |  35 +-
 .../usecases/agent-work-order.integration.test.ts  | 127 +++
 .../src/runtime/task-intake/resolve-materialize.ts |   3 +
 .../src/runtime/task-intake/resolve-normalize.ts   |   3 +
 .../agentplane/src/runtime/task-intake/types.ts    |   7 +-
 .../agentplane/src/runtime/task-routing/index.ts   |   2 +
 .../src/runtime/task-routing/resolve.test.ts       | 327 ++++++-
 .../agentplane/src/runtime/task-routing/resolve.ts | 551 ++++++++++--
 .../schemas/task-readme-frontmatter.schema.json    | 367 ++++++++
 packages/core/schemas/tasks-export.schema.json     | 367 ++++++++
 .../core/src/runner/agent-semantic-result.test.ts  |  20 +
 packages/core/src/runner/agent-semantic-result.ts  |  36 +
 packages/core/src/tasks/index.ts                   |   5 +
 .../core/src/tasks/task-artifact-schema.task.ts    | 168 ++++
 .../tasks/task-execution-contract-compat.test.ts   |  65 ++
 .../src/tasks/task-provider-safe-projection.ts     |   5 +
 packages/core/src/tasks/task-readme.ts             |   1 +
 packages/core/src/tasks/task-store.ts              |  76 ++
 packages/core/src/tasks/tasks-export.ts            |   3 +
 .../schemas/task-readme-frontmatter.schema.json    | 367 ++++++++
 packages/spec/schemas/tasks-export.schema.json     | 367 ++++++++
 schemas/agent-semantic-result.schema.json          | 237 ++++++
 schemas/task-readme-frontmatter.schema.json        | 367 ++++++++
 schemas/tasks-export.schema.json                   | 367 ++++++++
 66 files changed, 6183 insertions(+), 285 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
