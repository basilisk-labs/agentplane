Task: `202608312334-MPXQBK`
Title: Apply task-centric plan refinement before implementation commit qualification
Canonical task record: `.agentplane/tasks/202608312334-MPXQBK/README.md`

## Summary

Apply task-centric plan refinement before implementation commit qualification

Fix external-agent implementation result handling so a completed semantic result containing plan_refinement is recorded through the canonical task-centric adapter before implementation commit recovery, scope qualification, verification, or WorkItem result recording. A material refinement must return replan_required without requiring workspace changes or reassigning historical implementation diffs to the current WorkItem. Preserve stale-state, baseline, identity, and task-centric binding checks. Add focused regressions for result_received recovery and scope-expanding refinement. This bootstrap unblocks 202608291006-255K66.

## Scope

- In scope: Fix external-agent implementation result handling so a completed semantic result containing plan_refinement is recorded through the canonical task-centric adapter before implementation commit recovery, scope qualification, verification, or WorkItem result recording. A material refinement must return replan_required without requiring workspace changes or reassigning historical implementation diffs to the current WorkItem. Preserve stale-state, baseline, identity, and task-centric binding checks. Add focused regressions for result_received recovery and scope-expanding refinement. This bootstrap unblocks 202608291006-255K66.
- Out of scope: unrelated refactors not required for "Apply task-centric plan refinement before implementation commit qualification".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-31T23:43:04.724Z
- Branch: task/202608312334-MPXQBK/apply-task-centric-plan-refinement-before-implem
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-advance.evidence-rework.test.ts | 106 ++++++++++++++++
 ...-cli.critical.agent-efficiency-baseline.test.ts |   2 +-
 .../task/external-agent-plan-refinement.ts         | 125 ++++++++++++++++++-
 scripts/checks/run-local-ci-group.mjs              | 138 ++++++++++++++++++++-
 scripts/checks/run-local-ci.mjs                    |  19 ++-
 5 files changed, 374 insertions(+), 16 deletions(-)
```

</details>
