---
id: "202605290307-X81Y8X"
title: "Blueprint resolve decomposition"
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
  updated_at: "2026-05-29T03:07:15.420Z"
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
    body: "Start: extract recipe hint validation helpers while preserving blueprint resolve behavior and exports."
events:
  -
    type: "status"
    at: "2026-05-29T03:07:30.299Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract recipe hint validation helpers while preserving blueprint resolve behavior and exports."
doc_version: 3
doc_updated_at: "2026-05-29T03:07:30.299Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/blueprints/resolve.ts by extracting recipe hint validation helpers while preserving blueprint resolution and explanation behavior."
sections:
  Summary: |-
    Blueprint resolve decomposition

    Decompose packages/agentplane/src/blueprints/resolve.ts by extracting recipe hint validation helpers while preserving blueprint resolution and explanation behavior.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/blueprints/resolve.ts by extracting recipe hint validation helpers while preserving blueprint resolution and explanation behavior.
    - Out of scope: unrelated refactors not required for "Blueprint resolve decomposition".
  Plan: |-
    Plan:
    1. Start a branch_pr worktree for CODER.
    2. Extract recipe hint target/accept/reject validation from packages/agentplane/src/blueprints/resolve.ts into a focused helper module.
    3. Preserve resolveBlueprint, validateRecipeHintsForBlueprint, and inferBlueprintTaskKind public behavior and exports.
    4. Verify with blueprint resolve/recipe hint/snapshot tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

    Acceptance:
    - Existing blueprint selection and recipe hint acceptance/rejection behavior remains compatible.
    - resolve.ts drops below the 400-line hotspot warning threshold.
    - Runtime hotspot warning count decreases from 20 to 19 without introducing new warning-sized runtime modules.
    - No unrelated registry, model, explain, or validation changes.
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

Blueprint resolve decomposition

Decompose packages/agentplane/src/blueprints/resolve.ts by extracting recipe hint validation helpers while preserving blueprint resolution and explanation behavior.

## Scope

- In scope: Decompose packages/agentplane/src/blueprints/resolve.ts by extracting recipe hint validation helpers while preserving blueprint resolution and explanation behavior.
- Out of scope: unrelated refactors not required for "Blueprint resolve decomposition".

## Plan

Plan:
1. Start a branch_pr worktree for CODER.
2. Extract recipe hint target/accept/reject validation from packages/agentplane/src/blueprints/resolve.ts into a focused helper module.
3. Preserve resolveBlueprint, validateRecipeHintsForBlueprint, and inferBlueprintTaskKind public behavior and exports.
4. Verify with blueprint resolve/recipe hint/snapshot tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

Acceptance:
- Existing blueprint selection and recipe hint acceptance/rejection behavior remains compatible.
- resolve.ts drops below the 400-line hotspot warning threshold.
- Runtime hotspot warning count decreases from 20 to 19 without introducing new warning-sized runtime modules.
- No unrelated registry, model, explain, or validation changes.

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
