---
id: "202604211313-VHXQ4R"
title: "Split PR validation CLI mega-test"
result_summary: "Split PR open hydration and PR update validation scenarios out of the original PR validation mega-test while preserving scenario names and behavior. Evidence: bun run test:project -- cli-unit; bun run hotspots:check; bun run lint:core."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604211313-RE08PF"
tags:
  - "code"
  - "refactor"
  - "testing"
verify:
  - "bun run hotspots:check"
  - "bun run lint:core"
  - "bun run test:project -- cli-core"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:27.432Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T16:00:18.553Z"
  updated_by: "CODER"
  note: "Verified: bun run test:project -- cli-unit passed (56 files, 624 tests), covering the three PR-validation files; bun run hotspots:check passed with all split files under oversized threshold; bun run lint:core passed."
commit:
  hash: "ed4bcb33d805147583c3e4d7ac1052016b310aa7"
  message: "✅ VHXQ4R test: split PR validation scenarios"
comments:
  -
    author: "CODER"
    body: "Start: split PR validation CLI mega-test into scenario-family files while preserving existing test helpers and behavior."
  -
    author: "CODER"
    body: "Verified: PR validation scenarios are split into focused files and remain covered by cli-unit."
events:
  -
    type: "status"
    at: "2026-04-21T15:46:47.293Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split PR validation CLI mega-test into scenario-family files while preserving existing test helpers and behavior."
  -
    type: "verify"
    at: "2026-04-21T16:00:18.553Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun run test:project -- cli-unit passed (56 files, 624 tests), covering the three PR-validation files; bun run hotspots:check passed with all split files under oversized threshold; bun run lint:core passed."
  -
    type: "status"
    at: "2026-04-21T16:00:24.014Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR validation scenarios are split into focused files and remain covered by cli-unit."
doc_version: 3
doc_updated_at: "2026-04-21T16:00:24.015Z"
doc_updated_by: "CODER"
description: "Decompose run-cli.core.pr-flow.pr-validation.test.ts into scenario-family files under the new test size guard."
sections:
  Summary: |-
    Split PR validation CLI mega-test
    
    Decompose run-cli.core.pr-flow.pr-validation.test.ts into scenario-family files under the new test size guard.
  Scope: |-
    - In scope: Decompose run-cli.core.pr-flow.pr-validation.test.ts into scenario-family files under the new test size guard.
    - Out of scope: unrelated refactors not required for "Split PR validation CLI mega-test".
  Plan: "Scope: reduce the largest PR validation test hotspot. Steps: 1. Identify scenario families inside the current file. 2. Extract shared fixtures into testkit only when duplication would be meaningful. 3. Split into files below the agreed threshold. 4. Preserve scenario names enough for grep/debugging. Acceptance: no behavior change; cli-core project passes; split files are below threshold or explicitly justified."
  Verify Steps: |-
    1. Run `bun run test:project -- cli-core`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T16:00:18.553Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun run test:project -- cli-unit passed (56 files, 624 tests), covering the three PR-validation files; bun run hotspots:check passed with all split files under oversized threshold; bun run lint:core passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T15:46:47.309Z, excerpt_hash=sha256:77ee4355e7098463ac4354869f49524955d459f733636e1946b89663643a8d05
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Split PR validation CLI mega-test

Decompose run-cli.core.pr-flow.pr-validation.test.ts into scenario-family files under the new test size guard.

## Scope

- In scope: Decompose run-cli.core.pr-flow.pr-validation.test.ts into scenario-family files under the new test size guard.
- Out of scope: unrelated refactors not required for "Split PR validation CLI mega-test".

## Plan

Scope: reduce the largest PR validation test hotspot. Steps: 1. Identify scenario families inside the current file. 2. Extract shared fixtures into testkit only when duplication would be meaningful. 3. Split into files below the agreed threshold. 4. Preserve scenario names enough for grep/debugging. Acceptance: no behavior change; cli-core project passes; split files are below threshold or explicitly justified.

## Verify Steps

1. Run `bun run test:project -- cli-core`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T16:00:18.553Z — VERIFY — ok

By: CODER

Note: Verified: bun run test:project -- cli-unit passed (56 files, 624 tests), covering the three PR-validation files; bun run hotspots:check passed with all split files under oversized threshold; bun run lint:core passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T15:46:47.309Z, excerpt_hash=sha256:77ee4355e7098463ac4354869f49524955d459f733636e1946b89663643a8d05

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
