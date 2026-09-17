Task: `202609172016-5A9KVM`
Title: Complete canonical Task application coordinator for 0.7.10
Canonical task record: `.agentplane/tasks/202609172016-5A9KVM/README.md`

## Summary

Complete canonical Task application coordinator for 0.7.10

Connect the pure Task Kernel to the mature repository and provider effect adapters so canonical direct and branch_pr Tasks preserve AgentPlane-owned commit, verification, evaluation, PR, integration, hosted-close, cleanup, evidence readback, and crash recovery. Keep the Kernel as the sole domain owner; do not add a competing lifecycle engine or weaken release qualification.

## Scope

- In scope: Connect the pure Task Kernel to the mature repository and provider effect adapters so canonical direct and branch_pr Tasks preserve AgentPlane-owned commit, verification, evaluation, PR, integration, hosted-close, cleanup, evidence readback, and crash recovery. Keep the Kernel as the sole domain owner; do not add a competing lifecycle engine or weaken release qualification.
- Out of scope: unrelated refactors not required for "Complete canonical Task application coordinator for 0.7.10".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-17T22:51:10.201Z
- Branch: task/202609172016-5A9KVM/canonical-application-coordinator
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/task/kernel-advance.test.ts       | 245 ++++++++++++
 .../agentplane/src/commands/task/kernel-advance.ts |  82 +++-
 .../src/commands/task/kernel-effect-coordinator.ts | 193 ++++++++++
 .../src/commands/task/kernel-exchange.ts           |   8 +
 .../src/commands/task/kernel-final-validation.ts   |  14 +
 .../src/commands/task/kernel-inspection.ts         |  83 +++-
 .../task/kernel-repository-coordinator.test.ts     | 251 ++++++++++++
 .../commands/task/kernel-repository-coordinator.ts | 425 +++++++++++++++++++++
 .../src/commands/task/kernel-run.test.ts           | 140 +++++++
 .../agentplane/src/commands/task/kernel-run.ts     |   2 +-
 .../src/commands/task/kernel-work-order.ts         |  50 ++-
 11 files changed, 1472 insertions(+), 21 deletions(-)
```

</details>
