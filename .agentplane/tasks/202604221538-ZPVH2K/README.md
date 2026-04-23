---
id: "202604221538-ZPVH2K"
title: "Add prompt diagnostics and doctor tests"
result_summary: "No-op closure recorded."
risk_level: "low"
breaking: false
status: "DONE"
priority: "med"
owner: "TESTER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604221538-93GJ3Q"
  - "202604221538-FY9VC7"
  - "202604221538-RV7BQG"
tags:
  - "cli"
  - "code"
  - "prompt-assembly"
  - "testing"
  - "v0.4"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T15:38:41.317Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: |-
      Verified: no implementation changes were required; closure is recorded as no-op bookkeeping.
      
      Note: Deferred beyond the active 0.3 foundation stabilization line; removed from the active board during backlog realignment before deeper prompt-assembly, recipe, and runner work resumes.
events:
  -
    type: "status"
    at: "2026-04-23T17:54:51.227Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: |-
      Verified: no implementation changes were required; closure is recorded as no-op bookkeeping.
      
      Note: Deferred beyond the active 0.3 foundation stabilization line; removed from the active board during backlog realignment before deeper prompt-assembly, recipe, and runner work resumes.
doc_version: 3
doc_updated_at: "2026-04-23T17:54:51.227Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add CLI and doctor tests for prompt graph explain output, missing generated artifacts, invalid recipe modules, and compiled prompt drift."
sections:
  Summary: |-
    Add prompt diagnostics and doctor tests
    
    Add CLI and doctor tests for prompt graph explain output, missing generated artifacts, invalid recipe modules, and compiled prompt drift.
  Scope: |-
    - In scope: Add CLI and doctor tests for prompt graph explain output, missing generated artifacts, invalid recipe modules, and compiled prompt drift.
    - Out of scope: unrelated refactors not required for "Add prompt diagnostics and doctor tests".
  Plan: |-
    Goal: Add prompt diagnostics and doctor tests
    
    Plan:
    1. Inspect the current implementation and tests around this scope.
    2. Make the smallest implementation change that satisfies the task contract.
    3. Add or update focused tests and fixtures for the changed behavior.
    4. Update docs or generated schemas only when the code-facing contract changes.
    
    Acceptance:
    - Doctor and explain surfaces report prompt assembly failures with actionable reason codes.
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

Add prompt diagnostics and doctor tests

Add CLI and doctor tests for prompt graph explain output, missing generated artifacts, invalid recipe modules, and compiled prompt drift.

## Scope

- In scope: Add CLI and doctor tests for prompt graph explain output, missing generated artifacts, invalid recipe modules, and compiled prompt drift.
- Out of scope: unrelated refactors not required for "Add prompt diagnostics and doctor tests".

## Plan

Goal: Add prompt diagnostics and doctor tests

Plan:
1. Inspect the current implementation and tests around this scope.
2. Make the smallest implementation change that satisfies the task contract.
3. Add or update focused tests and fixtures for the changed behavior.
4. Update docs or generated schemas only when the code-facing contract changes.

Acceptance:
- Doctor and explain surfaces report prompt assembly failures with actionable reason codes.
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
