---
id: "202604200921-A0YXZG"
title: "Sync promoted incident policy mirror"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "maintenance"
  - "policy"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T09:21:37.213Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Sync promoted incident policy mirrors to clear the agents:check pre-push blocker."
events:
  -
    type: "status"
    at: "2026-04-20T09:21:37.968Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Sync promoted incident policy mirrors to clear the agents:check pre-push blocker."
doc_version: 3
doc_updated_at: "2026-04-20T09:21:37.980Z"
doc_updated_by: "CODER"
description: "Fix pre-push agents:check drift by syncing the promoted incident policy asset back to the project policy mirror after the global-install hook incident was recorded."
sections:
  Summary: |-
    Sync promoted incident policy mirror
    
    Fix pre-push agents:check drift by syncing the promoted incident policy asset back to the project policy mirror after the global-install hook incident was recorded.
  Scope: |-
    - In scope: Fix pre-push agents:check drift by syncing the promoted incident policy asset back to the project policy mirror after the global-install hook incident was recorded.
    - Out of scope: unrelated refactors not required for "Sync promoted incident policy mirror".
  Plan: |-
    1. Run bun run agents:sync to align .agentplane policy mirrors with canonical packaged assets.
    2. Run agents:check and format:check to verify the pre-push blocker is gone.
    3. Commit only the sync task artifact and policy mirror changes, then finish.
  Verify Steps: |-
    1. Review the requested outcome for "Sync promoted incident policy mirror". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Sync promoted incident policy mirror

Fix pre-push agents:check drift by syncing the promoted incident policy asset back to the project policy mirror after the global-install hook incident was recorded.

## Scope

- In scope: Fix pre-push agents:check drift by syncing the promoted incident policy asset back to the project policy mirror after the global-install hook incident was recorded.
- Out of scope: unrelated refactors not required for "Sync promoted incident policy mirror".

## Plan

1. Run bun run agents:sync to align .agentplane policy mirrors with canonical packaged assets.
2. Run agents:check and format:check to verify the pre-push blocker is gone.
3. Commit only the sync task artifact and policy mirror changes, then finish.

## Verify Steps

1. Review the requested outcome for "Sync promoted incident policy mirror". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
