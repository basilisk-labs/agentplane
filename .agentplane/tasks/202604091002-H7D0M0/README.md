---
id: "202604091002-H7D0M0"
title: "Make integrate idempotent for already DONE branch_pr tasks"
result_summary: "Superseded by 202604091006-7HAZ1F."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "incidents"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T10:02:49.357Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T10:17:45.178Z"
  updated_by: "REVIEWER"
  note: "Focused integrate regressions passed: vitest finalize + branch_pr integrate incident flows now cover already-DONE task shipment, and eslint passed on touched integrate files."
commit:
  hash: "471c75ca8832526b5d02e359c0c09e95e19787db"
  message: "✅ 7HAZ1F close: integrate already-DONE branch_pr recovery"
comments:
  -
    author: "CODER"
    body: "Start: make branch_pr integrate handle already-DONE repair branches without partial base mutations, while still syncing PR metadata and promoting incidents when the branch is finally shipped."
  -
    author: "INTEGRATOR"
    body: "Verified: this duplicate DONE-recovery branch was superseded by the shipped 202604091006-7HAZ1F path on local main, and its failing GitHub PR was closed to avoid redundant drift."
events:
  -
    type: "status"
    at: "2026-04-09T10:02:50.268Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make branch_pr integrate handle already-DONE repair branches without partial base mutations, while still syncing PR metadata and promoting incidents when the branch is finally shipped."
  -
    type: "verify"
    at: "2026-04-09T10:17:45.178Z"
    author: "REVIEWER"
    state: "ok"
    note: "Focused integrate regressions passed: vitest finalize + branch_pr integrate incident flows now cover already-DONE task shipment, and eslint passed on touched integrate files."
  -
    type: "status"
    at: "2026-04-09T10:46:02.475Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: this duplicate DONE-recovery branch was superseded by the shipped 202604091006-7HAZ1F path on local main, and its failing GitHub PR was closed to avoid redundant drift."
doc_version: 3
doc_updated_at: "2026-04-09T10:46:02.476Z"
doc_updated_by: "INTEGRATOR"
description: "When a repair or reconcile task is already marked DONE on its task branch before shipment, integrate currently updates PR artifacts on base and then fails because writeFinishedTasks rejects DONE. Add an idempotent branch_pr integrate path that ships the branch, keeps PR metadata consistent, and still promotes incidents without leaving partial mutations behind."
sections:
  Summary: |-
    Make integrate idempotent for already DONE branch_pr tasks
    
    When a repair or reconcile task is already marked DONE on its task branch before shipment, integrate currently updates PR artifacts on base and then fails because writeFinishedTasks rejects DONE. Add an idempotent branch_pr integrate path that ships the branch, keeps PR metadata consistent, and still promotes incidents without leaving partial mutations behind.
  Scope: |-
    - In scope: When a repair or reconcile task is already marked DONE on its task branch before shipment, integrate currently updates PR artifacts on base and then fails because writeFinishedTasks rejects DONE. Add an idempotent branch_pr integrate path that ships the branch, keeps PR metadata consistent, and still promotes incidents without leaving partial mutations behind.
    - Out of scope: unrelated refactors not required for "Make integrate idempotent for already DONE branch_pr tasks".
  Plan: "1. Reproduce the DONE-task integrate failure path and trace where integrate mutates PR artifacts before it validates task closability. 2. Add an idempotent finalize path for already DONE branch_pr tasks that still syncs PR metadata and incident promotion without re-closing the task. 3. Lock the behavior with focused integrate/incident regression tests and verify the repaired ship path end-to-end."
  Verify Steps: "1. Reproduce the prior DONE-task integrate path with the focused integrate regression fixture. Expected: integrate succeeds without leaving dirty base-checkout PR artifacts when the task snapshot is already DONE. 2. Run the focused integrate and incidents test slices for the new recovery path. Expected: PR metadata is synced, incidents promotion still runs, and no duplicate close-state is written. 3. Run eslint on touched integrate/task files. Expected: no lint violations in the modified scope."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T10:17:45.178Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Focused integrate regressions passed: vitest finalize + branch_pr integrate incident flows now cover already-DONE task shipment, and eslint passed on touched integrate files.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T10:02:50.279Z, excerpt_hash=sha256:a794038b7ad95883d8644f307a6b6c5b8daf119b5e3288592c700884316b2f40
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make integrate idempotent for already DONE branch_pr tasks

When a repair or reconcile task is already marked DONE on its task branch before shipment, integrate currently updates PR artifacts on base and then fails because writeFinishedTasks rejects DONE. Add an idempotent branch_pr integrate path that ships the branch, keeps PR metadata consistent, and still promotes incidents without leaving partial mutations behind.

## Scope

- In scope: When a repair or reconcile task is already marked DONE on its task branch before shipment, integrate currently updates PR artifacts on base and then fails because writeFinishedTasks rejects DONE. Add an idempotent branch_pr integrate path that ships the branch, keeps PR metadata consistent, and still promotes incidents without leaving partial mutations behind.
- Out of scope: unrelated refactors not required for "Make integrate idempotent for already DONE branch_pr tasks".

## Plan

1. Reproduce the DONE-task integrate failure path and trace where integrate mutates PR artifacts before it validates task closability. 2. Add an idempotent finalize path for already DONE branch_pr tasks that still syncs PR metadata and incident promotion without re-closing the task. 3. Lock the behavior with focused integrate/incident regression tests and verify the repaired ship path end-to-end.

## Verify Steps

1. Reproduce the prior DONE-task integrate path with the focused integrate regression fixture. Expected: integrate succeeds without leaving dirty base-checkout PR artifacts when the task snapshot is already DONE. 2. Run the focused integrate and incidents test slices for the new recovery path. Expected: PR metadata is synced, incidents promotion still runs, and no duplicate close-state is written. 3. Run eslint on touched integrate/task files. Expected: no lint violations in the modified scope.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T10:17:45.178Z — VERIFY — ok

By: REVIEWER

Note: Focused integrate regressions passed: vitest finalize + branch_pr integrate incident flows now cover already-DONE task shipment, and eslint passed on touched integrate files.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T10:02:50.279Z, excerpt_hash=sha256:a794038b7ad95883d8644f307a6b6c5b8daf119b5e3288592c700884316b2f40

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
