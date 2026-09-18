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

- State: ok
- Note: Canonical validation sha256:7f669cfb91b53caff81c5468251bfcb7bbd072ef546d528760355996e8147bcd
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-17T22:51:10.201Z
- Branch: task/202609172016-5A9KVM/canonical-application-coordinator
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/harness-dev.mdx                     |  56 ++-
 docs/releases/v0.7.10.md                           |  18 +
 .../src/cli/run-cli.core.kernel-transport.test.ts  |  51 ++-
 .../src/commands/acr/acr.command.test.ts           |  21 +
 packages/agentplane/src/commands/acr/generate.ts   |   2 +-
 packages/agentplane/src/commands/acr/summary.ts    |   2 +-
 .../src/commands/pr/integrate/internal/finalize.ts |   4 +-
 .../shared/canonical-pre-merge-evidence.ts         |  38 ++
 .../shared/route-decision-blockers.kernel.test.ts  |  67 +++
 .../src/commands/shared/route-decision-blockers.ts |   9 +-
 .../shared/side-effect-authority-policy.ts         | 203 +++++++++
 .../commands/shared/side-effect-authority.test.ts  | 110 ++++-
 .../src/commands/shared/side-effect-authority.ts   | 273 ++++--------
 .../src/commands/task/advance.command.ts           |  22 +-
 .../commands/task/direct-task-verification.test.ts |  32 +-
 .../src/commands/task/direct-task-verification.ts  |  12 +-
 .../external-agent-implementation-finalization.ts  |   7 +-
 .../src/commands/task/git-status-path.test.ts      |  21 +
 .../src/commands/task/git-status-path.ts           |  64 +++
 .../src/commands/task/kernel-advance.test.ts       | 334 ++++++++++++++
 .../agentplane/src/commands/task/kernel-advance.ts | 375 +++++++++-------
 .../task/kernel-controller-handoff.test.ts         | 284 ++++++++++++
 .../src/commands/task/kernel-controller-handoff.ts | 400 +++++++++++++++++
 .../src/commands/task/kernel-effect-coordinator.ts | 193 ++++++++
 .../src/commands/task/kernel-exchange.test.ts      | 110 +++++
 .../src/commands/task/kernel-exchange.ts           |  52 ++-
 .../src/commands/task/kernel-final-validation.ts   |  14 +
 .../src/commands/task/kernel-inspection.ts         | 111 ++++-
 .../task/kernel-operational-projection.test.ts     | 166 +++++++
 .../commands/task/kernel-operational-projection.ts | 131 ++++++
 .../agentplane/src/commands/task/kernel-plan.ts    |  67 ++-
 .../kernel-provider-effect-coordinator.test.ts     | 337 ++++++++++++++
 .../task/kernel-provider-effect-coordinator.ts     | 489 +++++++++++++++++++++
 .../task/kernel-repository-coordinator.test.ts     | 294 +++++++++++++
 .../commands/task/kernel-repository-coordinator.ts | 475 ++++++++++++++++++++
 .../src/commands/task/kernel-run.test.ts           | 140 ++++++
 .../agentplane/src/commands/task/kernel-run.ts     |  29 +-
 .../src/commands/task/kernel-semantic-result.ts    | 220 +++++++++
 .../src/commands/task/kernel-work-order.ts         |  50 ++-
 .../src/commands/task/plan-set.command.ts          |  23 +-
 .../agentplane/src/commands/task/run.command.ts    |  26 +-
 .../src/commands/task/show-kernel.test.ts          | 113 ++++-
 packages/agentplane/src/commands/task/show.ts      |  36 ++
 .../src/runner/usecases/kernel-authority.ts        |   4 +
 .../src/tasks/task-kernel/authority-lineage.ts     |  92 +++-
 packages/core/src/tasks/task-kernel/index.ts       |   2 +
 packages/core/src/tasks/task-kernel/kernel.test.ts |  67 +++
 packages/core/src/tasks/task-kernel/kernel.ts      |  52 ++-
 packages/testkit/src/cli-harness.ts                |   6 +-
 .../check-packaged-mixed-scope-lifecycle.mjs       | 119 +++--
 .../qualification/release-qualification.test.mjs   |  27 +-
 51 files changed, 5364 insertions(+), 486 deletions(-)
```

</details>
