---
id: "202604151406-EX4FE7"
title: "Run full Core CI on workflow_dispatch release recovery"
result_summary: "Merged via PR #305."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-15T14:09:10.049Z"
  updated_by: "CODER"
  note: "Verified: workflow_dispatch now forces core=true in Core CI changes gating; ci-workflow-contract.test.ts passes locally."
commit:
  hash: "e859ce5c7bb07d32342c4fb44f96bee9d3059d89"
  message: "🚧 EX4FE7 task: run full Core CI for workflow dispatch recovery (#305)"
comments:
  -
    author: "CODER"
    body: "Start: force workflow_dispatch release-recovery runs through the full Core CI path and then re-run the 0.3.11 recovery publish flow."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #305 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-15T14:07:16.439Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: force workflow_dispatch release-recovery runs through the full Core CI path and then re-run the 0.3.11 recovery publish flow."
  -
    type: "verify"
    at: "2026-04-15T14:09:10.049Z"
    author: "CODER"
    state: "ok"
    note: "Verified: workflow_dispatch now forces core=true in Core CI changes gating; ci-workflow-contract.test.ts passes locally."
  -
    type: "status"
    at: "2026-04-15T14:17:23.567Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #305 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-15T14:17:23.573Z"
doc_updated_by: "INTEGRATOR"
description: "Force Core CI workflow_dispatch runs to treat release-recovery dispatches as core-bearing so test and release-ready jobs execute for exact historical SHAs."
sections:
  Summary: |-
    Run full Core CI on workflow_dispatch release recovery
    
    Force Core CI workflow_dispatch runs to treat release-recovery dispatches as core-bearing so test and release-ready jobs execute for exact historical SHAs.
  Scope: |-
    - In scope: Force Core CI workflow_dispatch runs to treat release-recovery dispatches as core-bearing so test and release-ready jobs execute for exact historical SHAs.
    - Out of scope: unrelated refactors not required for "Run full Core CI on workflow_dispatch release recovery".
  Plan: |-
    1. Force workflow_dispatch Core CI runs to emit core=true in the changes gate when an exact release-recovery dispatch is requested -> verify: workflow contract tests cover dispatch gating.
    2. Verify live workflow_dispatch now runs test/test-windows/release-ready and uploads an exact-sha release-ready artifact -> verify: GitHub Actions run for d95b2762f78815b60407a62f2227136c85cae5ee completes with the alias artifact present.
    3. Publish the recovered 0.3.11 release from the exact historical SHA and verify tag/npm state -> verify: v0.3.11 tag exists and npm exposes 0.3.11 for both publishable packages.
  Verify Steps: |-
    1. Review the requested outcome for "Run full Core CI on workflow_dispatch release recovery". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-15T14:09:10.049Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: workflow_dispatch now forces core=true in Core CI changes gating; ci-workflow-contract.test.ts passes locally.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T14:07:16.468Z, excerpt_hash=sha256:c0093174c29249cc11c8098d60e23506a290bd3ad649fc431a7a10c49bdc0429
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Run full Core CI on workflow_dispatch release recovery

Force Core CI workflow_dispatch runs to treat release-recovery dispatches as core-bearing so test and release-ready jobs execute for exact historical SHAs.

## Scope

- In scope: Force Core CI workflow_dispatch runs to treat release-recovery dispatches as core-bearing so test and release-ready jobs execute for exact historical SHAs.
- Out of scope: unrelated refactors not required for "Run full Core CI on workflow_dispatch release recovery".

## Plan

1. Force workflow_dispatch Core CI runs to emit core=true in the changes gate when an exact release-recovery dispatch is requested -> verify: workflow contract tests cover dispatch gating.
2. Verify live workflow_dispatch now runs test/test-windows/release-ready and uploads an exact-sha release-ready artifact -> verify: GitHub Actions run for d95b2762f78815b60407a62f2227136c85cae5ee completes with the alias artifact present.
3. Publish the recovered 0.3.11 release from the exact historical SHA and verify tag/npm state -> verify: v0.3.11 tag exists and npm exposes 0.3.11 for both publishable packages.

## Verify Steps

1. Review the requested outcome for "Run full Core CI on workflow_dispatch release recovery". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-15T14:09:10.049Z — VERIFY — ok

By: CODER

Note: Verified: workflow_dispatch now forces core=true in Core CI changes gating; ci-workflow-contract.test.ts passes locally.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T14:07:16.468Z, excerpt_hash=sha256:c0093174c29249cc11c8098d60e23506a290bd3ad649fc431a7a10c49bdc0429

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
