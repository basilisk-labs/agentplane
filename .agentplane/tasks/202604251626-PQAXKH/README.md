---
id: "202604251626-PQAXKH"
title: "Refactor doctor workspace diagnostics"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604251625-VVQM9Y"
tags:
  - "code"
  - "refactor"
verify:
  - "bun run test:project -- agentplane packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/commands/doctor.command.open-pr.test.ts"
  - "bun run typecheck && bun run lint:core && bun run arch:check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-25T16:36:14.800Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-25T16:41:14.466Z"
  updated_by: "CODER"
  note: "Doctor workspace task-state extraction passed focused doctor tests, typecheck, lint, architecture, touched-file formatting, hotspot, task/artifact gates, and diff checks; full format:check is blocked by unrelated untracked REFACTORING_PLAN_v3.md."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Refactoring doctor workspace diagnostics as the second sequential atom, preserving doctor behavior and focused diagnostics tests."
events:
  -
    type: "status"
    at: "2026-04-25T16:36:31.156Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Refactoring doctor workspace diagnostics as the second sequential atom, preserving doctor behavior and focused diagnostics tests."
  -
    type: "verify"
    at: "2026-04-25T16:41:14.466Z"
    author: "CODER"
    state: "ok"
    note: "Doctor workspace task-state extraction passed focused doctor tests, typecheck, lint, architecture, touched-file formatting, hotspot, task/artifact gates, and diff checks; full format:check is blocked by unrelated untracked REFACTORING_PLAN_v3.md."
doc_version: 3
doc_updated_at: "2026-04-25T16:41:29.242Z"
doc_updated_by: "CODER"
description: "Extract doctor workspace checks and rendering into focused helpers so workspace.ts drops below hotspot threshold while doctor output and fix behavior stay unchanged."
sections:
  Summary: |-
    Refactor doctor workspace diagnostics
    
    Extract doctor workspace checks and rendering into focused helpers so workspace.ts drops below hotspot threshold while doctor output and fix behavior stay unchanged.
  Scope: |-
    - In scope: Extract doctor workspace checks and rendering into focused helpers so workspace.ts drops below hotspot threshold while doctor output and fix behavior stay unchanged.
    - Out of scope: unrelated refactors not required for "Refactor doctor workspace diagnostics".
  Plan: |-
    1. Inspect doctor workspace diagnostics and tests to identify a pure extraction boundary.
    2. Move workspace diagnostic formatting or low-level checks into focused helpers while preserving cmdDoctor behavior and output.
    3. Keep public doctor command surfaces unchanged.
    4. Run focused doctor tests plus typecheck/lint/arch/hotspot gates, record verification, and finish with traceable commits.
  Verify Steps: |-
    1. Run `bun run test:project -- agentplane packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/commands/doctor.command.open-pr.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck && bun run lint:core && bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-25T16:41:14.466Z — VERIFY — ok
    
    By: CODER
    
    Note: Doctor workspace task-state extraction passed focused doctor tests, typecheck, lint, architecture, touched-file formatting, hotspot, task/artifact gates, and diff checks; full format:check is blocked by unrelated untracked REFACTORING_PLAN_v3.md.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T16:36:31.176Z, excerpt_hash=sha256:20555562956871a097d4e2441e7f0b842381e2bb05a24c0b16d2c09a93934877
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Command: bun run test:project -- agentplane packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/commands/doctor.command.open-pr.test.ts
      Result: pass. Evidence: 2 files, 29 tests passed. Scope: doctor runtime diagnostics and open-PR/workspace drift behavior.
    - Command: bun run typecheck; bun run lint:core; bun run arch:check; git diff --check
      Result: pass. Evidence: each command exited 0. Scope: type safety, lint, dependency boundaries, whitespace.
    - Command: bunx prettier --check packages/agentplane/src/commands/doctor/workspace.ts packages/agentplane/src/commands/doctor/workspace-task-state.ts .agentplane/tasks/202604251626-PQAXKH/README.md
      Result: pass. Evidence: touched files use Prettier style. Scope: changed files only.
    - Command: bun run format:check
      Result: blocked outside scope. Evidence: fails on unrelated untracked REFACTORING_PLAN_v3.md. Scope: not used as acceptance for this atom because that file was not created or modified by this task.
    - Command: node scripts/hotspot-report.mjs --check
      Result: pass. Evidence: runtime hotspot warning count dropped from 12 to 11; commands/doctor/workspace.ts is no longer listed. Scope: hotspot budget for this atom.
    - Command: node scripts/check-task-state.mjs; node scripts/check-agentplane-artifacts.mjs
      Result: pass. Evidence: task state OK, artifact policy OK. Scope: task and artifact hygiene.
    - Residual: next scheduled atom is 202604251626-FQBWH9 for commands/shared/task-backend.ts.
id_source: "generated"
---
## Summary

Refactor doctor workspace diagnostics

Extract doctor workspace checks and rendering into focused helpers so workspace.ts drops below hotspot threshold while doctor output and fix behavior stay unchanged.

## Scope

- In scope: Extract doctor workspace checks and rendering into focused helpers so workspace.ts drops below hotspot threshold while doctor output and fix behavior stay unchanged.
- Out of scope: unrelated refactors not required for "Refactor doctor workspace diagnostics".

## Plan

1. Inspect doctor workspace diagnostics and tests to identify a pure extraction boundary.
2. Move workspace diagnostic formatting or low-level checks into focused helpers while preserving cmdDoctor behavior and output.
3. Keep public doctor command surfaces unchanged.
4. Run focused doctor tests plus typecheck/lint/arch/hotspot gates, record verification, and finish with traceable commits.

## Verify Steps

1. Run `bun run test:project -- agentplane packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/commands/doctor.command.open-pr.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck && bun run lint:core && bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-25T16:41:14.466Z — VERIFY — ok

