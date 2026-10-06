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
 .../bench/m05-0.7.13/checked-no-match-replay.json  |  1282 +
 .../branch-change/campaign.offline.lock.json       |   458 +
 .../checked-offline/branch-change/evidence.json    |  1282 +
 .../checked-offline/branch-change/target.bundle    |   Bin 0 -> 1285 bytes
 .../direct-fix/campaign.offline.lock.json          |   458 +
 .../checked-offline/direct-fix/evidence.json       |  1282 +
 .../checked-offline/direct-fix/target.bundle       |   Bin 0 -> 1202 bytes
 .../m05-0.7.13/checked-offline/fixture-policy.json |    11 +
 .../near-match/campaign.offline.lock.json          |   458 +
 .../checked-offline/near-match/evidence.json       |  1282 +
 .../checked-offline/near-match/target.bundle       |   Bin 0 -> 1184 bytes
 .../no-match/campaign.offline.lock.json            |   458 +
 .../checked-offline/no-match/evidence.json         |  1282 +
 .../checked-offline/no-match/target.bundle         |   Bin 0 -> 1206 bytes
 .../bench/m05-0.7.13/checked-offline/oracle.mjs    |    98 +
 .../m05-0.7.13/checked-offline/preparation.json    |    94 +
 .../bench/m05-0.7.13/checked-offline/product.mjs   | 24136 +++++++++++++++++++
 .../recovery/campaign.offline.lock.json            |   458 +
 .../checked-offline/recovery/evidence.json         |  1282 +
 .../checked-offline/recovery/target.bundle         |   Bin 0 -> 1288 bytes
 .../branch-change/campaign.offline.lock.json       |   458 +
 .../final-offline/branch-change/evidence.json      |  1282 +
 .../final-offline/branch-change/target.bundle      |   Bin 0 -> 1285 bytes
 .../direct-fix/campaign.offline.lock.json          |   458 +
 .../final-offline/direct-fix/evidence.json         |  1282 +
 .../final-offline/direct-fix/target.bundle         |   Bin 0 -> 1202 bytes
 .../m05-0.7.13/final-offline/fixture-policy.json   |    11 +
 .../near-match/campaign.offline.lock.json          |   458 +
 .../final-offline/near-match/evidence.json         |  1282 +
 .../final-offline/near-match/target.bundle         |   Bin 0 -> 1184 bytes
 .../no-match/campaign.offline.lock.json            |   458 +
 .../final-offline/no-match/evidence.json           |  1282 +
 .../final-offline/no-match/target.bundle           |   Bin 0 -> 1206 bytes
 .../bench/m05-0.7.13/final-offline/oracle.mjs      |    96 +
 .../m05-0.7.13/final-offline/preparation.json      |    94 +
 .../bench/m05-0.7.13/final-offline/product.mjs     | 24136 +++++++++++++++++++
 .../recovery/campaign.offline.lock.json            |   458 +
 .../final-offline/recovery/evidence.json           |  1282 +
 .../final-offline/recovery/target.bundle           |   Bin 0 -> 1288 bytes
 .../m05-0.7.13/historical-fixture-recovery.json    |    10 +
 artifacts/bench/m05-0.7.13/no-match-replay.json    |  1282 +
 .../branch-change/campaign.offline.lock.json       |   458 +
 .../offline-qualified/branch-change/evidence.json  |  1222 +
 .../offline-qualified/branch-change/target.bundle  |   Bin 0 -> 1285 bytes
 .../direct-fix/campaign.offline.lock.json          |   458 +
 .../offline-qualified/direct-fix/evidence.json     |  1222 +
 .../offline-qualified/direct-fix/target.bundle     |   Bin 0 -> 1202 bytes
 .../offline-qualified/fixture-policy.json          |    11 +
 .../near-match/campaign.offline.lock.json          |   458 +
 .../offline-qualified/near-match/evidence.json     |  1222 +
 .../offline-qualified/near-match/target.bundle     |   Bin 0 -> 1184 bytes
 .../no-match/campaign.offline.lock.json            |   458 +
 .../offline-qualified/no-match/evidence.json       |  1222 +
 .../offline-qualified/no-match/target.bundle       |   Bin 0 -> 1206 bytes
 .../bench/m05-0.7.13/offline-qualified/oracle.mjs  |    47 +
 .../m05-0.7.13/offline-qualified/preparation.json  |    76 +
 .../bench/m05-0.7.13/offline-qualified/product.mjs | 24127 ++++++++++++++++++
 .../recovery/campaign.offline.lock.json            |   458 +
 .../offline-qualified/recovery/evidence.json       |  1222 +
 .../offline-qualified/recovery/target.bundle       |   Bin 0 -> 1288 bytes
 .../branch-change/campaign.offline.lock.json       |   458 +
 .../diagnostic-git-evidence/git-directory.tar      |   Bin 0 -> 92160 bytes
 .../diagnostic-git-evidence/inventory.json         |   131 +
 .../diagnostic-git-evidence/repository.bundle      |   Bin 0 -> 1208 bytes
 .../offline/branch-change/diagnostic/fixture.json  |   199 +
 .../m05-0.7.13/offline/branch-change/target.bundle |   Bin 0 -> 1208 bytes
 .../offline/direct-fix/campaign.offline.lock.json  |   458 +
 .../m05-0.7.13/offline/direct-fix/evidence.json    |  1222 +
 .../m05-0.7.13/offline/direct-fix/target.bundle    |   Bin 0 -> 1127 bytes
 .../bench/m05-0.7.13/offline/fixture-policy.json   |    11 +
 artifacts/bench/m05-0.7.13/offline/oracle.mjs      |    47 +
 artifacts/bench/m05-0.7.13/offline/product.mjs     | 24127 ++++++++++++++++++
 .../m05-0.7.13/omitted-historical-fixtures.json    |    43 +
 .../m05-0.7.13/release-disposition.request.json    |    48 +
 bun.lock                                           |     4 +
 docs/releases/v0.7.13-m05.md                       |   138 +
 packages/agentplane/package.json                   |    13 +-
 .../task-backend/kernel-backend-adapter.test.ts    |   192 +
 ...n-cli.core.roadmap-recipe-v2-entrypoint.test.ts |   377 +
 .../src/cli/run-cli.core.roadmap-recovery.test.ts  |     5 +-
 .../src/cli/run-cli/command-catalog/project.ts     |    10 +
 .../src/cli/run-cli/command-loaders/project.ts     |     6 +
 .../src/commands/branch/work-start.test.ts         |   162 +
 .../agentplane/src/commands/branch/work-start.ts   |    56 +-
 .../evaluator/evaluator-evidence-boundary.ts       |    70 +-
 .../evaluator/evaluator-evidence-store.test.ts     |   162 +-
 .../commands/evaluator/evaluator-evidence-store.ts |    71 +
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
 .../src/commands/shared/declared-check.test.ts     |    56 +-
 .../src/commands/shared/declared-check.ts          |    31 +-
 .../src/commands/task/advance-task-step.ts         |     6 +-
 .../src/commands/task/create-plan-input.ts         |    65 +-
 .../agentplane/src/commands/task/create.command.ts |    55 +-
 .../direct-task-verification.sequence.cases.ts     |   104 +-
 .../src/commands/task/direct-task-verification.ts  |    27 +-
 .../commands/task/kernel-advance-network.test.ts   |   302 +
 .../src/commands/task/kernel-advance.test.ts       |     6 +-
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
 .../commands/task/kernel-work-item-resume.test.ts  |    90 +-
 .../src/commands/task/kernel-work-item-resume.ts   |    58 +-
 .../task/kernel-work-order.network.test.ts         |   191 +
 .../src/commands/task/kernel-work-order.ts         |   101 +-
 .../src/commands/task/plan-set.command.ts          |    70 +-
 .../agentplane/src/commands/task/recipe-input.ts   |   116 +
 .../src/commands/task/roadmap-recipe-repin.test.ts |   476 +
 .../commands/task/roadmap-terminal-noop.test.ts    |     6 +-
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
 packages/recipes/package.json                      |     4 +
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
 schemas/agent-semantic-result.schema.json          |  2081 +-
 scripts/bench/paired-m05-offline.mjs               |   333 +
 scripts/bench/paired-m05-offline.test.mjs          |    62 +
 scripts/bench/paired-m05-oracle.mjs                |    98 +
 scripts/bench/paired-m05-product.mjs               |   111 +
 scripts/bench/paired-production-driver.mjs         |   125 +-
 scripts/bench/paired-production-driver.test.mjs    |   135 +
 scripts/lib/test-route-registry.mjs                |    24 +
 .../release/check-local-tarball-install-smoke.mjs  |    71 +-
 scripts/release/installed-recipe-matrix.mjs        |   790 +
 208 files changed, 148886 insertions(+), 714 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
