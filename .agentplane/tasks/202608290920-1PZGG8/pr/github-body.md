Task: `202608290920-1PZGG8`
Title: Allow task-centric plan refinement before WorkItem selection
Canonical task record: `.agentplane/tasks/202608290920-1PZGG8/README.md`

## Summary

Allow task-centric plan refinement before WorkItem selection

Fix the supported recovery path exposed by 7JCQPF. In recordTaskCentricExternalResult, when semantic.plan_refinement is present, record the refinement against the current approved plan before selecting or projecting a WorkItem result. If the refinement requires replan, return replan_required without requiring a schedulable WorkItem. Preserve normal WorkItem result selection, idempotency, validation, and fail-closed behavior when no refinement is present. Add focused tests for an unschedulable READY WorkItem whose refinement is still recorded, plus unchanged normal result behavior. This is an integration-path blocker for 7JCQPF and PR #5870; do not change release ordering, policy, scheduler semantics, or task stores.

## Scope

- In scope: Fix the supported recovery path exposed by 7JCQPF. In recordTaskCentricExternalResult, when semantic.plan_refinement is present, record the refinement against the current approved plan before selecting or projecting a WorkItem result. If the refinement requires replan, return replan_required without requiring a schedulable WorkItem. Preserve normal WorkItem result selection, idempotency, validation, and fail-closed behavior when no refinement is present. Add focused tests for an unschedulable READY WorkItem whose refinement is still recorded, plus unchanged normal result behavior. This is an integration-path blocker for 7JCQPF and PR #5870; do not change release ordering, policy, scheduler semantics, or task stores.
- Out of scope: unrelated refactors not required for "Allow task-centric plan refinement before WorkItem selection".

## Verification

- State: blocked_external
- Note: Rework: No executable declared verification checks are configured for this task.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-29T10:02:03.232Z
- Branch: task/202608290920-1PZGG8/allow-task-centric-plan-refinement-before-workit
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task/task-centric-external-result.test.ts      | 68 +++++++++++++++++++-
 .../commands/task/task-centric-external-result.ts  | 72 +++++++++++-----------
 2 files changed, 102 insertions(+), 38 deletions(-)
```

</details>
