# PR Review

Created: 2026-09-16T23:02:04.476Z

## Task

- Task: `202609162254-YE48GC`
- Title: Implement and qualify AgentPlane 0.7.10 Blueprint retirement
- Status: DOING
- Branch: `task/202609162254-YE48GC/implement-and-qualify-agentplane-0-7-10-blueprin`
- Canonical task record: `.agentplane/tasks/202609162254-YE48GC/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-16T23:02:04.476Z
- Branch: task/202609162254-YE48GC/implement-and-qualify-agentplane-0-7-10-blueprin
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/publish.yml                      |  81 ++-
 .../commands/evaluator/evaluator-review-usecase.ts |  14 +-
 .../release/publish-workflow-contract.test.ts      |  12 +-
 .../src/commands/task/run-execution-preview.ts     |  18 +-
 .../agentplane/src/runner/context/base-prompts.ts  |   2 +
 .../runner/context/recipe-prompt-blocks.test.ts    | 122 ++++
 .../src/runner/context/recipe-prompt-blocks.ts     |  81 ++-
 .../runner/context/semantic-prompt-projection.ts   |   3 +-
 packages/agentplane/src/runner/types/context.ts    |   3 +
 .../src/runner/usecases/agent-work-order-build.ts  |  65 +-
 .../src/runner/usecases/agent-work-order.ts        |  45 +-
 .../src/runner/usecases/task-run-blueprint.test.ts |  44 +-
 .../src/runner/usecases/task-run-bootstrap.ts      |   5 +-
 .../src/runner/usecases/task-run-obligations.ts    |  34 +
 .../agentplane/src/runner/usecases/task-run.ts     |  11 +-
 .../src/runtime/execution-profile/model.ts         |   4 +
 .../src/runtime/execution-profile/resolve.test.ts  |   4 +
 .../src/runtime/execution-profile/resolve.ts       |   4 +
 .../src/runtime/prompt-modules/registry.test.ts    |   4 +
 .../src/runtime/prompt-modules/registry.ts         |   1 +
 .../src/runtime/task-obligations/catalog.ts        | 381 ++++++++++
 .../src/runtime/task-obligations/index.ts          |  18 +
 .../src/runtime/task-obligations/model.ts          | 112 +++
 .../src/runtime/task-obligations/resolve.test.ts   | 180 +++++
 .../src/runtime/task-obligations/resolve.ts        | 305 ++++++++
 packages/recipes/src/blueprint-extensions.test.ts  | 195 +++++
 packages/recipes/src/blueprint-extensions.ts       | 373 ++++++++++
 scripts/checks/blueprint-retirement-map.json       | 796 +++++++++++++++++++++
 scripts/checks/blueprint-retirement-map.test.mjs   | 203 ++++++
 scripts/generate/render-ghcr-image-metadata.mjs    |  19 +-
 scripts/release/manifest.mjs                       |  30 +
 scripts/release/stable-channel-policy.mjs          | 127 ++++
 scripts/release/stable-channel-policy.test.mjs     |  77 ++
 33 files changed, 3313 insertions(+), 60 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
