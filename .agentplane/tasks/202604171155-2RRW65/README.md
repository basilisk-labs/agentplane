---
id: "202604171155-2RRW65"
title: "Collapse recipes transition wrappers"
result_summary: "Merged via PR #385."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T12:44:07.470Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T12:52:51.424Z"
  updated_by: "TESTER"
  note: "Verified: recipe-domain transition wrappers were removed and CLI/runtime consumers now import domain helpers directly from @agentplaneorg/recipes."
commit:
  hash: "c8a70a147c5552bde497ffe3e4fb1281450ca564"
  message: "recipes/workflow: Collapse recipes transition wrappers (2RRW65) (#385)"
comments:
  -
    author: "CODER"
    body: "Start: collapse recipe-domain transition wrappers and switch CLI/runtime imports to @agentplaneorg/recipes where direct exports already exist."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #385 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-17T12:44:27.951Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: collapse recipe-domain transition wrappers and switch CLI/runtime imports to @agentplaneorg/recipes where direct exports already exist."
  -
    type: "verify"
    at: "2026-04-17T12:52:51.424Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: recipe-domain transition wrappers were removed and CLI/runtime consumers now import domain helpers directly from @agentplaneorg/recipes."
  -
    type: "status"
    at: "2026-04-17T14:25:43.798Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #385 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-17T14:25:43.804Z"
doc_updated_by: "INTEGRATOR"
description: "Remove duplicated normalize/manifest/scenario transition layers under commands/recipes/impl and import recipe-domain logic directly from @agentplaneorg/recipes where the CLI no longer needs a boundary shim."
sections:
  Summary: |-
    Collapse recipes transition wrappers
    
    Remove duplicated normalize/manifest/scenario transition layers under commands/recipes/impl and import recipe-domain logic directly from @agentplaneorg/recipes where the CLI no longer needs a boundary shim.
  Scope: |-
    - In scope: Remove duplicated normalize/manifest/scenario transition layers under commands/recipes/impl and import recipe-domain logic directly from @agentplaneorg/recipes where the CLI no longer needs a boundary shim.
    - Out of scope: unrelated refactors not required for "Collapse recipes transition wrappers".
  Plan: |-
    1. Inventory recipe-domain wrappers under packages/agentplane/src/commands/recipes/impl and identify direct equivalents already exported from @agentplaneorg/recipes.
    2. Remove or collapse wrapper modules so CLI/runtime imports recipe-domain helpers directly from @agentplaneorg/recipes, leaving only CLI-local parsing/types where genuinely needed.
    3. Update focused tests to cover the new direct import path and verify no wrapper-only behavior remains.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T12:52:51.424Z — VERIFY — ok
    
    By: TESTER
    
    Note: Verified: recipe-domain transition wrappers were removed and CLI/runtime consumers now import domain helpers directly from @agentplaneorg/recipes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T12:44:27.958Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Deleted impl/manifest.ts, impl/normalize.ts, and impl/scenario.ts after migrating consumers and exports.
      Impact: The recipes command layer no longer maintains a parallel domain implementation surface.
      Resolution: Focused recipe loader, resolver, scenario, capability, and prompt tests passed on the direct package export path.
id_source: "generated"
---
## Summary

Collapse recipes transition wrappers

Remove duplicated normalize/manifest/scenario transition layers under commands/recipes/impl and import recipe-domain logic directly from @agentplaneorg/recipes where the CLI no longer needs a boundary shim.

## Scope

- In scope: Remove duplicated normalize/manifest/scenario transition layers under commands/recipes/impl and import recipe-domain logic directly from @agentplaneorg/recipes where the CLI no longer needs a boundary shim.
- Out of scope: unrelated refactors not required for "Collapse recipes transition wrappers".

## Plan

1. Inventory recipe-domain wrappers under packages/agentplane/src/commands/recipes/impl and identify direct equivalents already exported from @agentplaneorg/recipes.
2. Remove or collapse wrapper modules so CLI/runtime imports recipe-domain helpers directly from @agentplaneorg/recipes, leaving only CLI-local parsing/types where genuinely needed.
3. Update focused tests to cover the new direct import path and verify no wrapper-only behavior remains.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T12:52:51.424Z — VERIFY — ok

By: TESTER

Note: Verified: recipe-domain transition wrappers were removed and CLI/runtime consumers now import domain helpers directly from @agentplaneorg/recipes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T12:44:27.958Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Deleted impl/manifest.ts, impl/normalize.ts, and impl/scenario.ts after migrating consumers and exports.
  Impact: The recipes command layer no longer maintains a parallel domain implementation surface.
  Resolution: Focused recipe loader, resolver, scenario, capability, and prompt tests passed on the direct package export path.
