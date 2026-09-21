Task: `202609210324-CC13V3`
Title: Implement AgentPlane 0.7.11 roadmap WorkItems LC-04 through LC-24 sequentially and prepare the release candidate
Canonical task record: `.agentplane/tasks/202609210324-CC13V3/README.md`

## Summary

Implement AgentPlane 0.7.11 roadmap WorkItems LC-04 through LC-24 sequentially and prepare the release candidate

Use agentplane-roadmap-r2/tasks/LC-04.md through LC-24.md as the authoritative card set. Model each card as a separate ordered Kernel WorkItem with its stated dependencies, bounded code surface, acceptance criteria, negative case, and focused verification. Preserve Task Kernel as sole domain reducer and one application coordinator; perform maximum proven deletion only after replacement proof. Keep LC-22 measurement local/replay-only with no paid provider calls. Produce separately reviewable commits and evidence for every card, then run full local and installed-package release qualification.

## Scope

- In scope: Use agentplane-roadmap-r2/tasks/LC-04.md through LC-24.md as the authoritative card set. Model each card as a separate ordered Kernel WorkItem with its stated dependencies, bounded code surface, acceptance criteria, negative case, and focused verification. Preserve Task Kernel as sole domain reducer and one application coordinator; perform maximum proven deletion only after replacement proof. Keep LC-22 measurement local/replay-only with no paid provider calls. Produce separately reviewable commits and evidence for every card, then run full local and installed-package release qualification.
- Out of scope: unrelated refactors not required for "Implement AgentPlane 0.7.11 roadmap WorkItems LC-04 through LC-24 sequentially and prepare the release candidate".

## Verification

- State: ok
- Note: Canonical validation sha256:8c203d031e6958259117341b5b47b0a9d0b775edb1791a11e849c05c249db3aa
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-21T03:47:54.341Z
- Branch: task/202609210324-CC13V3/canonical-cc13v3
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../adapters/task-backend/kernel-next-action.ts    |  55 ++-
 .../commands/shared/semantic-result-admission.ts   |  49 ++
 .../src/commands/shared/workflow-step-branch.ts    |  13 +-
 .../src/commands/shared/workflow-step-factory.ts   |  85 +++-
 .../src/commands/task/advance-task-step.ts         |   9 +-
 .../src/commands/task/direct-task-finalization.ts  |  38 ++
 .../task/direct-task-supervisor-closeout.test.ts   |  33 +-
 .../task/direct-task-supervisor-closeout.ts        |  79 +--
 .../task/direct-task-supervisor-operation.test.ts  |  13 +
 .../task/direct-task-supervisor-operation.ts       | 122 ++++-
 .../commands/task/direct-task-supervisor.test.ts   |  26 +-
 .../src/commands/task/direct-task-supervisor.ts    | 113 +----
 .../src/commands/task/direct-task-verification.ts  |  35 ++
 .../src/commands/task/external-agent-exchange.ts   |  13 +-
 .../src/commands/task/kernel-exchange.ts           | 108 +++--
 .../src/commands/task/kernel-inspection.ts         | 527 +++++++++++++++++----
 .../agentplane/src/commands/task/kernel-run.ts     |  12 +-
 .../src/commands/task/kernel-semantic-result.ts    |   4 +-
 .../src/commands/task/kernel-work-order.ts         |   5 +-
 .../src/commands/task/ordinary-advance-step.ts     |  20 +-
 .../src/commands/task/quality-review-gate.ts       |  11 +-
 .../task/roadmap-check-review-separation.test.ts   |  93 ++++
 .../task/roadmap-common-review-application.test.ts | 155 ++++++
 .../commands/task/roadmap-curator-parity.test.ts   | 207 ++++++++
 .../task/roadmap-direct-coordinator-parity.test.ts | 194 ++++++++
 .../task/roadmap-semantic-admission.test.ts        | 129 +++++
 .../task/roadmap-workitem-readiness.test.ts        | 150 ++++++
 .../src/runner/usecases/agent-work-order-build.ts  |  12 +-
 .../src/runner/usecases/semantic-role.ts           |  10 +
 .../runner/usecases/task-knowledge-request.test.ts |  50 +-
 .../src/runner/usecases/task-knowledge-request.ts  |  62 ++-
 .../runner/usecases/task-run-semantic-prompt.ts    |  10 +-
 .../core/src/runner/agent-semantic-result.test.ts  |   1 +
 packages/core/src/runner/agent-semantic-result.ts  |   7 +-
 packages/core/src/runner/agent-work-order.test.ts  |   9 +
 packages/core/src/runner/agent-work-order.ts       |   5 +-
 packages/core/src/tasks/kernel-semantic.ts         |   2 +-
 packages/core/src/tasks/task-centric/graph.ts      | 117 +++--
 packages/core/src/tasks/task-centric/index.ts      |   5 +
 packages/core/src/tasks/task-centric/lifecycle.ts  |  62 +++
 schemas/agent-semantic-result.schema.json          |   6 +-
 41 files changed, 2185 insertions(+), 471 deletions(-)
```

</details>