By: CODER

Note: Doctor workspace task-state extraction passed focused doctor tests, typecheck, lint, architecture, touched-file formatting, hotspot, task/artifact gates, and diff checks; full format:check is blocked by unrelated untracked REFACTORING_PLAN_v3.md.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T16:36:31.176Z, excerpt_hash=sha256:20555562956871a097d4e2441e7f0b842381e2bb05a24c0b16d2c09a93934877

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Command: bun run test:project -- agentplane packages/agentplane/src/commands/doctor.command.runtime.test.ts packages/agentplane/src/commands/doctor.command.open-pr.test.ts
  Result: pass. Evidence: 2 files, 29 tests passed. Scope: doctor runtime diagnostics and open-PR/workspace drift behavior.
- Command: bun run typecheck; bun run lint:core; bun run arch:check; git diff --check
  Result: pass. Evidence: each command exited 0. Scope: type safety, lint, dependency boundaries, whitespace.
- Command: bunx prettier --check packages/agentplane/src/commands/doctor/workspace.ts packages/agentplane/src/commands/doctor/workspace-task-state.ts .agentplane/tasks/202604251626-PQAXKH/README.md
  Result: pass. Evidence: touched files use Prettier style. Scope: changed files only.
- Command: bun run format:check
  Result: blocked outside scope. Evidence: fails on unrelated untracked REFACTORING_PLAN_v3.md. Scope: not used as acceptance for this atom because that file was not created or modified by this task.
- Command: node scripts/hotspot-report.mjs --check
  Result: pass. Evidence: runtime hotspot warning count dropped from 12 to 11; commands/doctor/workspace.ts is no longer listed. Scope: hotspot budget for this atom.
- Command: node scripts/check-task-state.mjs; node scripts/check-agentplane-artifacts.mjs
  Result: pass. Evidence: task state OK, artifact policy OK. Scope: task and artifact hygiene.
- Residual: next scheduled atom is 202604251626-FQBWH9 for commands/shared/task-backend.ts.
