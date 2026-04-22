---
id: "202604221538-CZH46Z"
title: "Epic B: Prompt graph compiler core"
status: "TODO"
priority: "high"
owner: "PLANNER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604221538-FSYGA6"
  - "202604221538-FY9VC7"
  - "202604221538-NW0XS0"
  - "202604221538-T4X6QF"
  - "202604221538-TAEV8T"
tags:
  - "architecture"
  - "docs"
  - "epic"
  - "prompt-assembly"
  - "v0.4"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T15:38:45.671Z"
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
doc_updated_at: "2026-04-22T15:38:45.452Z"
doc_updated_by: "PLANNER"
description: "Roll-up epic for framework module registry, graph resolution, mutation engine, manifest emission, and explain diagnostics."
sections:
  Summary: |-
    Epic B: Prompt graph compiler core
    
    Roll-up epic for framework module registry, graph resolution, mutation engine, manifest emission, and explain diagnostics.
  Scope: |-
    - In scope: Roll-up epic for framework module registry, graph resolution, mutation engine, manifest emission, and explain diagnostics.
    - Out of scope: unrelated refactors not required for "Epic B: Prompt graph compiler core".
  Plan: |-
    Goal: Epic B: Prompt graph compiler core
    
    Plan:
    1. Inspect the current implementation and tests around this scope.
    2. Make the smallest implementation change that satisfies the task contract.
    3. Add or update focused tests and fixtures for the changed behavior.
    4. Update docs or generated schemas only when the code-facing contract changes.
    
    Acceptance:
    - Compiler core tasks are DONE and generated graph artifacts are deterministic.
    - Existing public behavior outside this scope is preserved.
    - Verification evidence is recorded before finish.
    
    Rollback Plan:
    - Revert this task commit and rerun the focused verification commands.
  Verify Steps: |-
    1. Review the requested outcome for "Epic B: Prompt graph compiler core". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Epic B: Prompt graph compiler core

Roll-up epic for framework module registry, graph resolution, mutation engine, manifest emission, and explain diagnostics.

## Scope

- In scope: Roll-up epic for framework module registry, graph resolution, mutation engine, manifest emission, and explain diagnostics.
- Out of scope: unrelated refactors not required for "Epic B: Prompt graph compiler core".

## Plan

Goal: Epic B: Prompt graph compiler core

Plan:
1. Inspect the current implementation and tests around this scope.
2. Make the smallest implementation change that satisfies the task contract.
3. Add or update focused tests and fixtures for the changed behavior.
4. Update docs or generated schemas only when the code-facing contract changes.

Acceptance:
- Compiler core tasks are DONE and generated graph artifacts are deterministic.
- Existing public behavior outside this scope is preserved.
- Verification evidence is recorded before finish.

Rollback Plan:
- Revert this task commit and rerun the focused verification commands.

## Verify Steps

1. Review the requested outcome for "Epic B: Prompt graph compiler core". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
