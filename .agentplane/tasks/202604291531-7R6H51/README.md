---
id: "202604291531-7R6H51"
title: "Implement prompt module resolver and compiler"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604291531-NXHDEH"
tags:
  - "code"
  - "compiler"
  - "prompt-assembly"
verify:
  - "agentplane doctor"
  - "bun run framework:dev:bootstrap"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T15:31:30.064Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-29T15:31:31.153Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add the core resolver/compiler that evaluates PromptModule load conditions, dependencies, merge policies, replacement/extension bindings, conflict handling, and validator phases without changing init or recipe lifecycle surfaces yet."
sections:
  Summary: |-
    Implement prompt module resolver and compiler
    
    Add the core resolver/compiler that evaluates PromptModule load conditions, dependencies, merge policies, replacement/extension bindings, conflict handling, and validator phases without changing init or recipe lifecycle surfaces yet.
  Scope: |-
    - In scope: resolver/compiler runtime under `packages/agentplane/src/runtime/prompt-modules/`.
    - In scope: deterministic ordering, load-condition filtering, dependency validation, merge conflict behavior, binding resolution, and validator execution model.
    - Out of scope: init file emission, recipe manifest schema changes, and public CLI commands.
  Plan: |-
    1. Add compiler/resolver primitives next to existing prompt module contracts.
    2. Keep mutation types as contracts; implement execution over graph nodes and mutation sets without raw text patch semantics.
    3. Cover deterministic merge, conflict, dependency, condition, and validator behavior with focused tests.
    4. Export stable APIs from `runtime/prompt-modules/index.ts`.
    5. Run declared checks and record verification.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert compiler/resolver files and exports.
    - Keep existing model/mutation contracts unchanged unless the tests prove a contract correction is necessary.
  Findings: "No findings yet."
id_source: "generated"
---
## Summary

Implement prompt module resolver and compiler

Add the core resolver/compiler that evaluates PromptModule load conditions, dependencies, merge policies, replacement/extension bindings, conflict handling, and validator phases without changing init or recipe lifecycle surfaces yet.

## Scope

- In scope: resolver/compiler runtime under `packages/agentplane/src/runtime/prompt-modules/`.
- In scope: deterministic ordering, load-condition filtering, dependency validation, merge conflict behavior, binding resolution, and validator execution model.
- Out of scope: init file emission, recipe manifest schema changes, and public CLI commands.

## Plan

1. Add compiler/resolver primitives next to existing prompt module contracts.
2. Keep mutation types as contracts; implement execution over graph nodes and mutation sets without raw text patch semantics.
3. Cover deterministic merge, conflict, dependency, condition, and validator behavior with focused tests.
4. Export stable APIs from `runtime/prompt-modules/index.ts`.
5. Run declared checks and record verification.

## Verify Steps

1. Run `bun test packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert compiler/resolver files and exports.
- Keep existing model/mutation contracts unchanged unless the tests prove a contract correction is necessary.

## Findings

No findings yet.
