---
id: "202605021909-2GJ5SR"
title: "Add managed user instructions fragment"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605021908-BGE36D"
tags:
  - "code"
  - "prompt-assembly"
  - "recipes"
verify:
  - "agentplane doctor"
  - "bun test packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T19:10:03.258Z"
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
doc_updated_at: "2026-05-02T19:09:51.844Z"
doc_updated_by: "ORCHESTRATOR"
description: "Introduce gateway.user.instructions as the sanctioned user-editable prompt extension point and wire framework prompt assets/docs so user instructions stay separate from AgentPlane-managed source files."
sections:
  Summary: |-
    Add managed user instructions fragment
    
    Introduce gateway.user.instructions as the sanctioned user-editable prompt extension point and wire framework prompt assets/docs so user instructions stay separate from AgentPlane-managed source files.
  Scope: |-
    - In scope: Introduce gateway.user.instructions as the sanctioned user-editable prompt extension point and wire framework prompt assets/docs so user instructions stay separate from AgentPlane-managed source files.
    - Out of scope: unrelated refactors not required for "Add managed user instructions fragment".
  Plan: |-
    Goal: introduce gateway.user.instructions as the explicit user-editable prompt extension point.
    
    Steps:
    1. Add/adjust framework prompt fragments so the gateway exposes a stable user instruction hook.
    2. Add project/runtime handling for a dedicated user instructions source without encouraging manual edits to managed prompt files.
    3. Update focused tests/docs for prompt fragment discovery and runner prompt loading.
    4. Verify focused prompt/runner tests and doctor.
    
    Acceptance:
    - User instructions are represented as a named fragment or stable prompt block.
    - Managed prompt sources stay AgentPlane-owned, with user custom text isolated.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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

Add managed user instructions fragment

Introduce gateway.user.instructions as the sanctioned user-editable prompt extension point and wire framework prompt assets/docs so user instructions stay separate from AgentPlane-managed source files.

## Scope

- In scope: Introduce gateway.user.instructions as the sanctioned user-editable prompt extension point and wire framework prompt assets/docs so user instructions stay separate from AgentPlane-managed source files.
- Out of scope: unrelated refactors not required for "Add managed user instructions fragment".

## Plan

Goal: introduce gateway.user.instructions as the explicit user-editable prompt extension point.

Steps:
1. Add/adjust framework prompt fragments so the gateway exposes a stable user instruction hook.
2. Add project/runtime handling for a dedicated user instructions source without encouraging manual edits to managed prompt files.
3. Update focused tests/docs for prompt fragment discovery and runner prompt loading.
4. Verify focused prompt/runner tests and doctor.

Acceptance:
- User instructions are represented as a named fragment or stable prompt block.
- Managed prompt sources stay AgentPlane-owned, with user custom text isolated.

## Verify Steps

1. Run `bun test packages/agentplane/src/runtime/prompt-modules/registry.test.ts packages/agentplane/src/runner/context/base-prompts.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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
