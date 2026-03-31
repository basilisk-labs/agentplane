---
id: "202603301857-XC7RHS"
title: "Split pre-dispatch metadata needs from full loaded config"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301856-D7EHN2"
tags:
  - "code"
  - "refactor"
  - "cli"
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
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-03-30T18:57:07.682Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 4 / R4.1 from REFACTOR.md. command dispatch can decide what it needs before forcing full config load on unrelated paths."
sections:
  Summary: |-
    Split pre-dispatch metadata needs from full loaded config
    
    Implement Epic 4 / R4.1 from REFACTOR.md. command dispatch can decide what it needs before forcing full config load on unrelated paths.
  Scope: |-
    - In scope: Implement Epic 4 / R4.1 from REFACTOR.md. command dispatch can decide what it needs before forcing full config load on unrelated paths.
    - Out of scope: unrelated refactors not required for "Split pre-dispatch metadata needs from full loaded config".
  Plan: |-
    1. Audit the current implementation and tests around CLI bootstrap and config-loading boundary to isolate the exact behavior gap for R4.1.
    2. Implement the smallest change set that satisfies the REFACTOR contract: command dispatch can decide what it needs before forcing full config load on unrelated paths.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering CLI bootstrap and config-loading boundary. Expected: the behavior described by R4.1 is observable and stable.
    2. Inspect the final diff for 202603301857-XC7RHS. Expected: scope stays limited to CLI bootstrap and config-loading boundary plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: command dispatch can decide what it needs before forcing full config load on unrelated paths.
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

Split pre-dispatch metadata needs from full loaded config

Implement Epic 4 / R4.1 from REFACTOR.md. command dispatch can decide what it needs before forcing full config load on unrelated paths.

## Scope

- In scope: Implement Epic 4 / R4.1 from REFACTOR.md. command dispatch can decide what it needs before forcing full config load on unrelated paths.
- Out of scope: unrelated refactors not required for "Split pre-dispatch metadata needs from full loaded config".

## Plan

1. Audit the current implementation and tests around CLI bootstrap and config-loading boundary to isolate the exact behavior gap for R4.1.
2. Implement the smallest change set that satisfies the REFACTOR contract: command dispatch can decide what it needs before forcing full config load on unrelated paths.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering CLI bootstrap and config-loading boundary. Expected: the behavior described by R4.1 is observable and stable.
2. Inspect the final diff for 202603301857-XC7RHS. Expected: scope stays limited to CLI bootstrap and config-loading boundary plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: command dispatch can decide what it needs before forcing full config load on unrelated paths.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
