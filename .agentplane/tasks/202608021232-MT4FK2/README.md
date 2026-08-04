---
id: "202608021232-MT4FK2"
title: "Audit and remove obsolete AgentPlane branches before v0.7.1"
status: "DOING"
priority: "med"
owner: "INTEGRATOR"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-cleanup"
  - "v0.7.1"
task_kind: "ops"
mutation_scope: "ops"
risk_flags:
  - "external_system"
  - "network"
blueprint_request: "ops.approval"
verify:
  - "git branch --merged main"
  - "git branch -r --merged origin/main"
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T05:09:43.805Z"
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
    author: "INTEGRATOR"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-04T05:09:57.696Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-04T05:09:57.696Z"
doc_updated_by: "INTEGRATOR"
description: "Classify local and remote branches by merged state, unique commits, active worktrees, open pull requests, and release relevance; preserve recoverable evidence; then remove branches confirmed unnecessary, including agentplane-loops, without deleting active or unmerged work."
sections:
  Summary: |-
    Audit and remove obsolete AgentPlane branches before v0.7.1

    Classify local and remote branches by merged state, unique commits, active worktrees, open pull requests, and release relevance; preserve recoverable evidence; then remove branches confirmed unnecessary, including agentplane-loops, without deleting active or unmerged work.
  Scope: |-
    - In scope: Classify local and remote branches by merged state, unique commits, active worktrees, open pull requests, and release relevance; preserve recoverable evidence; then remove branches confirmed unnecessary, including agentplane-loops, without deleting active or unmerged work.
    - Out of scope: unrelated refactors not required for "Audit and remove obsolete AgentPlane branches before v0.7.1".
  Plan: "1. Inventory every local and remote branch/worktree, map each to task state and hosted PR state, and protect active, blocked, dirty, or explicitly retained checkouts. 2. Remove only worktrees and branches whose tasks are DONE and whose hosted changes are merged or otherwise proven obsolete; preserve the protected integration worktree and all stashes. 3. Audit the loops branch separately against main and delete it only after proving its needed changes are already integrated or intentionally superseded. 4. Record exact removed and retained targets plus rollback limits. 5. Verify git worktree integrity, branch inventory, base status, and absence of lost active work."
  Verify Steps: |-
    PLANNER fallback scaffold for "Audit and remove obsolete AgentPlane branches before v0.7.1". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Audit and remove obsolete AgentPlane branches before v0.7.1". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "c411b8c299fffb22e42b05b4ec0cc9b61af8084f"
    version: 1
id_source: "generated"
---
## Summary

Audit and remove obsolete AgentPlane branches before v0.7.1

Classify local and remote branches by merged state, unique commits, active worktrees, open pull requests, and release relevance; preserve recoverable evidence; then remove branches confirmed unnecessary, including agentplane-loops, without deleting active or unmerged work.

## Scope

- In scope: Classify local and remote branches by merged state, unique commits, active worktrees, open pull requests, and release relevance; preserve recoverable evidence; then remove branches confirmed unnecessary, including agentplane-loops, without deleting active or unmerged work.
- Out of scope: unrelated refactors not required for "Audit and remove obsolete AgentPlane branches before v0.7.1".

## Plan

1. Inventory every local and remote branch/worktree, map each to task state and hosted PR state, and protect active, blocked, dirty, or explicitly retained checkouts. 2. Remove only worktrees and branches whose tasks are DONE and whose hosted changes are merged or otherwise proven obsolete; preserve the protected integration worktree and all stashes. 3. Audit the loops branch separately against main and delete it only after proving its needed changes are already integrated or intentionally superseded. 4. Record exact removed and retained targets plus rollback limits. 5. Verify git worktree integrity, branch inventory, base status, and absence of lost active work.

## Verify Steps

PLANNER fallback scaffold for "Audit and remove obsolete AgentPlane branches before v0.7.1". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Audit and remove obsolete AgentPlane branches before v0.7.1". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
