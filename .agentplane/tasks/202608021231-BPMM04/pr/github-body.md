Task: `202608021231-BPMM04`
Title: Record token usage on every completed task
Canonical task record: `.agentplane/tasks/202608021231-BPMM04/README.md`

## Summary

Record token usage on every completed task

Persist provider and evaluator token usage through task execution and closeout, expose the aggregate and provenance in completed task JSON and human-readable output, preserve compatibility when usage is unavailable, and add deterministic lifecycle regression coverage.

## Scope

- In scope: Persist provider and evaluator token usage through task execution and closeout, expose the aggregate and provenance in completed task JSON and human-readable output, preserve compatibility when usage is unavailable, and add deterministic lifecycle regression coverage.
- Out of scope: unrelated refactors not required for "Record token usage on every completed task".

## Verification

- State: ok
- Note:

```text
Verified EVALUATOR rework at exact SHA e92e7b4b1ea4fe9cca60d2ebb5a305f3e65fba42: every
reconciliation completion path now projects authoritative supervisor token usage and preserves
stable replay.
```
- Canonical workflow state lives in the task README.

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
 packages/agentplane/src/commands/acr/generate.ts   |   1 +
 .../evaluator/evaluator-execute-supervisor.ts      |   7 +-
 .../commands/release/tasks-reconcile.command.ts    |   9 +-
 .../shared/supervisor-execution-episode.ts         |  14 +-
 .../agentplane/src/commands/shared/task-backend.ts |   1 +
 .../agentplane/src/commands/task/brief-model.ts    |   3 +
 .../agentplane/src/commands/task/brief-render.ts   |  13 +
 .../agentplane/src/commands/task/close-shared.ts   |   7 +
 .../src/commands/task/close-shared.unit.test.ts    |  15 +
 .../agentplane/src/commands/task/finish-shared.ts  |   7 +
 .../task/hosted-merge-sync.token-usage.test.ts     | 330 +++++++++++++++++++++
 .../src/commands/task/hosted-merge-sync.ts         |  44 ++-
 .../commands/task/hosted-merge-sync/builders.ts    |  18 +-
 .../src/commands/task/task-token-usage.test.ts     | 174 +++++++++++
 .../src/commands/task/task-token-usage.ts          | 127 ++++++++
 .../runner/adapters/codex-result-transport.test.ts |   2 +
 .../src/runner/adapters/codex-result-transport.ts  |   5 +
 .../agentplane/src/runner/adapters/codex.test.ts   |   2 +
 .../schemas/task-readme-frontmatter.schema.json    | 122 ++++++++
 packages/core/schemas/tasks-export.schema.json     | 122 ++++++++
 packages/core/src/index.ts                         |   2 +
 .../src/runner/supervisor-execution-episode.ts     |  44 ++-
 packages/core/src/tasks/index.ts                   |   2 +
 .../core/src/tasks/task-artifact-schema.task.ts    |  71 +++++
 .../core/src/tasks/task-artifact-schema.test.ts    |  53 ++++
 .../tasks/task-provider-safe-projection.test.ts    |  23 ++
 .../src/tasks/task-provider-safe-projection.ts     |   4 +
 packages/core/src/tasks/task-readme.ts             |   1 +
 packages/core/src/tasks/task-store.ts              |  19 ++
 packages/core/src/tasks/tasks-export.ts            |   3 +
 .../schemas/task-readme-frontmatter.schema.json    | 122 ++++++++
 packages/spec/schemas/tasks-export.schema.json     | 122 ++++++++
 schemas/task-readme-frontmatter.schema.json        | 122 ++++++++
 schemas/tasks-export.schema.json                   | 122 ++++++++
 41 files changed, 1832 insertions(+), 16 deletions(-)
```

</details>
