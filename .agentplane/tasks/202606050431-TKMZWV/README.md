---
id: "202606050431-TKMZWV"
title: "Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-only commits"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "github-issue"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-05T04:32:22.916Z"
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
    body: "Start: investigating upstream issue #4451 in the dedicated branch_pr worktree and preparing the bounded Codex runner handoff."
events:
  -
    type: "status"
    at: "2026-06-05T04:33:32.696Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: investigating upstream issue #4451 in the dedicated branch_pr worktree and preparing the bounded Codex runner handoff."
doc_version: 3
doc_updated_at: "2026-06-05T04:33:32.696Z"
doc_updated_by: "CODER"
description: "Resolve https://github.com/basilisk-labs/agentplane/issues/4451"
sections:
  Summary: |-
    Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-only commits

    Resolve https://github.com/basilisk-labs/agentplane/issues/4451
  Scope: |-
    - In scope: Resolve https://github.com/basilisk-labs/agentplane/issues/4451.
    - Out of scope: unrelated refactors not required for "Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-only commits".
  Plan: |-
    1. Reproduce the stale `quality_review.evaluated_sha` closeout loop described in upstream issue #4451 and identify which finish/task-complete validation still binds to outdated evaluation state after task-artifact-only commits.
    2. Implement the smallest route-safe fix so artifact-only follow-up commits do not force a fresh evaluator run when prior evaluation evidence is still valid for the task closeout path.
    3. Verify with targeted reproduction coverage and the required policy checks, then prepare branch/PR evidence and upstream closeout notes only if the fix is validated.
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-only commits". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-only commits". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-only commits

Resolve https://github.com/basilisk-labs/agentplane/issues/4451

## Scope

- In scope: Resolve https://github.com/basilisk-labs/agentplane/issues/4451.
- Out of scope: unrelated refactors not required for "Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-only commits".

## Plan

1. Reproduce the stale `quality_review.evaluated_sha` closeout loop described in upstream issue #4451 and identify which finish/task-complete validation still binds to outdated evaluation state after task-artifact-only commits.
2. Implement the smallest route-safe fix so artifact-only follow-up commits do not force a fresh evaluator run when prior evaluation evidence is still valid for the task closeout path.
3. Verify with targeted reproduction coverage and the required policy checks, then prepare branch/PR evidence and upstream closeout notes only if the fix is validated.

## Verify Steps

PLANNER fallback scaffold for "Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-only commits". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-only commits". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
