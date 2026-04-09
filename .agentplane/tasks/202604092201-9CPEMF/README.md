---
id: "202604092201-9CPEMF"
title: "Show incident IDs and registry paths after successful promotion"
result_summary: "Merged via PR #234."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "incidents"
  - "ux"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T22:02:11.075Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T22:20:12.342Z"
  updated_by: "CODER"
  note: "Verification refreshed on final branch head after success-output cleanup; targeted incidents/task CLI tests and eslint remain green."
commit:
  hash: "62448ed52a3f5ec110233702308a19d07b3f3c90"
  message: "incidents/ux: Show incident IDs and registry paths after successful promotion (9CPEMF) (#234)"
comments:
  -
    author: "CODER"
    body: "Start: enrich incident promotion success output with IDs and registry paths."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #234 merged and the promoted incident success-output change is present on main after runtime bootstrap."
events:
  -
    type: "status"
    at: "2026-04-09T22:02:12.467Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: enrich incident promotion success output with IDs and registry paths."
  -
    type: "verify"
    at: "2026-04-09T22:06:35.822Z"
    author: "CODER"
    state: "ok"
    note: "Added promoted incident IDs and registry file paths to successful incident collection output; verified targeted incidents/tasks CLI tests and eslint."
  -
    type: "verify"
    at: "2026-04-09T22:20:12.342Z"
    author: "CODER"
    state: "ok"
    note: "Verification refreshed on final branch head after success-output cleanup; targeted incidents/task CLI tests and eslint remain green."
  -
    type: "status"
    at: "2026-04-09T22:58:21.740Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #234 merged and the promoted incident success-output change is present on main after runtime bootstrap."
doc_version: 3
doc_updated_at: "2026-04-09T22:58:21.740Z"
doc_updated_by: "INTEGRATOR"
description: "Make incident collection success output name promoted incident IDs and the registry files that changed so operators can immediately verify incidents.md updates."
sections:
  Summary: |-
    Show incident IDs and registry paths after successful promotion
    
    Make incident collection success output name promoted incident IDs and the registry files that changed so operators can immediately verify incidents.md updates.
  Scope: |-
    - In scope: Make incident collection success output name promoted incident IDs and the registry files that changed so operators can immediately verify incidents.md updates.
    - Out of scope: unrelated refactors not required for "Show incident IDs and registry paths after successful promotion".
  Plan: "1. Extend incident promotion success messages to include promoted incident IDs and target registry paths. 2. Cover verify, finish, and incidents collect flows with tests. 3. Keep no-op messaging unchanged."
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. <Action>. Expected: <observable result>.
    2. <Action>. Expected: <observable result>.
    3. <Action>. Expected: <observable result>.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T22:06:35.822Z — VERIFY — ok
    
    By: CODER
    
    Note: Added promoted incident IDs and registry file paths to successful incident collection output; verified targeted incidents/tasks CLI tests and eslint.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T22:02:12.473Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    ### 2026-04-09T22:20:12.342Z — VERIFY — ok
    
    By: CODER
    
    Note: Verification refreshed on final branch head after success-output cleanup; targeted incidents/task CLI tests and eslint remain green.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T22:06:35.824Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Show incident IDs and registry paths after successful promotion

Make incident collection success output name promoted incident IDs and the registry files that changed so operators can immediately verify incidents.md updates.

## Scope

- In scope: Make incident collection success output name promoted incident IDs and the registry files that changed so operators can immediately verify incidents.md updates.
- Out of scope: unrelated refactors not required for "Show incident IDs and registry paths after successful promotion".

## Plan

1. Extend incident promotion success messages to include promoted incident IDs and target registry paths. 2. Cover verify, finish, and incidents collect flows with tests. 3. Keep no-op messaging unchanged.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T22:06:35.822Z — VERIFY — ok

By: CODER

Note: Added promoted incident IDs and registry file paths to successful incident collection output; verified targeted incidents/tasks CLI tests and eslint.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T22:02:12.473Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

### 2026-04-09T22:20:12.342Z — VERIFY — ok

By: CODER

Note: Verification refreshed on final branch head after success-output cleanup; targeted incidents/task CLI tests and eslint remain green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T22:06:35.824Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
