---
id: "202605290203-E5E8EF"
title: "Blueprint validate decomposition"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "code"
  - "hotspot"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T02:03:40.337Z"
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
    body: "Start: decompose blueprint validation helpers while preserving validateBlueprint, validateBlueprintRegistry, and validateBlueprintPlanArtifact behavior."
events:
  -
    type: "status"
    at: "2026-05-29T02:04:06.647Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose blueprint validation helpers while preserving validateBlueprint, validateBlueprintRegistry, and validateBlueprintPlanArtifact behavior."
doc_version: 3
doc_updated_at: "2026-05-29T02:04:06.647Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/blueprints/validate.ts by extracting shared graph/evidence validation helpers while preserving blueprint and plan validation behavior and reducing runtime hotspot warnings."
sections:
  Summary: |-
    Blueprint validate decomposition

    Decompose packages/agentplane/src/blueprints/validate.ts by extracting shared graph/evidence validation helpers while preserving blueprint and plan validation behavior and reducing runtime hotspot warnings.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/blueprints/validate.ts by extracting shared graph/evidence validation helpers while preserving blueprint and plan validation behavior and reducing runtime hotspot warnings.
    - Out of scope: unrelated refactors not required for "Blueprint validate decomposition".
  Plan: |-
    Plan:
    1. Start a branch_pr worktree for CODER.
    2. Extract blueprint validation graph helpers and shared problem constructors from packages/agentplane/src/blueprints/validate.ts into focused modules.
    3. Preserve validateBlueprint, validateBlueprintRegistry, and validateBlueprintPlanArtifact behavior and exports.
    4. Verify with blueprint validation tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

    Acceptance:
    - Blueprint validation behavior remains compatible, including negative-path tests.
    - validate.ts drops below the 400-line hotspot warning threshold.
    - Runtime hotspot warning count decreases from 24 to 23 without introducing new warning-sized runtime modules.
    - No unrelated blueprint registry, routing, or model changes.
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

Blueprint validate decomposition

Decompose packages/agentplane/src/blueprints/validate.ts by extracting shared graph/evidence validation helpers while preserving blueprint and plan validation behavior and reducing runtime hotspot warnings.

## Scope

- In scope: Decompose packages/agentplane/src/blueprints/validate.ts by extracting shared graph/evidence validation helpers while preserving blueprint and plan validation behavior and reducing runtime hotspot warnings.
- Out of scope: unrelated refactors not required for "Blueprint validate decomposition".

## Plan

Plan:
1. Start a branch_pr worktree for CODER.
2. Extract blueprint validation graph helpers and shared problem constructors from packages/agentplane/src/blueprints/validate.ts into focused modules.
3. Preserve validateBlueprint, validateBlueprintRegistry, and validateBlueprintPlanArtifact behavior and exports.
4. Verify with blueprint validation tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

Acceptance:
- Blueprint validation behavior remains compatible, including negative-path tests.
- validate.ts drops below the 400-line hotspot warning threshold.
- Runtime hotspot warning count decreases from 24 to 23 without introducing new warning-sized runtime modules.
- No unrelated blueprint registry, routing, or model changes.

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
