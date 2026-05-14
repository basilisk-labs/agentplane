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

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-14T15:17:28.899Z
- Branch: task/202605141516-363FBC/sqlite-cache-ignore
- Head: d2760c7e11ce

```text
No changes detected.
```

</details>
