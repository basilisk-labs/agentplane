Task: `202608022324-9VCYWG`
Title: Complete the task advance semantic-result round trip
Canonical task record: `.agentplane/tasks/202608022324-9VCYWG/README.md`

## Summary

Complete the task advance semantic-result round trip

Extend the compact external-agent protocol so task advance accepts a typed SemanticResult bound to the issued transition and state fingerprint, validates and persists it through the same supervisor engine used by task run, executes subsequent deterministic transitions, and returns the next bounded packet without exposing lifecycle choreography. Keep each packet at or below 2 KiB and preserve fail-closed replay and authority semantics.

## Scope

- In scope: Extend the compact external-agent protocol so task advance accepts a typed SemanticResult bound to the issued transition and state fingerprint, validates and persists it through the same supervisor engine used by task run, executes subsequent deterministic transitions, and returns the next bounded packet without exposing lifecycle choreography. Keep each packet at or below 2 KiB and preserve fail-closed replay and authority semantics.
- Out of scope: unrelated refactors not required for "Complete the task advance semantic-result round trip".

## Verification

- State: ok
- Note: Verified implementation rework for the completed-journal crash window.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-02T23:29:07.378Z
- Branch: task/202608022324-9VCYWG/complete-the-task-advance-semantic-result-round
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-advance.test.ts      | 521 ++++++++++++++++++-
 ...-cli.critical.agent-efficiency-baseline.test.ts |  11 +-
 .../commands/shared/route-decision-types.test.ts   |  18 +
 .../src/commands/shared/route-decision-types.ts    |  10 +-
 .../src/commands/shared/workflow-step-factory.ts   |  28 +-
 .../src/commands/task/advance.command.ts           | 126 ++++-
 .../agentplane/src/commands/task/advance.spec.ts   |  13 +
 .../src/commands/task/agent-action-packet.ts       |  11 +
 .../task/branch-task-supervisor-episodes.ts        |   6 +-
 .../task/direct-task-supervisor-closeout.ts        |  11 +-
 .../src/commands/task/external-agent-evaluator.ts  | 109 ++++
 .../task/external-agent-exchange-authority.ts      | 165 ++++++
 .../src/commands/task/external-agent-exchange.ts   | 321 ++++++++++++
 .../external-agent-implementation-authority.ts     | 278 ++++++++++
 .../commands/task/external-agent-result-routing.ts |  43 ++
 .../src/commands/task/external-agent-supervisor.ts | 569 +++++++++++++++++++++
 .../commands/task/external-agent-verification.ts   |  58 +++
 packages/core/src/index.ts                         |   2 +
 packages/core/src/runner/agent-semantic-result.ts  |  18 +
 packages/core/src/runner/agent-work-order.test.ts  |  41 ++
 packages/core/src/runner/agent-work-order.ts       |  19 +
 .../src/runner/supervisor-execution-episode.ts     |   7 +-
 packages/core/src/schemas/index.ts                 |   2 +
 schemas/agent-semantic-result.schema.json          |  99 ++++
 .../baselines/v0.7-compatibility-candidate.json    |  33 +-
 .../check-compatibility-contract-baseline.mjs      |  17 +-
 26 files changed, 2510 insertions(+), 26 deletions(-)
```

</details>
