---
id: "202604170645-YSVZAK"
title: "Harden vendored recipe update and link safety"
result_summary: "Closed as duplicate of 202604170905-XSJXC0."
risk_level: "low"
breaking: false
status: "DONE"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T06:46:00.790Z"
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
    author: "ORCHESTRATOR"
    body: |-
      Verified: 202604170645-YSVZAK is a bookkeeping duplicate of 202604170905-XSJXC0 (Add vendored recipe provenance and safe update policy); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by executed recipe-update-policy task.
events:
  -
    type: "status"
    at: "2026-04-17T10:04:55.052Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: |-
      Verified: 202604170645-YSVZAK is a bookkeeping duplicate of 202604170905-XSJXC0 (Add vendored recipe provenance and safe update policy); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by executed recipe-update-policy task.
doc_version: 3
doc_updated_at: "2026-04-17T10:04:55.052Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add safe update, detach, dirty-state, and link-mode handling for vendored recipes so local edits are not silently overwritten."
sections:
  Summary: |-
    Harden vendored recipe update and link safety
    
    Add safe update, detach, dirty-state, and link-mode handling for vendored recipes so local edits are not silently overwritten.
  Scope: |-
    - In scope: Add safe update, detach, dirty-state, and link-mode handling for vendored recipes so local edits are not silently overwritten.
    - Out of scope: unrelated refactors not required for "Harden vendored recipe update and link safety".
  Plan: "1. Add provenance and dirty-state handling for vendored recipes. 2. Introduce safe update and detach flows for copy/link materialization. 3. Verify local edits are not overwritten without explicit force."
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

Harden vendored recipe update and link safety

Add safe update, detach, dirty-state, and link-mode handling for vendored recipes so local edits are not silently overwritten.

## Scope

- In scope: Add safe update, detach, dirty-state, and link-mode handling for vendored recipes so local edits are not silently overwritten.
- Out of scope: unrelated refactors not required for "Harden vendored recipe update and link safety".

## Plan

1. Add provenance and dirty-state handling for vendored recipes. 2. Introduce safe update and detach flows for copy/link materialization. 3. Verify local edits are not overwritten without explicit force.

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
