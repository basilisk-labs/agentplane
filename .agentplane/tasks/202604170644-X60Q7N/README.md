---
id: "202604170644-X60Q7N"
title: "Split recipes cache from project vendor store"
result_summary: "Closed as duplicate of 202604170647-AXJYWC."
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
  updated_at: "2026-04-17T06:45:58.929Z"
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
      Verified: 202604170644-X60Q7N is a bookkeeping duplicate of 202604170647-AXJYWC (Split recipes cache from project vendor store); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by executed split-recipe-stores task.
events:
  -
    type: "status"
    at: "2026-04-17T10:04:44.878Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: |-
      Verified: 202604170644-X60Q7N is a bookkeeping duplicate of 202604170647-AXJYWC (Split recipes cache from project vendor store); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by executed split-recipe-stores task.
doc_version: 3
doc_updated_at: "2026-04-17T10:04:44.878Z"
doc_updated_by: "ORCHESTRATOR"
description: "Separate global recipes cache from project vendored recipes so install/list/info stop acting as project-runtime mutations."
sections:
  Summary: |-
    Split recipes cache from project vendor store
    
    Separate global recipes cache from project vendored recipes so install/list/info stop acting as project-runtime mutations.
  Scope: |-
    - In scope: Separate global recipes cache from project vendored recipes so install/list/info stop acting as project-runtime mutations.
    - Out of scope: unrelated refactors not required for "Split recipes cache from project vendor store".
  Plan: "1. Move install/list/info semantics onto the home-cache store only. 2. Split path helpers and readers so project vendored recipes stop sharing cache readers. 3. Verify cache commands no longer mutate project-local recipes state."
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

Split recipes cache from project vendor store

Separate global recipes cache from project vendored recipes so install/list/info stop acting as project-runtime mutations.

## Scope

- In scope: Separate global recipes cache from project vendored recipes so install/list/info stop acting as project-runtime mutations.
- Out of scope: unrelated refactors not required for "Split recipes cache from project vendor store".

## Plan

1. Move install/list/info semantics onto the home-cache store only. 2. Split path helpers and readers so project vendored recipes stop sharing cache readers. 3. Verify cache commands no longer mutate project-local recipes state.

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
