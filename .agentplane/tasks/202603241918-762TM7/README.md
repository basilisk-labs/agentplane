---
id: "202603241918-762TM7"
title: "Workflow: switch repository default mode from direct to branch_pr"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "config"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T19:52:48.972Z"
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
    body: "Start: switch the repository default workflow_mode to branch_pr, then verify the installed CLI and policy routing both see the new mode before moving on to the remaining workflow tasks."
events:
  -
    type: "status"
    at: "2026-03-24T19:50:50.973Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: switch the repository default workflow_mode to branch_pr, then verify the installed CLI and policy routing both see the new mode before moving on to the remaining workflow tasks."
doc_version: 3
doc_updated_at: "2026-03-24T19:52:48.353Z"
doc_updated_by: "ORCHESTRATOR"
description: "Change the repository workflow configuration so normal task execution targets branch_pr instead of direct main pushes, matching the requirement that remote required checks must pass before main is updated."
sections:
  Summary: |-
    Workflow: switch repository default mode from direct to branch_pr
    
    Change the repository workflow configuration so normal task execution targets branch_pr instead of direct main pushes, matching the requirement that remote required checks must pass before main is updated.
  Scope: |-
    - In scope: switch the repo-local workflow default to branch_pr and pin the base branch needed for branch_pr command resolution.
    - Out of scope: workflow documentation, PR operating guide text, and GitHub-side bypass settings; those stay in dependent tasks.
  Plan: |-
    1. Update the repo-local workflow configuration so workflow_mode defaults to branch_pr.
    2. Pin the repository base branch to main so branch_pr commands can resolve the integration target deterministically.
    3. Verify the installed CLI reads branch_pr plus the pinned base branch and that policy routing still passes.
  Verify Steps: |-
    1. Run agentplane config show. Expected: workflow_mode is branch_pr.
    2. Run agentplane branch base get. Expected: the pinned base branch is main.
    3. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing still passes after the repo-default switch.
    4. Review .agentplane/config.json and git config state. Expected: the workflow switch and pinned base branch are the only semantic prerequisites introduced for branch_pr execution.
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

Workflow: switch repository default mode from direct to branch_pr

Change the repository workflow configuration so normal task execution targets branch_pr instead of direct main pushes, matching the requirement that remote required checks must pass before main is updated.

## Scope

- In scope: switch the repo-local workflow default to branch_pr and pin the base branch needed for branch_pr command resolution.
- Out of scope: workflow documentation, PR operating guide text, and GitHub-side bypass settings; those stay in dependent tasks.

## Plan

1. Update the repo-local workflow configuration so workflow_mode defaults to branch_pr.
2. Pin the repository base branch to main so branch_pr commands can resolve the integration target deterministically.
3. Verify the installed CLI reads branch_pr plus the pinned base branch and that policy routing still passes.

## Verify Steps

1. Run agentplane config show. Expected: workflow_mode is branch_pr.
2. Run agentplane branch base get. Expected: the pinned base branch is main.
3. Run node .agentplane/policy/check-routing.mjs. Expected: policy routing still passes after the repo-default switch.
4. Review .agentplane/config.json and git config state. Expected: the workflow switch and pinned base branch are the only semantic prerequisites introduced for branch_pr execution.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
