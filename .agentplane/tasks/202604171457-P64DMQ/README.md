---
id: "202604171457-P64DMQ"
title: "Repair DONE branch_pr artifact reconciliation after head-branch deletion"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T14:58:06.285Z"
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
    body: "Start: repair branch_pr merge reconciliation for DONE tasks whose merged PR head branches were already deleted, then reconcile the stale archive tasks and clear doctor."
events:
  -
    type: "status"
    at: "2026-04-17T14:58:31.904Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair branch_pr merge reconciliation for DONE tasks whose merged PR head branches were already deleted, then reconcile the stale archive tasks and clear doctor."
doc_version: 3
doc_updated_at: "2026-04-17T14:58:31.911Z"
doc_updated_by: "CODER"
description: "Make branch_pr normalization and doctor stop flagging shipped DONE tasks when the GitHub PR is merged but the head branch has already been deleted, and reconcile the three stale archive tasks."
sections:
  Summary: |-
    Repair DONE branch_pr artifact reconciliation after head-branch deletion
    
    Make branch_pr normalization and doctor stop flagging shipped DONE tasks when the GitHub PR is merged but the head branch has already been deleted, and reconcile the three stale archive tasks.
  Scope: |-
    - In scope: Make branch_pr normalization and doctor stop flagging shipped DONE tasks when the GitHub PR is merged but the head branch has already been deleted, and reconcile the three stale archive tasks.
    - Out of scope: unrelated refactors not required for "Repair DONE branch_pr artifact reconciliation after head-branch deletion".
  Plan: "1. Reproduce why doctor still flags DONE branch_pr tasks after merged PR branches were deleted. 2. Update branch_pr merge reconciliation to resolve merged PRs from stable task-local evidence when head-branch lookup returns empty, and cover the deleted-head case in tests. 3. Run focused validation, reconcile the three stale tasks, and verify doctor is clean."
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

Repair DONE branch_pr artifact reconciliation after head-branch deletion

Make branch_pr normalization and doctor stop flagging shipped DONE tasks when the GitHub PR is merged but the head branch has already been deleted, and reconcile the three stale archive tasks.

## Scope

- In scope: Make branch_pr normalization and doctor stop flagging shipped DONE tasks when the GitHub PR is merged but the head branch has already been deleted, and reconcile the three stale archive tasks.
- Out of scope: unrelated refactors not required for "Repair DONE branch_pr artifact reconciliation after head-branch deletion".

## Plan

1. Reproduce why doctor still flags DONE branch_pr tasks after merged PR branches were deleted. 2. Update branch_pr merge reconciliation to resolve merged PRs from stable task-local evidence when head-branch lookup returns empty, and cover the deleted-head case in tests. 3. Run focused validation, reconcile the three stale tasks, and verify doctor is clean.

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
