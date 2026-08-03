# PR Review

Created: 2026-08-03T11:03:33.843Z

## Task

- Task: `202608021231-BPMM04`
- Title: Record token usage on every completed task
- Status: DOING
- Branch: `task/202608021231-BPMM04/record-token-usage-on-every-completed-task`
- Canonical task record: `.agentplane/tasks/202608021231-BPMM04/README.md`

## Verification

- State: ok
- Note: Verified 71b53fd7a1: no-usage managed runs complete with unavailable token projection; all required gates pass.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T11:04:09.032Z
- Branch: task/202608021231-BPMM04/record-token-usage-on-every-completed-task
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 README.md                                          |   4 +
 docs/user/commands.mdx                             |   5 +-
 docs/user/task-lifecycle.mdx                       |   5 +
 .../src/backends/task-backend/shared/export.ts     |   7 +-
 .../src/backends/task-backend/shared/normalize.ts  |  88 ++++++
 .../src/backends/task-backend/shared/record.ts     |   3 +
 .../src/backends/task-backend/shared/types.ts      |   3 +
 .../run-cli.core.task-status-token-usage.test.ts   |  89 ++++++
 packages/agentplane/src/commands/acr/generate.ts   |   1 +
 .../evaluator/evaluator-execute-supervisor.ts      |   7 +-
 .../commands/release/tasks-reconcile.command.ts    |   9 +-
 .../commands/shared/route-decision-types.test.ts   |  27 ++
 .../src/commands/shared/route-decision-types.ts    |   2 +
 .../shared/supervisor-execution-episode.test.ts    |  95 +++++-
 .../shared/supervisor-execution-episode.ts         |  13 +-
 .../agentplane/src/commands/shared/task-backend.ts |   1 +
 .../agentplane/src/commands/task/brief-model.ts    |   3 +
 .../agentplane/src/commands/task/brief-render.ts   |   9 +
 .../agentplane/src/commands/task/close-shared.ts   |   7 +
 .../src/commands/task/close-shared.unit.test.ts    |  15 +
 .../agentplane/src/commands/task/finish-shared.ts  |   7 +
 .../task/hosted-merge-sync.token-usage.test.ts     | 330 +++++++++++++++++++++
 .../src/commands/task/hosted-merge-sync.ts         |  44 ++-
 .../commands/task/hosted-merge-sync/builders.ts    |  18 +-
 .../agentplane/src/commands/task/status.command.ts |   9 +
 .../src/commands/task/task-token-usage.test.ts     | 239 +++++++++++++++
 .../src/commands/task/task-token-usage.ts          | 132 +++++++++
 .../runner/adapters/codex-result-transport.test.ts |   2 +
 .../src/runner/adapters/codex-result-transport.ts  |   5 +
 .../agentplane/src/runner/adapters/codex.test.ts   |   2 +
 .../schemas/task-readme-frontmatter.schema.json    | 122 ++++++++
 packages/core/schemas/tasks-export.schema.json     | 122 ++++++++
 packages/core/src/index.ts                         |   9 +
 .../runner/supervisor-execution-episode.test.ts    |  47 +++
 .../src/runner/supervisor-execution-episode.ts     |  82 ++++-
 packages/core/src/tasks/index.ts                   |   9 +
 .../core/src/tasks/task-artifact-schema.task.ts    |  71 +++++
 .../core/src/tasks/task-artifact-schema.test.ts    |  53 ++++
 .../tasks/task-provider-safe-projection.test.ts    |  23 ++
 .../src/tasks/task-provider-safe-projection.ts     |   4 +
 packages/core/src/tasks/task-readme.test.ts        | 123 ++++++++
 packages/core/src/tasks/task-readme.ts             |  17 +-
 packages/core/src/tasks/task-store.ts              |  19 ++
 packages/core/src/tasks/task-token-usage-render.ts |  74 +++++
 packages/core/src/tasks/tasks-export.ts            |   3 +
 .../schemas/task-readme-frontmatter.schema.json    | 122 ++++++++
 packages/spec/schemas/tasks-export.schema.json     | 122 ++++++++
 schemas/task-readme-frontmatter.schema.json        | 122 ++++++++
 schemas/tasks-export.schema.json                   | 122 ++++++++
 49 files changed, 2423 insertions(+), 24 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
