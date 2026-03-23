---
id: "202603231736-74XMMD"
title: "Add real runner supervision and cancellation"
result_summary: "runner: live supervision and signal-based cancel"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "lifecycle"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T17:39:29.248Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T18:15:42.509Z"
  updated_by: "CODER"
  note: "Added persisted runner supervision metadata with live PID-based cancellation, covered it with runner lifecycle and CLI integration tests, and verified with builds, help snapshots, and doctor."
commit:
  hash: "c2c90e76902a69f312f7d405737be1dd95fe2901"
  message: "✅ 74XMMD code: done"
comments:
  -
    author: "CODER"
    body: "Start: replace file-only runner lifecycle with supervised execution metadata and real cancellation semantics so run state tracks a live process instead of just a persisted label."
  -
    author: "CODER"
    body: "Verified: Added persisted runner supervision metadata with live PID-based cancellation, taught adapters to normalize terminated runs as cancelled, and covered the live signal path with runner lifecycle, CLI, snapshot, build, and doctor checks."
events:
  -
    type: "status"
    at: "2026-03-23T18:03:50.359Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace file-only runner lifecycle with supervised execution metadata and real cancellation semantics so run state tracks a live process instead of just a persisted label."
  -
    type: "verify"
    at: "2026-03-23T18:15:42.509Z"
    author: "CODER"
    state: "ok"
    note: "Added persisted runner supervision metadata with live PID-based cancellation, covered it with runner lifecycle and CLI integration tests, and verified with builds, help snapshots, and doctor."
  -
    type: "status"
    at: "2026-03-23T18:18:05.436Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Added persisted runner supervision metadata with live PID-based cancellation, taught adapters to normalize terminated runs as cancelled, and covered the live signal path with runner lifecycle, CLI, snapshot, build, and doctor checks."
doc_version: 3
doc_updated_at: "2026-03-23T18:18:05.436Z"
doc_updated_by: "CODER"
description: "Turn runner lifecycle commands into process-aware supervision with persisted handles, heartbeat data, and real cancel semantics instead of state-only cancellation."
sections:
  Summary: |-
    Add real runner supervision and cancellation
    
    Turn runner lifecycle commands into process-aware supervision with persisted handles, heartbeat data, and real cancel semantics instead of state-only cancellation.
  Scope: |-
    - In scope: Turn runner lifecycle commands into process-aware supervision with persisted handles, heartbeat data, and real cancel semantics instead of state-only cancellation.
    - Out of scope: unrelated refactors not required for "Add real runner supervision and cancellation".
  Plan: |-
    1. Introduce persisted supervision metadata for active runner processes, including pid/heartbeat information and adapter-owned runtime handles.
    2. Rework cancel/resume around real process supervision so cancel attempts to stop the live runner instead of only flipping state files.
    3. Add lifecycle coverage for successful stop, already-exited runner, and retry/resume after supervised termination.
  Verify Steps: |-
    1. Run runner lifecycle tests for cancel/resume/retry. Expected: cancel records real process termination and resume/retry operate on supervised runs only.
    2. Exercise a live fake runner that sleeps and handles termination. Expected: cancel stops the process instead of only rewriting state.
    3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: supervision metadata compiles cleanly across adapters and CLI.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T18:15:42.509Z — VERIFY — ok
    
    By: CODER
    
    Note: Added persisted runner supervision metadata with live PID-based cancellation, covered it with runner lifecycle and CLI integration tests, and verified with builds, help snapshots, and doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T18:03:50.360Z, excerpt_hash=sha256:195f234c3414c24889ebc0cdbf03f0e98a1f67353ec4aec1cb230e2be6fae761
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add real runner supervision and cancellation

Turn runner lifecycle commands into process-aware supervision with persisted handles, heartbeat data, and real cancel semantics instead of state-only cancellation.

## Scope

- In scope: Turn runner lifecycle commands into process-aware supervision with persisted handles, heartbeat data, and real cancel semantics instead of state-only cancellation.
- Out of scope: unrelated refactors not required for "Add real runner supervision and cancellation".

## Plan

1. Introduce persisted supervision metadata for active runner processes, including pid/heartbeat information and adapter-owned runtime handles.
2. Rework cancel/resume around real process supervision so cancel attempts to stop the live runner instead of only flipping state files.
3. Add lifecycle coverage for successful stop, already-exited runner, and retry/resume after supervised termination.

## Verify Steps

1. Run runner lifecycle tests for cancel/resume/retry. Expected: cancel records real process termination and resume/retry operate on supervised runs only.
2. Exercise a live fake runner that sleeps and handles termination. Expected: cancel stops the process instead of only rewriting state.
3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: supervision metadata compiles cleanly across adapters and CLI.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T18:15:42.509Z — VERIFY — ok

By: CODER

Note: Added persisted runner supervision metadata with live PID-based cancellation, covered it with runner lifecycle and CLI integration tests, and verified with builds, help snapshots, and doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T18:03:50.360Z, excerpt_hash=sha256:195f234c3414c24889ebc0cdbf03f0e98a1f67353ec4aec1cb230e2be6fae761

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
