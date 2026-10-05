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
 bun.lock                                           |    4 +
 .../src/cli/run-cli/command-catalog/project.ts     |    5 +
 .../src/cli/run-cli/command-loaders/project.ts     |    3 +
 .../evaluator/evaluator-evidence-boundary.ts       |   23 +-
 .../commands/evaluator/evaluator-evidence-store.ts |   69 +
 .../commands/recipes/impl/explicit-selection.ts    |  157 ++
 .../src/commands/recipes/impl/project-registry.ts  |   28 +-
 .../src/commands/recipes/impl/resolver.ts          |    2 +-
 .../src/commands/recipes/impl/v1-conversion.ts     |  351 ++++
 .../src/commands/recipes/preview-v1.command.ts     |   21 +
 .../recipes/roadmap-explicit-selection.test.ts     |  342 ++++
 .../recipes/roadmap-v1-v2-conversion.test.ts       |  426 ++++
 .../src/commands/task/create-plan-input.ts         |   65 +-
 .../src/commands/task/kernel-inspection.ts         |   27 +-
 .../task/kernel-plan-supplied-approval.test.ts     |   68 +
 .../agentplane/src/commands/task/kernel-plan.ts    |   60 +-
 .../src/commands/task/kernel-planning-view.ts      |   10 +-
 .../src/commands/task/kernel-recipe-admission.ts   |  106 +
 .../src/commands/task/kernel-runtime-context.ts    |    8 +
 .../src/commands/task/kernel-semantic-result.ts    |   38 +-
 .../src/commands/task/kernel-work-order.ts         |   58 +-
 .../src/commands/task/roadmap-recipe-repin.test.ts |  467 +++++
 .../src/runner/context/recipe-applicability.ts     |  371 ++++
 .../src/runner/context/recipe-closure.ts           |  416 ++++
 .../src/runner/context/recipe-context.ts           |   29 +
 .../src/runner/context/recipe-native-observers.ts  |   34 +
 .../src/runner/context/recipe-plan-binding.ts      |  181 ++
 .../src/runner/context/recipe-plan-rebind.ts       |   73 +
 .../src/runner/context/recipe-plan-validation.ts   |  120 ++
 .../src/runner/context/recipe-prompt-blocks.ts     |    2 +
 .../src/runner/context/recipe-retention.ts         |  222 +++
 .../src/runner/context/recipe-role-context.ts      |  191 ++
 .../src/runner/context/recipe-shortlist.ts         |  116 ++
 .../context/roadmap-recipe-applicability.test.ts   |  406 ++++
 .../runner/context/roadmap-recipe-closure.test.ts  |  565 ++++++
 .../context/roadmap-recipe-plan-binding.test.ts    |  530 +++++
 .../context/roadmap-recipe-plan-validation.test.ts |  352 ++++
 .../runner/context/roadmap-recipe-prompt.test.ts   |  587 ++++++
 .../context/roadmap-recipe-retention.test.ts       |  396 ++++
 .../context/roadmap-recipe-shortlist.test.ts       |  331 ++++
 .../src/runner/usecases/kernel-authority.ts        |    2 +-
 .../usecases/roadmap-recipe-instantiation.test.ts  |  430 ++++
 .../runner/usecases/scenario-explicit-selection.ts |  127 ++
 .../src/runner/usecases/scenario-instantiate.ts    |  201 ++
 .../runner/usecases/scenario-materialize-task.ts   |   73 +-
 .../src/runner/usecases/task-run-bootstrap.ts      |    2 +-
 .../src/runner/usecases/task-run-recipe-context.ts |    4 +
 .../agentplane/src/shared/contained-stable-file.ts |   62 +-
 .../task/roadmap-recipe-specialization.test.ts     |  398 ++++
 packages/core/src/runner/agent-semantic-result.ts  |   16 +-
 packages/core/src/tasks/index.ts                   |   11 +
 packages/core/src/tasks/kernel-plan-refinement.ts  |  121 ++
 packages/core/src/tasks/task-centric/digest.ts     |   24 +-
 packages/core/src/tasks/task-centric/graph.ts      |   45 +-
 packages/core/src/tasks/task-centric/model.ts      |    3 +
 packages/core/src/tasks/task-centric/schema.ts     |   42 +-
 .../src/tasks/task-centric/task-centric.test.ts    |   64 +
 .../src/tasks/task-kernel/authority-lineage.ts     |   40 +-
 packages/core/src/tasks/task-kernel/index.ts       |    1 +
 packages/core/src/tasks/task-kernel/kernel.ts      |   68 +-
 packages/core/src/tasks/task-kernel/model.ts       |    2 +
 packages/recipes/package.json                      |    4 +
 packages/recipes/src/compiled-contracts.ts         |   75 +
 packages/recipes/src/index.ts                      |    9 +
 packages/recipes/src/internal-utils.ts             |   14 +
 packages/recipes/src/manifest-contracts.ts         |    2 +
 packages/recipes/src/manifest.ts                   |    4 +
 packages/recipes/src/resolver-contracts.ts         |   24 +-
 .../recipes/src/roadmap-recipe-parameters.test.ts  |  334 ++++
 .../recipes/src/roadmap-scenario-v2-parser.test.ts |  153 ++
 packages/recipes/src/scenario-compiler.ts          |  103 +
 packages/recipes/src/scenario-contracts.ts         |    2 +
 packages/recipes/src/scenario-conversion.ts        |  185 ++
 packages/recipes/src/scenario-parameters.ts        |  108 +
 packages/recipes/src/scenario-v2.ts                |   70 +
 packages/recipes/src/scenario.ts                   |   15 +
 packages/recipes/tsconfig.json                     |    7 +-
 schemas/agent-semantic-result.schema.json          | 2081 ++++++++++++++++----
 78 files changed, 11755 insertions(+), 431 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
