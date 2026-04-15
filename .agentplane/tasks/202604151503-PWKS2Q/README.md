---
id: "202604151503-PWKS2Q"
title: "Decouple publish recovery resolver from historical checkout"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-15T15:04:01.917Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-15T15:06:31.304Z"
  updated_by: "CODER"
  note: "Verified: publish workflow_dispatch now resolves release-ready source via the current workflow runtime while preserving the requested historical publish target; publish-workflow-contract.test.ts passes locally."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decouple publish recovery resolver from the historical checkout, then rerun the d95b2762 publish recovery."
events:
  -
    type: "status"
    at: "2026-04-15T15:04:01.919Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decouple publish recovery resolver from the historical checkout, then rerun the d95b2762 publish recovery."
  -
    type: "verify"
    at: "2026-04-15T15:06:31.304Z"
    author: "CODER"
    state: "ok"
    note: "Verified: publish workflow_dispatch now resolves release-ready source via the current workflow runtime while preserving the requested historical publish target; publish-workflow-contract.test.ts passes locally."
doc_version: 3
doc_updated_at: "2026-04-15T15:06:31.308Z"
doc_updated_by: "CODER"
description: "Run publish workflow_dispatch recovery using the current resolver/runtime while keeping the requested historical SHA only as the publish target, then publish v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee."
sections:
  Summary: |-
    Decouple publish recovery resolver from historical checkout
    
    Run publish workflow_dispatch recovery using the current resolver/runtime while keeping the requested historical SHA only as the publish target, then publish v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee.
  Scope: |-
    - In scope: Run publish workflow_dispatch recovery using the current resolver/runtime while keeping the requested historical SHA only as the publish target, then publish v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee.
    - Out of scope: unrelated refactors not required for "Decouple publish recovery resolver from historical checkout".
  Plan: |-
    1. Decouple publish workflow_dispatch release-ready resolution from the historical checkout while keeping the requested exact SHA as the publish target, and extend contract coverage.
    2. Land the fix through the protected-main PR + hosted-close path.
    3. Re-run publish recovery for d95b2762f78815b60407a62f2227136c85cae5ee and verify v0.3.11 tag/npm state.
  Verify Steps: |-
    1. Review the requested outcome for "Decouple publish recovery resolver from historical checkout". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-15T15:06:31.304Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: publish workflow_dispatch now resolves release-ready source via the current workflow runtime while preserving the requested historical publish target; publish-workflow-contract.test.ts passes locally.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T15:04:01.942Z, excerpt_hash=sha256:e764377f7f69a64404a9522b36684ddf6715b338fa87a4dfe1a75b6f1b694c1d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Decouple publish recovery resolver from historical checkout

Run publish workflow_dispatch recovery using the current resolver/runtime while keeping the requested historical SHA only as the publish target, then publish v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee.

## Scope

- In scope: Run publish workflow_dispatch recovery using the current resolver/runtime while keeping the requested historical SHA only as the publish target, then publish v0.3.11 from d95b2762f78815b60407a62f2227136c85cae5ee.
- Out of scope: unrelated refactors not required for "Decouple publish recovery resolver from historical checkout".

## Plan

1. Decouple publish workflow_dispatch release-ready resolution from the historical checkout while keeping the requested exact SHA as the publish target, and extend contract coverage.
2. Land the fix through the protected-main PR + hosted-close path.
3. Re-run publish recovery for d95b2762f78815b60407a62f2227136c85cae5ee and verify v0.3.11 tag/npm state.

## Verify Steps

1. Review the requested outcome for "Decouple publish recovery resolver from historical checkout". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-15T15:06:31.304Z — VERIFY — ok

By: CODER

Note: Verified: publish workflow_dispatch now resolves release-ready source via the current workflow runtime while preserving the requested historical publish target; publish-workflow-contract.test.ts passes locally.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T15:04:01.942Z, excerpt_hash=sha256:e764377f7f69a64404a9522b36684ddf6715b338fa87a4dfe1a75b6f1b694c1d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
