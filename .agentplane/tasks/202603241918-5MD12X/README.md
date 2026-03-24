---
id: "202603241918-5MD12X"
title: "Runner tests: add regression coverage for TERM cancellation metadata semantics"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on:
  - "202603241918-BG2EQH"
tags:
  - "code"
  - "runner"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T19:36:17.587Z"
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
    body: "Start: add focused regression coverage for the graceful SIGTERM path where the child traps TERM, exits 0, and persisted runner metadata keeps cancel_signal while exit_signal stays null."
events:
  -
    type: "status"
    at: "2026-03-24T19:34:35.907Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add focused regression coverage for the graceful SIGTERM path where the child traps TERM, exits 0, and persisted runner metadata keeps cancel_signal while exit_signal stays null."
doc_version: 3
doc_updated_at: "2026-03-24T19:36:17.049Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add focused lifecycle regression coverage for the TERM cancellation contract where the runner records cancel_signal while observed exit_signal may remain null."
sections:
  Summary: |-
    Runner tests: add regression coverage for TERM cancellation metadata semantics
    
    Add focused lifecycle regression coverage for the TERM cancellation contract where the runner records cancel_signal while observed exit_signal may remain null.
  Scope: |-
    - In scope: add regression coverage for TERM cancellation metadata semantics, especially the separation between requested cancel_signal and observed exit_signal.
    - Out of scope: pinning a platform-specific exit_code for shell trap behavior.
  Plan: |-
    1. Add focused regression coverage for TERM cancellation metadata semantics.
    2. Assert that cancelled runs preserve cancel_signal while allowing exit_signal to remain null.
    3. Keep the regression free of platform-specific exit_code assumptions while still checking persisted result consistency.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts. Expected: regression coverage confirms TERM cancellation can keep exit_signal null while cancel metadata stays consistent.
    2. Inspect the new regression assertions. Expected: they distinguish requested cancel signal from observed process exit signal without pinning a platform-specific shell exit code.
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

Runner tests: add regression coverage for TERM cancellation metadata semantics

Add focused lifecycle regression coverage for the TERM cancellation contract where the runner records cancel_signal while observed exit_signal may remain null.

## Scope

- In scope: add regression coverage for TERM cancellation metadata semantics, especially the separation between requested cancel_signal and observed exit_signal.
- Out of scope: pinning a platform-specific exit_code for shell trap behavior.

## Plan

1. Add focused regression coverage for TERM cancellation metadata semantics.
2. Assert that cancelled runs preserve cancel_signal while allowing exit_signal to remain null.
3. Keep the regression free of platform-specific exit_code assumptions while still checking persisted result consistency.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts. Expected: regression coverage confirms TERM cancellation can keep exit_signal null while cancel metadata stays consistent.
2. Inspect the new regression assertions. Expected: they distinguish requested cancel signal from observed process exit signal without pinning a platform-specific shell exit code.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
