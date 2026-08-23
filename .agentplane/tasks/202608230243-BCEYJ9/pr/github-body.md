Task: `202608230243-BCEYJ9`
Title: Honor task-centric PLANNING after material plan refinement
Canonical task record: `.agentplane/tasks/202608230243-BCEYJ9/README.md`

## Summary

Honor task-centric PLANNING after material plan refinement

Fix the proven branch supervisor regression where a material external result.plan_refinement moves the task-centric aggregate to PLANNING but the legacy branch route continues through verification, quality review, and finish. After refinement, the next packet must be PLANNER for a revised plan; no closeout may run while a required WorkItem is REWORK_READY. Keep the correction generic and limited to route/supervisor reconciliation plus focused regression tests. Evidence: Task 202608230020-TEK7WE failed pre-merge finish with required_work_item_incomplete:stabilize-runtime-full-ci while aggregate lifecycle=PLANNING and WorkItem state=REWORK_READY.

## Scope

- In scope: Fix the proven branch supervisor regression where a material external result.plan_refinement moves the task-centric aggregate to PLANNING but the legacy branch route continues through verification, quality review, and finish. After refinement, the next packet must be PLANNER for a revised plan; no closeout may run while a required WorkItem is REWORK_READY. Keep the correction generic and limited to route/supervisor reconciliation plus focused regression tests. Evidence: Task 202608230020-TEK7WE failed pre-merge finish with required_work_item_incomplete:stabilize-runtime-full-ci while aggregate lifecycle=PLANNING and WorkItem state=REWORK_READY.
- Out of scope: unrelated refactors not required for "Honor task-centric PLANNING after material plan refinement".

## Verification

- State: needs_rework
- Note:

```text
Rework: Declared check failed: bunx vitest run
packages/agentplane/src/cli/run-cli.core.task-advance.test.ts
packages/agentplane/src/commands/task/task-centric-external-result.test.ts --pool=forks --maxWorkers
1 --testTimeout 60000 --hookTimeout 60000
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-23T03:00:37.293Z
- Branch: task/202608230243-BCEYJ9/honor-task-centric-planning-after-material-plan
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../adapters/task-backend/task-centric-backend-adapter.ts | 15 ++++++++++++++-
 .../commands/task/task-centric-external-result.test.ts    |  5 +++++
 2 files changed, 19 insertions(+), 1 deletion(-)
```

</details>
