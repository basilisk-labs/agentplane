---
id: "202605290030-1GEWE2"
title: "Blueprint model decomposition"
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
  updated_at: "2026-05-29T00:30:40.826Z"
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
    body: "Start: Split blueprint model type declarations into focused modules with model.ts as compatibility barrel."
events:
  -
    type: "status"
    at: "2026-05-29T00:30:51.773Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Split blueprint model type declarations into focused modules with model.ts as compatibility barrel."
doc_version: 3
doc_updated_at: "2026-05-29T00:30:51.773Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/blueprints/model.ts into focused blueprint model schema/type modules while preserving public blueprint model exports and reducing runtime hotspot warnings."
sections:
  Summary: |-
    Blueprint model decomposition

    Decompose packages/agentplane/src/blueprints/model.ts into focused blueprint model schema/type modules while preserving public blueprint model exports and reducing runtime hotspot warnings.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/blueprints/model.ts into focused blueprint model schema/type modules while preserving public blueprint model exports and reducing runtime hotspot warnings.
    - Out of scope: unrelated refactors not required for "Blueprint model decomposition".
  Plan: |-
    Plan:
    1. Start branch_pr worktree for CODER.
    2. Split blueprint model type declarations into focused modules: core model, resolution/plan model, execution model, snapshot model, and explain output model.
    3. Preserve packages/agentplane/src/blueprints/model.ts as a compatibility barrel so public imports keep working.
    4. Verify with blueprint-focused tests plus typecheck, arch/knip/lint/format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

    Acceptance:
    - public blueprint model exports remain import-compatible.
    - model.ts drops below the 400-line hotspot warning threshold.
    - runtime hotspot warning count decreases from 30 to 29 without adding new warning-sized runtime modules.
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

Blueprint model decomposition

Decompose packages/agentplane/src/blueprints/model.ts into focused blueprint model schema/type modules while preserving public blueprint model exports and reducing runtime hotspot warnings.

## Scope

- In scope: Decompose packages/agentplane/src/blueprints/model.ts into focused blueprint model schema/type modules while preserving public blueprint model exports and reducing runtime hotspot warnings.
- Out of scope: unrelated refactors not required for "Blueprint model decomposition".

## Plan

Plan:
1. Start branch_pr worktree for CODER.
2. Split blueprint model type declarations into focused modules: core model, resolution/plan model, execution model, snapshot model, and explain output model.
3. Preserve packages/agentplane/src/blueprints/model.ts as a compatibility barrel so public imports keep working.
4. Verify with blueprint-focused tests plus typecheck, arch/knip/lint/format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

Acceptance:
- public blueprint model exports remain import-compatible.
- model.ts drops below the 400-line hotspot warning threshold.
- runtime hotspot warning count decreases from 30 to 29 without adding new warning-sized runtime modules.

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
