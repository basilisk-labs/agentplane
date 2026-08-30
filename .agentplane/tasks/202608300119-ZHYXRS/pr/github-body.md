Task: `202608300119-ZHYXRS`
Title: Preserve WorkItem results during plan reapproval and recover evidence-only implementation
Canonical task record: `.agentplane/tasks/202608300119-ZHYXRS/README.md`

## Summary

Preserve WorkItem results during plan reapproval and recover evidence-only implementation

Unblock the approved Clean Task Core rebuild M1 task 202608292032-1K47B8. Diagnose repeated plan approval resetting existing WorkItem runtime and evidence-only recovery rejecting already committed valid implementation. Preserve same-plan WorkItem state and output validation without allowing changed plans, stale identities, or unauthorized effects to reuse results. Add bounded regression coverage for both positive recovery and fail-closed behavior. Scope packages/core/src/tasks/task-centric and packages/agentplane/src/commands/task. Do not edit task state by hand or weaken authority checks. Deliver through verified branch PR and hosted close, then resume M1.

## Scope

- In scope: Unblock the approved Clean Task Core rebuild M1 task 202608292032-1K47B8. Diagnose repeated plan approval resetting existing WorkItem runtime and evidence-only recovery rejecting already committed valid implementation. Preserve same-plan WorkItem state and output validation without allowing changed plans, stale identities, or unauthorized effects to reuse results. Add bounded regression coverage for both positive recovery and fail-closed behavior. Scope packages/core/src/tasks/task-centric and packages/agentplane/src/commands/task. Do not edit task state by hand or weaken authority checks. Deliver through verified branch PR and hosted close, then resume M1.
- Out of scope: unrelated refactors not required for "Preserve WorkItem results during plan reapproval and recover evidence-only implementation".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-30T01:41:31.076Z
- Branch: task/202608300119-ZHYXRS/preserve-workitem-results-during-plan-reapproval
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../external-agent-implementation-recovery.test.ts |  17 +++-
 packages/core/src/tasks/task-centric/graph.ts      |  17 ++++
 .../src/tasks/task-centric/task-centric.test.ts    | 107 +++++++++++++++++++++
 3 files changed, 140 insertions(+), 1 deletion(-)
```

</details>
