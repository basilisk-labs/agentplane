---
id: "202603250545-PX1491"
title: "Repair branch_pr PR artifact resolution on base checkout for local backend"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "branch_pr"
  - "pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-25T05:55:56.068Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-25T05:56:13.367Z"
  updated_by: "CODER"
  note: "Targeted pr-flow regressions passed, source build succeeded, and a live base-checkout pr check succeeded against branch-backed PR artifacts."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: repair branch_pr base-checkout PR artifact resolution so pr check and integrate can consume canonical owner-side PR artifacts without manual copying."
events:
  -
    type: "status"
    at: "2026-03-25T05:46:20.094Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair branch_pr base-checkout PR artifact resolution so pr check and integrate can consume canonical owner-side PR artifacts without manual copying."
  -
    type: "verify"
    at: "2026-03-25T05:56:13.367Z"
    author: "CODER"
    state: "ok"
    note: "Targeted pr-flow regressions passed, source build succeeded, and a live base-checkout pr check succeeded against branch-backed PR artifacts."
doc_version: 3
doc_updated_at: "2026-03-25T05:56:13.369Z"
doc_updated_by: "CODER"
description: "Make branch_pr pr check/integrate work from the base checkout when PR artifacts live only in a task worktree under the local backend, without manual copying or bypassing canonical workflow."
sections:
  Summary: |-
    Repair branch_pr PR artifact resolution on base checkout for local backend
    
    Make branch_pr pr check/integrate work from the base checkout when PR artifacts live only in a task worktree under the local backend, without manual copying or bypassing canonical workflow.
  Scope: |-
    - In scope: Make branch_pr pr check/integrate work from the base checkout when PR artifacts live only in a task worktree under the local backend, without manual copying or bypassing canonical workflow.
    - Out of scope: unrelated refactors not required for "Repair branch_pr PR artifact resolution on base checkout for local backend".
  Plan: |-
    1. Reproduce why `pr check` on the base checkout rejects valid branch_pr PR artifacts when they exist only in task branch history under the local backend.
    2. Implement branch-backed artifact resolution for `pr check` without weakening local artifact validation semantics.
    3. Add regression coverage and confirm a live base-checkout `pr check` succeeds against committed task-branch PR artifacts.
  Verify Steps: |-
    1. Run `agentplane pr check 202603250509-6CN8CS` on the base checkout using a CLI build that includes this fix. Expected: PR validation succeeds even when `.agentplane/tasks/<task-id>/pr/**` exists only on the task branch.
    2. Run targeted `pr` flow regressions. Expected: both local-artifact and branch-backed `pr check` paths pass.
    3. Confirm missing-marker and invalid-meta failures still report the same validation errors. Expected: `pr check` remains strict for malformed PR artifacts.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-25T05:56:13.367Z — VERIFY — ok
    
    By: CODER
    
    Note: Targeted pr-flow regressions passed, source build succeeded, and a live base-checkout pr check succeeded against branch-backed PR artifacts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T05:55:55.858Z, excerpt_hash=sha256:c07f433697f7e3b564e78b6f8f39eb1aa15bbbc6ef72fc710e8ec417efc1fe55
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Repair branch_pr PR artifact resolution on base checkout for local backend

Make branch_pr pr check/integrate work from the base checkout when PR artifacts live only in a task worktree under the local backend, without manual copying or bypassing canonical workflow.

## Scope

- In scope: Make branch_pr pr check/integrate work from the base checkout when PR artifacts live only in a task worktree under the local backend, without manual copying or bypassing canonical workflow.
- Out of scope: unrelated refactors not required for "Repair branch_pr PR artifact resolution on base checkout for local backend".

## Plan

1. Reproduce why `pr check` on the base checkout rejects valid branch_pr PR artifacts when they exist only in task branch history under the local backend.
2. Implement branch-backed artifact resolution for `pr check` without weakening local artifact validation semantics.
3. Add regression coverage and confirm a live base-checkout `pr check` succeeds against committed task-branch PR artifacts.

## Verify Steps

1. Run `agentplane pr check 202603250509-6CN8CS` on the base checkout using a CLI build that includes this fix. Expected: PR validation succeeds even when `.agentplane/tasks/<task-id>/pr/**` exists only on the task branch.
2. Run targeted `pr` flow regressions. Expected: both local-artifact and branch-backed `pr check` paths pass.
3. Confirm missing-marker and invalid-meta failures still report the same validation errors. Expected: `pr check` remains strict for malformed PR artifacts.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-25T05:56:13.367Z — VERIFY — ok

By: CODER

Note: Targeted pr-flow regressions passed, source build succeeded, and a live base-checkout pr check succeeded against branch-backed PR artifacts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T05:55:55.858Z, excerpt_hash=sha256:c07f433697f7e3b564e78b6f8f39eb1aa15bbbc6ef72fc710e8ec417efc1fe55

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
