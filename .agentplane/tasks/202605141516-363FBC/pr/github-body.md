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
Verified: SQLite cache writers repair stale .gitignore entries for .agentplane/cache.sqlite,
.agentplane/cache.sqlite-wal, and .agentplane/cache.sqlite-shm before writing the shared cache.
Evidence: focused LocalBackend/context tests pass, exact-file ESLint passes, typecheck passes,
policy routing passes, git diff whitespace check passes, and doctor is OK with unrelated
pre-existing branch_pr normalization warnings.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T15:38:47.046Z
- Branch: task/202605141516-363FBC/sqlite-cache-ignore
- Head: 5670c639f092

```text
 .../blueprint/resolved-snapshot.json               | 528 +++++++++++++++++++++
 .../src/backends/task-backend.local.test.ts        |  43 ++
 .../task-backend/local-task-sqlite-cache.ts        |   4 +
 .../cli/run-cli/commands/init/write-gitignore.ts   |  42 +-
 packages/agentplane/src/context/reindex.ts         |   2 +
 .../src/runtime/shared/runtime-gitignore.ts        |  61 +++
 6 files changed, 643 insertions(+), 37 deletions(-)
```

</details>
