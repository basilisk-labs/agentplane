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

- State: ok
- Note: Canonical validation sha256:95341fd5c857a32f8bb3cdccffa5ee942b2982a82805efffb4c36e757057ccd5
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-22T10:30:44.750Z
- Branch: task/202609220826-DS03Q6/allow-canonical-completed-tasks-to-record-branch
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../agentplane/src/commands/task/finish-execute.ts | 58 +++++++++++++++-------
 .../task/finish.pre-merge-closure.unit.test.ts     | 50 ++++++++++++++++++-
 2 files changed, 90 insertions(+), 18 deletions(-)
```

</details>
