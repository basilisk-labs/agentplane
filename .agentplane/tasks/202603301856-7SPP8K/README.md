---
id: "202603301856-7SPP8K"
title: "Delete obsolete routing helpers and update tests/docs"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301856-R676R2"
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
doc_updated_at: "2026-03-30T18:56:59.691Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 1 / R1.5 from REFACTOR.md. old duplicated matcher paths are removed and the safety-net tests still pass unchanged."
sections:
  Summary: |-
    Delete obsolete routing helpers and update tests/docs
    
    Implement Epic 1 / R1.5 from REFACTOR.md. old duplicated matcher paths are removed and the safety-net tests still pass unchanged.
  Scope: |-
    - In scope: Implement Epic 1 / R1.5 from REFACTOR.md. old duplicated matcher paths are removed and the safety-net tests still pass unchanged.
    - Out of scope: unrelated refactors not required for "Delete obsolete routing helpers and update tests/docs".
  Plan: |-
    1. Audit the current implementation and tests around affected CLI modules and any developer docs that still describe the old split to isolate the exact behavior gap for R1.5.
    2. Implement the smallest change set that satisfies the REFACTOR contract: old duplicated matcher paths are removed and the safety-net tests still pass unchanged.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering affected CLI modules and any developer docs that still describe the old split. Expected: the behavior described by R1.5 is observable and stable.
    2. Inspect the final diff for 202603301856-7SPP8K. Expected: scope stays limited to affected CLI modules and any developer docs that still describe the old split plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: old duplicated matcher paths are removed and the safety-net tests still pass unchanged.
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

Delete obsolete routing helpers and update tests/docs

Implement Epic 1 / R1.5 from REFACTOR.md. old duplicated matcher paths are removed and the safety-net tests still pass unchanged.

## Scope

- In scope: Implement Epic 1 / R1.5 from REFACTOR.md. old duplicated matcher paths are removed and the safety-net tests still pass unchanged.
- Out of scope: unrelated refactors not required for "Delete obsolete routing helpers and update tests/docs".

## Plan

1. Audit the current implementation and tests around affected CLI modules and any developer docs that still describe the old split to isolate the exact behavior gap for R1.5.
2. Implement the smallest change set that satisfies the REFACTOR contract: old duplicated matcher paths are removed and the safety-net tests still pass unchanged.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering affected CLI modules and any developer docs that still describe the old split. Expected: the behavior described by R1.5 is observable and stable.
2. Inspect the final diff for 202603301856-7SPP8K. Expected: scope stays limited to affected CLI modules and any developer docs that still describe the old split plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: old duplicated matcher paths are removed and the safety-net tests still pass unchanged.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
