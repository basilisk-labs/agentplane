---
id: "202604100213-MVAGSD"
title: "Fail integrate before merging when task PR artifacts are missing"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-10T02:14:27.363Z"
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
    body: "Start: reproduce integrate with missing committed task PR artifacts, move artifact validation ahead of merge-side mutation, and cover the guard with focused integration tests."
events:
  -
    type: "status"
    at: "2026-04-10T02:15:08.450Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce integrate with missing committed task PR artifacts, move artifact validation ahead of merge-side mutation, and cover the guard with focused integration tests."
doc_version: 3
doc_updated_at: "2026-04-10T02:15:08.456Z"
doc_updated_by: "CODER"
description: "Integrate currently can apply task code onto the base branch and only then discover that the task branch never committed .agentplane/tasks/<task-id>/pr artifacts. Validate the branch-backed task/PR artifact set before any merge-side mutation so base never advances when closeout metadata is absent."
sections:
  Summary: |-
    Fail integrate before merging when task PR artifacts are missing
    
    Integrate currently can apply task code onto the base branch and only then discover that the task branch never committed .agentplane/tasks/<task-id>/pr artifacts. Validate the branch-backed task/PR artifact set before any merge-side mutation so base never advances when closeout metadata is absent.
  Scope: |-
    - In scope: Integrate currently can apply task code onto the base branch and only then discover that the task branch never committed .agentplane/tasks/<task-id>/pr artifacts. Validate the branch-backed task/PR artifact set before any merge-side mutation so base never advances when closeout metadata is absent.
    - Out of scope: unrelated refactors not required for "Fail integrate before merging when task PR artifacts are missing".
  Plan: "1. Reproduce integrate against a task branch that is missing committed .agentplane/tasks/<task-id>/pr artifacts and confirm where the base branch mutates before validation completes. 2. Move the branch-backed task/PR artifact validation ahead of any merge-side mutation so integrate fails fast with an actionable error when closeout metadata is absent. 3. Add focused regression coverage proving the base branch head stays unchanged on the missing-artifact path, then rerun the touched test/lint slice."
  Verify Steps: |-
    1. Run focused integrate regression coverage for the missing task PR artifact path. Expected: integrate exits before any base-branch merge-side mutation and reports the missing branch-backed artifacts explicitly.
    2. Run the touched lint/test slice for the integrate validation path. Expected: the new pre-merge guard stays green with no new lint failures.
    3. Inspect the operator-facing error for the missing artifact case. Expected: it names the missing `.agentplane/tasks/<task-id>/pr` artifact set and points at the task branch as the source to fix.
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

Fail integrate before merging when task PR artifacts are missing

Integrate currently can apply task code onto the base branch and only then discover that the task branch never committed .agentplane/tasks/<task-id>/pr artifacts. Validate the branch-backed task/PR artifact set before any merge-side mutation so base never advances when closeout metadata is absent.

## Scope

- In scope: Integrate currently can apply task code onto the base branch and only then discover that the task branch never committed .agentplane/tasks/<task-id>/pr artifacts. Validate the branch-backed task/PR artifact set before any merge-side mutation so base never advances when closeout metadata is absent.
- Out of scope: unrelated refactors not required for "Fail integrate before merging when task PR artifacts are missing".

## Plan

1. Reproduce integrate against a task branch that is missing committed .agentplane/tasks/<task-id>/pr artifacts and confirm where the base branch mutates before validation completes. 2. Move the branch-backed task/PR artifact validation ahead of any merge-side mutation so integrate fails fast with an actionable error when closeout metadata is absent. 3. Add focused regression coverage proving the base branch head stays unchanged on the missing-artifact path, then rerun the touched test/lint slice.

## Verify Steps

1. Run focused integrate regression coverage for the missing task PR artifact path. Expected: integrate exits before any base-branch merge-side mutation and reports the missing branch-backed artifacts explicitly.
2. Run the touched lint/test slice for the integrate validation path. Expected: the new pre-merge guard stays green with no new lint failures.
3. Inspect the operator-facing error for the missing artifact case. Expected: it names the missing `.agentplane/tasks/<task-id>/pr` artifact set and points at the task branch as the source to fix.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
