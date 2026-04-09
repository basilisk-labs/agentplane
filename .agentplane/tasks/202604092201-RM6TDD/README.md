---
id: "202604092201-RM6TDD"
title: "Allow cleanup merged to delete remote task branches"
result_summary: "Merged via PR #235."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T22:02:11.539Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T22:16:51.053Z"
  updated_by: "CODER"
  note: "Refreshed CLI reference after adding cleanup merged remote delete mode; targeted cleanup merged parser and remote deletion tests remain green."
commit:
  hash: "3b19584f87e1a30dcb34816fd3b3128fd381ff05"
  message: "github/workflow: Allow cleanup merged to delete remote task branches (RM6TDD) (#235)"
comments:
  -
    author: "CODER"
    body: "Start: extend cleanup merged with opt-in remote branch deletion."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #235 merged on main and cleanup merged now supports opt-in remote branch deletion with tracked PR artifacts."
events:
  -
    type: "status"
    at: "2026-04-09T22:02:12.734Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extend cleanup merged with opt-in remote branch deletion."
  -
    type: "verify"
    at: "2026-04-09T22:12:00.634Z"
    author: "CODER"
    state: "ok"
    note: "Added opt-in remote branch deletion for cleanup merged and covered parser plus destructive remote cleanup flow."
  -
    type: "verify"
    at: "2026-04-09T22:16:51.053Z"
    author: "CODER"
    state: "ok"
    note: "Refreshed CLI reference after adding cleanup merged remote delete mode; targeted cleanup merged parser and remote deletion tests remain green."
  -
    type: "status"
    at: "2026-04-09T22:58:24.501Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #235 merged on main and cleanup merged now supports opt-in remote branch deletion with tracked PR artifacts."
doc_version: 3
doc_updated_at: "2026-04-09T22:58:24.501Z"
doc_updated_by: "INTEGRATOR"
description: "Extend cleanup merged with an opt-in remote-branch deletion mode for merged DONE task branches so operators do not need manual git push --delete cleanup."
sections:
  Summary: |-
    Allow cleanup merged to delete remote task branches
    
    Extend cleanup merged with an opt-in remote-branch deletion mode for merged DONE task branches so operators do not need manual git push --delete cleanup.
  Scope: |-
    - In scope: Extend cleanup merged with an opt-in remote-branch deletion mode for merged DONE task branches so operators do not need manual git push --delete cleanup.
    - Out of scope: unrelated refactors not required for "Allow cleanup merged to delete remote task branches".
  Plan: "1. Add an opt-in flag to cleanup merged for deleting remote task branches of cleaned candidates. 2. Delete only matching task/task-close remote refs and prune origin after success. 3. Cover listing and destructive flows with tests."
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. <Action>. Expected: <observable result>.
    2. <Action>. Expected: <observable result>.
    3. <Action>. Expected: <observable result>.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T22:12:00.634Z — VERIFY — ok
    
    By: CODER
    
    Note: Added opt-in remote branch deletion for cleanup merged and covered parser plus destructive remote cleanup flow.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T22:02:12.739Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    ### 2026-04-09T22:16:51.053Z — VERIFY — ok
    
    By: CODER
    
    Note: Refreshed CLI reference after adding cleanup merged remote delete mode; targeted cleanup merged parser and remote deletion tests remain green.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T22:12:00.636Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Allow cleanup merged to delete remote task branches

Extend cleanup merged with an opt-in remote-branch deletion mode for merged DONE task branches so operators do not need manual git push --delete cleanup.

## Scope

- In scope: Extend cleanup merged with an opt-in remote-branch deletion mode for merged DONE task branches so operators do not need manual git push --delete cleanup.
- Out of scope: unrelated refactors not required for "Allow cleanup merged to delete remote task branches".

## Plan

1. Add an opt-in flag to cleanup merged for deleting remote task branches of cleaned candidates. 2. Delete only matching task/task-close remote refs and prune origin after success. 3. Cover listing and destructive flows with tests.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T22:12:00.634Z — VERIFY — ok

By: CODER

Note: Added opt-in remote branch deletion for cleanup merged and covered parser plus destructive remote cleanup flow.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T22:02:12.739Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

### 2026-04-09T22:16:51.053Z — VERIFY — ok

By: CODER

Note: Refreshed CLI reference after adding cleanup merged remote delete mode; targeted cleanup merged parser and remote deletion tests remain green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T22:12:00.636Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
