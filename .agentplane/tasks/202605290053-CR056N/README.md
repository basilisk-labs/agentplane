---
id: "202605290053-CR056N"
title: "Blueprint project-local decomposition"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hotspot"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T00:54:44.855Z"
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
    body: "Start: Decompose project-local blueprint trust/config and file parsing helpers while preserving public API behavior."
events:
  -
    type: "status"
    at: "2026-05-29T00:54:58.996Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Decompose project-local blueprint trust/config and file parsing helpers while preserving public API behavior."
doc_version: 3
doc_updated_at: "2026-05-29T00:54:58.996Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/blueprints/project-local.ts into focused project-local blueprint modules while preserving behavior and reducing runtime hotspot warnings."
sections:
  Summary: |-
    Blueprint project-local decomposition

    Decompose packages/agentplane/src/blueprints/project-local.ts into focused project-local blueprint modules while preserving behavior and reducing runtime hotspot warnings.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/blueprints/project-local.ts into focused project-local blueprint modules while preserving behavior and reducing runtime hotspot warnings.
    - Out of scope: unrelated refactors not required for "Blueprint project-local decomposition".
  Plan: |-
    Plan:
    1. Start branch_pr worktree for CODER.
    2. Extract project-local blueprint trust/config helpers and file parsing/loading helpers from packages/agentplane/src/blueprints/project-local.ts into focused modules.
    3. Keep public project-local functions and behavior compatible.
    4. Verify with project-local blueprint tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

    Acceptance:
    - project-local blueprint loading, trust config, compatibility report, and scaffold behavior remain compatible.
    - project-local.ts drops below the 400-line hotspot warning threshold.
    - runtime hotspot warning count decreases from 28 to 27 without adding new warning-sized runtime modules.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Blueprint project-local decomposition

Decompose packages/agentplane/src/blueprints/project-local.ts into focused project-local blueprint modules while preserving behavior and reducing runtime hotspot warnings.

## Scope

- In scope: Decompose packages/agentplane/src/blueprints/project-local.ts into focused project-local blueprint modules while preserving behavior and reducing runtime hotspot warnings.
- Out of scope: unrelated refactors not required for "Blueprint project-local decomposition".

## Plan

Plan:
1. Start branch_pr worktree for CODER.
2. Extract project-local blueprint trust/config helpers and file parsing/loading helpers from packages/agentplane/src/blueprints/project-local.ts into focused modules.
3. Keep public project-local functions and behavior compatible.
4. Verify with project-local blueprint tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

Acceptance:
- project-local blueprint loading, trust config, compatibility report, and scaffold behavior remain compatible.
- project-local.ts drops below the 400-line hotspot warning threshold.
- runtime hotspot warning count decreases from 28 to 27 without adding new warning-sized runtime modules.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
