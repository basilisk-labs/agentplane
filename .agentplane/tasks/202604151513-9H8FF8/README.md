---
id: "202604151513-9H8FF8"
title: "Preserve current runtime checkout in publish recovery"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-15T15:13:47.805Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-15T15:14:58.611Z"
  updated_by: "CODER"
  note: "Verified: publish workflow exact-SHA recovery now preserves the current-runtime resolver checkout by ordering checkouts safely; publish-workflow-contract.test.ts passes locally."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reorder publish recovery checkouts so the current-runtime resolver survives exact-SHA workflow_dispatch, then rerun the 0.3.11 publish recovery."
events:
  -
    type: "status"
    at: "2026-04-15T15:13:47.812Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reorder publish recovery checkouts so the current-runtime resolver survives exact-SHA workflow_dispatch, then rerun the 0.3.11 publish recovery."
  -
    type: "verify"
    at: "2026-04-15T15:14:58.611Z"
    author: "CODER"
    state: "ok"
    note: "Verified: publish workflow exact-SHA recovery now preserves the current-runtime resolver checkout by ordering checkouts safely; publish-workflow-contract.test.ts passes locally."
doc_version: 3
doc_updated_at: "2026-04-15T15:14:58.615Z"
doc_updated_by: "CODER"
description: "Keep the current-workflow runtime checkout alive for workflow_dispatch publish recovery by ordering checkouts safely, then publish v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee."
sections:
  Summary: |-
    Preserve current runtime checkout in publish recovery
    
    Keep the current-workflow runtime checkout alive for workflow_dispatch publish recovery by ordering checkouts safely, then publish v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee.
  Scope: |-
    - In scope: Keep the current-workflow runtime checkout alive for workflow_dispatch publish recovery by ordering checkouts safely, then publish v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee.
    - Out of scope: unrelated refactors not required for "Preserve current runtime checkout in publish recovery".
  Plan: |-
    1. Implement the change for "Preserve current runtime checkout in publish recovery".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "Preserve current runtime checkout in publish recovery". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-15T15:14:58.611Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: publish workflow exact-SHA recovery now preserves the current-runtime resolver checkout by ordering checkouts safely; publish-workflow-contract.test.ts passes locally.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T15:13:47.834Z, excerpt_hash=sha256:853240d89e1862a42e29d042f332c88e66585a6f4f77caaeb28d860c3625c760
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Preserve current runtime checkout in publish recovery

Keep the current-workflow runtime checkout alive for workflow_dispatch publish recovery by ordering checkouts safely, then publish v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee.

## Scope

- In scope: Keep the current-workflow runtime checkout alive for workflow_dispatch publish recovery by ordering checkouts safely, then publish v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee.
- Out of scope: unrelated refactors not required for "Preserve current runtime checkout in publish recovery".

## Plan

1. Implement the change for "Preserve current runtime checkout in publish recovery".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "Preserve current runtime checkout in publish recovery". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-15T15:14:58.611Z — VERIFY — ok

By: CODER

Note: Verified: publish workflow exact-SHA recovery now preserves the current-runtime resolver checkout by ordering checkouts safely; publish-workflow-contract.test.ts passes locally.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T15:13:47.834Z, excerpt_hash=sha256:853240d89e1862a42e29d042f332c88e66585a6f4f77caaeb28d860c3625c760

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
