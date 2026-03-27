---
id: "202603271724-HJXDV0"
title: "Make branch_pr task projection converge after hosted merges"
result_summary: "Merged on GitHub main via PR #24 after hosted-merge task projection reconcile landed."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "branch_pr"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-27T17:26:56.217Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-27T17:38:08.326Z"
  updated_by: "CODER"
  note: "Added hosted-merge reconciliation to task normalize: branch_pr local clones can now query GitHub by PR artifact branch name, persist merged PR meta, and normalize stale local task state to DONE without relying on hidden local close-commit history on main. Verified with focused CLI/tests plus build/help snapshots."
commit:
  hash: "b9d372365e3dddeed56a20cb4e4e69bec7a18aad"
  message: "HJXDV0: reconcile hosted merges during task normalize (#24)"
comments:
  -
    author: "CODER"
    body: "Start: make ordinary branch_pr task reads converge on hosted-merge reality by deriving an effective merged state from local PR artifacts and reachable base history, then wire task list/show/doctor through that shared projection path."
  -
    author: "INTEGRATOR"
    body: "Verified: Merged on GitHub main via PR #24 after hosted-merge task projection reconcile landed."
events:
  -
    type: "status"
    at: "2026-03-27T17:27:41.333Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make ordinary branch_pr task reads converge on hosted-merge reality by deriving an effective merged state from local PR artifacts and reachable base history, then wire task list/show/doctor through that shared projection path."
  -
    type: "verify"
    at: "2026-03-27T17:38:08.326Z"
    author: "CODER"
    state: "ok"
    note: "Added hosted-merge reconciliation to task normalize: branch_pr local clones can now query GitHub by PR artifact branch name, persist merged PR meta, and normalize stale local task state to DONE without relying on hidden local close-commit history on main. Verified with focused CLI/tests plus build/help snapshots."
  -
    type: "status"
    at: "2026-03-27T19:07:15.772Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Merged on GitHub main via PR #24 after hosted-merge task projection reconcile landed."
doc_version: 3
doc_updated_at: "2026-03-27T19:07:15.772Z"
doc_updated_by: "INTEGRATOR"
description: "Stop ordinary task reads from showing stale TODO/DOING state after a task branch is already merged on GitHub main. Introduce a deterministic merge-aware task projection or reconcile path so fresh local clones can recover effective task state without relying on hidden local close-commit history on main."
sections:
  Summary: |-
    Make branch_pr task projection converge after hosted merges
    
    Stop ordinary task reads from showing stale TODO/DOING state after a task branch is already merged on GitHub main. Introduce a deterministic merge-aware task projection or reconcile path so fresh local clones can recover effective task state without relying on hidden local close-commit history on main.
  Scope: |-
    - In scope: Stop ordinary task reads from showing stale TODO/DOING state after a task branch is already merged on GitHub main. Introduce a deterministic merge-aware task projection or reconcile path so fresh local clones can recover effective task state without relying on hidden local close-commit history on main.
    - Out of scope: unrelated refactors not required for "Make branch_pr task projection converge after hosted merges".
  Plan: |-
    1. Trace the ordinary task-read path (task list/show/doctor) and identify the narrowest place to inject merge-aware branch_pr reconciliation without making ordinary reads depend on ad hoc network refreshes.
    2. Introduce a deterministic effective-state rule for branch_pr tasks that already have merged hosted PR evidence reachable from the current base, then wire task list/show/doctor through that rule or a shared projection helper.
    3. Add focused regressions for stale local task docs after hosted merge and verify that fresh local clones recover the effective task status without requiring hidden local close-commit history.
  Verify Steps: |-
    1. In a fresh branch_pr clone whose task README still says TODO/DOING but whose task branch is already merged on base, run ordinary task reads (`task list`, `task show`, `doctor`). Expected: they surface the effective merged state instead of the stale pre-merge projection.
    2. Re-run the same reads for a genuinely unmerged branch_pr task. Expected: the task remains TODO/DOING; the new logic must not collapse active tasks into DONE just because PR artifacts exist.
    3. Run focused task-backend/task-read regressions and the smallest relevant build. Expected: merge-aware reconciliation is deterministic, local-only, and does not require hidden close-commit history on main.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-27T17:38:08.326Z — VERIFY — ok
    
    By: CODER
    
    Note: Added hosted-merge reconciliation to task normalize: branch_pr local clones can now query GitHub by PR artifact branch name, persist merged PR meta, and normalize stale local task state to DONE without relying on hidden local close-commit history on main. Verified with focused CLI/tests plus build/help snapshots.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T17:27:41.335Z, excerpt_hash=sha256:54cf3e69c5e32daf39fbd6564abbbf09a6ea1bd2983cb4f0ebca0822fd85d120
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make branch_pr task projection converge after hosted merges

Stop ordinary task reads from showing stale TODO/DOING state after a task branch is already merged on GitHub main. Introduce a deterministic merge-aware task projection or reconcile path so fresh local clones can recover effective task state without relying on hidden local close-commit history on main.

## Scope

- In scope: Stop ordinary task reads from showing stale TODO/DOING state after a task branch is already merged on GitHub main. Introduce a deterministic merge-aware task projection or reconcile path so fresh local clones can recover effective task state without relying on hidden local close-commit history on main.
- Out of scope: unrelated refactors not required for "Make branch_pr task projection converge after hosted merges".

## Plan

1. Trace the ordinary task-read path (task list/show/doctor) and identify the narrowest place to inject merge-aware branch_pr reconciliation without making ordinary reads depend on ad hoc network refreshes.
2. Introduce a deterministic effective-state rule for branch_pr tasks that already have merged hosted PR evidence reachable from the current base, then wire task list/show/doctor through that rule or a shared projection helper.
3. Add focused regressions for stale local task docs after hosted merge and verify that fresh local clones recover the effective task status without requiring hidden local close-commit history.

## Verify Steps

1. In a fresh branch_pr clone whose task README still says TODO/DOING but whose task branch is already merged on base, run ordinary task reads (`task list`, `task show`, `doctor`). Expected: they surface the effective merged state instead of the stale pre-merge projection.
2. Re-run the same reads for a genuinely unmerged branch_pr task. Expected: the task remains TODO/DOING; the new logic must not collapse active tasks into DONE just because PR artifacts exist.
3. Run focused task-backend/task-read regressions and the smallest relevant build. Expected: merge-aware reconciliation is deterministic, local-only, and does not require hidden close-commit history on main.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-27T17:38:08.326Z — VERIFY — ok

By: CODER

Note: Added hosted-merge reconciliation to task normalize: branch_pr local clones can now query GitHub by PR artifact branch name, persist merged PR meta, and normalize stale local task state to DONE without relying on hidden local close-commit history on main. Verified with focused CLI/tests plus build/help snapshots.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T17:27:41.335Z, excerpt_hash=sha256:54cf3e69c5e32daf39fbd6564abbbf09a6ea1bd2983cb4f0ebca0822fd85d120

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
