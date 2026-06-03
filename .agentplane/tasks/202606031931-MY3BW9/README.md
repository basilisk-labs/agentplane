---
id: "202606031931-MY3BW9"
title: "Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "github-issue"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-03T19:32:00.384Z"
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
    body: "Start: investigating the stale active-task lifecycle in branch_pr mode, reproducing issue #4407, and preparing a bounded fix with focused verification evidence."
events:
  -
    type: "status"
    at: "2026-06-03T19:32:40.537Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: investigating the stale active-task lifecycle in branch_pr mode, reproducing issue #4407, and preparing a bounded fix with focused verification evidence."
doc_version: 3
doc_updated_at: "2026-06-03T19:32:40.537Z"
doc_updated_by: "CODER"
description: "Resolve https://github.com/basilisk-labs/agentplane/issues/4407"
sections:
  Summary: |-
    Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run

    Resolve https://github.com/basilisk-labs/agentplane/issues/4407
  Scope: |-
    - In scope: Resolve https://github.com/basilisk-labs/agentplane/issues/4407.
    - Out of scope: unrelated refactors not required for "Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run".
  Plan: "1. Reproduce the stale-active-task behavior for verified direct-workflow tasks and identify the lifecycle state source that keeps them active. 2. Patch the task lifecycle/status pipeline so verified direct-workflow tasks leave the active set and no longer route back to run. 3. Add or update focused tests for the stale-active-task path and run targeted verification plus required route/doctor checks. 4. Record verification evidence, publish concise upstream milestone comments, and close the task only after implementation evidence is complete."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run

Resolve https://github.com/basilisk-labs/agentplane/issues/4407

## Scope

- In scope: Resolve https://github.com/basilisk-labs/agentplane/issues/4407.
- Out of scope: unrelated refactors not required for "Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run".

## Plan

1. Reproduce the stale-active-task behavior for verified direct-workflow tasks and identify the lifecycle state source that keeps them active. 2. Patch the task lifecycle/status pipeline so verified direct-workflow tasks leave the active set and no longer route back to run. 3. Add or update focused tests for the stale-active-task path and run targeted verification plus required route/doctor checks. 4. Record verification evidence, publish concise upstream milestone comments, and close the task only after implementation evidence is complete.

## Verify Steps

PLANNER fallback scaffold for "Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
