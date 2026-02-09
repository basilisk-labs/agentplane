---
id: "202602091644-03VNRE"
title: "Tasks index v2 + rebuild-index command"
result_summary: "tasks index v2 + rebuild-index"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602091644-5RH64E"
tags:
  - "code"
  - "backend"
  - "perf"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T17:12:13.761Z"
  updated_by: "TESTER"
  note: "Verified: bun run lint and bun run test:full pass."
commit:
  hash: "c4bea29b7cc6e7c11e8f757811227b0b4cfb2fc3"
  message: "✅ 03VNRE backend: tasks index v2 + rebuild command"
comments:
  -
    author: "CODER"
    body: "Start: Implement tasks-index.v2 schema (byId/byPath), migrate local backend caching to v2, add task rebuild-index command, and wire into doctor --fix."
  -
    author: "CODER"
    body: "Verified: bun run lint and bun run test:full pass. Migrated local backend cache to tasks-index.v2.json (byId/byPath with v1 read fallback), added task rebuild-index command, and wired doctor --fix to best-effort rebuild the cache."
events:
  -
    type: "status"
    at: "2026-02-09T17:08:07.722Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement tasks-index.v2 schema (byId/byPath), migrate local backend caching to v2, add task rebuild-index command, and wire into doctor --fix."
  -
    type: "verify"
    at: "2026-02-09T17:12:13.761Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run lint and bun run test:full pass."
  -
    type: "status"
    at: "2026-02-09T17:12:20.226Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint and bun run test:full pass. Migrated local backend cache to tasks-index.v2.json (byId/byPath with v1 read fallback), added task rebuild-index command, and wired doctor --fix to best-effort rebuild the cache."
doc_version: 2
doc_updated_at: "2026-02-09T17:12:20.226Z"
doc_updated_by: "CODER"
description: "Introduce tasks-index.v2 schema (byId/byPath) and a rebuild-index usecase/command; integrate with doctor --fix."
id_source: "generated"
---
## Summary

Introduce tasks-index.v2.json with byId/byPath maps and a rebuild-index usecase/command. Integrate with doctor --fix.

## Scope

packages/agentplane/src/backends/task-backend/** and task-index module; add a rebuild-index command.

## Plan

1) Design tasks-index.v2 schema: byId/byPath, schema_version=2.\n2) Implement load/save for v2 while keeping v1 read compat.\n3) Add rebuild-index usecase/command and unit tests.\n4) Wire doctor --fix to call rebuild-index when safe.\n5) Run bun run lint and bun run test:full.

## Risks

Risk: cache format change impacts performance or correctness; mitigate with backwards-compatible reader and tests.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T17:12:13.761Z — VERIFY — ok

By: TESTER

Note: Verified: bun run lint and bun run test:full pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T17:08:07.722Z, excerpt_hash=sha256:b1c0b70f1d34c90da71779587c3cd50a8f706cb5646069c8a11489209697a440

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert v2 index writer and rebuild command; keep v1 behavior.

## Verify Steps

- bun run lint\n- bun run test:full
