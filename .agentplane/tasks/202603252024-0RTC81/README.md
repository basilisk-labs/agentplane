---
id: "202603252024-0RTC81"
title: "Fix presentation route to open static HTML without Docusaurus chrome"
result_summary: "Superseded by KAR6C2 and resolved by the merged presentation recursion fix on GitHub main."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 2
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "website"
  - "presentation"
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
commit:
  hash: "87b87cc6895fa411fff946763d5cda48c2120fa9"
  message: "✨ KAR6C2 site: fix AIMindset presentation route recursion (#17)"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: Superseded by KAR6C2 and resolved by the merged presentation recursion fix on GitHub main."
events:
  -
    type: "status"
    at: "2026-03-27T19:07:16.167Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: Superseded by KAR6C2 and resolved by the merged presentation recursion fix on GitHub main."
doc_version: 3
doc_updated_at: "2026-03-27T19:07:16.167Z"
doc_updated_by: "INTEGRATOR"
description: "Change the AIMindset presentation route to bypass the Docusaurus Layout wrapper so /presentation/aimindset20260325 opens the standalone static presentation without extra site navbars."
sections:
  Summary: |-
    Fix presentation route to open static HTML without Docusaurus chrome
    
    Change the AIMindset presentation route to bypass the Docusaurus Layout wrapper so /presentation/aimindset20260325 opens the standalone static presentation without extra site navbars.
  Scope: |-
    - In scope: Change the AIMindset presentation route to bypass the Docusaurus Layout wrapper so /presentation/aimindset20260325 opens the standalone static presentation without extra site navbars.
    - Out of scope: unrelated refactors not required for "Fix presentation route to open static HTML without Docusaurus chrome".
  Plan: |-
    1. Implement the change for "Fix presentation route to open static HTML without Docusaurus chrome".
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

Fix presentation route to open static HTML without Docusaurus chrome

Change the AIMindset presentation route to bypass the Docusaurus Layout wrapper so /presentation/aimindset20260325 opens the standalone static presentation without extra site navbars.

## Scope

- In scope: Change the AIMindset presentation route to bypass the Docusaurus Layout wrapper so /presentation/aimindset20260325 opens the standalone static presentation without extra site navbars.
- Out of scope: unrelated refactors not required for "Fix presentation route to open static HTML without Docusaurus chrome".

## Plan

1. Implement the change for "Fix presentation route to open static HTML without Docusaurus chrome".
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
