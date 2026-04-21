---
id: "202604211312-AGQKVA"
title: "Split core config schema and defaults"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-21T13:12:58.252Z"
doc_updated_by: "PLANNER"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
