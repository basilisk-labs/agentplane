Task: `202608280614-PCBY2N`
Title: Recover task-level evidence rework after completed WorkItems
Canonical task record: `.agentplane/tasks/202608280614-PCBY2N/README.md`

## Summary

Recover task-level evidence rework after completed WorkItems

Required integration-path repair after QMVHM2 and CFKR4P are integrated on main e3550efba441765882f2507cfaf659e9a76d2f0b. Task 202608280529-59VB06 has a completed implementation WorkItem and passed full verification. Its evaluator requested only task Findings. The operator populated Findings through supported task commands and resumed DOING. A fresh task-level implementation_rework WorkOrder has work_item_id=null, preserves the existing code, and returns a completed documentation-only result. Acceptance rejects it with Completed implementation result produced no supervisor-observed workspace change. The immutable result is now received and must not be rewritten. resolveRecordedImplementationRecovery matches the prior implementation exchange WorkItem id to the new null id, while evidence-only rework also requires the recorded implementation to equal current metadata HEAD. Reproduce and repair only this task-level no-change documentation/evidence rework path. Require the same approved plan, scope, exact recorded implementation and ancestry, all required WorkItems completed, a validated historical result and original effect evidence, no unapproved source drift, and unchanged verification requirements. Preserve current rework findings as current claims; preserve original claims for interrupted WorkItem recovery. Rerun mandatory checks through the existing supervisor and obtain fresh evaluation. Cover interruption, replay, changed plan/authority/HEAD rejection and no false DONE. Do not hand-edit task/journal/evidence, reuse checks across different inputs without supported proof, weaken checks, invent a source change, or introduce a new state store or architecture program. Preserve blocked task 59VB06 and DVS5NN, keep one integration owner, and integrate this bounded repair before retrying them. The user authorized all in-scope operations through release. Release/Core order is unchanged. Prepopulate task Findings with observed diagnosis and pending evidence before implementation so this repair does not repeat the same documentation gap.

## Scope

- In scope: Required integration-path repair after QMVHM2 and CFKR4P are integrated on main e3550efba441765882f2507cfaf659e9a76d2f0b. Task 202608280529-59VB06 has a completed implementation WorkItem and passed full verification. Its evaluator requested only task Findings. The operator populated Findings through supported task commands and resumed DOING. A fresh task-level implementation_rework WorkOrder has work_item_id=null, preserves the existing code, and returns a completed documentation-only result. Acceptance rejects it with Completed implementation result produced no supervisor-observed workspace change. The immutable result is now received and must not be rewritten. resolveRecordedImplementationRecovery matches the prior implementation exchange WorkItem id to the new null id, while evidence-only rework also requires the recorded implementation to equal current metadata HEAD. Reproduce and repair only this task-level no-change documentation/evidence rework path. Require the same approved plan, scope, exact recorded implementation and ancestry, all required WorkItems completed, a validated historical result and original effect evidence, no unapproved source drift, and unchanged verification requirements. Preserve current rework findings as current claims; preserve original claims for interrupted WorkItem recovery. Rerun mandatory checks through the existing supervisor and obtain fresh evaluation. Cover interruption, replay, changed plan/authority/HEAD rejection and no false DONE. Do not hand-edit task/journal/evidence, reuse checks across different inputs without supported proof, weaken checks, invent a source change, or introduce a new state store or architecture program. Preserve blocked task 59VB06 and DVS5NN, keep one integration owner, and integrate this bounded repair before retrying them. The user authorized all in-scope operations through release. Release/Core order is unchanged. Prepopulate task Findings with observed diagnosis and pending evidence before implementation so this repair does not repeat the same documentation gap.
- Out of scope: unrelated refactors not required for "Recover task-level evidence rework after completed WorkItems".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-28T11:29:11.370Z
- Branch: task/202608280614-PCBY2N/recover-task-level-evidence-rework-after-complet
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...n-cli.core.task-advance.evidence-rework.test.ts | 431 +++++++++++++++++++++
 .../external-agent-implementation-authority.ts     |  10 +-
 .../external-agent-implementation-recovery.test.ts |  37 ++
 .../task/external-agent-implementation-recovery.ts |  92 ++++-
 4 files changed, 560 insertions(+), 10 deletions(-)
```

</details>
