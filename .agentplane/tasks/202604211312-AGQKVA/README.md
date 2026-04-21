---
id: "202604211312-AGQKVA"
title: "Split core config schema and defaults"
result_summary: "Added config/schema.ts and config/defaults.ts, moved defaultConfig and dotted-key helpers out of config.ts, and kept config.ts as the backward-compatible public IO facade."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604211311-DZTRN8"
tags:
  - "code"
  - "config"
  - "refactor"
verify:
  - "bun run schemas:check"
  - "bun run typecheck"
  - "bunx vitest run packages/core/src/config/config.test.ts --pool=forks --maxWorkers 4"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:12:58.913Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T16:41:10.742Z"
  updated_by: "CODER"
  note: "Verified core config split: bunx vitest config/execution-profile tests passed (8 project/file executions, 96 tests); bun run typecheck passed; bun run lint:core passed; bun run --filter=@agentplaneorg/core build passed; bun run format:check passed; git diff --check passed."
commit:
  hash: "882fcc37ba24c02c9fe9e821331f30f06a849572"
  message: "♻️ AGQKVA config: split schema and defaults"
comments:
  -
    author: "CODER"
    body: "Start: split core config schema/default responsibilities after subpath import migration."
  -
    author: "CODER"
    body: "Verified: core config schema/default split. Checks: config/execution-profile Vitest suite; bun run typecheck; bun run lint:core; bun run --filter=@agentplaneorg/core build; bun run format:check; git diff --check."
events:
  -
    type: "status"
    at: "2026-04-21T16:19:46.192Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split core config schema/default responsibilities after subpath import migration."
  -
    type: "verify"
    at: "2026-04-21T16:41:10.742Z"
    author: "CODER"
    state: "ok"
    note: "Verified core config split: bunx vitest config/execution-profile tests passed (8 project/file executions, 96 tests); bun run typecheck passed; bun run lint:core passed; bun run --filter=@agentplaneorg/core build passed; bun run format:check passed; git diff --check passed."
  -
    type: "status"
    at: "2026-04-21T16:41:17.994Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: core config schema/default split. Checks: config/execution-profile Vitest suite; bun run typecheck; bun run lint:core; bun run --filter=@agentplaneorg/core build; bun run format:check; git diff --check."
doc_version: 3
doc_updated_at: "2026-04-21T16:41:17.995Z"
doc_updated_by: "CODER"
description: "Refactor core config into schema/defaults/execution/io modules without changing the public config behavior."
sections:
  Summary: |-
    Split core config schema and defaults
    
    Refactor core config into schema/defaults/execution/io modules without changing the public config behavior.
  Scope: |-
    - In scope: Refactor core config into schema/defaults/execution/io modules without changing the public config behavior.
    - Out of scope: unrelated refactors not required for "Split core config schema and defaults".
  Plan: "Scope: reduce config-zod/config duality while preserving behavior. Steps: 1. Move pure Zod schema definitions into config/schema.ts. 2. Move defaultConfig and dotted-key helpers into config/defaults.ts. 3. Keep execution profile logic isolated in execution.ts or existing equivalent. 4. Preserve current public exports through config index files. Acceptance: config tests and generated schema checks pass; no config file format changes."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bunx vitest run packages/core/src/config/config.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-21T16:41:10.742Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified core config split: bunx vitest config/execution-profile tests passed (8 project/file executions, 96 tests); bun run typecheck passed; bun run lint:core passed; bun run --filter=@agentplaneorg/core build passed; bun run format:check passed; git diff --check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:19:46.201Z, excerpt_hash=sha256:e79b6711ef59d1ecc315d21e7759130e7da3d873a2a4741c14733769f9dafa6e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Split core config schema and defaults

Refactor core config into schema/defaults/execution/io modules without changing the public config behavior.

## Scope

- In scope: Refactor core config into schema/defaults/execution/io modules without changing the public config behavior.
- Out of scope: unrelated refactors not required for "Split core config schema and defaults".

## Plan

Scope: reduce config-zod/config duality while preserving behavior. Steps: 1. Move pure Zod schema definitions into config/schema.ts. 2. Move defaultConfig and dotted-key helpers into config/defaults.ts. 3. Keep execution profile logic isolated in execution.ts or existing equivalent. 4. Preserve current public exports through config index files. Acceptance: config tests and generated schema checks pass; no config file format changes.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bunx vitest run packages/core/src/config/config.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-21T16:41:10.742Z — VERIFY — ok

By: CODER

Note: Verified core config split: bunx vitest config/execution-profile tests passed (8 project/file executions, 96 tests); bun run typecheck passed; bun run lint:core passed; bun run --filter=@agentplaneorg/core build passed; bun run format:check passed; git diff --check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:19:46.201Z, excerpt_hash=sha256:e79b6711ef59d1ecc315d21e7759130e7da3d873a2a4741c14733769f9dafa6e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
