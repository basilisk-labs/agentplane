---
id: "202604030442-E8H05E"
title: "F-009 Introduce explain hooks"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604030442-YD0K3G"
  - "202604030442-C3HR7C"
  - "202604030442-NBBE36"
tags:
  - "code"
  - "framework"
  - "explain"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:42:06.254Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from framework roadmap and explicit user execution request"
verification:
  state: "ok"
  updated_at: "2026-04-03T13:53:53.380Z"
  updated_by: "CODER"
  note: "Implemented framework explain hooks, threaded machine-readable payloads into canonical context and runner bundles, and verified with typecheck plus targeted vitest for explain/context/runner/CLI flows."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: define machine-readable explain payloads for harness, policy, capabilities, and intake/runtime behavior inputs, then connect them to the canonical execution context."
  -
    author: "CODER"
    body: "Start: define machine-readable explain payloads for harness, policy, capabilities, and intake/runtime behavior inputs, then connect them to the canonical execution context."
events:
  -
    type: "status"
    at: "2026-04-03T13:40:36.720Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: define machine-readable explain payloads for harness, policy, capabilities, and intake/runtime behavior inputs, then connect them to the canonical execution context."
  -
    type: "status"
    at: "2026-04-03T13:40:39.719Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: define machine-readable explain payloads for harness, policy, capabilities, and intake/runtime behavior inputs, then connect them to the canonical execution context."
  -
    type: "verify"
    at: "2026-04-03T13:53:53.380Z"
    author: "CODER"
    state: "ok"
    note: "Implemented framework explain hooks, threaded machine-readable payloads into canonical context and runner bundles, and verified with typecheck plus targeted vitest for explain/context/runner/CLI flows."
doc_version: 3
doc_updated_at: "2026-04-03T13:53:53.392Z"
doc_updated_by: "CODER"
description: "Expose machine-readable explain output for harness, policy, capabilities, and behavior inputs."
sections:
  Summary: |-
    F-009 Introduce explain hooks
    
    Expose machine-readable explain output for harness, policy, capabilities, and behavior inputs.
  Scope: |-
    - In scope: Expose machine-readable explain output for harness, policy, capabilities, and behavior inputs.
    - Out of scope: unrelated refactors not required for "F-009 Introduce explain hooks".
  Plan: |-
    1. Define explain payload contracts for resolved harness, policy, capabilities, and behavior inputs.
    2. Add hooks that build these payloads from the canonical execution context and precedence results.
    3. Cover machine-readable explain semantics with tests so later recipe and runner extensions can extend rather than replace them.
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-03T13:53:53.380Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented framework explain hooks, threaded machine-readable payloads into canonical context and runner bundles, and verified with typecheck plus targeted vitest for explain/context/runner/CLI flows.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T13:40:39.730Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

F-009 Introduce explain hooks

Expose machine-readable explain output for harness, policy, capabilities, and behavior inputs.

## Scope

- In scope: Expose machine-readable explain output for harness, policy, capabilities, and behavior inputs.
- Out of scope: unrelated refactors not required for "F-009 Introduce explain hooks".

## Plan

1. Define explain payload contracts for resolved harness, policy, capabilities, and behavior inputs.
2. Add hooks that build these payloads from the canonical execution context and precedence results.
3. Cover machine-readable explain semantics with tests so later recipe and runner extensions can extend rather than replace them.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-03T13:53:53.380Z — VERIFY — ok

By: CODER

Note: Implemented framework explain hooks, threaded machine-readable payloads into canonical context and runner bundles, and verified with typecheck plus targeted vitest for explain/context/runner/CLI flows.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-03T13:40:39.730Z, excerpt_hash=sha256:3e2178b35503297c1ff0a0a18f5878f1fa3bf48199954e646271302e0157fc6e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
