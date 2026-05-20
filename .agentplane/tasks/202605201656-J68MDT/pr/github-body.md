Task: `202605201656-J68MDT`
Title: Fix done task next-action route
Canonical task record: `.agentplane/tasks/202605201656-J68MDT/README.md`

## Summary

Fix done task next-action route

Stop task next-action and task status route output from suggesting branch_pr worktree recovery for tasks that are already DONE, especially included batch tasks closed after their primary PR merged.

## Scope

- In scope: Stop task next-action and task status route output from suggesting branch_pr worktree recovery for tasks that are already DONE, especially included batch tasks closed after their primary PR merged.
- Out of scope: unrelated refactors not required for "Fix done task next-action route".

## Verification

- State: ok
- Note:

```text
Quality gate passed for merged PR #3976 at e747ce59: review comments resolved, hosted PR checks
passed, and release task check only awaits task closure.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T17:43:12.348Z
- Branch: task/202605201656-J68MDT/done-next-action
- Head: 847e2b6d2e9e

```text
No changes detected.
```

</details>
