Task: `202607221848-VBV9B1`
Title: Replace route string dispatch with typed WorkflowStep decisions
Canonical task record: `.agentplane/tasks/202607221848-VBV9B1/README.md`

## Summary

Replace route string dispatch with typed WorkflowStep decisions

RF-06b: reduce RouteState to typed CLI operation, agent episode, approval, human input, wait, and terminal steps with idempotency keys and postconditions.

## Scope

- In scope: one pure RouteState-to-WorkflowStep reducer, operation registry identifiers, idempotency/postconditions, compatibility projections for brief/next-action/guidance/bootstrap, and removal of duplicate route classifications including existing-worktree drift.
- Out of scope: supervisor side-effect execution and semantic evaluation.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-25T14:23:57.389Z
- Branch: task/202607221848-VBV9B1/replace-route-string-dispatch-with-typed-workflo
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.route-decision.batch.test.ts  |  19 +-
 ...cli.core.route-decision.direct-closeout.test.ts |  45 +-
 ...li.core.route-decision.pr-open-metadata.test.ts | 127 ++-
 .../run-cli.core.route-decision.pre-merge.test.ts  |  57 ++
 .../run-cli.core.route-decision.quality.test.ts    |   2 +-
 .../src/cli/run-cli.core.route-decision.test.ts    |   9 +-
 .../cli/run-cli.core.task-next-action-json.test.ts |  70 ++
 .../src/cli/run-cli.core.tasks.lifecycle.test.ts   |   5 +
 .../src/commands/hermes/hermes-runtime.ts          | 131 ++-
 .../src/commands/hermes/hermes.command.test.ts     | 133 ++-
 .../src/commands/shared/route-decision-blockers.ts |  40 +-
 .../commands/shared/route-decision-next-action.ts  | 489 +---------
 .../src/commands/shared/route-decision-repair.ts   | 205 +----
 .../src/commands/shared/route-decision-types.ts    |   2 +
 .../src/commands/shared/route-decision.ts          | 108 ++-
 .../src/commands/shared/route-execution-packet.ts  | 310 +------
 .../src/commands/shared/route-guidance.test.ts     | 137 ++-
 .../src/commands/shared/route-guidance.ts          | 154 ++--
 .../src/commands/shared/route-oracle.test.ts       | 354 --------
 .../agentplane/src/commands/shared/route-oracle.ts | 238 +----
 .../src/commands/shared/work-start-command.ts      |  27 -
 .../commands/shared/workflow-operation-effects.ts  |  44 +
 .../commands/shared/workflow-operation-prefix.ts   |  24 +
 .../shared/workflow-operation-projection.ts        | 184 ++++
 .../src/commands/shared/workflow-step-branch.ts    | 557 ++++++++++++
 .../src/commands/shared/workflow-step-factory.ts   | 532 +++++++++++
 .../shared/workflow-step-fingerprint-blueprint.ts  | 219 +++++
 .../shared/workflow-step-fingerprint.test.ts       | 742 +++++++++++++++
 .../commands/shared/workflow-step-fingerprint.ts   | 488 ++++++++++
 .../commands/shared/workflow-step-policy-scope.ts  | 178 ++++
 .../shared/workflow-step-projections.test.ts       | 828 +++++++++++++++++
 .../commands/shared/workflow-step-projections.ts   | 189 ++++
 .../src/commands/shared/workflow-step-reducer.ts   |  95 ++
 .../src/commands/shared/workflow-step.test.ts      | 999 +++++++++++++++++++++
 .../src/commands/shared/workflow-step.ts           | 597 ++++++++++++
 .../agentplane/src/commands/task/brief-model.ts    |   8 +-
 .../agentplane/src/commands/task/brief-render.ts   |  16 +-
 .../src/commands/task/next-action.command.ts       |  16 +-
 packages/agentplane/src/commands/task/start.ts     |   5 +
 .../runner/state-fingerprint-backend-projection.ts |  51 +-
 .../src/runner/state-fingerprint-knowledge.ts      |  81 ++
 .../src/runner/state-fingerprint-observation.ts    |  66 +-
 .../src/runner/usecases/task-run-blueprint.test.ts |  17 +
 .../src/runner/usecases/task-run-bootstrap.ts      |   5 +
 scripts/baselines/knip-baseline.json               |   5 -
 scripts/baselines/trust-boundary-violations.json   |  18 -
 scripts/checks/check-lifecycle-invariants.mjs      |  20 +-
 47 files changed, 6685 insertions(+), 1961 deletions(-)
```

</details>
