---
id: "202605052204-GD17KQ"
title: "Bind recipes to blueprint definitions"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605052204-4XSTAA"
tags:
  - "blueprints"
  - "code"
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T22:05:18.022Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T22:19:07.570Z"
  updated_by: "CODER"
  note: "Verified: recipe blueprint extensions remain bound to typed blueprint definitions and runner bundle preparation now resolves recipe manifest blueprint hints into the selected plan."
commit:
  hash: "5e16019e1eea4992217e70d12170dc8661de1988"
  message: "Merge pull request #952 from basilisk-labs/task/202605052203-WH7G6R/executable-blueprint-contracts"
comments:
  -
    author: "CODER"
    body: "Start: Bind recipe hints to typed blueprint definitions within the approved executable blueprint batch implementation."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #952 merged the dependent executable blueprint registry, plan artifact, explain, recipe binding, and runner bundle visibility tasks into main."
events:
  -
    type: "status"
    at: "2026-05-05T22:07:34.627Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Bind recipe hints to typed blueprint definitions within the approved executable blueprint batch implementation."
  -
    type: "verify"
    at: "2026-05-05T22:19:07.570Z"
    author: "CODER"
    state: "ok"
    note: "Verified: recipe blueprint extensions remain bound to typed blueprint definitions and runner bundle preparation now resolves recipe manifest blueprint hints into the selected plan."
  -
    type: "status"
    at: "2026-05-05T22:27:39.723Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #952 merged the dependent executable blueprint registry, plan artifact, explain, recipe binding, and runner bundle visibility tasks into main."
doc_version: 3
doc_updated_at: "2026-05-05T22:27:39.723Z"
doc_updated_by: "INTEGRATOR"
description: "Add the fifth implementation task for blueprint execution contracts: connect recipe hints to typed blueprint definitions so recipes describe domain method while blueprints describe lifecycle route, without making code PR workflow the default for analysis or content tasks."
sections:
  Summary: |-
    Bind recipes to blueprint definitions
    
    Add the fifth implementation task for blueprint execution contracts: connect recipe hints to typed blueprint definitions so recipes describe domain method while blueprints describe lifecycle route, without making code PR workflow the default for analysis or content tasks.
  Scope: |-
    - In scope: Add the fifth implementation task for blueprint execution contracts: connect recipe hints to typed blueprint definitions so recipes describe domain method while blueprints describe lifecycle route, without making code PR workflow the default for analysis or content tasks.
    - Out of scope: unrelated refactors not required for "Bind recipes to blueprint definitions".
  Plan: |-
    1. Inspect the current recipe hint model and blueprint resolver bridge.
    2. Bind recipes to typed blueprint definitions through explicit hint fields rather than title keywords.
    3. Preserve the separation: recipe describes domain method; blueprint describes lifecycle route.
    4. Ensure analysis/content recipes can bind to lightweight blueprints without CI or PR defaults.
    5. Add tests for recipe-preferred blueprint selection and conflict handling.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T22:19:07.570Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: recipe blueprint extensions remain bound to typed blueprint definitions and runner bundle preparation now resolves recipe manifest blueprint hints into the selected plan.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T22:07:34.627Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: blueprint resolver recipe-hint tests, runner dry-run tests, typecheck, targeted eslint, schemas, docs CLI freshness, policy routing, doctor, and diff check.
      Impact: Recipes can influence compatible blueprint selection and context/evidence hints without overriding protected lifecycle gates.
      Resolution: Connected recipe manifest blueprint extensions to runner blueprint plan resolution and preserved resolver safeguards.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Bind recipes to blueprint definitions

Add the fifth implementation task for blueprint execution contracts: connect recipe hints to typed blueprint definitions so recipes describe domain method while blueprints describe lifecycle route, without making code PR workflow the default for analysis or content tasks.

## Scope

- In scope: Add the fifth implementation task for blueprint execution contracts: connect recipe hints to typed blueprint definitions so recipes describe domain method while blueprints describe lifecycle route, without making code PR workflow the default for analysis or content tasks.
- Out of scope: unrelated refactors not required for "Bind recipes to blueprint definitions".

## Plan

1. Inspect the current recipe hint model and blueprint resolver bridge.
2. Bind recipes to typed blueprint definitions through explicit hint fields rather than title keywords.
3. Preserve the separation: recipe describes domain method; blueprint describes lifecycle route.
4. Ensure analysis/content recipes can bind to lightweight blueprints without CI or PR defaults.
5. Add tests for recipe-preferred blueprint selection and conflict handling.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T22:19:07.570Z — VERIFY — ok

By: CODER

Note: Verified: recipe blueprint extensions remain bound to typed blueprint definitions and runner bundle preparation now resolves recipe manifest blueprint hints into the selected plan.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T22:07:34.627Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands passed: blueprint resolver recipe-hint tests, runner dry-run tests, typecheck, targeted eslint, schemas, docs CLI freshness, policy routing, doctor, and diff check.
  Impact: Recipes can influence compatible blueprint selection and context/evidence hints without overriding protected lifecycle gates.
  Resolution: Connected recipe manifest blueprint extensions to runner blueprint plan resolution and preserved resolver safeguards.
  Promotion: incident-candidate
  Fixability: external
