---
id: "202604092232-YJ4245"
title: "Let branch_pr finish close committed task artifacts without self-dirty failure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T22:33:09.676Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T22:37:33.526Z"
  updated_by: "CODER"
  note: "Invalidated memoized git status after branch_pr PR artifact refresh so deterministic close commits see fresh task artifact changes; verified targeted guard/finish unit tests and eslint."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: repair branch_pr finish closeout so deterministic close commits can stage the finish-generated task README and PR artifacts without self-dirty failure."
events:
  -
    type: "status"
    at: "2026-04-09T22:33:14.409Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair branch_pr finish closeout so deterministic close commits can stage the finish-generated task README and PR artifacts without self-dirty failure."
  -
    type: "verify"
    at: "2026-04-09T22:37:33.526Z"
    author: "CODER"
    state: "ok"
    note: "Invalidated memoized git status after branch_pr PR artifact refresh so deterministic close commits see fresh task artifact changes; verified targeted guard/finish unit tests and eslint."
doc_version: 3
doc_updated_at: "2026-04-09T22:37:33.527Z"
doc_updated_by: "CODER"
description: "Fix finish --close-commit so branch_pr closeout can commit the task README and task PR artifacts that finish itself just updated, instead of failing on a self-generated dirty working tree."
sections:
  Summary: |-
    Let branch_pr finish close committed task artifacts without self-dirty failure
    
    Fix finish --close-commit so branch_pr closeout can commit the task README and task PR artifacts that finish itself just updated, instead of failing on a self-generated dirty working tree.
  Scope: |-
    - In scope: Fix finish --close-commit so branch_pr closeout can commit the task README and task PR artifacts that finish itself just updated, instead of failing on a self-generated dirty working tree.
    - Out of scope: unrelated refactors not required for "Let branch_pr finish close committed task artifacts without self-dirty failure".
  Plan: "1. Reproduce why branch_pr finish --close-commit dirties task artifacts before deterministic close commit. 2. Change close-commit staging so branch_pr can commit the finish-generated task README and PR artifacts without violating cleanliness guards. 3. Add regression coverage for finish closeout on branch_pr and then retry closing 9CPEMF/RM6TDD/C3ZHCX."
  Verify Steps: |-
    1. In a branch_pr base checkout, run finish --close-commit for a verified task whose finish path updates the task README and PR artifacts. Expected: finish completes and creates the deterministic close commit instead of failing with Working tree is dirty.
    2. Confirm the close commit stages the task README plus task PR artifacts needed for branch_pr closure. Expected: close commit records only task-scoped artifacts and leaves no unintended tracked changes.
    3. Re-run closeout for 9CPEMF, RM6TDD, and C3ZHCX. Expected: all three tasks can be finished canonically after integrate without manual git restore workarounds.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T22:37:33.526Z — VERIFY — ok
    
    By: CODER
    
    Note: Invalidated memoized git status after branch_pr PR artifact refresh so deterministic close commits see fresh task artifact changes; verified targeted guard/finish unit tests and eslint.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T22:33:14.415Z, excerpt_hash=sha256:c6d782cb12e96242f6efc05c5dbb7314b5f6cc11333b0dc4e105ee4f9318af43
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Let branch_pr finish close committed task artifacts without self-dirty failure

Fix finish --close-commit so branch_pr closeout can commit the task README and task PR artifacts that finish itself just updated, instead of failing on a self-generated dirty working tree.

## Scope

- In scope: Fix finish --close-commit so branch_pr closeout can commit the task README and task PR artifacts that finish itself just updated, instead of failing on a self-generated dirty working tree.
- Out of scope: unrelated refactors not required for "Let branch_pr finish close committed task artifacts without self-dirty failure".

## Plan

1. Reproduce why branch_pr finish --close-commit dirties task artifacts before deterministic close commit. 2. Change close-commit staging so branch_pr can commit the finish-generated task README and PR artifacts without violating cleanliness guards. 3. Add regression coverage for finish closeout on branch_pr and then retry closing 9CPEMF/RM6TDD/C3ZHCX.

## Verify Steps

1. In a branch_pr base checkout, run finish --close-commit for a verified task whose finish path updates the task README and PR artifacts. Expected: finish completes and creates the deterministic close commit instead of failing with Working tree is dirty.
2. Confirm the close commit stages the task README plus task PR artifacts needed for branch_pr closure. Expected: close commit records only task-scoped artifacts and leaves no unintended tracked changes.
3. Re-run closeout for 9CPEMF, RM6TDD, and C3ZHCX. Expected: all three tasks can be finished canonically after integrate without manual git restore workarounds.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T22:37:33.526Z — VERIFY — ok

By: CODER

Note: Invalidated memoized git status after branch_pr PR artifact refresh so deterministic close commits see fresh task artifact changes; verified targeted guard/finish unit tests and eslint.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T22:33:14.415Z, excerpt_hash=sha256:c6d782cb12e96242f6efc05c5dbb7314b5f6cc11333b0dc4e105ee4f9318af43

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
