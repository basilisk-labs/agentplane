---
id: "202605141638-78JKTQ"
title: "Harden cloud auto-push failure semantics"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T17:36:08.668Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T18:01:41.350Z"
  updated_by: "CODER"
  note: "Cloud auto-push failure protection verified: failed auto-push now writes durable pending_push state, prefer-remote pull refuses to overwrite pending local mutations, inspect freshness exposes pendingPush, and explicit successful push clears the marker. Checks: task-backend.cloud.test.ts + cloud-backend-state.test.ts 30 tests passed; agentplane typecheck passed; targeted eslint passed; policy routing passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing the primary batch task for v0.6 audit follow-ups in branch_pr worktree, covering cloud auto-push failure protection and coordinating the included follow-up task set."
events:
  -
    type: "status"
    at: "2026-05-14T17:36:30.561Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing the primary batch task for v0.6 audit follow-ups in branch_pr worktree, covering cloud auto-push failure protection and coordinating the included follow-up task set."
  -
    type: "verify"
    at: "2026-05-14T18:01:41.350Z"
    author: "CODER"
    state: "ok"
    note: "Cloud auto-push failure protection verified: failed auto-push now writes durable pending_push state, prefer-remote pull refuses to overwrite pending local mutations, inspect freshness exposes pendingPush, and explicit successful push clears the marker. Checks: task-backend.cloud.test.ts + cloud-backend-state.test.ts 30 tests passed; agentplane typecheck passed; targeted eslint passed; policy routing passed."
doc_version: 3
doc_updated_at: "2026-05-14T18:01:41.355Z"
doc_updated_by: "CODER"
description: "Design and implement protection for cloud-backend local mutations when maybeAutoPush fails, so pending local writes cannot be silently overwritten by a later prefer-remote pull. Add tests that cover network/retriable push failure followed by pull conflict resolution."
sections:
  Summary: |-
    Harden cloud auto-push failure semantics

    Design and implement protection for cloud-backend local mutations when maybeAutoPush fails, so pending local writes cannot be silently overwritten by a later prefer-remote pull. Add tests that cover network/retriable push failure followed by pull conflict resolution.
  Scope: |-
    - In scope: Design and implement protection for cloud-backend local mutations when maybeAutoPush fails, so pending local writes cannot be silently overwritten by a later prefer-remote pull. Add tests that cover network/retriable push failure followed by pull conflict resolution.
    - Out of scope: unrelated refactors not required for "Harden cloud auto-push failure semantics".
  Plan: "Batch implementation plan for remaining v0.6 audit follow-ups. Primary branch/worktree: 202605141638-78JKTQ. Included tasks: 202605141638-TTVFMD, 202605141638-DYD163, 202605141638-3VAJ2V, 202605141638-HGNT7H. Scope: harden cloud auto-push pending state, implement explicit remote-only/removed pull behavior, unify release-note validation rule ownership, finish guard/sleep dedup plus guardrail, and define/enforce schema source-of-truth contract. Verification remains task-specific: each included task keeps its own start-ready, verify-show, verification note, and finish evidence. Out of scope: release publication, schema shape changes, unrelated open PR/worktree cleanup."
  Verify Steps: "1. Add or update regression tests proving a failed cloud auto-push cannot be silently overwritten by a later prefer-remote pull. 2. Verify the chosen rollback or pending-push marker behavior is visible in task/backend diagnostics. 3. Run targeted cloud backend tests. 4. Run bun run lint:core -- changed cloud backend files. 5. Run node .agentplane/policy/check-routing.mjs."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T18:01:41.350Z — VERIFY — ok

    By: CODER

    Note: Cloud auto-push failure protection verified: failed auto-push now writes durable pending_push state, prefer-remote pull refuses to overwrite pending local mutations, inspect freshness exposes pendingPush, and explicit successful push clears the marker. Checks: task-backend.cloud.test.ts + cloud-backend-state.test.ts 30 tests passed; agentplane typecheck passed; targeted eslint passed; policy routing passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T17:36:30.561Z, excerpt_hash=sha256:2533d9fb51fca5b0b3315b8e15cc10d05e259c09615b2bca5338c73e52695a27

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141638-78JKTQ-v06-audit-followups/.agentplane/tasks/202605141638-78JKTQ/blueprint/resolved-snapshot.json
    - old_digest: b5e9677b365da83c6e0f143e1060a3adeeaee9fd8c4c70b02c7311ce2ad4a747
    - current_digest: b5e9677b365da83c6e0f143e1060a3adeeaee9fd8c4c70b02c7311ce2ad4a747
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141638-78JKTQ

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Failed auto-push is now fail-closed instead of relying on last_checked_at freshness.
      Impact: Prevents silent local data loss after retriable/network push failures followed by manual prefer-remote pull.
      Resolution: Added pending_push state, pull/write guards, and regression coverage.
