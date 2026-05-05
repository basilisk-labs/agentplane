---
id: "202605051806-B77NBZ"
title: "Add cloud backend runtime skeleton"
result_summary: "Cloud backend runtime skeleton landed on main via merge commit a7b14d3e."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "cloud"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T18:07:00.730Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T18:21:02.086Z"
  updated_by: "CODER"
  note: "Verified: CloudBackend runtime skeleton delegates projection reads/writes to LocalBackend, exposes remote-cache capabilities, syncs through the cloud HTTP surface, and records last_checked_at state."
commit:
  hash: "a7b14d3e4fc80ed21ad8bba703f582e716130861"
  message: "🔀 RZ8SA1 integrate: Add cloud backend init contract"
comments:
  -
    author: "CODER"
    body: "Start: Implement the cloud backend runtime skeleton in the shared batch worktree, preserving LocalBackend cache behavior and explicit remote capability reporting."
  -
    author: "INTEGRATOR"
    body: "Verified: Cloud backend runtime skeleton merged to main after backend tests, typecheck, arch check, doctor, and hosted PR checks."
events:
  -
    type: "status"
    at: "2026-05-05T18:07:41.751Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the cloud backend runtime skeleton in the shared batch worktree, preserving LocalBackend cache behavior and explicit remote capability reporting."
  -
    type: "verify"
    at: "2026-05-05T18:21:02.086Z"
    author: "CODER"
    state: "ok"
    note: "Verified: CloudBackend runtime skeleton delegates projection reads/writes to LocalBackend, exposes remote-cache capabilities, syncs through the cloud HTTP surface, and records last_checked_at state."
  -
    type: "status"
    at: "2026-05-05T18:26:57.021Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Cloud backend runtime skeleton merged to main after backend tests, typecheck, arch check, doctor, and hosted PR checks."
doc_version: 3
doc_updated_at: "2026-05-05T18:26:57.022Z"
doc_updated_by: "INTEGRATOR"
description: "Implement a cloud task backend shell that stores local cache state, advertises remote capabilities, validates endpoint/token configuration, and exposes inspect/sync behavior ready for the external sync service API."
sections:
  Summary: |-
    Add cloud backend runtime skeleton
    
    Implement a cloud task backend shell that stores local cache state, advertises remote capabilities, validates endpoint/token configuration, and exposes inspect/sync behavior ready for the external sync service API.
  Scope: |-
    - In scope: Implement a cloud task backend shell that stores local cache state, advertises remote capabilities, validates endpoint/token configuration, and exposes inspect/sync behavior ready for the external sync service API.
    - Out of scope: unrelated refactors not required for "Add cloud backend runtime skeleton".
  Plan: "Epic E2: Cloud backend runtime skeleton. Scope: add a CloudBackend implementation and loader that uses a local cache, reports remote-backed capabilities, validates endpoint/token settings, and implements inspect/sync behavior without hardcoding GitHub Projects logic into AgentPlane. Verify: backend unit tests plus typecheck."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T18:21:02.086Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: CloudBackend runtime skeleton delegates projection reads/writes to LocalBackend, exposes remote-cache capabilities, syncs through the cloud HTTP surface, and records last_checked_at state.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T18:07:41.751Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/backends/task-backend.load.test.ts; Result: pass; Evidence: 14 pass, 0 fail. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0.
      Impact: AgentPlane can load a cloud backend without connector-specific GitHub Projects logic in the CLI.
      Resolution: The external service owns provider mapping; AgentPlane owns cache, sync call shape, and freshness state.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Add cloud backend runtime skeleton

Implement a cloud task backend shell that stores local cache state, advertises remote capabilities, validates endpoint/token configuration, and exposes inspect/sync behavior ready for the external sync service API.

## Scope

- In scope: Implement a cloud task backend shell that stores local cache state, advertises remote capabilities, validates endpoint/token configuration, and exposes inspect/sync behavior ready for the external sync service API.
- Out of scope: unrelated refactors not required for "Add cloud backend runtime skeleton".

## Plan

Epic E2: Cloud backend runtime skeleton. Scope: add a CloudBackend implementation and loader that uses a local cache, reports remote-backed capabilities, validates endpoint/token settings, and implements inspect/sync behavior without hardcoding GitHub Projects logic into AgentPlane. Verify: backend unit tests plus typecheck.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T18:21:02.086Z — VERIFY — ok

By: CODER

Note: Verified: CloudBackend runtime skeleton delegates projection reads/writes to LocalBackend, exposes remote-cache capabilities, syncs through the cloud HTTP surface, and records last_checked_at state.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T18:07:41.751Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun test packages/agentplane/src/backends/task-backend.cloud.test.ts packages/agentplane/src/backends/task-backend.load.test.ts; Result: pass; Evidence: 14 pass, 0 fail. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0.
  Impact: AgentPlane can load a cloud backend without connector-specific GitHub Projects logic in the CLI.
  Resolution: The external service owns provider mapping; AgentPlane owns cache, sync call shape, and freshness state.
  Promotion: incident-candidate
  Fixability: external
