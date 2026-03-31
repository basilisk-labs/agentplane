---
id: "202603301857-32E1F0"
title: "Introduce one shared `queryTaskProjection()` pipeline"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603301856-VXFT03"
  - "202603301857-CD83AZ"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T09:55:43.030Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T10:03:07.880Z"
  updated_by: "CODER"
  note: "Shared helper/unit tests, workflow command tests, and CLI exact-output query contracts all passed after moving list/search/next onto one projection query pipeline."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: unify status/owner/tag filtering, sorting, limit, and dependency-state preparation behind one shared task projection query path for list/search/next."
events:
  -
    type: "status"
    at: "2026-03-31T09:56:33.421Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: unify status/owner/tag filtering, sorting, limit, and dependency-state preparation behind one shared task projection query path for list/search/next."
  -
    type: "verify"
    at: "2026-03-31T10:03:07.880Z"
    author: "CODER"
    state: "ok"
    note: "Shared helper/unit tests, workflow command tests, and CLI exact-output query contracts all passed after moving list/search/next onto one projection query pipeline."
doc_version: 3
doc_updated_at: "2026-03-31T10:03:07.888Z"
doc_updated_by: "CODER"
description: "Implement Epic 3 / R3.1 from REFACTOR.md. status/owner/tag filtering, sorting, `limit`, and dependency-state preparation live in one shared path."
sections:
  Summary: |-
    Introduce one shared `queryTaskProjection()` pipeline
    
    Implement Epic 3 / R3.1 from REFACTOR.md. status/owner/tag filtering, sorting, `limit`, and dependency-state preparation live in one shared path.
  Scope: |-
    - In scope: Implement Epic 3 / R3.1 from REFACTOR.md. status/owner/tag filtering, sorting, `limit`, and dependency-state preparation live in one shared path.
    - Out of scope: unrelated refactors not required for "Introduce one shared `queryTaskProjection()` pipeline".
  Plan: |-
    1. Audit the current implementation and tests around task command shared helpers to isolate the exact behavior gap for R3.1.
    2. Implement the smallest change set that satisfies the REFACTOR contract: status/owner/tag filtering, sorting, `limit`, and dependency-state preparation live in one shared path.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering task command shared helpers. Expected: the behavior described by R3.1 is observable and stable.
    2. Inspect the final diff for 202603301857-32E1F0. Expected: scope stays limited to task command shared helpers plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: status/owner/tag filtering, sorting, `limit`, and dependency-state preparation live in one shared path.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T10:03:07.880Z — VERIFY — ok
    
    By: CODER
    
    Note: Shared helper/unit tests, workflow command tests, and CLI exact-output query contracts all passed after moving list/search/next onto one projection query pipeline.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T09:56:33.423Z, excerpt_hash=sha256:c13790524416089fe0aa3380ad8c6e8760eeeaae9789f4c87cfc2935c845a26a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Introduce one shared `queryTaskProjection()` pipeline

Implement Epic 3 / R3.1 from REFACTOR.md. status/owner/tag filtering, sorting, `limit`, and dependency-state preparation live in one shared path.

## Scope

- In scope: Implement Epic 3 / R3.1 from REFACTOR.md. status/owner/tag filtering, sorting, `limit`, and dependency-state preparation live in one shared path.
- Out of scope: unrelated refactors not required for "Introduce one shared `queryTaskProjection()` pipeline".

## Plan

1. Audit the current implementation and tests around task command shared helpers to isolate the exact behavior gap for R3.1.
2. Implement the smallest change set that satisfies the REFACTOR contract: status/owner/tag filtering, sorting, `limit`, and dependency-state preparation live in one shared path.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering task command shared helpers. Expected: the behavior described by R3.1 is observable and stable.
2. Inspect the final diff for 202603301857-32E1F0. Expected: scope stays limited to task command shared helpers plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: status/owner/tag filtering, sorting, `limit`, and dependency-state preparation live in one shared path.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T10:03:07.880Z — VERIFY — ok

By: CODER

Note: Shared helper/unit tests, workflow command tests, and CLI exact-output query contracts all passed after moving list/search/next onto one projection query pipeline.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T09:56:33.423Z, excerpt_hash=sha256:c13790524416089fe0aa3380ad8c6e8760eeeaae9789f4c87cfc2935c845a26a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
