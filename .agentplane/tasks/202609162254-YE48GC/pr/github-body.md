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
 .../src/commands/acr/generate-extensions.ts        |  24 +
 packages/agentplane/src/commands/acr/generate.ts   |  15 +-
 packages/agentplane/src/commands/acr/summary.ts    |  31 +
 .../commands/blueprint/historical-audit.test.ts    | 104 +++
 .../src/commands/blueprint/historical-audit.ts     | 158 ++++
 .../commands/evaluator/evaluator-evidence-store.ts |  16 +-
 .../evaluator/evaluator-quality-artifacts.ts       |   2 +-
 .../commands/evaluator/evaluator-review-apply.ts   |   5 +-
 .../evaluator/evaluator-review-artifacts.ts        |   1 +
 .../commands/evaluator/evaluator-review-usecase.ts |  98 ++-
 .../evaluator/evaluator-work-order.test.ts         |  80 +++
 .../src/commands/evaluator/evaluator-work-order.ts |  59 +-
 .../release/publish-workflow-contract.test.ts      |  12 +-
 .../src/commands/shared/native-task-identity.ts    | 145 ++++
 .../src/commands/shared/side-effect-authority.ts   |   9 +-
 .../shared/task-verification-input-types.ts        |  70 +-
 .../shared/task-verification-input.test.ts         |  96 +++
 .../src/commands/shared/task-verification-input.ts | 217 +++++-
 .../shared/task-verification-record-parser.ts      | 182 ++++-
 .../commands/shared/task-verification-records.ts   |  53 +-
 .../commands/shared/workflow-step-fingerprint.ts   | 184 +++--
 .../src/commands/task/advance.command.ts           |   2 +
 .../src/commands/task/blueprint-summary.ts         |  65 +-
 .../task/external-agent-evaluator-recovery.test.ts |   4 +-
 .../task/external-agent-evaluator-recovery.ts      |  19 +-
 .../src/commands/task/finish-blueprint-evidence.ts |  28 +-
 .../src/commands/task/kernel-cutover.test.ts       |  73 ++
 .../agentplane/src/commands/task/kernel-cutover.ts |  54 ++
 .../src/commands/task/kernel-migrate.command.ts    |  67 +-
 .../task/kernel-migration-admission.test.ts        |  72 ++
 .../commands/task/kernel-migration-admission.ts    |  38 +
 .../src/commands/task/kernel-runtime-context.ts    |   6 +-
 .../src/commands/task/kernel-work-order.ts         |  26 +-
 .../src/commands/task/new.primary-checkout.test.ts |  39 +
 packages/agentplane/src/commands/task/new.spec.ts  |   8 +-
 packages/agentplane/src/commands/task/new.ts       |  11 +-
 .../src/commands/task/quality-review-gate.ts       |   6 +-
 .../src/commands/task/run-execution-preview.ts     |  18 +-
 .../agentplane/src/commands/task/run.command.ts    |   3 +
 .../src/commands/task/verify-record-execute.ts     |  28 +-
 .../src/commands/task/verify-record-references.ts  |  12 +
 .../src/commands/task/verify-show.command.ts       |  14 +
 .../agentplane/src/runner/context/base-prompts.ts  |   2 +
 .../runner/context/recipe-prompt-blocks.test.ts    | 122 ++++
 .../src/runner/context/recipe-prompt-blocks.ts     |  81 ++-
 .../runner/context/semantic-prompt-projection.ts   |   3 +-
 .../src/runner/run-repository-contract.ts          |  10 +-
 .../agentplane/src/runner/state-fingerprint.ts     |  79 +-
 packages/agentplane/src/runner/types/context.ts    |   3 +
 .../src/runner/usecases/agent-work-order-build.ts  |  87 ++-
 .../src/runner/usecases/agent-work-order.ts        |  45 +-
 .../src/runner/usecases/task-run-blueprint.test.ts |  44 +-
 .../src/runner/usecases/task-run-bootstrap.ts      |   5 +-
 .../src/runner/usecases/task-run-obligations.ts    |  34 +
 .../agentplane/src/runner/usecases/task-run.ts     |  16 +-
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
 packages/core/src/runner/state-fingerprint.test.ts |  34 +-
 packages/core/src/runner/state-fingerprint.ts      | 198 ++++-
 packages/recipes/src/blueprint-extensions.test.ts  | 195 +++++
 packages/recipes/src/blueprint-extensions.ts       | 373 ++++++++++
 scripts/checks/blueprint-retirement-map.json       | 796 +++++++++++++++++++++
 scripts/checks/blueprint-retirement-map.test.mjs   | 203 ++++++
 scripts/generate/render-ghcr-image-metadata.mjs    |  19 +-
 scripts/release/manifest.mjs                       |  30 +
 scripts/release/stable-channel-policy.mjs          | 127 ++++
 scripts/release/stable-channel-policy.test.mjs     |  77 ++
 76 files changed, 5556 insertions(+), 275 deletions(-)
```

</details>
