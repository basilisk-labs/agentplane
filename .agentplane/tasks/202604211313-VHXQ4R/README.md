---
id: "202604211313-VHXQ4R"
title: "Split PR validation CLI mega-test"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-21T13:13:26.887Z"
doc_updated_by: "PLANNER"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
