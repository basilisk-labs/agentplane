---
id: "202607280606-PTG9C7"
title: "Prevent self-invalidating side-effect authority records"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "authority"
  - "branch-pr"
  - "lifecycle"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
blueprint_request: "code.branch_pr"
verify:
  - "Focused authority lifecycle regression"
  - "bun run typecheck"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T06:15:21.657Z"
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
    body: "Start: reproduce the self-invalidating authority transition, then implement the smallest fail-closed lifecycle fix with focused regressions."
  -
    author: "CODER"
    body: "Start: implement the branch-snapshot consistency regression and minimal preparation fix."
events:
  -
    type: "status"
    at: "2026-07-28T06:07:13.202Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the self-invalidating authority transition, then implement the smallest fail-closed lifecycle fix with focused regressions."
  -
    type: "status"
    at: "2026-07-28T06:15:22.225Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: implement the branch-snapshot consistency regression and minimal preparation fix."
doc_version: 3
doc_updated_at: "2026-07-28T06:15:22.225Z"
doc_updated_by: "CODER"
description: "Fix the branch_pr lifecycle defect where a task authority grant changes the task revision/state fingerprint and makes the freshly recorded authority invalid before the required pre-merge closure or route refresh can execute. Preserve fail-closed authorization and support the documented grant -> clean commit -> recompute route path without manual GitHub merge."
sections:
  Summary: |-
    Prevent self-invalidating side-effect authority records

    Fix the branch_pr lifecycle defect where a task authority grant changes the task revision/state fingerprint and makes the freshly recorded authority invalid before the required pre-merge closure or route refresh can execute. Preserve fail-closed authorization and support the documented grant -> clean commit -> recompute route path without manual GitHub merge.
  Scope: |-
    - In scope: Fix the branch_pr lifecycle defect where a task authority grant changes the task revision/state fingerprint and makes the freshly recorded authority invalid before the required pre-merge closure or route refresh can execute. Preserve fail-closed authorization and support the documented grant -> clean commit -> recompute route path without manual GitHub merge.
    - Out of scope: unrelated refactors not required for "Prevent self-invalidating side-effect authority records".
  Plan: "Align branch_pr AgentWorkOrder preparation with the same task branch snapshot used by route resolution. Prevent a base-checkout task next-action or task brief from combining a stale local task revision with a newer route fingerprint. Preserve fail-closed side-effect authority semantics; do not weaken authority validation. Add a regression where the task worktree has a newer task revision than main and preparation from main succeeds with matching work-order task and fingerprint revisions."
  Verify Steps: "1. Add a regression for branch_pr: update the task in its task worktree, commit it, then invoke task next-action from main. Expected: the work-order task revision equals state_fingerprint.task_revision and the command returns JSON rather than schema validation error. 2. Run the focused AgentWorkOrder integration test and side-effect authority tests. Expected: both pass, including fail-closed negative authority cases. 3. Run bun run typecheck and node .agentplane/policy/check-routing.mjs. Expected: both pass. 4. Re-run task next-action for supervisor task 202607242236-1BFWEY from its integration/base context. Expected: no AgentWorkOrder task revision mismatch."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "08dd47769434fc336d23a80d2d47f4fb0a265d74"
    version: 1
id_source: "generated"
---
## Summary

Prevent self-invalidating side-effect authority records

Fix the branch_pr lifecycle defect where a task authority grant changes the task revision/state fingerprint and makes the freshly recorded authority invalid before the required pre-merge closure or route refresh can execute. Preserve fail-closed authorization and support the documented grant -> clean commit -> recompute route path without manual GitHub merge.

## Scope

- In scope: Fix the branch_pr lifecycle defect where a task authority grant changes the task revision/state fingerprint and makes the freshly recorded authority invalid before the required pre-merge closure or route refresh can execute. Preserve fail-closed authorization and support the documented grant -> clean commit -> recompute route path without manual GitHub merge.
- Out of scope: unrelated refactors not required for "Prevent self-invalidating side-effect authority records".

## Plan

Align branch_pr AgentWorkOrder preparation with the same task branch snapshot used by route resolution. Prevent a base-checkout task next-action or task brief from combining a stale local task revision with a newer route fingerprint. Preserve fail-closed side-effect authority semantics; do not weaken authority validation. Add a regression where the task worktree has a newer task revision than main and preparation from main succeeds with matching work-order task and fingerprint revisions.

## Verify Steps

1. Add a regression for branch_pr: update the task in its task worktree, commit it, then invoke task next-action from main. Expected: the work-order task revision equals state_fingerprint.task_revision and the command returns JSON rather than schema validation error. 2. Run the focused AgentWorkOrder integration test and side-effect authority tests. Expected: both pass, including fail-closed negative authority cases. 3. Run bun run typecheck and node .agentplane/policy/check-routing.mjs. Expected: both pass. 4. Re-run task next-action for supervisor task 202607242236-1BFWEY from its integration/base context. Expected: no AgentWorkOrder task revision mismatch.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
