---
id: "202604251626-BX2JXQ"
title: "Refactor task plan and finish spec surfaces"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604251626-FQBWH9"
tags:
  - "code"
  - "refactor"
verify:
  - "bun run docs:cli:check && bun run typecheck && bun run lint:core"
  - "bun run test:project -- agentplane packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-04-25T16:49:48.265Z"
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
    body: "Start: Refactor the task plan or finish command surface using one low-risk extraction, preserving command flags, generated help, and existing task behavior."
events:
  -
    type: "status"
    at: "2026-04-25T16:49:57.568Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Refactor the task plan or finish command surface using one low-risk extraction, preserving command flags, generated help, and existing task behavior."
doc_version: 3
doc_updated_at: "2026-04-25T16:54:11.084Z"
doc_updated_by: "CODER"
description: "Reduce task plan and finish spec hotspots by extracting spec option groups and render/validation helpers without changing command flags or generated help."
sections:
  Summary: |-
    Refactor task plan and finish spec surfaces
    
    Reduce task plan and finish spec hotspots by extracting spec option groups and render/validation helpers without changing command flags or generated help.
  Scope: |-
    - In scope: Reduce task plan and finish spec hotspots by extracting spec option groups and render/validation helpers without changing command flags or generated help.
    - Out of scope: unrelated refactors not required for "Refactor task plan and finish spec surfaces".
  Plan: |-
    1. Inspect commands/task/plan.ts and commands/finish.spec.ts for the smallest low-risk extraction boundary.
    2. Prefer one coherent extraction if both files together would widen scope; record any deferred half in Findings.
    3. Preserve command flags, generated help, and task plan behavior.
    4. Run focused plan/finish/help tests plus docs:cli check when command spec changes, then typecheck/lint/hotspot gates.
  Verify Steps: |-
    1. Run `bun run test:project -- agentplane packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:cli:check && bun run typecheck && bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Extracted task plan backend and document validation helpers into plan-shared.ts; plan.ts is now below the runtime hotspot warning threshold while preserving command entrypoints.
      Impact: Reduced the task plan command surface without changing generated help, flags, or plan approval behavior.
      Resolution: Deferred finish.spec.ts extraction to a separate atom because its size is mostly declarative option and raw validation surface.
    
    - Observation: Full format:check remains blocked by unrelated untracked REFACTORING_PLAN_v3.md in the repository root.
      Impact: This task can verify touched files with targeted Prettier, but cannot honestly claim the whole-repo format gate in the current dirty checkout.
      Resolution: Left the untracked file untouched and used targeted Prettier checks for all files modified by this atom.
id_source: "generated"
---
## Summary

Refactor task plan and finish spec surfaces

Reduce task plan and finish spec hotspots by extracting spec option groups and render/validation helpers without changing command flags or generated help.

## Scope

- In scope: Reduce task plan and finish spec hotspots by extracting spec option groups and render/validation helpers without changing command flags or generated help.
- Out of scope: unrelated refactors not required for "Refactor task plan and finish spec surfaces".

## Plan

1. Inspect commands/task/plan.ts and commands/finish.spec.ts for the smallest low-risk extraction boundary.
2. Prefer one coherent extraction if both files together would widen scope; record any deferred half in Findings.
3. Preserve command flags, generated help, and task plan behavior.
4. Run focused plan/finish/help tests plus docs:cli check when command spec changes, then typecheck/lint/hotspot gates.

## Verify Steps

1. Run `bun run test:project -- agentplane packages/agentplane/src/cli/run-cli.core.lifecycle.plan.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:cli:check && bun run typecheck && bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Extracted task plan backend and document validation helpers into plan-shared.ts; plan.ts is now below the runtime hotspot warning threshold while preserving command entrypoints.
  Impact: Reduced the task plan command surface without changing generated help, flags, or plan approval behavior.
  Resolution: Deferred finish.spec.ts extraction to a separate atom because its size is mostly declarative option and raw validation surface.

- Observation: Full format:check remains blocked by unrelated untracked REFACTORING_PLAN_v3.md in the repository root.
  Impact: This task can verify touched files with targeted Prettier, but cannot honestly claim the whole-repo format gate in the current dirty checkout.
  Resolution: Left the untracked file untouched and used targeted Prettier checks for all files modified by this atom.
