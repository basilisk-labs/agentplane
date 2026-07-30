# PR Review

Created: 2026-07-30T09:44:33.829Z

## Task

- Task: `202607221852-YP9QCH`
- Title: Build source-driven canonical reconciliation candidates
- Status: DOING
- Branch: `task/202607221852-YP9QCH/build-source-driven-canonical-reconciliation-can`
- Canonical task record: `.agentplane/tasks/202607221852-YP9QCH/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T09:44:58.527Z
- Branch: task/202607221852-YP9QCH/build-source-driven-canonical-reconciliation-can
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/context/release-readiness.test.ts |   4 +-
 .../src/context/ingest-task-pack.test.ts           | 215 ++++++++-
 .../agentplane/src/context/ingest-task-pack.ts     |  78 +--
 .../agentplane/src/context/ingest-task-prompt.ts   |   5 +-
 packages/agentplane/src/context/ingest-task.ts     |   5 +-
 .../src/context/reconciliation-candidates.ts       | 526 +++++++++++++++++++++
 6 files changed, 765 insertions(+), 68 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
