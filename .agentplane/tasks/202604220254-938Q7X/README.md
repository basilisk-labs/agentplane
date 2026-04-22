---
id: "202604220254-938Q7X"
title: "Centralize task status normalization"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604220254-GSBPC3"
tags:
  - "code"
  - "refactor"
  - "tasks"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:58:57.959Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T04:40:25.511Z"
  updated_by: "CODER"
  note: "Verified centralized task status normalization. Checks passed: focused task/core status tests (9 files, 85 tests), bun run typecheck, eslint on changed files, git diff --check, bun run arch:baseline && bun run arch:deps, bun run knip:check, bun run ci:local:fast (234 fast files / 1361 tests passed, 2 skipped; 5 critical E2E files / 13 tests passed)."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: inventory duplicated task status normalization and route task query/transition/display callsites through one typed helper without expanding the task status model."
events:
  -
    type: "status"
    at: "2026-04-22T04:27:46.750Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inventory duplicated task status normalization and route task query/transition/display callsites through one typed helper without expanding the task status model."
  -
    type: "verify"
    at: "2026-04-22T04:40:25.511Z"
    author: "CODER"
    state: "ok"
    note: "Verified centralized task status normalization. Checks passed: focused task/core status tests (9 files, 85 tests), bun run typecheck, eslint on changed files, git diff --check, bun run arch:baseline && bun run arch:deps, bun run knip:check, bun run ci:local:fast (234 fast files / 1361 tests passed, 2 skipped; 5 critical E2E files / 13 tests passed)."
doc_version: 3
doc_updated_at: "2026-04-22T04:40:25.523Z"
doc_updated_by: "CODER"
description: "Replace repeated status string normalization with a single typed helper used across task query, transition, and display code."
sections:
  Summary: "Remove duplicated status normalization expressions and make accepted task statuses explicit."
  Scope: "Task status helpers and callsites. No status model expansion unless tests prove existing implicit values need preservation."
  Plan: |-
    1. Inventory repeated status normalization callsites.
    2. Add or reuse a canonical status normalization helper.
    3. Replace callsites and tighten typing where local.
    4. Verify task query and lifecycle output tests.
  Verify Steps: "Run task command tests, lifecycle tests, TypeScript check through fast CI, arch checks."
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T04:40:25.511Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified centralized task status normalization. Checks passed: focused task/core status tests (9 files, 85 tests), bun run typecheck, eslint on changed files, git diff --check, bun run arch:baseline && bun run arch:deps, bun run knip:check, bun run ci:local:fast (234 fast files / 1361 tests passed, 2 skipped; 5 critical E2E files / 13 tests passed).
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T04:27:46.766Z, excerpt_hash=sha256:b2c11bbf82506a2c6714f387c611cb7c12e952ca5c706d6272f81678b6173df1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore local normalization expressions at changed callsites."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Remove duplicated status normalization expressions and make accepted task statuses explicit.

## Scope

Task status helpers and callsites. No status model expansion unless tests prove existing implicit values need preservation.

## Plan

1. Inventory repeated status normalization callsites.
2. Add or reuse a canonical status normalization helper.
3. Replace callsites and tighten typing where local.
4. Verify task query and lifecycle output tests.

## Verify Steps

Run task command tests, lifecycle tests, TypeScript check through fast CI, arch checks.

## Verification

Pending implementation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T04:40:25.511Z — VERIFY — ok

By: CODER

Note: Verified centralized task status normalization. Checks passed: focused task/core status tests (9 files, 85 tests), bun run typecheck, eslint on changed files, git diff --check, bun run arch:baseline && bun run arch:deps, bun run knip:check, bun run ci:local:fast (234 fast files / 1361 tests passed, 2 skipped; 5 critical E2E files / 13 tests passed).

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T04:27:46.766Z, excerpt_hash=sha256:b2c11bbf82506a2c6714f387c611cb7c12e952ca5c706d6272f81678b6173df1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore local normalization expressions at changed callsites.

## Findings

None yet.
