---
id: "202605221726-8SA692"
title: "Add combined hosted lifecycle status report"
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
  - "github"
  - "workflow"
verify:
  - "Confirm command degrades clearly when GitHub auth or network is unavailable."
  - "Run command output tests with mocked GitHub/provider data."
  - "Run route-decision tests that include queue, handoff, PR, checks, review, and close-tail state."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:26:36.210Z"
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
doc_updated_at: "2026-05-22T17:27:52.436Z"
doc_updated_by: "PLANNER"
description: "Expose local AgentPlane lifecycle, queue/handoff state, GitHub PR state, hosted checks, review threads, and close-tail state in one command for branch_pr tasks."
sections:
  Summary: |-
    Add combined hosted lifecycle status report

    Expose local AgentPlane lifecycle, queue/handoff state, GitHub PR state, hosted checks, review threads, and close-tail state in one command for branch_pr tasks.
  Scope: |-
    - In scope: Expose local AgentPlane lifecycle, queue/handoff state, GitHub PR state, hosted checks, review threads, and close-tail state in one command for branch_pr tasks.
    - Out of scope: unrelated refactors not required for "Add combined hosted lifecycle status report".
  Plan: "Add a combined hosted lifecycle status surface that keeps ap as lifecycle truth and gh/GitHub as provider truth. The command should show PR number, merge state, checks, unresolved review-thread count, queue/handoff occupancy, close-tail PR, and next safe action without requiring manual command stitching."
  Verify Steps: |-
    1. Run command output tests with mocked GitHub/provider data.
    2. Run route-decision tests that include queue, handoff, PR, checks, review, and close-tail state.
    3. Confirm command degrades clearly when GitHub auth or network is unavailable.
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

Add combined hosted lifecycle status report

Expose local AgentPlane lifecycle, queue/handoff state, GitHub PR state, hosted checks, review threads, and close-tail state in one command for branch_pr tasks.

## Scope

- In scope: Expose local AgentPlane lifecycle, queue/handoff state, GitHub PR state, hosted checks, review threads, and close-tail state in one command for branch_pr tasks.
- Out of scope: unrelated refactors not required for "Add combined hosted lifecycle status report".

## Plan

Add a combined hosted lifecycle status surface that keeps ap as lifecycle truth and gh/GitHub as provider truth. The command should show PR number, merge state, checks, unresolved review-thread count, queue/handoff occupancy, close-tail PR, and next safe action without requiring manual command stitching.

## Verify Steps

1. Run command output tests with mocked GitHub/provider data.
2. Run route-decision tests that include queue, handoff, PR, checks, review, and close-tail state.
3. Confirm command degrades clearly when GitHub auth or network is unavailable.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
