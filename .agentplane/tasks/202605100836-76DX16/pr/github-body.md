Task: `202605100836-76DX16`
Title: Pre-v0.5: classify Git index lock failures as E_GIT_LOCKED
Canonical task record: `.agentplane/tasks/202605100836-76DX16/README.md`

## Summary

Pre-v0.5: classify Git index lock failures as E_GIT_LOCKED

Before internal git add/write-index operations, detect gitdir/index.lock and emit E_GIT_LOCKED with lock path, age, worktree, and remediation. Do not auto-delete Git index locks.

## Scope

- In scope: Before internal git add/write-index operations, detect gitdir/index.lock and emit E_GIT_LOCKED with lock path, age, worktree, and remediation. Do not auto-delete Git index locks.
- Out of scope: unrelated refactors not required for "Pre-v0.5: classify Git index lock failures as E_GIT_LOCKED".

## Verification

- State: ok
- Note: Verified E_GIT_LOCKED preflight for gitdir index.lock.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-10T11:10:39.848Z
- Branch: task/202605100836-76DX16/git-index-lock
- Head: 0852563b1aa8

```text
No changes detected.
```

</details>
