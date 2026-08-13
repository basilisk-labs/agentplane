# PR Review

Created: 2026-08-12T08:35:41.656Z

## Task

- Task: `202608112259-T3ZDDM`
- Title: Optimize the verification and test pipeline around one computed Verification Contract
- Status: DOING
- Branch: `task/202608112259-T3ZDDM/optimize-the-verification-and-test-pipeline-arou`
- Canonical task record: `.agentplane/tasks/202608112259-T3ZDDM/README.md`

## Verification

- State: ok
- Note: Exact-SHA local, hosted, provider, benchmark, and regression qualification passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-12T17:03:52.714Z
- Branch: task/202608112259-T3ZDDM/optimize-the-verification-and-test-pipeline-arou
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .github/workflows/ci.yml                           |   88 +-
 docs/developer/code-quality.mdx                    |    2 +
 docs/developer/verification-contract.mdx           |   81 +
 docs/user/cli-reference.generated.mdx              |    8 +-
 package.json                                       |    7 +-
 .../agentplane/src/backends/task-backend.test.ts   |   67 +
 .../shared/normalize-verification-contract.test.ts |   27 +
 .../shared/normalize-verification-contract.ts      |  171 ++
 .../src/backends/task-backend/shared/record.ts     |   12 +-
 .../agentplane/src/cli/local-ci-selection.test.ts  |   98 +-
 .../run-cli.core.hooks.pre-push-full-fast.test.ts  |   61 +
 .../run-cli.core.pr-flow.worktree-runtime.test.ts  |  250 +--
 .../src/cli/run-cli.core.task-advance.test.ts      |    2 +-
 .../src/cli/run-cli.core.task-run.test.ts          |    4 +-
 ...-cli.critical.agent-efficiency-baseline.test.ts |   29 +-
 .../agentplane/src/cli/test-routing-check.test.ts  |   79 +-
 .../src/cli/verification-contract.test.ts          |  313 +++
 .../src/commands/branch/work-start.materialize.ts  |   94 +-
 .../evaluator-episode.calibration.test.ts          |    8 +-
 .../evaluator-qualification-packet.test.ts         |   14 +-
 .../commands/evaluator/evaluator-review-usecase.ts |   26 +
 .../evaluator/evaluator-run.command.test.ts        |   17 +-
 .../evaluator/evaluator-runtime-evidence.test.ts   |   53 +-
 .../evaluator-verification-contract.test.ts        |   38 +
 .../evaluator/evaluator-verification-records.ts    |   11 +-
 .../commands/release/ci-workflow-contract.test.ts  |    7 +
 .../src/commands/release/github-ci-plan.test.ts    |  113 +-
 .../commands/release/release-ci-contract.test.ts   |   11 +-
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
 .../src/commands/task/verify-record-execute.ts     |   70 +-
 .../task/verify-record.durability.unit.test.ts     |   44 +-
 packages/agentplane/src/commands/verify.spec.ts    |    4 +-
 .../agentplane/src/runtime/task-routing/effects.ts |   37 +
 .../src/runtime/task-routing/observed-path.ts      |   67 +-
 .../src/runtime/task-routing/resolve.test.ts       |  208 ++
 .../agentplane/src/runtime/task-routing/resolve.ts |  124 +-
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
 scripts/checks/plan-github-ci.mjs                  |   45 +-
 scripts/checks/run-local-ci-group.mjs              |   72 +
 scripts/checks/run-local-ci.mjs                    |  252 ++-
 scripts/checks/run-pre-push-hook.mjs               |   17 +-
 scripts/checks/verify-reused-parent.mjs            |   50 +
 scripts/lib/github-ci-capabilities.d.ts            |   11 +
 scripts/lib/github-ci-capabilities.mjs             |   87 +-
 scripts/lib/installed-migration-matrix.mjs         |   22 +
 scripts/lib/lifecycle-control-metrics.d.ts         |   30 +
 scripts/lib/lifecycle-control-metrics.mjs          |   66 +
 scripts/lib/local-ci-selection.d.ts                |   19 +
 scripts/lib/local-ci-selection.mjs                 |  143 +-
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
 .../qualification/release-qualification.test.mjs   |   24 +-
 scripts/release/check-package-node-runtime.mjs     |   13 +-
 tsconfig.base.json                                 |    1 +
 .../docs/developer/verification-contract.png       |  Bin 0 -> 59695 bytes
 website/static/img/social/manifest.json            |    8 +
 113 files changed, 9358 insertions(+), 2183 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
