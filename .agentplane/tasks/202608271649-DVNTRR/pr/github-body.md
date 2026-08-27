Task: `202608271649-DVNTRR`
Title: Modernize task continuity and approval fixtures
Canonical task record: `.agentplane/tasks/202608271649-DVNTRR/README.md`

## Summary

Modernize task continuity and approval fixtures

Repair eight freshly reproduced fixture failures across task handoff, direct supervisor approval, next-action JSON and route escalation. Scope only run-cli.core.task-handoff.test.ts, run-cli.core.direct-task-supervision.test.ts, run-cli.core.task-next-action-json.test.ts, run-cli.core.task-routing.test.ts and a new local task-continuity.testkit.ts under packages/agentplane/src/cli. Use real committed Git baselines and typed TaskPlanProposal from the actual PLANNER work order. Preserve task kind, mutation, risk and requested route in fixture proposals. Keep explicit approval ungranted in the supervisor stop test. Retain stale claimed-run cancellation, unclaimed-run refusal, branch snapshot precedence, exact authority/head preservation, JSON aliases and state fingerprints, user-question precedence, and publish-risk branch escalation. No production, global testkit, CI, policy, timeout or roadmap changes. Do not modify the old0.6 P5BWP0 task or its artifacts. This is a new0.7.8 qualification repair on current main, disjoint from all active source edits. Require all9 existing scenarios, focused lint/format, full CI, EVALUATOR and hosted exact-head proof.

## Scope

- In scope: Repair eight freshly reproduced fixture failures across task handoff, direct supervisor approval, next-action JSON and route escalation. Scope only run-cli.core.task-handoff.test.ts, run-cli.core.direct-task-supervision.test.ts, run-cli.core.task-next-action-json.test.ts, run-cli.core.task-routing.test.ts and a new local task-continuity.testkit.ts under packages/agentplane/src/cli. Use real committed Git baselines and typed TaskPlanProposal from the actual PLANNER work order. Preserve task kind, mutation, risk and requested route in fixture proposals. Keep explicit approval ungranted in the supervisor stop test. Retain stale claimed-run cancellation, unclaimed-run refusal, branch snapshot precedence, exact authority/head preservation, JSON aliases and state fingerprints, user-question precedence, and publish-risk branch escalation. No production, global testkit, CI, policy, timeout or roadmap changes. Do not modify the old0.6 P5BWP0 task or its artifacts. This is a new0.7.8 qualification repair on current main, disjoint from all active source edits. Require all9 existing scenarios, focused lint/format, full CI, EVALUATOR and hosted exact-head proof.
- Out of scope: unrelated refactors not required for "Modernize task continuity and approval fixtures".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-27T16:53:10.841Z
- Branch: task/202608271649-DVNTRR/modernize-task-continuity-and-approval-fixtures
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../run-cli.core.direct-task-supervision.test.ts   |  35 ++---
 .../src/cli/run-cli.core.task-handoff.test.ts      |  41 ++---
 .../cli/run-cli.core.task-next-action-json.test.ts |  42 ++---
 .../src/cli/run-cli.core.task-routing.test.ts      |  24 ++-
 .../agentplane/src/cli/task-continuity.testkit.ts  | 170 +++++++++++++++++++++
 5 files changed, 217 insertions(+), 95 deletions(-)
```

</details>
