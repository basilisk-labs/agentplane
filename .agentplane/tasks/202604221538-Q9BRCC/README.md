---
id: "202604221538-Q9BRCC"
title: "Add init and upgrade prompt migration tests"
status: "TODO"
priority: "high"
owner: "TESTER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604221538-EWPH3C"
  - "202604221538-RV7BQG"
tags:
  - "code"
  - "init"
  - "prompt-assembly"
  - "testing"
  - "upgrade"
  - "v0.4"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T15:38:38.464Z"
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
doc_updated_at: "2026-04-22T15:38:38.249Z"
doc_updated_by: "PLANNER"
description: "Add integration tests for init and upgrade paths that compile prompt outputs, preserve no-recipe behavior, and report drift."
sections:
  Summary: |-
    Add init and upgrade prompt migration tests

    Add integration tests for init and upgrade paths that compile prompt outputs, preserve no-recipe behavior, and report drift.
  Scope: |-
    - In scope: Add integration tests for init and upgrade paths that compile prompt outputs, preserve no-recipe behavior, and report drift.
    - Out of scope: unrelated refactors not required for "Add init and upgrade prompt migration tests".
  Plan: |-
    Goal: Add init and upgrade prompt migration tests

    Plan:
    1. Inspect the current implementation and tests around this scope.
    2. Make the smallest implementation change that satisfies the task contract.
    3. Add or update focused tests and fixtures for the changed behavior.
    4. Update docs or generated schemas only when the code-facing contract changes.

    Acceptance:
    - Tests prove legacy prompt files migrate to compiled outputs without losing gateway semantics.
    - Existing public behavior outside this scope is preserved.
    - Verification evidence is recorded before finish.

    Rollback Plan:
    - Revert this task commit and rerun the focused verification commands.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Add init and upgrade prompt migration tests

Add integration tests for init and upgrade paths that compile prompt outputs, preserve no-recipe behavior, and report drift.

## Scope

- In scope: Add integration tests for init and upgrade paths that compile prompt outputs, preserve no-recipe behavior, and report drift.
- Out of scope: unrelated refactors not required for "Add init and upgrade prompt migration tests".

## Plan

Goal: Add init and upgrade prompt migration tests

Plan:
1. Inspect the current implementation and tests around this scope.
2. Make the smallest implementation change that satisfies the task contract.
3. Add or update focused tests and fixtures for the changed behavior.
4. Update docs or generated schemas only when the code-facing contract changes.

Acceptance:
- Tests prove legacy prompt files migrate to compiled outputs without losing gateway semantics.
- Existing public behavior outside this scope is preserved.
- Verification evidence is recorded before finish.

Rollback Plan:
- Revert this task commit and rerun the focused verification commands.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
