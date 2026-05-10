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

- Updated: 2026-05-10T11:31:23.517Z
- Branch: task/202605100836-76DX16/git-index-lock
- Head: 028f0f63e816

```text
 .../blueprint/resolved-snapshot.json               | 505 +++++++++++++++++++++
 packages/agentplane/src/cli/exit-codes.ts          |   1 +
 .../src/commands/guard/impl/allow.test.ts          |  84 ++++
 .../agentplane/src/commands/guard/impl/allow.ts    |  28 ++
 .../guard/impl/commands.commit-close.unit.test.ts  |   6 +
 .../impl/commands.commit-non-close.unit.test.ts    |   6 +
 .../src/commands/guard/impl/comment-commit.test.ts |  21 +-
 packages/agentplane/src/shared/errors.ts           |   2 +
 packages/agentplane/src/shared/git-mutation.ts     |  30 ++
 9 files changed, 682 insertions(+), 1 deletion(-)
```

</details>
