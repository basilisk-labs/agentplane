---
id: "202603240901-EABAY5"
title: "Sanitize task-facing runner projection"
result_summary: "Task-facing runner history now records only derived English summaries, metrics, and artifact paths while leaving raw assistant output in run artifacts instead of README/history blocks."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603240901-06C7GB"
tags:
  - "code"
  - "runner"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T09:34:37.949Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T09:41:51.484Z"
  updated_by: "CODER"
  note: "Runner lifecycle, scenario CLI, and tasks-query tests passed; source builds passed after sanitizing task-facing runner projections down to machine summaries, metrics, and artifact paths."
commit:
  hash: "cf54ed1627d307c62ed94971d5a34bd10116929c"
  message: "✅ EABAY5 code: done"
comments:
  -
    author: "CODER"
    body: "Start: sanitize task-facing runner projections so README/history/task metadata keep only machine-style English summaries, metrics, and artifact paths instead of assistant prose."
  -
    author: "CODER"
    body: "Verified: sanitized task-facing runner projections to derived English summaries plus metrics and artifact paths, removed copied assistant prose from README/history output, and passed focused lifecycle/CLI tests plus source builds."
events:
  -
    type: "status"
    at: "2026-03-24T09:34:51.391Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: sanitize task-facing runner projections so README/history/task metadata keep only machine-style English summaries, metrics, and artifact paths instead of assistant prose."
  -
    type: "verify"
    at: "2026-03-24T09:41:51.484Z"
    author: "CODER"
    state: "ok"
    note: "Runner lifecycle, scenario CLI, and tasks-query tests passed; source builds passed after sanitizing task-facing runner projections down to machine summaries, metrics, and artifact paths."
  -
    type: "status"
    at: "2026-03-24T09:41:58.938Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: sanitized task-facing runner projections to derived English summaries plus metrics and artifact paths, removed copied assistant prose from README/history output, and passed focused lifecycle/CLI tests plus source builds."
doc_version: 3
doc_updated_at: "2026-03-24T09:41:58.938Z"
doc_updated_by: "CODER"
description: "Update task-facing runner projection so README runner blocks, findings, and task metadata record only English machine summaries, metrics, and artifact paths, never raw assistant prose or copied model output."
sections:
  Summary: "Update task-facing runner projection so README runner blocks, findings, and task metadata record only English machine summaries, metrics, and artifact paths, never raw assistant prose or copied model output."
  Scope: |-
    - In scope: sanitize task-facing runner outcome projection in README/history/task metadata so it no longer copies assistant prose.
    - In scope: preserve machine summaries, status, metrics, and artifact paths for task-facing inspection.
    - Out of scope: raw trace capture, adapter-side human artifacts, config knobs, or docs updates.
  Plan: |-
    1. Inspect task-state projection paths that currently copy runner summaries or history into task-facing artifacts.
    2. Refactor those projections to keep only fixed English machine summaries, metrics, and artifact paths while leaving raw assistant text in trace-side artifacts.
    3. Update focused task-state and CLI tests, then verify the sanitized projection before finishing with one task-scoped commit.
  Verify Steps: |-
    1. Inspect the task-facing runner projection path. Expected: task README/history/metadata keep only machine-style English summaries plus metrics and artifact paths, with no copied assistant prose.
    2. Run focused task-state and runner CLI tests. Expected: runner outcome history still persists correctly while sanitized task-facing projections stay stable.
    3. Run a source build for the touched package. Expected: TypeScript/build checks pass after the projection sanitization.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T09:41:51.484Z — VERIFY — ok
    
    By: CODER
    
    Note: Runner lifecycle, scenario CLI, and tasks-query tests passed; source builds passed after sanitizing task-facing runner projections down to machine summaries, metrics, and artifact paths.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T09:34:51.393Z, excerpt_hash=sha256:c0419320b7b8d7e5ac60df52bcf1651ba1e00ae5e27c0514e0163e4869783613
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task commit.
    - Re-run the focused task-state and runner CLI tests plus build to confirm the prior projection behavior is restored.
  Findings: ""
id_source: "generated"
---
## Summary

Update task-facing runner projection so README runner blocks, findings, and task metadata record only English machine summaries, metrics, and artifact paths, never raw assistant prose or copied model output.

## Scope

- In scope: sanitize task-facing runner outcome projection in README/history/task metadata so it no longer copies assistant prose.
- In scope: preserve machine summaries, status, metrics, and artifact paths for task-facing inspection.
- Out of scope: raw trace capture, adapter-side human artifacts, config knobs, or docs updates.

## Plan

1. Inspect task-state projection paths that currently copy runner summaries or history into task-facing artifacts.
2. Refactor those projections to keep only fixed English machine summaries, metrics, and artifact paths while leaving raw assistant text in trace-side artifacts.
3. Update focused task-state and CLI tests, then verify the sanitized projection before finishing with one task-scoped commit.

## Verify Steps

1. Inspect the task-facing runner projection path. Expected: task README/history/metadata keep only machine-style English summaries plus metrics and artifact paths, with no copied assistant prose.
2. Run focused task-state and runner CLI tests. Expected: runner outcome history still persists correctly while sanitized task-facing projections stay stable.
3. Run a source build for the touched package. Expected: TypeScript/build checks pass after the projection sanitization.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T09:41:51.484Z — VERIFY — ok

By: CODER

Note: Runner lifecycle, scenario CLI, and tasks-query tests passed; source builds passed after sanitizing task-facing runner projections down to machine summaries, metrics, and artifact paths.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T09:34:51.393Z, excerpt_hash=sha256:c0419320b7b8d7e5ac60df52bcf1651ba1e00ae5e27c0514e0163e4869783613

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task commit.
- Re-run the focused task-state and runner CLI tests plus build to confirm the prior projection behavior is restored.

## Findings
