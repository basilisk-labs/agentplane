---
id: "202607311812-WBY9EK"
title: "Publish resolved DONE conflict heads before semantic rework gating"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow.routing"
verify:
  - "Critical CLI suite and typecheck pass."
  - "Focused conflict-rework and route projection tests pass."
plan_approval:
  state: "approved"
  updated_at: "2026-07-31T18:12:29.998Z"
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
    at: "2026-07-31T18:13:29.425Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-31T18:13:29.425Z"
doc_updated_by: "CODER"
description: "When a verified DONE task has a clean local branch that strictly fast-forwards the stale conflicting provider head, route guarded non-force publication before requiring semantic conflict queue or handoff evidence; preserve fail-closed behavior for divergence, dirty worktrees, unverified tasks, and still-conflicting aligned heads."
sections:
  Summary: |-
    Publish resolved DONE conflict heads before semantic rework gating

    When a verified DONE task has a clean local branch that strictly fast-forwards the stale conflicting provider head, route guarded non-force publication before requiring semantic conflict queue or handoff evidence; preserve fail-closed behavior for divergence, dirty worktrees, unverified tasks, and still-conflicting aligned heads.
  Scope: |-
    - In scope: When a verified DONE task has a clean local branch that strictly fast-forwards the stale conflicting provider head, route guarded non-force publication before requiring semantic conflict queue or handoff evidence; preserve fail-closed behavior for divergence, dirty worktrees, unverified tasks, and still-conflicting aligned heads.
    - Out of scope: unrelated refactors not required for "Publish resolved DONE conflict heads before semantic rework gating".
  Plan: "1. Reproduce the verified DONE/no-queue stale provider conflict where the clean local head strictly fast-forwards the provider head. 2. Move only guarded fast-forward publication ahead of semantic route eligibility while retaining verification/status, protected-base, clean-worktree, branch identity, and ancestry checks. 3. Add unit and CLI route regressions for the resolved-conflict closeout path plus fail-closed divergent/unverified cases. 4. Run focused route tests, typecheck, and critical CLI checks; record independent verification and evaluator evidence. 5. Merge the repair, then resume CT2725 publication from live provider truth."
  Verify Steps: |-
    PLANNER fallback scaffold for "Publish resolved DONE conflict heads before semantic rework gating". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Publish resolved DONE conflict heads before semantic rework gating". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    start_head_sha: "9eb65c88341f2495a0a1f11865eb38c4978b2ef3"
    version: 1
id_source: "generated"
---
## Summary

Publish resolved DONE conflict heads before semantic rework gating

When a verified DONE task has a clean local branch that strictly fast-forwards the stale conflicting provider head, route guarded non-force publication before requiring semantic conflict queue or handoff evidence; preserve fail-closed behavior for divergence, dirty worktrees, unverified tasks, and still-conflicting aligned heads.

## Scope

- In scope: When a verified DONE task has a clean local branch that strictly fast-forwards the stale conflicting provider head, route guarded non-force publication before requiring semantic conflict queue or handoff evidence; preserve fail-closed behavior for divergence, dirty worktrees, unverified tasks, and still-conflicting aligned heads.
- Out of scope: unrelated refactors not required for "Publish resolved DONE conflict heads before semantic rework gating".

## Plan

1. Reproduce the verified DONE/no-queue stale provider conflict where the clean local head strictly fast-forwards the provider head. 2. Move only guarded fast-forward publication ahead of semantic route eligibility while retaining verification/status, protected-base, clean-worktree, branch identity, and ancestry checks. 3. Add unit and CLI route regressions for the resolved-conflict closeout path plus fail-closed divergent/unverified cases. 4. Run focused route tests, typecheck, and critical CLI checks; record independent verification and evaluator evidence. 5. Merge the repair, then resume CT2725 publication from live provider truth.

## Verify Steps

PLANNER fallback scaffold for "Publish resolved DONE conflict heads before semantic rework gating". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Publish resolved DONE conflict heads before semantic rework gating". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
