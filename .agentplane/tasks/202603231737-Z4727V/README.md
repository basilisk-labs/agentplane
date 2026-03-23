---
id: "202603231737-Z4727V"
title: "Persist runner outcome history in task surface"
result_summary: "runner: bounded task-surface history"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603231736-DSN1XR"
tags:
  - "code"
  - "runner"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T17:39:30.497Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T18:58:34.488Z"
  updated_by: "CODER"
  note: "Persisted bounded runner outcome history inside task.runner, fixed the README outcome block to replace rather than append managed entries, and verified ordered execute/cancel/resume/retry history through CLI integration tests plus backend/local lifecycle coverage and source builds."
commit:
  hash: "b340fba16badc57fa0bc8a1967ba9ce0f48f59c7"
  message: "✅ Z4727V code: done"
comments:
  -
    author: "CODER"
    body: "Start: persist a bounded runner outcome history in task state and README findings so execute, cancel, resume, and retry flows keep visible breadcrumbs without opening raw artifacts first."
  -
    author: "CODER"
    body: "Verified: Persisted bounded runner outcome history inside task.runner, fixed the README outcome block to replace rather than append managed entries, and verified ordered execute/cancel/resume/retry history through CLI integration tests plus backend/local lifecycle coverage and source builds."
events:
  -
    type: "status"
    at: "2026-03-23T18:47:31.571Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: persist a bounded runner outcome history in task state and README findings so execute, cancel, resume, and retry flows keep visible breadcrumbs without opening raw artifacts first."
  -
    type: "verify"
    at: "2026-03-23T18:58:34.488Z"
    author: "CODER"
    state: "ok"
    note: "Persisted bounded runner outcome history inside task.runner, fixed the README outcome block to replace rather than append managed entries, and verified ordered execute/cancel/resume/retry history through CLI integration tests plus backend/local lifecycle coverage and source builds."
  -
    type: "status"
    at: "2026-03-23T19:00:42.287Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Persisted bounded runner outcome history inside task.runner, fixed the README outcome block to replace rather than append managed entries, and verified ordered execute/cancel/resume/retry history through CLI integration tests plus backend/local lifecycle coverage and source builds."
doc_version: 3
doc_updated_at: "2026-03-23T19:00:42.290Z"
doc_updated_by: "CODER"
description: "Keep a bounded runner outcome history in task state and README findings so retries and resumed runs remain visible without opening raw run artifacts."
sections:
  Summary: |-
    Persist runner outcome history in task surface
    
    Keep a bounded runner outcome history in task state and README findings so retries and resumed runs remain visible without opening raw run artifacts.
  Scope: |-
    - In scope: Keep a bounded runner outcome history in task state and README findings so retries and resumed runs remain visible without opening raw run artifacts.
    - Out of scope: unrelated refactors not required for "Persist runner outcome history in task surface".
  Plan: |-
    1. Extend task-level runner persistence from single latest outcome to a bounded history model that records retries and resumed runs in order.
    2. Render that history compactly in the task observation surface without duplicating full artifact payloads.
    3. Verify history behavior across execute, cancel, retry, and resume flows so debugging no longer depends on opening raw run directories first.
  Verify Steps: |-
    1. Execute, cancel, retry, and resume runner flows in CLI integration tests. Expected: task state keeps a bounded ordered history instead of only the latest run.
    2. Inspect the task README/state after multiple runs. Expected: history is compact, stable, and points to detailed run artifacts without duplicating them.
    3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: history rendering and task persistence compile cleanly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T18:58:34.488Z — VERIFY — ok
    
    By: CODER
    
    Note: Persisted bounded runner outcome history inside task.runner, fixed the README outcome block to replace rather than append managed entries, and verified ordered execute/cancel/resume/retry history through CLI integration tests plus backend/local lifecycle coverage and source builds.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T18:47:31.572Z, excerpt_hash=sha256:3cc522be320dcda80105c17989cfab93bb4637c4eca2099107c5f81f50a30535
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Persist runner outcome history in task surface

Keep a bounded runner outcome history in task state and README findings so retries and resumed runs remain visible without opening raw run artifacts.

## Scope

- In scope: Keep a bounded runner outcome history in task state and README findings so retries and resumed runs remain visible without opening raw run artifacts.
- Out of scope: unrelated refactors not required for "Persist runner outcome history in task surface".

## Plan

1. Extend task-level runner persistence from single latest outcome to a bounded history model that records retries and resumed runs in order.
2. Render that history compactly in the task observation surface without duplicating full artifact payloads.
3. Verify history behavior across execute, cancel, retry, and resume flows so debugging no longer depends on opening raw run directories first.

## Verify Steps

1. Execute, cancel, retry, and resume runner flows in CLI integration tests. Expected: task state keeps a bounded ordered history instead of only the latest run.
2. Inspect the task README/state after multiple runs. Expected: history is compact, stable, and points to detailed run artifacts without duplicating them.
3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: history rendering and task persistence compile cleanly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T18:58:34.488Z — VERIFY — ok

By: CODER

Note: Persisted bounded runner outcome history inside task.runner, fixed the README outcome block to replace rather than append managed entries, and verified ordered execute/cancel/resume/retry history through CLI integration tests plus backend/local lifecycle coverage and source builds.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T18:47:31.572Z, excerpt_hash=sha256:3cc522be320dcda80105c17989cfab93bb4637c4eca2099107c5f81f50a30535

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
