Task: `202607311529-773BXT`
Title: Make merged worktree cleanup idempotent
Canonical task record: `.agentplane/tasks/202607311529-773BXT/README.md`

## Summary

Make merged worktree cleanup idempotent

Post-merge follow-up for v0.6.26: if a hook already removed the task worktree/branch, integration cleanup must treat that as completed instead of exiting non-zero after a successful merge.

## Scope

- In scope: Post-merge follow-up for v0.6.26: if a hook already removed the task worktree/branch, integration cleanup must treat that as completed instead of exiting non-zero after a successful merge.
- Out of scope: unrelated refactors not required for "Make merged worktree cleanup idempotent".

## Verification

- State: ok
- Note: 20 focused cleanup/integration tests passed; typecheck, format, lint:core, and release:prepublish:fast passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T15:35:00.152Z
- Branch: task/202607311529-773BXT/make-merged-worktree-cleanup-idempotent
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/shared/merged-branch-cleanup.test.ts  | 39 +++++++++++++++++
 .../src/commands/shared/merged-branch-cleanup.ts   | 49 +++++++++++++---------
 2 files changed, 68 insertions(+), 20 deletions(-)
```

</details>
