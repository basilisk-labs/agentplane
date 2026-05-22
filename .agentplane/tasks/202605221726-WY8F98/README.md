---
id: "202605221726-WY8F98"
title: "Batch close-tail evidence for related tasks"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify:
  - "Confirm duplicate close-tail PRs are not opened for sibling tasks in the batch."
  - "Confirm each included task receives independent finish evidence."
  - "Run hosted-close and hosted-close-pr tests for multi-task batch closure."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:26:50.678Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-22T17:27:53.051Z"
doc_updated_by: "PLANNER"
description: "Allow one hosted close-tail PR to close a verified related task batch while preserving per-task verification and finish evidence."
sections:
  Summary: |-
    Batch close-tail evidence for related tasks

    Allow one hosted close-tail PR to close a verified related task batch while preserving per-task verification and finish evidence.
  Scope: |-
    - In scope: Allow one hosted close-tail PR to close a verified related task batch while preserving per-task verification and finish evidence.
    - Out of scope: unrelated refactors not required for "Batch close-tail evidence for related tasks".
  Plan: "Optimize branch_pr close-tail for approved related batches. The implementation PR should be able to produce one evidence-only close-tail PR that records every included task, avoids duplicate close PRs, and keeps per-task verification/final result records intact."
  Verify Steps: |-
    1. Run hosted-close and hosted-close-pr tests for multi-task batch closure.
    2. Confirm each included task receives independent finish evidence.
    3. Confirm duplicate close-tail PRs are not opened for sibling tasks in the batch.
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

Batch close-tail evidence for related tasks

Allow one hosted close-tail PR to close a verified related task batch while preserving per-task verification and finish evidence.

## Scope

- In scope: Allow one hosted close-tail PR to close a verified related task batch while preserving per-task verification and finish evidence.
- Out of scope: unrelated refactors not required for "Batch close-tail evidence for related tasks".

## Plan

Optimize branch_pr close-tail for approved related batches. The implementation PR should be able to produce one evidence-only close-tail PR that records every included task, avoids duplicate close PRs, and keeps per-task verification/final result records intact.

## Verify Steps

1. Run hosted-close and hosted-close-pr tests for multi-task batch closure.
2. Confirm each included task receives independent finish evidence.
3. Confirm duplicate close-tail PRs are not opened for sibling tasks in the batch.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
