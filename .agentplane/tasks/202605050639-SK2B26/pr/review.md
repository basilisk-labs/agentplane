# PR Review

Created: 2026-05-05T06:47:03.275Z

## Task

- Task: `202605050639-SK2B26`
- Title: Separate task README canonical state from contextual prose
- Status: DOING
- Branch: `task/202605050639-SK2B26/readme-context-layer`
- Canonical task record: `.agentplane/tasks/202605050639-SK2B26/README.md`

## Verification

- State: ok
- Note: Focused task README, task store, local backend, doc command, migrate-doc, mutation parity, ESLint, Prettier, and routing checks passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T07:34:18.597Z
- Branch: task/202605050639-SK2B26/readme-context-layer
- Head: 7108af0ca8e6

```text
 .../src/backends/task-backend.local.test.ts        |  6 +-
 .../src/commands/task/migrate-doc.test.ts          | 20 +++--
 packages/core/src/tasks/task-readme.test.ts        | 86 +++++++++++++++++++++-
 packages/core/src/tasks/task-readme.ts             | 80 ++++++++++++++++++--
 packages/core/src/tasks/task-store.test.ts         | 38 +++++++---
 packages/core/src/tasks/task-store.ts              |  9 ++-
 6 files changed, 206 insertions(+), 33 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
