Task: `202607242236-1BFWEY`
Title: Persist bounded supervisor execution episodes
Canonical task record: `.agentplane/tasks/202607242236-1BFWEY/README.md`

## Summary

Persist bounded supervisor execution episodes

Define a durable supervisor episode journal and hard execution budgets for bounded EXECUTOR to EVALUATOR to rework cycles, with deterministic checkpoints, resume without replay, stop reasons, bounded feedback deltas, and limits for episodes, agent runs, tokens, wall time, changed files, diff lines, and no-progress episodes; integrate with the typed supervisor and runner without exposing the legacy ap loop or LoopSpec surface.

## Scope

- In scope: one versioned journal and hard budget contract shared by direct EXECUTOR, context/CURATOR, EVALUATOR, and rework episodes; deterministic checkpoints and stop records; resume without replay; bounded feedback deltas; usage limits for episodes, agent runs, tokens, wall time, changed files, diff lines, and no-progress episodes. - In scope: canonical schema and fixtures, migrator from absent/legacy state, idempotency and rollback/recovery evidence, installed-package smoke, human/JSON status, StateFingerprint, execution-receipt, authority, and effect-in-doubt integration. - Out of scope: importing ap loop, LoopSpec, project-local programmable loop JSON, automatic loop selection, or any second orchestration controller.

## Verification

- State: ok
- Note:

```text
Supervisor episode rework verified locally: persisted EXECUTOR, CURATOR, and EVALUATOR episodes
recover fail-closed; private provider usage is budgeted without public-schema drift.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T03:32:40.568Z
- Branch: task/202607242236-1BFWEY/persist-bounded-supervisor-execution-episodes
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../evaluator-episode.calibration.test.ts          |  22 +-
 .../src/commands/evaluator/evaluator-episode.ts    | 103 +++-
 .../evaluator/evaluator-execute.command.test.ts    | 288 ++++++++++
 .../src/commands/evaluator/evaluator.command.ts    | 381 ++++++++++++-
 .../src/commands/hermes/hermes.command.test.ts     |  42 +-
 .../src/commands/hermes/hermes.command.ts          |  53 +-
 .../shared/supervisor-execution-episode.test.ts    | 405 ++++++++++++++
 .../shared/supervisor-execution-episode.ts         | 362 +++++++++++++
 .../runner/adapters/codex-result-transport.test.ts |  33 ++
 .../src/runner/adapters/codex-result-transport.ts  |  73 ++-
 .../agentplane/src/runner/adapters/codex.test.ts   |  14 +-
 packages/agentplane/src/runner/adapters/codex.ts   |  18 +-
 .../supervisor-execution-episode-migration.ts      |  87 +++
 .../runner/supervisor-execution-episode.test.ts    | 267 +++++++++
 .../src/runner/supervisor-execution-episode.ts     | 594 +++++++++++++++++++++
 packages/core/src/schemas/index.ts                 |  37 ++
 16 files changed, 2712 insertions(+), 67 deletions(-)
```

</details>
