---
id: "202604291532-BV5NQT"
title: "Document and harden modular prompt migration"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604291531-864BKX"
tags:
  - "code"
  - "prompt-assembly"
  - "testing"
verify:
  - "agentplane doctor"
  - "bun run docs:scripts:check"
  - "bun run framework:dev:bootstrap"
  - "bun run typecheck"
  - "bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-29T15:32:45.720Z"
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
doc_updated_at: "2026-04-29T15:32:46.738Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add migration documentation, fixtures, and regression coverage for modular prompt assembly across init, upgrade, runner prompts, policy modules, agent profiles, and recipe-owned mutations."
sections:
  Summary: |-
    Document and harden modular prompt migration
    
    Add migration documentation, fixtures, and regression coverage for modular prompt assembly across init, upgrade, runner prompts, policy modules, agent profiles, and recipe-owned mutations.
  Scope: |-
    - In scope: developer/operator documentation for modular prompt assembly, recipe mutation extension points, verification commands, and safe-change boundaries.
    - In scope: fixtures/regression tests that lock the migration path and prevent silent drift back to ad hoc prompt assembly.
    - In scope: docs changes are part of this `code` task because the acceptance boundary includes regression fixtures and checks.
    - Out of scope: release publication and remote recipe catalog updates.
  Plan: |-
    1. Document the runtime surfaces: contracts, compiler, registry, init emission, recipe mutation layer, diagnostics, and verification.
    2. Add or refresh fixtures that future agents can use to validate prompt graph behavior.
    3. Add regression coverage for the migrated init/runner/recipe/doctor surfaces.
    4. Run docs checks, focused tests, typecheck, bootstrap, and doctor.
    5. Record verification evidence and leave remaining rollout risks explicit in Findings.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    7. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    8. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert docs and test fixture additions.
    - Keep implementation tasks intact if code checks still pass.
  Findings: "No findings yet."
id_source: "generated"
---
## Summary

Document and harden modular prompt migration

Add migration documentation, fixtures, and regression coverage for modular prompt assembly across init, upgrade, runner prompts, policy modules, agent profiles, and recipe-owned mutations.

## Scope

- In scope: developer/operator documentation for modular prompt assembly, recipe mutation extension points, verification commands, and safe-change boundaries.
- In scope: fixtures/regression tests that lock the migration path and prevent silent drift back to ad hoc prompt assembly.
- In scope: docs changes are part of this `code` task because the acceptance boundary includes regression fixtures and checks.
- Out of scope: release publication and remote recipe catalog updates.

## Plan

1. Document the runtime surfaces: contracts, compiler, registry, init emission, recipe mutation layer, diagnostics, and verification.
2. Add or refresh fixtures that future agents can use to validate prompt graph behavior.
3. Add regression coverage for the migrated init/runner/recipe/doctor surfaces.
4. Run docs checks, focused tests, typecheck, bootstrap, and doctor.
5. Record verification evidence and leave remaining rollout risks explicit in Findings.

## Verify Steps

1. Run `bun test packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts packages/agentplane/src/commands/recipes.transaction.test.ts packages/agentplane/src/commands/doctor.command.runtime.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
6. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
7. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
8. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert docs and test fixture additions.
- Keep implementation tasks intact if code checks still pass.

## Findings

No findings yet.
