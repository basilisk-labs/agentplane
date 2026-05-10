Task: `202605100837-SAJN9F`
Title: Pre-v0.5: introduce worktree-scoped Git mutation mutex
Canonical task record: `.agentplane/tasks/202605100837-SAJN9F/README.md`

## Summary

Pre-v0.5: introduce worktree-scoped Git mutation mutex

Add an AgentPlane-level mutex for write operations that touch the Git index. Key it by gitdir hash plus repo identity, not branch name, so different worktrees can proceed independently.

## Scope

- In scope: Add an AgentPlane-level mutex for write operations that touch the Git index. Key it by gitdir hash plus repo identity, not branch name, so different worktrees can proceed independently.
- Out of scope: unrelated refactors not required for "Pre-v0.5: introduce worktree-scoped Git mutation mutex".

## Verification

- State: ok
- Note: Implemented a worktree-scoped AgentPlane Git mutation mutex under .agentplane/cache/locks, keyed from git common dir plus resolved gitdir. Stage paths that write the Git index now take the mutex before git add. Checks passed: targeted Vitest git-mutation+allow suites, prettier check, and scoped eslint for changed files.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-10T15:51:00.275Z
- Branch: task-202605100837-SAJN9F-worktree-mutex
- Head: 98f9550499b7

```text
 .../src/commands/guard/impl/allow.test.ts          |  39 +++---
 .../agentplane/src/commands/guard/impl/allow.ts    | 118 +++++++++--------
 .../src/commands/guard/impl/commit-stage.ts        |  27 +++-
 .../agentplane/src/shared/git-mutation.test.ts     | 144 +++++++++++++++++++++
 packages/agentplane/src/shared/git-mutation.ts     | 134 ++++++++++++++++++-
 5 files changed, 392 insertions(+), 70 deletions(-)
```

</details>
