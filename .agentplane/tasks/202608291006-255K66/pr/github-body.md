Task: `202608291006-255K66`
Title: Cut over to the canonical Task kernel and retire legacy core paths
Canonical task record: `.agentplane/tasks/202608291006-255K66/README.md`

## Summary

Cut over to the canonical Task kernel and retire legacy core paths

After replay and migration gates pass, route all CLI and managed-runner consumers through the canonical kernel, run self-hosting and crash-recovery qualification, remove production legacy lifecycle implementations, preserve only declared compatibility adapters, and produce rollback and release-readiness evidence.

## Scope

- In scope: After replay and migration gates pass, route all CLI and managed-runner consumers through the canonical kernel, run self-hosting and crash-recovery qualification, remove production legacy lifecycle implementations, preserve only declared compatibility adapters, and produce rollback and release-readiness evidence.
- Out of scope: unrelated refactors not required for "Cut over to the canonical Task kernel and retire legacy core paths".

## Verification

- State: ok
- Note: Verified: CLI-owned checks passed before independent EVALUATOR review.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-02T00:58:32.348Z
- Branch: task/202608291006-255K66/cut-over-to-the-canonical-task-kernel-and-retire
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/harness-dev.mdx                     | 113 +++
 .../adapters/authority/user-approval-receipt.ts    | 226 ++++++
 .../task-backend/kernel-authority-schema.ts        |  54 ++
 .../task-backend/kernel-backend-adapter.test.ts    |  30 +-
 .../task-backend/kernel-backend-adapter.ts         |  99 ++-
 .../src/adapters/task-backend/kernel-documents.ts  |  55 ++
 .../adapters/task-backend/kernel-migration.test.ts |  40 +
 .../src/adapters/task-backend/kernel-migration.ts  |  41 +-
 .../adapters/task-backend/kernel-next-action.ts    |  10 +-
 .../task-backend/kernel-record-invariants.ts       |   2 +-
 .../src/adapters/task-backend/kernel-record.ts     |  22 +-
 .../src/cli/run-cli.core.kernel-transport.test.ts  | 431 +++++++++++
 ...li.core.route-decision.pr-open-metadata.test.ts |  36 +
 ...n-cli.core.task-advance-effect-recovery.test.ts |  28 +-
 .../cli/run-cli.core.task-next-action-json.test.ts | 119 ++-
 .../run-cli.core.task-status-token-usage.test.ts   |  73 ++
 ...-cli.critical.agent-efficiency-baseline.test.ts |  11 +-
 .../src/commands/guard/impl/allow.test.ts          |   3 +
 .../src/commands/shared/pr-meta/verify-log.test.ts |  13 +
 .../src/commands/shared/pr-meta/verify-log.ts      |   2 +-
 .../src/commands/shared/task-mutation.ts           |  18 +
 .../commands/shared/verification-details.test.ts   |  33 +
 .../src/commands/shared/verification-details.ts    |   7 +-
 .../src/commands/shared/workflow-step-branch.ts    |  25 +-
 .../commands/shared/workflow-step-quality.test.ts  |  25 +
 .../src/commands/shared/workflow-step-quality.ts   |   8 +-
 .../agentplane/src/commands/task/active.command.ts | 110 ++-
 .../src/commands/task/active.command.unit.test.ts  |  51 ++
 .../src/commands/task/advance.command.ts           |  15 +
 .../agentplane/src/commands/task/brief.command.ts  |   5 +
 .../commands/task/direct-task-verification.test.ts |  69 ++
 .../src/commands/task/direct-task-verification.ts  |  51 +-
 .../task/execution-authority-context.test.ts       |  28 +-
 .../commands/task/execution-authority-context.ts   |   4 +
 .../external-agent-implementation-authority.ts     |  45 +-
 .../external-agent-implementation-recovery.test.ts |  34 +
 .../task/external-agent-implementation-recovery.ts |  65 +-
 .../task/external-agent-plan-refinement.ts         |  19 +-
 .../task/external-agent-planning-authority.ts      |   6 +-
 .../task/external-agent-supervisor-recovery.ts     |   4 +-
 .../agentplane/src/commands/task/kernel-advance.ts | 288 ++++++++
 .../agentplane/src/commands/task/kernel-create.ts  |  49 ++
 .../src/commands/task/kernel-exchange.ts           | 143 ++++
 .../agentplane/src/commands/task/kernel-plan.ts    |  79 ++
 .../agentplane/src/commands/task/kernel-read.ts    |  91 +++
 .../src/commands/task/kernel-run.testkit.ts        |  26 +
 .../agentplane/src/commands/task/kernel-run.ts     | 237 ++++++
 .../src/commands/task/kernel-runtime-context.ts    | 233 ++++++
 .../src/commands/task/kernel-work-order.ts         | 189 +++++
 packages/agentplane/src/commands/task/new.spec.ts  |   6 +
 packages/agentplane/src/commands/task/new.ts       |  10 +-
 .../src/commands/task/next-action.command.ts       |   5 +
 .../src/commands/task/plan-approve.command.ts      |  31 +
 .../src/commands/task/plan-set.command.ts          |  19 +-
 packages/agentplane/src/commands/task/ready.ts     |   6 +
 .../agentplane/src/commands/task/run.command.ts    |  31 +
 .../src/commands/task/show-kernel.test.ts          | 121 ++++
 packages/agentplane/src/commands/task/show.ts      |  15 +-
 .../agentplane/src/commands/task/status.command.ts |   5 +
 .../commands/task/task-centric-external-result.ts  |  29 +
 packages/agentplane/src/commands/task/update.ts    |   2 +
 .../src/commands/task/user-approval-receipt.ts     | 237 +-----
 packages/agentplane/src/ports/kernel-authority.ts  |  50 ++
 .../src/runner/observation/git-snapshot.test.ts    |  66 +-
 .../src/runner/observation/git-snapshot/capture.ts | 119 +--
 .../src/runner/observation/git-snapshot/common.ts  |   8 +-
 .../src/runner/observation/git-snapshot/model.ts   |   2 +
 .../observation/git-snapshot/path-fingerprint.ts   | 106 +++
 .../src/runner/observation/kernel-repository.ts    | 106 +++
 .../src/runner/usecases/kernel-authority.test.ts   | 428 +++++++++++
 .../src/runner/usecases/kernel-authority.ts        | 346 +++++++++
 .../runner/usecases/kernel-task-lifecycle.test.ts  | 474 ++++++++++++
 .../src/runner/usecases/kernel-task-lifecycle.ts   | 311 ++++++++
 .../src/runner/usecases/task-run-bootstrap.ts      |   1 +
 .../core/schemas/agent-work-order-v2.schema.json   | 108 +++
 .../core/src/runner/agent-semantic-result.test.ts  |  32 +
 packages/core/src/runner/agent-semantic-result.ts  |  79 +-
 packages/core/src/runner/agent-work-order.test.ts  |  49 ++
 packages/core/src/runner/agent-work-order.ts       |  21 +
 packages/core/src/tasks/index.ts                   |  10 +
 packages/core/src/tasks/kernel-semantic.ts         |  64 ++
 packages/core/src/tasks/task-centric/graph.ts      |  80 +-
 packages/core/src/tasks/task-centric/index.ts      |   1 +
 .../src/tasks/task-centric/task-centric.test.ts    |  62 ++
 .../src/tasks/task-kernel/authority-lineage.ts     | 140 ++++
 packages/core/src/tasks/task-kernel/digest.ts      |  20 +
 packages/core/src/tasks/task-kernel/index.ts       |   6 +
 .../core/src/tasks/task-kernel/invariants.test.ts  |  52 ++
 packages/core/src/tasks/task-kernel/invariants.ts  |   6 +
 packages/core/src/tasks/task-kernel/kernel.ts      |  84 ++-
 packages/core/src/tasks/task-kernel/model.ts       |  26 +
 .../spec/schemas/agent-work-order-v2.schema.json   | 108 +++
 schemas/agent-semantic-result.schema.json          | 804 +++++++++++++++++++++
 schemas/agent-work-order-v2.schema.json            | 108 +++
 .../baselines/v0.7-compatibility-candidate.json    |  23 +-
 .../check-compatibility-contract-baseline.mjs      |  11 +-
 .../checks/check-m3-legacy-authority-imports.mjs   |  78 ++
 scripts/qualification/check-m3-self-hosting.mjs    | 137 ++++
 .../check-packaged-mixed-scope-lifecycle.mjs       |  22 +-
 .../qualification/release-qualification.test.mjs   |  48 ++
 scripts/release/smoke-bun-compiled-cli.mjs         |   5 +
 101 files changed, 7484 insertions(+), 599 deletions(-)
```

</details>
