---
id: "202604211311-76QNYV"
title: "Extract command catalog kernel"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "cli"
  - "code"
verify:
  - "bun run arch:check"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog.test.ts --pool=forks --maxWorkers 4"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:11:17.289Z"
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
doc_updated_at: "2026-04-21T13:11:16.257Z"
doc_updated_by: "PLANNER"
description: "Break the command-catalog type/runtime cycle by extracting RunDeps, command module typing, and commandModule factory into a command-catalog kernel module that imports no concrete command loaders or catalog registries."
sections:
  Summary: |-
    Extract command catalog kernel
    
    Break the command-catalog type/runtime cycle by extracting RunDeps, command module typing, and commandModule factory into a command-catalog kernel module that imports no concrete command loaders or catalog registries.
  Scope: |-
    - In scope: Break the command-catalog type/runtime cycle by extracting RunDeps, command module typing, and commandModule factory into a command-catalog kernel module that imports no concrete command loaders or catalog registries.
    - Out of scope: unrelated refactors not required for "Extract command catalog kernel".
  Plan: "Scope: create a dependency-neutral kernel for command catalog primitives. Steps: 1. Inspect current command-catalog/shared.ts, command-catalog.ts, and command-loaders.ts import graph. 2. Move only shared types/factory code into a new kernel module with no imports from concrete catalogs/loaders. 3. Update existing catalog modules to import the kernel. 4. Preserve public command behavior and generated CLI docs. Acceptance: dep-cruiser no-circular count must not increase; command catalog tests and typecheck pass; no command registration behavior changes."
  Verify Steps: |-
    1. Run `bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
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

Extract command catalog kernel

Break the command-catalog type/runtime cycle by extracting RunDeps, command module typing, and commandModule factory into a command-catalog kernel module that imports no concrete command loaders or catalog registries.

## Scope

- In scope: Break the command-catalog type/runtime cycle by extracting RunDeps, command module typing, and commandModule factory into a command-catalog kernel module that imports no concrete command loaders or catalog registries.
- Out of scope: unrelated refactors not required for "Extract command catalog kernel".

## Plan

Scope: create a dependency-neutral kernel for command catalog primitives. Steps: 1. Inspect current command-catalog/shared.ts, command-catalog.ts, and command-loaders.ts import graph. 2. Move only shared types/factory code into a new kernel module with no imports from concrete catalogs/loaders. 3. Update existing catalog modules to import the kernel. 4. Preserve public command behavior and generated CLI docs. Acceptance: dep-cruiser no-circular count must not increase; command catalog tests and typecheck pass; no command registration behavior changes.

## Verify Steps

1. Run `bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bunx vitest run packages/agentplane/src/cli/run-cli/command-catalog.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
