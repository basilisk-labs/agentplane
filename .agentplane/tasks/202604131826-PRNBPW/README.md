---
id: "202604131826-PRNBPW"
title: "Reduce branch_pr release friction"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-13T18:26:12.469Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-14T09:38:14.010Z"
  updated_by: "CODER"
  note: "Verified: targeted branch_pr suites pass (75/75); pr check passes; protected-main integrate now fails fast and pr open/update auto-commit task PR artifacts."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: inspect protected-main integrate behavior and PR artifact refresh churn, then implement the smallest safe fixes with targeted verification."
events:
  -
    type: "status"
    at: "2026-04-13T18:26:54.480Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect protected-main integrate behavior and PR artifact refresh churn, then implement the smallest safe fixes with targeted verification."
  -
    type: "verify"
    at: "2026-04-14T09:38:14.010Z"
    author: "CODER"
    state: "ok"
    note: "Verified: targeted branch_pr suites pass (75/75); pr check passes; protected-main integrate now fails fast and pr open/update auto-commit task PR artifacts."
doc_version: 3
doc_updated_at: "2026-04-14T09:38:14.025Z"
doc_updated_by: "CODER"
description: "Prevent local integrate from mutating protected main, reduce tracked PR artifact churn, and then prepare the next patch release."
sections:
  Summary: |-
    Reduce branch_pr release friction
    
    Prevent local integrate from mutating protected main, reduce tracked PR artifact churn, and then prepare the next patch release.
  Scope: |-
    - In scope: Prevent local integrate from mutating protected main, reduce tracked PR artifact churn, and then prepare the next patch release.
    - Out of scope: unrelated refactors not required for "Reduce branch_pr release friction".
  Plan: |-
    1. Guard integrate against local protected-main mutation and add tests -> verify: targeted integrate tests cover PR-only protected main path without mutating base checkout.
    2. Reduce tracked PR artifact churn during pr open/update and add tests -> verify: branch_pr tests no longer require artifact-only follow-up commits after code changes.
    3. Run a live branch_pr cycle through GitHub merge and hosted close -> verify: task lands in origin/main as DONE and cleanup removes task refs/worktree.
    4. Cut the next patch release on the hardened flow -> verify: release task lands in origin/main with green checks and clean doctor output.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-14T09:38:14.010Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: targeted branch_pr suites pass (75/75); pr check passes; protected-main integrate now fails fast and pr open/update auto-commit task PR artifacts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T18:26:54.491Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Reduce branch_pr release friction

Prevent local integrate from mutating protected main, reduce tracked PR artifact churn, and then prepare the next patch release.

## Scope

- In scope: Prevent local integrate from mutating protected main, reduce tracked PR artifact churn, and then prepare the next patch release.
- Out of scope: unrelated refactors not required for "Reduce branch_pr release friction".

## Plan

1. Guard integrate against local protected-main mutation and add tests -> verify: targeted integrate tests cover PR-only protected main path without mutating base checkout.
2. Reduce tracked PR artifact churn during pr open/update and add tests -> verify: branch_pr tests no longer require artifact-only follow-up commits after code changes.
3. Run a live branch_pr cycle through GitHub merge and hosted close -> verify: task lands in origin/main as DONE and cleanup removes task refs/worktree.
4. Cut the next patch release on the hardened flow -> verify: release task lands in origin/main with green checks and clean doctor output.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-14T09:38:14.010Z — VERIFY — ok

By: CODER

Note: Verified: targeted branch_pr suites pass (75/75); pr check passes; protected-main integrate now fails fast and pr open/update auto-commit task PR artifacts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T18:26:54.491Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
