---
id: "202605141638-TTVFMD"
title: "Handle remote-only and removed cloud tasks"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T16:40:57.852Z"
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
doc_updated_at: "2026-05-14T16:39:33.005Z"
doc_updated_by: "PLANNER"
description: "Extend CloudPullPlan and applyCloudPullPlan so remote-only tasks and remote deletions are explicit contract cases instead of ignored diagnostics under canonical_source=remote. Define user-confirmation or prefer-remote behavior and cover added/removed plans in tests."
sections:
  Summary: |-
    Handle remote-only and removed cloud tasks
    
    Extend CloudPullPlan and applyCloudPullPlan so remote-only tasks and remote deletions are explicit contract cases instead of ignored diagnostics under canonical_source=remote. Define user-confirmation or prefer-remote behavior and cover added/removed plans in tests.
  Scope: |-
    - In scope: Extend CloudPullPlan and applyCloudPullPlan so remote-only tasks and remote deletions are explicit contract cases instead of ignored diagnostics under canonical_source=remote. Define user-confirmation or prefer-remote behavior and cover added/removed plans in tests.
    - Out of scope: unrelated refactors not required for "Handle remote-only and removed cloud tasks".
  Plan: "Make cloud pull projection semantics explicit for remote-only and removed tasks. Scope: CloudPullPlan model, applyCloudPullPlan behavior, prefer-remote/user-confirm contract, diff summary wording, and tests for added and removed task IDs. Out of scope: auto-push failure pending marker and broader cloud revision-token protocol."
  Verify Steps: "1. Add tests for buildCloudPullPlan covering remote-only tasks, local-only tasks missing remotely, and unchanged/updated tasks. 2. Add tests for applyCloudPullPlan proving added/removed behavior matches the selected conflict mode. 3. Run targeted cloud pull tests. 4. Run bun run lint:core -- changed cloud pull files. 5. Run node .agentplane/policy/check-routing.mjs."
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

Handle remote-only and removed cloud tasks

Extend CloudPullPlan and applyCloudPullPlan so remote-only tasks and remote deletions are explicit contract cases instead of ignored diagnostics under canonical_source=remote. Define user-confirmation or prefer-remote behavior and cover added/removed plans in tests.

## Scope

- In scope: Extend CloudPullPlan and applyCloudPullPlan so remote-only tasks and remote deletions are explicit contract cases instead of ignored diagnostics under canonical_source=remote. Define user-confirmation or prefer-remote behavior and cover added/removed plans in tests.
- Out of scope: unrelated refactors not required for "Handle remote-only and removed cloud tasks".

## Plan

Make cloud pull projection semantics explicit for remote-only and removed tasks. Scope: CloudPullPlan model, applyCloudPullPlan behavior, prefer-remote/user-confirm contract, diff summary wording, and tests for added and removed task IDs. Out of scope: auto-push failure pending marker and broader cloud revision-token protocol.

## Verify Steps

1. Add tests for buildCloudPullPlan covering remote-only tasks, local-only tasks missing remotely, and unchanged/updated tasks. 2. Add tests for applyCloudPullPlan proving added/removed behavior matches the selected conflict mode. 3. Run targeted cloud pull tests. 4. Run bun run lint:core -- changed cloud pull files. 5. Run node .agentplane/policy/check-routing.mjs.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
