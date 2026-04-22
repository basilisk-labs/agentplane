---
id: "202604220254-GSBPC3"
title: "Replace synchronous trace writes in runner hot path"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604220254-PGHWVY"
tags:
  - "io"
  - "perf"
  - "runner"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:58:57.278Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-22T02:54:53.160Z"
doc_updated_by: "PLANNER"
description: "Remove appendFileSync/writeFileSync calls from process-supervision output streaming and use a buffered asynchronous writer with deterministic flush."
sections:
  Summary: "Prevent child-process output chunks from blocking the event loop on synchronous trace writes."
  Scope: "Runner trace/stderr/stdout writing path and tests. Preserve trace file format and ordering guarantees."
  Plan: |-
    1. Locate sync file writes inside process-supervision output handling.
    2. Introduce a small buffered async trace writer with explicit close/flush.
    3. Wire supervision cleanup and error paths to flush deterministically.
    4. Add tests for ordering and cleanup on success/failure.
  Verify Steps: "Run runner/process-supervision tests, lifecycle tests, fast CI, git diff --check."
  Verification: "Pending implementation."
  Rollback Plan: "Restore previous synchronous trace write implementation."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Prevent child-process output chunks from blocking the event loop on synchronous trace writes.

## Scope

Runner trace/stderr/stdout writing path and tests. Preserve trace file format and ordering guarantees.

## Plan

1. Locate sync file writes inside process-supervision output handling.
2. Introduce a small buffered async trace writer with explicit close/flush.
3. Wire supervision cleanup and error paths to flush deterministically.
4. Add tests for ordering and cleanup on success/failure.

## Verify Steps

Run runner/process-supervision tests, lifecycle tests, fast CI, git diff --check.

## Verification

Pending implementation.

## Rollback Plan

Restore previous synchronous trace write implementation.

## Findings

None yet.
