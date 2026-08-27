Task: `202608271450-TZHW4C`
Title: Modernize structured planner-intent fixtures
Canonical task record: `.agentplane/tasks/202608271450-TZHW4C/README.md`

## Summary

Modernize structured planner-intent fixtures

Modernize the three planner-intent fixture files after eight freshly reproduced failures. Produce a real structured TaskPlanProposal from the issued PLANNER work order with exact repository_snapshot, bounded WorkItem scope and declared checks. Do not attach planning proposals to EXECUTOR or EVALUATOR results. Preserve missing-intent negative coverage, explicit user approval, forbidden external effects, network approval, direct versus branch_pr routing, exact execution identity and work preservation. Seed Git before planning where execution requires it. Keep isolated fixture CI and fake-provider transport valid without changing production CI. Replace only obsolete internal lifecycle counts with semantic invariants if necessary, preserving the one-user-approval outcome. No product, global testkit helper, policy, release or task graph changes. Scope is disjoint from G0N9P4, 9EWJA1 and DVEMAE; use already integrated GHHA0Q. Require focused tests and full CI.

## Scope

- In scope: Modernize the three planner-intent fixture files after eight freshly reproduced failures. Produce a real structured TaskPlanProposal from the issued PLANNER work order with exact repository_snapshot, bounded WorkItem scope and declared checks. Do not attach planning proposals to EXECUTOR or EVALUATOR results. Preserve missing-intent negative coverage, explicit user approval, forbidden external effects, network approval, direct versus branch_pr routing, exact execution identity and work preservation. Seed Git before planning where execution requires it. Keep isolated fixture CI and fake-provider transport valid without changing production CI. Replace only obsolete internal lifecycle counts with semantic invariants if necessary, preserving the one-user-approval outcome. No product, global testkit helper, policy, release or task graph changes. Scope is disjoint from G0N9P4, 9EWJA1 and DVEMAE; use already integrated GHHA0Q. Require focused tests and full CI.
- Out of scope: unrelated refactors not required for "Modernize structured planner-intent fixtures".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-27T14:52:22.610Z
- Branch: task/202608271450-TZHW4C/modernize-structured-planner-intent-fixtures
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../run-cli.core.task-create-base-intent.test.ts   |   3 +-
 ...run-cli.core.task-create-planner-intent.test.ts | 134 ++++++++++---------
 .../src/cli/task-create-planner-intent.testkit.ts  | 145 +++++++++++++++++++--
 3 files changed, 209 insertions(+), 73 deletions(-)
```

</details>
