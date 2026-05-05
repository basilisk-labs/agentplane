---
id: "202605051806-B77NBZ"
title: "Add cloud backend runtime skeleton"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement the cloud backend runtime skeleton in the shared batch worktree, preserving LocalBackend cache behavior and explicit remote capability reporting."
events:
  -
    type: "status"
    at: "2026-05-05T18:07:41.751Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the cloud backend runtime skeleton in the shared batch worktree, preserving LocalBackend cache behavior and explicit remote capability reporting."
doc_version: 3
doc_updated_at: "2026-05-05T18:07:41.751Z"
doc_updated_by: "CODER"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
