Task: `202607240736-FCBKJQ`
Title: Align integration quality review targets for metadata-only tasks
Canonical task record: `.agentplane/tasks/202607240736-FCBKJQ/README.md`

## Summary

Align integration quality review targets for metadata-only tasks

Reuse the evaluator metadata-only review target contract in integration preparation so the route oracle and integration queue agree, while preserving rejection after semantic or new independently reviewable task-local changes.

## Scope

- In scope: one shared quality-review target resolver for evaluator and integration preparation; configured workflow artifact paths; metadata-only reviewed work units followed by managed README/quality/pr/blueprint artifacts; route/integration agreement; focused regression coverage.
- Safety invariant: semantic code changes or a new independently reviewable task-local work unit after the recorded review must require a new EVALUATOR review.
- Out of scope: weakening the quality gate, manual merge bypasses, unrelated evaluator/integration refactors, alpha.1 benchmark reruns, provider calls.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-24T07:37:41.475Z
- Branch: task/202607240736-FCBKJQ/align-integration-quality-review-targets-for-met
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/evaluator/evaluator.command.ts    |  79 +---------
 .../commands/pr/integrate/internal/prepare.test.ts |  72 +++++++---
 .../src/commands/pr/integrate/internal/prepare.ts  |  47 ++----
 .../commands/shared/quality-review-target.test.ts  | 134 +++++++++++++++++
 .../src/commands/shared/quality-review-target.ts   | 102 +++++++++++++
 .../route-decision-blockers.quality-review.test.ts | 160 +++++++++++++++++++++
 .../src/commands/shared/route-decision-blockers.ts |  39 ++++-
 .../shared/route-decision-next-action.test.ts      |  36 +++++
 .../commands/shared/route-decision-next-action.ts  |  14 ++
 9 files changed, 545 insertions(+), 138 deletions(-)
```

</details>
