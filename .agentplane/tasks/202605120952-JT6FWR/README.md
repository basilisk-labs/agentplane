---
id: "202605120952-JT6FWR"
title: "Implement init mode and tool RFQ controls"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-12T09:52:23.471Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the RFQ init mode/tool controls as the primary batch worktree owner, including plan schema compatibility and focused init tests."
events:
  -
    type: "status"
    at: "2026-05-12T09:52:47.338Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the RFQ init mode/tool controls as the primary batch worktree owner, including plan schema compatibility and focused init tests."
doc_version: 3
doc_updated_at: "2026-05-12T09:52:47.338Z"
doc_updated_by: "CODER"
description: "Add user-facing init mode/tool flags and expose mode/profile in the init plan while preserving legacy init flags."
sections:
  Summary: |-
    Implement init mode and tool RFQ controls
    
    Add user-facing init mode/tool flags and expose mode/profile in the init plan while preserving legacy init flags.
  Scope: |-
    - In scope: Add user-facing init mode/tool flags and expose mode/profile in the init plan while preserving legacy init flags.
    - Out of scope: unrelated refactors not required for "Implement init mode and tool RFQ controls".
  Plan: "Batch primary for RFQ init v2 remaining controls. Implement --init-mode/--quick/--advanced, --tool mapping, user-facing mode/profile fields in InitPlan, and compatibility tests. Batch includes dependent tasks 202605120952-D2F8VR and 202605120952-MG1QB4 in the same worktree because all edits share init parsing/orchestration surfaces. Verify with focused init tests, lint for touched init files, policy routing, and doctor."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
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

Implement init mode and tool RFQ controls

Add user-facing init mode/tool flags and expose mode/profile in the init plan while preserving legacy init flags.

## Scope

- In scope: Add user-facing init mode/tool flags and expose mode/profile in the init plan while preserving legacy init flags.
- Out of scope: unrelated refactors not required for "Implement init mode and tool RFQ controls".

## Plan

Batch primary for RFQ init v2 remaining controls. Implement --init-mode/--quick/--advanced, --tool mapping, user-facing mode/profile fields in InitPlan, and compatibility tests. Batch includes dependent tasks 202605120952-D2F8VR and 202605120952-MG1QB4 in the same worktree because all edits share init parsing/orchestration surfaces. Verify with focused init tests, lint for touched init files, policy routing, and doctor.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
