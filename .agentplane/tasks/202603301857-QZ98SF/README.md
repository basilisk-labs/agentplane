---
id: "202603301857-QZ98SF"
title: "Audit non-local backends against the same summary/full-read split"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301856-6G2YVG"
tags:
  - "code"
  - "refactor"
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
doc_updated_at: "2026-03-30T18:57:02.591Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 2 / R2.4 from REFACTOR.md. each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface."
sections:
  Summary: |-
    Audit non-local backends against the same summary/full-read split
    
    Implement Epic 2 / R2.4 from REFACTOR.md. each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface.
  Scope: |-
    - In scope: Implement Epic 2 / R2.4 from REFACTOR.md. each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface.
    - Out of scope: unrelated refactors not required for "Audit non-local backends against the same summary/full-read split".
  Plan: |-
    1. Audit the current implementation and tests around backend contracts and external backend adapters to isolate the exact behavior gap for R2.4.
    2. Implement the smallest change set that satisfies the REFACTOR contract: each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering backend contracts and external backend adapters. Expected: the behavior described by R2.4 is observable and stable.
    2. Inspect the final diff for 202603301857-QZ98SF. Expected: scope stays limited to backend contracts and external backend adapters plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface.
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

Audit non-local backends against the same summary/full-read split

Implement Epic 2 / R2.4 from REFACTOR.md. each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface.

## Scope

- In scope: Implement Epic 2 / R2.4 from REFACTOR.md. each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface.
- Out of scope: unrelated refactors not required for "Audit non-local backends against the same summary/full-read split".

## Plan

1. Audit the current implementation and tests around backend contracts and external backend adapters to isolate the exact behavior gap for R2.4.
2. Implement the smallest change set that satisfies the REFACTOR contract: each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering backend contracts and external backend adapters. Expected: the behavior described by R2.4 is observable and stable.
2. Inspect the final diff for 202603301857-QZ98SF. Expected: scope stays limited to backend contracts and external backend adapters plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: each backend explicitly documents whether it has a native projection path or a fallback path, with no ambiguity in the interface.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
