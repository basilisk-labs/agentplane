Task: `202610041748-K43XFE`
Title: Implement and qualify AgentPlane 0.7.13 Scenario V2 recipes for production release
Canonical task record: `.agentplane/tasks/202610041748-K43XFE/README.md`

## Summary

Implement and qualify AgentPlane 0.7.13 Scenario V2 recipes for production release

User explicitly authorizes autonomous completion of all necessary development, integration and release work for version 0.7.13. Implement the current agentplane-roadmap-r2/releases/0.7.13.md RC-01 through RC-18 and EXECUTION-CHARTER.md contracts against the current source. Reuse the existing Recipe package, compact Plan input, sole Task Kernel coordinator, evidence storage, approval and independent EVALUATOR. Preserve V1 compatibility with explicit negotiation, bounded typed interpolation, observed applicability, retained pinned dependency closure, shared instantiation and refinement, scoped context, offline conversion preview, and installed-package recovery qualification. Inventory existing implementations before adding code. Use sequential independently verifiable WorkItems; do not introduce a second workflow engine or implement 0.7.14. Preserve existing repair task 202610020159-60QH9J and autonomy task 202610020153-XXZXW4; integrate their accepted results through supported routes. Network reads, PR publication and main integration are authorized. Prepare the exact 0.7.13 candidate and evidence for a subsequent publication task under the same user release authorization. Preserve unrelated work, credentials and history. Do not fabricate measured savings or paid campaign authority; prepare the exact M05 campaign and explicit measurement disposition. Full validation must preserve all required tests and assertions and use realistic bounded execution budgets.

## Scope

