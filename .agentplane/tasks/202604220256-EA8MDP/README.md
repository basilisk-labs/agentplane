---
id: "202604220256-EA8MDP"
title: "Normalize recipe test fixture cache reset behavior"
status: "DOING"
priority: "low"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-22T08:12:24.899Z"
  updated_by: "CODER"
  note: "Passed: focused recipe/testkit Vitest suite (8 files, 62 tests), focused lint, bun run arch:baseline && bun run arch:deps, bun run ci:local:fast, bun run knip:check, git diff --check."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: normalize recipe fixture cache reset behavior and verify recipe suites in isolation and fast CI."
events:
  -
    type: "status"
    at: "2026-04-22T08:06:48.688Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: normalize recipe fixture cache reset behavior and verify recipe suites in isolation and fast CI."
  -
    type: "verify"
    at: "2026-04-22T08:12:24.899Z"
    author: "CODER"
    state: "ok"
    note: "Passed: focused recipe/testkit Vitest suite (8 files, 62 tests), focused lint, bun run arch:baseline && bun run arch:deps, bun run ci:local:fast, bun run knip:check, git diff --check."
doc_version: 3
doc_updated_at: "2026-04-22T08:12:24.905Z"
doc_updated_by: "CODER"
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
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T08:12:24.899Z — VERIFY — ok
    
    By: CODER
    
    Note: Passed: focused recipe/testkit Vitest suite (8 files, 62 tests), focused lint, bun run arch:baseline && bun run arch:deps, bun run ci:local:fast, bun run knip:check, git diff --check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T08:06:48.696Z, excerpt_hash=sha256:989d5e6f855bea225a6cf7b2b612d4d37d890b2983239f64ed777de97304e98a
    
    <!-- END VERIFICATION RESULTS -->
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

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T08:12:24.899Z — VERIFY — ok

By: CODER

Note: Passed: focused recipe/testkit Vitest suite (8 files, 62 tests), focused lint, bun run arch:baseline && bun run arch:deps, bun run ci:local:fast, bun run knip:check, git diff --check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T08:06:48.696Z, excerpt_hash=sha256:989d5e6f855bea225a6cf7b2b612d4d37d890b2983239f64ed777de97304e98a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore previous fixture cache behavior.

## Findings

None yet.
