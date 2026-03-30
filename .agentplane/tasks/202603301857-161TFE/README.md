---
id: "202603301857-161TFE"
title: "Migrate `task`, `guard`, `workflow`, `hooks`, and other group commands to derived child discovery"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301857-M5MBBB"
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
doc_updated_at: "2026-03-30T18:57:11.303Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 5 / R5.2 from REFACTOR.md. group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children."
sections:
  Summary: |-
    Migrate `task`, `guard`, `workflow`, `hooks`, and other group commands to derived child discovery
    
    Implement Epic 5 / R5.2 from REFACTOR.md. group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children.
  Scope: |-
    - In scope: Implement Epic 5 / R5.2 from REFACTOR.md. group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children.
    - Out of scope: unrelated refactors not required for "Migrate `task`, `guard`, `workflow`, `hooks`, and other group commands to derived child discovery".
  Plan: |-
    1. Audit the current implementation and tests around group command entry modules to isolate the exact behavior gap for R5.2.
    2. Implement the smallest change set that satisfies the REFACTOR contract: group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering group command entry modules. Expected: the behavior described by R5.2 is observable and stable.
    2. Inspect the final diff for 202603301857-161TFE. Expected: scope stays limited to group command entry modules plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children.
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

Migrate `task`, `guard`, `workflow`, `hooks`, and other group commands to derived child discovery

Implement Epic 5 / R5.2 from REFACTOR.md. group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children.

## Scope

- In scope: Implement Epic 5 / R5.2 from REFACTOR.md. group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children.
- Out of scope: unrelated refactors not required for "Migrate `task`, `guard`, `workflow`, `hooks`, and other group commands to derived child discovery".

## Plan

1. Audit the current implementation and tests around group command entry modules to isolate the exact behavior gap for R5.2.
2. Implement the smallest change set that satisfies the REFACTOR contract: group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering group command entry modules. Expected: the behavior described by R5.2 is observable and stable.
2. Inspect the final diff for 202603301857-161TFE. Expected: scope stays limited to group command entry modules plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: group command modules no longer maintain explicit child-spec lists unless a command intentionally hides or reorders children.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
