---
id: "202604091017-PD9ZJA"
title: "Allow integrate to reconcile already-DONE branch_pr tasks"
result_summary: "Superseded by 202604091006-7HAZ1F."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "git"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T10:18:08.081Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "471c75ca8832526b5d02e359c0c09e95e19787db"
  message: "✅ 7HAZ1F close: integrate already-DONE branch_pr recovery"
comments:
  -
    author: "CODER"
    body: "Start: add an integrate reconcile path for already-DONE branch_pr tasks so repair branches can merge without manual GitHub PR merge bypasses."
  -
    author: "INTEGRATOR"
    body: "Verified: this later empty scaffold for the same integrate-recovery idea never shipped distinct code and is superseded by the shipped 202604091006-7HAZ1F path on local main."
events:
  -
    type: "status"
    at: "2026-04-09T10:18:08.700Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add an integrate reconcile path for already-DONE branch_pr tasks so repair branches can merge without manual GitHub PR merge bypasses."
  -
    type: "status"
    at: "2026-04-09T10:46:14.880Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: this later empty scaffold for the same integrate-recovery idea never shipped distinct code and is superseded by the shipped 202604091006-7HAZ1F path on local main."
doc_version: 3
doc_updated_at: "2026-04-09T10:46:14.880Z"
doc_updated_by: "INTEGRATOR"
description: "Teach integrate/finalize to handle already-DONE branch_pr tasks as a meta-only reconciliation path so repair branches can merge without manual GitHub merge bypasses."
sections:
  Summary: |-
    Allow integrate to reconcile already-DONE branch_pr tasks
    
    Teach integrate/finalize to handle already-DONE branch_pr tasks as a meta-only reconciliation path so repair branches can merge without manual GitHub merge bypasses.
  Scope: |-
    - In scope: Teach integrate/finalize to handle already-DONE branch_pr tasks as a meta-only reconciliation path so repair branches can merge without manual GitHub merge bypasses.
    - Out of scope: unrelated refactors not required for "Allow integrate to reconcile already-DONE branch_pr tasks".
  Plan: "1. Reproduce integrate failure when a branch_pr task is already DONE before integrate. 2. Add a meta-only finalize path that syncs PR artifacts and close metadata without rewriting DONE task state. 3. Verify already-DONE repair branches can integrate cleanly and still preserve deterministic artifact updates."
  Verify Steps: |-
    1. Reproduce integrate on an already-DONE branch_pr task. Expected: integrate completes via a meta-only reconciliation path instead of failing with Task is already DONE.
    2. Run focused integrate/finalize tests for the new path. Expected: PR metadata becomes MERGED and close-artifact handling stays deterministic.
    3. Run touched lint/test checks. Expected: existing integrate flows still pass unchanged.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Allow integrate to reconcile already-DONE branch_pr tasks

Teach integrate/finalize to handle already-DONE branch_pr tasks as a meta-only reconciliation path so repair branches can merge without manual GitHub merge bypasses.

## Scope

- In scope: Teach integrate/finalize to handle already-DONE branch_pr tasks as a meta-only reconciliation path so repair branches can merge without manual GitHub merge bypasses.
- Out of scope: unrelated refactors not required for "Allow integrate to reconcile already-DONE branch_pr tasks".

## Plan

1. Reproduce integrate failure when a branch_pr task is already DONE before integrate. 2. Add a meta-only finalize path that syncs PR artifacts and close metadata without rewriting DONE task state. 3. Verify already-DONE repair branches can integrate cleanly and still preserve deterministic artifact updates.

## Verify Steps

1. Reproduce integrate on an already-DONE branch_pr task. Expected: integrate completes via a meta-only reconciliation path instead of failing with Task is already DONE.
2. Run focused integrate/finalize tests for the new path. Expected: PR metadata becomes MERGED and close-artifact handling stays deterministic.
3. Run touched lint/test checks. Expected: existing integrate flows still pass unchanged.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
