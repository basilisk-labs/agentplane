---
id: "202604091725-G6QE2N"
title: "Let duplicate closure load task artifacts from task worktrees"
result_summary: "Merged via PR #212."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T18:04:14.773Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T18:07:59.008Z"
  updated_by: "CODER"
  note: "Verified that task close-duplicate hydrates the missing duplicate README from the task worktree or branch fallback, with targeted branch_pr regression coverage and eslint clean."
commit:
  hash: "58ca7a8a1bb39de51633500e1b6eff9f2436ce3c"
  message: "workflow: Let duplicate closure load task artifacts from task worktrees (G6QE2N) (#212)"
comments:
  -
    author: "CODER"
    body: "Start: let duplicate closure recover the task README from the task branch or worktree when the base checkout has not materialized the task artifacts yet."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #212 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-09T18:05:01.801Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: let duplicate closure recover the task README from the task branch or worktree when the base checkout has not materialized the task artifacts yet."
  -
    type: "verify"
    at: "2026-04-09T18:07:59.008Z"
    author: "CODER"
    state: "ok"
    note: "Verified that task close-duplicate hydrates the missing duplicate README from the task worktree or branch fallback, with targeted branch_pr regression coverage and eslint clean."
  -
    type: "status"
    at: "2026-04-09T18:28:18.690Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #212 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-09T18:28:18.695Z"
doc_updated_by: "INTEGRATOR"
description: "Allow branch_pr duplicate-closure bookkeeping commands to resolve task artifacts from task worktrees or materialize them deterministically when the base checkout lacks .agentplane/tasks/<id>/README.md."
sections:
  Summary: |-
    Let duplicate closure load task artifacts from task worktrees
    
    Allow branch_pr duplicate-closure bookkeeping commands to resolve task artifacts from task worktrees or materialize them deterministically when the base checkout lacks .agentplane/tasks/<id>/README.md.
  Scope: |-
    - In scope: Allow branch_pr duplicate-closure bookkeeping commands to resolve task artifacts from task worktrees or materialize them deterministically when the base checkout lacks .agentplane/tasks/<id>/README.md.
    - Out of scope: unrelated refactors not required for "Let duplicate closure load task artifacts from task worktrees".
  Plan: "1. Reproduce duplicate closure when the base checkout lacks .agentplane/tasks/<id>/README.md but the task branch/worktree still has the task artifacts. 2. Teach duplicate closure to recover the task README from the active task branch or worktree instead of failing with ENOENT. 3. Add regression coverage for branch_pr duplicate closure fallback and verify with targeted tests."
  Verify Steps: |-
    1. Remove the duplicate task README from the base checkout while keeping the task worktree copy present. Expected: task close-duplicate still succeeds by hydrating the README from the task worktree or branch fallback.
    2. Run the targeted duplicate-close regression in run-cli.core.tasks.test.ts. Expected: the base-missing/worktree-present scenario passes.
    3. Lint the touched duplicate-close command and task CLI test files. Expected: eslint exits 0 for the modified files.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T18:07:59.008Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified that task close-duplicate hydrates the missing duplicate README from the task worktree or branch fallback, with targeted branch_pr regression coverage and eslint clean.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T18:07:33.828Z, excerpt_hash=sha256:f13a0fe66235a5a9e6dad2f3e788068ecec9d6a5be4b9e17b0851d52b4c3aaf2
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Let duplicate closure load task artifacts from task worktrees

Allow branch_pr duplicate-closure bookkeeping commands to resolve task artifacts from task worktrees or materialize them deterministically when the base checkout lacks .agentplane/tasks/<id>/README.md.

## Scope

- In scope: Allow branch_pr duplicate-closure bookkeeping commands to resolve task artifacts from task worktrees or materialize them deterministically when the base checkout lacks .agentplane/tasks/<id>/README.md.
- Out of scope: unrelated refactors not required for "Let duplicate closure load task artifacts from task worktrees".

## Plan

1. Reproduce duplicate closure when the base checkout lacks .agentplane/tasks/<id>/README.md but the task branch/worktree still has the task artifacts. 2. Teach duplicate closure to recover the task README from the active task branch or worktree instead of failing with ENOENT. 3. Add regression coverage for branch_pr duplicate closure fallback and verify with targeted tests.

## Verify Steps

1. Remove the duplicate task README from the base checkout while keeping the task worktree copy present. Expected: task close-duplicate still succeeds by hydrating the README from the task worktree or branch fallback.
2. Run the targeted duplicate-close regression in run-cli.core.tasks.test.ts. Expected: the base-missing/worktree-present scenario passes.
3. Lint the touched duplicate-close command and task CLI test files. Expected: eslint exits 0 for the modified files.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T18:07:59.008Z — VERIFY — ok

By: CODER

Note: Verified that task close-duplicate hydrates the missing duplicate README from the task worktree or branch fallback, with targeted branch_pr regression coverage and eslint clean.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T18:07:33.828Z, excerpt_hash=sha256:f13a0fe66235a5a9e6dad2f3e788068ecec9d6a5be4b9e17b0851d52b4c3aaf2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
