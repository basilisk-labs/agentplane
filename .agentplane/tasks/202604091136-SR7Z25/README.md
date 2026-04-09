---
id: "202604091136-SR7Z25"
title: "Make fresh branch_pr worktrees runnable without manual bootstrap"
result_summary: "integrate: squash task/202604091136-SR7Z25/runnable-worktree-default"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T11:36:40.270Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "542cbf5b96e2c91cd2eaf0dcde8d05305fdf5d47"
  message: "🧩 SR7Z25 workflow: seed repo-local runtime into fresh branch_pr worktrees"
comments:
  -
    author: "CODER"
    body: "Start: make fresh branch_pr worktrees runnable by default using the existing bootstrap/reuse path while keeping base-checkout mutations controlled."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604091136-SR7Z25/pr."
events:
  -
    type: "status"
    at: "2026-04-09T11:37:00.527Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make fresh branch_pr worktrees runnable by default using the existing bootstrap/reuse path while keeping base-checkout mutations controlled."
  -
    type: "status"
    at: "2026-04-09T12:05:17.447Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604091136-SR7Z25/pr."
doc_version: 3
doc_updated_at: "2026-04-09T12:05:17.450Z"
doc_updated_by: "INTEGRATOR"
description: "Ensure new branch_pr worktrees can run core agentplane commands without requiring a manual framework bootstrap or global override immediately after work start."
sections:
  Summary: |-
    Make fresh branch_pr worktrees runnable without manual bootstrap
    
    Ensure new branch_pr worktrees can run core agentplane commands without requiring a manual framework bootstrap or global override immediately after work start.
  Scope: |-
    - In scope: Ensure new branch_pr worktrees can run core agentplane commands without requiring a manual framework bootstrap or global override immediately after work start.
    - Out of scope: unrelated refactors not required for "Make fresh branch_pr worktrees runnable without manual bootstrap".
  Plan: "1. Reproduce the fresh branch_pr worktree runtime failure in tests. 2. Make new worktrees runnable by default using the existing framework bootstrap/reuse path, without mutating the base checkout unexpectedly. 3. Re-run targeted worktree/runtime tests."
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. <Action>. Expected: <observable result>.
    2. <Action>. Expected: <observable result>.
    3. <Action>. Expected: <observable result>.
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

Make fresh branch_pr worktrees runnable without manual bootstrap

Ensure new branch_pr worktrees can run core agentplane commands without requiring a manual framework bootstrap or global override immediately after work start.

## Scope

- In scope: Ensure new branch_pr worktrees can run core agentplane commands without requiring a manual framework bootstrap or global override immediately after work start.
- Out of scope: unrelated refactors not required for "Make fresh branch_pr worktrees runnable without manual bootstrap".

## Plan

1. Reproduce the fresh branch_pr worktree runtime failure in tests. 2. Make new worktrees runnable by default using the existing framework bootstrap/reuse path, without mutating the base checkout unexpectedly. 3. Re-run targeted worktree/runtime tests.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
