Task: `202605290508-41676W`
Title: SQLite task cache decomposition
Canonical task record: `.agentplane/tasks/202605290508-41676W/README.md`

## Summary

SQLite task cache decomposition

Extract focused helpers from packages/agentplane/src/backends/task-backend/local-task-sqlite-cache.ts to reduce the runtime hotspot below the warning threshold without changing local task SQLite cache behavior.

## Scope

- In scope: Extract focused helpers from packages/agentplane/src/backends/task-backend/local-task-sqlite-cache.ts to reduce the runtime hotspot below the warning threshold without changing local task SQLite cache behavior.
- Out of scope: unrelated refactors not required for "SQLite task cache decomposition".

## Verification

- State: ok
- Note:

```text
SQLite task projection cache helpers extracted into local-task-sqlite-cache-key.ts;
local-task-sqlite-cache.ts reduced from hotspot range to 236 lines. Also resolved a main-branch knip
blocker in the Obsidian projection facade by making the exported file type a real facade
import/re-export.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T05:08:26.986Z
- Branch: task/202605290508-41676W/sqlite-task-cache-decomposition
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-backend/local-task-sqlite-cache-key.ts    | 212 ++++++++++++++++++++
 .../task-backend/local-task-sqlite-cache.ts        | 222 +--------------------
 packages/agentplane/src/commands/task/obsidian.ts  |   3 +-
 3 files changed, 225 insertions(+), 212 deletions(-)
```

</details>
