Task: `202609220826-DS03Q6`
Title: Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation
Canonical task record: `.agentplane/tasks/202609220826-DS03Q6/README.md`

## Summary

Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation

Fix the 0.7.11 lifecycle deadlock where next-action routes task.pre_merge_close for a canonical COMPLETED task but finish rejects the legacy mutation. Preserve quality, verification, branch identity, and fail-closed checks; add focused regression coverage.

## Scope

- In scope: Fix the 0.7.11 lifecycle deadlock where next-action routes task.pre_merge_close for a canonical COMPLETED task but finish rejects the legacy mutation. Preserve quality, verification, branch identity, and fail-closed checks; add focused regression coverage.
- Out of scope: unrelated refactors not required for "Allow canonical completed tasks to record branch_pr pre-merge closure without legacy task mutation".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-22T10:15:30.580Z
- Branch: task/202609220826-DS03Q6/allow-canonical-completed-tasks-to-record-branch
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/commands/task/finish-execute.ts | 59 +++++++++++++++-------
 .../task/finish.pre-merge-closure.unit.test.ts     | 56 ++++++++++++++++++++
 2 files changed, 98 insertions(+), 17 deletions(-)
```

</details>
