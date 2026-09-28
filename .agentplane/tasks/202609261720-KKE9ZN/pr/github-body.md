Task: `202609261720-KKE9ZN`
Title: Implement and qualify AgentPlane 0.7.12 planning reuse for PL-01 through PL-12
Canonical task record: `.agentplane/tasks/202609261720-KKE9ZN/README.md`

## Summary

Implement and qualify AgentPlane 0.7.12 planning reuse for PL-01 through PL-12

User authorizes all necessary work to implement and release 0.7.12 without repeated permission requests. Use agentplane-roadmap-r2/tasks/PL-01.md through PL-12.md and EXECUTION-CHARTER.md as the scope contract. Inspect current main and accepted LC-24 evidence, preserve one Kernel and coordinator, reuse compact Plan proposal normalization, retain approval and EVALUATOR floors, implement managed and external planning reuse and recovery, run installed-package and release-critical qualification, record M04 measurement with honest unknown accounting, and document observed behavior. Use sequential independently verifiable WorkItems. Include bootstrap lockfile workspace version reconciliation. Release publication follows exact-SHA release checks in a subsequent release task. Do not implement 0.7.13 or 0.7.14.

## Scope

- In scope: User authorizes all necessary work to implement and release 0.7.12 without repeated permission requests. Use agentplane-roadmap-r2/tasks/PL-01.md through PL-12.md and EXECUTION-CHARTER.md as the scope contract. Inspect current main and accepted LC-24 evidence, preserve one Kernel and coordinator, reuse compact Plan proposal normalization, retain approval and EVALUATOR floors, implement managed and external planning reuse and recovery, run installed-package and release-critical qualification, record M04 measurement with honest unknown accounting, and document observed behavior. Use sequential independently verifiable WorkItems. Include bootstrap lockfile workspace version reconciliation. Release publication follows exact-SHA release checks in a subsequent release task. Do not implement 0.7.13 or 0.7.14.
- Out of scope: unrelated refactors not required for "Implement and qualify AgentPlane 0.7.12 planning reuse for PL-01 through PL-12".

## Verification

- State: ok
- Note: Canonical validation sha256:5dd197e110bdc7f9da6def8e00d6cb750262e3a84ca44254bf23d29bf3d9141f
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-27T19:16:20.496Z
- Branch: task/202609261720-KKE9ZN/implement-and-qualify-agentplane-0-7-12-planning
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 bun.lock                                           |   6 +-
 .../task-backend/kernel-backend-adapter.ts         |  10 +-
 .../src/adapters/task-backend/kernel-documents.ts  |  18 ++
 .../src/commands/task/advance-task-step.ts         |   3 +
 .../src/commands/task/create-plan-input.test.ts    | 307 +++++++++++++++++++++
 .../src/commands/task/create-plan-input.testkit.ts |  32 +++
 .../src/commands/task/create-plan-input.ts         |  81 ++++++
 .../src/commands/task/create-plan-proposal.ts      |  99 +++++++
 .../agentplane/src/commands/task/create.command.ts |  25 ++
 .../agentplane/src/commands/task/kernel-create.ts  |  17 +-
 .../agentplane/src/commands/task/kernel-plan.ts    |  34 ++-
 .../src/commands/task/kernel-supplied-plan.ts      |  52 ++++
 .../src/commands/task/kernel-work-order.ts         |  14 +-
 packages/agentplane/src/commands/task/new.ts       |   3 +-
 .../src/commands/task/planning-capabilities.ts     |   1 +
 .../roadmap-inline-plan-materialization.test.ts    | 151 ++++++++++
 .../commands/task/task-centric-external-result.ts  |   2 +-
 .../src/runner/usecases/kernel-task-lifecycle.ts   |  21 +-
 packages/core/src/runner/agent-work-order.ts       |   4 +-
 packages/core/src/tasks/index.ts                   |   3 +
 packages/core/src/tasks/kernel-semantic.ts         |   7 +-
 .../tasks/task-centric/planning-obligation.test.ts | 102 +++++++
 packages/core/src/tasks/task-centric/policy.ts     |  55 ++++
 packages/core/src/tasks/task-centric/schema.ts     |  38 +++
 24 files changed, 1066 insertions(+), 19 deletions(-)
```

</details>
