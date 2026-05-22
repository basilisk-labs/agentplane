---
id: "202605221726-QRQFM9"
title: "Promote MERGED_PENDING_CLOSE to first-class task state"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "tasks"
  - "workflow"
verify:
  - "Confirm DONE remains terminal only after hosted close evidence lands."
  - "Run release task readiness tests with merged-pending-close tasks present."
  - "Run task list/search/next tests for merged-pending-close projection."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:26:33.692Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-22T17:27:52.126Z"
doc_updated_by: "PLANNER"
description: "Represent implementation-merged-but-not-hosted-closed branch_pr tasks as a distinct queue/list/release-gate state instead of ordinary DOING work."
sections:
  Summary: |-
    Promote MERGED_PENDING_CLOSE to first-class task state

    Represent implementation-merged-but-not-hosted-closed branch_pr tasks as a distinct queue/list/release-gate state instead of ordinary DOING work.
  Scope: |-
    - In scope: Represent implementation-merged-but-not-hosted-closed branch_pr tasks as a distinct queue/list/release-gate state instead of ordinary DOING work.
    - Out of scope: unrelated refactors not required for "Promote MERGED_PENDING_CLOSE to first-class task state".
  Plan: "Make merged pending close a first-class projected lifecycle state across task list, task search, task next, release readiness, and route status. Preserve canonical terminal DONE semantics while preventing already-merged tasks from reappearing as active implementation work."
  Verify Steps: |-
    1. Run task list/search/next tests for merged-pending-close projection.
    2. Run release task readiness tests with merged-pending-close tasks present.
    3. Confirm DONE remains terminal only after hosted close evidence lands.
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

Promote MERGED_PENDING_CLOSE to first-class task state

Represent implementation-merged-but-not-hosted-closed branch_pr tasks as a distinct queue/list/release-gate state instead of ordinary DOING work.

## Scope

- In scope: Represent implementation-merged-but-not-hosted-closed branch_pr tasks as a distinct queue/list/release-gate state instead of ordinary DOING work.
- Out of scope: unrelated refactors not required for "Promote MERGED_PENDING_CLOSE to first-class task state".

## Plan

Make merged pending close a first-class projected lifecycle state across task list, task search, task next, release readiness, and route status. Preserve canonical terminal DONE semantics while preventing already-merged tasks from reappearing as active implementation work.

## Verify Steps

1. Run task list/search/next tests for merged-pending-close projection.
2. Run release task readiness tests with merged-pending-close tasks present.
3. Confirm DONE remains terminal only after hosted close evidence lands.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
