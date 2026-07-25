---
id: "202607252235-5ZKP6T"
title: "Prevent foreign task artifacts in branch_pr worktrees"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "correctness"
  - "milestone-alpha2"
  - "v0.7"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-25T22:36:32.814Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-25T22:39:31.207Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-25T22:39:31.207Z"
doc_updated_by: "CODER"
description: "Stop work start from materializing foreign untracked task artifacts into a task worktree, and add a deterministic guarded repair route for already contaminated worktrees so their lifecycle can resume without manual deletion."
sections:
  Summary: |-
    Prevent foreign task artifacts in branch_pr worktrees

    Stop work start from materializing foreign untracked task artifacts into a task worktree, and add a deterministic guarded repair route for already contaminated worktrees so their lifecycle can resume without manual deletion.
  Scope: |-
    - In scope: Stop work start from materializing foreign untracked task artifacts into a task worktree, and add a deterministic guarded repair route for already contaminated worktrees so their lifecycle can resume without manual deletion.
    - Out of scope: unrelated refactors not required for "Prevent foreign task artifacts in branch_pr worktrees".
  Plan: "1. Trace branch_pr work-start materialization and the task-worktree-dirty route with an isolated fixture. 2. Make work start materialize and hand off only the active task artifact; preserve backend/branch-snapshot resolution for other tasks. 3. Extend the formal flow-repair route with a deterministic, guarded repair for foreign untracked task README replicas: only a byte-identical, authoritative foreign task README may be removed; reject unknown, modified, symlinked, active-task, or mixed artifacts. 4. Add focused regression tests for prevention, safe repair, and fail-closed cases; keep all user and unrelated artifacts untouched. 5. Add this corrective task to the alpha.2 fan-in and v0.7 roadmap, then run focused tests, typecheck, lint, lifecycle invariants, routing check, and diff check. 6. Complete branch_pr verification, quality review, hosted checks, and integration."
  Verify Steps: |-
    PLANNER fallback scaffold for "Prevent foreign task artifacts in branch_pr worktrees". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Prevent foreign task artifacts in branch_pr worktrees". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "220c7f110c07a14b2b055003cd338ad4c1c3503e"
    version: 1
id_source: "generated"
---
## Summary

Prevent foreign task artifacts in branch_pr worktrees

Stop work start from materializing foreign untracked task artifacts into a task worktree, and add a deterministic guarded repair route for already contaminated worktrees so their lifecycle can resume without manual deletion.

## Scope

- In scope: Stop work start from materializing foreign untracked task artifacts into a task worktree, and add a deterministic guarded repair route for already contaminated worktrees so their lifecycle can resume without manual deletion.
- Out of scope: unrelated refactors not required for "Prevent foreign task artifacts in branch_pr worktrees".

## Plan

1. Trace branch_pr work-start materialization and the task-worktree-dirty route with an isolated fixture. 2. Make work start materialize and hand off only the active task artifact; preserve backend/branch-snapshot resolution for other tasks. 3. Extend the formal flow-repair route with a deterministic, guarded repair for foreign untracked task README replicas: only a byte-identical, authoritative foreign task README may be removed; reject unknown, modified, symlinked, active-task, or mixed artifacts. 4. Add focused regression tests for prevention, safe repair, and fail-closed cases; keep all user and unrelated artifacts untouched. 5. Add this corrective task to the alpha.2 fan-in and v0.7 roadmap, then run focused tests, typecheck, lint, lifecycle invariants, routing check, and diff check. 6. Complete branch_pr verification, quality review, hosted checks, and integration.

## Verify Steps

PLANNER fallback scaffold for "Prevent foreign task artifacts in branch_pr worktrees". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Prevent foreign task artifacts in branch_pr worktrees". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
