---
id: "202604072308-A1XE27"
title: "Make integrate tolerate forward-compatible pr/meta schema from task branches"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-07T23:20:04.257Z"
  updated_by: "CODER"
  note: "Command: targeted integrate forward-compatible test + pr-meta forward-compatible test + eslint; Result: pass; Evidence: integrate now accepts forward-compatible branch PR metadata without loosening strict same-checkout parsing; Scope: base-side integrate preparation for branch_pr schema evolution."
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-04-07T23:20:04.257Z"
    author: "CODER"
    state: "ok"
    note: "Command: targeted integrate forward-compatible test + pr-meta forward-compatible test + eslint; Result: pass; Evidence: integrate now accepts forward-compatible branch PR metadata without loosening strict same-checkout parsing; Scope: base-side integrate preparation for branch_pr schema evolution."
doc_version: 3
doc_updated_at: "2026-04-07T23:20:04.262Z"
doc_updated_by: "CODER"
description: "Base-branch integrate should not fail when a task branch carries newer pr/meta fields or enum values than the current base runtime; integrate should extract the branch/base/verify freshness fields it needs without rejecting forward-compatible branch artifacts."
sections:
  Summary: |-
    Make integrate tolerate forward-compatible pr/meta schema from task branches
    
    Base-branch integrate should not fail when a task branch carries newer pr/meta fields or enum values than the current base runtime; integrate should extract the branch/base/verify freshness fields it needs without rejecting forward-compatible branch artifacts.
  Scope: |-
    - In scope: Base-branch integrate should not fail when a task branch carries newer pr/meta fields or enum values than the current base runtime; integrate should extract the branch/base/verify freshness fields it needs without rejecting forward-compatible branch artifacts.
    - Out of scope: unrelated refactors not required for "Make integrate tolerate forward-compatible pr/meta schema from task branches".
  Plan: "1. Reproduce the integrate failure with a forward-compatible branch-only pr/meta variant and lock it with tests. 2. Introduce a branch-artifact PR meta reader for integrate that tolerates unknown future fields or enum values while preserving strict validation for same-checkout command paths. 3. Re-run targeted integrate and PR artifact tests, publish task artifacts, and integrate the fix through branch_pr."
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T23:20:04.257Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: targeted integrate forward-compatible test + pr-meta forward-compatible test + eslint; Result: pass; Evidence: integrate now accepts forward-compatible branch PR metadata without loosening strict same-checkout parsing; Scope: base-side integrate preparation for branch_pr schema evolution.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T23:12:00.032Z, excerpt_hash=sha256:2df24f32d0cf162aa1beaf7d10904fdc97fbc9096f6cd02404ef895b76b8b34b
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make integrate tolerate forward-compatible pr/meta schema from task branches

Base-branch integrate should not fail when a task branch carries newer pr/meta fields or enum values than the current base runtime; integrate should extract the branch/base/verify freshness fields it needs without rejecting forward-compatible branch artifacts.

## Scope

- In scope: Base-branch integrate should not fail when a task branch carries newer pr/meta fields or enum values than the current base runtime; integrate should extract the branch/base/verify freshness fields it needs without rejecting forward-compatible branch artifacts.
- Out of scope: unrelated refactors not required for "Make integrate tolerate forward-compatible pr/meta schema from task branches".

## Plan

1. Reproduce the integrate failure with a forward-compatible branch-only pr/meta variant and lock it with tests. 2. Introduce a branch-artifact PR meta reader for integrate that tolerates unknown future fields or enum values while preserving strict validation for same-checkout command paths. 3. Re-run targeted integrate and PR artifact tests, publish task artifacts, and integrate the fix through branch_pr.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T23:20:04.257Z — VERIFY — ok

By: CODER

Note: Command: targeted integrate forward-compatible test + pr-meta forward-compatible test + eslint; Result: pass; Evidence: integrate now accepts forward-compatible branch PR metadata without loosening strict same-checkout parsing; Scope: base-side integrate preparation for branch_pr schema evolution.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T23:12:00.032Z, excerpt_hash=sha256:2df24f32d0cf162aa1beaf7d10904fdc97fbc9096f6cd02404ef895b76b8b34b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
