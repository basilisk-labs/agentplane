---
id: "202604211313-RWHSDK"
title: "Remove command git shim imports"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604211311-WZCXTF"
tags:
  - "cleanup"
  - "code"
  - "git"
verify:
  - "bun run arch:check"
  - "bun run knip:check"
  - "bun run test:project -- cli-unit"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:54.403Z"
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
doc_updated_at: "2026-04-21T13:13:53.450Z"
doc_updated_by: "PLANNER"
description: "Replace command-layer git shim imports with direct @agentplaneorg/core/git imports and delete one-line git shim files that become unused."
sections:
  Summary: |-
    Remove command git shim imports
    
    Replace command-layer git shim imports with direct @agentplaneorg/core/git imports and delete one-line git shim files that become unused.
  Scope: |-
    - In scope: Replace command-layer git shim imports with direct @agentplaneorg/core/git imports and delete one-line git shim files that become unused.
    - Out of scope: unrelated refactors not required for "Remove command git shim imports".
  Plan: "Scope: close the most obvious shared-directory cleanup without a broad rename. Steps: 1. Inventory commands/shared/git*.ts one-line shims and their users. 2. Migrate users to @agentplaneorg/core/git or real command git-ops modules. 3. Delete unused shims. 4. Keep adapters with actual logic. Acceptance: one-line git shim files are gone or justified; knip and arch checks pass."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run knip:check`. Expected: it succeeds and confirms the requested outcome for this task.
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

Remove command git shim imports

Replace command-layer git shim imports with direct @agentplaneorg/core/git imports and delete one-line git shim files that become unused.

## Scope

- In scope: Replace command-layer git shim imports with direct @agentplaneorg/core/git imports and delete one-line git shim files that become unused.
- Out of scope: unrelated refactors not required for "Remove command git shim imports".

## Plan

Scope: close the most obvious shared-directory cleanup without a broad rename. Steps: 1. Inventory commands/shared/git*.ts one-line shims and their users. 2. Migrate users to @agentplaneorg/core/git or real command git-ops modules. 3. Delete unused shims. 4. Keep adapters with actual logic. Acceptance: one-line git shim files are gone or justified; knip and arch checks pass.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run knip:check`. Expected: it succeeds and confirms the requested outcome for this task.
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
