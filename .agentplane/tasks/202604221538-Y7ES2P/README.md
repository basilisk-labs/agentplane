---
id: "202604221538-Y7ES2P"
title: "Define prompt module domain contracts"
result_summary: "Added prompt module domain contracts for v0.4 modular prompt assembly."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "code"
  - "prompt-assembly"
  - "v0.4"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T15:38:11.036Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T15:51:55.886Z"
  updated_by: "CODER"
  note: "Implemented v0.4 prompt module domain contracts with typed module addressing, ownership, surfaces, targets, slots, mutability, load conditions, merge policy, dependencies, graph nodes, and provenance."
commit:
  hash: "a1b48fa5c01a7adca60dc8de3957143598b09a51"
  message: "🏗️ Y7ES2P code: add prompt module contracts"
comments:
  -
    author: "CODER"
    body: "Start: implement the foundational v0.4 prompt module domain contracts first so downstream schema, compiler, recipe, and migration tasks share one typed model."
  -
    author: "CODER"
    body: "Verified: v0.4 prompt module domain contracts are implemented with typed addressing, ownership, surfaces, targets, slots, mutability, load conditions, merge policy, graph nodes, dependencies, and provenance; focused tests, typecheck, bootstrap, and doctor passed."
events:
  -
    type: "status"
    at: "2026-04-22T15:50:35.330Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the foundational v0.4 prompt module domain contracts first so downstream schema, compiler, recipe, and migration tasks share one typed model."
  -
    type: "verify"
    at: "2026-04-22T15:51:55.886Z"
    author: "CODER"
    state: "ok"
    note: "Implemented v0.4 prompt module domain contracts with typed module addressing, ownership, surfaces, targets, slots, mutability, load conditions, merge policy, dependencies, graph nodes, and provenance."
  -
    type: "status"
    at: "2026-04-22T15:53:34.659Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: v0.4 prompt module domain contracts are implemented with typed addressing, ownership, surfaces, targets, slots, mutability, load conditions, merge policy, graph nodes, dependencies, and provenance; focused tests, typecheck, bootstrap, and doctor passed."
doc_version: 3
doc_updated_at: "2026-04-22T15:53:34.659Z"
doc_updated_by: "CODER"
description: "Add v0.4 domain types for prompt modules, module ownership, surfaces, targets, slots, mutability, load conditions, merge policy, and provenance."
sections:
  Summary: |-
    Define prompt module domain contracts
    
    Add v0.4 domain types for prompt modules, module ownership, surfaces, targets, slots, mutability, load conditions, merge policy, and provenance.
  Scope: |-
    - In scope: Add v0.4 domain types for prompt modules, module ownership, surfaces, targets, slots, mutability, load conditions, merge policy, and provenance.
    - Out of scope: unrelated refactors not required for "Define prompt module domain contracts".
  Plan: |-
    Goal: Define prompt module domain contracts
    
    Plan:
    1. Inspect the current implementation and tests around this scope.
    2. Make the smallest implementation change that satisfies the task contract.
    3. Add or update focused tests and fixtures for the changed behavior.
    4. Update docs or generated schemas only when the code-facing contract changes.
    
    Acceptance:
    - Module contracts cover gateway, policy, agent, runner, validator, and template surfaces with typed ids and provenance.
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
    ### 2026-04-22T15:51:55.886Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented v0.4 prompt module domain contracts with typed module addressing, ownership, surfaces, targets, slots, mutability, load conditions, merge policy, dependencies, graph nodes, and provenance.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T15:50:35.337Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: bunx prettier --check packages/agentplane/src/runtime/prompt-modules/model.ts packages/agentplane/src/runtime/prompt-modules/index.ts packages/agentplane/src/runtime/prompt-modules/model.test.ts .agentplane/tasks/202604221538-Y7ES2P/README.md; bunx vitest --config vitest.workspace.ts run packages/agentplane/src/runtime/prompt-modules/model.test.ts --project agentplane; bun run typecheck; git diff --check; bun run framework:dev:bootstrap; agentplane doctor. An earlier broad vitest invocation unintentionally ran 212 agentplane files and failed one unrelated cold-path measurement; side-effect branch/tag/task drift was removed and the focused test passed afterward.
      Impact: Downstream schema, compiler, recipe, and migration tasks can import one stable prompt module contract instead of inventing separate address/provenance shapes.
      Resolution: Kept behavior unhooked from compiler/runtime assembly in this atom; added focused examples for locked framework modules and recipe extensions.
id_source: "generated"
---
## Summary

Define prompt module domain contracts

Add v0.4 domain types for prompt modules, module ownership, surfaces, targets, slots, mutability, load conditions, merge policy, and provenance.

## Scope

- In scope: Add v0.4 domain types for prompt modules, module ownership, surfaces, targets, slots, mutability, load conditions, merge policy, and provenance.
- Out of scope: unrelated refactors not required for "Define prompt module domain contracts".

## Plan

Goal: Define prompt module domain contracts

Plan:
1. Inspect the current implementation and tests around this scope.
2. Make the smallest implementation change that satisfies the task contract.
3. Add or update focused tests and fixtures for the changed behavior.
4. Update docs or generated schemas only when the code-facing contract changes.

Acceptance:
- Module contracts cover gateway, policy, agent, runner, validator, and template surfaces with typed ids and provenance.
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
### 2026-04-22T15:51:55.886Z — VERIFY — ok

By: CODER

Note: Implemented v0.4 prompt module domain contracts with typed module addressing, ownership, surfaces, targets, slots, mutability, load conditions, merge policy, dependencies, graph nodes, and provenance.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T15:50:35.337Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands passed: bunx prettier --check packages/agentplane/src/runtime/prompt-modules/model.ts packages/agentplane/src/runtime/prompt-modules/index.ts packages/agentplane/src/runtime/prompt-modules/model.test.ts .agentplane/tasks/202604221538-Y7ES2P/README.md; bunx vitest --config vitest.workspace.ts run packages/agentplane/src/runtime/prompt-modules/model.test.ts --project agentplane; bun run typecheck; git diff --check; bun run framework:dev:bootstrap; agentplane doctor. An earlier broad vitest invocation unintentionally ran 212 agentplane files and failed one unrelated cold-path measurement; side-effect branch/tag/task drift was removed and the focused test passed afterward.
  Impact: Downstream schema, compiler, recipe, and migration tasks can import one stable prompt module contract instead of inventing separate address/provenance shapes.
  Resolution: Kept behavior unhooked from compiler/runtime assembly in this atom; added focused examples for locked framework modules and recipe extensions.
