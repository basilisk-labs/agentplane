Task: `202608292218-3N0FBK`
Title: Prevent branch closeout while required WorkItems are incomplete
Canonical task record: `.agentplane/tasks/202608292218-3N0FBK/README.md`

## Summary

Prevent branch closeout while required WorkItems are incomplete

Fix branch_pr route selection so an approved task with any incomplete required canonical WorkItem returns to the bounded EXECUTOR WorkItem episode before verification, quality review, PR publication, or pre-merge closure. Add a regression test for a task that has stale verification, quality review, and commit evidence while a required WorkItem remains READY or PLANNED.

## Scope

- In scope: Fix branch_pr route selection so an approved task with any incomplete required canonical WorkItem returns to the bounded EXECUTOR WorkItem episode before verification, quality review, PR publication, or pre-merge closure. Add a regression test for a task that has stale verification, quality review, and commit evidence while a required WorkItem remains READY or PLANNED.
- Out of scope: unrelated refactors not required for "Prevent branch closeout while required WorkItems are incomplete".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-29T22:21:11.540Z
- Branch: task/202608292218-3N0FBK/prevent-branch-closeout-while-required-workitems
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator-episode.calibration.test.ts          | 30 +++++++-
 .../src/commands/shared/workflow-step-branch.ts    | 57 +++++++--------
 .../commands/shared/workflow-step-quality.test.ts  | 85 ++++++++++++++++++++++
 3 files changed, 142 insertions(+), 30 deletions(-)
```

</details>
