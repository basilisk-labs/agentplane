---
id: "202604220255-7DPXA1"
title: "Split remaining oversized CLI mega-tests"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604220255-FFR5QS"
tags:
  - "cli"
  - "refactor"
  - "testing"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:04.773Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T06:51:19.733Z"
  updated_by: "CODER"
  note: "Verified oversized CLI mega-test split. Checks passed: targeted split CLI suites; hotspot guard; typecheck; format check; local CI selection and release contract tests; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split remaining oversized CLI mega-tests while preserving behavior and verification coverage."
events:
  -
    type: "status"
    at: "2026-04-22T06:32:06.386Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split remaining oversized CLI mega-tests while preserving behavior and verification coverage."
  -
    type: "verify"
    at: "2026-04-22T06:51:19.733Z"
    author: "CODER"
    state: "ok"
    note: "Verified oversized CLI mega-test split. Checks passed: targeted split CLI suites; hotspot guard; typecheck; format check; local CI selection and release contract tests; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check."
doc_version: 3
doc_updated_at: "2026-04-22T06:51:19.741Z"
doc_updated_by: "CODER"
description: "Split block-finish, task-hosted-close, and init mega-test files into scenario-focused files under the configured test size threshold."
sections:
  Summary: "Reduce large CLI test files into scenario files that are easier to debug and compatible with hotspot/test guards."
  Scope: "Test files and test helper imports only. Do not weaken scenario coverage."
  Plan: |-
    1. Split each mega-test by scenario family.
    2. Move shared setup to existing or newly consolidated testkit helpers.
    3. Preserve test names enough for failure triage.
    4. Run oversized-test guard and affected project suites.
  Verify Steps: "Run oversized hotspot/test guard, affected CLI suites, fast CI."
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T06:51:19.733Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified oversized CLI mega-test split. Checks passed: targeted split CLI suites; hotspot guard; typecheck; format check; local CI selection and release contract tests; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T06:32:06.397Z, excerpt_hash=sha256:858e59ee5208a0065711b01c11b2d4aac37e84775fef4257026c6a493cc4caac
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore previous mega-test files and remove split files."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Reduce large CLI test files into scenario files that are easier to debug and compatible with hotspot/test guards.

## Scope

Test files and test helper imports only. Do not weaken scenario coverage.

## Plan

1. Split each mega-test by scenario family.
2. Move shared setup to existing or newly consolidated testkit helpers.
3. Preserve test names enough for failure triage.
4. Run oversized-test guard and affected project suites.

## Verify Steps

Run oversized hotspot/test guard, affected CLI suites, fast CI.

## Verification

Pending implementation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T06:51:19.733Z — VERIFY — ok

By: CODER

Note: Verified oversized CLI mega-test split. Checks passed: targeted split CLI suites; hotspot guard; typecheck; format check; local CI selection and release contract tests; bun run arch:baseline && bun run arch:deps; bun run ci:local:fast; bun run knip:check; git diff --check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T06:32:06.397Z, excerpt_hash=sha256:858e59ee5208a0065711b01c11b2d4aac37e84775fef4257026c6a493cc4caac

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore previous mega-test files and remove split files.

## Findings

None yet.
