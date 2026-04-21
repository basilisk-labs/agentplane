---
id: "202604211311-DZTRN8"
title: "Migrate schema task logger and fs imports to core subpaths"
result_summary: "Migrated schema/task/logger/fs consumers to core subpath imports and left intentional root core imports for non-subpath surfaces."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-21T16:16:06.147Z"
  updated_by: "CODER"
  note: "Verified schema/task/logger/fs root-import migration: targeted root import scanner count=0; bun run typecheck passed; bun run lint:core passed after type-only cleanup; bun run arch:check passed; bun run test:project -- cli-unit passed (62 files, 624 tests); bun run format:check passed; git diff --check passed."
commit:
  hash: "d9d402c76e3d435d48ac0e6061c5266962375820"
  message: "♻️ DZTRN8 core: use schema task logger fs subpaths"
comments:
  -
    author: "CODER"
    body: "Start: migrate schema, task, logger, and fs root core imports to published core subpaths using the completed import inventory."
  -
    author: "CODER"
    body: "Verified: schema/task/logger/fs root-import migration. Checks: targeted root import scanner count=0; bun run typecheck; bun run lint:core; bun run arch:check; bun run test:project -- cli-unit; bun run format:check; git diff --check."
events:
  -
    type: "status"
    at: "2026-04-21T16:00:51.755Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate schema, task, logger, and fs root core imports to published core subpaths using the completed import inventory."
  -
    type: "verify"
    at: "2026-04-21T16:16:06.147Z"
    author: "CODER"
    state: "ok"
    note: "Verified schema/task/logger/fs root-import migration: targeted root import scanner count=0; bun run typecheck passed; bun run lint:core passed after type-only cleanup; bun run arch:check passed; bun run test:project -- cli-unit passed (62 files, 624 tests); bun run format:check passed; git diff --check passed."
  -
    type: "status"
    at: "2026-04-21T16:16:17.274Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: schema/task/logger/fs root-import migration. Checks: targeted root import scanner count=0; bun run typecheck; bun run lint:core; bun run arch:check; bun run test:project -- cli-unit; bun run format:check; git diff --check."
doc_version: 3
doc_updated_at: "2026-04-21T16:16:17.274Z"
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
    ### 2026-04-21T16:16:06.147Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified schema/task/logger/fs root-import migration: targeted root import scanner count=0; bun run typecheck passed; bun run lint:core passed after type-only cleanup; bun run arch:check passed; bun run test:project -- cli-unit passed (62 files, 624 tests); bun run format:check passed; git diff --check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:00:51.773Z, excerpt_hash=sha256:6eebd6f9b92527503e848bd6d18df0283d659ae281b9800473329d3f75d6717f
    
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
### 2026-04-21T16:16:06.147Z — VERIFY — ok

By: CODER

Note: Verified schema/task/logger/fs root-import migration: targeted root import scanner count=0; bun run typecheck passed; bun run lint:core passed after type-only cleanup; bun run arch:check passed; bun run test:project -- cli-unit passed (62 files, 624 tests); bun run format:check passed; git diff --check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:00:51.773Z, excerpt_hash=sha256:6eebd6f9b92527503e848bd6d18df0283d659ae281b9800473329d3f75d6717f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
