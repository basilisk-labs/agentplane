---
id: "202608021232-MT4FK2"
title: "Audit and remove obsolete AgentPlane branches before v0.7.1"
status: "TODO"
priority: "med"
owner: "INTEGRATOR"
revision: 1
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-08-02T12:32:26.257Z"
doc_updated_by: "INTEGRATOR"
description: "Classify local and remote branches by merged state, unique commits, active worktrees, open pull requests, and release relevance; preserve recoverable evidence; then remove branches confirmed unnecessary, including agentplane-loops, without deleting active or unmerged work."
sections:
  Summary: |-
    Audit and remove obsolete AgentPlane branches before v0.7.1

    Classify local and remote branches by merged state, unique commits, active worktrees, open pull requests, and release relevance; preserve recoverable evidence; then remove branches confirmed unnecessary, including agentplane-loops, without deleting active or unmerged work.
  Scope: |-
    - In scope: Classify local and remote branches by merged state, unique commits, active worktrees, open pull requests, and release relevance; preserve recoverable evidence; then remove branches confirmed unnecessary, including agentplane-loops, without deleting active or unmerged work.
    - Out of scope: unrelated refactors not required for "Audit and remove obsolete AgentPlane branches before v0.7.1".
  Plan: |-
    1. Implement the change for "Audit and remove obsolete AgentPlane branches before v0.7.1".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
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
id_source: "generated"
---
## Summary

Audit and remove obsolete AgentPlane branches before v0.7.1

Classify local and remote branches by merged state, unique commits, active worktrees, open pull requests, and release relevance; preserve recoverable evidence; then remove branches confirmed unnecessary, including agentplane-loops, without deleting active or unmerged work.

## Scope

- In scope: Classify local and remote branches by merged state, unique commits, active worktrees, open pull requests, and release relevance; preserve recoverable evidence; then remove branches confirmed unnecessary, including agentplane-loops, without deleting active or unmerged work.
- Out of scope: unrelated refactors not required for "Audit and remove obsolete AgentPlane branches before v0.7.1".

## Plan

1. Implement the change for "Audit and remove obsolete AgentPlane branches before v0.7.1".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

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
