---
id: "202605021909-XANHF2"
title: "Materialize active recipe mutations into managed prompt files"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605021909-2GJ5SR"
tags:
  - "code"
  - "prompt-assembly"
  - "recipes"
verify:
  - "agentplane doctor"
  - "bun test packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T19:10:06.506Z"
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
doc_updated_at: "2026-05-02T19:09:52.092Z"
doc_updated_by: "ORCHESTRATOR"
description: "Implement recipe activation materialization so active recipe prompt mutations update AgentPlane-managed source prompt files through fragment-aware operations, while generated prompt graph remains the validation and diagnostics artifact."
sections:
  Summary: |-
    Materialize active recipe mutations into managed prompt files
    
    Implement recipe activation materialization so active recipe prompt mutations update AgentPlane-managed source prompt files through fragment-aware operations, while generated prompt graph remains the validation and diagnostics artifact.
  Scope: |-
    - In scope: Implement recipe activation materialization so active recipe prompt mutations update AgentPlane-managed source prompt files through fragment-aware operations, while generated prompt graph remains the validation and diagnostics artifact.
    - Out of scope: unrelated refactors not required for "Materialize active recipe mutations into managed prompt files".
  Plan: |-
    Goal: make active recipe mutations materialize into AgentPlane-managed prompt source files through fragment-aware operations.
    
    Steps:
    1. Add a materialization stage for recipe activation/update/disable where active mutation sets target managed prompt fragments.
    2. Persist registry state and materialized source updates transactionally.
    3. Keep generated prompt graph as validation/diagnostic output derived from the same materialized model.
    4. Add focused transaction and mutation tests.
    
    Acceptance:
    - recipe activation does not rely only on hidden generated overlays.
    - AGENTS.md/policy/agent profile changes are managed, fragment-targeted, and validated.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Materialize active recipe mutations into managed prompt files

Implement recipe activation materialization so active recipe prompt mutations update AgentPlane-managed source prompt files through fragment-aware operations, while generated prompt graph remains the validation and diagnostics artifact.

## Scope

- In scope: Implement recipe activation materialization so active recipe prompt mutations update AgentPlane-managed source prompt files through fragment-aware operations, while generated prompt graph remains the validation and diagnostics artifact.
- Out of scope: unrelated refactors not required for "Materialize active recipe mutations into managed prompt files".

## Plan

Goal: make active recipe mutations materialize into AgentPlane-managed prompt source files through fragment-aware operations.

Steps:
1. Add a materialization stage for recipe activation/update/disable where active mutation sets target managed prompt fragments.
2. Persist registry state and materialized source updates transactionally.
3. Keep generated prompt graph as validation/diagnostic output derived from the same materialized model.
4. Add focused transaction and mutation tests.

Acceptance:
- recipe activation does not rely only on hidden generated overlays.
- AGENTS.md/policy/agent profile changes are managed, fragment-targeted, and validated.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
