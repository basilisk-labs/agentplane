---
id: "202603301739-E85308"
title: "Make recipes inventory freshness checks work in branch_pr task worktrees"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement worktree-safe recipes inventory freshness checks and regression coverage so unrelated branch_pr pushes stop failing on docs:recipes:check."
events:
  -
    type: "status"
    at: "2026-03-30T17:41:21.017Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement worktree-safe recipes inventory freshness checks and regression coverage so unrelated branch_pr pushes stop failing on docs:recipes:check."
doc_version: 3
doc_updated_at: "2026-03-30T17:41:21.018Z"
doc_updated_by: "CODER"
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
    3. Re-run `git push origin task/202603301721-9ZMFDY/lock-help-routing-contracts` from the blocked task worktree. Expected: pre-push no longer fails on recipes inventory freshness.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
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
3. Re-run `git push origin task/202603301721-9ZMFDY/lock-help-routing-contracts` from the blocked task worktree. Expected: pre-push no longer fails on recipes inventory freshness.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
