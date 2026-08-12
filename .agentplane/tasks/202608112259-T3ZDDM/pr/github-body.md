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

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-12T08:35:41.656Z
- Branch: task/202608112259-T3ZDDM/optimize-the-verification-and-test-pipeline-arou
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/ci.yml                           |  86 +++-
 docs/developer/code-quality.mdx                    |   2 +
 docs/developer/verification-contract.mdx           |  77 +++
 package.json                                       |   2 +
 .../agentplane/src/backends/task-backend.test.ts   |  67 +++
 .../src/backends/task-backend/shared/record.ts     | 133 ++++-
 .../agentplane/src/cli/local-ci-selection.test.ts  |  71 ++-
 .../run-cli.core.hooks.pre-push-full-fast.test.ts  |  61 +++
 .../run-cli.core.pr-flow.worktree-runtime.test.ts  |  17 +-
 .../src/cli/verification-contract.test.ts          | 146 ++++++
 .../src/commands/branch/work-start.materialize.ts  |  92 +++-
 .../commands/release/ci-workflow-contract.test.ts  |   6 +
 .../src/commands/release/github-ci-plan.test.ts    |  97 +++-
 .../commands/shared/quality-review-target.test.ts  |  25 +
 .../src/commands/shared/quality-review-target.ts   |  18 +-
 .../shared/task-verification-input.test.ts         |  29 ++
 .../src/commands/shared/task-verification-input.ts |  19 +-
 .../commands/shared/task-verification-records.ts   |  10 +-
 .../agentplane/src/commands/task/brief-render.ts   |  13 +
 .../src/commands/task/verify-record-execute.ts     |   2 +
 .../src/runtime/task-routing/observed-path.ts      |  67 +--
 .../src/runtime/task-routing/resolve.test.ts       |  76 +++
 .../agentplane/src/runtime/task-routing/resolve.ts |  53 +-
 packages/core/package.json                         |   5 +
 .../schemas/task-readme-frontmatter.schema.json    | 544 +++++++++++++++++++--
 packages/core/schemas/tasks-export.schema.json     | 530 ++++++++++++++++++--
 packages/core/src/tasks/index.ts                   |  11 +
 .../core/src/tasks/task-artifact-schema.task.ts    |  47 +-
 packages/core/src/tasks/task-store.ts              |  33 ++
 .../src/tasks/verification-contract-kernel.d.ts    |  50 ++
 .../core/src/tasks/verification-contract-kernel.js | 205 ++++++++
 packages/core/src/tasks/verification-contract.ts   |  62 +++
 packages/core/tsup.config.ts                       |   1 +
 .../schemas/task-readme-frontmatter.schema.json    | 544 +++++++++++++++++++--
 packages/spec/schemas/tasks-export.schema.json     | 530 ++++++++++++++++++--
 schemas/task-readme-frontmatter.schema.json        | 544 +++++++++++++++++++--
 schemas/tasks-export.schema.json                   | 530 ++++++++++++++++++--
 scripts/README.md                                  |   2 +
 scripts/baselines/verification-contract-small.json |  20 +
 scripts/bench/measure-verification-contract.mjs    | 104 ++++
 scripts/checks/plan-github-ci.mjs                  |  45 +-
 scripts/checks/run-local-ci.mjs                    | 106 +++-
 scripts/checks/run-pre-push-hook.mjs               |  17 +-
 scripts/checks/verify-reused-parent.mjs            |  50 ++
 scripts/lib/github-ci-capabilities.d.ts            |  11 +
 scripts/lib/github-ci-capabilities.mjs             |  79 ++-
 scripts/lib/local-ci-selection.d.ts                |  19 +
 scripts/lib/local-ci-selection.mjs                 |  98 +++-
 scripts/lib/local-verification-receipt.d.ts        |  26 +
 scripts/lib/local-verification-receipt.mjs         |  94 ++++
 scripts/lib/task-verification-contracts.d.ts       |  12 +
 scripts/lib/task-verification-contracts.mjs        | 102 ++++
 scripts/lib/verification-contract.d.ts             |  13 +
 scripts/lib/verification-contract.mjs              |  65 +++
 scripts/lib/verification-scheduler.d.ts            |  33 ++
 scripts/lib/verification-scheduler.mjs             | 102 ++++
 scripts/release/check-package-node-runtime.mjs     |  13 +-
 57 files changed, 5344 insertions(+), 472 deletions(-)
```

</details>
