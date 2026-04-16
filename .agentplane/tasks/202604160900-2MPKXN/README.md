---
id: "202604160900-2MPKXN"
title: "Audit remaining local and remote branches"
status: "DOING"
priority: "med"
owner: "INTEGRATOR"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-16T09:00:59.779Z"
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
    author: "INTEGRATOR"
    body: "Start: auditing the remaining local and remote task branches, reconciling merged-but-unclosed task lifecycles, and deleting only refs that no longer carry unique work beyond main."
events:
  -
    type: "status"
    at: "2026-04-16T09:01:00.932Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: auditing the remaining local and remote task branches, reconciling merged-but-unclosed task lifecycles, and deleting only refs that no longer carry unique work beyond main."
doc_version: 3
doc_updated_at: "2026-04-16T09:01:00.944Z"
doc_updated_by: "INTEGRATOR"
description: "Classify the remaining local task/backup branches and remote task/task-close refs, integrate any still-relevant work through the canonical branch_pr route, and remove branches that are stale or already represented on main."
sections:
  Summary: |-
    Audit remaining local and remote branches

    Classify the remaining local task/backup branches and remote task/task-close refs, integrate any still-relevant work through the canonical branch_pr route, and remove branches that are stale or already represented on main.
  Scope: |-
    - In scope: Classify the remaining local task/backup branches and remote task/task-close refs, integrate any still-relevant work through the canonical branch_pr route, and remove branches that are stale or already represented on main.
    - Out of scope: unrelated refactors not required for "Audit remaining local and remote branches".
  Plan: |-
    1. Classify remaining local and remote task-related branches into: already represented on main, merged-but-unclosed, still-open work, or backup-only. -> verify: each remaining branch has an explicit disposition and linked task/PR state
    2. Reconcile merged-but-unclosed tasks through the canonical protected-main closure path, then remove stale local and remote refs that no longer carry unique work. -> verify: reconciled tasks become DONE and associated task/task-close refs disappear after prune
    3. Preserve or explicitly archive any branch that still carries unique work not yet represented on main, and remove abandoned empty shells. -> verify: no deleted branch still has unreconciled unique diff against main without an explicit recorded decision
  Verify Steps: |-
    1. Review the requested outcome for "Audit remaining local and remote branches". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Audit remaining local and remote branches

Classify the remaining local task/backup branches and remote task/task-close refs, integrate any still-relevant work through the canonical branch_pr route, and remove branches that are stale or already represented on main.

## Scope

- In scope: Classify the remaining local task/backup branches and remote task/task-close refs, integrate any still-relevant work through the canonical branch_pr route, and remove branches that are stale or already represented on main.
- Out of scope: unrelated refactors not required for "Audit remaining local and remote branches".

## Plan

1. Classify remaining local and remote task-related branches into: already represented on main, merged-but-unclosed, still-open work, or backup-only. -> verify: each remaining branch has an explicit disposition and linked task/PR state
2. Reconcile merged-but-unclosed tasks through the canonical protected-main closure path, then remove stale local and remote refs that no longer carry unique work. -> verify: reconciled tasks become DONE and associated task/task-close refs disappear after prune
3. Preserve or explicitly archive any branch that still carries unique work not yet represented on main, and remove abandoned empty shells. -> verify: no deleted branch still has unreconciled unique diff against main without an explicit recorded decision

## Verify Steps

1. Review the requested outcome for "Audit remaining local and remote branches". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
