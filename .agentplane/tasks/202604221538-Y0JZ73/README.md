---
id: "202604221538-Y0JZ73"
title: "Epic: Ship v0.4 modular prompt assembly"
status: "TODO"
priority: "high"
owner: "PLANNER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604221538-6DD43S"
  - "202604221538-7G1S0Z"
  - "202604221538-CZH46Z"
  - "202604221538-D24SMW"
  - "202604221538-VAWS26"
tags:
  - "architecture"
  - "docs"
  - "epic"
  - "prompt-assembly"
  - "v0.4"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T15:38:51.152Z"
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
doc_updated_at: "2026-04-22T15:38:50.947Z"
doc_updated_by: "PLANNER"
description: "Top-level roll-up epic for shipping modular prompt assembly across contracts, compiler, compiled prompt surfaces, recipe integration, verification, and docs."
sections:
  Summary: |-
    Epic: Ship v0.4 modular prompt assembly

    Top-level roll-up epic for shipping modular prompt assembly across contracts, compiler, compiled prompt surfaces, recipe integration, verification, and docs.
  Scope: |-
    - In scope: Top-level roll-up epic for shipping modular prompt assembly across contracts, compiler, compiled prompt surfaces, recipe integration, verification, and docs.
    - Out of scope: unrelated refactors not required for "Epic: Ship v0.4 modular prompt assembly".
  Plan: |-
    Goal: Epic: Ship v0.4 modular prompt assembly

    Plan:
    1. Inspect the current implementation and tests around this scope.
    2. Make the smallest implementation change that satisfies the task contract.
    3. Add or update focused tests and fixtures for the changed behavior.
    4. Update docs or generated schemas only when the code-facing contract changes.

    Acceptance:
    - All v0.4 modular prompt assembly epics are DONE and release readiness is explicitly verified.
    - Existing public behavior outside this scope is preserved.
    - Verification evidence is recorded before finish.

    Rollback Plan:
    - Revert this task commit and rerun the focused verification commands.
  Verify Steps: |-
    1. Review the requested outcome for "Epic: Ship v0.4 modular prompt assembly". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Epic: Ship v0.4 modular prompt assembly

Top-level roll-up epic for shipping modular prompt assembly across contracts, compiler, compiled prompt surfaces, recipe integration, verification, and docs.

## Scope

- In scope: Top-level roll-up epic for shipping modular prompt assembly across contracts, compiler, compiled prompt surfaces, recipe integration, verification, and docs.
- Out of scope: unrelated refactors not required for "Epic: Ship v0.4 modular prompt assembly".

## Plan

Goal: Epic: Ship v0.4 modular prompt assembly

Plan:
1. Inspect the current implementation and tests around this scope.
2. Make the smallest implementation change that satisfies the task contract.
3. Add or update focused tests and fixtures for the changed behavior.
4. Update docs or generated schemas only when the code-facing contract changes.

Acceptance:
- All v0.4 modular prompt assembly epics are DONE and release readiness is explicitly verified.
- Existing public behavior outside this scope is preserved.
- Verification evidence is recorded before finish.

Rollback Plan:
- Revert this task commit and rerun the focused verification commands.

## Verify Steps

1. Review the requested outcome for "Epic: Ship v0.4 modular prompt assembly". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
