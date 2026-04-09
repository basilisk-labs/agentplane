---
id: "202604091017-PD9ZJA"
title: "Allow integrate to reconcile already-DONE branch_pr tasks"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
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
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add an integrate reconcile path for already-DONE branch_pr tasks so repair branches can merge without manual GitHub PR merge bypasses."
events:
  -
    type: "status"
    at: "2026-04-09T10:18:08.700Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add an integrate reconcile path for already-DONE branch_pr tasks so repair branches can merge without manual GitHub PR merge bypasses."
doc_version: 3
doc_updated_at: "2026-04-09T10:18:08.713Z"
doc_updated_by: "CODER"
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
