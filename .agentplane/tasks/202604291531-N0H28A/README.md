---
id: "202604291531-N0H28A"
title: "Apply recipe prompt mutations to compiled graph"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604291531-Z6XH6Q"
tags:
  - "code"
  - "prompt-assembly"
  - "recipes"
  - "workflow"
verify:
  - "agentplane doctor"
  - "bun run framework:dev:bootstrap"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/commands/recipes/impl/overlay-project.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T15:31:52.412Z"
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
doc_updated_at: "2026-04-29T15:31:53.377Z"
doc_updated_by: "ORCHESTRATOR"
description: "Wire installed and active recipe prompt module mutations into the compiled prompt graph refresh path so recipe enable/disable/update can affect generated prompt surfaces transactionally."
sections:
  Summary: |-
    Apply recipe prompt mutations to compiled graph
    
    Wire installed and active recipe prompt module mutations into the compiled prompt graph refresh path so recipe enable/disable/update can affect generated prompt surfaces transactionally.
  Scope: |-
    - In scope: apply active recipe prompt module mutations during project overlay/prompt graph refresh.
    - In scope: transactional behavior for install/enable/disable/update and conflict/requirement failures.
    - In scope: local artifact refresh only; no remote recipe index refresh unless separately approved.
    - Out of scope: adding new recipe catalog content.
  Plan: |-
    1. Identify current project overlay compile/refresh transaction boundaries.
    2. Apply active recipe module mutations through the prompt module compiler.
    3. Preserve existing overlay prompt behavior and command-aware matching semantics.
    4. Add transaction/conflict tests and ensure failed mutation application leaves prior artifacts intact.
    5. Run declared checks and record verification.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/recipes/impl/overlay-project.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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
    - Revert mutation application wiring while keeping manifest parsing if standalone.
    - Re-run recipe transaction and overlay tests to confirm previous overlay-only behavior.
  Findings: "No findings yet."
id_source: "generated"
---
## Summary

Apply recipe prompt mutations to compiled graph

Wire installed and active recipe prompt module mutations into the compiled prompt graph refresh path so recipe enable/disable/update can affect generated prompt surfaces transactionally.

## Scope

- In scope: apply active recipe prompt module mutations during project overlay/prompt graph refresh.
- In scope: transactional behavior for install/enable/disable/update and conflict/requirement failures.
- In scope: local artifact refresh only; no remote recipe index refresh unless separately approved.
- Out of scope: adding new recipe catalog content.

## Plan

1. Identify current project overlay compile/refresh transaction boundaries.
2. Apply active recipe module mutations through the prompt module compiler.
3. Preserve existing overlay prompt behavior and command-aware matching semantics.
4. Add transaction/conflict tests and ensure failed mutation application leaves prior artifacts intact.
5. Run declared checks and record verification.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/recipes/impl/overlay-project.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/commands/recipes.catalog-install.test.ts packages/agentplane/src/runtime/prompt-modules/compiler.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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

- Revert mutation application wiring while keeping manifest parsing if standalone.
- Re-run recipe transaction and overlay tests to confirm previous overlay-only behavior.

## Findings

No findings yet.
