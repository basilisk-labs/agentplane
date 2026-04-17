---
id: "202604170608-QV72JB"
title: "Rebuild recipes as vendored project packages"
result_summary: "Closed as duplicate of 202604170608-Z0NB6Z."
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
  updated_at: "2026-04-17T06:08:19.499Z"
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
      Verified: 202604170608-QV72JB is a bookkeeping duplicate of 202604170608-Z0NB6Z (Rebuild recipes as vendored project packages); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by the canonical umbrella task.
events:
  -
    type: "status"
    at: "2026-04-17T10:04:58.909Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: |-
      Verified: 202604170608-QV72JB is a bookkeeping duplicate of 202604170608-Z0NB6Z (Rebuild recipes as vendored project packages); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by the canonical umbrella task.
doc_version: 3
doc_updated_at: "2026-04-17T10:04:58.909Z"
doc_updated_by: "ORCHESTRATOR"
description: "Replace the current mixed global/project recipes model with a vendor-based project package flow: remote catalog -> global cache -> project vendor store -> project-only runtime authority."
sections:
  Summary: |-
    Rebuild recipes as vendored project packages
    
    Replace the current mixed global/project recipes model with a vendor-based project package flow: remote catalog -> global cache -> project vendor store -> project-only runtime authority.
  Scope: |-
    - In scope: Replace the current mixed global/project recipes model with a vendor-based project package flow: remote catalog -> global cache -> project vendor store -> project-only runtime authority.
    - Out of scope: unrelated refactors not required for "Rebuild recipes as vendored project packages".
  Plan: "1. Split recipes storage into global cache and project vendor store, with install/list/info semantics reading from cache only. 2. Introduce project-local recipes registry as the single authority for vendored packages and active overlays, then reuse one materialization service for init and recipes add. 3. Move runtime compilation to vendored project-local recipes only, compile overlay bundle plus namespaced asset registry, and remove scenario-centric authority from the recipes domain. 4. Update CLI/tests/docs for vendor-based flow, then run focused recipes/runtime/init verification before PR handoff."
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

Rebuild recipes as vendored project packages

Replace the current mixed global/project recipes model with a vendor-based project package flow: remote catalog -> global cache -> project vendor store -> project-only runtime authority.

## Scope

- In scope: Replace the current mixed global/project recipes model with a vendor-based project package flow: remote catalog -> global cache -> project vendor store -> project-only runtime authority.
- Out of scope: unrelated refactors not required for "Rebuild recipes as vendored project packages".

## Plan

1. Split recipes storage into global cache and project vendor store, with install/list/info semantics reading from cache only. 2. Introduce project-local recipes registry as the single authority for vendored packages and active overlays, then reuse one materialization service for init and recipes add. 3. Move runtime compilation to vendored project-local recipes only, compile overlay bundle plus namespaced asset registry, and remove scenario-centric authority from the recipes domain. 4. Update CLI/tests/docs for vendor-based flow, then run focused recipes/runtime/init verification before PR handoff.

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
