# PR Review

Created: 2026-07-02T18:12:34.390Z

## Task

- Task: `202607021729-QWQRZY`
- Title: Create context task pack and source span skeleton
- Status: DOING
- Branch: `task/202607021729-QWQRZY/context-task-pack-source-spans`
- Canonical task record: `.agentplane/tasks/202607021729-QWQRZY/README.md`

## Verification

- State: ok
- Note: Verified after PR artifact refresh: targeted source-span/task-pack tests, release-readiness suite, policy routing, and doctor passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-02T18:12:34.390Z
- Branch: task/202607021729-QWQRZY/context-task-pack-source-spans
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/context/ingest-task-pack.test.ts           |  93 ++++++++++++++
 .../agentplane/src/context/ingest-task-pack.ts     | 131 +++++++++++++++++++
 packages/agentplane/src/context/ingest-task.ts     |   5 +
 packages/agentplane/src/context/ingest.ts          |   8 +-
 .../agentplane/src/context/source-spans.test.ts    |  76 +++++++++++
 packages/agentplane/src/context/source-spans.ts    | 140 +++++++++++++++++++++
 6 files changed, 452 insertions(+), 1 deletion(-)
```

</details>
<!-- END AUTO SUMMARY -->
