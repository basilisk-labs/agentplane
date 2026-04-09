---
id: "202604092006-BGDQEG"
title: "Prevent post-close PR artifact dirt after finish --close-commit"
result_summary: "Merged via PR #224; refreshed branch_pr close artifacts before staging and validated the fix by closing BKQG36 cleanly."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T20:29:08.944Z"
  updated_by: "INTEGRATOR"
  note: "Command: bun x vitest run packages/agentplane/src/commands/guard/impl/commands.unit.test.ts; Result: pass; Evidence: 20/20 tests passed, including close-path refresh ordering coverage. Scope: guard cmdCommit unit behavior. Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts -t \"finish --close-commit (creates deterministic close commit in the same command|succeeds on main in branch_pr mode|leaves branch_pr PR artifacts clean and verified on the base checkout)\"; Result: pass; Evidence: 4 tests passed, 23 skipped; the new branch_pr regression stayed green. Scope: finish close-commit lifecycle slice. Command: bun x eslint packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts; Result: pass; Evidence: eslint exited 0. Scope: touched implementation and tests. Command: agentplane finish 202604091956-BKQG36 --close-commit; Result: pass; Evidence: close commit d0d7752d0a7a completed and git status stayed clean afterward. Scope: real branch_pr rerun proving no post-close pr/* dirt remains on main."
commit:
  hash: "fada181c2a178d86bc3422438e0726ac155a85ab"
  message: "Prevent post-close PR artifact dirt after finish --close-commit (BGDQEG) (#224)"
comments:
  -
    author: "CODER"
    body: "Start: remove post-close pr artifact dirt from branch_pr finish so deterministic close commits leave the base checkout clean."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #224 merged on main, targeted unit/lifecycle checks passed, and BKQG36 finished on the fixed main checkout without leaving post-close pr/* dirt."
events:
  -
    type: "status"
    at: "2026-04-09T20:08:04.197Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove post-close pr artifact dirt from branch_pr finish so deterministic close commits leave the base checkout clean."
  -
    type: "verify"
    at: "2026-04-09T20:29:08.944Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/commands/guard/impl/commands.unit.test.ts; Result: pass; Evidence: 20/20 tests passed, including close-path refresh ordering coverage. Scope: guard cmdCommit unit behavior. Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts -t \"finish --close-commit (creates deterministic close commit in the same command|succeeds on main in branch_pr mode|leaves branch_pr PR artifacts clean and verified on the base checkout)\"; Result: pass; Evidence: 4 tests passed, 23 skipped; the new branch_pr regression stayed green. Scope: finish close-commit lifecycle slice. Command: bun x eslint packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts; Result: pass; Evidence: eslint exited 0. Scope: touched implementation and tests. Command: agentplane finish 202604091956-BKQG36 --close-commit; Result: pass; Evidence: close commit d0d7752d0a7a completed and git status stayed clean afterward. Scope: real branch_pr rerun proving no post-close pr/* dirt remains on main."
  -
    type: "status"
    at: "2026-04-09T20:29:16.254Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #224 merged on main, targeted unit/lifecycle checks passed, and BKQG36 finished on the fixed main checkout without leaving post-close pr/* dirt."
