Task: `202607221848-1HWR0R`
Title: Return typed task mutation results
Canonical task record: `.agentplane/tasks/202607221848-1HWR0R/README.md`

## Summary

Return typed task mutation results

RF-07: make create and mutation use cases return exact task id, revision, backend identity, artifact paths, and recovery data instead of list-before/list-after discovery.

## Scope

- In scope: typed results for task creation and relevant mutations, local/backend parity, context ingest and batch harvesting callers, concurrency tests, and partial-failure recovery identifiers.
- Out of scope: changing task identity format or introducing cross-system distributed transactions.

## Verification

- State: ok
- Note:

```text
Rework closes the stale cumulative compatibility ledger with exact RF-07 provenance and immutable
receipt semantics.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T08:11:46.794Z
- Branch: task/202607221848-1HWR0R/return-typed-task-mutation-results
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/backends/task-backend.revision-cas.test.ts |  56 ++++++++-
 packages/agentplane/src/backends/task-backend.ts   |   1 +
 .../src/backends/task-backend/cloud-backend.ts     |  16 ++-
 .../backends/task-backend/local-backend-write.ts   |   2 +-
 .../src/backends/task-backend/local-backend.ts     |  12 +-
 .../agentplane/src/backends/task-backend/shared.ts |   1 +
 .../src/backends/task-backend/shared/types.ts      |  12 ++
 ...-cli.critical.agent-efficiency-baseline.test.ts |  41 +++++-
 .../src/commands/context/harvest-tasks.test.ts     |  20 ++-
 .../src/commands/context/harvest-tasks.ts          |  27 ++--
 .../src/commands/context/issue-gates.unit.test.ts  |   9 +-
 .../src/commands/context/release-readiness.test.ts |  36 +++++-
 .../src/commands/shared/task-mutation.test.ts      |  49 +++++++-
 .../src/commands/shared/task-mutation.ts           |  94 +++++++++++++-
 .../agentplane/src/commands/task/begin.command.ts  |  57 ++++-----
 .../agentplane/src/commands/task/doc.unit.test.ts  |  20 +--
 .../src/commands/task/mutation-parity.unit.test.ts |  28 ++++-
 .../agentplane/src/commands/task/new.command.ts    |   3 +-
 packages/agentplane/src/commands/task/new.ts       |  22 +++-
 .../agentplane/src/commands/task/plan.unit.test.ts |   8 +-
 .../src/commands/task/verify-record.unit.test.ts   |  71 +++++------
 packages/agentplane/src/commands/workflow.test.ts  |  39 +++++-
 .../src/context/ingest-task-pack.test.ts           |  74 ++++++++++-
 .../agentplane/src/context/ingest-task-pack.ts     |  26 ++++
 .../agentplane/src/context/ingest-task.test.ts     |   1 +
 packages/agentplane/src/context/ingest-task.ts     |   4 +-
 packages/agentplane/src/context/ingest.ts          |  32 ++---
 .../baselines/v0.7-compatibility-candidate.json    |  39 +++++-
 .../check-compatibility-contract-baseline.mjs      | 138 +++++++++++++++++++++
 29 files changed, 777 insertions(+), 161 deletions(-)
```

</details>
