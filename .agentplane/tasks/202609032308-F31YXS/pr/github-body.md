Task: `202609032308-F31YXS`
Title: Repair verification evidence contract atomicity and task-centric rework projection so PX8PZT can complete
Canonical task record: `.agentplane/tasks/202609032308-F31YXS/README.md`

## Summary

Repair verification evidence contract atomicity and task-centric rework projection so PX8PZT can complete

Reproduce and fix the Clean Core control-plane failure exposed by task 202609031717-PX8PZT. Direct task verification currently executes all declared checks successfully, then verification persistence recomputes a stronger contract and rejects the same evidence with missing_checks=docs_contract after AgentPlane-owned task-artifact observation commits. The supported agentplane verify --rework path also fails closed because the legacy projection would become DOING/revision 33 while the canonical task-centric aggregate remains DONE/revision 33. Make verification execution and persistence use one deterministic observed contract and make evidence-based rework mutation atomically update every canonical projection or fail without partial state. Add focused regressions for both defects, preserve supervisor ownership of task artifacts and lifecycle transitions, and prove recovery of PX8PZT through the normal packet/result/resume route. Do not hand-edit task state, weaken verification requirements, absorb unrelated projection cleanup, MPXQBK, GitLab/provider-neutral expansion, dependencies, or release/version/publication work.

## Scope

- In scope: Reproduce and fix the Clean Core control-plane failure exposed by task 202609031717-PX8PZT. Direct task verification currently executes all declared checks successfully, then verification persistence recomputes a stronger contract and rejects the same evidence with missing_checks=docs_contract after AgentPlane-owned task-artifact observation commits. The supported agentplane verify --rework path also fails closed because the legacy projection would become DOING/revision 33 while the canonical task-centric aggregate remains DONE/revision 33. Make verification execution and persistence use one deterministic observed contract and make evidence-based rework mutation atomically update every canonical projection or fail without partial state. Add focused regressions for both defects, preserve supervisor ownership of task artifacts and lifecycle transitions, and prove recovery of PX8PZT through the normal packet/result/resume route. Do not hand-edit task state, weaken verification requirements, absorb unrelated projection cleanup, MPXQBK, GitLab/provider-neutral expansion, dependencies, or release/version/publication work.
- Out of scope: unrelated refactors not required for "Repair verification evidence contract atomicity and task-centric rework projection so PX8PZT can complete".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-04T11:42:46.433Z
- Branch: task/202609032308-F31YXS/repair-verification-evidence-contract-atomicity
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../task-centric-backend-projection.ts             |  13 +-
 ...n-cli.core.task-advance.evidence-rework.test.ts |  18 +-
 .../src/commands/shared/task-mutation.test.ts      | 143 ++++++++++
 .../commands/task/direct-task-verification.test.ts |   8 +
 .../src/commands/task/direct-task-verification.ts  |   4 +-
 .../task/external-agent-implementation-recovery.ts |  18 +-
 .../src/commands/task/verify-record-execute.ts     |  43 +--
 .../agentplane/src/commands/task/verify-record.ts  |   3 +-
 .../src/commands/task/verify-record.types.ts       |   8 +
 packages/core/src/tasks/task-centric/graph.ts      | 104 ++++++-
 packages/core/src/tasks/task-centric/index.ts      |   1 +
 .../task-centric/replacement-plan-recovery.test.ts | 316 +++++++++++++++++++++
 12 files changed, 648 insertions(+), 31 deletions(-)
```

</details>
