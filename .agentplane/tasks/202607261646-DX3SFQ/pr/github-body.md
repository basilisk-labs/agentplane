Task: `202607261646-DX3SFQ`
Title: Allow targeted cleanup of registered sibling task worktrees
Canonical task record: `.agentplane/tasks/202607261646-DX3SFQ/README.md`

## Summary

Allow targeted cleanup of registered sibling task worktrees

Fix branch_pr post-merge cleanup when a clean base checkout shares the Git common directory with a task worktree located below another registered base checkout. Accept only a canonical Git-registered worktree with the same common directory in the explicit targeted/finalize lane; retain fail-closed rejection for arbitrary external paths, foreign repositories, current worktrees, and dirty worktrees. Add regression and negative tests.

## Scope

- In scope: Fix branch_pr post-merge cleanup when a clean base checkout shares the Git common directory with a task worktree located below another registered base checkout. Accept only a canonical Git-registered worktree with the same common directory in the explicit targeted/finalize lane; retain fail-closed rejection for arbitrary external paths, foreign repositories, current worktrees, and dirty worktrees. Add regression and negative tests.
- Out of scope: unrelated refactors not required for "Allow targeted cleanup of registered sibling task worktrees".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T16:48:58.285Z
- Branch: task/202607261646-DX3SFQ/allow-targeted-cleanup-of-registered-sibling-tas
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
