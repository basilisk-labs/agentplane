---
id: "202605120952-D2F8VR"
title: "Block ambiguous nested init roots"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-12T09:52:23.674Z"
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
    body: "Start: implementing parent Git ambiguity detection inside the approved JT6FWR batch worktree, with no-write regression coverage for nested non-interactive init."
events:
  -
    type: "status"
    at: "2026-05-12T09:53:35.247Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing parent Git ambiguity detection inside the approved JT6FWR batch worktree, with no-write regression coverage for nested non-interactive init."
doc_version: 3
doc_updated_at: "2026-05-12T09:53:35.247Z"
doc_updated_by: "CODER"
description: "Detect parent Git repositories before init writes and fail non-interactive init without an explicit root to avoid accidental nested repositories."
sections:
  Summary: |-
    Block ambiguous nested init roots
    
    Detect parent Git repositories before init writes and fail non-interactive init without an explicit root to avoid accidental nested repositories.
  Scope: |-
    - In scope: Detect parent Git repositories before init writes and fail non-interactive init without an explicit root to avoid accidental nested repositories.
    - Out of scope: unrelated refactors not required for "Block ambiguous nested init roots".
  Plan: "In the JT6FWR batch worktree, add pure parent Git detection before init writes. Non-interactive init from a nested directory without explicit --root must fail with actionable guidance and no writes; explicit --root remains allowed. Verify with focused init test coverage."
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

Block ambiguous nested init roots

Detect parent Git repositories before init writes and fail non-interactive init without an explicit root to avoid accidental nested repositories.

## Scope

- In scope: Detect parent Git repositories before init writes and fail non-interactive init without an explicit root to avoid accidental nested repositories.
- Out of scope: unrelated refactors not required for "Block ambiguous nested init roots".

## Plan

In the JT6FWR batch worktree, add pure parent Git detection before init writes. Non-interactive init from a nested directory without explicit --root must fail with actionable guidance and no writes; explicit --root remains allowed. Verify with focused init test coverage.

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
