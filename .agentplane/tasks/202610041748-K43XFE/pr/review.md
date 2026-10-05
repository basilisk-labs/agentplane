# PR Review

Created: 2026-10-04T18:13:17.876Z

## Task

- Task: `202610041748-K43XFE`
- Title: Implement and qualify AgentPlane 0.7.13 Scenario V2 recipes for production release
- Status: DOING
- Branch: `task/202610041748-K43XFE/implement-and-qualify-agentplane-0-7-13-scenario`
- Canonical task record: `.agentplane/tasks/202610041748-K43XFE/README.md`

## Verification

- State: ok
- Note: Canonical validation sha256:618a4278260b812e37b7e3e84d7fafa13d6f8ae46e23f504dfc317c1a50db9b9
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-04T18:13:17.876Z
- Branch: task/202610041748-K43XFE/implement-and-qualify-agentplane-0-7-13-scenario
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 bun.lock                                           |   4 +
 .../evaluator/evaluator-evidence-boundary.ts       |  23 +-
 .../commands/evaluator/evaluator-evidence-store.ts |  69 +++
 .../src/commands/task/create-plan-input.ts         |  10 +
 .../src/runner/context/recipe-applicability.ts     | 371 ++++++++++++++
 .../src/runner/context/recipe-closure.ts           | 416 +++++++++++++++
 .../src/runner/context/recipe-context.ts           |  23 +
 .../src/runner/context/recipe-plan-binding.ts      | 179 +++++++
 .../src/runner/context/recipe-plan-validation.ts   | 112 ++++
 .../src/runner/context/recipe-retention.ts         | 222 ++++++++
 .../context/roadmap-recipe-applicability.test.ts   | 406 +++++++++++++++
 .../runner/context/roadmap-recipe-closure.test.ts  | 565 +++++++++++++++++++++
 .../context/roadmap-recipe-plan-binding.test.ts    | 530 +++++++++++++++++++
 .../context/roadmap-recipe-plan-validation.test.ts | 352 +++++++++++++
 .../context/roadmap-recipe-retention.test.ts       | 396 +++++++++++++++
 .../agentplane/src/shared/contained-stable-file.ts |  62 ++-
 packages/core/src/runner/agent-semantic-result.ts  |   5 +-
 packages/core/src/tasks/index.ts                   |   3 +
 packages/core/src/tasks/task-centric/digest.ts     |  24 +-
 packages/core/src/tasks/task-centric/graph.ts      |  45 +-
 packages/core/src/tasks/task-centric/model.ts      |   3 +
 packages/core/src/tasks/task-centric/schema.ts     |  42 +-
 .../src/tasks/task-centric/task-centric.test.ts    |  64 +++
 packages/recipes/package.json                      |   4 +
 packages/recipes/src/compiled-contracts.ts         |  75 +++
 packages/recipes/src/index.ts                      |   3 +
 packages/recipes/src/internal-utils.ts             |  14 +
 packages/recipes/src/manifest-contracts.ts         |   2 +
 packages/recipes/src/manifest.ts                   |   4 +
 packages/recipes/src/resolver-contracts.ts         |   2 +-
 .../recipes/src/roadmap-recipe-parameters.test.ts  | 334 ++++++++++++
 .../recipes/src/roadmap-scenario-v2-parser.test.ts | 153 ++++++
 packages/recipes/src/scenario-contracts.ts         |   2 +
 packages/recipes/src/scenario-parameters.ts        | 108 ++++
 packages/recipes/src/scenario-v2.ts                |  70 +++
 packages/recipes/src/scenario.ts                   |  15 +
 packages/recipes/tsconfig.json                     |   7 +-
 schemas/agent-semantic-result.schema.json          | 414 +++++++++++++++
 38 files changed, 5118 insertions(+), 15 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
