---
id: "202603241918-BG2EQH"
title: "Runner: clarify graceful-cancel metadata contract for cancel_signal vs exit_signal"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
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
  updated_at: "2026-03-24T19:26:44.010Z"
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
    body: "Start: inspect the running-run cancel path, make signal-based cancellation write a canonical cancelled state with exit_signal, and stabilize the lifecycle contract that currently flakes in Core CI."
events:
  -
    type: "status"
    at: "2026-03-24T19:19:50.648Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect the running-run cancel path, make signal-based cancellation write a canonical cancelled state with exit_signal, and stabilize the lifecycle contract that currently flakes in Core CI."
doc_version: 3
doc_updated_at: "2026-03-24T19:30:10.022Z"
doc_updated_by: "ORCHESTRATOR"
description: "Update the runner cancel contract so graceful SIGTERM handling is represented correctly: cancelled runs may record cancel_signal=SIGTERM while exit_signal stays null if the child traps TERM and exits 0, and persisted state/tests reflect that distinction."
sections:
  Summary: |-
    Runner: clarify graceful-cancel metadata contract for cancel_signal vs exit_signal
    
    Update the runner cancel contract so graceful SIGTERM handling is represented correctly: cancelled runs may record cancel_signal=SIGTERM while exit_signal stays null if the child traps TERM and exits 0, and persisted state/tests reflect that distinction.
  Scope: |-
    - In scope: clarify the runner cancel contract so graceful TERM handling records requested cancellation and observed termination separately instead of forcing a synthetic exit_signal.
    - Out of scope: unrelated lifecycle refactors outside the cancel metadata contract that are not required to fix the flaky Core CI assertion.
  Plan: |-
    1. Inspect the running-run cancel path and separate requested cancellation metadata from observed process termination metadata.
    2. Update the runtime contract so graceful TERM handling stays explicit and deterministic without conflating cancel_signal with exit_signal.
    3. Align persisted run-state expectations and focused lifecycle assertions with the corrected graceful-cancel semantics.
  Verify Steps: |-
    1. Run bun run --filter=agentplane build. Expected: the runner lifecycle code compiles after the cancel-contract change.
    2. Inspect packages/agentplane/src/runner/usecases/task-run-lifecycle.ts. Expected: synthetic cancelled state preserves cancel_signal intent but does not fabricate observed exit_signal or signal-derived exit_code.
    3. Review the resulting diff against the approved scope. Expected: the runtime contract is narrowed to requested cancellation metadata versus observed process termination metadata, with no unrelated lifecycle drift.
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

Runner: clarify graceful-cancel metadata contract for cancel_signal vs exit_signal

Update the runner cancel contract so graceful SIGTERM handling is represented correctly: cancelled runs may record cancel_signal=SIGTERM while exit_signal stays null if the child traps TERM and exits 0, and persisted state/tests reflect that distinction.

## Scope

- In scope: clarify the runner cancel contract so graceful TERM handling records requested cancellation and observed termination separately instead of forcing a synthetic exit_signal.
- Out of scope: unrelated lifecycle refactors outside the cancel metadata contract that are not required to fix the flaky Core CI assertion.

## Plan

1. Inspect the running-run cancel path and separate requested cancellation metadata from observed process termination metadata.
2. Update the runtime contract so graceful TERM handling stays explicit and deterministic without conflating cancel_signal with exit_signal.
3. Align persisted run-state expectations and focused lifecycle assertions with the corrected graceful-cancel semantics.

## Verify Steps

1. Run bun run --filter=agentplane build. Expected: the runner lifecycle code compiles after the cancel-contract change.
2. Inspect packages/agentplane/src/runner/usecases/task-run-lifecycle.ts. Expected: synthetic cancelled state preserves cancel_signal intent but does not fabricate observed exit_signal or signal-derived exit_code.
3. Review the resulting diff against the approved scope. Expected: the runtime contract is narrowed to requested cancellation metadata versus observed process termination metadata, with no unrelated lifecycle drift.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
