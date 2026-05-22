---
id: "202605221726-4FGDND"
title: "Add integration queue stale handoff recovery"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify:
  - "Confirm live active PRs are not auto-released from the queue."
  - "Run integration queue tests for stale claimed and handoff entries."
  - "Run provider-state classification tests for merged, closed, missing, and blocked PRs."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:27:02.456Z"
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
doc_updated_at: "2026-05-22T17:27:53.354Z"
doc_updated_by: "PLANNER"
description: "Detect and recover integration queue entries stuck in claimed or handoff when the provider PR is already merged, closed, missing, or blocked by stale metadata."
sections:
  Summary: |-
    Add integration queue stale handoff recovery

    Detect and recover integration queue entries stuck in claimed or handoff when the provider PR is already merged, closed, missing, or blocked by stale metadata.
  Scope: |-
    - In scope: Detect and recover integration queue entries stuck in claimed or handoff when the provider PR is already merged, closed, missing, or blocked by stale metadata.
    - Out of scope: unrelated refactors not required for "Add integration queue stale handoff recovery".
  Plan: "Add bounded stale-handoff classification and recovery guidance for the branch_pr integration queue. Do not auto-merge or discard live work; classify provider truth and offer safe repair commands for stale handoff, merged pending close, closed-unmerged, and missing PR states."
  Verify Steps: |-
    1. Run integration queue tests for stale claimed and handoff entries.
    2. Run provider-state classification tests for merged, closed, missing, and blocked PRs.
    3. Confirm live active PRs are not auto-released from the queue.
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

Add integration queue stale handoff recovery

Detect and recover integration queue entries stuck in claimed or handoff when the provider PR is already merged, closed, missing, or blocked by stale metadata.

## Scope

- In scope: Detect and recover integration queue entries stuck in claimed or handoff when the provider PR is already merged, closed, missing, or blocked by stale metadata.
- Out of scope: unrelated refactors not required for "Add integration queue stale handoff recovery".

## Plan

Add bounded stale-handoff classification and recovery guidance for the branch_pr integration queue. Do not auto-merge or discard live work; classify provider truth and offer safe repair commands for stale handoff, merged pending close, closed-unmerged, and missing PR states.

## Verify Steps

1. Run integration queue tests for stale claimed and handoff entries.
2. Run provider-state classification tests for merged, closed, missing, and blocked PRs.
3. Confirm live active PRs are not auto-released from the queue.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
