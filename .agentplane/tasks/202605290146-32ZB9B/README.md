---
id: "202605290146-32ZB9B"
title: "SGR contracts decomposition"
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
  - "runtime"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T01:46:19.154Z"
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
    body: "Start: decompose SGR contracts into type and validator primitive modules while preserving public SGR validation exports."
events:
  -
    type: "status"
    at: "2026-05-29T01:46:41.424Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose SGR contracts into type and validator primitive modules while preserving public SGR validation exports."
doc_version: 3
doc_updated_at: "2026-05-29T01:46:41.424Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/runtime/sgr/contracts.ts by extracting contract types and shared validation primitives while preserving public SGR validation exports and reducing runtime hotspot warnings."
sections:
  Summary: |-
    SGR contracts decomposition

    Decompose packages/agentplane/src/runtime/sgr/contracts.ts by extracting contract types and shared validation primitives while preserving public SGR validation exports and reducing runtime hotspot warnings.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/runtime/sgr/contracts.ts by extracting contract types and shared validation primitives while preserving public SGR validation exports and reducing runtime hotspot warnings.
    - Out of scope: unrelated refactors not required for "SGR contracts decomposition".
  Plan: |-
    Plan:
    1. Start a branch_pr worktree for CODER.
    2. Extract SGR contract type definitions into a focused module and shared primitive validators into another focused module.
    3. Keep runtime/sgr/index.ts and all wrapper exports compatible.
    4. Verify with SGR contract tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

    Acceptance:
    - Public SGR validator functions and exported types remain compatible.
    - contracts.ts drops below the 400-line hotspot warning threshold.
    - Runtime hotspot warning count decreases from 25 to 24 without introducing new warning-sized runtime modules.
    - SGR contract negative-path validation behavior remains covered by tests.
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

SGR contracts decomposition

Decompose packages/agentplane/src/runtime/sgr/contracts.ts by extracting contract types and shared validation primitives while preserving public SGR validation exports and reducing runtime hotspot warnings.

## Scope

- In scope: Decompose packages/agentplane/src/runtime/sgr/contracts.ts by extracting contract types and shared validation primitives while preserving public SGR validation exports and reducing runtime hotspot warnings.
- Out of scope: unrelated refactors not required for "SGR contracts decomposition".

## Plan

Plan:
1. Start a branch_pr worktree for CODER.
2. Extract SGR contract type definitions into a focused module and shared primitive validators into another focused module.
3. Keep runtime/sgr/index.ts and all wrapper exports compatible.
4. Verify with SGR contract tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

Acceptance:
- Public SGR validator functions and exported types remain compatible.
- contracts.ts drops below the 400-line hotspot warning threshold.
- Runtime hotspot warning count decreases from 25 to 24 without introducing new warning-sized runtime modules.
- SGR contract negative-path validation behavior remains covered by tests.

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
