---
id: "202604180819-6P5PRC"
title: "Materialize branch_pr close tails without dirtying base"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-18T08:19:34.002Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-18T08:23:57.103Z"
  updated_by: "CODER"
  note: "branch_pr finish now materializes a local task-close branch before the deterministic close commit, returns the checkout to the base branch, and keeps hosted-close/cleanup flows intact; typecheck, finish.unit, targeted cleanup-merged, targeted hosted-close-pr, and focused lint passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove the manual branch_pr close-tail loop by giving finish a deterministic way to materialize tracked closure artifacts without dirtying the base checkout first."
events:
  -
    type: "status"
    at: "2026-04-18T08:19:48.077Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove the manual branch_pr close-tail loop by giving finish a deterministic way to materialize tracked closure artifacts without dirtying the base checkout first."
  -
    type: "verify"
    at: "2026-04-18T08:23:57.103Z"
    author: "CODER"
    state: "ok"
    note: "branch_pr finish now materializes a local task-close branch before the deterministic close commit, returns the checkout to the base branch, and keeps hosted-close/cleanup flows intact; typecheck, finish.unit, targeted cleanup-merged, targeted hosted-close-pr, and focused lint passed."
doc_version: 3
doc_updated_at: "2026-04-18T08:23:57.107Z"
doc_updated_by: "CODER"
description: "Remove the manual branch_pr finish loop where finish marks a task DONE on base but still leaves tracked task artifact changes that must be hand-packaged into a follow-up task-close branch. Add a canonical helper so the close tail can be materialized deterministically without dirtying the base checkout."
sections:
  Summary: |-
    Materialize branch_pr close tails without dirtying base
    
    Remove the manual branch_pr finish loop where finish marks a task DONE on base but still leaves tracked task artifact changes that must be hand-packaged into a follow-up task-close branch. Add a canonical helper so the close tail can be materialized deterministically without dirtying the base checkout.
  Scope: |-
    - In scope: Remove the manual branch_pr finish loop where finish marks a task DONE on base but still leaves tracked task artifact changes that must be hand-packaged into a follow-up task-close branch. Add a canonical helper so the close tail can be materialized deterministically without dirtying the base checkout.
    - Out of scope: unrelated refactors not required for "Materialize branch_pr close tails without dirtying base".
  Plan: "1. Isolate the branch_pr finish path that leaves tracked task README/PR artifacts dirty on base after a hosted merge. 2. Add a deterministic helper or finish-path change that materializes the close tail without requiring a manual ad-hoc task-close branch from a dirty base checkout. 3. Verify with targeted finish/hosted-close/cleanup tests plus typecheck and focused lint."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-18T08:23:57.103Z — VERIFY — ok
    
    By: CODER
    
    Note: branch_pr finish now materializes a local task-close branch before the deterministic close commit, returns the checkout to the base branch, and keeps hosted-close/cleanup flows intact; typecheck, finish.unit, targeted cleanup-merged, targeted hosted-close-pr, and focused lint passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T08:19:48.095Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Materialize branch_pr close tails without dirtying base

Remove the manual branch_pr finish loop where finish marks a task DONE on base but still leaves tracked task artifact changes that must be hand-packaged into a follow-up task-close branch. Add a canonical helper so the close tail can be materialized deterministically without dirtying the base checkout.

## Scope

- In scope: Remove the manual branch_pr finish loop where finish marks a task DONE on base but still leaves tracked task artifact changes that must be hand-packaged into a follow-up task-close branch. Add a canonical helper so the close tail can be materialized deterministically without dirtying the base checkout.
- Out of scope: unrelated refactors not required for "Materialize branch_pr close tails without dirtying base".

## Plan

1. Isolate the branch_pr finish path that leaves tracked task README/PR artifacts dirty on base after a hosted merge. 2. Add a deterministic helper or finish-path change that materializes the close tail without requiring a manual ad-hoc task-close branch from a dirty base checkout. 3. Verify with targeted finish/hosted-close/cleanup tests plus typecheck and focused lint.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-18T08:23:57.103Z — VERIFY — ok

By: CODER

Note: branch_pr finish now materializes a local task-close branch before the deterministic close commit, returns the checkout to the base branch, and keeps hosted-close/cleanup flows intact; typecheck, finish.unit, targeted cleanup-merged, targeted hosted-close-pr, and focused lint passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-18T08:19:48.095Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
