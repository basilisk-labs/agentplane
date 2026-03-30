---
id: "202603301739-E85308"
title: "Make recipes inventory freshness checks work in branch_pr task worktrees"
result_summary: "Merged via PR #49."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-30T17:40:10.894Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-30T17:47:58.349Z"
  updated_by: "CODER"
  note: "OK: bunx vitest run packages/agentplane/src/cli/generate-recipes-inventory-script.test.ts passed with 3/3 tests; node scripts/check-recipes-inventory-fresh.mjs succeeded in the branch_pr task worktree without a local agentplane-recipes checkout; git push origin task/202603301739-E85308/worktree-safe-recipes-check passed the full pre-push gate including docs:recipes:check, local fast CI, and critical CLI suites."
commit:
  hash: "93e8350b6fea4fe59927ab704346de6ff5008106"
  message: "fix(workflow): make recipes inventory checks branch_pr-worktree safe (#49)"
comments:
  -
    author: "CODER"
    body: "Start: implement worktree-safe recipes inventory freshness checks and regression coverage so unrelated branch_pr pushes stop failing on docs:recipes:check."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #49 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-03-30T17:41:21.017Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement worktree-safe recipes inventory freshness checks and regression coverage so unrelated branch_pr pushes stop failing on docs:recipes:check."
  -
    type: "verify"
    at: "2026-03-30T17:47:58.349Z"
    author: "CODER"
    state: "ok"
    note: "OK: bunx vitest run packages/agentplane/src/cli/generate-recipes-inventory-script.test.ts passed with 3/3 tests; node scripts/check-recipes-inventory-fresh.mjs succeeded in the branch_pr task worktree without a local agentplane-recipes checkout; git push origin task/202603301739-E85308/worktree-safe-recipes-check passed the full pre-push gate including docs:recipes:check, local fast CI, and critical CLI suites."
  -
    type: "status"
    at: "2026-03-30T17:53:46.505Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #49 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-03-30T17:53:46.511Z"
doc_updated_by: "INTEGRATOR"
description: "Pre-push in branch_pr task worktrees currently fails on docs:recipes:check because scripts/generate-recipes-inventory.mjs resolves agentplane-recipes strictly from process.cwd(), while the submodule is materialized only in the common base checkout. Add a worktree-safe source-root resolution and a focused regression test so unrelated CLI/code PRs can push without weakening the check."
sections:
  Summary: |-
    Make recipes inventory freshness checks work in branch_pr task worktrees
    
    Pre-push in branch_pr task worktrees currently fails on docs:recipes:check because scripts/generate-recipes-inventory.mjs resolves agentplane-recipes strictly from process.cwd(), while the submodule is materialized only in the common base checkout. Add a worktree-safe source-root resolution and a focused regression test so unrelated CLI/code PRs can push without weakening the check.
  Scope: |-
    - In scope: Pre-push in branch_pr task worktrees currently fails on docs:recipes:check because scripts/generate-recipes-inventory.mjs resolves agentplane-recipes strictly from process.cwd(), while the submodule is materialized only in the common base checkout. Add a worktree-safe source-root resolution and a focused regression test so unrelated CLI/code PRs can push without weakening the check.
    - Out of scope: unrelated refactors not required for "Make recipes inventory freshness checks work in branch_pr task worktrees".
  Plan: |-
    1. Reproduce the pre-push blocker in a branch_pr task worktree and isolate why docs:recipes:check cannot see agentplane-recipes.
    2. Implement worktree-safe recipes source-root resolution without weakening the freshness check semantics.
    3. Add a focused regression test that exercises fallback to the common repo root when the task worktree does not materialize the submodule.
    4. Verify the targeted test and the docs:recipes:check path, then republish the previously blocked 9ZMFDY branch.
  Verify Steps: |-
    1. Run the focused regression test for recipes inventory path resolution. Expected: it passes and proves fallback to the common repo root when the task worktree lacks agentplane-recipes.
    2. Run `node scripts/check-recipes-inventory-fresh.mjs` from the task worktree after the fix. Expected: it succeeds without requiring agentplane-recipes to exist inside that worktree.
    3. Run `git push origin task/202603301739-E85308/worktree-safe-recipes-check` from the fixed task worktree. Expected: the standard pre-push gate succeeds end-to-end and no longer fails on recipes inventory freshness.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-30T17:47:58.349Z — VERIFY — ok
    
    By: CODER
    
    Note: OK: bunx vitest run packages/agentplane/src/cli/generate-recipes-inventory-script.test.ts passed with 3/3 tests; node scripts/check-recipes-inventory-fresh.mjs succeeded in the branch_pr task worktree without a local agentplane-recipes checkout; git push origin task/202603301739-E85308/worktree-safe-recipes-check passed the full pre-push gate including docs:recipes:check, local fast CI, and critical CLI suites.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T17:47:44.701Z, excerpt_hash=sha256:fd89060170fe47b20babac0224d3b2e35dd983df5eb2c11c3e84538b79445386
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make recipes inventory freshness checks work in branch_pr task worktrees

Pre-push in branch_pr task worktrees currently fails on docs:recipes:check because scripts/generate-recipes-inventory.mjs resolves agentplane-recipes strictly from process.cwd(), while the submodule is materialized only in the common base checkout. Add a worktree-safe source-root resolution and a focused regression test so unrelated CLI/code PRs can push without weakening the check.

## Scope

- In scope: Pre-push in branch_pr task worktrees currently fails on docs:recipes:check because scripts/generate-recipes-inventory.mjs resolves agentplane-recipes strictly from process.cwd(), while the submodule is materialized only in the common base checkout. Add a worktree-safe source-root resolution and a focused regression test so unrelated CLI/code PRs can push without weakening the check.
- Out of scope: unrelated refactors not required for "Make recipes inventory freshness checks work in branch_pr task worktrees".

## Plan

1. Reproduce the pre-push blocker in a branch_pr task worktree and isolate why docs:recipes:check cannot see agentplane-recipes.
2. Implement worktree-safe recipes source-root resolution without weakening the freshness check semantics.
3. Add a focused regression test that exercises fallback to the common repo root when the task worktree does not materialize the submodule.
4. Verify the targeted test and the docs:recipes:check path, then republish the previously blocked 9ZMFDY branch.

## Verify Steps

1. Run the focused regression test for recipes inventory path resolution. Expected: it passes and proves fallback to the common repo root when the task worktree lacks agentplane-recipes.
2. Run `node scripts/check-recipes-inventory-fresh.mjs` from the task worktree after the fix. Expected: it succeeds without requiring agentplane-recipes to exist inside that worktree.
3. Run `git push origin task/202603301739-E85308/worktree-safe-recipes-check` from the fixed task worktree. Expected: the standard pre-push gate succeeds end-to-end and no longer fails on recipes inventory freshness.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-30T17:47:58.349Z — VERIFY — ok

By: CODER

Note: OK: bunx vitest run packages/agentplane/src/cli/generate-recipes-inventory-script.test.ts passed with 3/3 tests; node scripts/check-recipes-inventory-fresh.mjs succeeded in the branch_pr task worktree without a local agentplane-recipes checkout; git push origin task/202603301739-E85308/worktree-safe-recipes-check passed the full pre-push gate including docs:recipes:check, local fast CI, and critical CLI suites.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T17:47:44.701Z, excerpt_hash=sha256:fd89060170fe47b20babac0224d3b2e35dd983df5eb2c11c3e84538b79445386

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
