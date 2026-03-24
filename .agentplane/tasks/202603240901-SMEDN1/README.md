---
id: "202603240901-SMEDN1"
title: "Stream runner stdout and stderr to trace files"
result_summary: "Runner process supervision now streams stdout and stderr into canonical trace artifacts and keeps only capped in-memory tails for later summaries and metrics."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603240901-9NXPCG"
tags:
  - "code"
  - "runner"
  - "traces"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T09:12:04.931Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T09:21:58.861Z"
  updated_by: "CODER"
  note: "Focused supervision and adapter tests passed; source builds passed after streaming stdout and stderr into canonical trace artifacts with capped in-memory tails."
commit:
  hash: "7dc8ad85243082e271f6603e1d184f913961b351"
  message: "✅ SMEDN1 code: done"
comments:
  -
    author: "CODER"
    body: "Start: stream runner stdout and stderr into canonical trace artifacts with a capped in-memory tail, but keep result/task-facing semantics unchanged in this commit."
  -
    author: "CODER"
    body: "Verified: streamed runner stdout and stderr into canonical trace artifacts, kept only capped in-memory tails for summaries, and passed focused supervision/adapter tests plus source builds."
events:
  -
    type: "status"
    at: "2026-03-24T09:12:12.831Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: stream runner stdout and stderr into canonical trace artifacts with a capped in-memory tail, but keep result/task-facing semantics unchanged in this commit."
  -
    type: "verify"
    at: "2026-03-24T09:21:58.861Z"
    author: "CODER"
    state: "ok"
    note: "Focused supervision and adapter tests passed; source builds passed after streaming stdout and stderr into canonical trace artifacts with capped in-memory tails."
  -
    type: "status"
    at: "2026-03-24T09:26:20.130Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: streamed runner stdout and stderr into canonical trace artifacts, kept only capped in-memory tails for summaries, and passed focused supervision/adapter tests plus source builds."
doc_version: 3
doc_updated_at: "2026-03-24T09:26:20.130Z"
doc_updated_by: "CODER"
description: "Refactor runner process supervision to stream stdout and stderr into canonical trace files and keep only a capped in-memory tail for summaries instead of retaining the full process output in memory until exit."
sections:
  Summary: |-
    Stream runner stdout and stderr to trace files
    
    Refactor runner process supervision to stream stdout and stderr into canonical trace files and keep only a capped in-memory tail for summaries instead of retaining the full process output in memory until exit.
  Scope: |-
    - In scope: stream runner stdout and stderr into canonical trace artifacts during execution.
    - In scope: retain only a capped in-memory tail for later adapter summaries and metrics.
    - Out of scope: task-facing projection sanitization, result summary language policy, or trace config knobs.
  Plan: |-
    1. Refactor runner process supervision to stream stdout and stderr into canonical trace artifacts while retaining only a capped in-memory tail for later summaries.
    2. Update the affected adapter execution paths and focused tests so streaming trace capture works without changing task-facing result semantics yet.
    3. Verify the touched supervision and adapter paths, then finish with one task-scoped commit.
  Verify Steps: |-
    1. Inspect the supervision path. Expected: process output is written incrementally into canonical trace artifacts instead of being kept only in memory.
    2. Run focused supervision and adapter tests. Expected: success and failure paths still pass while trace artifacts are populated.
    3. Run a source build for the touched package. Expected: TypeScript/build checks pass after the supervision refactor.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T09:21:58.861Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused supervision and adapter tests passed; source builds passed after streaming stdout and stderr into canonical trace artifacts with capped in-memory tails.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T09:12:12.832Z, excerpt_hash=sha256:7c4f784159fa81eb640a9069171a5bc9759c9994bb69e32ced88ce7ee80fe826
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task commit.
    - Re-run the focused supervision and adapter tests plus build to confirm the previous output-handling path is restored.
  Findings: ""
id_source: "generated"
---
## Summary

Stream runner stdout and stderr to trace files

Refactor runner process supervision to stream stdout and stderr into canonical trace files and keep only a capped in-memory tail for summaries instead of retaining the full process output in memory until exit.

## Scope

- In scope: stream runner stdout and stderr into canonical trace artifacts during execution.
- In scope: retain only a capped in-memory tail for later adapter summaries and metrics.
- Out of scope: task-facing projection sanitization, result summary language policy, or trace config knobs.

## Plan

1. Refactor runner process supervision to stream stdout and stderr into canonical trace artifacts while retaining only a capped in-memory tail for later summaries.
2. Update the affected adapter execution paths and focused tests so streaming trace capture works without changing task-facing result semantics yet.
3. Verify the touched supervision and adapter paths, then finish with one task-scoped commit.

## Verify Steps

1. Inspect the supervision path. Expected: process output is written incrementally into canonical trace artifacts instead of being kept only in memory.
2. Run focused supervision and adapter tests. Expected: success and failure paths still pass while trace artifacts are populated.
3. Run a source build for the touched package. Expected: TypeScript/build checks pass after the supervision refactor.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T09:21:58.861Z — VERIFY — ok

By: CODER

Note: Focused supervision and adapter tests passed; source builds passed after streaming stdout and stderr into canonical trace artifacts with capped in-memory tails.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T09:12:12.832Z, excerpt_hash=sha256:7c4f784159fa81eb640a9069171a5bc9759c9994bb69e32ced88ce7ee80fe826

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task commit.
- Re-run the focused supervision and adapter tests plus build to confirm the previous output-handling path is restored.

## Findings
