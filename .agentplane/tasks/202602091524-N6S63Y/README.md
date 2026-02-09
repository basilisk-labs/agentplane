---
id: "202602091524-N6S63Y"
title: "local backend: parallelize listTasks with concurrency limit"
result_summary: "Concurrent listTasks with stable ordering"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "backend"
  - "perf"
  - "tasks"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T16:31:19.102Z"
  updated_by: "TESTER"
  note: "Verified: bun run lint and bun run test:full pass. LocalBackend.listTasks now uses bounded parallelism (mapLimit) with deterministic dir ordering, reducing serialized filesystem I/O."
commit:
  hash: "20b61953cfcae8232123ca6dea171cfecbbea9d2"
  message: "✅ N6S63Y backend: parallelize local listTasks"
comments:
  -
    author: "CODER"
    body: "Start: speed up local task backend listTasks by parallelizing per-task filesystem reads with a concurrency limit, while preserving deterministic ordering and index writes."
  -
    author: "CODER"
    body: "Verified: bun run lint and bun run test:full pass. LocalBackend.listTasks now processes task directories in sorted order and reads/parses readmes with bounded concurrency, while preserving duplicate/invalid id guards and task-index cache writes."
events:
  -
    type: "status"
    at: "2026-02-09T16:28:31.429Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: speed up local task backend listTasks by parallelizing per-task filesystem reads with a concurrency limit, while preserving deterministic ordering and index writes."
  -
    type: "verify"
    at: "2026-02-09T16:31:19.102Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run lint and bun run test:full pass. LocalBackend.listTasks now uses bounded parallelism (mapLimit) with deterministic dir ordering, reducing serialized filesystem I/O."
  -
    type: "status"
    at: "2026-02-09T16:31:19.256Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint and bun run test:full pass. LocalBackend.listTasks now processes task directories in sorted order and reads/parses readmes with bounded concurrency, while preserving duplicate/invalid id guards and task-index cache writes."
doc_version: 2
doc_updated_at: "2026-02-09T16:31:19.256Z"
doc_updated_by: "CODER"
description: "Speed up task listing for large workspaces by parallelizing per-task README stat/read/parse with a bounded concurrency (mapLimit)."
id_source: "generated"
---
## Summary

Improve performance of local task backend listTasks by using bounded concurrency when reading/parsing per-task README files.

## Scope

packages/agentplane/src/backends/task-backend/local-backend.ts and associated tests.

## Plan

1) Inspect current local backend listTasks implementation and identify sequential I/O hotspots.\n2) Introduce concurrency-limited parallel read/parse of task readmes (mapLimit style).\n3) Preserve stable ordering in returned list and deterministic index updates.\n4) Add/update unit tests for listTasks behavior (ordering, correctness) and ensure performance logic is covered.\n5) Run bun run lint and bun run test:full.

## Risks

Risk: nondeterministic ordering if not handled. Mitigation: sort task IDs after collection; keep stable ordering.

## Verify Steps

- bun run lint\n- bun run test:full

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T16:31:19.102Z — VERIFY — ok

By: TESTER

Note: Verified: bun run lint and bun run test:full pass. LocalBackend.listTasks now uses bounded parallelism (mapLimit) with deterministic dir ordering, reducing serialized filesystem I/O.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T16:28:31.715Z, excerpt_hash=sha256:b1c0b70f1d34c90da71779587c3cd50a8f706cb5646069c8a11489209697a440

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit.
