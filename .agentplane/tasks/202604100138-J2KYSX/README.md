---
id: "202604100138-J2KYSX"
title: "Make pr open explain unpushed task branches before remote create"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-10T01:39:33.808Z"
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
    body: "Start: reproduce the branch_pr pr open remote-create failure for an unpushed task branch, make the operator-facing outcome explicit, and cover it with focused CLI tests."
events:
  -
    type: "status"
    at: "2026-04-10T01:39:55.485Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the branch_pr pr open remote-create failure for an unpushed task branch, make the operator-facing outcome explicit, and cover it with focused CLI tests."
doc_version: 3
doc_updated_at: "2026-04-10T01:39:55.491Z"
doc_updated_by: "CODER"
description: "When branch_pr pr open runs before the task branch exists on origin, GitHub returns a validation failure and the command collapses it into a generic staged/failed message. Detect the missing remote head case and print an explicit actionable outcome instead of a misleading partial-success summary."
sections:
  Summary: |-
    Make pr open explain unpushed task branches before remote create
    
    When branch_pr pr open runs before the task branch exists on origin, GitHub returns a validation failure and the command collapses it into a generic staged/failed message. Detect the missing remote head case and print an explicit actionable outcome instead of a misleading partial-success summary.
  Scope: |-
    - In scope: When branch_pr pr open runs before the task branch exists on origin, GitHub returns a validation failure and the command collapses it into a generic staged/failed message. Detect the missing remote head case and print an explicit actionable outcome instead of a misleading partial-success summary.
    - Out of scope: unrelated refactors not required for "Make pr open explain unpushed task branches before remote create".
  Plan: "1. Inspect the branch_pr pr open remote-create path and isolate the exact branch-not-on-origin failure mode. 2. Add a deterministic staged outcome that explicitly names the missing remote head and tells the operator to push the branch before rerunning remote creation. 3. Cover the new branch-not-published case with targeted CLI tests and re-run the touched pr open test slice plus eslint."
  Verify Steps: |-
    1. Run the targeted `pr open` CLI test coverage for the new unpushed-branch scenario and the existing remote-create/sync-only cases. Expected: the new scenario reports an explicit actionable staged outcome, while existing staged/create/link behavior stays green.
    2. Run the touched lint/test slice for the modified command files. Expected: the updated `pr open` implementation and tests pass without new lint failures.
    3. Inspect operator-facing output for the unpushed-branch path. Expected: it explicitly says the task branch is not yet published on `origin` and tells the operator to push before rerunning remote creation.
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

Make pr open explain unpushed task branches before remote create

When branch_pr pr open runs before the task branch exists on origin, GitHub returns a validation failure and the command collapses it into a generic staged/failed message. Detect the missing remote head case and print an explicit actionable outcome instead of a misleading partial-success summary.

## Scope

- In scope: When branch_pr pr open runs before the task branch exists on origin, GitHub returns a validation failure and the command collapses it into a generic staged/failed message. Detect the missing remote head case and print an explicit actionable outcome instead of a misleading partial-success summary.
- Out of scope: unrelated refactors not required for "Make pr open explain unpushed task branches before remote create".

## Plan

1. Inspect the branch_pr pr open remote-create path and isolate the exact branch-not-on-origin failure mode. 2. Add a deterministic staged outcome that explicitly names the missing remote head and tells the operator to push the branch before rerunning remote creation. 3. Cover the new branch-not-published case with targeted CLI tests and re-run the touched pr open test slice plus eslint.

## Verify Steps

1. Run the targeted `pr open` CLI test coverage for the new unpushed-branch scenario and the existing remote-create/sync-only cases. Expected: the new scenario reports an explicit actionable staged outcome, while existing staged/create/link behavior stays green.
2. Run the touched lint/test slice for the modified command files. Expected: the updated `pr open` implementation and tests pass without new lint failures.
3. Inspect operator-facing output for the unpushed-branch path. Expected: it explicitly says the task branch is not yet published on `origin` and tells the operator to push before rerunning remote creation.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
