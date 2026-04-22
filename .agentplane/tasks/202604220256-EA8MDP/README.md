---
id: "202604220256-EA8MDP"
title: "Normalize recipe test fixture cache reset behavior"
status: "TODO"
priority: "low"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604220256-VE4YY5"
tags:
  - "recipes"
  - "stability"
  - "testing"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:08.685Z"
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
doc_updated_at: "2026-04-22T02:56:10.538Z"
doc_updated_by: "PLANNER"
description: "Remove global recipe archive fixture state leaks by adding explicit reset semantics around recipe test caches."
sections:
  Summary: "Make recipe archive/cache fixtures deterministic between tests."
  Scope: "Recipe test fixtures and tests. No production recipe runtime change."
  Plan: |-
    1. Identify global recipe fixture/cache state.
    2. Add explicit reset helper or beforeEach cleanup.
    3. Update recipe tests to use reset semantics.
    4. Verify recipe tests in isolation and in suite order.
  Verify Steps: "Run recipe tests alone and through fast CI."
  Verification: "Pending implementation."
  Rollback Plan: "Restore previous fixture cache behavior."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Make recipe archive/cache fixtures deterministic between tests.

## Scope

Recipe test fixtures and tests. No production recipe runtime change.

## Plan

1. Identify global recipe fixture/cache state.
2. Add explicit reset helper or beforeEach cleanup.
3. Update recipe tests to use reset semantics.
4. Verify recipe tests in isolation and in suite order.

## Verify Steps

Run recipe tests alone and through fast CI.

## Verification

Pending implementation.

## Rollback Plan

Restore previous fixture cache behavior.

## Findings

None yet.
