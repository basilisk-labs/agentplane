---
id: "202604211311-DZTRN8"
title: "Migrate schema task logger and fs imports to core subpaths"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604211311-WZCXTF"
tags:
  - "architecture"
  - "build"
  - "code"
verify:
  - "bun run arch:check"
  - "bun run schemas:check"
  - "bun run test:project -- cli-unit"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:12:00.121Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: migrate schema, task, logger, and fs root core imports to published core subpaths using the completed import inventory."
events:
  -
    type: "status"
    at: "2026-04-21T16:00:51.755Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate schema, task, logger, and fs root core imports to published core subpaths using the completed import inventory."
doc_version: 3
doc_updated_at: "2026-04-21T16:00:51.773Z"
doc_updated_by: "CODER"
description: "Switch schema, task, logger, and filesystem imports from @agentplaneorg/core root to the matching subpath exports."
sections:
  Summary: |-
    Migrate schema task logger and fs imports to core subpaths
    
    Switch schema, task, logger, and filesystem imports from @agentplaneorg/core root to the matching subpath exports.
  Scope: |-
    - In scope: Switch schema, task, logger, and filesystem imports from @agentplaneorg/core root to the matching subpath exports.
    - Out of scope: unrelated refactors not required for "Migrate schema task logger and fs imports to core subpaths".
  Plan: "Scope: finish internal monorepo subpath import adoption. Steps: 1. Move schema validators/types to @agentplaneorg/core/schemas. 2. Move task artifact/task store types to @agentplaneorg/core/tasks. 3. Move logger imports to @agentplaneorg/core/logger and fs helpers to @agentplaneorg/core/fs. 4. Add missing subpath exports only when the symbol already belongs to that domain. Acceptance: internal packages no longer use root @agentplaneorg/core except documented aggregate cases; schema checks and typecheck pass."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Migrate schema task logger and fs imports to core subpaths

Switch schema, task, logger, and filesystem imports from @agentplaneorg/core root to the matching subpath exports.

## Scope

- In scope: Switch schema, task, logger, and filesystem imports from @agentplaneorg/core root to the matching subpath exports.
- Out of scope: unrelated refactors not required for "Migrate schema task logger and fs imports to core subpaths".

## Plan

Scope: finish internal monorepo subpath import adoption. Steps: 1. Move schema validators/types to @agentplaneorg/core/schemas. 2. Move task artifact/task store types to @agentplaneorg/core/tasks. 3. Move logger imports to @agentplaneorg/core/logger and fs helpers to @agentplaneorg/core/fs. 4. Add missing subpath exports only when the symbol already belongs to that domain. Acceptance: internal packages no longer use root @agentplaneorg/core except documented aggregate cases; schema checks and typecheck pass.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
