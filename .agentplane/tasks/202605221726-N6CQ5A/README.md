---
id: "202605221726-N6CQ5A"
title: "Add compact active task route summary"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "performance"
  - "workflow"
verify:
  - "Confirm full historical task listing remains available through an explicit option."
  - "Run CLI cold-path benchmark or focused performance check for active task listing."
  - "Run targeted task list route-summary tests."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:26:29.477Z"
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
doc_updated_at: "2026-05-22T17:27:51.395Z"
doc_updated_by: "PLANNER"
description: "Make read-only startup and active-work inspection avoid full historical task scans by default while still surfacing anomalies, route blockers, and active branch_pr work."
sections:
  Summary: |-
    Add compact active task route summary

    Make read-only startup and active-work inspection avoid full historical task scans by default while still surfacing anomalies, route blockers, and active branch_pr work.
  Scope: |-
    - In scope: Make read-only startup and active-work inspection avoid full historical task scans by default while still surfacing anomalies, route blockers, and active branch_pr work.
    - Out of scope: unrelated refactors not required for "Add compact active task route summary".
  Plan: "Add a compact active route summary for task list/startup surfaces. Keep full historical listing available behind an explicit flag. Verify that DOING, BLOCKED, MERGED_PENDING_CLOSE, unreadable tasks, stale PR metadata, and stale worktrees are summarized without printing thousands of DONE tasks."
  Verify Steps: |-
    1. Run targeted task list route-summary tests.
    2. Run a CLI cold-path benchmark or focused performance check for active task listing.
    3. Confirm full historical task listing remains available through an explicit option.
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

Add compact active task route summary

Make read-only startup and active-work inspection avoid full historical task scans by default while still surfacing anomalies, route blockers, and active branch_pr work.

## Scope

- In scope: Make read-only startup and active-work inspection avoid full historical task scans by default while still surfacing anomalies, route blockers, and active branch_pr work.
- Out of scope: unrelated refactors not required for "Add compact active task route summary".

## Plan

Add a compact active route summary for task list/startup surfaces. Keep full historical listing available behind an explicit flag. Verify that DOING, BLOCKED, MERGED_PENDING_CLOSE, unreadable tasks, stale PR metadata, and stale worktrees are summarized without printing thousands of DONE tasks.

## Verify Steps

1. Run targeted task list route-summary tests.
2. Run a CLI cold-path benchmark or focused performance check for active task listing.
3. Confirm full historical task listing remains available through an explicit option.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
