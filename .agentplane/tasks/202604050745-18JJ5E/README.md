---
id: "202604050745-18JJ5E"
title: "Fix branch_pr shipped-task reconciliation and diagnostics"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-05T07:47:37.913Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-05T07:47:05.169Z"
doc_updated_by: "ORCHESTRATOR"
description: "Detect branch_pr tasks whose work is already shipped on the base branch but whose local task lifecycle was never closed, and make doctor/normalization surface or reconcile that state deterministically."
sections:
  Summary: |-
    Fix branch_pr shipped-task reconciliation and diagnostics
    
    Detect branch_pr tasks whose work is already shipped on the base branch but whose local task lifecycle was never closed, and make doctor/normalization surface or reconcile that state deterministically.
  Scope: |-
    - In scope: Detect branch_pr tasks whose work is already shipped on the base branch but whose local task lifecycle was never closed, and make doctor/normalization surface or reconcile that state deterministically.
    - Out of scope: unrelated refactors not required for "Fix branch_pr shipped-task reconciliation and diagnostics".
  Plan: "1. Audit the current doctor, task normalize, hosted-close, and hosted-merge-sync paths to determine where a shipped branch_pr task can remain DOING without any deterministic repair path. 2. Define the minimal canonical reconciliation rule for this state, keyed off base-branch ancestry plus existing task/PR metadata rather than guesswork. 3. Implement workflow diagnostics and the reconciliation path, then add focused regression coverage for the stale shipped-task fixture. 4. Run targeted verification and record the resulting behavior contract in the task artifacts."
  Verify Steps: "1. Reproduce a branch_pr task whose implementation commit is already reachable from the base branch while the task still remains DOING locally. Expected: doctor and/or task normalization report the stale shipped-task state instead of leaving it silent. 2. Run the new reconciliation path on that fixture. Expected: the task is deterministically moved to the correct DONE/commit state without inventing a merge that never happened. 3. Run the targeted workflow tests and package build. Expected: shipped-task reconciliation passes regressions and the touched workflow code still builds cleanly."
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

Fix branch_pr shipped-task reconciliation and diagnostics

Detect branch_pr tasks whose work is already shipped on the base branch but whose local task lifecycle was never closed, and make doctor/normalization surface or reconcile that state deterministically.

## Scope

- In scope: Detect branch_pr tasks whose work is already shipped on the base branch but whose local task lifecycle was never closed, and make doctor/normalization surface or reconcile that state deterministically.
- Out of scope: unrelated refactors not required for "Fix branch_pr shipped-task reconciliation and diagnostics".

## Plan

1. Audit the current doctor, task normalize, hosted-close, and hosted-merge-sync paths to determine where a shipped branch_pr task can remain DOING without any deterministic repair path. 2. Define the minimal canonical reconciliation rule for this state, keyed off base-branch ancestry plus existing task/PR metadata rather than guesswork. 3. Implement workflow diagnostics and the reconciliation path, then add focused regression coverage for the stale shipped-task fixture. 4. Run targeted verification and record the resulting behavior contract in the task artifacts.

## Verify Steps

1. Reproduce a branch_pr task whose implementation commit is already reachable from the base branch while the task still remains DOING locally. Expected: doctor and/or task normalization report the stale shipped-task state instead of leaving it silent. 2. Run the new reconciliation path on that fixture. Expected: the task is deterministically moved to the correct DONE/commit state without inventing a merge that never happened. 3. Run the targeted workflow tests and package build. Expected: shipped-task reconciliation passes regressions and the touched workflow code still builds cleanly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
