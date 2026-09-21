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
 .../adapters/task-backend/kernel-next-action.ts    |  55 ++++++--
 .../commands/shared/semantic-result-admission.ts   |  49 +++++++
 .../src/commands/shared/workflow-step-branch.ts    |  13 +-
 .../src/commands/shared/workflow-step-factory.ts   |  85 +++++++++++-
 .../src/commands/task/external-agent-exchange.ts   |  13 +-
 .../src/commands/task/kernel-exchange.ts           |  36 ++---
 .../agentplane/src/commands/task/kernel-run.ts     |  12 +-
 .../src/commands/task/kernel-semantic-result.ts    |   4 +-
 .../task/roadmap-semantic-admission.test.ts        | 129 ++++++++++++++++++
 .../task/roadmap-workitem-readiness.test.ts        | 150 +++++++++++++++++++++
 packages/core/src/tasks/task-centric/graph.ts      | 117 +++++++++++-----
 packages/core/src/tasks/task-centric/index.ts      |   3 +
 packages/core/src/tasks/task-centric/lifecycle.ts  |   4 +
 13 files changed, 590 insertions(+), 80 deletions(-)
```

</details>
