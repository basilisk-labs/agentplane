---
id: "202607300411-6QF79Y"
title: "Stabilize concurrent effect-resolution retirement test"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "test"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T04:12:00.251Z"
  updated_by: "USER"
  note: "User pre-authorized continuation and CI reliability repairs for the v0.7 program."
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
    body: "Start: make the concurrent retirement retry test deterministic without changing production runner semantics."
events:
  -
    type: "status"
    at: "2026-07-30T04:12:13.942Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make the concurrent retirement retry test deterministic without changing production runner semantics."
doc_version: 3
doc_updated_at: "2026-07-30T04:12:13.942Z"
doc_updated_by: "CODER"
description: "Make the concurrent effect-resolution retirement retry test deterministic so hosted unit CI no longer depends on scheduler timing."
sections:
  Summary: |-
    Stabilize concurrent effect-resolution retirement test

    Make the concurrent effect-resolution retirement retry test deterministic so hosted unit CI no longer depends on scheduler timing.
  Scope: |-
    - In scope: Make the concurrent effect-resolution retirement retry test deterministic so hosted unit CI no longer depends on scheduler timing.
    - Out of scope: unrelated refactors not required for "Stabilize concurrent effect-resolution retirement test".
  Plan: |-
    1. Reproduce the unstable runner effect-resolution test and identify the missing synchronization boundary.
    2. Make the test hold the recovery lease, observe the retry path, release it, and let a concurrent resolver complete retirement.
    3. Run the focused regression repeatedly plus the exact hosted unit command (bun run test:fast); publish through the normal branch_pr PR route.
  Verify Steps: |-
    PLANNER fallback scaffold for "Stabilize concurrent effect-resolution retirement test". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Stabilize concurrent effect-resolution retirement test". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    start_head_sha: "ee5ea7178ba961f1e17ae3a925cb6b81469c41d7"
    version: 1
id_source: "generated"
---
## Summary

Stabilize concurrent effect-resolution retirement test

Make the concurrent effect-resolution retirement retry test deterministic so hosted unit CI no longer depends on scheduler timing.

## Scope

- In scope: Make the concurrent effect-resolution retirement retry test deterministic so hosted unit CI no longer depends on scheduler timing.
- Out of scope: unrelated refactors not required for "Stabilize concurrent effect-resolution retirement test".

## Plan

1. Reproduce the unstable runner effect-resolution test and identify the missing synchronization boundary.
2. Make the test hold the recovery lease, observe the retry path, release it, and let a concurrent resolver complete retirement.
3. Run the focused regression repeatedly plus the exact hosted unit command (bun run test:fast); publish through the normal branch_pr PR route.

## Verify Steps

PLANNER fallback scaffold for "Stabilize concurrent effect-resolution retirement test". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Stabilize concurrent effect-resolution retirement test". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
