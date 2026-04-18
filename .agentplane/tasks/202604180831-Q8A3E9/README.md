---
id: "202604180831-Q8A3E9"
title: "Make cleanup merged idempotent for partially removed task branches"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "workflow"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-18T08:33:54.466Z"
  updated_by: "CODER"
  note: "cleanup merged now delegates local branch/worktree teardown to the shared merged-branch helper, so already-removed local branches are treated as idempotent success instead of E_IO; merged-branch-cleanup.unit, targeted cleanup-merged CLI regression, lint, and typecheck passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: make cleanup merged tolerate already-removed local branches after it successfully tears down the corresponding merged worktree, and prove the idempotent path with focused regression coverage."
events:
  -
    type: "status"
    at: "2026-04-18T08:32:33.759Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make cleanup merged tolerate already-removed local branches after it successfully tears down the corresponding merged worktree, and prove the idempotent path with focused regression coverage."
  -
    type: "verify"
    at: "2026-04-18T08:33:54.466Z"
    author: "CODER"
    state: "ok"
    note: "cleanup merged now delegates local branch/worktree teardown to the shared merged-branch helper, so already-removed local branches are treated as idempotent success instead of E_IO; merged-branch-cleanup.unit, targeted cleanup-merged CLI regression, lint, and typecheck passed."
doc_version: 3
doc_updated_at: "2026-04-18T08:33:54.469Z"
doc_updated_by: "CODER"
description: "Handle the branch_pr cleanup case where the merged task worktree was already removed or the local branch disappeared before cleanup finishes. cleanup merged should treat already-missing local refs as a no-op success instead of surfacing E_IO."
sections:
  Summary: |-
    Make cleanup merged idempotent for partially removed task branches
    
    Handle the branch_pr cleanup case where the merged task worktree was already removed or the local branch disappeared before cleanup finishes. cleanup merged should treat already-missing local refs as a no-op success instead of surfacing E_IO.
  Scope: |-
    - In scope: Handle the branch_pr cleanup case where the merged task worktree was already removed or the local branch disappeared before cleanup finishes. cleanup merged should treat already-missing local refs as a no-op success instead of surfacing E_IO.
    - Out of scope: unrelated refactors not required for "Make cleanup merged idempotent for partially removed task branches".
  Plan: "1. Reproduce the partially removed branch_pr cleanup path where the worktree is already gone or the local branch disappears before cleanup completes. 2. Make cleanup merged and the shared merged-branch helper treat already-missing local refs as idempotent success instead of E_IO. 3. Verify with focused merged-branch cleanup tests and the cleanup-merged CLI regression path."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-18T08:33:54.466Z — VERIFY — ok
    
    By: CODER
    
    Note: cleanup merged now delegates local branch/worktree teardown to the shared merged-branch helper, so already-removed local branches are treated as idempotent success instead of E_IO; merged-branch-cleanup.unit, targeted cleanup-merged CLI regression, lint, and typecheck passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T08:32:33.770Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make cleanup merged idempotent for partially removed task branches

Handle the branch_pr cleanup case where the merged task worktree was already removed or the local branch disappeared before cleanup finishes. cleanup merged should treat already-missing local refs as a no-op success instead of surfacing E_IO.

## Scope

- In scope: Handle the branch_pr cleanup case where the merged task worktree was already removed or the local branch disappeared before cleanup finishes. cleanup merged should treat already-missing local refs as a no-op success instead of surfacing E_IO.
- Out of scope: unrelated refactors not required for "Make cleanup merged idempotent for partially removed task branches".

## Plan

1. Reproduce the partially removed branch_pr cleanup path where the worktree is already gone or the local branch disappears before cleanup completes. 2. Make cleanup merged and the shared merged-branch helper treat already-missing local refs as idempotent success instead of E_IO. 3. Verify with focused merged-branch cleanup tests and the cleanup-merged CLI regression path.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-18T08:33:54.466Z — VERIFY — ok

By: CODER

Note: cleanup merged now delegates local branch/worktree teardown to the shared merged-branch helper, so already-removed local branches are treated as idempotent success instead of E_IO; merged-branch-cleanup.unit, targeted cleanup-merged CLI regression, lint, and typecheck passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T08:32:33.770Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
