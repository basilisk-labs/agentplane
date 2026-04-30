---
id: "202604300725-3CY7TE"
title: "Enforce recipe fragment mutability and E2E patch coverage"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604300725-SS9694"
tags:
  - "code"
  - "prompt-assembly"
  - "recipes"
  - "release"
  - "testing"
verify:
  - "agentplane doctor"
  - "bun run framework:dev:bootstrap"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/commands/recipes/impl/project-installed-recipes.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-30T07:26:53.580Z"
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
doc_updated_at: "2026-04-30T07:26:49.190Z"
doc_updated_by: "ORCHESTRATOR"
description: "Close the remaining correctness gap for fragmented prompts by enforcing mutation rules for locked, replaceable, extendable, and append-only fragments, and adding an end-to-end active recipe regression that patches a real named framework fragment through the compiled prompt graph."
sections:
  Summary: |-
    Enforce recipe fragment mutability and E2E patch coverage
    
    Close the remaining correctness gap for fragmented prompts by enforcing mutation rules for locked, replaceable, extendable, and append-only fragments, and adding an end-to-end active recipe regression that patches a real named framework fragment through the compiled prompt graph.
  Scope: |-
    - In scope: Close the remaining correctness gap for fragmented prompts by enforcing mutation rules for locked, replaceable, extendable, and append-only fragments, and adding an end-to-end active recipe regression that patches a real named framework fragment through the compiled prompt graph.
    - Out of scope: unrelated refactors not required for "Enforce recipe fragment mutability and E2E patch coverage".
  Plan: |-
    1. Define concrete recipe mutation semantics for locked, replaceable, extendable, and append_only prompt fragments.
    2. Implement the smallest compiler validation needed to reject unsafe recipe mutations while preserving allowed patch/replace/disable behavior.
    3. Add focused compiler tests for allowed and rejected fragment mutations.
    4. Add an end-to-end active recipe regression that targets a real framework fragment through target.fragment_id and verifies the compiled graph output.
    5. Verify targeted tests, typecheck, diff check, framework bootstrap, and doctor.
    6. Publish through branch_pr and close after hosted merge.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/commands/recipes/impl/project-installed-recipes.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Enforce recipe fragment mutability and E2E patch coverage

Close the remaining correctness gap for fragmented prompts by enforcing mutation rules for locked, replaceable, extendable, and append-only fragments, and adding an end-to-end active recipe regression that patches a real named framework fragment through the compiled prompt graph.

## Scope

- In scope: Close the remaining correctness gap for fragmented prompts by enforcing mutation rules for locked, replaceable, extendable, and append-only fragments, and adding an end-to-end active recipe regression that patches a real named framework fragment through the compiled prompt graph.
- Out of scope: unrelated refactors not required for "Enforce recipe fragment mutability and E2E patch coverage".

## Plan

1. Define concrete recipe mutation semantics for locked, replaceable, extendable, and append_only prompt fragments.
2. Implement the smallest compiler validation needed to reject unsafe recipe mutations while preserving allowed patch/replace/disable behavior.
3. Add focused compiler tests for allowed and rejected fragment mutations.
4. Add an end-to-end active recipe regression that targets a real framework fragment through target.fragment_id and verifies the compiled graph output.
5. Verify targeted tests, typecheck, diff check, framework bootstrap, and doctor.
6. Publish through branch_pr and close after hosted merge.

## Verify Steps

1. Run `bun test packages/agentplane/src/runtime/prompt-modules/compiler.test.ts packages/agentplane/src/commands/recipes/impl/project-installed-recipes.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
