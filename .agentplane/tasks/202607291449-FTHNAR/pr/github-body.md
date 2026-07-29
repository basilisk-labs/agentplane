Task: `202607291449-FTHNAR`
Title: Permit evidence refresh after evaluator review gaps
Canonical task record: `.agentplane/tasks/202607291449-FTHNAR/README.md`

## Summary

Permit evidence refresh after evaluator review gaps

Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication.

## Scope

- In scope: Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication.
- Out of scope: unrelated refactors not required for "Permit evidence refresh after evaluator review gaps".

## Verification

- State: ok
- Note:

```text
Verified d96688db: fresh deterministic evidence covers all declared checks plus the independent
blocked-quality-review regression.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-29T14:51:25.267Z
- Branch: task/202607291449-FTHNAR/permit-evidence-refresh-after-evaluator-review-g
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/backends/task-backend/shared/normalize.ts  |   5 +
 ...-cli.critical.agent-efficiency-baseline.test.ts |  18 ++-
 .../evaluator-episode.calibration.test.ts          | 162 +++++++++++++++++++++
 .../src/commands/evaluator/evaluator-episode.ts    |   2 +
 .../evaluator/evaluator-quality-artifacts.ts       |   1 +
 .../commands/evaluator/evaluator-review-apply.ts   |   3 +
 .../commands/evaluator/evaluator-review-usecase.ts |   2 +
 .../src/commands/shared/route-decision.ts          |  15 ++
 .../src/commands/shared/workflow-step-branch.ts    |  21 +++
 .../src/commands/shared/workflow-step-factory.ts   |  26 ++++
 .../src/commands/shared/workflow-step.test.ts      | 143 ++++++++++++++++++
 .../src/commands/shared/workflow-step.ts           |   5 +
 .../src/runtime/sgr/contract-evaluator-routing.ts  |  10 ++
 .../agentplane/src/runtime/sgr/contract-types.ts   |   1 +
 .../agentplane/src/runtime/sgr/contracts.test.ts   |  27 ++++
 packages/core/src/index.ts                         |   1 +
 packages/core/src/tasks/index.ts                   |   1 +
 packages/core/src/tasks/task-store.ts              |   2 +
 .../baselines/v0.7-compatibility-candidate.json    |  19 +--
 .../check-compatibility-contract-baseline.mjs      |  10 +-
 20 files changed, 455 insertions(+), 19 deletions(-)
```

</details>
