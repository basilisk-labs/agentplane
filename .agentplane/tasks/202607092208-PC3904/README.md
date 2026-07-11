---
id: "202607092208-PC3904"
title: "Decompose oversized test suites for v0.6.22"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
comments:
  -
    author: "CODER"
    body: "Start: split one oversized suite along existing describe boundaries without changing cases or assertions."
events:
  -
    type: "status"
    at: "2026-07-11T12:30:11.316Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split one oversized suite along existing describe boundaries without changing cases or assertions."
doc_version: 3
doc_updated_at: "2026-07-11T12:34:53.782Z"
doc_updated_by: "CODER"
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
  Findings: "Split run-cli.core.tasks.doc-write.test.ts at an existing test boundary into 557-line content/update coverage and 476-line validation/error coverage. All 16 original cases remain and pass across the two files. The oversized-test baseline falls from 11 files / 12438 current lines to 10 files / 11424 lines; no test exceeds 1300 lines and both split files are below 1000. Verification passed: focused 2 files / 16 tests, hotspots:check, typecheck, coverage thresholds, ci:contract, and full 364 files / 2157 tests."
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

Split run-cli.core.tasks.doc-write.test.ts at an existing test boundary into 557-line content/update coverage and 476-line validation/error coverage. All 16 original cases remain and pass across the two files. The oversized-test baseline falls from 11 files / 12438 current lines to 10 files / 11424 lines; no test exceeds 1300 lines and both split files are below 1000. Verification passed: focused 2 files / 16 tests, hotspots:check, typecheck, coverage thresholds, ci:contract, and full 364 files / 2157 tests.
