---
id: "202605171139-53TJ1A"
title: "List context as a blueprint explain kind choice"
status: "TODO"
priority: "low"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprint"
  - "bug"
  - "cli"
  - "context"
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
  attempts: 0
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-17T11:39:55.676Z"
doc_updated_by: "CODER"
description: "blueprint explain accepts --kind context and resolves context.assimilation, but usage/help choices omit context from the --kind enum. Align CLI help with the supported TaskKind set."
sections:
  Summary: |-
    List context as a blueprint explain kind choice
    
    blueprint explain accepts --kind context and resolves context.assimilation, but usage/help choices omit context from the --kind enum. Align CLI help with the supported TaskKind set.
  Scope: |-
    - In scope: blueprint explain accepts --kind context and resolves context.assimilation, but usage/help choices omit context from the --kind enum. Align CLI help with the supported TaskKind set.
    - Out of scope: unrelated refactors not required for "List context as a blueprint explain kind choice".
  Plan: |-
    1. Implement the change for "List context as a blueprint explain kind choice".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold for "List context as a blueprint explain kind choice". Replace with task-specific acceptance checks when PLANNER context is available.
    
    1. Review the requested outcome for "List context as a blueprint explain kind choice". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

List context as a blueprint explain kind choice

blueprint explain accepts --kind context and resolves context.assimilation, but usage/help choices omit context from the --kind enum. Align CLI help with the supported TaskKind set.

## Scope

- In scope: blueprint explain accepts --kind context and resolves context.assimilation, but usage/help choices omit context from the --kind enum. Align CLI help with the supported TaskKind set.
- Out of scope: unrelated refactors not required for "List context as a blueprint explain kind choice".

## Plan

1. Implement the change for "List context as a blueprint explain kind choice".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold for "List context as a blueprint explain kind choice". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "List context as a blueprint explain kind choice". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
