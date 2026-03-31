---
id: "202603301857-SZATBJ"
title: "Audit thin `*.command.ts` and `*.run.ts` wrappers"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301857-161TFE"
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
doc_updated_at: "2026-03-30T18:57:12.031Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 5 / R5.3 from REFACTOR.md. every wrapper file is classified as either meaningful boundary or removable indirection."
sections:
  Summary: |-
    Audit thin `*.command.ts` and `*.run.ts` wrappers
    
    Implement Epic 5 / R5.3 from REFACTOR.md. every wrapper file is classified as either meaningful boundary or removable indirection.
  Scope: |-
    - In scope: Implement Epic 5 / R5.3 from REFACTOR.md. every wrapper file is classified as either meaningful boundary or removable indirection.
    - Out of scope: unrelated refactors not required for "Audit thin `*.command.ts` and `*.run.ts` wrappers".
  Plan: |-
    1. Audit the current implementation and tests around command/module tree to isolate the exact behavior gap for R5.3.
    2. Implement the smallest change set that satisfies the REFACTOR contract: every wrapper file is classified as either meaningful boundary or removable indirection.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering command/module tree. Expected: the behavior described by R5.3 is observable and stable.
    2. Inspect the final diff for 202603301857-SZATBJ. Expected: scope stays limited to command/module tree plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: every wrapper file is classified as either meaningful boundary or removable indirection.
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

Audit thin `*.command.ts` and `*.run.ts` wrappers

Implement Epic 5 / R5.3 from REFACTOR.md. every wrapper file is classified as either meaningful boundary or removable indirection.

## Scope

- In scope: Implement Epic 5 / R5.3 from REFACTOR.md. every wrapper file is classified as either meaningful boundary or removable indirection.
- Out of scope: unrelated refactors not required for "Audit thin `*.command.ts` and `*.run.ts` wrappers".

## Plan

1. Audit the current implementation and tests around command/module tree to isolate the exact behavior gap for R5.3.
2. Implement the smallest change set that satisfies the REFACTOR contract: every wrapper file is classified as either meaningful boundary or removable indirection.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering command/module tree. Expected: the behavior described by R5.3 is observable and stable.
2. Inspect the final diff for 202603301857-SZATBJ. Expected: scope stays limited to command/module tree plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: every wrapper file is classified as either meaningful boundary or removable indirection.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
