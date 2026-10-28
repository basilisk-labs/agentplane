Task: `202610272137-T6KC8D`
Title: Complete generic hosted PR adoption with exact-base-safe merge and CLI reference
Canonical task record: `.agentplane/tasks/202610272137-T6KC8D/README.md`

## Summary

Complete generic hosted PR adoption with exact-base-safe merge and CLI reference

Successor to 202610271739-EWNMG7 after failed full CI. Transfer approved generic adoption implementation from c61813ce2946a7aabcc7f2c8fd67c724398f3ea7 under a fresh WorkOrder; fix exact-base-safe provider method selection, ordinary-route regressions, and generated CLI reference. Preserve prior task history and independent verification.

## Scope

- In scope: Successor to 202610271739-EWNMG7 after failed full CI. Transfer approved generic adoption implementation from c61813ce2946a7aabcc7f2c8fd67c724398f3ea7 under a fresh WorkOrder; fix exact-base-safe provider method selection, ordinary-route regressions, and generated CLI reference. Preserve prior task history and independent verification.
- Out of scope: unrelated refactors not required for "Complete generic hosted PR adoption with exact-base-safe merge and CLI reference".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-28T04:52:28.633Z
- Branch: task/202610272137-T6KC8D/complete-generic-hosted-pr-adoption-with-exact-b
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  19 +
 .../src/adapters/task-backend/kernel-record.ts     |   1 +
 .../task-backend/kernel-replay-persistence.test.ts |  39 +-
 .../src/cli/run-cli/command-catalog/project.ts     |   6 +
 .../src/cli/run-cli/command-loaders/project.ts     |   4 +
 ...evaluator-qualification-review.adoption.test.ts | 106 +++++
 .../evaluator/evaluator-qualification-review.ts    |  36 ++
 .../src/commands/pr/adoption-identity.test.ts      | 111 +++++
 .../src/commands/pr/adoption-identity.ts           | 164 +++++++
 .../commands/pr/adoption-merge-base-proof.test.ts  |  64 +++
 .../src/commands/pr/adoption-merge.test.ts         | 249 +++++++++++
 .../agentplane/src/commands/pr/adoption-merge.ts   | 229 ++++++++++
 .../src/commands/pr/adoption-observe.test.ts       |  82 ++++
 .../agentplane/src/commands/pr/adoption-observe.ts |  35 ++
 .../src/commands/pr/adoption-request.test.ts       | 170 +++++++
 .../agentplane/src/commands/pr/adoption-request.ts | 174 ++++++++
 .../src/commands/pr/adoption-route.test.ts         | 231 ++++++++++
 .../agentplane/src/commands/pr/adoption-route.ts   | 110 +++++
 .../src/commands/pr/adoption-store.test.ts         | 131 ++++++
 .../agentplane/src/commands/pr/adoption-store.ts   | 258 +++++++++++
 .../commands/pr/adoption-task-authority.test.ts    | 124 ++++++
 .../src/commands/pr/adoption-task-authority.ts     |  41 ++
 .../src/commands/pr/adoption-verification.ts       |  13 +
 .../agentplane/src/commands/pr/adoption.command.ts | 321 ++++++++++++++
 packages/agentplane/src/commands/pr/check.ts       |  92 ++++
 .../src/commands/pr/flow-status-close-tail.ts      | 145 ++++++
 packages/agentplane/src/commands/pr/flow-status.ts | 279 ++++++------
 .../internal/github-pr-merge-strategy.test.ts      |  85 ++++
 .../pr/integrate/internal/github-pr-merge.ts       |  54 ++-
 .../pr/integrate/internal/gitlab-mr-merge.test.ts  |  25 +-
 .../pr/integrate/internal/gitlab-mr-merge.ts       |  17 +
 .../agentplane/src/commands/pr/internal/sync.ts    |   3 +
 packages/agentplane/src/commands/pr/pr.spec.ts     |   2 +-
 .../src/commands/pr/provider-update-branch.test.ts |  48 ++
 .../src/commands/pr/provider-update-branch.ts      |  75 +++-
 .../shared/canonical-pre-merge-evidence.ts         |  33 ++
 .../shared/pr-meta/builders.adoption.test.ts       |  52 +++
 .../src/commands/shared/pr-meta/builders.ts        |   1 +
 .../shared/provider-update-branch-route.ts         |  40 ++
 .../shared/side-effect-authority-policy.ts         |  13 +
 .../commands/shared/side-effect-authority.test.ts  |  89 ++++
 .../src/commands/shared/side-effect-authority.ts   |  24 +-
 .../shared/supervisor-execution-episode.ts         |  21 +-
 .../commands/shared/workflow-operation-effects.ts  |   3 +
 .../commands/shared/workflow-operation-params.ts   |  69 +++
 .../commands/shared/workflow-operation-prefix.ts   |   3 +
 .../shared/workflow-operation-projection.ts        |  17 +
 .../src/commands/shared/workflow-postconditions.ts |   6 +
 .../shared/workflow-step-adopted-pr.test.ts        | 359 +++++++++++++++
 .../commands/shared/workflow-step-adopted-pr.ts    | 169 +++++++
 .../src/commands/shared/workflow-step-reducer.ts   |  10 +-
 .../src/commands/shared/workflow-step.ts           | 104 +++--
 .../task/adopted-provider-effect-recovery.test.ts  | 486 +++++++++++++++++++++
 .../task/adopted-provider-effect-recovery.ts       | 327 ++++++++++++++
 .../src/commands/task/advance-task-step.ts         |  41 ++
 .../branch-task-supervisor-adopted-operations.ts   | 187 ++++++++
 .../task/branch-task-supervisor-operations.test.ts | 154 +++++++
 .../task/branch-task-supervisor-operations.ts      |  89 +++-
 ...nel-accepted-repository-evidence.hosted.test.ts | 102 +++++
 .../task/kernel-accepted-repository-evidence.ts    |  33 ++
 .../commands/task/kernel-adopted-pr-route.test.ts  |  67 +++
 .../src/commands/task/kernel-adopted-pr-route.ts   | 125 ++++++
 .../task/kernel-adopted-preclaim-update.ts         | 102 +++++
 .../task/kernel-controller-handoff.test.ts         |  39 +-
 .../src/commands/task/kernel-controller-handoff.ts |  17 +
 .../commands/task/kernel-final-corrective-plan.ts  |  62 +++
 .../commands/task/kernel-final-validation.test.ts  |  20 +
 .../src/commands/task/kernel-final-validation.ts   | 138 +++---
 .../commands/task/kernel-hosted-checkout.test.ts   | 116 +++++
 .../src/commands/task/kernel-hosted-checkout.ts    | 126 ++++++
 .../task/kernel-hosted-head-evidence.test.ts       | 134 ++++++
 .../commands/task/kernel-hosted-head-evidence.ts   | 145 ++++++
 .../commands/task/kernel-hosted-readback.test.ts   |  87 ++++
 .../src/commands/task/kernel-hosted-readback.ts    |  80 ++++
 .../commands/task/kernel-inspection-validation.ts  |  94 +++-
 .../commands/task/kernel-inspection-work-order.ts  | 205 +++++++++
 .../src/commands/task/kernel-inspection.test.ts    |   9 +-
 .../src/commands/task/kernel-inspection.ts         | 260 ++++-------
 .../task/kernel-repository-commit-intents.ts       |  96 ++++
 .../commands/task/kernel-repository-coordinator.ts | 208 +++++----
 .../src/commands/task/kernel-repository-types.ts   |  19 +-
 .../src/commands/task/kernel-semantic-result.ts    |  25 +-
 .../commands/task/roadmap-terminal-noop.test.ts    |  73 +++-
 .../task-kernel/hosted-pr-head-evidence.test.ts    | 175 ++++++++
 .../tasks/task-kernel/hosted-pr-head-evidence.ts   | 110 +++++
 packages/core/src/tasks/task-kernel/index.ts       |   5 +
 packages/core/src/tasks/task-kernel/kernel.test.ts |   1 +
 packages/core/src/tasks/task-kernel/kernel.ts      |  29 +-
 packages/core/src/tasks/task-kernel/model.ts       |   2 +
 .../baselines/v0.7-compatibility-candidate.json    |  91 +++-
 .../check-compatibility-contract-baseline.mjs      |  36 +-
 .../check-compatibility-contract-baseline.test.mjs |  39 ++
 92 files changed, 8120 insertions(+), 590 deletions(-)
```

</details>
