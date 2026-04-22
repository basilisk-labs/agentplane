---
id: "202604220254-GSBPC3"
title: "Replace synchronous trace writes in runner hot path"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-22T04:23:52.618Z"
  updated_by: "CODER"
  note: "Verified async buffered process-supervision writes. Checks: no appendFileSync/writeFileSync remains in runner process-supervision/adapters; focused process-supervision tests (7 tests), runner lifecycle/adapter focused set (4 files/35 tests), typecheck, eslint on changed runner files, arch baseline/deps, knip baseline, git diff --check, ci:local:fast (233 fast files/1359 passed/2 skipped; 5 critical E2E files/13 passed)."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: replace synchronous process-supervision trace/stderr writes with deterministic async buffered writing while preserving trace ordering, retention, and failure cleanup semantics."
events:
  -
    type: "status"
    at: "2026-04-22T04:17:21.968Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace synchronous process-supervision trace/stderr writes with deterministic async buffered writing while preserving trace ordering, retention, and failure cleanup semantics."
  -
    type: "verify"
    at: "2026-04-22T04:23:52.618Z"
    author: "CODER"
    state: "ok"
    note: "Verified async buffered process-supervision writes. Checks: no appendFileSync/writeFileSync remains in runner process-supervision/adapters; focused process-supervision tests (7 tests), runner lifecycle/adapter focused set (4 files/35 tests), typecheck, eslint on changed runner files, arch baseline/deps, knip baseline, git diff --check, ci:local:fast (233 fast files/1359 passed/2 skipped; 5 critical E2E files/13 passed)."
doc_version: 3
doc_updated_at: "2026-04-22T04:23:52.631Z"
doc_updated_by: "CODER"
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
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T04:23:52.618Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified async buffered process-supervision writes. Checks: no appendFileSync/writeFileSync remains in runner process-supervision/adapters; focused process-supervision tests (7 tests), runner lifecycle/adapter focused set (4 files/35 tests), typecheck, eslint on changed runner files, arch baseline/deps, knip baseline, git diff --check, ci:local:fast (233 fast files/1359 passed/2 skipped; 5 critical E2E files/13 passed).
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T04:17:21.984Z, excerpt_hash=sha256:52778af155609b20d955d1da660020aeed87e07c7b38d164196045f7dd7646bd
    
    <!-- END VERIFICATION RESULTS -->
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

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T04:23:52.618Z — VERIFY — ok

By: CODER

Note: Verified async buffered process-supervision writes. Checks: no appendFileSync/writeFileSync remains in runner process-supervision/adapters; focused process-supervision tests (7 tests), runner lifecycle/adapter focused set (4 files/35 tests), typecheck, eslint on changed runner files, arch baseline/deps, knip baseline, git diff --check, ci:local:fast (233 fast files/1359 passed/2 skipped; 5 critical E2E files/13 passed).

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T04:17:21.984Z, excerpt_hash=sha256:52778af155609b20d955d1da660020aeed87e07c7b38d164196045f7dd7646bd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore previous synchronous trace write implementation.

## Findings

None yet.
