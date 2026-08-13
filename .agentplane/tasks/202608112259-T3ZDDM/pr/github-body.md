Task: `202608112259-T3ZDDM`
Title: Optimize the verification and test pipeline around one computed Verification Contract
Canonical task record: `.agentplane/tasks/202608112259-T3ZDDM/README.md`

## Summary

Optimize the verification and test pipeline around one computed Verification Contract

Implement a versioned Verification Contract computed once from the semantic task assessment introduced by 202608112232-3NC7Y4 and strengthened monotonically by deterministic observed effects. Make that contract the single authority for local, PR, release, evaluator, finish, and recovery verification. Add change-aware test selection so local development runs only affected unit/integration suites plus mandatory critical-path checks; run the full CLI regression on PR; run real E2E on PR and release according to risk and observed effects. Add a conservative fallback that selects full regression whenever central components, shared contracts, routing, lifecycle, verification policy, schemas, package/lockfiles, CI, or unknown/unmapped effects are touched. The LLM may propose semantic scope and explain results but must not remove, downgrade, or bypass mandatory checks selected by deterministic policy. Audit duplicate behavioral coverage and move assertions to the cheapest sufficient level, retaining higher-level tests only for observable cross-boundary contracts. Profile fixture creation and process startup; replace repeated mutable setup with reusable immutable fixtures and cheap isolated repository copies where hermeticity is preserved. Execute independent core, runtime, CLI, and docs/schema groups in parallel with deterministic aggregation, failure reporting, and cancellation semantics. Instrument and report verification amplification, wall-clock verification time, test duplication, and the number of AgentPlane lifecycle/control-plane commands. Define small direct work as localized, reversible, non-central, with no external effects; on pinned reference hardware target mandatory local verification at no more than 60 seconds p50 and 120 seconds p95, no more than three lifecycle/control-plane commands, and no local full CLI regression unless the deterministic fallback triggers. Establish a reproducible before/after benchmark, document metric definitions and residual risk, and prove that speedups do not weaken required evidence.

## Scope

- In scope: Implement a versioned Verification Contract computed once from the semantic task assessment introduced by 202608112232-3NC7Y4 and strengthened monotonically by deterministic observed effects. Make that contract the single authority for local, PR, release, evaluator, finish, and recovery verification. Add change-aware test selection so local development runs only affected unit/integration suites plus mandatory critical-path checks; run the full CLI regression on PR; run real E2E on PR and release according to risk and observed effects. Add a conservative fallback that selects full regression whenever central components, shared contracts, routing, lifecycle, verification policy, schemas, package/lockfiles, CI, or unknown/unmapped effects are touched. The LLM may propose semantic scope and explain results but must not remove, downgrade, or bypass mandatory checks selected by deterministic policy. Audit duplicate behavioral coverage and move assertions to the cheapest sufficient level, retaining higher-level tests only for observable cross-boundary contracts. Profile fixture creation and process startup; replace repeated mutable setup with reusable immutable fixtures and cheap isolated repository copies where hermeticity is preserved. Execute independent core, runtime, CLI, and docs/schema groups in parallel with deterministic aggregation, failure reporting, and cancellation semantics. Instrument and report verification amplification, wall-clock verification time, test duplication, and the number of AgentPlane lifecycle/control-plane commands. Define small direct work as localized, reversible, non-central, with no external effects; on pinned reference hardware target mandatory local verification at no more than 60 seconds p50 and 120 seconds p95, no more than three lifecycle/control-plane commands, and no local full CLI regression unless the deterministic fallback triggers. Establish a reproducible before/after benchmark, document metric definitions and residual risk, and prove that speedups do not weaken required evidence.
- Out of scope: unrelated refactors not required for "Optimize the verification and test pipeline around one computed Verification Contract".

## Verification

- State: ok
- Note:

