---
id: "202604201100-FYQTHP"
title: "Fix guard core mock after GitClient migration"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "regression"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T11:00:35.260Z"
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
    author: "CODER"
    body: "Start: Fixing the guard unit-test regression exposed by the full pre-push gate after moving shared git helpers into @agentplaneorg/core."
events:
  -
    type: "status"
    at: "2026-04-20T11:00:41.024Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fixing the guard unit-test regression exposed by the full pre-push gate after moving shared git helpers into @agentplaneorg/core."
doc_version: 3
doc_updated_at: "2026-04-20T11:00:41.035Z"
doc_updated_by: "CODER"
description: "Repair guard command unit tests after shared git helpers moved to @agentplaneorg/core by preserving real core exports in the targeted mock."
sections:
  Summary: |-
    Fix guard core mock after GitClient migration
    
    Repair guard command unit tests after shared git helpers moved to @agentplaneorg/core by preserving real core exports in the targeted mock.
  Scope: |-
    - In scope: Repair guard command unit tests after shared git helpers moved to @agentplaneorg/core by preserving real core exports in the targeted mock.
    - Out of scope: unrelated refactors not required for "Fix guard core mock after GitClient migration".
  Plan: |-
    1. Inspect the guard unit-test mock surface that failed during pre-push after core git helper migration.
    2. Update the @agentplaneorg/core mock so it preserves actual exports and overrides only buildTaskArtifactRefreshCommitSubject.
    3. Run the focused guard unit-test file plus format/lint/typecheck gates needed for a safe push retry.
    4. Commit the test-contract fix, record verification, finish the task, then retry git push for the epic branch.
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

Fix guard core mock after GitClient migration

Repair guard command unit tests after shared git helpers moved to @agentplaneorg/core by preserving real core exports in the targeted mock.

## Scope

- In scope: Repair guard command unit tests after shared git helpers moved to @agentplaneorg/core by preserving real core exports in the targeted mock.
- Out of scope: unrelated refactors not required for "Fix guard core mock after GitClient migration".

## Plan

1. Inspect the guard unit-test mock surface that failed during pre-push after core git helper migration.
2. Update the @agentplaneorg/core mock so it preserves actual exports and overrides only buildTaskArtifactRefreshCommitSubject.
3. Run the focused guard unit-test file plus format/lint/typecheck gates needed for a safe push retry.
4. Commit the test-contract fix, record verification, finish the task, then retry git push for the epic branch.

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
