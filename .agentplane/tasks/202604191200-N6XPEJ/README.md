---
id: "202604191200-N6XPEJ"
title: "Fix pr open when remote branch already exists"
result_summary: "Merged via PR #477."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T12:04:07.673Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T12:10:22.023Z"
  updated_by: "CODER"
  note: "Validated branch_pr pr open against a published task branch with a simulated internal push failure; the command now reuses the matching remote head and continues to GitHub PR creation."
commit:
  hash: "7ed61866fbabd540b470b4ca4f1d405679f20550"
  message: "workflow: Fix pr open when remote branch already exists (N6XPEJ) (#477)"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the already-published branch path for pr open, patch the redundant push behavior, and verify that PR creation continues when origin already has the matching branch head."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #477 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-19T12:04:07.758Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the already-published branch path for pr open, patch the redundant push behavior, and verify that PR creation continues when origin already has the matching branch head."
  -
    type: "verify"
    at: "2026-04-19T12:10:22.023Z"
    author: "CODER"
    state: "ok"
    note: "Validated branch_pr pr open against a published task branch with a simulated internal push failure; the command now reuses the matching remote head and continues to GitHub PR creation."
  -
    type: "status"
    at: "2026-04-19T14:05:55.359Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #477 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-19T14:05:55.363Z"
doc_updated_by: "INTEGRATOR"
description: "Make pr open tolerate an already-published branch and continue PR creation when remote HEAD already matches the local branch, instead of failing on an unnecessary internal push path."
sections:
  Summary: |-
    Fix pr open when remote branch already exists
    
    Make pr open tolerate an already-published branch and continue PR creation when remote HEAD already matches the local branch, instead of failing on an unnecessary internal push path.
  Scope: |-
    - In scope: Make pr open tolerate an already-published branch and continue PR creation when remote HEAD already matches the local branch, instead of failing on an unnecessary internal push path.
    - Out of scope: unrelated refactors not required for "Fix pr open when remote branch already exists".
  Plan: |-
    1. Implement the change for "Fix pr open when remote branch already exists".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "Fix pr open when remote branch already exists". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T12:10:22.023Z — VERIFY — ok
    
    By: CODER
    
    Note: Validated branch_pr pr open against a published task branch with a simulated internal push failure; the command now reuses the matching remote head and continues to GitHub PR creation.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T12:04:07.788Z, excerpt_hash=sha256:6d0568e0688a25a069c1e50a6037fa73435a3c5c2aaeafd4d638db4d236d31a8
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: pr open always retried git push before remote PR creation, even when origin already had the same branch head.
      Impact: A redundant push failure blocked PR creation and forced a manual sync-only plus gh fallback route.
      Resolution: Compare the local branch tip to the remote push target after a publish failure, accept an exact match, and cover it with a regression test.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Fix pr open when remote branch already exists

Make pr open tolerate an already-published branch and continue PR creation when remote HEAD already matches the local branch, instead of failing on an unnecessary internal push path.

## Scope

- In scope: Make pr open tolerate an already-published branch and continue PR creation when remote HEAD already matches the local branch, instead of failing on an unnecessary internal push path.
- Out of scope: unrelated refactors not required for "Fix pr open when remote branch already exists".

## Plan

1. Implement the change for "Fix pr open when remote branch already exists".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "Fix pr open when remote branch already exists". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T12:10:22.023Z — VERIFY — ok

By: CODER

Note: Validated branch_pr pr open against a published task branch with a simulated internal push failure; the command now reuses the matching remote head and continues to GitHub PR creation.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T12:04:07.788Z, excerpt_hash=sha256:6d0568e0688a25a069c1e50a6037fa73435a3c5c2aaeafd4d638db4d236d31a8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: pr open always retried git push before remote PR creation, even when origin already had the same branch head.
  Impact: A redundant push failure blocked PR creation and forced a manual sync-only plus gh fallback route.
  Resolution: Compare the local branch tip to the remote push target after a publish failure, accept an exact match, and cover it with a regression test.
  Promotion: incident-candidate
  Fixability: external