id_source: "generated"
---
## Summary

Harden cloud auto-push failure semantics

Design and implement protection for cloud-backend local mutations when maybeAutoPush fails, so pending local writes cannot be silently overwritten by a later prefer-remote pull. Add tests that cover network/retriable push failure followed by pull conflict resolution.

## Scope

- In scope: Design and implement protection for cloud-backend local mutations when maybeAutoPush fails, so pending local writes cannot be silently overwritten by a later prefer-remote pull. Add tests that cover network/retriable push failure followed by pull conflict resolution.
- Out of scope: unrelated refactors not required for "Harden cloud auto-push failure semantics".

## Plan

Batch implementation plan for remaining v0.6 audit follow-ups. Primary branch/worktree: 202605141638-78JKTQ. Included tasks: 202605141638-TTVFMD, 202605141638-DYD163, 202605141638-3VAJ2V, 202605141638-HGNT7H. Scope: harden cloud auto-push pending state, implement explicit remote-only/removed pull behavior, unify release-note validation rule ownership, finish guard/sleep dedup plus guardrail, and define/enforce schema source-of-truth contract. Verification remains task-specific: each included task keeps its own start-ready, verify-show, verification note, and finish evidence. Out of scope: release publication, schema shape changes, unrelated open PR/worktree cleanup.

## Verify Steps

1. Add or update regression tests proving a failed cloud auto-push cannot be silently overwritten by a later prefer-remote pull. 2. Verify the chosen rollback or pending-push marker behavior is visible in task/backend diagnostics. 3. Run targeted cloud backend tests. 4. Run bun run lint:core -- changed cloud backend files. 5. Run node .agentplane/policy/check-routing.mjs.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T18:01:41.350Z — VERIFY — ok

By: CODER

Note: Cloud auto-push failure protection verified: failed auto-push now writes durable pending_push state, prefer-remote pull refuses to overwrite pending local mutations, inspect freshness exposes pendingPush, and explicit successful push clears the marker. Checks: task-backend.cloud.test.ts + cloud-backend-state.test.ts 30 tests passed; agentplane typecheck passed; targeted eslint passed; policy routing passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T17:36:30.561Z, excerpt_hash=sha256:2533d9fb51fca5b0b3315b8e15cc10d05e259c09615b2bca5338c73e52695a27

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141638-78JKTQ-v06-audit-followups/.agentplane/tasks/202605141638-78JKTQ/blueprint/resolved-snapshot.json
- old_digest: b5e9677b365da83c6e0f143e1060a3adeeaee9fd8c4c70b02c7311ce2ad4a747
- current_digest: b5e9677b365da83c6e0f143e1060a3adeeaee9fd8c4c70b02c7311ce2ad4a747
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141638-78JKTQ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Failed auto-push is now fail-closed instead of relying on last_checked_at freshness.
  Impact: Prevents silent local data loss after retriable/network push failures followed by manual prefer-remote pull.
  Resolution: Added pending_push state, pull/write guards, and regression coverage.
