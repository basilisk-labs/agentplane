---
id: "202604291531-Z6XH6Q"
title: "Extend recipe manifests with prompt module mutations"
result_summary: "Merged via PR #573."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202604291531-Y7XR4M"
tags:
  - "code"
  - "prompt-assembly"
  - "recipes"
  - "schemas"
verify:
  - "bun test packages/agentplane/src/commands/recipes/impl/project-installed-recipes.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts"
  - "bun run typecheck"
  - "git diff --check"
  - "bun run framework:dev:bootstrap"
  - "agentplane doctor"
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T15:31:47.923Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-29T18:54:21.158Z"
  updated_by: "CODER"
  note: "Recipe manifests now accept prompt_modules and prompt_mutation_sets JSON assets, validate recipe-owned module/mutation-set shape and provenance, and publish them into recipe-assets without applying them to overlay prompt surfaces."
commit:
  hash: "c6921130172066fcc900247a012f37b06d7d6b93"
  message: "prompt-assembly/recipes: Extend recipe manifests with prompt module mutations (Z6XH6Q) (#573)"
comments:
  -
    author: "CODER"
    body: "Start: Extend installed recipe and overlay schema support so recipes can declare prompt modules and structured prompt module mutation sets, without applying those mutations to generated prompt artifacts yet."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #573 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-29T18:36:29.448Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extend installed recipe and overlay schema support so recipes can declare prompt modules and structured prompt module mutation sets, without applying those mutations to generated prompt artifacts yet."
  -
    type: "verify"
    at: "2026-04-29T18:54:21.158Z"
    author: "CODER"
    state: "ok"
    note: "Recipe manifests now accept prompt_modules and prompt_mutation_sets JSON assets, validate recipe-owned module/mutation-set shape and provenance, and publish them into recipe-assets without applying them to overlay prompt surfaces."
  -
    type: "status"
    at: "2026-04-29T18:59:32.646Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #573 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-29T18:59:32.652Z"
doc_updated_by: "INTEGRATOR"
description: "Extend recipe/project overlay schema support so vendored recipes can declare prompt modules and structured prompt module mutations with validated asset references, without applying them to compiled init surfaces yet."
sections:
  Summary: |-
    Extend recipe manifests with prompt module mutations
    
    Extend recipe/project overlay schema support so vendored recipes can declare prompt modules and structured prompt module mutations with validated asset references, without applying them to compiled init surfaces yet.
  Scope: |-
    - In scope: recipe manifest/project overlay parsing for prompt module declarations and mutation sets.
    - In scope: validation for referenced module assets, recipe provenance, schema compatibility, and safe failure messages.
    - Out of scope: applying recipe mutations to generated prompt artifacts or changing public scenario behavior.
  Plan: |-
    1. Locate current recipe manifest parsing and installed recipe validation surfaces.
    2. Add schema/runtime support for prompt module assets and structured mutation sets.
    3. Validate file references, recipe ownership, and unsupported mutation forms.
    4. Add focused tests for manifest acceptance/rejection and resolver compatibility.
    5. Run declared checks and record verification.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/recipes.impl/project-installed-recipes.test.ts packages/agentplane/src/commands/recipes.impl/resolver.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-29T18:54:21.158Z — VERIFY — ok
    
    By: CODER
    
    Note: Recipe manifests now accept prompt_modules and prompt_mutation_sets JSON assets, validate recipe-owned module/mutation-set shape and provenance, and publish them into recipe-assets without applying them to overlay prompt surfaces.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T18:36:29.448Z, excerpt_hash=sha256:67decb3079de4dcba454a3c7f82fd80e3c563588801e6a5bef285bf65fe87f21
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert recipe schema/parser changes and tests.
    - Existing recipe install/active commands should continue to ignore prompt module fields.
  Findings: |-
    No findings yet.
    
    - Observation: Checks passed: bun test packages/agentplane/src/commands/recipes/impl/project-installed-recipes.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts; bun run typecheck; git diff --check; bun run framework:dev:bootstrap; agentplane doctor; extra bun test packages/recipes/src/index.test.ts packages/recipes/src/overlay.test.ts; targeted eslint on touched files.
      Impact: Recipes can declare modular prompt assets and structured mutation sets with validated file references and recipe provenance for later recipe-application work.
      Resolution: No prompt graph application was added in this step; that remains for the dependent recipe application task.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Extend recipe manifests with prompt module mutations

Extend recipe/project overlay schema support so vendored recipes can declare prompt modules and structured prompt module mutations with validated asset references, without applying them to compiled init surfaces yet.

## Scope

- In scope: recipe manifest/project overlay parsing for prompt module declarations and mutation sets.
- In scope: validation for referenced module assets, recipe provenance, schema compatibility, and safe failure messages.
- Out of scope: applying recipe mutations to generated prompt artifacts or changing public scenario behavior.

## Plan

1. Locate current recipe manifest parsing and installed recipe validation surfaces.
2. Add schema/runtime support for prompt module assets and structured mutation sets.
3. Validate file references, recipe ownership, and unsupported mutation forms.
4. Add focused tests for manifest acceptance/rejection and resolver compatibility.
5. Run declared checks and record verification.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/recipes.impl/project-installed-recipes.test.ts packages/agentplane/src/commands/recipes.impl/resolver.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
6. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
7. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-29T18:54:21.158Z — VERIFY — ok

By: CODER

Note: Recipe manifests now accept prompt_modules and prompt_mutation_sets JSON assets, validate recipe-owned module/mutation-set shape and provenance, and publish them into recipe-assets without applying them to overlay prompt surfaces.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-29T18:36:29.448Z, excerpt_hash=sha256:67decb3079de4dcba454a3c7f82fd80e3c563588801e6a5bef285bf65fe87f21

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert recipe schema/parser changes and tests.
- Existing recipe install/active commands should continue to ignore prompt module fields.

## Findings

No findings yet.

- Observation: Checks passed: bun test packages/agentplane/src/commands/recipes/impl/project-installed-recipes.test.ts packages/agentplane/src/commands/recipes/impl/resolver.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts; bun run typecheck; git diff --check; bun run framework:dev:bootstrap; agentplane doctor; extra bun test packages/recipes/src/index.test.ts packages/recipes/src/overlay.test.ts; targeted eslint on touched files.
  Impact: Recipes can declare modular prompt assets and structured mutation sets with validated file references and recipe provenance for later recipe-application work.
  Resolution: No prompt graph application was added in this step; that remains for the dependent recipe application task.
  Promotion: incident-candidate
  Fixability: external
