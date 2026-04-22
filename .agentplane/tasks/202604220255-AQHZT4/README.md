---
id: "202604220255-AQHZT4"
title: "Cache runner prompt source assembly"
status: "TODO"
priority: "low"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604220255-XYGAHE"
tags:
  - "cache"
  - "perf"
  - "runner"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:00.408Z"
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
doc_updated_at: "2026-04-22T02:55:19.539Z"
doc_updated_by: "PLANNER"
description: "Avoid repeated scanning/assembly of static runner prompt source files during repeated runner invocations in one process."
sections:
  Summary: "Introduce process-local caching for static runner prompt inputs with invalidation boundaries that preserve tests."
  Scope: "Runner prompt assembly only. Do not cache task-specific prompt content or mutable task state."
  Plan: |-
    1. Identify static prompt sources and current read/scan path.
    2. Add a small cache for static content keyed by source path/config.
    3. Keep task-specific data uncached.
    4. Add tests proving repeated runs reuse static assembly without stale task content.
  Verify Steps: "Run runner prompt tests, runner adapter tests, fast CI."
  Verification: "Pending implementation."
  Rollback Plan: "Remove the cache and restore direct prompt assembly reads."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Introduce process-local caching for static runner prompt inputs with invalidation boundaries that preserve tests.

## Scope

Runner prompt assembly only. Do not cache task-specific prompt content or mutable task state.

## Plan

1. Identify static prompt sources and current read/scan path.
2. Add a small cache for static content keyed by source path/config.
3. Keep task-specific data uncached.
4. Add tests proving repeated runs reuse static assembly without stale task content.

## Verify Steps

Run runner prompt tests, runner adapter tests, fast CI.

## Verification

Pending implementation.

## Rollback Plan

Remove the cache and restore direct prompt assembly reads.

## Findings

None yet.
