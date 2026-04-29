---
id: "202604291531-7R6H51"
title: "Implement prompt module resolver and compiler"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
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
  state: "ok"
  updated_at: "2026-04-29T17:51:02.516Z"
  updated_by: "CODER"
  note: "Verified: prompt module resolver/compiler runtime and focused tests pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement the prompt module resolver and compiler on the dedicated branch_pr worktree after NXHDEH landed on main; scope is limited to runtime prompt-module compiler behavior and focused tests."
events:
  -
    type: "status"
    at: "2026-04-29T17:41:02.477Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the prompt module resolver and compiler on the dedicated branch_pr worktree after NXHDEH landed on main; scope is limited to runtime prompt-module compiler behavior and focused tests."
  -
    type: "verify"
    at: "2026-04-29T17:51:02.516Z"
    author: "CODER"
    state: "ok"
    note: "Verified: prompt module resolver/compiler runtime and focused tests pass."
doc_version: 3
doc_updated_at: "2026-04-29T17:51:02.523Z"
doc_updated_by: "CODER"
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
    ### 2026-04-29T17:51:02.516Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: prompt module resolver/compiler runtime and focused tests pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T17:41:02.477Z, excerpt_hash=sha256:c37ad2f17597f659684393548dfd43bcf8581bb874657f86a4315fa603fe61b7
    
    Details:
    
    Implemented compilePromptModuleGraph with load-condition filtering, structured mutations, bindings, duplicate merge policies, dependency diagnostics, and validator phase execution. Checks: bun test packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts => 9 pass; bun run typecheck => pass; git diff --check => pass; bun prettier --check and bun eslint on touched prompt-module files => pass; bun run framework:dev:bootstrap => pass; agentplane doctor => OK with info-only historical archive notes.
    
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
### 2026-04-29T17:51:02.516Z — VERIFY — ok

By: CODER

Note: Verified: prompt module resolver/compiler runtime and focused tests pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T17:41:02.477Z, excerpt_hash=sha256:c37ad2f17597f659684393548dfd43bcf8581bb874657f86a4315fa603fe61b7

Details:

Implemented compilePromptModuleGraph with load-condition filtering, structured mutations, bindings, duplicate merge policies, dependency diagnostics, and validator phase execution. Checks: bun test packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts => 9 pass; bun run typecheck => pass; git diff --check => pass; bun prettier --check and bun eslint on touched prompt-module files => pass; bun run framework:dev:bootstrap => pass; agentplane doctor => OK with info-only historical archive notes.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert compiler/resolver files and exports.
- Keep existing model/mutation contracts unchanged unless the tests prove a contract correction is necessary.

## Findings

No findings yet.
