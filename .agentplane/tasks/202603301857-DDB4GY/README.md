---
id: "202603301857-DDB4GY"
title: "Add projection/full-read consistency tests"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "approved"
  updated_at: "2026-03-31T09:43:08.098Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T09:49:13.518Z"
  updated_by: "CODER"
  note: "Focused backend vitest slice passed for projection/full-read consistency invariants; eslint passed on the touched local backend test file."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: harden local backend tests so projection summaries and full task reads stay aligned for the fields consumed by task list/search/next."
events:
  -
    type: "status"
    at: "2026-03-31T09:44:18.137Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: harden local backend tests so projection summaries and full task reads stay aligned for the fields consumed by task list/search/next."
  -
    type: "verify"
    at: "2026-03-31T09:49:13.518Z"
    author: "CODER"
    state: "ok"
    note: "Focused backend vitest slice passed for projection/full-read consistency invariants; eslint passed on the touched local backend test file."
doc_version: 3
doc_updated_at: "2026-03-31T09:49:13.532Z"
doc_updated_by: "CODER"
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
    ### 2026-03-31T09:49:13.518Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused backend vitest slice passed for projection/full-read consistency invariants; eslint passed on the touched local backend test file.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T09:44:18.139Z, excerpt_hash=sha256:8386065eb0e9a526b7aebfaa80affe5f930651ea323311251dead3566847f9d1
    
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
### 2026-03-31T09:49:13.518Z — VERIFY — ok

By: CODER

Note: Focused backend vitest slice passed for projection/full-read consistency invariants; eslint passed on the touched local backend test file.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T09:44:18.139Z, excerpt_hash=sha256:8386065eb0e9a526b7aebfaa80affe5f930651ea323311251dead3566847f9d1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
