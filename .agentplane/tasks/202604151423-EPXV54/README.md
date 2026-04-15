---
id: "202604151423-EPXV54"
title: "Split exact-sha release recovery from broad Core CI test surface"
result_summary: "Merged via PR #307."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-15T14:23:40.207Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-15T14:25:41.963Z"
  updated_by: "CODER"
  note: "Verified: exact-sha workflow_dispatch recovery now uses a publishability-only validation path; ci-workflow-contract.test.ts passes locally."
commit:
  hash: "015e648b7472ded369f6b7d05a88c8f810cba4aa"
  message: "release: Split exact-sha release recovery from broad Core CI test surface (EPXV54) (#307)"
comments:
  -
    author: "CODER"
    body: "Start: split exact-sha workflow_dispatch release recovery into a publishability-only path, then rerun 0.3.11 recovery and publish."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #307 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-15T14:23:51.541Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split exact-sha workflow_dispatch release recovery into a publishability-only path, then rerun 0.3.11 recovery and publish."
  -
    type: "verify"
    at: "2026-04-15T14:25:41.963Z"
    author: "CODER"
    state: "ok"
    note: "Verified: exact-sha workflow_dispatch recovery now uses a publishability-only validation path; ci-workflow-contract.test.ts passes locally."
  -
    type: "status"
    at: "2026-04-15T14:47:35.647Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #307 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-15T14:47:35.652Z"
doc_updated_by: "INTEGRATOR"
description: "Add a workflow_dispatch release-recovery validation path that proves exact historical SHA publishability and emits release-ready artifacts without requiring the full evolving Core CI suite to pass on old commits."
sections:
  Summary: |-
    Split exact-sha release recovery from broad Core CI test surface
    
    Add a workflow_dispatch release-recovery validation path that proves exact historical SHA publishability and emits release-ready artifacts without requiring the full evolving Core CI suite to pass on old commits.
  Scope: |-
    - In scope: Add a workflow_dispatch release-recovery validation path that proves exact historical SHA publishability and emits release-ready artifacts without requiring the full evolving Core CI suite to pass on old commits.
    - Out of scope: unrelated refactors not required for "Split exact-sha release recovery from broad Core CI test surface".
  Plan: |-
    1. Split workflow_dispatch exact-sha release recovery from the broad Core CI test surface while keeping ordinary push/pull_request behavior unchanged -> verify: CI workflow contract covers the separate recovery path.
    2. Prove the recovery path on d95b2762f78815b60407a62f2227136c85cae5ee by producing an exact-sha release-ready artifact without full broad-test coupling -> verify: resolver accepts the new run and finds release-ready-d95b2762f78815b60407a62f2227136c85cae5ee.
    3. Publish the recovered 0.3.11 release and verify public release state -> verify: v0.3.11 tag exists and npm exposes 0.3.11 for both publishable packages.
  Verify Steps: |-
    1. Review the requested outcome for "Split exact-sha release recovery from broad Core CI test surface". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-15T14:25:41.963Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: exact-sha workflow_dispatch recovery now uses a publishability-only validation path; ci-workflow-contract.test.ts passes locally.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T14:23:51.571Z, excerpt_hash=sha256:1a44d5f02eba91d988264d0c7a2b863ec7840be31f440b7c5652d3cf8e20bcfe
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Split exact-sha release recovery from broad Core CI test surface

Add a workflow_dispatch release-recovery validation path that proves exact historical SHA publishability and emits release-ready artifacts without requiring the full evolving Core CI suite to pass on old commits.

## Scope

- In scope: Add a workflow_dispatch release-recovery validation path that proves exact historical SHA publishability and emits release-ready artifacts without requiring the full evolving Core CI suite to pass on old commits.
- Out of scope: unrelated refactors not required for "Split exact-sha release recovery from broad Core CI test surface".

## Plan

1. Split workflow_dispatch exact-sha release recovery from the broad Core CI test surface while keeping ordinary push/pull_request behavior unchanged -> verify: CI workflow contract covers the separate recovery path.
2. Prove the recovery path on d95b2762f78815b60407a62f2227136c85cae5ee by producing an exact-sha release-ready artifact without full broad-test coupling -> verify: resolver accepts the new run and finds release-ready-d95b2762f78815b60407a62f2227136c85cae5ee.
3. Publish the recovered 0.3.11 release and verify public release state -> verify: v0.3.11 tag exists and npm exposes 0.3.11 for both publishable packages.

## Verify Steps

1. Review the requested outcome for "Split exact-sha release recovery from broad Core CI test surface". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-15T14:25:41.963Z — VERIFY — ok

By: CODER

Note: Verified: exact-sha workflow_dispatch recovery now uses a publishability-only validation path; ci-workflow-contract.test.ts passes locally.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T14:23:51.571Z, excerpt_hash=sha256:1a44d5f02eba91d988264d0c7a2b863ec7840be31f440b7c5652d3cf8e20bcfe

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
