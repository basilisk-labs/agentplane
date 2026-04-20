---
id: "202604191643-KQR66F"
title: "Fail CI on hotspot threshold regressions"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "ops"
  - "tooling"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T12:15:30.624Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Add a deterministic hotspot threshold guard to existing reporting/CI surfaces, with focused tests for allowed and rejected oversized files."
events:
  -
    type: "status"
    at: "2026-04-20T12:15:39.996Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add a deterministic hotspot threshold guard to existing reporting/CI surfaces, with focused tests for allowed and rejected oversized files."
doc_version: 3
doc_updated_at: "2026-04-20T12:15:40.007Z"
doc_updated_by: "CODER"
description: "Epic H′ and J′. Add hotspot-report based CI enforcement for oversized files beyond the agreed threshold."
sections:
  Summary: |-
    Fail CI on hotspot threshold regressions
    
    Epic H′ and J′. Add hotspot-report based CI enforcement for oversized files beyond the agreed threshold.
  Scope: |-
    - In scope: Epic H′ and J′. Add hotspot-report based CI enforcement for oversized files beyond the agreed threshold.
    - Out of scope: unrelated refactors not required for "Fail CI on hotspot threshold regressions".
  Plan: "Add an enforced hotspot threshold check around the existing hotspot-report tooling. Define a deterministic threshold/allowlist contract so files over the configured LoC limit fail unless explicitly allowed, wire the check into the repository quality gate/CI surface, and cover pass/fail behavior with focused tests."
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

Add an enforced hotspot threshold check around the existing hotspot-report tooling. Define a deterministic threshold/allowlist contract so files over the configured LoC limit fail unless explicitly allowed, wire the check into the repository quality gate/CI surface, and cover pass/fail behavior with focused tests.

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
