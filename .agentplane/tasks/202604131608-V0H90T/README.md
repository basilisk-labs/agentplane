---
id: "202604131608-V0H90T"
title: "Allow post-merge cleanup under stale-dist guard"
result_summary: "Merged via PR #285."
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
  state: "approved"
  updated_at: "2026-04-13T16:09:04.039Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-13T16:11:39.238Z"
  updated_by: "CODER"
  note: "Verified: stale-dist policy now allows hooks run post-merge in warn-and-run mode, targeted stale-dist and hook cleanup suites pass, and manual cleanup semantics stay unchanged outside the managed hook path."
commit:
  hash: "aad7ccac4cbdeafe497f6d5521f6b3ea7cf59b31"
  message: "Allow post-merge cleanup under stale-dist guard (V0H90T)"
comments:
  -
    author: "CODER"
    body: "Start: allow the managed post-merge hook to run under stale-dist warn-and-run semantics, preserve strict manual cleanup behavior, and verify local merge cleanup stays automatic on base sync."
events:
  -
    type: "status"
    at: "2026-04-13T16:09:25.027Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: allow the managed post-merge hook to run under stale-dist warn-and-run semantics, preserve strict manual cleanup behavior, and verify local merge cleanup stays automatic on base sync."
  -
    type: "verify"
    at: "2026-04-13T16:11:39.238Z"
    author: "CODER"
    state: "ok"
    note: "Verified: stale-dist policy now allows hooks run post-merge in warn-and-run mode, targeted stale-dist and hook cleanup suites pass, and manual cleanup semantics stay unchanged outside the managed hook path."
  -
    type: "status"
    at: "2026-04-13T16:16:30Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Hosted PR #285 merged on GitHub main; task projection reconciled from hosted PR artifacts."
doc_version: 3
doc_updated_at: "2026-04-13T16:16:30Z"
doc_updated_by: "INTEGRATOR"
description: "Let repo-local post-merge hooks run in warn-and-run mode under stale-dist so merged task branches/worktrees are pruned automatically after base sync."
sections:
  Summary: |-
    Allow post-merge cleanup under stale-dist guard
    
    Let repo-local post-merge hooks run in warn-and-run mode under stale-dist so merged task branches/worktrees are pruned automatically after base sync.
  Scope: |-
    - In scope: Let repo-local post-merge hooks run in warn-and-run mode under stale-dist so merged task branches/worktrees are pruned automatically after base sync.
    - Out of scope: unrelated refactors not required for "Allow post-merge cleanup under stale-dist guard".
  Plan: |-
    1. Allow stale-dist warn-and-run for `hooks run post-merge` so merge-time local cleanup is not blocked after base sync.
    2. Add coverage proving stale-dist warning still appears while the hook command executes.
    3. Verify the branch/worktree cleanup path and keep behavior strict for non-hook commands.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-13T16:11:39.238Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: stale-dist policy now allows hooks run post-merge in warn-and-run mode, targeted stale-dist and hook cleanup suites pass, and manual cleanup semantics stay unchanged outside the managed hook path.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T16:09:25.044Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Allow post-merge cleanup under stale-dist guard

Let repo-local post-merge hooks run in warn-and-run mode under stale-dist so merged task branches/worktrees are pruned automatically after base sync.

## Scope

- In scope: Let repo-local post-merge hooks run in warn-and-run mode under stale-dist so merged task branches/worktrees are pruned automatically after base sync.
- Out of scope: unrelated refactors not required for "Allow post-merge cleanup under stale-dist guard".

## Plan

1. Allow stale-dist warn-and-run for `hooks run post-merge` so merge-time local cleanup is not blocked after base sync.
2. Add coverage proving stale-dist warning still appears while the hook command executes.
3. Verify the branch/worktree cleanup path and keep behavior strict for non-hook commands.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-13T16:11:39.238Z — VERIFY — ok

By: CODER

Note: Verified: stale-dist policy now allows hooks run post-merge in warn-and-run mode, targeted stale-dist and hook cleanup suites pass, and manual cleanup semantics stay unchanged outside the managed hook path.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T16:09:25.044Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
