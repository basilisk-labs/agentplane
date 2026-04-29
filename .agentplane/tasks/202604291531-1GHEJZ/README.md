---
id: "202604291531-1GHEJZ"
title: "Create framework prompt module registry"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202604291531-7R6H51"
tags:
  - "agents"
  - "code"
  - "policy"
  - "prompt-assembly"
  - "registry"
verify:
  - "agentplane doctor"
  - "bun run framework:dev:bootstrap"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/runtime/prompt-modules/registry.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T15:31:34.609Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-29T18:05:07.478Z"
  updated_by: "CODER"
  note: "Verified framework prompt module registry: focused registry/compiler/template tests passed (20 tests), typecheck passed, git diff --check passed, framework bootstrap passed, doctor passed with 0 errors and 0 warnings."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Build the framework prompt module registry on top of the landed compiler/runtime contracts; scope is limited to framework-owned registry modules and focused runtime tests."
events:
  -
    type: "status"
    at: "2026-04-29T17:57:09.235Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Build the framework prompt module registry on top of the landed compiler/runtime contracts; scope is limited to framework-owned registry modules and focused runtime tests."
  -
    type: "verify"
    at: "2026-04-29T18:05:07.478Z"
    author: "CODER"
    state: "ok"
    note: "Verified framework prompt module registry: focused registry/compiler/template tests passed (20 tests), typecheck passed, git diff --check passed, framework bootstrap passed, doctor passed with 0 errors and 0 warnings."
doc_version: 3
doc_updated_at: "2026-04-29T18:05:07.525Z"
doc_updated_by: "CODER"
description: "Convert bundled framework prompt sources into a registry of PromptModules for AGENTS/CLAUDE gateway templates, policy modules, agent profile JSON templates, runner prompts, and runtime execution profile prompts without changing emitted files yet."
sections:
  Summary: |-
    Create framework prompt module registry
    
    Convert bundled framework prompt sources into a registry of PromptModules for AGENTS/CLAUDE gateway templates, policy modules, agent profile JSON templates, runner prompts, and runtime execution profile prompts without changing emitted files yet.
  Scope: |-
    - In scope: framework-owned PromptModule registry for bundled gateway, policy, agent profile, runner, and execution-profile prompt sources.
    - In scope: stable addresses, owner metadata, provenance, content hashes, and load conditions matching workflow/policy gateway flavor where needed.
    - Out of scope: changing `agentplane init` output and recipe-owned mutations.
  Plan: |-
    1. Inspect existing loaders in `agents-template.ts`, runner prompt sources, and init write paths.
    2. Add a framework registry that wraps those sources as framework-owned modules.
    3. Preserve existing loader behavior while making the registry testable.
    4. Add focused registry tests for address stability and source parity.
    5. Run declared checks and record verification.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/runtime/prompt-modules/registry.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-29T18:05:07.478Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified framework prompt module registry: focused registry/compiler/template tests passed (20 tests), typecheck passed, git diff --check passed, framework bootstrap passed, doctor passed with 0 errors and 0 warnings.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T17:57:09.235Z, excerpt_hash=sha256:4032c679e7e641ef6cb329aff1ce304ec36a5a131f94b691e5834ef771f7f871
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert registry files and exports.
    - Existing template loaders should continue to serve init/runner paths directly.
  Findings: "No findings yet."
id_source: "generated"
---
## Summary

Create framework prompt module registry

Convert bundled framework prompt sources into a registry of PromptModules for AGENTS/CLAUDE gateway templates, policy modules, agent profile JSON templates, runner prompts, and runtime execution profile prompts without changing emitted files yet.

## Scope

- In scope: framework-owned PromptModule registry for bundled gateway, policy, agent profile, runner, and execution-profile prompt sources.
- In scope: stable addresses, owner metadata, provenance, content hashes, and load conditions matching workflow/policy gateway flavor where needed.
- Out of scope: changing `agentplane init` output and recipe-owned mutations.

## Plan

1. Inspect existing loaders in `agents-template.ts`, runner prompt sources, and init write paths.
2. Add a framework registry that wraps those sources as framework-owned modules.
3. Preserve existing loader behavior while making the registry testable.
4. Add focused registry tests for address stability and source parity.
5. Run declared checks and record verification.

## Verify Steps

1. Run `bun test packages/agentplane/src/agents/agents-template.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/runtime/prompt-modules/registry.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-29T18:05:07.478Z — VERIFY — ok

By: CODER

Note: Verified framework prompt module registry: focused registry/compiler/template tests passed (20 tests), typecheck passed, git diff --check passed, framework bootstrap passed, doctor passed with 0 errors and 0 warnings.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T17:57:09.235Z, excerpt_hash=sha256:4032c679e7e641ef6cb329aff1ce304ec36a5a131f94b691e5834ef771f7f871

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert registry files and exports.
- Existing template loaders should continue to serve init/runner paths directly.

## Findings

No findings yet.
