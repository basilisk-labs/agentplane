---
id: "202604221538-6DD43S"
title: "Epic E: Prompt assembly verification and docs"
status: "TODO"
priority: "high"
owner: "PLANNER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604221538-1JCCXX"
  - "202604221538-DYS8HN"
  - "202604221538-PDQ89Y"
  - "202604221538-Q9BRCC"
  - "202604221538-ZPVH2K"
tags:
  - "docs"
  - "epic"
  - "prompt-assembly"
  - "testing"
  - "v0.4"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T15:38:49.781Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-22T15:38:49.580Z"
doc_updated_by: "PLANNER"
description: "Roll-up epic for compiler tests, init/upgrade migration tests, recipe lifecycle tests, doctor diagnostics, and shipped-behavior docs."
sections:
  Summary: |-
    Epic E: Prompt assembly verification and docs

    Roll-up epic for compiler tests, init/upgrade migration tests, recipe lifecycle tests, doctor diagnostics, and shipped-behavior docs.
  Scope: |-
    - In scope: Roll-up epic for compiler tests, init/upgrade migration tests, recipe lifecycle tests, doctor diagnostics, and shipped-behavior docs.
    - Out of scope: unrelated refactors not required for "Epic E: Prompt assembly verification and docs".
  Plan: |-
    Goal: Epic E: Prompt assembly verification and docs

    Plan:
    1. Inspect the current implementation and tests around this scope.
    2. Make the smallest implementation change that satisfies the task contract.
    3. Add or update focused tests and fixtures for the changed behavior.
    4. Update docs or generated schemas only when the code-facing contract changes.

    Acceptance:
    - All verification and docs tasks are DONE with final checks recorded.
    - Existing public behavior outside this scope is preserved.
    - Verification evidence is recorded before finish.

    Rollback Plan:
    - Revert this task commit and rerun the focused verification commands.
  Verify Steps: |-
    1. Review the requested outcome for "Epic E: Prompt assembly verification and docs". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Epic E: Prompt assembly verification and docs

Roll-up epic for compiler tests, init/upgrade migration tests, recipe lifecycle tests, doctor diagnostics, and shipped-behavior docs.

## Scope

- In scope: Roll-up epic for compiler tests, init/upgrade migration tests, recipe lifecycle tests, doctor diagnostics, and shipped-behavior docs.
- Out of scope: unrelated refactors not required for "Epic E: Prompt assembly verification and docs".

## Plan

Goal: Epic E: Prompt assembly verification and docs

Plan:
1. Inspect the current implementation and tests around this scope.
2. Make the smallest implementation change that satisfies the task contract.
3. Add or update focused tests and fixtures for the changed behavior.
4. Update docs or generated schemas only when the code-facing contract changes.

Acceptance:
- All verification and docs tasks are DONE with final checks recorded.
- Existing public behavior outside this scope is preserved.
- Verification evidence is recorded before finish.

Rollback Plan:
- Revert this task commit and rerun the focused verification commands.

## Verify Steps

1. Review the requested outcome for "Epic E: Prompt assembly verification and docs". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
