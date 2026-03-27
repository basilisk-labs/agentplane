---
id: "202603271901-519VFX"
title: "Reconcile hosted merged refactor tasks into local task projection"
result_summary: "Closed stale branch_pr refactor backlog by reconciling hosted merges into the local task projection."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
  - "tasks"
  - "backlog"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-27T19:01:18.797Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-27T19:07:41.928Z"
  updated_by: "CODER"
  note: "Backfilled merged refactor tasks and the superseded presentation task into final DONE state, leaving only the active handoff task open. Verified with hosted-merge reconcile, targeted finish updates, and a clean local backlog view under repo-local runtime."
commit:
  hash: "ee0e7698eb5cf8fa567b68090d22a80f61a388a4"
  message: "YTQX10: consolidate CI, freshness, and sync tooling (#27)"
comments:
  -
    author: "CODER"
    body: "Start: Reconcile stale hosted-merge task projection on top of server main, close already-merged refactor tasks without one-by-one README surgery, and leave the backlog clean before implementing handoff."
  -
    author: "INTEGRATOR"
    body: "Verified: Reconciled hosted merged refactor tasks into the local task projection, backfilled stale merged tasks without reverting to direct mode, and left only the active handoff task open."
events:
  -
    type: "status"
    at: "2026-03-27T19:06:20.889Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Reconcile stale hosted-merge task projection on top of server main, close already-merged refactor tasks without one-by-one README surgery, and leave the backlog clean before implementing handoff."
  -
    type: "verify"
    at: "2026-03-27T19:07:41.928Z"
    author: "CODER"
    state: "ok"
    note: "Backfilled merged refactor tasks and the superseded presentation task into final DONE state, leaving only the active handoff task open. Verified with hosted-merge reconcile, targeted finish updates, and a clean local backlog view under repo-local runtime."
  -
    type: "status"
    at: "2026-03-27T19:07:51.659Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Reconciled hosted merged refactor tasks into the local task projection, backfilled stale merged tasks without reverting to direct mode, and left only the active handoff task open."
doc_version: 3
doc_updated_at: "2026-03-27T19:07:51.659Z"
doc_updated_by: "INTEGRATOR"
description: "Use the hosted-merge reconciliation path to update stale branch_pr task state on main after hosted PR merges, then normalize the local projection so the refactor backlog reflects actual merged work before starting handoff."
sections:
  Summary: |-
    Reconcile hosted merged refactor tasks into local task projection
    
    Use the hosted-merge reconciliation path to update stale branch_pr task state on main after hosted PR merges, then normalize the local projection so the refactor backlog reflects actual merged work before starting handoff.
  Scope: |-
    - In scope: Use the hosted-merge reconciliation path to update stale branch_pr task state on main after hosted PR merges, then normalize the local projection so the refactor backlog reflects actual merged work before starting handoff.
    - Out of scope: unrelated refactors not required for "Reconcile hosted merged refactor tasks into local task projection".
  Plan: |-
    1. Implement the change for "Reconcile hosted merged refactor tasks into local task projection".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run hosted-merge reconcile against the local task projection. Expected: merged branch_pr tasks move to their final local state without manual README surgery.
    2. Inspect task list after normalization. Expected: the refactor backlog only contains genuinely open work and no already-merged tasks remain in TODO/DOING.
    3. Confirm the explanation for branch_pr noise and the reason not to switch back to direct mode is recorded in the task findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-27T19:07:41.928Z — VERIFY — ok
    
    By: CODER
    
    Note: Backfilled merged refactor tasks and the superseded presentation task into final DONE state, leaving only the active handoff task open. Verified with hosted-merge reconcile, targeted finish updates, and a clean local backlog view under repo-local runtime.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T19:07:41.838Z, excerpt_hash=sha256:b421ac45f92c6304b93f4c10cf1a1472d115796795eadb9747472b6a7d7cd6a8
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - branch_pr backlog noise came from split-state: hosted PR merges advanced GitHub main, while local task projection still expected explicit close updates.
    - Switching back to direct would remove the hosted gate but would not solve stale projection; it would only trade one consistency problem for weaker remote-green guarantees.
    - The short-term repair is targeted hosted-merge reconcile plus explicit finish backfill for tasks that never persisted pr/meta on main. The longer-term fix is automatic reconcile after hosted merge, not a workflow-mode rollback.
    - Framework dev bootstrap still misses the extracted @agentplane/recipes build edge and fresh worktree readiness; that remains a separate process bug, not evidence against branch_pr itself.
id_source: "generated"
---
## Summary

Reconcile hosted merged refactor tasks into local task projection

Use the hosted-merge reconciliation path to update stale branch_pr task state on main after hosted PR merges, then normalize the local projection so the refactor backlog reflects actual merged work before starting handoff.

## Scope

- In scope: Use the hosted-merge reconciliation path to update stale branch_pr task state on main after hosted PR merges, then normalize the local projection so the refactor backlog reflects actual merged work before starting handoff.
- Out of scope: unrelated refactors not required for "Reconcile hosted merged refactor tasks into local task projection".

## Plan

1. Implement the change for "Reconcile hosted merged refactor tasks into local task projection".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run hosted-merge reconcile against the local task projection. Expected: merged branch_pr tasks move to their final local state without manual README surgery.
2. Inspect task list after normalization. Expected: the refactor backlog only contains genuinely open work and no already-merged tasks remain in TODO/DOING.
3. Confirm the explanation for branch_pr noise and the reason not to switch back to direct mode is recorded in the task findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-27T19:07:41.928Z — VERIFY — ok

By: CODER

Note: Backfilled merged refactor tasks and the superseded presentation task into final DONE state, leaving only the active handoff task open. Verified with hosted-merge reconcile, targeted finish updates, and a clean local backlog view under repo-local runtime.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T19:07:41.838Z, excerpt_hash=sha256:b421ac45f92c6304b93f4c10cf1a1472d115796795eadb9747472b6a7d7cd6a8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- branch_pr backlog noise came from split-state: hosted PR merges advanced GitHub main, while local task projection still expected explicit close updates.
- Switching back to direct would remove the hosted gate but would not solve stale projection; it would only trade one consistency problem for weaker remote-green guarantees.
- The short-term repair is targeted hosted-merge reconcile plus explicit finish backfill for tasks that never persisted pr/meta on main. The longer-term fix is automatic reconcile after hosted merge, not a workflow-mode rollback.
- Framework dev bootstrap still misses the extracted @agentplane/recipes build edge and fresh worktree readiness; that remains a separate process bug, not evidence against branch_pr itself.
