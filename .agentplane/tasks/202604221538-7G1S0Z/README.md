---
id: "202604221538-7G1S0Z"
title: "Epic D: Recipe prompt module integration"
status: "TODO"
priority: "high"
owner: "PLANNER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604221538-090B9W"
  - "202604221538-93GJ3Q"
  - "202604221538-DE9MQG"
  - "202604221538-ES8CHK"
  - "202604221538-PSBP57"
tags:
  - "docs"
  - "epic"
  - "prompt-assembly"
  - "recipes"
  - "v0.4"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T15:38:48.422Z"
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
doc_updated_at: "2026-04-22T15:38:48.221Z"
doc_updated_by: "PLANNER"
description: "Roll-up epic for recipe manifest extensions, module asset validation, lifecycle artifact refresh, conflict handling, and explain output."
sections:
  Summary: |-
    Epic D: Recipe prompt module integration
    
    Roll-up epic for recipe manifest extensions, module asset validation, lifecycle artifact refresh, conflict handling, and explain output.
  Scope: |-
    - In scope: Roll-up epic for recipe manifest extensions, module asset validation, lifecycle artifact refresh, conflict handling, and explain output.
    - Out of scope: unrelated refactors not required for "Epic D: Recipe prompt module integration".
  Plan: |-
    Goal: Epic D: Recipe prompt module integration
    
    Plan:
    1. Inspect the current implementation and tests around this scope.
    2. Make the smallest implementation change that satisfies the task contract.
    3. Add or update focused tests and fixtures for the changed behavior.
    4. Update docs or generated schemas only when the code-facing contract changes.
    
    Acceptance:
    - Recipes can safely mutate prompt graphs through validated modules and lifecycle refresh.
    - Existing public behavior outside this scope is preserved.
    - Verification evidence is recorded before finish.
    
    Rollback Plan:
    - Revert this task commit and rerun the focused verification commands.
  Verify Steps: |-
    1. Review the requested outcome for "Epic D: Recipe prompt module integration". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Epic D: Recipe prompt module integration

Roll-up epic for recipe manifest extensions, module asset validation, lifecycle artifact refresh, conflict handling, and explain output.

## Scope

- In scope: Roll-up epic for recipe manifest extensions, module asset validation, lifecycle artifact refresh, conflict handling, and explain output.
- Out of scope: unrelated refactors not required for "Epic D: Recipe prompt module integration".

## Plan

Goal: Epic D: Recipe prompt module integration

Plan:
1. Inspect the current implementation and tests around this scope.
2. Make the smallest implementation change that satisfies the task contract.
3. Add or update focused tests and fixtures for the changed behavior.
4. Update docs or generated schemas only when the code-facing contract changes.

Acceptance:
- Recipes can safely mutate prompt graphs through validated modules and lifecycle refresh.
- Existing public behavior outside this scope is preserved.
- Verification evidence is recorded before finish.

Rollback Plan:
- Revert this task commit and rerun the focused verification commands.

## Verify Steps

1. Review the requested outcome for "Epic D: Recipe prompt module integration". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
