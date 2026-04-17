---
id: "202604170644-J20DQ5"
title: "Collapse scenario packs into recipe-owned assets"
result_summary: "Closed as duplicate of 202604170647-EE3WW7."
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
  updated_at: "2026-04-17T06:45:59.988Z"
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
      Verified: 202604170644-J20DQ5 is a bookkeeping duplicate of 202604170647-EE3WW7 (Collapse scenario packs into recipe-owned assets); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by executed scenario-assets task.
events:
  -
    type: "status"
    at: "2026-04-17T10:04:49.379Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: |-
      Verified: 202604170644-J20DQ5 is a bookkeeping duplicate of 202604170647-EE3WW7 (Collapse scenario packs into recipe-owned assets); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by executed scenario-assets task.
doc_version: 3
doc_updated_at: "2026-04-17T10:04:49.379Z"
doc_updated_by: "ORCHESTRATOR"
description: "Remove scenario_pack as a top-level recipes kind and keep scenarios only as recipe-owned assets."
sections:
  Summary: |-
    Collapse scenario packs into recipe-owned assets
    
    Remove scenario_pack as a top-level recipes kind and keep scenarios only as recipe-owned assets.
  Scope: |-
    - In scope: Remove scenario_pack as a top-level recipes kind and keep scenarios only as recipe-owned assets.
    - Out of scope: unrelated refactors not required for "Collapse scenario packs into recipe-owned assets".
  Plan: "1. Remove scenario_pack from recipes manifest kinds. 2. Keep scenarios only as recipe-owned assets within overlay packages. 3. Verify scenario asset resolution still works through recipe manifests."
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

Collapse scenario packs into recipe-owned assets

Remove scenario_pack as a top-level recipes kind and keep scenarios only as recipe-owned assets.

## Scope

- In scope: Remove scenario_pack as a top-level recipes kind and keep scenarios only as recipe-owned assets.
- Out of scope: unrelated refactors not required for "Collapse scenario packs into recipe-owned assets".

## Plan

1. Remove scenario_pack from recipes manifest kinds. 2. Keep scenarios only as recipe-owned assets within overlay packages. 3. Verify scenario asset resolution still works through recipe manifests.

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
