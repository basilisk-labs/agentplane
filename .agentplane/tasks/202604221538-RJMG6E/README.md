---
id: "202604221538-RJMG6E"
title: "Define prompt mutation and binding contracts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604221538-Y7ES2P"
tags:
  - "architecture"
  - "code"
  - "prompt-assembly"
  - "recipes"
  - "v0.4"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T15:38:12.485Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T15:55:37.432Z"
  updated_by: "CODER"
  note: "Implemented prompt mutation and binding contracts for recipe-driven module changes: add, replace, structured patch, disable, bind, add validator, and disable validator."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: define explicit prompt mutation and binding contracts on top of the new prompt module model so recipes can add, replace, disable, bind, and validate modules without raw text patching."
events:
  -
    type: "status"
    at: "2026-04-22T15:54:01.858Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: define explicit prompt mutation and binding contracts on top of the new prompt module model so recipes can add, replace, disable, bind, and validate modules without raw text patching."
  -
    type: "verify"
    at: "2026-04-22T15:55:37.432Z"
    author: "CODER"
    state: "ok"
    note: "Implemented prompt mutation and binding contracts for recipe-driven module changes: add, replace, structured patch, disable, bind, add validator, and disable validator."
doc_version: 3
doc_updated_at: "2026-04-22T15:55:44.163Z"
doc_updated_by: "CODER"
description: "Add typed contracts for recipe prompt mutations and bindings, including add, patch, replace, disable, bind, validator operations, and condition matching."
sections:
  Summary: |-
    Define prompt mutation and binding contracts

    Add typed contracts for recipe prompt mutations and bindings, including add, patch, replace, disable, bind, validator operations, and condition matching.
  Scope: |-
    - In scope: Add typed contracts for recipe prompt mutations and bindings, including add, patch, replace, disable, bind, validator operations, and condition matching.
    - Out of scope: unrelated refactors not required for "Define prompt mutation and binding contracts".
  Plan: |-
    Goal: Define prompt mutation and binding contracts

    Plan:
    1. Inspect the current implementation and tests around this scope.
    2. Make the smallest implementation change that satisfies the task contract.
    3. Add or update focused tests and fixtures for the changed behavior.
    4. Update docs or generated schemas only when the code-facing contract changes.

    Acceptance:
    - Mutation and binding contracts reject raw text patches and model explicit targets, slots, ordering, and when predicates.
    - Existing public behavior outside this scope is preserved.
    - Verification evidence is recorded before finish.

    Rollback Plan:
    - Revert this task commit and rerun the focused verification commands.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T15:55:37.432Z — VERIFY — ok

    By: CODER

    Note: Implemented prompt mutation and binding contracts for recipe-driven module changes: add, replace, structured patch, disable, bind, add validator, and disable validator.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T15:54:01.867Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: bunx prettier --write/check scoped prompt-module files and task README; bunx vitest --config vitest.workspace.ts run packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts --project agentplane; bun run typecheck; git diff --check; bun run framework:dev:bootstrap; agentplane doctor.
      Impact: Recipe and compiler tasks can now target modules through explicit selectors and structured operations instead of raw text patching.
      Resolution: Kept contracts type-only; mutation engine behavior remains for the later TAEV8T task.
id_source: "generated"
---
## Summary

Define prompt mutation and binding contracts

Add typed contracts for recipe prompt mutations and bindings, including add, patch, replace, disable, bind, validator operations, and condition matching.

## Scope

- In scope: Add typed contracts for recipe prompt mutations and bindings, including add, patch, replace, disable, bind, validator operations, and condition matching.
- Out of scope: unrelated refactors not required for "Define prompt mutation and binding contracts".

## Plan

Goal: Define prompt mutation and binding contracts

Plan:
1. Inspect the current implementation and tests around this scope.
2. Make the smallest implementation change that satisfies the task contract.
3. Add or update focused tests and fixtures for the changed behavior.
4. Update docs or generated schemas only when the code-facing contract changes.

Acceptance:
- Mutation and binding contracts reject raw text patches and model explicit targets, slots, ordering, and when predicates.
- Existing public behavior outside this scope is preserved.
- Verification evidence is recorded before finish.

Rollback Plan:
- Revert this task commit and rerun the focused verification commands.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T15:55:37.432Z — VERIFY — ok

By: CODER

Note: Implemented prompt mutation and binding contracts for recipe-driven module changes: add, replace, structured patch, disable, bind, add validator, and disable validator.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T15:54:01.867Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands passed: bunx prettier --write/check scoped prompt-module files and task README; bunx vitest --config vitest.workspace.ts run packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts --project agentplane; bun run typecheck; git diff --check; bun run framework:dev:bootstrap; agentplane doctor.
  Impact: Recipe and compiler tasks can now target modules through explicit selectors and structured operations instead of raw text patching.
  Resolution: Kept contracts type-only; mutation engine behavior remains for the later TAEV8T task.
