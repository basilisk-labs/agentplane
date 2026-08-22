Task: `202608212244-6XZAYD`
Title: Implement the task-centric refactoring roadmap v2 and publish the next patch release
Canonical task record: `.agentplane/tasks/202608212244-6XZAYD/README.md`

## Summary

Implement the task-centric refactoring roadmap v2 and publish the next patch release

Implement the complete roadmap from /Users/densmirnov/Downloads/agentplane-task-centric-refactoring-roadmap-v2.md: RF2-001 through RF2-058, including the exact release acceptance scenario. Preserve the roadmap acceptance criteria, use one traceable AgentPlane Task, and publish the next patch release only after release qualification and exact-SHA hosted verification. The user's /goal request explicitly approves implementation, merge, publish, and required network/provider actions within this scope.

## Scope

- In scope: Implement the complete roadmap from /Users/densmirnov/Downloads/agentplane-task-centric-refactoring-roadmap-v2.md: RF2-001 through RF2-058, including the exact release acceptance scenario. Preserve the roadmap acceptance criteria, use one traceable AgentPlane Task, and publish the next patch release only after release qualification and exact-SHA hosted verification. The user's /goal request explicitly approves implementation, merge, publish, and required network/provider actions within this scope.
- Out of scope: unrelated refactors not required for "Implement the task-centric refactoring roadmap v2 and publish the next patch release".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-22T01:44:31.114Z
- Branch: task/202608212244-6XZAYD/implement-the-task-centric-refactoring-roadmap-v
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/incidents.md                    |    1 +
 depcruise.config.cjs                               |   25 +
 packages/agentplane/assets/policy/incidents.md     |    1 +
 .../task-centric-backend-adapter.test.ts           |  505 ++++++
 .../task-backend/task-centric-backend-adapter.ts   |  549 +++++++
 .../task-backend/task-centric-backend-runtime.ts   |  163 ++
 .../src/cli/run-cli.core.task-run.test.ts          |   12 +-
 ...-cli.critical.agent-efficiency-baseline.test.ts |    6 +-
 .../src/cli/run-cli.critical.task-centric.test.ts  |  393 +++++
 .../evaluator-episode.calibration.test.ts          |    8 +-
 .../hermes/hermes-lifecycle.command.test.ts        |   93 ++
 .../hermes-reconcile-duplicates.command.test.ts    |   57 +
 .../src/commands/hermes/hermes-runtime.ts          |   20 +-
 .../src/commands/hermes/hermes.command.test.ts     |  293 ++--
 .../src/commands/shared/workflow-step-reducer.ts   |    6 +-
 .../src/commands/shared/workflow-step.test.ts      |  181 +--
 .../src/commands/shared/workflow-step.testkit.ts   |  142 ++
 .../src/commands/task/advance.command.ts           |    6 +-
 .../src/commands/task/agent-action-packet.test.ts  |   12 +
 .../src/commands/task/agent-action-packet.ts       |   29 +-
 .../external-agent-implementation-authority.ts     |   46 +-
 .../task/external-agent-planning-authority.ts      |  128 +-
 .../task/external-agent-result-application.ts      |    1 +
 .../src/commands/task/external-agent-supervisor.ts |    1 +
 .../commands/task/finish-closeout-journal.test.ts  |   60 +
 .../src/commands/task/finish-closeout-journal.ts   |   17 +-
 .../agentplane/src/commands/task/finish-shared.ts  |   45 +-
 .../commands/task/finish.close-tail.unit.test.ts   |   10 +-
 .../src/commands/task/finish.state.unit.test.ts    |    6 +-
 .../commands/task/finish.validation.unit.test.ts   |    8 +-
 .../agentplane/src/commands/task/new-duplicates.ts |    7 +-
 .../src/commands/task/plan-approve.command.ts      |    8 +-
 packages/agentplane/src/commands/task/plan.ts      |   89 +-
 .../agentplane/src/commands/task/plan.unit.test.ts |   73 +
 packages/agentplane/src/commands/task/ready.ts     |   10 +-
 .../agentplane/src/commands/task/run.command.ts    |   63 +-
 .../src/commands/task/shared/dependencies.ts       |    6 +-
 .../task/supervision-outcome-disposition.test.ts   |   94 ++
 .../task/supervision-outcome-disposition.ts        |  130 ++
 .../task/task-centric-external-result.test.ts      |  378 +++++
 .../commands/task/task-centric-external-result.ts  |  218 +++
 .../src/commands/task/verify-record-execute.ts     |   24 +-
 .../task/verify-record.durability.unit.test.ts     |    4 +-
 .../src/commands/task/verify-record.testkit.ts     |   18 +
 .../src/commands/task/verify-record.unit.test.ts   |   62 +-
 packages/agentplane/src/commands/workflow.test.ts  |    1 +
 .../src/commands/workflow.verify-hooks.test.ts     |   11 +-
 .../src/runner/context/task-context.test.ts        |   16 +-
 .../src/runner/usecases/agent-work-order-build.ts  |  120 +-
 .../usecases/agent-work-order.integration.test.ts  |   47 +-
 .../usecases/scenario-materialize-task.test.ts     |   21 +-
 .../task-knowledge-request-lifecycle.test.ts       |   63 +-
 .../usecases/task-knowledge-retrieval-query.ts     |    7 +-
 .../usecases/task-knowledge-retrieval.test.ts      |   56 +
 .../runner/usecases/task-knowledge-retrieval.ts    |  157 +-
 .../task-run-active-claim-readonly.test.ts         |    4 +-
 .../runner/usecases/task-run-active-claim.test.ts  |   38 +-
 .../usecases/task-run-active-claim.testkit.ts      |    2 +-
 .../usecases/task-run-context.integration.test.ts  |   64 +-
 ...sk-run-lifecycle-cancel-effect-in-doubt.test.ts |   18 +-
 .../usecases/task-run-lifecycle-cancel.test.ts     |   28 +-
 .../task-run-lifecycle-replay-provenance.test.ts   |    6 +-
 .../task-run-lifecycle-replay-security.test.ts     |   88 +-
 .../src/runner/usecases/task-run-lifecycle.test.ts |  151 +-
 .../runner/usecases/task-run-lifecycle.testkit.ts  |  148 ++
 ...task-run-process-identity-serialization.test.ts |    4 +-
 .../src/runner/usecases/task-run-recipe-context.ts |   27 +
 ...task-run-recipe-write-scope.integration.test.ts |   56 +-
 .../agentplane/src/runner/usecases/task-run.ts     |   17 +-
 .../architecture-guard.test.ts                     |   19 +
 .../runtime/task-execution-context/resolve.test.ts |   18 +
 .../src/runtime/task-execution-context/resolve.ts  |   55 +-
 .../src/runtime/workspace-allocation/allocate.ts   |   20 +
 .../core/schemas/agent-work-order-v2.schema.json   |  213 +++
 packages/core/src/index.ts                         |    5 +
 packages/core/src/runner/agent-semantic-result.ts  |   18 +
 packages/core/src/runner/agent-work-order.ts       |   37 +
 packages/core/src/schemas/index.ts                 |    1 +
 packages/core/src/tasks/index.ts                   |    6 +
 .../core/src/tasks/task-centric/compatibility.ts   |  278 ++++
 packages/core/src/tasks/task-centric/digest.ts     |   28 +
 packages/core/src/tasks/task-centric/graph.ts      |  420 +++++
 packages/core/src/tasks/task-centric/index.ts      |   85 +
 packages/core/src/tasks/task-centric/lifecycle.ts  |  358 +++++
 packages/core/src/tasks/task-centric/model.ts      |  458 ++++++
 .../src/tasks/task-centric/orchestrator.test.ts    |  540 +++++++
 .../core/src/tasks/task-centric/orchestrator.ts    |  474 ++++++
 packages/core/src/tasks/task-centric/policy.ts     |  254 +++
 packages/core/src/tasks/task-centric/ports.ts      |  219 +++
 packages/core/src/tasks/task-centric/schema.ts     |  153 ++
 .../src/tasks/task-centric/task-centric.test.ts    |  572 +++++++
 packages/core/src/tasks/task-status.test.ts        |   16 +
 packages/core/src/tasks/task-status.ts             |   40 +
 .../spec/schemas/agent-work-order-v2.schema.json   |  213 +++
 packages/testkit/src/cli-harness.ts                |    9 +
 schemas/agent-semantic-result.schema.json          | 1695 ++++++++++++++++++++
 schemas/agent-work-order-v2.schema.json            |  213 +++
 .../baselines/v0.7-compatibility-candidate.json    |   25 +-
 .../check-compatibility-contract-baseline.mjs      |   15 +-
 .../check-packaged-mixed-scope-lifecycle.mjs       |  109 +-
 100 files changed, 10965 insertions(+), 759 deletions(-)
```

</details>
