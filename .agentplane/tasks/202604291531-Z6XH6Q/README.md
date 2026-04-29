---
id: "202604291531-Z6XH6Q"
title: "Extend recipe manifests with prompt module mutations"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-29T15:31:48.894Z"
doc_updated_by: "ORCHESTRATOR"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert recipe schema/parser changes and tests.
    - Existing recipe install/active commands should continue to ignore prompt module fields.
  Findings: "No findings yet."
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert recipe schema/parser changes and tests.
- Existing recipe install/active commands should continue to ignore prompt module fields.

## Findings

No findings yet.
