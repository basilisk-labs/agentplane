---
id: "202604241137-Z82PKG"
title: "v0.3 freeze F1: simplify core config schema naming"
status: "DOING"
priority: "normal"
owner: "CODER"
revision: 5
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
  state: "approved"
  updated_at: "2026-04-24T13:27:22.176Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-24T13:33:53.182Z"
  updated_by: "CODER"
  note: "Verified F1: typecheck, docs:recipes:check, focused core config tests, core build, old config-zod/schema reference grep, format:check, git diff --check, framework bootstrap, and doctor all pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: rename the concrete core config schema implementation, remove the thin schema shim, and keep public core exports stable."
events:
  -
    type: "status"
    at: "2026-04-24T13:27:33.364Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: rename the concrete core config schema implementation, remove the thin schema shim, and keep public core exports stable."
  -
    type: "verify"
    at: "2026-04-24T13:33:53.182Z"
    author: "CODER"
    state: "ok"
    note: "Verified F1: typecheck, docs:recipes:check, focused core config tests, core build, old config-zod/schema reference grep, format:check, git diff --check, framework bootstrap, and doctor all pass."
doc_version: 3
doc_updated_at: "2026-04-24T13:33:53.215Z"
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
    1. Rename packages/core/src/config/config-zod.ts to packages/core/src/config/schema.impl.ts as the single concrete Zod config schema implementation.
    2. Delete the thin packages/core/src/config/schema.ts shim and update internal imports/exports to reference schema.impl.ts while preserving public @agentplaneorg/core/config and @agentplaneorg/core/schemas surfaces.
    3. Run typecheck, docs:recipes:check, grep for old config-zod/config/schema references in packages, format/diff checks, core build, and doctor.
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:recipes:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `rg -n 'config-zod|config/schema' packages/core packages/agentplane packages/recipes`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T13:33:53.182Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified F1: typecheck, docs:recipes:check, focused core config tests, core build, old config-zod/schema reference grep, format:check, git diff --check, framework bootstrap, and doctor all pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T13:27:33.388Z, excerpt_hash=sha256:2e55ea74f2e1e61ca6dc4faf35a8bba7a3bb98b07278020179ca8d149c8e68f0
    
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

1. Rename packages/core/src/config/config-zod.ts to packages/core/src/config/schema.impl.ts as the single concrete Zod config schema implementation.
2. Delete the thin packages/core/src/config/schema.ts shim and update internal imports/exports to reference schema.impl.ts while preserving public @agentplaneorg/core/config and @agentplaneorg/core/schemas surfaces.
3. Run typecheck, docs:recipes:check, grep for old config-zod/config/schema references in packages, format/diff checks, core build, and doctor.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:recipes:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `rg -n 'config-zod|config/schema' packages/core packages/agentplane packages/recipes`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T13:33:53.182Z — VERIFY — ok

By: CODER

Note: Verified F1: typecheck, docs:recipes:check, focused core config tests, core build, old config-zod/schema reference grep, format:check, git diff --check, framework bootstrap, and doctor all pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T13:27:33.388Z, excerpt_hash=sha256:2e55ea74f2e1e61ca6dc4faf35a8bba7a3bb98b07278020179ca8d149c8e68f0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
