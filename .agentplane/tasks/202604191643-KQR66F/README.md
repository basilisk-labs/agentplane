---
id: "202604191643-KQR66F"
title: "Fail CI on hotspot threshold regressions"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "ops"
  - "tooling"
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
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-19T16:43:14.099Z"
doc_updated_by: "CODER"
description: "Epic H′ and J′. Add hotspot-report based CI enforcement for oversized files beyond the agreed threshold."
sections:
  Summary: |-
    Fail CI on hotspot threshold regressions
    
    Epic H′ and J′. Add hotspot-report based CI enforcement for oversized files beyond the agreed threshold.
  Scope: |-
    - In scope: Epic H′ and J′. Add hotspot-report based CI enforcement for oversized files beyond the agreed threshold.
    - Out of scope: unrelated refactors not required for "Fail CI on hotspot threshold regressions".
  Plan: |-
    1. Implement the change for "Fail CI on hotspot threshold regressions".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `ops` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `ops` task. Expected: it succeeds without unexpected regressions in touched scope.
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

Fail CI on hotspot threshold regressions

Epic H′ and J′. Add hotspot-report based CI enforcement for oversized files beyond the agreed threshold.

## Scope

- In scope: Epic H′ and J′. Add hotspot-report based CI enforcement for oversized files beyond the agreed threshold.
- Out of scope: unrelated refactors not required for "Fail CI on hotspot threshold regressions".

## Plan

1. Implement the change for "Fail CI on hotspot threshold regressions".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the changed artifact or behavior for the `ops` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `ops` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
