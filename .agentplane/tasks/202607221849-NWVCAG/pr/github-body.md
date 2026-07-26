Task: `202607221849-NWVCAG`
Title: Bind side effects to explicit authority records
Canonical task record: `.agentplane/tasks/202607221849-NWVCAG/README.md`

## Summary

Bind side effects to explicit authority records

RF-13: classify local, external reversible, external high-risk, and semantic operations; require typed authority/approval records and audit actor, policy rule, digest, and scope.

## Scope

- In scope: operation classification, authority schema/digest, approval-step production, policy evaluation and audit for network, PR sync/open, queue, merge, publish/deploy, danger sandbox, task close/finalize, and semantic values.
- Out of scope: granting authority implicitly or replacing user/agent semantic content with CLI defaults.

## Verification

- State: ok
- Note:

```text
Implementation rework verified: route authority now forces the runner read-only when the canonical
work order has no writable roots.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-26T10:59:30.476Z
- Branch: task/202607221849-NWVCAG/bind-side-effects-to-explicit-authority-records
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...-cli.critical.agent-efficiency-baseline.test.ts |   7 +-
 .../src/cli/run-cli/command-catalog/task.ts        |   7 +
 .../src/cli/run-cli/command-loaders/task.ts        |   4 +
 .../shared/route-decision-next-action.test.ts      |   2 +-
 .../src/commands/shared/route-decision.ts          |  71 +++-
 .../commands/shared/side-effect-authority.test.ts  | 221 +++++++++++
 .../src/commands/shared/side-effect-authority.ts   | 415 +++++++++++++++++++++
 .../workflow-operation-projection.registry.test.ts |  43 ++-
 .../src/commands/shared/workflow-step-factory.ts   |  97 ++++-
 .../shared/workflow-step-fingerprint.test.ts       |  29 +-
 .../commands/shared/workflow-step-fingerprint.ts   |  50 ++-
 ...rkflow-step-projections.conflict-rework.test.ts |  54 ++-
 .../shared/workflow-step-projections.test.ts       | 200 +++++++++-
 .../src/commands/shared/workflow-step.test.ts      |  93 ++++-
 .../src/commands/shared/workflow-step.ts           |  27 +-
 .../src/commands/task/authority-grant.command.ts   | 199 ++++++++++
 .../agentplane/src/runner/sandbox-policy.test.ts   |  14 +
 packages/agentplane/src/runner/sandbox-policy.ts   |  13 +-
 .../src/runner/state-fingerprint-observation.ts    |   5 +
 packages/agentplane/src/runner/types/policy.ts     |   2 +-
 .../usecases/agent-work-order.integration.test.ts  |  16 +
 .../agentplane/src/runner/usecases/task-run.ts     |   1 +
 packages/core/src/runner/execution-receipt.ts      |   2 +-
 .../baselines/v0.7-compatibility-candidate.json    | 149 +++++++-
 .../check-compatibility-contract-baseline.mjs      | 106 ++++++
 25 files changed, 1725 insertions(+), 102 deletions(-)
```

</details>
