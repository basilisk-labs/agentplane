---
id: "202605190630-SK1MR7"
title: "Reconcile stale DOING task registry"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-19T06:30:54.357Z"
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
    body: "Start: reconcile stale DOING registry and docs freshness blockers before v0.6.3 release."
events:
  -
    type: "status"
    at: "2026-05-19T06:30:54.932Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reconcile stale DOING registry and docs freshness blockers before v0.6.3 release."
doc_version: 3
doc_updated_at: "2026-05-19T06:30:54.932Z"
doc_updated_by: "CODER"
description: "Close stale DOING tasks whose implementation already landed and restore generated docs artifacts required by local release gates."
sections:
  Summary: |-
    Reconcile stale DOING task registry

    Close stale DOING tasks whose implementation already landed and restore generated docs artifacts required by local release gates.
  Scope: |-
    - In scope: Close stale DOING tasks whose implementation already landed and restore generated docs artifacts required by local release gates.
    - Out of scope: unrelated refactors not required for "Reconcile stale DOING task registry".
  Plan: |-
    1. Reconcile the stale local DOING registry entries whose work already landed through earlier PRs.
    2. Restore generated docs artifacts and onboarding check expectations required by local fast CI.
    3. Verify no DOING tasks remain and local fast CI/release gates pass before opening the cleanup PR.
  Verify Steps: |-
    PLANNER fallback scaffold for "Reconcile stale DOING task registry". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Reconcile stale DOING task registry". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Reconcile stale DOING task registry

Close stale DOING tasks whose implementation already landed and restore generated docs artifacts required by local release gates.

## Scope

- In scope: Close stale DOING tasks whose implementation already landed and restore generated docs artifacts required by local release gates.
- Out of scope: unrelated refactors not required for "Reconcile stale DOING task registry".

## Plan

1. Reconcile the stale local DOING registry entries whose work already landed through earlier PRs.
2. Restore generated docs artifacts and onboarding check expectations required by local fast CI.
3. Verify no DOING tasks remain and local fast CI/release gates pass before opening the cleanup PR.

## Verify Steps

PLANNER fallback scaffold for "Reconcile stale DOING task registry". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Reconcile stale DOING task registry". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
