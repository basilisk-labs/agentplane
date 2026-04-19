---
id: "202604191200-J57Q9H"
title: "Split release prepublish into fast and heavy phases"
result_summary: "Merged via PR #482."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T13:20:13.926Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T13:22:57.262Z"
  updated_by: "CODER"
  note: "Split release prepublish into explicit fast and heavy phases, reordered the gate to run the fast payload validation before the expensive CI route, and added a regression that proves the heavy phase is skipped when the fast phase fails."
commit:
  hash: "c0f0cac41bc844eaf3ff587d01da47177d274bed"
  message: "release: Split release prepublish into fast and heavy phases (J57Q9H) (#482)"
comments:
  -
    author: "CODER"
    body: "Start: split release prepublish into explicit fast and heavy phases so release candidate/apply can fail early with a stable phase label before the expensive validation route begins."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #482 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-19T13:20:14.386Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split release prepublish into explicit fast and heavy phases so release candidate/apply can fail early with a stable phase label before the expensive validation route begins."
  -
    type: "verify"
    at: "2026-04-19T13:22:57.262Z"
    author: "CODER"
    state: "ok"
    note: "Split release prepublish into explicit fast and heavy phases, reordered the gate to run the fast payload validation before the expensive CI route, and added a regression that proves the heavy phase is skipped when the fast phase fails."
  -
    type: "status"
    at: "2026-04-19T14:21:30.184Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #482 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-19T14:21:30.190Z"
doc_updated_by: "INTEGRATOR"
description: "Break release:prepublish into explicit fast, test, and pack phases with machine-readable reports so release failures surface the blocking phase immediately instead of after one long opaque command."
sections:
  Summary: |-
    Split release prepublish into fast and heavy phases
    
    Break release:prepublish into explicit fast, test, and pack phases with machine-readable reports so release failures surface the blocking phase immediately instead of after one long opaque command.
  Scope: |-
    - In scope: Break release:prepublish into explicit fast, test, and pack phases with machine-readable reports so release failures surface the blocking phase immediately instead of after one long opaque command.
    - Out of scope: unrelated refactors not required for "Split release prepublish into fast and heavy phases".
  Plan: |-
    1. Implement the change for "Split release prepublish into fast and heavy phases".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "Split release prepublish into fast and heavy phases". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T13:22:57.262Z — VERIFY — ok
    
    By: CODER
    
    Note: Split release prepublish into explicit fast and heavy phases, reordered the gate to run the fast payload validation before the expensive CI route, and added a regression that proves the heavy phase is skipped when the fast phase fails.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T13:20:14.398Z, excerpt_hash=sha256:be04c3a3f455481e39224646fa8d0d118ade981f5712c4ac5a11ef14e82265b7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Split release prepublish into fast and heavy phases

Break release:prepublish into explicit fast, test, and pack phases with machine-readable reports so release failures surface the blocking phase immediately instead of after one long opaque command.

## Scope

- In scope: Break release:prepublish into explicit fast, test, and pack phases with machine-readable reports so release failures surface the blocking phase immediately instead of after one long opaque command.
- Out of scope: unrelated refactors not required for "Split release prepublish into fast and heavy phases".

## Plan

1. Implement the change for "Split release prepublish into fast and heavy phases".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "Split release prepublish into fast and heavy phases". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T13:22:57.262Z — VERIFY — ok

By: CODER

Note: Split release prepublish into explicit fast and heavy phases, reordered the gate to run the fast payload validation before the expensive CI route, and added a regression that proves the heavy phase is skipped when the fast phase fails.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T13:20:14.398Z, excerpt_hash=sha256:be04c3a3f455481e39224646fa8d0d118ade981f5712c4ac5a11ef14e82265b7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
