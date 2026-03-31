---
id: "202603301857-7XE45D"
title: "Re-measure read-heavy CLI commands on a large task set"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301857-CD83AZ"
  - "202603301857-DDB4GY"
tags:
  - "code"
  - "refactor"
  - "benchmark"
  - "backend"
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
doc_updated_at: "2026-03-30T18:57:03.313Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 2 / R2.5 from REFACTOR.md. we have before/after numbers for `task list`, `task search`, and `task next`."
sections:
  Summary: |-
    Re-measure read-heavy CLI commands on a large task set
    
    Implement Epic 2 / R2.5 from REFACTOR.md. we have before/after numbers for `task list`, `task search`, and `task next`.
  Scope: |-
    - In scope: Implement Epic 2 / R2.5 from REFACTOR.md. we have before/after numbers for `task list`, `task search`, and `task next`.
    - Out of scope: unrelated refactors not required for "Re-measure read-heavy CLI commands on a large task set".
  Plan: |-
    1. Audit the current implementation and tests around benchmark harness from `R0.4` to isolate the exact behavior gap for R2.5.
    2. Implement the smallest change set that satisfies the REFACTOR contract: we have before/after numbers for `task list`, `task search`, and `task next`.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering benchmark harness from `R0.4`. Expected: the behavior described by R2.5 is observable and stable.
    2. Inspect the final diff for 202603301857-7XE45D. Expected: scope stays limited to benchmark harness from `R0.4` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: we have before/after numbers for `task list`, `task search`, and `task next`.
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

Re-measure read-heavy CLI commands on a large task set

Implement Epic 2 / R2.5 from REFACTOR.md. we have before/after numbers for `task list`, `task search`, and `task next`.

## Scope

- In scope: Implement Epic 2 / R2.5 from REFACTOR.md. we have before/after numbers for `task list`, `task search`, and `task next`.
- Out of scope: unrelated refactors not required for "Re-measure read-heavy CLI commands on a large task set".

## Plan

1. Audit the current implementation and tests around benchmark harness from `R0.4` to isolate the exact behavior gap for R2.5.
2. Implement the smallest change set that satisfies the REFACTOR contract: we have before/after numbers for `task list`, `task search`, and `task next`.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering benchmark harness from `R0.4`. Expected: the behavior described by R2.5 is observable and stable.
2. Inspect the final diff for 202603301857-7XE45D. Expected: scope stays limited to benchmark harness from `R0.4` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: we have before/after numbers for `task list`, `task search`, and `task next`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
