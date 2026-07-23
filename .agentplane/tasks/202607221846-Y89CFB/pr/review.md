# PR Review

Created: 2026-07-23T15:58:38.987Z

## Task

- Task: `202607221846-Y89CFB`
- Title: Build supervisor-owned execution receipts
- Status: DONE
- Branch: `task/202607221846-Y89CFB/build-supervisor-owned-execution-receipts`
- Canonical task record: `.agentplane/tasks/202607221846-Y89CFB/README.md`

## Verification

- State: ok
- Note: Verified supervisor-owned receipt truth against conflicting agent claims, unreported writes, pre-existing dirt, legacy compatibility, detached descendants, replay and file-identity attacks, and arbitrary terminal signals. Focused 110/110, full 2421/2421, lifecycle invariants, typecheck, and ci:contract passed. POSIX process-group containment remains explicitly limited and fail-closed until RF03.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-23T15:58:42.393Z
- Branch: task/202607221846-Y89CFB/build-supervisor-owned-execution-receipts
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/backends/task-backend.test.ts   |  58 ++
 packages/agentplane/src/backends/task-backend.ts   |   1 +
 .../agentplane/src/backends/task-backend/shared.ts |   1 +
 .../src/backends/task-backend/shared/normalize.ts  |  34 ++
 .../src/backends/task-backend/shared/types.ts      |   1 +
 .../src/commands/context/issue-gates.unit.test.ts  |   6 +
 .../src/commands/context/release-readiness.test.ts | 101 +---
 .../verify-task.maximum-assimilation.test.ts       |  14 +-
 .../verify-task.maximum-assimilation.unit.test.ts  | 376 +++++++++++-
 .../src/commands/context/wiki-index.unit.test.ts   |  81 ++-
 .../agentplane/src/commands/task/run-render.ts     |   1 +
 .../src/context/verify-task-policy.test.ts         |  32 +-
 .../agentplane/src/context/verify-task-policy.ts   |  51 +-
 .../agentplane/src/context/verify-task.testkit.ts  |  58 ++
 packages/agentplane/src/context/verify-task.ts     | 327 +++++++++-
 packages/agentplane/src/runner/adapters/base.ts    |   5 +
 .../src/runner/adapters/codex-preparation.ts       |   3 +
 .../agentplane/src/runner/adapters/codex.test.ts   |  40 +-
 .../src/runner/adapters/custom-preparation.ts      |   3 +
 .../agentplane/src/runner/adapters/custom.test.ts  | 193 +++++-
 .../src/runner/adapters/execute-supervised.ts      | 138 +++--
 .../runner/adapters/execution-receipt-runtime.ts   | 374 ++++++++++++
 packages/agentplane/src/runner/artifacts.test.ts   |   3 +
 packages/agentplane/src/runner/artifacts.ts        |   4 +
 .../src/runner/execution-receipt.test.ts           |  57 ++
 .../agentplane/src/runner/execution-receipt.ts     | 171 ++++++
 .../src/runner/observation/artifacts.test.ts       | 105 ++++
 .../agentplane/src/runner/observation/artifacts.ts | 170 ++++++
 .../src/runner/observation/git-snapshot.test.ts    | 272 +++++++++
 .../src/runner/observation/git-snapshot.ts         |   7 +
 .../src/runner/observation/git-snapshot/capture.ts | 335 +++++++++++
 .../src/runner/observation/git-snapshot/common.ts  | 385 ++++++++++++
 .../src/runner/observation/git-snapshot/compare.ts | 388 ++++++++++++
 .../src/runner/observation/git-snapshot/model.ts   | 125 ++++
 .../src/runner/observation/git-snapshot/parse.ts   | 110 ++++
 .../process-supervision.process-tree.test.ts       | 352 +++++++++++
 .../src/runner/process-supervision.test.ts         |  21 +
 .../src/runner/process-supervision/process-tree.ts | 195 ++++++
 .../src/runner/process-supervision/run.ts          |  45 +-
 .../src/runner/process-supervision/signals.ts      |  13 +-
 .../process-supervision/timeout-controller.ts      |  15 +-
 .../src/runner/result-manifest-artifacts.ts        | 143 ++++-
 .../agentplane/src/runner/result-manifest.test.ts  |  33 +
 packages/agentplane/src/runner/result-manifest.ts  |  64 +-
 packages/agentplane/src/runner/run-repository.ts   |   3 +
 packages/agentplane/src/runner/success-policy.ts   |  73 +++
 packages/agentplane/src/runner/task-run-paths.ts   |   2 +
 .../src/runner/task-state-render.test.ts           |  85 +++
 .../agentplane/src/runner/task-state-render.ts     |  39 +-
 packages/agentplane/src/runner/types.ts            |   1 +
 packages/agentplane/src/runner/types/context.ts    |   1 +
 packages/agentplane/src/runner/types/invocation.ts |  16 +
 packages/agentplane/src/runner/types/state.ts      |  31 +-
 .../src/runner/usecases/task-run-bootstrap.ts      |   1 +
 .../src/runner/usecases/task-run-lifecycle.test.ts |  35 +-
 .../schemas/task-readme-frontmatter.schema.json    |  59 ++
 packages/core/schemas/tasks-export.schema.json     |  64 ++
 packages/core/src/index.ts                         |  29 +
 packages/core/src/runner/execution-receipt.test.ts | 270 +++++++++
 packages/core/src/runner/execution-receipt.ts      | 610 +++++++++++++++++++
 packages/core/src/schemas/index.ts                 |  31 +
 packages/core/src/tasks/index.ts                   |   1 +
 .../core/src/tasks/task-artifact-schema.task.ts    |  16 +
 .../core/src/tasks/task-artifact-schema.test.ts    |  80 +++
 packages/core/src/tasks/task-store.ts              |   9 +
 packages/core/src/tasks/tasks-export.test.ts       |  60 ++
 packages/core/src/tasks/tasks-export.ts            |  35 ++
 .../schemas/task-readme-frontmatter.schema.json    |  59 ++
 packages/spec/schemas/tasks-export.schema.json     |  64 ++
 packages/testkit/src/runner.ts                     |   3 +
 schemas/examples/execution-receipt-v1.valid.json   | 105 ++++
 schemas/execution-receipt.schema.json              | 668 +++++++++++++++++++++
 schemas/task-readme-frontmatter.schema.json        |  59 ++
 schemas/tasks-export.schema.json                   |  64 ++
 scripts/generate/sync-schemas.mjs                  |  14 +
 75 files changed, 7246 insertions(+), 252 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
