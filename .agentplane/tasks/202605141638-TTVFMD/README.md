---
id: "202605141638-TTVFMD"
title: "Handle remote-only and removed cloud tasks"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-05-14T18:01:49.688Z"
  updated_by: "CODER"
  note: "Cloud pull task-set semantics verified: prefer-remote now adds remote-only tasks, removes local-only tasks, applies changed operational fields, and conflict=diff reports added/removed without writing. Checks: task-backend.cloud.test.ts 27 tests passed; targeted eslint passed; policy routing passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing explicit cloud pull behavior for remote-only and removed tasks inside the approved v0.6 audit follow-up batch worktree."
events:
  -
    type: "status"
    at: "2026-05-14T17:36:39.603Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing explicit cloud pull behavior for remote-only and removed tasks inside the approved v0.6 audit follow-up batch worktree."
  -
    type: "verify"
    at: "2026-05-14T18:01:49.688Z"
    author: "CODER"
    state: "ok"
    note: "Cloud pull task-set semantics verified: prefer-remote now adds remote-only tasks, removes local-only tasks, applies changed operational fields, and conflict=diff reports added/removed without writing. Checks: task-backend.cloud.test.ts 27 tests passed; targeted eslint passed; policy routing passed."
doc_version: 3
doc_updated_at: "2026-05-14T18:01:49.697Z"
doc_updated_by: "CODER"
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
    ### 2026-05-14T18:01:49.688Z — VERIFY — ok

    By: CODER

    Note: Cloud pull task-set semantics verified: prefer-remote now adds remote-only tasks, removes local-only tasks, applies changed operational fields, and conflict=diff reports added/removed without writing. Checks: task-backend.cloud.test.ts 27 tests passed; targeted eslint passed; policy routing passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T17:36:39.603Z, excerpt_hash=sha256:c43182055444386bfd091e859c8a8fff8a76f016e0ac1b3fc2e5e91bb3e00734

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141638-78JKTQ-v06-audit-followups/.agentplane/tasks/202605141638-TTVFMD/blueprint/resolved-snapshot.json
    - old_digest: 40125dd0f34b84bef0fd01521bda35f41d069778d275218badb479cad790890f
    - current_digest: 40125dd0f34b84bef0fd01521bda35f41d069778d275218badb479cad790890f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141638-TTVFMD

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Remote-only and removed tasks are explicit CloudPullPlan fields: added and removedIds.
      Impact: Projection cache can converge with remote canonical task set instead of silently ignoring remote-only/deleted records.
      Resolution: Extended CloudPullPlan, diff output, prefer-remote application, and regression coverage.
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
### 2026-05-14T18:01:49.688Z — VERIFY — ok

By: CODER

Note: Cloud pull task-set semantics verified: prefer-remote now adds remote-only tasks, removes local-only tasks, applies changed operational fields, and conflict=diff reports added/removed without writing. Checks: task-backend.cloud.test.ts 27 tests passed; targeted eslint passed; policy routing passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T17:36:39.603Z, excerpt_hash=sha256:c43182055444386bfd091e859c8a8fff8a76f016e0ac1b3fc2e5e91bb3e00734

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141638-78JKTQ-v06-audit-followups/.agentplane/tasks/202605141638-TTVFMD/blueprint/resolved-snapshot.json
- old_digest: 40125dd0f34b84bef0fd01521bda35f41d069778d275218badb479cad790890f
- current_digest: 40125dd0f34b84bef0fd01521bda35f41d069778d275218badb479cad790890f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141638-TTVFMD

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Remote-only and removed tasks are explicit CloudPullPlan fields: added and removedIds.
  Impact: Projection cache can converge with remote canonical task set instead of silently ignoring remote-only/deleted records.
  Resolution: Extended CloudPullPlan, diff output, prefer-remote application, and regression coverage.
