---
id: "202604092306-JRGSGJ"
title: "Doctor --fix safe-removes legacy untracked task README collisions"
result_summary: "Merged via PR #241."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "doctor"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T23:07:18.458Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T23:22:53.109Z"
  updated_by: "CODER"
  note: "Verified current HEAD after formatting commit: doctor --fix now removes only untracked DONE task README collisions; doctor fast/command tests and eslint passed."
commit:
  hash: "078c5e9b31aaba074041ecf2b34daad5f3b79d5a"
  message: "doctor/workflow: Doctor --fix safe-removes legacy untracked task README collisions (JRGSGJ) (#241)"
comments:
  -
    author: "CODER"
    body: "Start: extend doctor --fix with a safe cleanup for legacy untracked task README collisions that would otherwise block pull or rebase once upstream tracks the same task path."
  -
    author: "INTEGRATOR"
    body: "Verified: merged via PR #241 after hosted checks passed; closeout metadata reconciled on base."
events:
  -
    type: "status"
    at: "2026-04-09T23:07:45.188Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extend doctor --fix with a safe cleanup for legacy untracked task README collisions that would otherwise block pull or rebase once upstream tracks the same task path."
  -
    type: "verify"
    at: "2026-04-09T23:21:28.791Z"
    author: "CODER"
    state: "ok"
    note: "Verified: doctor --fix now removes only untracked DONE task README collisions; doctor fast/command tests and eslint passed."
  -
    type: "verify"
    at: "2026-04-09T23:21:51.052Z"
    author: "CODER"
    state: "ok"
    note: "Verified current HEAD after task commit: doctor --fix now removes only untracked DONE task README collisions; doctor fast/command tests and eslint passed."
  -
    type: "verify"
    at: "2026-04-09T23:22:53.109Z"
    author: "CODER"
    state: "ok"
    note: "Verified current HEAD after formatting commit: doctor --fix now removes only untracked DONE task README collisions; doctor fast/command tests and eslint passed."
  -
    type: "status"
    at: "2026-04-09T23:33:25.676Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: merged via PR #241 after hosted checks passed; closeout metadata reconciled on base."
doc_version: 3
doc_updated_at: "2026-04-09T23:33:25.677Z"
doc_updated_by: "INTEGRATOR"
description: "Extend doctor --fix with a safe cleanup for legacy untracked .agentplane/tasks/<task-id>/README.md collisions that would be overwritten by tracked task artifacts from origin/main and block git pull or rebase."
sections:
  Summary: |-
    Doctor --fix safe-removes legacy untracked task README collisions
    
    Extend doctor --fix with a safe cleanup for legacy untracked .agentplane/tasks/<task-id>/README.md collisions that would be overwritten by tracked task artifacts from origin/main and block git pull or rebase.
  Scope: |-
    - In scope: Extend doctor --fix with a safe cleanup for legacy untracked .agentplane/tasks/<task-id>/README.md collisions that would be overwritten by tracked task artifacts from origin/main and block git pull or rebase.
    - Out of scope: unrelated refactors not required for "Doctor --fix safe-removes legacy untracked task README collisions".
  Plan: "1. Detect legacy untracked task README collisions that are safe to remove because the same task README now exists in tracked base history. 2. Extend doctor --fix to delete only those safe collisions and leave unrelated untracked task artifacts untouched. 3. Cover detection plus fix mode with regression tests around doctor/workspace."
  Verify Steps: |-
    1. Create a repo state with an untracked .agentplane/tasks/<task-id>/README.md that would be overwritten by a tracked task README on origin/main, then run doctor. Expected: doctor reports the collision clearly.
    2. Run agentplane doctor --fix on that state. Expected: the safe collision is removed and the next doctor run is clean.
    3. Leave an unrelated untracked task artifact outside the safe-collision rule and rerun doctor --fix. Expected: doctor does not delete the unrelated file.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T23:21:28.791Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: doctor --fix now removes only untracked DONE task README collisions; doctor fast/command tests and eslint passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:07:45.195Z, excerpt_hash=sha256:286890642ec9560c8baa39a2ad92ac5a7971fd4bd6f493cd20629f740f08e557
    
    ### 2026-04-09T23:21:51.052Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified current HEAD after task commit: doctor --fix now removes only untracked DONE task README collisions; doctor fast/command tests and eslint passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:21:28.793Z, excerpt_hash=sha256:286890642ec9560c8baa39a2ad92ac5a7971fd4bd6f493cd20629f740f08e557
    
    ### 2026-04-09T23:22:53.109Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified current HEAD after formatting commit: doctor --fix now removes only untracked DONE task README collisions; doctor fast/command tests and eslint passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:21:51.055Z, excerpt_hash=sha256:286890642ec9560c8baa39a2ad92ac5a7971fd4bd6f493cd20629f740f08e557
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Doctor --fix safe-removes legacy untracked task README collisions

Extend doctor --fix with a safe cleanup for legacy untracked .agentplane/tasks/<task-id>/README.md collisions that would be overwritten by tracked task artifacts from origin/main and block git pull or rebase.

## Scope

- In scope: Extend doctor --fix with a safe cleanup for legacy untracked .agentplane/tasks/<task-id>/README.md collisions that would be overwritten by tracked task artifacts from origin/main and block git pull or rebase.
- Out of scope: unrelated refactors not required for "Doctor --fix safe-removes legacy untracked task README collisions".

## Plan

1. Detect legacy untracked task README collisions that are safe to remove because the same task README now exists in tracked base history. 2. Extend doctor --fix to delete only those safe collisions and leave unrelated untracked task artifacts untouched. 3. Cover detection plus fix mode with regression tests around doctor/workspace.

## Verify Steps

1. Create a repo state with an untracked .agentplane/tasks/<task-id>/README.md that would be overwritten by a tracked task README on origin/main, then run doctor. Expected: doctor reports the collision clearly.
2. Run agentplane doctor --fix on that state. Expected: the safe collision is removed and the next doctor run is clean.
3. Leave an unrelated untracked task artifact outside the safe-collision rule and rerun doctor --fix. Expected: doctor does not delete the unrelated file.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T23:21:28.791Z — VERIFY — ok

By: CODER

Note: Verified: doctor --fix now removes only untracked DONE task README collisions; doctor fast/command tests and eslint passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:07:45.195Z, excerpt_hash=sha256:286890642ec9560c8baa39a2ad92ac5a7971fd4bd6f493cd20629f740f08e557

### 2026-04-09T23:21:51.052Z — VERIFY — ok

By: CODER

Note: Verified current HEAD after task commit: doctor --fix now removes only untracked DONE task README collisions; doctor fast/command tests and eslint passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:21:28.793Z, excerpt_hash=sha256:286890642ec9560c8baa39a2ad92ac5a7971fd4bd6f493cd20629f740f08e557

### 2026-04-09T23:22:53.109Z — VERIFY — ok

By: CODER

Note: Verified current HEAD after formatting commit: doctor --fix now removes only untracked DONE task README collisions; doctor fast/command tests and eslint passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:21:51.055Z, excerpt_hash=sha256:286890642ec9560c8baa39a2ad92ac5a7971fd4bd6f493cd20629f740f08e557

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
