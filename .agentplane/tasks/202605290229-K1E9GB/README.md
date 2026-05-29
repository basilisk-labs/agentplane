---
id: "202605290229-K1E9GB"
title: "Prompt module validation decomposition"
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
  - "prompt-modules"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T02:29:23.246Z"
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
    body: "Start: decompose prompt module validation constants and primitive guards while preserving public validation exports and runtime behavior."
events:
  -
    type: "status"
    at: "2026-05-29T02:29:48.514Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose prompt module validation constants and primitive guards while preserving public validation exports and runtime behavior."
doc_version: 3
doc_updated_at: "2026-05-29T02:29:48.514Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/runtime/prompt-modules/validation.ts by extracting prompt module validation constants and primitive field guards while preserving runtime prompt module, mutation set, and compiled graph validation behavior."
sections:
  Summary: |-
    Prompt module validation decomposition

    Decompose packages/agentplane/src/runtime/prompt-modules/validation.ts by extracting prompt module validation constants and primitive field guards while preserving runtime prompt module, mutation set, and compiled graph validation behavior.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/runtime/prompt-modules/validation.ts by extracting prompt module validation constants and primitive field guards while preserving runtime prompt module, mutation set, and compiled graph validation behavior.
    - Out of scope: unrelated refactors not required for "Prompt module validation decomposition".
  Plan: |-
    Plan:
    1. Start a branch_pr worktree for CODER.
    2. Extract prompt module validation enum domains and primitive guard helpers from packages/agentplane/src/runtime/prompt-modules/validation.ts into focused modules.
    3. Preserve validatePromptModule, validatePromptModuleMutationSet, validatePromptModuleCompiledGraph, and ValidatedPromptModuleMutation exports and behavior.
    4. Verify with prompt module model/mutation/registry tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

    Acceptance:
    - Prompt module validation tests remain compatible, including negative-path validation errors.
    - validation.ts drops below the 400-line hotspot warning threshold.
    - Runtime hotspot warning count decreases from 23 to 22 without introducing new warning-sized runtime modules.
    - No compiler, registry, schema, or mutation semantics change beyond shared helper imports.
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

Prompt module validation decomposition

Decompose packages/agentplane/src/runtime/prompt-modules/validation.ts by extracting prompt module validation constants and primitive field guards while preserving runtime prompt module, mutation set, and compiled graph validation behavior.

## Scope

- In scope: Decompose packages/agentplane/src/runtime/prompt-modules/validation.ts by extracting prompt module validation constants and primitive field guards while preserving runtime prompt module, mutation set, and compiled graph validation behavior.
- Out of scope: unrelated refactors not required for "Prompt module validation decomposition".

## Plan

Plan:
1. Start a branch_pr worktree for CODER.
2. Extract prompt module validation enum domains and primitive guard helpers from packages/agentplane/src/runtime/prompt-modules/validation.ts into focused modules.
3. Preserve validatePromptModule, validatePromptModuleMutationSet, validatePromptModuleCompiledGraph, and ValidatedPromptModuleMutation exports and behavior.
4. Verify with prompt module model/mutation/registry tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

Acceptance:
- Prompt module validation tests remain compatible, including negative-path validation errors.
- validation.ts drops below the 400-line hotspot warning threshold.
- Runtime hotspot warning count decreases from 23 to 22 without introducing new warning-sized runtime modules.
- No compiler, registry, schema, or mutation semantics change beyond shared helper imports.

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
