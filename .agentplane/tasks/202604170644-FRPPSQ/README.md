---
id: "202604170644-FRPPSQ"
title: "Add explicit vendoring flow for cached recipes"
result_summary: "Closed as duplicate of 202604170647-EFP9RQ."
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
  updated_at: "2026-04-17T06:45:59.190Z"
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
      Verified: 202604170644-FRPPSQ is a bookkeeping duplicate of 202604170647-EFP9RQ (Add explicit vendoring flow for cached recipes); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by executed add-vendoring-flow task.
events:
  -
    type: "status"
    at: "2026-04-17T10:04:45.709Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: |-
      Verified: 202604170644-FRPPSQ is a bookkeeping duplicate of 202604170647-EFP9RQ (Add explicit vendoring flow for cached recipes); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by executed add-vendoring-flow task.
doc_version: 3
doc_updated_at: "2026-04-17T10:04:45.709Z"
doc_updated_by: "ORCHESTRATOR"
description: "Introduce explicit project materialization from the global cache, including recipes add/remove semantics and shared init reuse."
sections:
  Summary: |-
    Add explicit vendoring flow for cached recipes
    
    Introduce explicit project materialization from the global cache, including recipes add/remove semantics and shared init reuse.
  Scope: |-
    - In scope: Introduce explicit project materialization from the global cache, including recipes add/remove semantics and shared init reuse.
    - Out of scope: unrelated refactors not required for "Add explicit vendoring flow for cached recipes".
  Plan: "1. Add explicit recipes add/remove materialization from cache into the project. 2. Reuse the same materialization path from init. 3. Verify vendoring defaults to copy and fails cleanly when the cache is missing the recipe."
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

Add explicit vendoring flow for cached recipes

Introduce explicit project materialization from the global cache, including recipes add/remove semantics and shared init reuse.

## Scope

- In scope: Introduce explicit project materialization from the global cache, including recipes add/remove semantics and shared init reuse.
- Out of scope: unrelated refactors not required for "Add explicit vendoring flow for cached recipes".

## Plan

1. Add explicit recipes add/remove materialization from cache into the project. 2. Reuse the same materialization path from init. 3. Verify vendoring defaults to copy and fails cleanly when the cache is missing the recipe.

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
