Task: `202605141516-363FBC`
Title: Ignore SQLite cache on read-heavy commands
Canonical task record: `.agentplane/tasks/202605141516-363FBC/README.md`

## Summary

Ignore SQLite cache on read-heavy commands

Ensure read-heavy commands that create the shared SQLite cache also prevent .agentplane/cache.sqlite and WAL/SHM files from appearing as untracked files in older AgentPlane repositories whose .gitignore predates the v0.6 cache ignore entries.

## Scope

- In scope: Ensure read-heavy commands that create the shared SQLite cache also prevent .agentplane/cache.sqlite and WAL/SHM files from appearing as untracked files in older AgentPlane repositories whose .gitignore predates the v0.6 cache ignore entries.
- Out of scope: unrelated refactors not required for "Ignore SQLite cache on read-heavy commands".

## Verification

- State: ok
- Note:

```text
Verified after Codex review fix: SQLite gitignore repair is best-effort, so projection cache writes
continue even if .gitignore cannot be read or updated. Evidence: focused LocalBackend SQLite
gitignore regression tests pass, LocalBackend/context release readiness tests pass, exact-file
ESLint passes, typecheck passes, and hotspots baseline passes.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T16:18:28.250Z
- Branch: task/202605141516-363FBC/sqlite-cache-ignore
- Head: eeccc8e14af6

```text
 .../blueprint/resolved-snapshot.json               | 528 +++++++++++++++++++++
 .../task-backend.local-sqlite-gitignore.test.ts    | 101 ++++
 .../task-backend/local-task-sqlite-cache.ts        |   4 +
 .../cli/run-cli/commands/init/write-gitignore.ts   |  42 +-
 packages/agentplane/src/context/reindex.ts         |   2 +
 .../src/runtime/shared/runtime-gitignore.ts        |  58 +++
 6 files changed, 698 insertions(+), 37 deletions(-)
```

</details>
