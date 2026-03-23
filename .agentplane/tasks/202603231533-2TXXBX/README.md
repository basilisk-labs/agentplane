---
id: "202603231533-2TXXBX"
title: "Add runner resume retry and cancel lifecycle commands"
result_summary: "Added explicit runner cancel, resume, and retry lifecycle commands."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603231533-CSXCMG"
tags:
  - "code"
  - "runner"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T16:29:51.834Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T16:38:20.510Z"
  updated_by: "CODER"
  note: "Verified cancel/resume/retry lifecycle commands through dedicated runner use-case tests and CLI integration coverage; builds and doctor pass. Current cancel semantics are persisted-state cancellation only and do not terminate an external in-flight runner process."
commit:
  hash: "70d2d0c380795cff1959a93034311d77904a1ad5"
  message: "✅ 2TXXBX code: done"
comments:
  -
    author: "CODER"
    body: "Start: add explicit runner resume, retry, and cancel commands on top of persisted run artifacts, then verify lifecycle transitions through unit and CLI coverage."
  -
    author: "CODER"
    body: "Verified: added explicit runner cancel, resume, and retry commands with persisted lifecycle transitions, CLI wiring, and dedicated unit plus integration coverage; builds and doctor pass. Cancel remains a state-level operation and does not terminate an external in-flight process."
events:
  -
    type: "status"
    at: "2026-03-23T16:29:52.534Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add explicit runner resume, retry, and cancel commands on top of persisted run artifacts, then verify lifecycle transitions through unit and CLI coverage."
  -
    type: "verify"
    at: "2026-03-23T16:38:20.510Z"
    author: "CODER"
    state: "ok"
    note: "Verified cancel/resume/retry lifecycle commands through dedicated runner use-case tests and CLI integration coverage; builds and doctor pass. Current cancel semantics are persisted-state cancellation only and do not terminate an external in-flight runner process."
  -
    type: "status"
    at: "2026-03-23T16:40:11.972Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: added explicit runner cancel, resume, and retry commands with persisted lifecycle transitions, CLI wiring, and dedicated unit plus integration coverage; builds and doctor pass. Cancel remains a state-level operation and does not terminate an external in-flight process."
doc_version: 3
doc_updated_at: "2026-03-23T16:40:11.972Z"
doc_updated_by: "CODER"
description: "Introduce explicit runner lifecycle operations and persisted state transitions for resume, retry, and cancel on existing runs instead of one-shot prepare/execute only."
sections:
  Summary: |-
    Add runner resume retry and cancel lifecycle commands
    
    Introduce explicit runner lifecycle operations and persisted state transitions for resume, retry, and cancel on existing runs instead of one-shot prepare/execute only.
  Scope: |-
    - In scope: Introduce explicit runner lifecycle operations and persisted state transitions for resume, retry, and cancel on existing runs instead of one-shot prepare/execute only.
    - Out of scope: unrelated refactors not required for "Add runner resume retry and cancel lifecycle commands".
  Plan: |-
    1. Add a persisted runner lifecycle use case that can load existing run artifacts, cancel a run in state, resume an execute-mode run in place, and retry a previous run into a new run id.
    2. Expose the lifecycle through explicit nested CLI commands under `task run` and keep output/state summaries aligned with the existing runner command surface.
    3. Add unit and CLI coverage for cancel, resume, and retry transitions, including run-state/event assertions and adapter execution on resumed/retried runs.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts`. Expected: cancel persists `cancelled`, resume re-executes an existing prepared execute-mode run, and retry creates a new run from an existing failed/cancelled snapshot.
    2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: the lifecycle use cases and CLI commands build cleanly from source.
    3. Run `AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor`. Expected: no new runner/runtime integrity findings are introduced.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T16:38:20.510Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified cancel/resume/retry lifecycle commands through dedicated runner use-case tests and CLI integration coverage; builds and doctor pass. Current cancel semantics are persisted-state cancellation only and do not terminate an external in-flight runner process.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T16:29:52.535Z, excerpt_hash=sha256:85df353deffb697556059e756dd15fb99556c67b49c13a60e095080a186333a8
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add runner resume retry and cancel lifecycle commands

Introduce explicit runner lifecycle operations and persisted state transitions for resume, retry, and cancel on existing runs instead of one-shot prepare/execute only.

## Scope

- In scope: Introduce explicit runner lifecycle operations and persisted state transitions for resume, retry, and cancel on existing runs instead of one-shot prepare/execute only.
- Out of scope: unrelated refactors not required for "Add runner resume retry and cancel lifecycle commands".

## Plan

1. Add a persisted runner lifecycle use case that can load existing run artifacts, cancel a run in state, resume an execute-mode run in place, and retry a previous run into a new run id.
2. Expose the lifecycle through explicit nested CLI commands under `task run` and keep output/state summaries aligned with the existing runner command surface.
3. Add unit and CLI coverage for cancel, resume, and retry transitions, including run-state/event assertions and adapter execution on resumed/retried runs.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts`. Expected: cancel persists `cancelled`, resume re-executes an existing prepared execute-mode run, and retry creates a new run from an existing failed/cancelled snapshot.
2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: the lifecycle use cases and CLI commands build cleanly from source.
3. Run `AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor`. Expected: no new runner/runtime integrity findings are introduced.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T16:38:20.510Z — VERIFY — ok

By: CODER

Note: Verified cancel/resume/retry lifecycle commands through dedicated runner use-case tests and CLI integration coverage; builds and doctor pass. Current cancel semantics are persisted-state cancellation only and do not terminate an external in-flight runner process.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T16:29:52.535Z, excerpt_hash=sha256:85df353deffb697556059e756dd15fb99556c67b49c13a60e095080a186333a8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
