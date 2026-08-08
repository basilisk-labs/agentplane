---
id: "202608080805-KPWPAV"
title: "Allow explicit replacement after failed task advance operation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "release"
  - "supervisor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-08T08:05:11.934Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-08T08:05:29.344Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-08T08:05:29.344Z"
doc_updated_by: "CODER"
description: "Expose a guarded task advance replacement path for a terminal operation_failed supervisor journal so a newly recomputed route can continue without retrying the failed effect."
sections:
  Summary: |-
    Allow explicit replacement after failed task advance operation

    Expose a guarded task advance replacement path for a terminal operation_failed supervisor journal so a newly recomputed route can continue without retrying the failed effect.
  Scope: |-
    - In scope: Expose a guarded task advance replacement path for a terminal operation_failed supervisor journal so a newly recomputed route can continue without retrying the failed effect.
    - Out of scope: unrelated refactors not required for "Allow explicit replacement after failed task advance operation".
  Plan: "1. Add an explicit --replacement flag to task advance. 2. When and only when that flag is present, reopen a stopped operation_failed supervisor journal through the core exact-key replacement primitive before issuing the recomputed semantic episode. 3. Reject replacement outside the terminal failed-operation state and preserve effect_in_doubt/budget guards. 4. Add parser, supervisor, negative, and CLI recovery regressions. 5. Pass focused, critical, type, contract, evaluator, hosted, and integration gates."
  Verify Steps: |-
    PLANNER fallback scaffold for "Allow explicit replacement after failed task advance operation". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Allow explicit replacement after failed task advance operation". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    start_head_sha: "f90a67a282234a4f42b5e3721e416f31e7f0be9b"
    version: 1
id_source: "generated"
---
## Summary

Allow explicit replacement after failed task advance operation

Expose a guarded task advance replacement path for a terminal operation_failed supervisor journal so a newly recomputed route can continue without retrying the failed effect.

## Scope

- In scope: Expose a guarded task advance replacement path for a terminal operation_failed supervisor journal so a newly recomputed route can continue without retrying the failed effect.
- Out of scope: unrelated refactors not required for "Allow explicit replacement after failed task advance operation".

## Plan

1. Add an explicit --replacement flag to task advance. 2. When and only when that flag is present, reopen a stopped operation_failed supervisor journal through the core exact-key replacement primitive before issuing the recomputed semantic episode. 3. Reject replacement outside the terminal failed-operation state and preserve effect_in_doubt/budget guards. 4. Add parser, supervisor, negative, and CLI recovery regressions. 5. Pass focused, critical, type, contract, evaluator, hosted, and integration gates.

## Verify Steps

PLANNER fallback scaffold for "Allow explicit replacement after failed task advance operation". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Allow explicit replacement after failed task advance operation". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
