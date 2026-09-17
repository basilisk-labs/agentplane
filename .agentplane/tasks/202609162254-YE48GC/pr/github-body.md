Task: `202609162254-YE48GC`
Title: Implement and qualify AgentPlane 0.7.10 Blueprint retirement
Canonical task record: `.agentplane/tasks/202609162254-YE48GC/README.md`

## Summary

Implement and qualify AgentPlane 0.7.10 Blueprint retirement

Implement the approved 0.7.10 scope from BP-01 through BP-31 except external publication: first add the SemVer-aware stable-channel promotion prerequisite, then remove Blueprint from active execution and model-visible context while preserving current lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations. Add migrations, cutover, cold decoders, installed-package qualification, honest M02 disposition, compatibility documentation, and release-ready version metadata. Do not omit PLANNER or EVALUATOR, introduce Scenario V2, or converge lifecycle ownership scheduled for later releases. Do not publish in this task.

## Scope

- In scope: Implement the approved 0.7.10 scope from BP-01 through BP-31 except external publication: first add the SemVer-aware stable-channel promotion prerequisite, then remove Blueprint from active execution and model-visible context while preserving current lifecycle, authority, approval, review, verification, provenance, freshness, recovery, Recipe V1, and historical audit obligations. Add migrations, cutover, cold decoders, installed-package qualification, honest M02 disposition, compatibility documentation, and release-ready version metadata. Do not omit PLANNER or EVALUATOR, introduce Scenario V2, or converge lifecycle ownership scheduled for later releases. Do not publish in this task.
- Out of scope: unrelated refactors not required for "Implement and qualify AgentPlane 0.7.10 Blueprint retirement".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

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
 scripts/checks/blueprint-retirement-map.json       | 796 +++++++++++++++++++++
 scripts/checks/blueprint-retirement-map.test.mjs   | 203 ++++++
 scripts/generate/render-ghcr-image-metadata.mjs    |  19 +-
 scripts/release/manifest.mjs                       |  30 +
 scripts/release/stable-channel-policy.mjs          | 127 ++++
 scripts/release/stable-channel-policy.test.mjs     |  77 ++
 28 files changed, 2541 insertions(+), 59 deletions(-)
```

</details>
