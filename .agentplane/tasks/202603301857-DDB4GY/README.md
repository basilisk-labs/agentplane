---
id: "202603301857-DDB4GY"
title: "Add projection/full-read consistency tests"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301857-CD83AZ"
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
doc_updated_at: "2026-03-30T18:57:01.868Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 2 / R2.3 from REFACTOR.md. tests prove the summary projection stays consistent with full task reads for fields used by task list/search/next."
sections:
  Summary: |-
    Add projection/full-read consistency tests
    
    Implement Epic 2 / R2.3 from REFACTOR.md. tests prove the summary projection stays consistent with full task reads for fields used by task list/search/next.
  Scope: |-
    - In scope: Implement Epic 2 / R2.3 from REFACTOR.md. tests prove the summary projection stays consistent with full task reads for fields used by task list/search/next.
    - Out of scope: unrelated refactors not required for "Add projection/full-read consistency tests".
  Plan: |-
    1. Audit the current implementation and tests around backend tests for local task storage to isolate the exact behavior gap for R2.3.
    2. Implement the smallest change set that satisfies the REFACTOR contract: tests prove the summary projection stays consistent with full task reads for fields used by task list/search/next.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering backend tests for local task storage. Expected: the behavior described by R2.3 is observable and stable.
    2. Inspect the final diff for 202603301857-DDB4GY. Expected: scope stays limited to backend tests for local task storage plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: tests prove the summary projection stays consistent with full task reads for fields used by task list/search/next.
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

Add projection/full-read consistency tests

Implement Epic 2 / R2.3 from REFACTOR.md. tests prove the summary projection stays consistent with full task reads for fields used by task list/search/next.

## Scope

- In scope: Implement Epic 2 / R2.3 from REFACTOR.md. tests prove the summary projection stays consistent with full task reads for fields used by task list/search/next.
- Out of scope: unrelated refactors not required for "Add projection/full-read consistency tests".

## Plan

1. Audit the current implementation and tests around backend tests for local task storage to isolate the exact behavior gap for R2.3.
2. Implement the smallest change set that satisfies the REFACTOR contract: tests prove the summary projection stays consistent with full task reads for fields used by task list/search/next.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering backend tests for local task storage. Expected: the behavior described by R2.3 is observable and stable.
2. Inspect the final diff for 202603301857-DDB4GY. Expected: scope stays limited to backend tests for local task storage plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: tests prove the summary projection stays consistent with full task reads for fields used by task list/search/next.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
