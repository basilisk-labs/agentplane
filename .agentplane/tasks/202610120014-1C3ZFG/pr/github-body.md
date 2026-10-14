Task: `202610120014-1C3ZFG`
Title: Integrate reviewed XTX M2 and S8 nine-path corrections on canonical main
Canonical task record: `.agentplane/tasks/202610120014-1C3ZFG/README.md`

## Summary

Integrate reviewed XTX M2 and S8 nine-path corrections on canonical main

Integrate only the reviewed nine source deltas from XTX5M8 commit 767e460334dd0f3739bea997265c141d85d5ad74, M8349M commit 93438ee27f258e8a13c3e55207e917d465c14462 and S8V2S8 commit 99eb5f28ef4d5d24268bb3a1e2525a41be14732b onto canonical main d886917970bc0724b419074b7d575d47d9c95c1b. Use selected9-review-only-v2.patch SHA256 df0e7e7847bc31a65e3f3c6a9a299b1c6c4b2f203f4902bd02220ecabff708ef and preflight-plan-v2.json pinned in the external AP9 preparation directory. Preserve current hook readiness and taskIds reconciliation. Do not copy donor task or unrelated baseline files. Require fresh correctly routed affected suites, explicit cli-core PR-open checks, typecheck and native ci:local:full before integration; require distinct source/EVAL and hosted exact-SHA evidence before canonical delivery. Do not claim old failed component final receipts passed. Dependency installation must use own isolated aliases and frozen locks. Full outer deadline must exceed the actual native deadline (9000s currently); cap/free-floor remain bounded and heavy checks serialized. 7GA recovery-evidence two-path delivery is a separate open compatibility/admission gate; this task has only nine source roots and does not claim complete AP or Factory release readiness.

## Scope

- In scope: Integrate only the reviewed nine source deltas from XTX5M8 commit 767e460334dd0f3739bea997265c141d85d5ad74, M8349M commit 93438ee27f258e8a13c3e55207e917d465c14462 and S8V2S8 commit 99eb5f28ef4d5d24268bb3a1e2525a41be14732b onto canonical main d886917970bc0724b419074b7d575d47d9c95c1b. Use selected9-review-only-v2.patch SHA256 df0e7e7847bc31a65e3f3c6a9a299b1c6c4b2f203f4902bd02220ecabff708ef and preflight-plan-v2.json pinned in the external AP9 preparation directory. Preserve current hook readiness and taskIds reconciliation. Do not copy donor task or unrelated baseline files. Require fresh correctly routed affected suites, explicit cli-core PR-open checks, typecheck and native ci:local:full before integration; require distinct source/EVAL and hosted exact-SHA evidence before canonical delivery. Do not claim old failed component final receipts passed. Dependency installation must use own isolated aliases and frozen locks. Full outer deadline must exceed the actual native deadline (9000s currently); cap/free-floor remain bounded and heavy checks serialized. 7GA recovery-evidence two-path delivery is a separate open compatibility/admission gate; this task has only nine source roots and does not claim complete AP or Factory release readiness.
- Out of scope: unrelated refactors not required for "Integrate reviewed XTX M2 and S8 nine-path corrections on canonical main".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-14T12:46:39.917Z
- Branch: task/202610120014-1C3ZFG/integrate-reviewed-xtx-m2-and-s8-nine-path-corre
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...run-cli.core.pr-flow.pr-open.validation.test.ts |  426 +++++++
 .../impl/commands.commit-non-close.unit.test.ts    |  161 ++-
 .../src/commands/guard/impl/commit-refresh.ts      |    3 +-
 .../agentplane/src/commands/guard/impl/commit.ts   |    1 +
 packages/agentplane/src/commands/pr/open.ts        |   24 +
 .../direct-task-verification.qualification.test.ts |  115 +-
 .../commands/task/direct-task-verification.test.ts |    8 +-
 .../src/commands/task/direct-task-verification.ts  |   11 +-
 .../src/commands/task/kernel-exchange.test.ts      |   27 +-
 .../src/commands/task/kernel-exchange.ts           |    3 +
 .../commands/task/kernel-recovery-evidence.test.ts | 1116 ++++++++++++------
 .../src/commands/task/kernel-recovery-evidence.ts  |  215 +++-
 .../commands/task/kernel-rework-lineage.test.ts    | 1180 +++++++++++---------
 .../src/commands/task/kernel-rework-lineage.ts     |  112 +-
 .../src/commands/task/kernel-rework-proof.test.ts  |   27 +-
 .../commands/task/kernel-scope-replan-inputs.ts    |  237 ++++
 .../src/runner/process-supervision.test.ts         |  151 ++-
 .../src/runner/process-supervision/process-tree.ts |   84 +-
 .../src/runner/process-supervision/run.ts          |   57 +-
 .../process-supervision/timeout-controller.ts      |   23 +-
 packages/core/src/tasks/task-kernel/index.ts       |    1 +
 .../src/tasks/task-kernel/kernel-replan.test.ts    |  316 +++++-
 packages/core/src/tasks/task-kernel/kernel.ts      |   28 +-
 .../tasks/task-kernel/replan-work-items.test.ts    |  479 ++++++++
 .../src/tasks/task-kernel/replan-work-items.ts     |  300 +++++
 25 files changed, 3976 insertions(+), 1129 deletions(-)
```

</details>
