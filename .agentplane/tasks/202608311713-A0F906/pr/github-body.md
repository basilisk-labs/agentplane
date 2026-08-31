Task: `202608311713-A0F906`
Title: Repair pure plan-refinement result recovery for M3 continuation
Canonical task record: `.agentplane/tasks/202608311713-A0F906/README.md`

## Summary

Repair pure plan-refinement result recovery for M3 continuation

Bootstrap repair required by clean Task core refactoring task 202608291006-255K66. The native EXECUTOR packet explicitly permits result.plan_refinement, but a completed refinement-only result with no implementation changes is durably received and then rejected by applyExternalImplementationResult before TaskCentricBackendAdapter can record the refinement. task advance and task advance --replacement repeat the same no-workspace-change error. Implement a bounded native refinement-only path that preserves exact exchange identity, single-use result admission, baseline validation, plan-change classification, native task traceability and previous completed WorkItems. A refinement-only result must never claim completed implementation, trigger a fake commit, or complete the current WorkItem. Add regression coverage for initial receipt, lost response/replay, invalid or changed baseline, and retained ordinary completed-no-diff rejection. Do not edit any live task/exchange/journal records manually. After delivery, qualify recovery of the exact received M3 refinement and resume the canonical refactoring graph. No stable release publication is authorized by this repair.

## Scope

- In scope: Bootstrap repair required by clean Task core refactoring task 202608291006-255K66. The native EXECUTOR packet explicitly permits result.plan_refinement, but a completed refinement-only result with no implementation changes is durably received and then rejected by applyExternalImplementationResult before TaskCentricBackendAdapter can record the refinement. task advance and task advance --replacement repeat the same no-workspace-change error. Implement a bounded native refinement-only path that preserves exact exchange identity, single-use result admission, baseline validation, plan-change classification, native task traceability and previous completed WorkItems. A refinement-only result must never claim completed implementation, trigger a fake commit, or complete the current WorkItem. Add regression coverage for initial receipt, lost response/replay, invalid or changed baseline, and retained ordinary completed-no-diff rejection. Do not edit any live task/exchange/journal records manually. After delivery, qualify recovery of the exact received M3 refinement and resume the canonical refactoring graph. No stable release publication is authorized by this repair.
- Out of scope: unrelated refactors not required for "Repair pure plan-refinement result recovery for M3 continuation".

## Verification

- State: pending
- Note: Invalidated by USER-approved execution scope extension.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-31T19:01:26.236Z
- Branch: task/202608311713-A0F906/repair-pure-plan-refinement-result-recovery-for
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-backend/task-centric-backend-adapter.ts   |   9 +-
 ...n-cli.core.task-advance.evidence-rework.test.ts | 208 ++++++++++++++++++++-
 .../src/commands/task/external-agent-exchange.ts   |   1 +
 .../task/external-agent-plan-refinement.ts         | 145 ++++++++++++++
 .../task/external-agent-result-application.ts      |  11 ++
 .../task/external-agent-supervisor-recovery.ts     |  30 ++-
 .../src/commands/task/external-agent-supervisor.ts |   9 +-
 .../task/external-agent-task-artifact-baseline.ts  |  51 +++++
 8 files changed, 451 insertions(+), 13 deletions(-)
```

</details>
