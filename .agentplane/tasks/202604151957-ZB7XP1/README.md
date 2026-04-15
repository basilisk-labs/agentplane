---
id: "202604151957-ZB7XP1"
title: "Make protected-main integrate a first-class handoff route"
status: "DOING"
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
  updated_at: "2026-04-15T19:57:51.613Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-15T20:06:35.077Z"
  updated_by: "CODER"
  note: "Protected-base integrate now persists a first-class route block and structured next-action diagnostics; schema/runtime validator, integrate cmd unit route, and live protected-main refusal regression all pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: turn the protected-main branch_pr integrate path into an explicit handoff/finalize route with canonical machine-readable state while preserving the no-local-mutation guarantee on the base branch."
events:
  -
    type: "status"
    at: "2026-04-15T19:58:14.451Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: turn the protected-main branch_pr integrate path into an explicit handoff/finalize route with canonical machine-readable state while preserving the no-local-mutation guarantee on the base branch."
  -
    type: "verify"
    at: "2026-04-15T20:06:35.077Z"
    author: "CODER"
    state: "ok"
    note: "Protected-base integrate now persists a first-class route block and structured next-action diagnostics; schema/runtime validator, integrate cmd unit route, and live protected-main refusal regression all pass."
doc_version: 3
doc_updated_at: "2026-04-15T20:06:35.080Z"
doc_updated_by: "CODER"
description: "Replace the current protected-base integrate refusal semantics with an explicit handoff/finalize route model so branch_pr integrate records canonical state transitions, operator next steps, and machine-readable finalize metadata instead of behaving like a near-merge that only errors."
sections:
  Summary: |-
    Make protected-main integrate a first-class handoff route
    
    Replace the current protected-base integrate refusal semantics with an explicit handoff/finalize route model so branch_pr integrate records canonical state transitions, operator next steps, and machine-readable finalize metadata instead of behaving like a near-merge that only errors.
  Scope: |-
    - In scope: Replace the current protected-base integrate refusal semantics with an explicit handoff/finalize route model so branch_pr integrate records canonical state transitions, operator next steps, and machine-readable finalize metadata instead of behaving like a near-merge that only errors.
    - Out of scope: unrelated refactors not required for "Make protected-main integrate a first-class handoff route".
  Plan: "1. Inspect the current protected-base integrate flow and define the missing first-class handoff/finalize state model; verify: one focused regression reproduces the current semantic gap. 2. Change only the protected-base branch_pr integrate route so it writes canonical handoff/finalize metadata and exposes a stable operator path instead of a near-merge refusal; verify: targeted tests assert machine-readable handoff state and preserve the no-local-mutation guarantee. 3. Exercise the route through the branch_pr lifecycle and land it via hosted merge/close; verify: the task reaches DONE on main and the final task artifacts show the protected-base handoff/finalize semantics explicitly."
  Verify Steps: |-
    1. Review the requested outcome for "Make protected-main integrate a first-class handoff route". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-15T20:06:35.077Z — VERIFY — ok
    
    By: CODER
    
    Note: Protected-base integrate now persists a first-class route block and structured next-action diagnostics; schema/runtime validator, integrate cmd unit route, and live protected-main refusal regression all pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T19:58:14.461Z, excerpt_hash=sha256:6c5512287a375c2e4977b7adbd9e8eccb7698cd49e2b605882bc7b3b114d416e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make protected-main integrate a first-class handoff route

Replace the current protected-base integrate refusal semantics with an explicit handoff/finalize route model so branch_pr integrate records canonical state transitions, operator next steps, and machine-readable finalize metadata instead of behaving like a near-merge that only errors.

## Scope

- In scope: Replace the current protected-base integrate refusal semantics with an explicit handoff/finalize route model so branch_pr integrate records canonical state transitions, operator next steps, and machine-readable finalize metadata instead of behaving like a near-merge that only errors.
- Out of scope: unrelated refactors not required for "Make protected-main integrate a first-class handoff route".

## Plan

1. Inspect the current protected-base integrate flow and define the missing first-class handoff/finalize state model; verify: one focused regression reproduces the current semantic gap. 2. Change only the protected-base branch_pr integrate route so it writes canonical handoff/finalize metadata and exposes a stable operator path instead of a near-merge refusal; verify: targeted tests assert machine-readable handoff state and preserve the no-local-mutation guarantee. 3. Exercise the route through the branch_pr lifecycle and land it via hosted merge/close; verify: the task reaches DONE on main and the final task artifacts show the protected-base handoff/finalize semantics explicitly.

## Verify Steps

1. Review the requested outcome for "Make protected-main integrate a first-class handoff route". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-15T20:06:35.077Z — VERIFY — ok

By: CODER

Note: Protected-base integrate now persists a first-class route block and structured next-action diagnostics; schema/runtime validator, integrate cmd unit route, and live protected-main refusal regression all pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T19:58:14.461Z, excerpt_hash=sha256:6c5512287a375c2e4977b7adbd9e8eccb7698cd49e2b605882bc7b3b114d416e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
