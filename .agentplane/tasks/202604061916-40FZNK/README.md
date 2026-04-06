---
id: "202604061916-40FZNK"
title: "Detect stale open PR drift for DONE tasks"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T19:16:50.948Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T19:52:44.544Z"
  updated_by: "CODER"
  note: "Doctor regression test passed for DONE branch_pr tasks with open PR artifacts; eslint passed; detection no longer depends on a surviving local task branch."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add doctor diagnostics for DONE branch_pr tasks whose PR artifacts still look open or unreconciled."
events:
  -
    type: "status"
    at: "2026-04-06T19:52:24.935Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add doctor diagnostics for DONE branch_pr tasks whose PR artifacts still look open or unreconciled."
  -
    type: "verify"
    at: "2026-04-06T19:52:44.544Z"
    author: "CODER"
    state: "ok"
    note: "Doctor regression test passed for DONE branch_pr tasks with open PR artifacts; eslint passed; detection no longer depends on a surviving local task branch."
doc_version: 3
doc_updated_at: "2026-04-06T19:52:44.550Z"
doc_updated_by: "CODER"
description: "Surface DONE tasks whose GitHub PRs remain open and diverged so operators can reconcile stale remote task branches before they linger for weeks."
sections:
  Summary: |-
    Detect stale open PR drift for DONE tasks
    
    Surface DONE tasks whose GitHub PRs remain open and diverged so operators can reconcile stale remote task branches before they linger for weeks.
  Scope: |-
    - In scope: Surface DONE tasks whose GitHub PRs remain open and diverged so operators can reconcile stale remote task branches before they linger for weeks.
    - Out of scope: unrelated refactors not required for "Detect stale open PR drift for DONE tasks".
  Plan: "1. Trace how doctor and branch_pr reconciliation currently detect stale shipped tasks and what they miss for DONE tasks with open diverged PRs. 2. Add a low-noise detection path that surfaces this drift before it lingers. 3. Lock the behavior with CLI or command tests. 4. Verify with targeted tests and a realistic stale-PR fixture."
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. <Action>. Expected: <observable result>.
    2. <Action>. Expected: <observable result>.
    3. <Action>. Expected: <observable result>.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T19:52:44.544Z — VERIFY — ok
    
    By: CODER
    
    Note: Doctor regression test passed for DONE branch_pr tasks with open PR artifacts; eslint passed; detection no longer depends on a surviving local task branch.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T19:52:24.952Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Root cause: stale branch_pr PR tails could survive after a task was already marked DONE, and `doctor` had no dedicated check for this split-brain state.
    - Hidden premise that failed: requiring a surviving local task branch was too strict; unreconciled `pr/meta.json` is already enough to flag the task as suspicious.
    - Resolution: teach doctor to scan DONE task snapshots plus local PR artifacts and warn when `pr/meta.json` remains open or unreconciled.
id_source: "generated"
---
## Summary

Detect stale open PR drift for DONE tasks

Surface DONE tasks whose GitHub PRs remain open and diverged so operators can reconcile stale remote task branches before they linger for weeks.

## Scope

- In scope: Surface DONE tasks whose GitHub PRs remain open and diverged so operators can reconcile stale remote task branches before they linger for weeks.
- Out of scope: unrelated refactors not required for "Detect stale open PR drift for DONE tasks".

## Plan

1. Trace how doctor and branch_pr reconciliation currently detect stale shipped tasks and what they miss for DONE tasks with open diverged PRs. 2. Add a low-noise detection path that surfaces this drift before it lingers. 3. Lock the behavior with CLI or command tests. 4. Verify with targeted tests and a realistic stale-PR fixture.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T19:52:44.544Z — VERIFY — ok

By: CODER

Note: Doctor regression test passed for DONE branch_pr tasks with open PR artifacts; eslint passed; detection no longer depends on a surviving local task branch.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T19:52:24.952Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Root cause: stale branch_pr PR tails could survive after a task was already marked DONE, and `doctor` had no dedicated check for this split-brain state.
- Hidden premise that failed: requiring a surviving local task branch was too strict; unreconciled `pr/meta.json` is already enough to flag the task as suspicious.
- Resolution: teach doctor to scan DONE task snapshots plus local PR artifacts and warn when `pr/meta.json` remains open or unreconciled.
