Task: `202608221017-2HT3N7`
Title: Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr...
Canonical task record: `.agentplane/tasks/202608221017-2HT3N7/README.md`

## Summary

Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.

A clean task is required because the original supervisor journal correctly refuses replay after state drift. Keep changes to packages/agentplane/src/commands/task and packages/agentplane/src/commands/shared/quality-review-target.ts plus task-owned tests.

## Scope

- In scope: A clean task is required because the original supervisor journal correctly refuses replay after state drift. Keep changes to packages/agentplane/src/commands/task and packages/agentplane/src/commands/shared/quality-review-target.ts plus task-owned tests.
- Out of scope: unrelated refactors not required for "Port the complete pre-merge quality-review lifecycle fix from blocked task 202608220851-XN5YNK into a clean branch_pr task: accept only proven task-artifact-only reviewed descendants, normalize closure-owned token_usage and implementation commit message while preserving the implementation hash, and clear task_centric_replan_required when a replacement canonical plan is supplied. Include the focused regression tests already proven in the blocked task.".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-22T10:19:00.838Z
- Branch: task/202608221017-2HT3N7/port-the-complete-pre-merge-quality-review-lifec
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/shared/quality-review-target.ts   |   6 ++
 .../src/commands/task/finish-blueprint-evidence.ts |  39 +++++---
 .../task/finish.quality-review-target.unit.test.ts | 104 +++++++++++++++++++++
 packages/agentplane/src/commands/task/plan.ts      |   4 +-
 .../agentplane/src/commands/task/plan.unit.test.ts |  52 +++++++++++
 5 files changed, 189 insertions(+), 16 deletions(-)
```

</details>
