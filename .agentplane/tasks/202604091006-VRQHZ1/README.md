---
id: "202604091006-VRQHZ1"
title: "Block branch_pr finish before base integration"
result_summary: "Guarded branch_pr finish on the base branch only."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "git"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T10:06:39.258Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T10:15:59.911Z"
  updated_by: "REVIEWER"
  note: "Focused vitest coverage for finish unit and lifecycle CLI paths passed; eslint passed on touched finish files; branch_pr finish now fails off-base and preserves task state."
commit:
  hash: "643aad9db4da385a1f9070153fdcaee15d20b32e"
  message: "🧩 VRQHZ1 task: guard branch_pr finish on base"
comments:
  -
    author: "CODER"
    body: "Start: add a branch_pr finish guard so premature close commits cannot ship task state or incident promotion from a task branch before base integration."
  -
    author: "INTEGRATOR"
    body: "Verified: branch_pr finish is now pinned to the base checkout, so premature DONE state and incident promotion cannot be emitted from task branches before integrate."
events:
  -
    type: "status"
    at: "2026-04-09T10:06:39.771Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a branch_pr finish guard so premature close commits cannot ship task state or incident promotion from a task branch before base integration."
  -
    type: "verify"
    at: "2026-04-09T10:15:59.911Z"
    author: "REVIEWER"
    state: "ok"
    note: "Focused vitest coverage for finish unit and lifecycle CLI paths passed; eslint passed on touched finish files; branch_pr finish now fails off-base and preserves task state."
  -
    type: "status"
    at: "2026-04-09T10:16:01.625Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: branch_pr finish is now pinned to the base checkout, so premature DONE state and incident promotion cannot be emitted from task branches before integrate."
doc_version: 3
doc_updated_at: "2026-04-09T10:16:01.626Z"
doc_updated_by: "INTEGRATOR"
description: "Refuse finish/close-commit on non-base branches in branch_pr so task-state and incidents promotion cannot ship from a task worktree before integrate."
sections:
  Summary: |-
    Block branch_pr finish before base integration
    
    Refuse finish/close-commit on non-base branches in branch_pr so task-state and incidents promotion cannot ship from a task worktree before integrate.
  Scope: |-
    - In scope: Refuse finish/close-commit on non-base branches in branch_pr so task-state and incidents promotion cannot ship from a task worktree before integrate.
    - Out of scope: unrelated refactors not required for "Block branch_pr finish before base integration".
  Plan: "1. Reproduce the unsafe branch_pr path where finish runs from a task branch before base integration. 2. Add an explicit branch/base guard in finish for branch_pr close paths with targeted tests and clear operator guidance. 3. Verify finish now blocks the premature path while direct workflow behavior stays unchanged."
  Verify Steps: |-
    1. Reproduce finish from a non-base branch in branch_pr mode. Expected: command fails with an explicit base-branch guidance message and does not mutate task state.
    2. Run focused finish command tests for the new guard. Expected: the guarded path fails while direct-mode or base-branch paths keep passing.
    3. Run touched lint/test checks. Expected: no regressions outside the guarded finish path.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T10:15:59.911Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Focused vitest coverage for finish unit and lifecycle CLI paths passed; eslint passed on touched finish files; branch_pr finish now fails off-base and preserves task state.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T10:06:39.784Z, excerpt_hash=sha256:3ead51df88fe448b037d5916ead8b95ad771accbe18410aadda6c9f485b999fa
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Block branch_pr finish before base integration

Refuse finish/close-commit on non-base branches in branch_pr so task-state and incidents promotion cannot ship from a task worktree before integrate.

## Scope

- In scope: Refuse finish/close-commit on non-base branches in branch_pr so task-state and incidents promotion cannot ship from a task worktree before integrate.
- Out of scope: unrelated refactors not required for "Block branch_pr finish before base integration".

## Plan

1. Reproduce the unsafe branch_pr path where finish runs from a task branch before base integration. 2. Add an explicit branch/base guard in finish for branch_pr close paths with targeted tests and clear operator guidance. 3. Verify finish now blocks the premature path while direct workflow behavior stays unchanged.

## Verify Steps

1. Reproduce finish from a non-base branch in branch_pr mode. Expected: command fails with an explicit base-branch guidance message and does not mutate task state.
2. Run focused finish command tests for the new guard. Expected: the guarded path fails while direct-mode or base-branch paths keep passing.
3. Run touched lint/test checks. Expected: no regressions outside the guarded finish path.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T10:15:59.911Z — VERIFY — ok

By: REVIEWER

Note: Focused vitest coverage for finish unit and lifecycle CLI paths passed; eslint passed on touched finish files; branch_pr finish now fails off-base and preserves task state.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T10:06:39.784Z, excerpt_hash=sha256:3ead51df88fe448b037d5916ead8b95ad771accbe18410aadda6c9f485b999fa

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
