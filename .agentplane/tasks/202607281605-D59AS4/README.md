---
id: "202607281605-D59AS4"
title: "Recover completed evaluator supervisor journals for new episodes"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "supervisor"
  - "evaluator"
  - "recovery"
  - "refactor"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T16:06:02.030Z"
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
    body: "Start: investigate and repair safe reopening of completed stale-state evaluator supervisor journals without weakening terminal protection for ambiguous provider effects."
events:
  -
    type: "status"
    at: "2026-07-28T16:06:20.538Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: investigate and repair safe reopening of completed stale-state evaluator supervisor journals without weakening terminal protection for ambiguous provider effects."
doc_version: 3
doc_updated_at: "2026-07-28T16:06:20.538Z"
doc_updated_by: "CODER"
description: "Allow a completed evaluator supervisor episode stopped only for stale state to reopen safely for a new provider episode, while preserving terminal protection for ambiguous or failed provider effects. This unblocks the 0.7 context-assimilation task without changing CURATOR semantics."
sections:
  Summary: |-
    Recover completed evaluator supervisor journals for new episodes

    Allow a completed evaluator supervisor episode stopped only for stale state to reopen safely for a new provider episode, while preserving terminal protection for ambiguous or failed provider effects. This unblocks the 0.7 context-assimilation task without changing CURATOR semantics.
  Scope: |-
    - In scope: Allow a completed evaluator supervisor episode stopped only for stale state to reopen safely for a new provider episode, while preserving terminal protection for ambiguous or failed provider effects. This unblocks the 0.7 context-assimilation task without changing CURATOR semantics.
    - Out of scope: unrelated refactors not required for "Recover completed evaluator supervisor journals for new episodes".
  Plan: "1. Inspect evaluator supervisor journal transition and recovery guards. 2. Permit only a completed stale-state journal to refresh its fingerprint and create a new episode. 3. Keep operation_failed and effect_in_doubt terminal. 4. Add focused unit and command-level regression tests, then run a real repeat evaluator episode. 5. Publish and integrate through the protected branch_pr route."
  Verify Steps: |-
    PLANNER fallback scaffold for "Recover completed evaluator supervisor journals for new episodes". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Recover completed evaluator supervisor journals for new episodes". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    start_head_sha: "c8df32a5e5a1b160e9ab74e0ae6f3a97224d186f"
    version: 1
id_source: "generated"
---
## Summary

Recover completed evaluator supervisor journals for new episodes

Allow a completed evaluator supervisor episode stopped only for stale state to reopen safely for a new provider episode, while preserving terminal protection for ambiguous or failed provider effects. This unblocks the 0.7 context-assimilation task without changing CURATOR semantics.

## Scope

- In scope: Allow a completed evaluator supervisor episode stopped only for stale state to reopen safely for a new provider episode, while preserving terminal protection for ambiguous or failed provider effects. This unblocks the 0.7 context-assimilation task without changing CURATOR semantics.
- Out of scope: unrelated refactors not required for "Recover completed evaluator supervisor journals for new episodes".

## Plan

1. Inspect evaluator supervisor journal transition and recovery guards. 2. Permit only a completed stale-state journal to refresh its fingerprint and create a new episode. 3. Keep operation_failed and effect_in_doubt terminal. 4. Add focused unit and command-level regression tests, then run a real repeat evaluator episode. 5. Publish and integrate through the protected branch_pr route.

## Verify Steps

PLANNER fallback scaffold for "Recover completed evaluator supervisor journals for new episodes". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Recover completed evaluator supervisor journals for new episodes". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
