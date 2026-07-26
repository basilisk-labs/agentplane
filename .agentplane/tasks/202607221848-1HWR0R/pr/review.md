# PR Review

Created: 2026-07-26T08:11:00.143Z

## Task

- Task: `202607221848-1HWR0R`
- Title: Return typed task mutation results
- Status: DOING
- Branch: `task/202607221848-1HWR0R/return-typed-task-mutation-results`
- Canonical task record: `.agentplane/tasks/202607221848-1HWR0R/README.md`

## Verification

- State: needs_rework
- Note: Compatibility candidate does not yet represent the typed task-mutation receipt on the post-RF-05a base.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T08:11:46.794Z
- Branch: task/202607221848-1HWR0R/return-typed-task-mutation-results
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/backends/task-backend.revision-cas.test.ts | 56 ++++++++++++-
 packages/agentplane/src/backends/task-backend.ts   |  1 +
 .../src/backends/task-backend/cloud-backend.ts     | 16 +++-
 .../src/backends/task-backend/local-backend.ts     | 12 ++-
 .../agentplane/src/backends/task-backend/shared.ts |  1 +
 .../src/backends/task-backend/shared/types.ts      | 12 +++
 .../src/commands/context/harvest-tasks.test.ts     | 20 ++++-
 .../src/commands/context/harvest-tasks.ts          | 27 ++++---
 .../src/commands/context/issue-gates.unit.test.ts  |  9 ++-
 .../src/commands/context/release-readiness.test.ts | 36 ++++++++-
 .../src/commands/shared/task-mutation.test.ts      | 49 ++++++++++-
 .../src/commands/shared/task-mutation.ts           | 94 +++++++++++++++++++++-
 .../agentplane/src/commands/task/begin.command.ts  | 57 +++++--------
 packages/agentplane/src/commands/task/index.ts     |  2 +-
 .../agentplane/src/commands/task/new.command.ts    |  3 +-
 packages/agentplane/src/commands/task/new.ts       | 22 +++--
 packages/agentplane/src/commands/workflow.test.ts  | 39 ++++++++-
 .../src/context/ingest-task-pack.test.ts           | 74 ++++++++++++++++-
 .../agentplane/src/context/ingest-task-pack.ts     | 26 ++++++
 .../agentplane/src/context/ingest-task.test.ts     |  1 +
 packages/agentplane/src/context/ingest-task.ts     |  4 +-
 packages/agentplane/src/context/ingest.ts          | 32 +++-----
 22 files changed, 490 insertions(+), 103 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
