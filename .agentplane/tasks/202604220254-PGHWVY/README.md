---
id: "202604220254-PGHWVY"
title: "Unify supervised runner adapter execution pipeline"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604220254-53MF69"
tags:
  - "code"
  - "refactor"
  - "runner"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:58:56.371Z"
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
doc_updated_at: "2026-04-22T02:54:47.178Z"
doc_updated_by: "PLANNER"
description: "Consolidate duplicated supervised execution/finalization flow between custom and Codex runner adapters behind a shared executor."
sections:
  Summary: "Remove duplicated process supervision orchestration from runner adapters while preserving adapter-specific event mapping."
  Scope: "Runner adapters, process-supervision integration, and runner tests. Do not change task lifecycle state semantics."
  Plan: |-
    1. Compare CodexRunnerAdapter and CustomRunnerAdapter execution paths.
    2. Extract shared executor/finalizer where behavior is identical.
    3. Keep adapter-specific prompt/env/event logic local.
    4. Update tests to cover both adapters through shared behavior.
  Verify Steps: "Run runner adapter tests, task lifecycle tests, arch checks, fast CI."
  Verification: "Pending implementation."
  Rollback Plan: "Inline the shared executor back into adapters and restore previous adapter implementations."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Remove duplicated process supervision orchestration from runner adapters while preserving adapter-specific event mapping.

## Scope

Runner adapters, process-supervision integration, and runner tests. Do not change task lifecycle state semantics.

## Plan

1. Compare CodexRunnerAdapter and CustomRunnerAdapter execution paths.
2. Extract shared executor/finalizer where behavior is identical.
3. Keep adapter-specific prompt/env/event logic local.
4. Update tests to cover both adapters through shared behavior.

## Verify Steps

Run runner adapter tests, task lifecycle tests, arch checks, fast CI.

## Verification

Pending implementation.

## Rollback Plan

Inline the shared executor back into adapters and restore previous adapter implementations.

## Findings

None yet.
