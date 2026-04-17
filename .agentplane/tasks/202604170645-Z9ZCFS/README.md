---
id: "202604170645-Z9ZCFS"
title: "Remove scenario-centric runtime and CLI drift"
result_summary: "Closed as duplicate of 202604170852-ZE2GGY."
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
  updated_at: "2026-04-17T06:46:01.056Z"
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
      Verified: 202604170645-Z9ZCFS is a bookkeeping duplicate of 202604170852-ZE2GGY (Remove top-level scenario CLI domain); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by executed remove-scenario-domain task.
events:
  -
    type: "status"
    at: "2026-04-17T10:04:54.141Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: |-
      Verified: 202604170645-Z9ZCFS is a bookkeeping duplicate of 202604170852-ZE2GGY (Remove top-level scenario CLI domain); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by executed remove-scenario-domain task.
doc_version: 3
doc_updated_at: "2026-04-17T10:04:54.141Z"
doc_updated_by: "ORCHESTRATOR"
description: "Demote top-level scenario routing from runtime prompts and CLI surfaces so recipes remain the only top-level extension domain."
sections:
  Summary: |-
    Remove scenario-centric runtime and CLI drift
    
    Demote top-level scenario routing from runtime prompts and CLI surfaces so recipes remain the only top-level extension domain.
  Scope: |-
    - In scope: Demote top-level scenario routing from runtime prompts and CLI surfaces so recipes remain the only top-level extension domain.
    - Out of scope: unrelated refactors not required for "Remove scenario-centric runtime and CLI drift".
  Plan: "1. Remove scenario-centric guidance from runtime and CLI surfaces. 2. Replace it with recipe-owned asset language and routing. 3. Verify help text and runtime prompts no longer advertise scenario as a top-level domain."
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

Remove scenario-centric runtime and CLI drift

Demote top-level scenario routing from runtime prompts and CLI surfaces so recipes remain the only top-level extension domain.

## Scope

- In scope: Demote top-level scenario routing from runtime prompts and CLI surfaces so recipes remain the only top-level extension domain.
- Out of scope: unrelated refactors not required for "Remove scenario-centric runtime and CLI drift".

## Plan

1. Remove scenario-centric guidance from runtime and CLI surfaces. 2. Replace it with recipe-owned asset language and routing. 3. Verify help text and runtime prompts no longer advertise scenario as a top-level domain.

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
