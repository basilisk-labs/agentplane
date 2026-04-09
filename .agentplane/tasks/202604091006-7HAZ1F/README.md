---
id: "202604091006-7HAZ1F"
title: "Allow integrate to reconcile already-DONE branch_pr tasks"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T10:10:14.639Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T10:16:49.341Z"
  updated_by: "REVIEWER"
  note: "Focused integrate finalize regression tests passed under vitest; integrate cmd tests passed after framework bootstrap; eslint passed on touched integrate finalize files."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add a meta-only integrate recovery path so already-DONE repair tasks can still reconcile PR metadata and deterministic closure on the base branch."
  -
    author: "CODER"
    body: "Start: add a meta-only integrate recovery path so already-DONE repair tasks can still reconcile PR metadata and deterministic closure on the base branch."
events:
  -
    type: "status"
    at: "2026-04-09T10:10:02.184Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a meta-only integrate recovery path so already-DONE repair tasks can still reconcile PR metadata and deterministic closure on the base branch."
  -
    type: "status"
    at: "2026-04-09T10:10:26.706Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: add a meta-only integrate recovery path so already-DONE repair tasks can still reconcile PR metadata and deterministic closure on the base branch."
  -
    type: "verify"
    at: "2026-04-09T10:16:49.341Z"
    author: "REVIEWER"
    state: "ok"
    note: "Focused integrate finalize regression tests passed under vitest; integrate cmd tests passed after framework bootstrap; eslint passed on touched integrate finalize files."
doc_version: 3
doc_updated_at: "2026-04-09T10:16:49.345Z"
doc_updated_by: "CODER"
description: "Teach branch_pr integrate to finish in a meta-only recovery path when the task README is already DONE but PR metadata and base-branch closure still need to be reconciled."
sections:
  Summary: |-
    Allow integrate to reconcile already-DONE branch_pr tasks
    
    Teach branch_pr integrate to finish in a meta-only recovery path when the task README is already DONE but PR metadata and base-branch closure still need to be reconciled.
  Scope: |-
    - In scope: add a recovery path for already-DONE branch_pr tasks during integrate; keep deterministic close-commit behavior intact; add focused regression coverage.
    - Out of scope: unrelated branch_pr refactors or new workflow commands not required for this recovery path.
  Plan: "1. Reproduce the integrate failure for an already-DONE branch_pr task in focused tests. 2. Add a meta-only integrate recovery path that refreshes PR artifacts, preserves existing DONE status metadata, and still creates the deterministic close commit on base. 3. Verify with targeted integrate tests and touched lint/test checks."
  Verify Steps: "1. Run the focused integrate regression test for an already-DONE branch_pr task. Expected: integrate succeeds in meta-only recovery mode and leaves a deterministic close commit. 2. Run the touched integrate/pr tests. Expected: existing non-recovery integrate behavior still passes. 3. Run lint or equivalent checks on touched files. Expected: no new lint failures in changed scope."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T10:16:49.341Z — VERIFY — ok
    
    By: REVIEWER
    
    Note: Focused integrate finalize regression tests passed under vitest; integrate cmd tests passed after framework bootstrap; eslint passed on touched integrate finalize files.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T10:10:26.718Z, excerpt_hash=sha256:187439e75df45100c72f107c0a050f59fd5aebf5c700925af42be8e8da309881
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Allow integrate to reconcile already-DONE branch_pr tasks

Teach branch_pr integrate to finish in a meta-only recovery path when the task README is already DONE but PR metadata and base-branch closure still need to be reconciled.

## Scope

- In scope: add a recovery path for already-DONE branch_pr tasks during integrate; keep deterministic close-commit behavior intact; add focused regression coverage.
- Out of scope: unrelated branch_pr refactors or new workflow commands not required for this recovery path.

## Plan

1. Reproduce the integrate failure for an already-DONE branch_pr task in focused tests. 2. Add a meta-only integrate recovery path that refreshes PR artifacts, preserves existing DONE status metadata, and still creates the deterministic close commit on base. 3. Verify with targeted integrate tests and touched lint/test checks.

## Verify Steps

1. Run the focused integrate regression test for an already-DONE branch_pr task. Expected: integrate succeeds in meta-only recovery mode and leaves a deterministic close commit. 2. Run the touched integrate/pr tests. Expected: existing non-recovery integrate behavior still passes. 3. Run lint or equivalent checks on touched files. Expected: no new lint failures in changed scope.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T10:16:49.341Z — VERIFY — ok

By: REVIEWER

Note: Focused integrate finalize regression tests passed under vitest; integrate cmd tests passed after framework bootstrap; eslint passed on touched integrate finalize files.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T10:10:26.718Z, excerpt_hash=sha256:187439e75df45100c72f107c0a050f59fd5aebf5c700925af42be8e8da309881

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
