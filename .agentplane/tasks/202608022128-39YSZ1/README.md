---
id: "202608022128-39YSZ1"
title: "Require fresh verification evidence in the route oracle"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "routing"
  - "v0.7.1"
  - "verification"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T21:28:49.951Z"
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
    at: "2026-08-02T21:29:21.323Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-02T21:29:21.323Z"
doc_updated_by: "CODER"
description: "Prevent task next-action from accepting verification evidence that predates the current implementation HEAD. Route changed commits back through verification before evaluator review or integration."
sections:
  Summary: |-
    Require fresh verification evidence in the route oracle

    Prevent task next-action from accepting verification evidence that predates the current implementation HEAD. Route changed commits back through verification before evaluator review or integration.
  Scope: |-
    - In scope: Prevent task next-action from accepting verification evidence that predates the current implementation HEAD. Route changed commits back through verification before evaluator review or integration.
    - Out of scope: unrelated refactors not required for "Require fresh verification evidence in the route oracle".
  Plan: "1. Inspect the route decision path and the canonical verification-record helpers to define current-HEAD freshness without duplicating state logic. 2. Make task next-action require an accepted verification record bound to the current implementation HEAD before quality review or integration. 3. Add regression tests for a fresh record and for a new commit invalidating prior verification. 4. Run focused routing tests, typecheck, static analysis, and critical tests; record evaluator evidence and integrate through the protected GitHub PR route."
  Verify Steps: |-
    PLANNER fallback scaffold for "Require fresh verification evidence in the route oracle". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Require fresh verification evidence in the route oracle". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    start_head_sha: "be9304ea05e50ec3824ef085f0f70402474e318a"
    version: 1
id_source: "generated"
---
## Summary

Require fresh verification evidence in the route oracle

Prevent task next-action from accepting verification evidence that predates the current implementation HEAD. Route changed commits back through verification before evaluator review or integration.

## Scope

- In scope: Prevent task next-action from accepting verification evidence that predates the current implementation HEAD. Route changed commits back through verification before evaluator review or integration.
- Out of scope: unrelated refactors not required for "Require fresh verification evidence in the route oracle".

## Plan

1. Inspect the route decision path and the canonical verification-record helpers to define current-HEAD freshness without duplicating state logic. 2. Make task next-action require an accepted verification record bound to the current implementation HEAD before quality review or integration. 3. Add regression tests for a fresh record and for a new commit invalidating prior verification. 4. Run focused routing tests, typecheck, static analysis, and critical tests; record evaluator evidence and integrate through the protected GitHub PR route.

## Verify Steps

PLANNER fallback scaffold for "Require fresh verification evidence in the route oracle". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Require fresh verification evidence in the route oracle". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
