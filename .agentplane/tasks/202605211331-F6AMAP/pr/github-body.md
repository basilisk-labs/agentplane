Task: `202605211331-F6AMAP`
Title: Optimize task list read-only fast path
Canonical task record: `.agentplane/tasks/202605211331-F6AMAP/README.md`

## Summary

Optimize task list read-only fast path

Reduce task list wall time by avoiding unnecessary runtime and git work when existing SQLite task projection can serve simple read-only listings.

## Scope

- In scope: Reduce task list wall time by avoiding unnecessary runtime and git work when existing SQLite task projection can serve simple read-only listings.
- Out of scope: unrelated refactors not required for "Optimize task list read-only fast path".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-21T13:45:32.377Z
- Branch: task/202605211331-F6AMAP/task-list-fast-path
- Head: acccaa6b28ee

```text
 .../blueprint/resolved-snapshot.json               | 594 +++++++++++++++++++++
 .../task-backend/local-task-sqlite-cache.ts        |  36 +-
 packages/agentplane/src/commands/task/list.run.ts  |  11 +-
 3 files changed, 624 insertions(+), 17 deletions(-)
```

</details>
