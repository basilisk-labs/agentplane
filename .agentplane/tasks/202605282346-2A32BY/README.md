---
id: "202605282346-2A32BY"
title: "Blueprint catalog parser decomposition"
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
  updated_at: "2026-05-28T23:46:15.803Z"
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
    body: "Start: Decompose blueprint catalog type and parser helpers in the task worktree while preserving catalog load, manifest, and install behavior under focused tests."
events:
  -
    type: "status"
    at: "2026-05-28T23:46:36.811Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Decompose blueprint catalog type and parser helpers in the task worktree while preserving catalog load, manifest, and install behavior under focused tests."
doc_version: 3
doc_updated_at: "2026-05-28T23:46:36.811Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/blueprints/catalog.ts by extracting catalog/manifest types and parsers while preserving catalog load/install behavior."
sections:
  Summary: |-
    Blueprint catalog parser decomposition

    Decompose packages/agentplane/src/commands/blueprints/catalog.ts by extracting catalog/manifest types and parsers while preserving catalog load/install behavior.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/blueprints/catalog.ts by extracting catalog/manifest types and parsers while preserving catalog load/install behavior.
    - Out of scope: unrelated refactors not required for "Blueprint catalog parser decomposition".
  Plan: |-
    Plan:
    1. Start branch_pr worktree for CODER.
    2. Extract catalog/manifest type definitions and parser helpers from blueprints/catalog.ts into a focused module.
    3. Preserve public exports used by blueprints.command.ts and catalog-cache.ts.
    4. Verify with blueprint catalog tests, typecheck, arch dependency check, lint, format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean merged worktree.

    Acceptance:
    - catalog load/info/install behavior remains compatible.
    - catalog.ts drops below the runtime hotspot warning threshold.
    - hotspot runtime warning count decreases from 33 to 32.
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

Blueprint catalog parser decomposition

Decompose packages/agentplane/src/commands/blueprints/catalog.ts by extracting catalog/manifest types and parsers while preserving catalog load/install behavior.

## Scope

- In scope: Decompose packages/agentplane/src/commands/blueprints/catalog.ts by extracting catalog/manifest types and parsers while preserving catalog load/install behavior.
- Out of scope: unrelated refactors not required for "Blueprint catalog parser decomposition".

## Plan

Plan:
1. Start branch_pr worktree for CODER.
2. Extract catalog/manifest type definitions and parser helpers from blueprints/catalog.ts into a focused module.
3. Preserve public exports used by blueprints.command.ts and catalog-cache.ts.
4. Verify with blueprint catalog tests, typecheck, arch dependency check, lint, format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean merged worktree.

Acceptance:
- catalog load/info/install behavior remains compatible.
- catalog.ts drops below the runtime hotspot warning threshold.
- hotspot runtime warning count decreases from 33 to 32.

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