- In scope: User explicitly authorizes autonomous completion of all necessary development, integration and release work for version 0.7.13. Implement the current agentplane-roadmap-r2/releases/0.7.13.md RC-01 through RC-18 and EXECUTION-CHARTER.md contracts against the current source. Reuse the existing Recipe package, compact Plan input, sole Task Kernel coordinator, evidence storage, approval and independent EVALUATOR. Preserve V1 compatibility with explicit negotiation, bounded typed interpolation, observed applicability, retained pinned dependency closure, shared instantiation and refinement, scoped context, offline conversion preview, and installed-package recovery qualification. Inventory existing implementations before adding code. Use sequential independently verifiable WorkItems; do not introduce a second workflow engine or implement 0.7.14. Preserve existing repair task 202610020159-60QH9J and autonomy task 202610020153-XXZXW4; integrate their accepted results through supported routes. Network reads, PR publication and main integration are authorized. Prepare the exact 0.7.13 candidate and evidence for a subsequent publication task under the same user release authorization. Preserve unrelated work, credentials and history. Do not fabricate measured savings or paid campaign authority; prepare the exact M05 campaign and explicit measurement disposition. Full validation must preserve all required tests and assertions and use realistic bounded execution budgets.
- Out of scope: unrelated refactors not required for "Implement and qualify AgentPlane 0.7.13 Scenario V2 recipes for production release".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-06T14:19:36.291Z
- Branch: task/202610041748-K43XFE/implement-and-qualify-agentplane-0-7-13-scenario
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/ci.yml                           |     8 +-
 artifacts/bench/m05-0.7.13/catalogue-source.json   |    31 +
 .../bench/m05-0.7.13/format-qualification.json     |     9 +
 .../m05-0.7.13/formatted-no-match-replay.json      |  1220 +
 .../branch-change/campaign.offline.lock.json       |   424 +
 .../formatted-offline/branch-change/evidence.json  |  1220 +
 .../formatted-offline/branch-change/target.bundle  |   Bin 0 -> 1228 bytes
 .../direct-fix/campaign.offline.lock.json          |   424 +
 .../formatted-offline/direct-fix/evidence.json     |  1220 +
 .../formatted-offline/direct-fix/target.bundle     |   Bin 0 -> 1146 bytes
 .../formatted-offline/fixture-policy.json          |     8 +
 .../near-match/campaign.offline.lock.json          |   424 +
 .../formatted-offline/near-match/evidence.json     |  1220 +
 .../formatted-offline/near-match/target.bundle     |   Bin 0 -> 1135 bytes
 .../no-match/campaign.offline.lock.json            |   424 +
 .../formatted-offline/no-match/evidence.json       |  1220 +
 .../formatted-offline/no-match/target.bundle       |   Bin 0 -> 1152 bytes
 .../bench/m05-0.7.13/formatted-offline/oracle.mjs  |    98 +
 .../m05-0.7.13/formatted-offline/preparation.json  |    94 +
 .../bench/m05-0.7.13/formatted-offline/product.mjs | 27120 +++++++++++++++++++
 .../recovery/campaign.offline.lock.json            |   424 +
 .../formatted-offline/recovery/evidence.json       |  1220 +
 .../formatted-offline/recovery/target.bundle       |   Bin 0 -> 1226 bytes
 .../m05-0.7.13/historical-corpora.inventory.json   |   355 +
 artifacts/bench/m05-0.7.13/historical-corpora.tar  |   Bin 0 -> 4567040 bytes
 .../m05-0.7.13/historical-fixture-recovery.json    |    10 +
 .../m05-0.7.13/omitted-historical-fixtures.json    |    43 +
 .../m05-0.7.13/pre-format-evidence.inventory.json  |   118 +
 artifacts/bench/m05-0.7.13/pre-format-evidence.tar |   Bin 0 -> 1280000 bytes
 .../m05-0.7.13/release-disposition.request.json    |    37 +
 artifacts/rc18/installed-examples.json             |     7 +
 artifacts/rc18/qualification.json                  |    57 +
 artifacts/recipes-v2-docs/installed-examples.json  |     7 +
 artifacts/recipes-v2-docs/qualification.json       |    29 +
 bun.lock                                           |     4 +
 docs/developer/cli-contract.mdx                    |     2 +-
 docs/developer/recipes-development.mdx             |   217 +-
 docs/developer/recipes-how-it-works.mdx            |    43 +-
 docs/developer/recipes-spec.mdx                    |    69 +-
 docs/examples/recipes-v2/agent.md                  |     4 +
 docs/examples/recipes-v2/legacy-unsupported.json   |    21 +
 docs/examples/recipes-v2/manifest.json             |    65 +
 docs/examples/recipes-v2/scenario.json             |    84 +
 docs/examples/recipes-v2/selection.json            |    20 +
 docs/recipes/docs-update.mdx                       |    72 +-
 docs/recipes/index.mdx                             |     4 +
 docs/recipes/security-review.mdx                   |    73 +-
 docs/recipes/tdd.mdx                               |    78 +-
 docs/releases/v0.7.13-m05.md                       |   154 +
 docs/user/cli-reference.generated.mdx              |    26 +
 docs/user/workflow.mdx                             |    20 +
 package.json                                       |     1 +
 packages/agentplane/package.json                   |    13 +-
 .../task-backend/kernel-backend-adapter.test.ts    |   192 +
 .../cli/generate-recipes-inventory-script.test.ts  |    44 +-
 ...n-cli.core.roadmap-recipe-v2-entrypoint.test.ts |   377 +
 .../src/cli/run-cli.core.roadmap-recovery.test.ts  |     5 +-
 .../src/cli/run-cli/command-catalog/project.ts     |    10 +
 .../src/cli/run-cli/command-loaders/project.ts     |     6 +
 .../src/commands/branch/work-start.test.ts         |   162 +
 .../agentplane/src/commands/branch/work-start.ts   |    56 +-
 .../evaluator/evaluator-evidence-boundary.ts       |    70 +-
 .../evaluator/evaluator-evidence-store.test.ts     |   162 +-
 .../commands/evaluator/evaluator-evidence-store.ts |    71 +
 .../src/commands/pr/internal/provider-base.ts      |    16 +-
 .../commands/pr/internal/sync-frozen-base.test.ts  |   292 +
 .../src/commands/pr/internal/sync-model.ts         |     3 +-
 .../pr/internal/sync-open-provider-base.test.ts    |     2 +-
 .../src/commands/pr/internal/sync-open-step.ts     |    27 +-
 .../src/commands/pr/internal/sync-update-step.ts   |    37 +-
 .../agentplane/src/commands/pr/internal/sync.ts    |    15 +-
 .../agentplane/src/commands/recipes/impl/apply.ts  |    13 +-
 .../commands/recipes/impl/explicit-selection.ts    |   157 +
 .../src/commands/recipes/impl/project-registry.ts  |    28 +-
 .../src/commands/recipes/impl/resolver.ts          |     2 +-
 .../src/commands/recipes/impl/v1-conversion.ts     |   351 +
 .../src/commands/recipes/preview-v1.command.ts     |    21 +
 .../src/commands/recipes/preview-v2.command.ts     |    51 +
 .../recipes/roadmap-explicit-selection.test.ts     |   342 +
 .../roadmap-installed-recipe-negotiation.test.ts   |   154 +
 .../recipes/roadmap-v1-v2-conversion.test.ts       |   426 +
 .../commands/release/apply.pipeline/mutation.ts    |     8 +
 .../release/apply.version-mutation.test.ts         |    74 +
 .../release/check-release-parity-script.test.ts    |   136 +
 .../release/workflow-node-version-contract.test.ts |    16 +-
 .../src/commands/task/advance-task-step.ts         |    14 +-
 .../src/commands/task/advance.command.ts           |    27 +-
 .../src/commands/task/create-plan-input.ts         |    65 +-
 .../agentplane/src/commands/task/create.command.ts |    55 +-
 .../task/direct-task-verification-record.ts        |     2 +
 .../commands/task/external-agent-blocked-result.ts |    17 +
 .../external-agent-implementation-authority.ts     |    12 +-
 .../external-agent-implementation-finalization.ts  |     2 +
 .../task/external-agent-result-application.ts      |    19 +
 .../commands/task/kernel-advance-network.test.ts   |   302 +
 .../src/commands/task/kernel-advance.test.ts       |     6 +-
 .../kernel-completed-external-blocker-boundary.ts  |   111 +
 .../task/kernel-completed-external-blocker.ts      |   128 +
 .../task/kernel-completed-external-rework.test.ts  |   923 +
 .../task/kernel-completed-external-rework.ts       |    36 +
 .../src/commands/task/kernel-completed-workflow.ts |    28 +-
 .../src/commands/task/kernel-exchange.test.ts      |   716 +-
 .../src/commands/task/kernel-exchange.ts           |   260 +-
 .../task/kernel-inspection-validation.test.ts      |   103 +
 .../commands/task/kernel-inspection-validation.ts  |    34 +-
 .../src/commands/task/kernel-inspection.ts         |    27 +-
 .../task/kernel-plan-supplied-approval.test.ts     |    68 +
 .../agentplane/src/commands/task/kernel-plan.ts    |    60 +-
 .../src/commands/task/kernel-planning-view.ts      |    10 +-
 .../commands/task/kernel-policy-baseline.test.ts   |   141 +
 .../src/commands/task/kernel-policy-baseline.ts    |   188 +
 .../commands/task/kernel-policy-completion.test.ts |   209 +
 .../src/commands/task/kernel-recipe-admission.ts   |   106 +
 .../commands/task/kernel-recovery-evidence.test.ts |   287 +
 .../src/commands/task/kernel-recovery-evidence.ts  |   213 +-
 .../task/kernel-repository-coordinator.test.ts     |    66 +-
 .../commands/task/kernel-repository-coordinator.ts |    29 +-
 .../commands/task/kernel-rework-lineage.test.ts    |   895 +
 .../src/commands/task/kernel-rework-lineage.ts     |   282 +
 .../src/commands/task/kernel-rework-proof.test.ts  |   691 +
 .../src/commands/task/kernel-rework-proof.ts       |   490 +
 .../src/commands/task/kernel-runtime-context.ts    |    36 +-
 .../src/commands/task/kernel-semantic-result.ts    |    42 +-
 .../task/kernel-terminal-artifacts.test.ts         |   198 +
 .../src/commands/task/kernel-terminal-artifacts.ts |    14 +-
 .../commands/task/kernel-work-item-resume.test.ts  |    88 +-
 .../src/commands/task/kernel-work-item-resume.ts   |    58 +-
 .../task/kernel-work-order.network.test.ts         |   191 +
 .../src/commands/task/kernel-work-order.ts         |   101 +-
 .../src/commands/task/ordinary-advance-step.ts     |    29 +-
 .../src/commands/task/plan-set.command.ts          |    70 +-
 .../agentplane/src/commands/task/recipe-input.ts   |   116 +
 .../src/commands/task/roadmap-recipe-repin.test.ts |   476 +
 .../commands/task/roadmap-terminal-noop.test.ts    |    95 +-
 .../task/task-execution-contract-observation.ts    |     2 +
 packages/agentplane/src/recipe-api.ts              |    65 +
 .../src/runner/context/recipe-applicability.ts     |   371 +
 .../src/runner/context/recipe-closure.ts           |   416 +
 .../src/runner/context/recipe-context.ts           |    14 +
 .../src/runner/context/recipe-native-observers.ts  |    34 +
 .../src/runner/context/recipe-plan-binding.ts      |   181 +
 .../src/runner/context/recipe-plan-rebind.ts       |    73 +
 .../src/runner/context/recipe-plan-validation.ts   |   120 +
 .../src/runner/context/recipe-prompt-blocks.ts     |     2 +
 .../src/runner/context/recipe-retention.ts         |   222 +
 .../src/runner/context/recipe-role-context.ts      |   191 +
 .../src/runner/context/recipe-shortlist.ts         |   116 +
 .../context/roadmap-recipe-applicability.test.ts   |   406 +
 .../runner/context/roadmap-recipe-closure.test.ts  |   565 +
 .../context/roadmap-recipe-plan-binding.test.ts    |   530 +
 .../context/roadmap-recipe-plan-validation.test.ts |   352 +
 .../runner/context/roadmap-recipe-prompt.test.ts   |   587 +
 .../context/roadmap-recipe-retention.test.ts       |   396 +
 .../context/roadmap-recipe-shortlist.test.ts       |   331 +
 ...te-fingerprint-residual-git.integration.test.ts |     3 +-
 .../src/runner/usecases/agent-work-order-build.ts  |    12 +-
 .../usecases/agent-work-order-protected-paths.ts   |    61 +
 .../usecases/agent-work-order.integration.test.ts  |   211 +
 .../src/runner/usecases/kernel-authority.ts        |     2 +-
 .../usecases/roadmap-recipe-instantiation.test.ts  |   430 +
 .../runner/usecases/scenario-explicit-selection.ts |   127 +
 .../src/runner/usecases/scenario-instantiate.ts    |   201 +
 .../runner/usecases/scenario-materialize-task.ts   |    73 +-
 .../src/runner/usecases/task-run-bootstrap.ts      |     2 +-
 .../usecases/task-run-context.integration.test.ts  |     2 +-
 .../usecases/task-run-effect-resolution.test.ts    |   159 +-
 .../usecases/task-run-lifecycle-cancel.test.ts     |     3 +-
 .../src/runner/usecases/task-run-recipe-context.ts |     4 +
 .../src/runtime/task-obligations/resolve.test.ts   |    50 +
 .../src/runtime/task-obligations/resolve.ts        |     9 +-
 .../agentplane/src/shared/contained-stable-file.ts |    62 +-
 packages/agentplane/tsup.config.ts                 |     1 +
 .../task/roadmap-recipe-specialization.test.ts     |   398 +
 packages/core/src/runner/agent-semantic-result.ts  |    16 +-
 packages/core/src/tasks/index.ts                   |    11 +
 packages/core/src/tasks/kernel-plan-refinement.ts  |   121 +
 packages/core/src/tasks/task-centric/digest.ts     |    24 +-
 packages/core/src/tasks/task-centric/graph.ts      |    45 +-
 packages/core/src/tasks/task-centric/model.ts      |     3 +
 packages/core/src/tasks/task-centric/schema.ts     |    42 +-
 .../task-centric.output-dependencies.test.ts       |   112 +
 .../src/tasks/task-kernel/authority-delta.test.ts  |   158 +-
 .../src/tasks/task-kernel/authority-lineage.ts     |    40 +-
 packages/core/src/tasks/task-kernel/index.ts       |     1 +
 packages/core/src/tasks/task-kernel/kernel.ts      |    68 +-
 packages/core/src/tasks/task-kernel/model.ts       |     2 +
 packages/recipes/package.json                      |     6 +-
 packages/recipes/scripts/validate-doc-examples.mjs |   137 +
 packages/recipes/src/compiled-contracts.ts         |    75 +
 packages/recipes/src/index.ts                      |     9 +
 packages/recipes/src/internal-utils.ts             |    14 +
 packages/recipes/src/manifest-contracts.ts         |     2 +
 packages/recipes/src/manifest.ts                   |     4 +
 packages/recipes/src/resolver-contracts.ts         |    24 +-
 .../recipes/src/roadmap-recipe-parameters.test.ts  |   334 +
 .../recipes/src/roadmap-scenario-v2-parser.test.ts |   153 +
 packages/recipes/src/scenario-compiler.ts          |   103 +
 packages/recipes/src/scenario-contracts.ts         |     2 +
 packages/recipes/src/scenario-conversion.ts        |   185 +
 packages/recipes/src/scenario-parameters.ts        |   108 +
 packages/recipes/src/scenario-v2.ts                |    70 +
 packages/recipes/src/scenario.ts                   |    15 +
 packages/recipes/tsconfig.json                     |     7 +-
 packages/testkit/src/release.ts                    |     5 +
 schemas/agent-semantic-result.schema.json          |  2081 +-
 scripts/README.md                                  |    31 +-
 .../baselines/v0.7-compatibility-candidate.json    |   143 +-
 scripts/bench/capture-compatibility-candidate.mjs  |    41 +
 scripts/bench/paired-m05-offline.mjs               |   347 +
 scripts/bench/paired-m05-offline.test.mjs          |   128 +
 scripts/bench/paired-m05-oracle.mjs                |    98 +
 scripts/bench/paired-m05-product.mjs               |   111 +
 scripts/bench/paired-production-driver.mjs         |   135 +-
 scripts/bench/paired-production-driver.test.mjs    |   135 +
 .../check-compatibility-contract-baseline.mjs      |   387 +-
 scripts/generate/generate-recipes-inventory.mjs    |     8 +-
 scripts/lib/release-version-surfaces.mjs           |    13 +
 scripts/lib/test-route-registry.mjs                |    24 +
 .../release/check-local-tarball-install-smoke.mjs  |    71 +-
 scripts/release/check-package-node-runtime.mjs     |    72 +-
 .../release/check-package-node-runtime.test.mjs    |   148 +
 scripts/release/installed-recipe-matrix.mjs        |   790 +
 scripts/release/version-surfaces.json              |     7 +
 223 files changed, 62119 insertions(+), 1234 deletions(-)
```

</details>
