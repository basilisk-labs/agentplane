Task: `202607252051-ZMVZRZ`
Title: Make merged worktree cleanup resilient to partial removal
Canonical task record: `.agentplane/tasks/202607252051-ZMVZRZ/README.md`

## Summary

Make merged worktree cleanup resilient to partial removal

Harden branch_pr cleanup after a verified merged task: remove a clean worktree without leaving an unregistered directory if Git removal partially succeeds, and treat an already-deleted remote task branch as a successful terminal state. Preserve strict protections for dirty, outside-repo, and current worktrees. Add focused regression coverage for the partial-removal and absent-remote cases.

## Scope

In scope: harden merged branch_pr worktree removal after a clean verified task, including partial Git removal recovery and idempotent absent-remote branch deletion. Preserve dirty, outside-repo, current-worktree, and expected-head protections. Out of scope: broad cleanup redesign or deletion of unproven directories.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-25T22:13:26.625Z
- Branch: task/202607252051-ZMVZRZ/make-merged-worktree-cleanup-resilient
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