doc_version: 3
doc_updated_at: "2026-04-09T20:29:16.254Z"
doc_updated_by: "INTEGRATOR"
description: "Fix branch_pr finish so deterministic close commits do not leave .agentplane/tasks/<task-id>/pr/* tracked changes dirty after the commit completes."
sections:
  Summary: |-
    Prevent post-close PR artifact dirt after finish --close-commit
    
    Fix branch_pr finish so deterministic close commits do not leave .agentplane/tasks/<task-id>/pr/* tracked changes dirty after the commit completes.
  Scope: |-
    - In scope: Fix branch_pr finish so deterministic close commits do not leave .agentplane/tasks/<task-id>/pr/* tracked changes dirty after the commit completes.
    - Out of scope: unrelated refactors not required for "Prevent post-close PR artifact dirt after finish --close-commit".
  Plan: "1. Reproduce the post-finish dirt path in tests and confirm which post-commit refresh rewrites pr/* after the deterministic close commit. 2. Change the branch_pr close-commit flow so it does not dirty pr artifacts after the close commit completes, while preserving the needed task/PR metadata semantics. 3. Verify the touched finish/commit lifecycle slices, then use the fixed flow to finish BKQG36 cleanly."
  Verify Steps: |-
    1. Reproduce the branch_pr finish path that previously left `.agentplane/tasks/<task-id>/pr/*` dirty after `finish --close-commit`. Expected: the regression test fails before the fix and passes after it.
    2. Run the touched finish/commit lifecycle tests. Expected: finish still records DONE metadata and deterministic close commits without regressing existing branch_pr or direct-mode close behavior.
    3. Re-run the real reconcile flow for `202604091956-BKQG36`. Expected: `BKQG36` can be verified and finished without leaving tracked `pr/*` dirt on `main`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T20:29:08.944Z — VERIFY — ok
    
    By: INTEGRATOR
    
    Note: Command: bun x vitest run packages/agentplane/src/commands/guard/impl/commands.unit.test.ts; Result: pass; Evidence: 20/20 tests passed, including close-path refresh ordering coverage. Scope: guard cmdCommit unit behavior. Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts -t "finish --close-commit (creates deterministic close commit in the same command|succeeds on main in branch_pr mode|leaves branch_pr PR artifacts clean and verified on the base checkout)"; Result: pass; Evidence: 4 tests passed, 23 skipped; the new branch_pr regression stayed green. Scope: finish close-commit lifecycle slice. Command: bun x eslint packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts; Result: pass; Evidence: eslint exited 0. Scope: touched implementation and tests. Command: agentplane finish 202604091956-BKQG36 --close-commit; Result: pass; Evidence: close commit d0d7752d0a7a completed and git status stayed clean afterward. Scope: real branch_pr rerun proving no post-close pr/* dirt remains on main.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T20:08:04.204Z, excerpt_hash=sha256:0ab191be5bab3c4fb915b05932f9c220ef76c1a4a3566a3c62e2b971651ee6f1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prevent post-close PR artifact dirt after finish --close-commit

Fix branch_pr finish so deterministic close commits do not leave .agentplane/tasks/<task-id>/pr/* tracked changes dirty after the commit completes.

## Scope

- In scope: Fix branch_pr finish so deterministic close commits do not leave .agentplane/tasks/<task-id>/pr/* tracked changes dirty after the commit completes.
- Out of scope: unrelated refactors not required for "Prevent post-close PR artifact dirt after finish --close-commit".

## Plan

1. Reproduce the post-finish dirt path in tests and confirm which post-commit refresh rewrites pr/* after the deterministic close commit. 2. Change the branch_pr close-commit flow so it does not dirty pr artifacts after the close commit completes, while preserving the needed task/PR metadata semantics. 3. Verify the touched finish/commit lifecycle slices, then use the fixed flow to finish BKQG36 cleanly.

## Verify Steps

1. Reproduce the branch_pr finish path that previously left `.agentplane/tasks/<task-id>/pr/*` dirty after `finish --close-commit`. Expected: the regression test fails before the fix and passes after it.
2. Run the touched finish/commit lifecycle tests. Expected: finish still records DONE metadata and deterministic close commits without regressing existing branch_pr or direct-mode close behavior.
3. Re-run the real reconcile flow for `202604091956-BKQG36`. Expected: `BKQG36` can be verified and finished without leaving tracked `pr/*` dirt on `main`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T20:29:08.944Z — VERIFY — ok

By: INTEGRATOR

Note: Command: bun x vitest run packages/agentplane/src/commands/guard/impl/commands.unit.test.ts; Result: pass; Evidence: 20/20 tests passed, including close-path refresh ordering coverage. Scope: guard cmdCommit unit behavior. Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts -t "finish --close-commit (creates deterministic close commit in the same command|succeeds on main in branch_pr mode|leaves branch_pr PR artifacts clean and verified on the base checkout)"; Result: pass; Evidence: 4 tests passed, 23 skipped; the new branch_pr regression stayed green. Scope: finish close-commit lifecycle slice. Command: bun x eslint packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts; Result: pass; Evidence: eslint exited 0. Scope: touched implementation and tests. Command: agentplane finish 202604091956-BKQG36 --close-commit; Result: pass; Evidence: close commit d0d7752d0a7a completed and git status stayed clean afterward. Scope: real branch_pr rerun proving no post-close pr/* dirt remains on main.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T20:08:04.204Z, excerpt_hash=sha256:0ab191be5bab3c4fb915b05932f9c220ef76c1a4a3566a3c62e2b971651ee6f1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
