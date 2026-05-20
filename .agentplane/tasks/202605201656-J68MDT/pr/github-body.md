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
Quality gate passed for DONE task route decision fix. The change is limited to terminal route
handling and regression coverage; focused cli-core route-decision tests, ESLint, agentplane
typecheck, framework bootstrap, and policy routing passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-20T16:57:11.337Z
- Branch: task/202605201656-J68MDT/done-next-action
- Head: cc334fc66ef2

```text
No changes detected.
```

</details>
