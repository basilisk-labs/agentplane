---
id: "202604220255-XYGAHE"
title: "Remove duplicate task doc normalization in task new"
status: "DOING"
priority: "low"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604220255-104K7S"
tags:
  - "cleanup"
  - "perf"
  - "tasks"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:58:59.658Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T04:57:03.060Z"
  updated_by: "CODER"
  note: "Verified task new single-normalization cleanup. Checks passed: cli-core task create/doc-write tests (2 files, 27 tests), task-intake/core task doc tests (3 files, 18 tests), typecheck, eslint on changed files, git diff --check, arch baseline/deps, knip baseline, ci:local:fast (234 fast files / 1361 tests passed, 2 skipped; 5 critical E2E files / 13 tests passed)."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove the redundant first task document state build in task new, preserve final README v3 metadata/sections output, and cover canonical sections after Verify Steps seeding."
events:
  -
    type: "status"
    at: "2026-04-22T04:52:10.357Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove the redundant first task document state build in task new, preserve final README v3 metadata/sections output, and cover canonical sections after Verify Steps seeding."
  -
    type: "verify"
    at: "2026-04-22T04:57:03.060Z"
    author: "CODER"
    state: "ok"
    note: "Verified task new single-normalization cleanup. Checks passed: cli-core task create/doc-write tests (2 files, 27 tests), task-intake/core task doc tests (3 files, 18 tests), typecheck, eslint on changed files, git diff --check, arch baseline/deps, knip baseline, ci:local:fast (234 fast files / 1361 tests passed, 2 skipped; 5 critical E2E files / 13 tests passed)."
doc_version: 3
doc_updated_at: "2026-04-22T04:57:03.073Z"
doc_updated_by: "CODER"
description: "Ensure task creation normalizes the generated task document once instead of running redundant normalization paths."
sections:
  Summary: "Simplify task creation document generation and remove double-normalization overhead."
  Scope: "Task creation/doc generation path and tests. Preserve generated README contract exactly unless an existing bug is exposed."
  Plan: |-
    1. Trace task new document generation and normalization calls.
    2. Remove redundant normalization while keeping canonical doc_version=3 output.
    3. Add regression coverage for generated sections.
    4. Verify task new tests and snapshots.
  Verify Steps: "Run task new/doc tests, fast CI, git diff --check."
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T04:57:03.060Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified task new single-normalization cleanup. Checks passed: cli-core task create/doc-write tests (2 files, 27 tests), task-intake/core task doc tests (3 files, 18 tests), typecheck, eslint on changed files, git diff --check, arch baseline/deps, knip baseline, ci:local:fast (234 fast files / 1361 tests passed, 2 skipped; 5 critical E2E files / 13 tests passed).
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T04:52:10.372Z, excerpt_hash=sha256:37c5a748476c96cbde501b9e2ca57ca74e3ff65f701cd349ee0afbc1a6fa0714
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore the previous normalization sequence."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Simplify task creation document generation and remove double-normalization overhead.

## Scope

Task creation/doc generation path and tests. Preserve generated README contract exactly unless an existing bug is exposed.

## Plan

1. Trace task new document generation and normalization calls.
2. Remove redundant normalization while keeping canonical doc_version=3 output.
3. Add regression coverage for generated sections.
4. Verify task new tests and snapshots.

## Verify Steps

Run task new/doc tests, fast CI, git diff --check.

## Verification

Pending implementation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T04:57:03.060Z — VERIFY — ok

By: CODER

Note: Verified task new single-normalization cleanup. Checks passed: cli-core task create/doc-write tests (2 files, 27 tests), task-intake/core task doc tests (3 files, 18 tests), typecheck, eslint on changed files, git diff --check, arch baseline/deps, knip baseline, ci:local:fast (234 fast files / 1361 tests passed, 2 skipped; 5 critical E2E files / 13 tests passed).

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T04:52:10.372Z, excerpt_hash=sha256:37c5a748476c96cbde501b9e2ca57ca74e3ff65f701cd349ee0afbc1a6fa0714

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore the previous normalization sequence.

## Findings

None yet.
