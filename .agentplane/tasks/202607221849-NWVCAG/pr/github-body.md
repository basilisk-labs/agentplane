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
Verified RF-13 authority policy: scoped records gate external and high-risk workflow operations;
stale/tampered records fail closed; local reversible operations remain available. Passed focused
authority/workflow tests, test:fast, test:critical, typecheck, format:changed, lint:core,
compatibility ratchet, guards, and lifecycle invariants.
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
 .../commands/shared/side-effect-authority.test.ts  | 190 ++++++++++
 .../src/commands/shared/side-effect-authority.ts   | 413 +++++++++++++++++++++
 .../workflow-operation-projection.registry.test.ts |  43 ++-
 .../src/commands/shared/workflow-step-factory.ts   |  96 ++++-
 .../shared/workflow-step-fingerprint.test.ts       |   4 +-
 .../commands/shared/workflow-step-fingerprint.ts   |  17 +-
 ...rkflow-step-projections.conflict-rework.test.ts |  52 ++-
 .../shared/workflow-step-projections.test.ts       | 129 ++++++-
 .../src/commands/shared/workflow-step.test.ts      |  93 ++++-
 .../src/commands/shared/workflow-step.ts           |  25 +-
 .../src/commands/task/authority-grant.command.ts   | 199 ++++++++++
 .../baselines/v0.7-compatibility-candidate.json    | 149 +++++++-
 .../check-compatibility-contract-baseline.mjs      | 106 ++++++
 17 files changed, 1467 insertions(+), 69 deletions(-)
```

</details>
