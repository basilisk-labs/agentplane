---
id: "202604170644-FPNJ7W"
title: "Make project registry the recipes authority"
result_summary: "Closed as duplicate of 202604170647-8HW1Z6."
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
  updated_at: "2026-04-17T06:45:59.456Z"
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
      Verified: 202604170644-FPNJ7W is a bookkeeping duplicate of 202604170647-8HW1Z6 (Make project registry the recipes authority); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by executed registry-authority task.
events:
  -
    type: "status"
    at: "2026-04-17T10:04:46.436Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: |-
      Verified: 202604170644-FPNJ7W is a bookkeeping duplicate of 202604170647-8HW1Z6 (Make project registry the recipes authority); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by executed registry-authority task.
doc_version: 3
doc_updated_at: "2026-04-17T10:04:46.436Z"
doc_updated_by: "ORCHESTRATOR"
description: "Move active and provenance authority for vendored recipes into a project registry file and stop using config as split-brain state."
sections:
  Summary: |-
    Make project registry the recipes authority
    
    Move active and provenance authority for vendored recipes into a project registry file and stop using config as split-brain state.
  Scope: |-
    - In scope: Move active and provenance authority for vendored recipes into a project registry file and stop using config as split-brain state.
    - Out of scope: unrelated refactors not required for "Make project registry the recipes authority".
  Plan: "1. Introduce a project recipes registry file as the single authority for vendored recipes. 2. Move active state and provenance metadata out of config. 3. Verify overlay activation reads only the registry."
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

Make project registry the recipes authority

Move active and provenance authority for vendored recipes into a project registry file and stop using config as split-brain state.

## Scope

- In scope: Move active and provenance authority for vendored recipes into a project registry file and stop using config as split-brain state.
- Out of scope: unrelated refactors not required for "Make project registry the recipes authority".

## Plan

1. Introduce a project recipes registry file as the single authority for vendored recipes. 2. Move active state and provenance metadata out of config. 3. Verify overlay activation reads only the registry.

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
