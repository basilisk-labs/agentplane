---
id: "202608080431-541KC2"
title: "Bound concurrent effect-retirement observation by time"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "concurrency"
  - "reliability"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-08T04:31:50.118Z"
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
    body: "Start: replace the fixed-attempt concurrent retirement observation with a bounded time window and prove delayed convergence."
events:
  -
    type: "status"
    at: "2026-08-08T04:32:06.965Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace the fixed-attempt concurrent retirement observation with a bounded time window and prove delayed convergence."
doc_version: 3
doc_updated_at: "2026-08-08T04:32:06.965Z"
doc_updated_by: "CODER"
description: "Prevent a valid concurrent runner effect resolution from failing with runner_effect_resolution_retirement_busy when claim retirement takes longer than the current scheduler-sensitive retry window. Replace the attempt-count timing assumption with a bounded elapsed-time observation, cover delayed retirement deterministically, and preserve fail-closed behavior when no matching resolution completes."
sections:
  Summary: |-
    Bound concurrent effect-retirement observation by time

    Prevent a valid concurrent runner effect resolution from failing with runner_effect_resolution_retirement_busy when claim retirement takes longer than the current scheduler-sensitive retry window. Replace the attempt-count timing assumption with a bounded elapsed-time observation, cover delayed retirement deterministically, and preserve fail-closed behavior when no matching resolution completes.
  Scope: |-
    - In scope: Prevent a valid concurrent runner effect resolution from failing with runner_effect_resolution_retirement_busy when claim retirement takes longer than the current scheduler-sensitive retry window. Replace the attempt-count timing assumption with a bounded elapsed-time observation, cover delayed retirement deterministically, and preserve fail-closed behavior when no matching resolution completes.
    - Out of scope: unrelated refactors not required for "Bound concurrent effect-retirement observation by time".
  Plan: |-
    1. Reproduce and document the hosted failure from PR #4800 and compare it with the earlier test-only stabilization in PR #4679.
    2. Replace the scheduler-sensitive fixed-attempt observation window with a monotonic, explicitly bounded retirement timeout and small polling interval. Keep the original busy error when the matching resolution and claim retirement do not complete inside the bound.
    3. Extend `task-run-effect-resolution.test.ts` so the competing retirement deliberately starts after the former approximately 225 ms window, then prove both callers converge on the same resolution and the claim is retired exactly once.
    4. Run the focused effect-resolution test repeatedly, the related runner use-case suite, typecheck, lint/format checks, `test:fast`, and repository contract checks.
    5. Obtain evaluator pass and hosted CI, merge the fix, then refresh PR #4800 onto the corrected main and rerun its full hosted suite.
  Verify Steps: |-
    PLANNER fallback scaffold for "Bound concurrent effect-retirement observation by time". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Bound concurrent effect-retirement observation by time". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    start_head_sha: "4a2895659e677071caaa9b56cadf35df8e261e82"
    version: 1
id_source: "generated"
---
## Summary

Bound concurrent effect-retirement observation by time

Prevent a valid concurrent runner effect resolution from failing with runner_effect_resolution_retirement_busy when claim retirement takes longer than the current scheduler-sensitive retry window. Replace the attempt-count timing assumption with a bounded elapsed-time observation, cover delayed retirement deterministically, and preserve fail-closed behavior when no matching resolution completes.

## Scope

- In scope: Prevent a valid concurrent runner effect resolution from failing with runner_effect_resolution_retirement_busy when claim retirement takes longer than the current scheduler-sensitive retry window. Replace the attempt-count timing assumption with a bounded elapsed-time observation, cover delayed retirement deterministically, and preserve fail-closed behavior when no matching resolution completes.
- Out of scope: unrelated refactors not required for "Bound concurrent effect-retirement observation by time".

## Plan

1. Reproduce and document the hosted failure from PR #4800 and compare it with the earlier test-only stabilization in PR #4679.
2. Replace the scheduler-sensitive fixed-attempt observation window with a monotonic, explicitly bounded retirement timeout and small polling interval. Keep the original busy error when the matching resolution and claim retirement do not complete inside the bound.
3. Extend `task-run-effect-resolution.test.ts` so the competing retirement deliberately starts after the former approximately 225 ms window, then prove both callers converge on the same resolution and the claim is retired exactly once.
4. Run the focused effect-resolution test repeatedly, the related runner use-case suite, typecheck, lint/format checks, `test:fast`, and repository contract checks.
5. Obtain evaluator pass and hosted CI, merge the fix, then refresh PR #4800 onto the corrected main and rerun its full hosted suite.

## Verify Steps

PLANNER fallback scaffold for "Bound concurrent effect-retirement observation by time". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Bound concurrent effect-retirement observation by time". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
