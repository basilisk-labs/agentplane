---
id: "202608022236-AWTDJ9"
title: "Preserve verification freshness after rebase merge"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "routing"
  - "v0.7.1"
  - "verification"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T22:36:50.938Z"
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
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-02T22:37:28.364Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-02T22:37:28.364Z"
doc_updated_by: "CODER"
description: "Fix the branch_pr route oracle so a DONE task remains terminal after GitHub rebase-merge and hosted close, while still invalidating verification for new semantic commits on an active task branch."
sections:
  Summary: |-
    Preserve verification freshness after rebase merge

    Fix the branch_pr route oracle so a DONE task remains terminal after GitHub rebase-merge and hosted close, while still invalidating verification for new semantic commits on an active task branch.
  Scope: |-
    - In scope: Fix the branch_pr route oracle so a DONE task remains terminal after GitHub rebase-merge and hosted close, while still invalidating verification for new semantic commits on an active task branch.
    - Out of scope: unrelated refactors not required for "Preserve verification freshness after rebase merge".
  Plan: "1. Add a regression fixture for a DONE branch_pr task after GitHub rebase-merge and hosted-close sync, where the base HEAD differs from the verified pre-merge task head. 2. Change verification target selection so an available task-branch head remains authoritative for active work, while a missing merged branch falls back to the recorded task implementation/evaluator target before the base checkout head. 3. Prove stale semantic commits still invalidate prior evidence and rerun route, static, hotspot, policy, and critical suites."
  Verify Steps: |-
    1. Run the focused route-verification suites, including a post-rebase-merge/hosted-close fixture. Expected: the merged DONE task has no verification_required blocker, while a later semantic task-branch commit still produces verification_required.
    2. Run typecheck, lint:core, knip:check, hotspots:check, and the policy routing check. Expected: all gates pass without baseline growth.
    3. Run test:critical. Expected: all critical CLI chunks pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "05423cade6f22a75b10a70cdbf7809d0c501377b"
    version: 1
id_source: "generated"
---
## Summary

Preserve verification freshness after rebase merge

Fix the branch_pr route oracle so a DONE task remains terminal after GitHub rebase-merge and hosted close, while still invalidating verification for new semantic commits on an active task branch.

## Scope

- In scope: Fix the branch_pr route oracle so a DONE task remains terminal after GitHub rebase-merge and hosted close, while still invalidating verification for new semantic commits on an active task branch.
- Out of scope: unrelated refactors not required for "Preserve verification freshness after rebase merge".

## Plan

1. Add a regression fixture for a DONE branch_pr task after GitHub rebase-merge and hosted-close sync, where the base HEAD differs from the verified pre-merge task head. 2. Change verification target selection so an available task-branch head remains authoritative for active work, while a missing merged branch falls back to the recorded task implementation/evaluator target before the base checkout head. 3. Prove stale semantic commits still invalidate prior evidence and rerun route, static, hotspot, policy, and critical suites.

## Verify Steps

1. Run the focused route-verification suites, including a post-rebase-merge/hosted-close fixture. Expected: the merged DONE task has no verification_required blocker, while a later semantic task-branch commit still produces verification_required.
2. Run typecheck, lint:core, knip:check, hotspots:check, and the policy routing check. Expected: all gates pass without baseline growth.
3. Run test:critical. Expected: all critical CLI chunks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
