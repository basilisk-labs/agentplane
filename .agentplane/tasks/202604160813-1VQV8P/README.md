---
id: "202604160813-1VQV8P"
title: "Clean stale merged local task branches and worktrees"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-16T08:13:43.587Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-16T08:15:09.620Z"
  updated_by: "CODER"
  note: "Verified stale remote-tracking cleanup by comparing git remote prune origin --dry-run with the actual prune result; only stale origin/task refs were removed and active local task worktrees remained intact."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: auditing local task branches and worktrees to remove only stale merged refs while preserving active or unmerged work."
events:
  -
    type: "status"
    at: "2026-04-16T08:14:04.226Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: auditing local task branches and worktrees to remove only stale merged refs while preserving active or unmerged work."
  -
    type: "verify"
    at: "2026-04-16T08:15:09.620Z"
    author: "CODER"
    state: "ok"
    note: "Verified stale remote-tracking cleanup by comparing git remote prune origin --dry-run with the actual prune result; only stale origin/task refs were removed and active local task worktrees remained intact."
doc_version: 3
doc_updated_at: "2026-04-16T08:15:09.626Z"
doc_updated_by: "CODER"
description: "Remove only local task/task-close branches and task worktrees that are already merged into main and no longer needed, while preserving active or unmerged worktrees."
sections:
  Summary: |-
    Clean stale merged local task branches and worktrees
    
    Remove only local task/task-close branches and task worktrees that are already merged into main and no longer needed, while preserving active or unmerged worktrees.
  Scope: |-
    - In scope: Remove only local task/task-close branches and task worktrees that are already merged into main and no longer needed, while preserving active or unmerged worktrees.
    - Out of scope: unrelated refactors not required for "Clean stale merged local task branches and worktrees".
  Plan: |-
    1. Enumerate local branches and worktrees, then identify only those task/task-close refs that are both merged into main and not required by an active worktree. -> verify: cleanup candidate list is explicit before deletion
    2. Remove the confirmed stale local worktrees first, then delete their associated local branches. -> verify: deleted refs disappear from git worktree list and git branch output
    3. Re-run branch/worktree listing and doctor on the base checkout to confirm no unintended local state changed. -> verify: main stays clean and doctor remains OK
  Verify Steps: |-
    1. Review the requested outcome for "Clean stale merged local task branches and worktrees". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-16T08:15:09.620Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified stale remote-tracking cleanup by comparing git remote prune origin --dry-run with the actual prune result; only stale origin/task refs were removed and active local task worktrees remained intact.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-16T08:14:04.245Z, excerpt_hash=sha256:7696e2f1d0c5cd59c83aa4d0fdf857cdad461e32aa42531cc536ee4ec6f9062f
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Clean stale merged local task branches and worktrees

Remove only local task/task-close branches and task worktrees that are already merged into main and no longer needed, while preserving active or unmerged worktrees.

## Scope

- In scope: Remove only local task/task-close branches and task worktrees that are already merged into main and no longer needed, while preserving active or unmerged worktrees.
- Out of scope: unrelated refactors not required for "Clean stale merged local task branches and worktrees".

## Plan

1. Enumerate local branches and worktrees, then identify only those task/task-close refs that are both merged into main and not required by an active worktree. -> verify: cleanup candidate list is explicit before deletion
2. Remove the confirmed stale local worktrees first, then delete their associated local branches. -> verify: deleted refs disappear from git worktree list and git branch output
3. Re-run branch/worktree listing and doctor on the base checkout to confirm no unintended local state changed. -> verify: main stays clean and doctor remains OK

## Verify Steps

1. Review the requested outcome for "Clean stale merged local task branches and worktrees". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-16T08:15:09.620Z — VERIFY — ok

By: CODER

Note: Verified stale remote-tracking cleanup by comparing git remote prune origin --dry-run with the actual prune result; only stale origin/task refs were removed and active local task worktrees remained intact.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-16T08:14:04.245Z, excerpt_hash=sha256:7696e2f1d0c5cd59c83aa4d0fdf857cdad461e32aa42531cc536ee4ec6f9062f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
