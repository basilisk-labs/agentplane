---
id: "202607092208-PC3904"
title: "Decompose oversized test suites for v0.6.22"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "patch-0.6.22"
  - "refactor"
  - "tests"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run coverage:thresholds:check"
  - "bun run hotspots:check"
  - "bun run test:fast"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-09T22:09:57.688Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-09T22:09:47.678Z"
doc_updated_by: "PLANNER"
description: "Split the 11 test files above 1000 lines by behavior and fixture boundary, centralize only stable helpers, and reduce the oversized-test baseline without weakening assertions or coverage."
sections:
  Summary: |-
    Decompose oversized test suites for v0.6.22

    Split the 11 test files above 1000 lines by behavior and fixture boundary, centralize only stable helpers, and reduce the oversized-test baseline without weakening assertions or coverage.
  Scope: |-
    - In scope: Split the 11 test files above 1000 lines by behavior and fixture boundary, centralize only stable helpers, and reduce the oversized-test baseline without weakening assertions or coverage.
    - Out of scope: unrelated refactors not required for "Decompose oversized test suites for v0.6.22".
  Plan: |-
    1. Group the 11 oversized suites by behavior and fixture boundary.
    2. Split files without deleting assertions; extract helpers only when stable across suites.
    3. Update the oversized-test baseline downward and preserve coverage thresholds.
    4. Run fast tests, coverage, hotspots, and typecheck.
  Verify Steps: |-
    1. Run `bun run hotspots:check`; the >1000-line test baseline drops below 11 files and 12438 total lines, with no file above 1300 lines.
    2. Run `bun run test:fast`; all suites pass with no lost test cases attributable to the split.
    3. Run `bun run coverage:thresholds:check`; thresholds do not regress.
    4. Run `bun run typecheck` and `bun run ci:contract`; both pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Decompose oversized test suites for v0.6.22

Split the 11 test files above 1000 lines by behavior and fixture boundary, centralize only stable helpers, and reduce the oversized-test baseline without weakening assertions or coverage.

## Scope

- In scope: Split the 11 test files above 1000 lines by behavior and fixture boundary, centralize only stable helpers, and reduce the oversized-test baseline without weakening assertions or coverage.
- Out of scope: unrelated refactors not required for "Decompose oversized test suites for v0.6.22".

## Plan

1. Group the 11 oversized suites by behavior and fixture boundary.
2. Split files without deleting assertions; extract helpers only when stable across suites.
3. Update the oversized-test baseline downward and preserve coverage thresholds.
4. Run fast tests, coverage, hotspots, and typecheck.

## Verify Steps

1. Run `bun run hotspots:check`; the >1000-line test baseline drops below 11 files and 12438 total lines, with no file above 1300 lines.
2. Run `bun run test:fast`; all suites pass with no lost test cases attributable to the split.
3. Run `bun run coverage:thresholds:check`; thresholds do not regress.
4. Run `bun run typecheck` and `bun run ci:contract`; both pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
