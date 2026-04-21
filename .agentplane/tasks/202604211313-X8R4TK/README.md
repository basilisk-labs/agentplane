---
id: "202604211313-X8R4TK"
title: "Move config IO behind a flat public index"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604211312-AGQKVA"
tags:
  - "code"
  - "config"
  - "refactor"
verify:
  - "bun run typecheck"
  - "bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/commands/config*.test.ts --pool=forks --maxWorkers 4"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:03.185Z"
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
doc_updated_at: "2026-04-21T13:13:02.688Z"
doc_updated_by: "PLANNER"
description: "Move loadConfig/saveConfig and atomic write behavior into config/io.ts and expose the intended public surface through config/index or existing package exports."
sections:
  Summary: |-
    Move config IO behind a flat public index
    
    Move loadConfig/saveConfig and atomic write behavior into config/io.ts and expose the intended public surface through config/index or existing package exports.
  Scope: |-
    - In scope: Move loadConfig/saveConfig and atomic write behavior into config/io.ts and expose the intended public surface through config/index or existing package exports.
    - Out of scope: unrelated refactors not required for "Move config IO behind a flat public index".
  Plan: "Scope: make config module boundaries match responsibilities. Steps: 1. Move load/save logic out of the schema module path. 2. Update imports across core and agentplane. 3. Keep package-level exports backward-compatible unless a breaking removal is separately approved. 4. Verify command-level config behavior. Acceptance: config modules are responsibility-based and tests pass."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/commands/config*.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
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

Move config IO behind a flat public index

Move loadConfig/saveConfig and atomic write behavior into config/io.ts and expose the intended public surface through config/index or existing package exports.

## Scope

- In scope: Move loadConfig/saveConfig and atomic write behavior into config/io.ts and expose the intended public surface through config/index or existing package exports.
- Out of scope: unrelated refactors not required for "Move config IO behind a flat public index".

## Plan

Scope: make config module boundaries match responsibilities. Steps: 1. Move load/save logic out of the schema module path. 2. Update imports across core and agentplane. 3. Keep package-level exports backward-compatible unless a breaking removal is separately approved. 4. Verify command-level config behavior. Acceptance: config modules are responsibility-based and tests pass.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bunx vitest run packages/core/src/config/config.test.ts packages/agentplane/src/commands/config*.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
