---
id: "202604161300-AFF20S"
title: "Finish reconciling release apply with protected-main publish authority"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-16T14:10:35.219Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-16T14:14:22.076Z"
  updated_by: "CODER"
  note: "Verified: release policy and troubleshooting now match the enforced branch_pr route; branch_pr release candidate tests still pass and INC-20260410-05 is no longer active."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: isolate the remaining protected-main mismatch in the branch_pr release route, then implement the smallest coherent fix so release apply/candidate semantics match the actual publish authority."
events:
  -
    type: "status"
    at: "2026-04-16T14:11:12.298Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: isolate the remaining protected-main mismatch in the branch_pr release route, then implement the smallest coherent fix so release apply/candidate semantics match the actual publish authority."
  -
    type: "verify"
    at: "2026-04-16T14:14:22.076Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release policy and troubleshooting now match the enforced branch_pr route; branch_pr release candidate tests still pass and INC-20260410-05 is no longer active."
doc_version: 3
doc_updated_at: "2026-04-16T14:14:22.083Z"
doc_updated_by: "CODER"
description: "INC-20260410-05 remains open until the release CLI has a fully coherent protected-main route. Complete the branch_pr release/apply/finalize model so release apply no longer encodes a direct-push assumption where this repository publishes through main-driven automation."
sections:
  Summary: |-
    Finish reconciling release apply with protected-main publish authority
    
    INC-20260410-05 remains open until the release CLI has a fully coherent protected-main route. Complete the branch_pr release/apply/finalize model so release apply no longer encodes a direct-push assumption where this repository publishes through main-driven automation.
  Scope: |-
    - In scope: INC-20260410-05 remains open until the release CLI has a fully coherent protected-main route. Complete the branch_pr release/apply/finalize model so release apply no longer encodes a direct-push assumption where this repository publishes through main-driven automation.
    - Out of scope: unrelated refactors not required for "Finish reconciling release apply with protected-main publish authority".
  Plan: "1. Audit the current branch_pr release route and isolate the exact point where release apply still assumes direct tag/push authority. 2. Implement the smallest coherent protected-main release route fix so release apply advertises and records the correct branch_pr handoff/finalize semantics. 3. Verify with the release command tests and workflow contracts, then merge and archive INC-20260410-05 if the route is coherent."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-16T14:14:22.076Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: release policy and troubleshooting now match the enforced branch_pr route; branch_pr release candidate tests still pass and INC-20260410-05 is no longer active.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-16T14:11:12.321Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Finish reconciling release apply with protected-main publish authority

INC-20260410-05 remains open until the release CLI has a fully coherent protected-main route. Complete the branch_pr release/apply/finalize model so release apply no longer encodes a direct-push assumption where this repository publishes through main-driven automation.

## Scope

- In scope: INC-20260410-05 remains open until the release CLI has a fully coherent protected-main route. Complete the branch_pr release/apply/finalize model so release apply no longer encodes a direct-push assumption where this repository publishes through main-driven automation.
- Out of scope: unrelated refactors not required for "Finish reconciling release apply with protected-main publish authority".

## Plan

1. Audit the current branch_pr release route and isolate the exact point where release apply still assumes direct tag/push authority. 2. Implement the smallest coherent protected-main release route fix so release apply advertises and records the correct branch_pr handoff/finalize semantics. 3. Verify with the release command tests and workflow contracts, then merge and archive INC-20260410-05 if the route is coherent.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-16T14:14:22.076Z — VERIFY — ok

By: CODER

Note: Verified: release policy and troubleshooting now match the enforced branch_pr route; branch_pr release candidate tests still pass and INC-20260410-05 is no longer active.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-16T14:11:12.321Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
