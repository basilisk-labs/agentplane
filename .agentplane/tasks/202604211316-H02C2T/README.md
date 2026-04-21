---
id: "202604211316-H02C2T"
title: "Extract init v2 prompt steps"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604211315-S9T6XF"
tags:
  - "cli"
  - "code"
  - "init"
verify:
  - "bun run test:project -- cli-unit"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/cli/run-cli/commands/init/steps/*.test.ts --pool=forks --maxWorkers 4"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:16:07.308Z"
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
    body: "Start: extract pure init v2 prompt step modules and focused tests; keep orchestrator integration for the dependent task."
events:
  -
    type: "status"
    at: "2026-04-21T15:46:43.724Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract pure init v2 prompt step modules and focused tests; keep orchestrator integration for the dependent task."
doc_version: 3
doc_updated_at: "2026-04-21T15:46:43.739Z"
doc_updated_by: "CODER"
description: "Create pure init v2 prompt step modules for setup profile, policy gateway, IDE, workflow, backend, advanced settings, and recipe selection."
sections:
  Summary: |-
    Extract init v2 prompt steps
    
    Create pure init v2 prompt step modules for setup profile, policy gateway, IDE, workflow, backend, advanced settings, and recipe selection.
  Scope: |-
    - In scope: Create pure init v2 prompt step modules for setup profile, policy gateway, IDE, workflow, backend, advanced settings, and recipe selection.
    - Out of scope: unrelated refactors not required for "Extract init v2 prompt steps".
  Plan: "Scope: implement atom #3. Steps: 1. Add init/steps modules for each prompt family. 2. Each step takes clack and flags/presets, returns typed answers, and has no filesystem mutation. 3. Mock @clack/prompts in focused unit tests. 4. Preserve existing setupProfile/config semantics. Acceptance: step tests cover normal answers and cancellation where relevant; no legacy flow changes."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bunx vitest run packages/agentplane/src/cli/run-cli/commands/init/steps/*.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
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

Extract init v2 prompt steps

Create pure init v2 prompt step modules for setup profile, policy gateway, IDE, workflow, backend, advanced settings, and recipe selection.

## Scope

- In scope: Create pure init v2 prompt step modules for setup profile, policy gateway, IDE, workflow, backend, advanced settings, and recipe selection.
- Out of scope: unrelated refactors not required for "Extract init v2 prompt steps".

## Plan

Scope: implement atom #3. Steps: 1. Add init/steps modules for each prompt family. 2. Each step takes clack and flags/presets, returns typed answers, and has no filesystem mutation. 3. Mock @clack/prompts in focused unit tests. 4. Preserve existing setupProfile/config semantics. Acceptance: step tests cover normal answers and cancellation where relevant; no legacy flow changes.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bunx vitest run packages/agentplane/src/cli/run-cli/commands/init/steps/*.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
