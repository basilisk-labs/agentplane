---
id: "202603301857-M5MBBB"
title: "Derive direct subcommand names from the canonical command graph"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301856-HVS36K"
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
doc_updated_at: "2026-03-30T18:57:10.579Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 5 / R5.1 from REFACTOR.md. child command discovery is computed from command ids instead of manually listed arrays."
sections:
  Summary: |-
    Derive direct subcommand names from the canonical command graph
    
    Implement Epic 5 / R5.1 from REFACTOR.md. child command discovery is computed from command ids instead of manually listed arrays.
  Scope: |-
    - In scope: Implement Epic 5 / R5.1 from REFACTOR.md. child command discovery is computed from command ids instead of manually listed arrays.
    - Out of scope: unrelated refactors not required for "Derive direct subcommand names from the canonical command graph".
  Plan: |-
    1. Audit the current implementation and tests around group command helpers and command graph helpers to isolate the exact behavior gap for R5.1.
    2. Implement the smallest change set that satisfies the REFACTOR contract: child command discovery is computed from command ids instead of manually listed arrays.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering group command helpers and command graph helpers. Expected: the behavior described by R5.1 is observable and stable.
    2. Inspect the final diff for 202603301857-M5MBBB. Expected: scope stays limited to group command helpers and command graph helpers plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: child command discovery is computed from command ids instead of manually listed arrays.
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

Derive direct subcommand names from the canonical command graph

Implement Epic 5 / R5.1 from REFACTOR.md. child command discovery is computed from command ids instead of manually listed arrays.

## Scope

- In scope: Implement Epic 5 / R5.1 from REFACTOR.md. child command discovery is computed from command ids instead of manually listed arrays.
- Out of scope: unrelated refactors not required for "Derive direct subcommand names from the canonical command graph".

## Plan

1. Audit the current implementation and tests around group command helpers and command graph helpers to isolate the exact behavior gap for R5.1.
2. Implement the smallest change set that satisfies the REFACTOR contract: child command discovery is computed from command ids instead of manually listed arrays.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering group command helpers and command graph helpers. Expected: the behavior described by R5.1 is observable and stable.
2. Inspect the final diff for 202603301857-M5MBBB. Expected: scope stays limited to group command helpers and command graph helpers plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: child command discovery is computed from command ids instead of manually listed arrays.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
