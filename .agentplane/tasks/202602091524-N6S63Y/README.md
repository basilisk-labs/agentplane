---
id: "202602091524-N6S63Y"
title: "local backend: parallelize listTasks with concurrency limit"
status: "TODO"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 2
doc_updated_at: "2026-02-09T15:24:44.025Z"
doc_updated_by: "CODER"
description: "Speed up task listing for large workspaces by parallelizing per-task README stat/read/parse with a bounded concurrency (mapLimit)."
id_source: "generated"
---
## Summary

Improve performance of local task backend listTasks by using bounded concurrency when reading/parsing per-task README files.

## Scope

packages/agentplane/src/backends/task-backend/local-backend.ts and associated tests.

## Plan

1. Implement mapLimit over task directories with concurrency 16-64 (tunable).\n2. Preserve deterministic output ordering.\n3. Update/add tests for performance-relevant behavior (functional equivalence).\n4. bun run test:full.

## Risks

Risk: nondeterministic ordering if not handled. Mitigation: sort task IDs after collection; keep stable ordering.

## Verify Steps

- bun run test:full

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit.
