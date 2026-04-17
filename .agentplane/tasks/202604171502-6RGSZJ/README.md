---
id: "202604171502-6RGSZJ"
title: "Add ESLint import boundaries for core shared and commands layers"
result_summary: "Merged via PR #402."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "code"
  - "lint"
verify:
  - "bun run lint:core"
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T15:14:24.556Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T15:21:22.266Z"
  updated_by: "CODER"
  note: "Verified: lint and typecheck pass for the new import-boundary policy."
commit:
  hash: "194016bdb24ff1024e8da0fbeaf79ed1b1d0d14d"
  message: "architecture/lint: Add ESLint import boundaries for core shared and commands layers (6RGSZJ) (#402)"
comments:
  -
    author: "CODER"
    body: "Start: implementing explicit ESLint import boundaries for core shared and commands layers in an isolated task worktree after inspecting current lint config and cross-layer imports."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #402 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-17T15:14:40.931Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing explicit ESLint import boundaries for core shared and commands layers in an isolated task worktree after inspecting current lint config and cross-layer imports."
  -
    type: "verify"
    at: "2026-04-17T15:21:22.266Z"
    author: "CODER"
    state: "ok"
    note: "Verified: lint and typecheck pass for the new import-boundary policy."
  -
    type: "status"
    at: "2026-04-17T18:59:18.957Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #402 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-17T18:59:18.962Z"
doc_updated_by: "INTEGRATOR"
description: "Enforce package and layer boundaries for core, shared, and commands code so future refactors cannot reintroduce cross-layer imports."
sections:
  Summary: |-
    Add ESLint import boundaries for core shared and commands layers
    
    Enforce package and layer boundaries for core, shared, and commands code so future refactors cannot reintroduce cross-layer imports.
  Scope: |-
    - In scope: Enforce package and layer boundaries for core, shared, and commands code so future refactors cannot reintroduce cross-layer imports.
    - Out of scope: unrelated refactors not required for "Add ESLint import boundaries for core shared and commands layers".
  Plan: |-
    1. Map allowed import directions across core, shared, commands, and backend helper layers.
    2. Encode those rules in ESLint with the narrowest workable restrictions and fix only the violations required by the new guardrails.
    3. Run bun run lint:core and capture any residual exceptions explicitly.
  Verify Steps: |-
    1. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T15:21:22.266Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: lint and typecheck pass for the new import-boundary policy.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T15:14:40.937Z, excerpt_hash=sha256:7c0ab33f8568d07f24b08f0e05952340dd5d739694ef565330f4ca25de3519af
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: bun run lint:core; bun run typecheck passed after moving execution-context helpers into runtime and removing direct commands-to-usecases imports.
      Impact: The commands/shared/core layering now has a lint-enforced boundary, and future regressions in these directions will fail fast in lint instead of staying implicit.
      Resolution: Added import/no-restricted-paths zones in eslint.config.cjs, rewired command and runner imports to runtime/execution-context, and removed the obsolete usecases wrappers.
id_source: "generated"
---
## Summary

Add ESLint import boundaries for core shared and commands layers

Enforce package and layer boundaries for core, shared, and commands code so future refactors cannot reintroduce cross-layer imports.

## Scope

- In scope: Enforce package and layer boundaries for core, shared, and commands code so future refactors cannot reintroduce cross-layer imports.
- Out of scope: unrelated refactors not required for "Add ESLint import boundaries for core shared and commands layers".

## Plan

1. Map allowed import directions across core, shared, commands, and backend helper layers.
2. Encode those rules in ESLint with the narrowest workable restrictions and fix only the violations required by the new guardrails.
3. Run bun run lint:core and capture any residual exceptions explicitly.

## Verify Steps

1. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T15:21:22.266Z — VERIFY — ok

By: CODER

Note: Verified: lint and typecheck pass for the new import-boundary policy.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T15:14:40.937Z, excerpt_hash=sha256:7c0ab33f8568d07f24b08f0e05952340dd5d739694ef565330f4ca25de3519af

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: bun run lint:core; bun run typecheck passed after moving execution-context helpers into runtime and removing direct commands-to-usecases imports.
  Impact: The commands/shared/core layering now has a lint-enforced boundary, and future regressions in these directions will fail fast in lint instead of staying implicit.
  Resolution: Added import/no-restricted-paths zones in eslint.config.cjs, rewired command and runner imports to runtime/execution-context, and removed the obsolete usecases wrappers.