```text
Verified chained lifecycle reuse fix on exact SHA 2b5166e3: 22/22 focused tests, lint, typecheck,
full-fast 5/5 with one build, and hosted run 31710007412 pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-12T17:03:52.714Z
- Branch: task/202608112259-T3ZDDM/optimize-the-verification-and-test-pipeline-arou
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/codeql/codeql-config.yml                   |    6 +
 .github/workflows/ci.yml                           |   90 +-
 docs/developer/code-quality.mdx                    |    7 +
 docs/developer/verification-contract.mdx           |   83 +
 docs/user/cli-reference.generated.mdx              |    8 +-
 package.json                                       |    7 +-
 .../agentplane/src/backends/task-backend.test.ts   |   67 +
 .../shared/normalize-verification-contract.test.ts |   27 +
 .../shared/normalize-verification-contract.ts      |  171 ++
 .../src/backends/task-backend/shared/record.ts     |   12 +-
 .../agentplane/src/cli/local-ci-selection.test.ts  |  109 +-
 .../run-cli.core.hooks.pre-push-full-fast.test.ts  |   61 +
 .../run-cli.core.pr-flow.worktree-runtime.test.ts  |  250 +--
 .../src/cli/run-cli.core.task-advance.test.ts      |    2 +-
 .../src/cli/run-cli.core.task-run.test.ts          |    4 +-
 ...-cli.critical.agent-efficiency-baseline.test.ts |   29 +-
 .../agentplane/src/cli/test-routing-check.test.ts  |   79 +-
 .../src/cli/verification-contract.test.ts          |  313 +++
 .../src/commands/branch/work-start.materialize.ts  |   94 +-
 .../commands/evaluator/evaluator-diff-evidence.ts  |   45 +
 .../evaluator-episode.calibration.test.ts          |   14 +-
 .../evaluator-qualification-packet.test.ts         |   18 +-
 .../commands/evaluator/evaluator-review-usecase.ts |   58 +-
 .../evaluator/evaluator-run.command.test.ts        |   22 +-
 .../evaluator/evaluator-runtime-evidence.test.ts   |   53 +-
 .../evaluator-verification-contract.test.ts        |   76 +
 .../evaluator/evaluator-verification-records.ts    |   11 +-
 .../commands/release/ci-workflow-contract.test.ts  |   15 +
 .../src/commands/release/github-ci-plan.test.ts    |  424 +++-
 .../commands/release/release-ci-contract.test.ts   |   13 +-
 .../commands/shared/quality-review-target.test.ts  |   25 +
 .../src/commands/shared/quality-review-target.ts   |   18 +-
 .../shared/task-verification-input.test.ts         |   29 +
 .../src/commands/shared/task-verification-input.ts |   19 +-
 .../shared/task-verification-records.test.ts       |   53 +-
 .../commands/shared/task-verification-records.ts   |   66 +-
 .../commands/shared/verification-details.test.ts   |   26 +
 .../src/commands/shared/verification-details.ts    |   15 +-
 .../commands/shared/workflow-step-policy-scope.ts  |    8 +-
 .../branch-task-supervisor-artifact-commit.test.ts |   32 +
 .../task/branch-task-supervisor-artifact-commit.ts |    4 +
 .../task/branch-task-supervisor-episodes.ts        |   21 +-
 .../agentplane/src/commands/task/brief-render.ts   |   13 +
 .../task/direct-task-supervisor-closeout.test.ts   |   17 +-
 .../task/direct-task-supervisor-closeout.ts        |   23 +-
 .../commands/task/direct-task-verification.test.ts |   44 +-
 .../src/commands/task/direct-task-verification.ts  |   34 +
 .../external-agent-implementation-authority.ts     |   57 +
 .../src/commands/task/finish-blueprint-evidence.ts |   37 +
 .../task/finish.quality-review-target.unit.test.ts |   37 +
 .../src/commands/task/verify-command-shared.ts     |    2 +-
 .../src/commands/task/verify-record-execute.ts     |   80 +-
 .../task/verify-record-observed-changes.ts         |   37 +
 .../task/verify-record.durability.unit.test.ts     |  140 +-
 packages/agentplane/src/commands/verify.spec.ts    |    4 +-
 .../agentplane/src/runtime/task-routing/effects.ts |   37 +
 .../src/runtime/task-routing/observed-path.ts      |   67 +-
 .../src/runtime/task-routing/resolve.test.ts       |  243 ++
 .../agentplane/src/runtime/task-routing/resolve.ts |  130 +-
 packages/core/package.json                         |    5 +
 .../schemas/task-readme-frontmatter.schema.json    |  501 +++++
 packages/core/schemas/tasks-export.schema.json     |  501 +++++
 packages/core/src/git/git-diff.test.ts             |   14 +
 packages/core/src/git/git-diff.ts                  |    8 +-
 packages/core/src/runner/agent-semantic-result.ts  |   92 +-
 packages/core/src/tasks/index.ts                   |   13 +
 .../core/src/tasks/task-artifact-schema.task.ts    |   89 +-
 .../tasks/task-execution-contract-compat.test.ts   |  108 +
 packages/core/src/tasks/task-store.ts              |   78 +
 .../src/tasks/verification-contract-kernel.d.ts    |   95 +
 .../core/src/tasks/verification-contract-kernel.js |  325 +++
 packages/core/src/tasks/verification-contract.ts   |   73 +
 packages/core/tsup.config.ts                       |    1 +
 .../schemas/task-readme-frontmatter.schema.json    |  501 +++++
 packages/spec/schemas/tasks-export.schema.json     |  501 +++++
 schemas/agent-semantic-result.schema.json          |  102 +-
 schemas/task-readme-frontmatter.schema.json        |  501 +++++
 schemas/tasks-export.schema.json                   |  501 +++++
 scripts/README.md                                  |   43 +-
 scripts/baselines/clone-baseline.json              |  249 +--
 .../baselines/v0.7-compatibility-candidate.json    | 2344 +++++++++-----------
 scripts/baselines/verification-contract-small.json |   37 +
 scripts/bench/capture-compatibility-candidate.mjs  |  172 ++
 scripts/bench/measure-verification-contract.mjs    |  235 ++
 scripts/checks/check-cli-cold-baseline.mjs         |    8 +-
 scripts/checks/check-clone-baseline.mjs            |    1 +
 .../check-compatibility-contract-baseline.mjs      |   19 +-
 scripts/checks/check-test-routing.mjs              |   67 +-
 scripts/checks/plan-github-ci.mjs                  |   50 +-
 scripts/checks/run-local-ci-group.mjs              |   72 +
 scripts/checks/run-local-ci.mjs                    |  279 ++-
 scripts/checks/run-pre-push-hook.mjs               |   17 +-
 scripts/checks/verify-reused-parent.mjs            |   51 +
 scripts/lib/github-ci-capabilities.d.ts            |   11 +
 scripts/lib/github-ci-capabilities.mjs             |   87 +-
 scripts/lib/installed-migration-matrix.mjs         |   22 +
 scripts/lib/lifecycle-artifact-reuse.mjs           |  492 ++++
 scripts/lib/lifecycle-control-metrics.d.ts         |   30 +
 scripts/lib/lifecycle-control-metrics.mjs          |   66 +
 scripts/lib/local-ci-selection.d.ts                |   19 +
 scripts/lib/local-ci-selection.mjs                 |  155 +-
 scripts/lib/local-verification-receipt.d.ts        |   26 +
 scripts/lib/local-verification-receipt.mjs         |   94 +
 scripts/lib/task-verification-contracts.d.ts       |   12 +
 scripts/lib/task-verification-contracts.mjs        |  166 ++
 scripts/lib/verification-benchmark.d.ts            |   30 +
 scripts/lib/verification-benchmark.mjs             |   36 +
 scripts/lib/verification-contract.d.ts             |   13 +
 scripts/lib/verification-contract.mjs              |  119 +
 scripts/lib/verification-scheduler.d.ts            |   35 +
 scripts/lib/verification-scheduler.mjs             |  107 +
 .../measure-v0.7.1-matched-cli-latency.mjs         |   34 +-
 .../measure-v0.7.1-supervisor-latency.mjs          |  193 +-
 .../qualification/release-qualification.test.mjs   |  114 +-
 scripts/release/check-package-node-runtime.mjs     |   13 +-
 tsconfig.base.json                                 |    1 +
 .../docs/developer/verification-contract.png       |  Bin 0 -> 59695 bytes
 website/static/img/social/manifest.json            |    8 +
 118 files changed, 10784 insertions(+), 2238 deletions(-)
```

</details>
