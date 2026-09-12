Task: `202609121424-T83XJA`
Title: Implement durable 0.7.9 usage, cost, and latency accounting for ST-08 through ST-13 and ST-17
Canonical task record: `.agentplane/tasks/202609121424-T83XJA/README.md`

## Summary

Implement durable 0.7.9 usage, cost, and latency accounting for ST-08 through ST-13 and ST-17

Source contract: agentplane-roadmap-r2 cards ST-08, ST-09, ST-10, ST-11, ST-12, ST-13, and ST-17. Capture Codex usage durably before semantic-result validation, preserve evaluator charges on failure, connect managed observations to the existing journal, account for external episodes without trusting self-reported tokens, roll up task cost from source observations, partition lifecycle latency without double counting, and separate missing telemetry from semantic quality and further-spend admission. Missing usage is unknown, never zero. A valid saved verdict is reused, while unknown budget blocks additional paid dispatch. Preserve I01-I12 and C01-C08. Do not create a second accounting store or trust model-supplied usage. The roadmap directory is source-only and must never be committed. Required checks: the focused ST-08 through ST-13 and ST-17 test commands, related runner/evaluator/task critical suites, typecheck, schema/mirror checks.

## Scope

- In scope: Source contract: agentplane-roadmap-r2 cards ST-08, ST-09, ST-10, ST-11, ST-12, ST-13, and ST-17. Capture Codex usage durably before semantic-result validation, preserve evaluator charges on failure, connect managed observations to the existing journal, account for external episodes without trusting self-reported tokens, roll up task cost from source observations, partition lifecycle latency without double counting, and separate missing telemetry from semantic quality and further-spend admission. Missing usage is unknown, never zero. A valid saved verdict is reused, while unknown budget blocks additional paid dispatch. Preserve I01-I12 and C01-C08. Do not create a second accounting store or trust model-supplied usage. The roadmap directory is source-only and must never be committed. Required checks: the focused ST-08 through ST-13 and ST-17 test commands, related runner/evaluator/task critical suites, typecheck, schema/mirror checks.
- Out of scope: unrelated refactors not required for "Implement durable 0.7.9 usage, cost, and latency accounting for ST-08 through ST-13 and ST-17".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-12T20:52:29.086Z
- Branch: task/202609121424-T83XJA/implement-durable-0-7-9-usage-cost-and-latency-a
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/evaluator/evaluator-episode.ts    | 236 +++++++++++++--
 .../evaluator/evaluator-execute-supervisor.ts      |  66 ++--
 .../evaluator/evaluator-execute.command.test.ts    |  70 ++++-
 .../evaluator/roadmap-failed-usage.test.ts         | 175 +++++++++++
 .../roadmap-telemetry-disposition.test.ts          |  79 +++++
 .../src/commands/shared/lifecycle-stage-timing.ts  | 130 ++++++++
 .../shared/roadmap-managed-accounting.test.ts      | 151 ++++++++++
 .../shared/supervisor-execution-budget-renewal.ts  |  49 +++
 .../shared/supervisor-execution-episode.test.ts    |  79 +++++
 .../shared/supervisor-execution-episode.ts         |  75 ++++-
 .../src/commands/task/advance.command.ts           |   4 +-
 .../task/branch-task-supervisor-episodes.ts        |  39 ++-
 .../commands/task/branch-task-supervisor-usage.ts  |  39 ++-
 .../direct-task-supervisor-formal-operation.ts     |  34 +++
 .../src/commands/task/external-agent-exchange.ts   | 105 +++++++
 .../src/commands/task/external-agent-supervisor.ts |  13 +
 .../agentplane/src/commands/task/kernel-run.ts     | 332 ++++++++++++++++-----
 .../task/roadmap-external-accounting.test.ts       | 116 +++++++
 .../src/commands/task/roadmap-stage-timing.test.ts | 128 ++++++++
 .../src/commands/task/task-token-usage.ts          |  11 +-
 .../src/runner/adapters/codex-result-transport.ts  |  42 ++-
 packages/agentplane/src/runner/adapters/codex.ts   |  81 ++++-
 .../adapters/roadmap-usage-durability.test.ts      | 159 ++++++++++
 packages/agentplane/src/runner/artifacts.ts        |  29 ++
 .../runner/supervisor-execution-episode.test.ts    |   6 +-
 .../src/runner/supervisor-execution-episode.ts     | 138 ++++++++-
 scripts/bench/task-cost-rollup.test.mjs            | 192 ++++++++++++
 .../lib/agent-efficiency-repository-snapshot.mjs   | 167 +++++++++++
 scripts/lib/test-route-registry.mjs                |   1 +
 29 files changed, 2576 insertions(+), 170 deletions(-)
```

</details>
