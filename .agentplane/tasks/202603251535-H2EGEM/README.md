---
id: "202603251535-H2EGEM"
title: "Type PR artifact state and decouple integrate/finalize from finish command reuse"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202603251535-3DZ26K"
tags:
  - "code"
  - "architecture"
  - "refactor"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-03-25T15:35:08.448Z"
doc_updated_by: "CODER"
description: "Introduce a typed PR state contract and stop integrating through loose Record-based PR metadata plus recursive finish-command reuse inside finalize flows."
sections:
  Summary: |-
    Type PR artifact state and decouple integrate/finalize from finish command reuse
    
    Introduce a typed PR state contract and stop integrating through loose Record-based PR metadata plus recursive finish-command reuse inside finalize flows.
  Scope: |-
    - In scope: Introduce a typed PR state contract and stop integrating through loose Record-based PR metadata plus recursive finish-command reuse inside finalize flows.
    - Out of scope: unrelated refactors not required for "Type PR artifact state and decouple integrate/finalize from finish command reuse".
  Plan: |-
    1. Implement the change for "Type PR artifact state and decouple integrate/finalize from finish command reuse".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Type PR artifact state and decouple integrate/finalize from finish command reuse

Introduce a typed PR state contract and stop integrating through loose Record-based PR metadata plus recursive finish-command reuse inside finalize flows.

## Scope

- In scope: Introduce a typed PR state contract and stop integrating through loose Record-based PR metadata plus recursive finish-command reuse inside finalize flows.
- Out of scope: unrelated refactors not required for "Type PR artifact state and decouple integrate/finalize from finish command reuse".

## Plan

1. Implement the change for "Type PR artifact state and decouple integrate/finalize from finish command reuse".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
