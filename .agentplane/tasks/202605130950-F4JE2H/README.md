---
id: "202605130950-F4JE2H"
title: "Stabilize recent GitHub CI failure modes"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T09:50:44.361Z"
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
    body: "Start: Implement the approved CI stability fixes in the dedicated task worktree, keeping changes scoped to wait-remote-pr-checks tests, sqlite child-process error handling, and CI gate labeling/runtime adjustments."
events:
  -
    type: "status"
    at: "2026-05-13T09:51:03.474Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the approved CI stability fixes in the dedicated task worktree, keeping changes scoped to wait-remote-pr-checks tests, sqlite child-process error handling, and CI gate labeling/runtime adjustments."
doc_version: 3
doc_updated_at: "2026-05-13T09:51:03.474Z"
doc_updated_by: "CODER"
description: "Make recent GitHub Actions failures less likely by hermeticizing wait-remote-pr-checks tests, handling sqlite stdin pipe errors, and reducing CI gate noise without weakening code quality."
sections:
  Summary: |-
    Stabilize recent GitHub CI failure modes
    
    Make recent GitHub Actions failures less likely by hermeticizing wait-remote-pr-checks tests, handling sqlite stdin pipe errors, and reducing CI gate noise without weakening code quality.
  Scope: |-
    - In scope: Make recent GitHub Actions failures less likely by hermeticizing wait-remote-pr-checks tests, handling sqlite stdin pipe errors, and reducing CI gate noise without weakening code quality.
    - Out of scope: unrelated refactors not required for "Stabilize recent GitHub CI failure modes".
  Plan: "Implement CI stability fixes from the GitHub Actions failure analysis: (1) make wait-remote-pr-checks script tests independent of pull_request-only env by explicitly setting/default-clearing branch env in test harness, (2) handle sqlite3 stdin pipe errors without unhandled Vitest exceptions, (3) adjust Core CI labels/Windows steps so blocking gates are explicit and redundant formatting does not slow platform checks. Verify with focused tests, format/knip/CI checks, policy routing, and doctor."
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

Stabilize recent GitHub CI failure modes

Make recent GitHub Actions failures less likely by hermeticizing wait-remote-pr-checks tests, handling sqlite stdin pipe errors, and reducing CI gate noise without weakening code quality.

## Scope

- In scope: Make recent GitHub Actions failures less likely by hermeticizing wait-remote-pr-checks tests, handling sqlite stdin pipe errors, and reducing CI gate noise without weakening code quality.
- Out of scope: unrelated refactors not required for "Stabilize recent GitHub CI failure modes".

## Plan

Implement CI stability fixes from the GitHub Actions failure analysis: (1) make wait-remote-pr-checks script tests independent of pull_request-only env by explicitly setting/default-clearing branch env in test harness, (2) handle sqlite3 stdin pipe errors without unhandled Vitest exceptions, (3) adjust Core CI labels/Windows steps so blocking gates are explicit and redundant formatting does not slow platform checks. Verify with focused tests, format/knip/CI checks, policy routing, and doctor.

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
