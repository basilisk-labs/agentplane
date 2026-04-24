---
id: "202604241137-Z82PKG"
title: "v0.3 freeze F1: simplify core config schema naming"
status: "TODO"
priority: "normal"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "config"
  - "v0.3"
verify:
  - "bun run docs:recipes:check"
  - "bun run typecheck"
  - "rg -n 'config-zod|config/schema' packages/core packages/agentplane packages/recipes"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-24T11:37:16.143Z"
doc_updated_by: "CODER"
description: "Rename the concrete Zod config schema implementation and remove thin schema shim confusion while preserving public core exports."
sections:
  Summary: |-
    v0.3 freeze F1: simplify core config schema naming
    
    Rename the concrete Zod config schema implementation and remove thin schema shim confusion while preserving public core exports.
  Scope: |-
    - In scope: Rename the concrete Zod config schema implementation and remove thin schema shim confusion while preserving public core exports.
    - Out of scope: unrelated refactors not required for "v0.3 freeze F1: simplify core config schema naming".
  Plan: |-
    1. Implement the change for "v0.3 freeze F1: simplify core config schema naming".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:recipes:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `rg -n 'config-zod|config/schema' packages/core packages/agentplane packages/recipes`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

v0.3 freeze F1: simplify core config schema naming

Rename the concrete Zod config schema implementation and remove thin schema shim confusion while preserving public core exports.

## Scope

- In scope: Rename the concrete Zod config schema implementation and remove thin schema shim confusion while preserving public core exports.
- Out of scope: unrelated refactors not required for "v0.3 freeze F1: simplify core config schema naming".

## Plan

1. Implement the change for "v0.3 freeze F1: simplify core config schema naming".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:recipes:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `rg -n 'config-zod|config/schema' packages/core packages/agentplane packages/recipes`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
