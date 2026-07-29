# PR Review

Created: 2026-07-29T14:50:37.577Z

## Task

- Task: `202607291449-FTHNAR`
- Title: Permit evidence refresh after evaluator review gaps
- Status: DOING
- Branch: `task/202607291449-FTHNAR/permit-evidence-refresh-after-evaluator-review-g`
- Canonical task record: `.agentplane/tasks/202607291449-FTHNAR/README.md`

## Verification

- State: ok
- Note: Verified e9ef623: four declared checks passed with frozen command-level results.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-29T14:51:25.267Z
- Branch: task/202607291449-FTHNAR/permit-evidence-refresh-after-evaluator-review-g
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/backends/task-backend/shared/normalize.ts  |   5 +
 .../evaluator-episode.calibration.test.ts          | 161 +++++++++++++++++++++
 .../src/commands/evaluator/evaluator-episode.ts    |   2 +
 .../evaluator/evaluator-quality-artifacts.ts       |   1 +
 .../commands/evaluator/evaluator-review-apply.ts   |   3 +
 .../commands/evaluator/evaluator-review-usecase.ts |   2 +
 .../src/commands/shared/workflow-step-branch.ts    |  22 +++
 .../src/commands/shared/workflow-step-factory.ts   |  26 ++++
 .../src/commands/shared/workflow-step.test.ts      | 104 +++++++++++++
 .../src/runtime/sgr/contract-evaluator-routing.ts  |  10 ++
 .../agentplane/src/runtime/sgr/contract-types.ts   |   1 +
 .../agentplane/src/runtime/sgr/contracts.test.ts   |  29 ++++
 packages/core/src/index.ts                         |   1 +
 packages/core/src/tasks/index.ts                   |   1 +
 packages/core/src/tasks/task-store.ts              |   2 +
 15 files changed, 370 insertions(+)
```

</details>
<!-- END AUTO SUMMARY -->
