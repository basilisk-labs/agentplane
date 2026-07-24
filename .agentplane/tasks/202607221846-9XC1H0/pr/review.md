# PR Review

Created: 2026-07-23T18:45:27.072Z

## Task

- Task: `202607221846-9XC1H0`
- Title: Enforce role-scoped sandboxes and actual write boundaries
- Status: DONE
- Branch: `task/202607221846-9XC1H0/enforce-role-scoped-sandboxes-and-actual-write-b`
- Canonical task record: `.agentplane/tasks/202607221846-9XC1H0/README.md`

## Verification

- State: ok
- Note: PASS at f161a6e56: RF-03 sandbox/write-boundary behavior and reworked lifecycle authority are verified. Checks passed: bun run typecheck; bun run ci:contract; bun run test:critical (71/71); bun run test:fast (425 files, 2659/2659); independent semantic suite (9 files, 50/50); active-claim reconciliation (4/4); git diff --check.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-23T18:45:49.697Z
- Branch: task/202607221846-9XC1H0/enforce-role-scoped-sandboxes-and-actual-write-b
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/WORKFLOW.md                            |    2 +-
 .agentplane/workflows/last-known-good.md           |    2 +-
 docs/developer/architecture.mdx                    |   38 +-
 docs/developer/blueprints.mdx                      |    8 +-
 docs/developer/local-context.mdx                   |    7 +
 docs/developer/modular-prompt-assembly.mdx         |   10 +-
 docs/developer/recipes-spec.mdx                    |   27 +-
 docs/developer/workflow-contract.mdx               |    4 +
 docs/internal/v0.7-refactor-plan.md                |    8 +
 docs/user/commands.mdx                             |   16 +-
 docs/user/configuration.mdx                        |   79 +-
 docs/user/local-context.mdx                        |    7 +-
 docs/user/setup.mdx                                |    4 +
 packages/agentplane/assets/RUNNER.md               |    5 +-
 .../src/backends/task-backend.revision-cas.test.ts |  217 ++
 .../agentplane/src/backends/task-backend.test.ts   |    3 +
 .../src/backends/task-backend/local-backend-doc.ts |  192 +-
 .../backends/task-backend/local-backend-write.ts   |  220 +-
 .../src/backends/task-backend/local-backend.ts     |    5 +-
 .../src/backends/task-backend/shared/normalize.ts  |    3 +
 .../src/cli/run-cli.core.task-run.test.ts          |  452 +++-
 ...-cli.critical.agent-efficiency-baseline.test.ts |   51 +-
 .../src/cli/run-cli/command-catalog/task.ts        |    7 +
 .../src/cli/run-cli/command-loaders/task.ts        |    4 +
 .../src/commands/context/issue-gates.unit.test.ts  |   10 +-
 .../src/commands/context/release-readiness.test.ts |   26 +-
 .../verify-task.maximum-assimilation.test.ts       |   18 +-
 .../verify-task.maximum-assimilation.unit.test.ts  |  278 +--
 .../agentplane/src/commands/guard/impl/allow.ts    |    8 +-
 .../src/commands/hermes/hermes-runtime.ts          |    1 +
 .../commands/release/release-ci-contract.test.ts   |    4 +-
 .../src/commands/shared/route-decision.ts          |    4 +
 .../src/commands/shared/task-handoff.test.ts       |   90 +-
 .../agentplane/src/commands/shared/task-handoff.ts |   31 +-
 .../src/commands/shared/task-store/store.ts        |   17 +-
 .../agentplane/src/commands/task/handoff.shared.ts |   75 +-
 .../src/commands/task/run-logs-follow.test.ts      |  215 ++
 .../src/commands/task/run-logs-follow.ts           |  180 ++
 .../src/commands/task/run-render.test.ts           |  220 ++
 .../agentplane/src/commands/task/run-render.ts     |  308 ++-
 .../agentplane/src/commands/task/run.command.ts    |  212 +-
 .../src/context/verify-task-policy.test.ts         |    4 +-
 .../agentplane/src/context/verify-task.testkit.ts  |   23 +-
 packages/agentplane/src/context/verify-task.ts     |  421 +---
 packages/agentplane/src/policy/evaluate.test.ts    |   15 +
 .../agentplane/src/policy/rules/protected-paths.ts |   10 +-
 packages/agentplane/src/runner/adapters/base.ts    |  109 +-
 .../src/runner/adapters/codex-preparation.ts       |  120 +-
 .../runner/adapters/codex-result-transport.test.ts |  330 +++
 .../src/runner/adapters/codex-result-transport.ts  |  318 +++
 .../src/runner/adapters/codex-security.test.ts     |  456 +++++
 .../agentplane/src/runner/adapters/codex.test.ts   |  527 +++--
 packages/agentplane/src/runner/adapters/codex.ts   |  102 +-
 .../src/runner/adapters/custom-preparation.ts      |  162 +-
 .../src/runner/adapters/custom-security.test.ts    |  411 ++++
 .../agentplane/src/runner/adapters/custom.test.ts  |  230 ++-
 packages/agentplane/src/runner/adapters/custom.ts  |    8 +-
 .../src/runner/adapters/execute-supervised.test.ts |  442 ++++
 .../src/runner/adapters/execute-supervised.ts      |  369 +++-
 .../src/runner/adapters/execution-control.test.ts  |   89 +
 .../src/runner/adapters/execution-control.ts       |  365 ++++
 .../adapters/execution-receipt-containment.ts      |  160 ++
 .../adapters/execution-receipt-observation.ts      |  213 ++
 .../adapters/execution-receipt-runtime-types.ts    |   19 +
 .../adapters/execution-receipt-runtime.test.ts     |  665 ++++++
 .../runner/adapters/execution-receipt-runtime.ts   |  247 ++-
 .../src/runner/adapters/prepared-input.ts          |  117 ++
 .../src/runner/adapters/recipe-run-profile.ts      |    5 +-
 .../src/runner/adapters/runtime-shared.ts          |    3 +-
 packages/agentplane/src/runner/artifacts.test.ts   |    2 +-
 packages/agentplane/src/runner/artifacts.ts        |  101 +-
 .../src/runner/execution-receipt.test.ts           |   81 +-
 .../agentplane/src/runner/execution-receipt.ts     |   34 +-
 .../agentplane/src/runner/observation/artifacts.ts |   13 +-
 .../protected-filesystem-capture-support.ts        |  441 ++++
 .../observation/protected-filesystem-capture.ts    |  332 +++
 .../observation/protected-filesystem-comparison.ts |  179 ++
 .../observation/protected-filesystem-types.ts      |   98 +
 .../observation/protected-filesystem.test.ts       |  425 ++++
 .../src/runner/observation/protected-filesystem.ts |    8 +
 packages/agentplane/src/runner/policy-decision.ts  |    3 +-
 .../process-supervision.process-tree.test.ts       |    4 +-
 .../src/runner/process-supervision.test.ts         |  437 +++-
 .../buffered-file-writer.test.ts                   |   55 +
 .../process-supervision/buffered-file-writer.ts    |   70 +-
 .../cancellation-controller.test.ts                |  115 ++
 .../process-supervision/cancellation-controller.ts |  164 ++
 .../src/runner/process-supervision/clock.test.ts   |   45 +
 .../src/runner/process-supervision/clock.ts        |   71 +
 .../process-supervision/process-tree.test.ts       |  157 ++
 .../src/runner/process-supervision/process-tree.ts |  232 ++-
 .../src/runner/process-supervision/run.ts          |  398 +++-
 .../src/runner/process-supervision/signals.test.ts |   29 +
 .../src/runner/process-supervision/signals.ts      |    8 +-
 .../src/runner/process-supervision/state.ts        |    9 +-
 .../termination-arbiter.test.ts                    |   32 +
 .../process-supervision/termination-arbiter.ts     |   36 +
 .../termination-arbitration.test.ts                |  161 ++
 .../process-supervision/timeout-controller.test.ts |   55 +
 .../process-supervision/timeout-controller.ts      |  192 +-
 .../runner/process-supervision/trace-session.ts    |  153 +-
 .../src/runner/result-manifest-artifacts.ts        |   66 +-
 .../src/runner/result-manifest-policy.ts           |    8 +-
 packages/agentplane/src/runner/result-manifest.ts  |    4 +-
 .../src/runner/run-directory-boundary.ts           |  220 ++
 .../src/runner/run-repository-compat.test.ts       |  289 +++
 .../agentplane/src/runner/run-repository-compat.ts |   56 +
 .../src/runner/run-repository-contract.ts          |  159 ++
 .../agentplane/src/runner/run-repository.test.ts   |  255 +++
 packages/agentplane/src/runner/run-repository.ts   |  460 ++++-
 .../agentplane/src/runner/sandbox-policy.test.ts   |  195 ++
 packages/agentplane/src/runner/sandbox-policy.ts   |  127 ++
 packages/agentplane/src/runner/stable-file.ts      |  209 ++
 packages/agentplane/src/runner/success-policy.ts   |   38 +-
 .../agentplane/src/runner/task-run-paths.test.ts   |  127 +-
 packages/agentplane/src/runner/task-run-paths.ts   |  133 +-
 .../src/runner/task-state-render-semantic.ts       |   96 +
 .../src/runner/task-state-render.test.ts           |  228 ++-
 .../agentplane/src/runner/task-state-render.ts     |  278 +--
 packages/agentplane/src/runner/task-state.test.ts  |  168 ++
 packages/agentplane/src/runner/task-state.ts       |   63 +-
 packages/agentplane/src/runner/trace-artifacts.ts  |   56 +-
 packages/agentplane/src/runner/types.ts            |   15 +-
 .../agentplane/src/runner/types/capabilities.ts    |   10 +
 packages/agentplane/src/runner/types/context.ts    |    9 +-
 packages/agentplane/src/runner/types/invocation.ts |   32 +
 packages/agentplane/src/runner/types/policy.ts     |   40 +
 packages/agentplane/src/runner/types/state.ts      |   10 +
 .../usecases/scenario-materialize-task.test.ts     |    1 +
 .../usecases/task-run-active-claim-authority.ts    |  136 ++
 .../task-run-active-claim-concurrency.test.ts      |  218 ++
 .../task-run-active-claim-reconciliation.test.ts   |  316 +++
 .../usecases/task-run-active-claim-record.ts       |  121 ++
 .../task-run-active-claim-recovery-lease.ts        |  490 +++++
 .../usecases/task-run-active-claim-runtime.ts      |  421 ++++
 .../runner/usecases/task-run-active-claim.test.ts  |  973 +++++++++
 .../usecases/task-run-active-claim.testkit.ts      |  222 ++
 .../src/runner/usecases/task-run-active-claim.ts   |  589 ++++++
 .../src/runner/usecases/task-run-authority.ts      |  167 ++
 .../task-run-blueprint-plan.security.test.ts       |   58 +
 .../src/runner/usecases/task-run-blueprint-plan.ts |   39 +-
 .../task-run-bootstrap.result-examples.test.ts     |   22 +
 .../src/runner/usecases/task-run-bootstrap.ts      |   18 +-
 .../runner/usecases/task-run-cancel-orphaned.ts    |  185 ++
 .../usecases/task-run-cancel-prepared-recovery.ts  |  141 ++
 .../runner/usecases/task-run-cancel-prepared.ts    |  156 ++
 .../usecases/task-run-context.integration.test.ts  |  518 +++++
 .../src/runner/usecases/task-run-inspect.test.ts   |   42 +
 .../src/runner/usecases/task-run-inspect.ts        |  264 ++-
 .../usecases/task-run-lifecycle-cancel.test.ts     |  995 +++++++++
 .../usecases/task-run-lifecycle-cancel.testkit.ts  |   57 +
 .../runner/usecases/task-run-lifecycle-cancel.ts   |  574 ++++--
 .../task-run-lifecycle-replay-provenance.test.ts   |  255 +++
 .../task-run-lifecycle-replay-security.test.ts     |  585 ++++++
 .../runner/usecases/task-run-lifecycle-replay.ts   |  386 ++--
 .../runner/usecases/task-run-lifecycle-shared.ts   |  283 ++-
 .../src/runner/usecases/task-run-lifecycle.test.ts |  822 +++++---
 .../runner/usecases/task-run-lifecycle.testkit.ts  |  125 ++
 ...task-run-recipe-write-scope.integration.test.ts |  255 +++
 .../usecases/task-run-recovery-lease-runtime.ts    |   78 +
 .../src/runner/usecases/task-run-replay-anchor.ts  |   24 +
 .../agentplane/src/runner/usecases/task-run.ts     |  396 +++-
 packages/agentplane/src/runner/write-scope.test.ts |  191 ++
 packages/agentplane/src/runner/write-scope.ts      |  154 ++
 .../src/runtime/capabilities/resolve.test.ts       |   30 +
 .../agentplane/src/runtime/capabilities/runner.ts  |   35 +
 packages/agentplane/src/shared/git-path.test.ts    |   24 +
 packages/agentplane/src/shared/git-path.ts         |   34 +-
 packages/agentplane/src/shared/protected-paths.ts  |    8 +-
 packages/agentplane/src/workflow-runtime/build.ts  |    2 +-
 .../src/workflow-runtime/validate.test.ts          |    2 +-
 packages/agentplane/tsconfig.json                  |    2 +-
 .../schemas/task-readme-frontmatter.schema.json    |   10 +
 packages/core/schemas/tasks-export.schema.json     |   10 +
 packages/core/src/config/workflow-file.ts          |    2 +-
 packages/core/src/fs/atomic-write.test.ts          |  101 +-
 packages/core/src/fs/atomic-write.ts               |  191 +-
 packages/core/src/fs/index.ts                      |    2 +-
 packages/core/src/index.ts                         |   16 +-
 packages/core/src/runner/execution-receipt.test.ts |  670 +++++-
 packages/core/src/runner/execution-receipt.ts      |  405 +++-
 packages/core/src/schemas/index.ts                 |    7 +
 packages/core/src/tasks/index.ts                   |    7 +-
 .../core/src/tasks/task-artifact-schema.task.ts    |    1 +
 packages/core/src/tasks/task-readme-io.test.ts     |   38 +-
 packages/core/src/tasks/task-readme-io.ts          |  341 ++-
 packages/core/src/tasks/task-store.ts              |    1 +
 packages/core/src/tasks/tasks-export.ts            |    3 +
 packages/spec/examples/task-handoff.json           |    6 +-
 .../schemas/task-readme-frontmatter.schema.json    |   10 +
 packages/spec/schemas/tasks-export.schema.json     |   10 +
 packages/testkit/src/runner.ts                     |   26 +
 schemas/examples/execution-receipt-v1.valid.json   |    4 +-
 schemas/examples/execution-receipt-v2.valid.json   |  131 ++
 schemas/execution-receipt.schema.json              | 2163 +++++++++++++++-----
 schemas/task-readme-frontmatter.schema.json        |   10 +
 schemas/tasks-export.schema.json                   |   10 +
 scripts/baselines/knip-baseline.json               |   87 +-
 scripts/baselines/trust-boundary-violations.json   |    9 -
 .../baselines/v0.7-compatibility-candidate.json    |  191 +-
 .../check-compatibility-contract-baseline.mjs      |  178 +-
 scripts/checks/check-spec-examples.mjs             |   20 +
 scripts/generate/sync-schemas.mjs                  |    7 +
 website/static/llms-full.txt                       |   20 +-
 204 files changed, 27863 insertions(+), 3737 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
