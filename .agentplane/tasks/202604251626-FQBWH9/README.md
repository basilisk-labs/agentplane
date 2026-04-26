---
id: "202604251626-FQBWH9"
title: "Refactor command task-backend context"
result_summary: "Extracted branch snapshot task loading into task-backend-branch-snapshot.ts; commands/shared/task-backend.ts is no longer a hotspot."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604251626-PQAXKH"
tags:
  - "code"
  - "refactor"
verify:
  - "bun run test:project -- agentplane packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts"
  - "bun run typecheck && bun run lint:core && bun run arch:check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-25T16:42:51.497Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-25T16:46:57.397Z"
  updated_by: "CODER"
  note: "Task-backend branch snapshot extraction passed focused task-backend tests, cli-core lifecycle/listing tests, typecheck, lint, architecture, touched-file formatting, hotspot, task/artifact gates, and diff checks; full format:check remains blocked by unrelated untracked REFACTORING_PLAN_v3.md."
commit:
  hash: "428c0b9bf87378eb3be561a35be4274f715c0600"
  message: "♻️ FQBWH9 task: split task backend branch snapshots"
comments:
  -
    author: "CODER"
    body: "Start: Refactoring commands/shared/task-backend.ts as the third sequential atom, preserving command context API and backend projection behavior."
  -
    author: "CODER"
    body: "Verified: task backend branch snapshot split passed focused tests and repository gates; unrelated untracked REFACTORING_PLAN_v3.md remains outside scope."
events:
  -
    type: "status"
    at: "2026-04-25T16:42:59.106Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Refactoring commands/shared/task-backend.ts as the third sequential atom, preserving command context API and backend projection behavior."
  -
    type: "verify"
    at: "2026-04-25T16:46:57.397Z"
    author: "CODER"
    state: "ok"
    note: "Task-backend branch snapshot extraction passed focused task-backend tests, cli-core lifecycle/listing tests, typecheck, lint, architecture, touched-file formatting, hotspot, task/artifact gates, and diff checks; full format:check remains blocked by unrelated untracked REFACTORING_PLAN_v3.md."
  -
    type: "status"
    at: "2026-04-25T16:47:55.555Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: task backend branch snapshot split passed focused tests and repository gates; unrelated untracked REFACTORING_PLAN_v3.md remains outside scope."
doc_version: 3
doc_updated_at: "2026-04-25T16:47:55.556Z"
doc_updated_by: "CODER"
description: "Split commands/shared/task-backend.ts by context loading, validation, and backend projection helpers while preserving command context API and backend behavior."
sections:
  Summary: |-
    Refactor command task-backend context
    
    Split commands/shared/task-backend.ts by context loading, validation, and backend projection helpers while preserving command context API and backend behavior.
  Scope: |-
    - In scope: Split commands/shared/task-backend.ts by context loading, validation, and backend projection helpers while preserving command context API and backend behavior.
    - Out of scope: unrelated refactors not required for "Refactor command task-backend context".
  Plan: |-
    1. Inspect commands/shared/task-backend.ts and its tests to locate low-risk extraction boundaries.
    2. Extract focused context-loading or projection helpers while preserving exported APIs used by command handlers.
    3. Avoid backend behavior changes; keep imports and errors compatible.
    4. Run focused task-backend and task lifecycle/listing tests plus typecheck/lint/arch/hotspot checks, record verification, and finish.
  Verify Steps: |-
    1. Run `bun run test:project -- agentplane packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck && bun run lint:core && bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-25T16:46:57.397Z — VERIFY — ok
    
    By: CODER
    
    Note: Task-backend branch snapshot extraction passed focused task-backend tests, cli-core lifecycle/listing tests, typecheck, lint, architecture, touched-file formatting, hotspot, task/artifact gates, and diff checks; full format:check remains blocked by unrelated untracked REFACTORING_PLAN_v3.md.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T16:42:59.131Z, excerpt_hash=sha256:ed5a9e4ef205ac0ee3ebf4389491646f7aa795e5bd5ae874257123cec8b24304
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Command: bun run test:project -- agentplane packages/agentplane/src/commands/shared/task-backend.test.ts
      Result: pass. Evidence: 1 file, 9 tests passed. Scope: CommandContext loading and branch snapshot fallback behavior.
    - Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts
      Result: pass. Evidence: 2 files, 36 tests passed. Scope: CLI lifecycle/listing behavior over command context and task projection.
    - Command: bun run typecheck; bun run lint:core; bun run arch:check; git diff --check
      Result: pass. Evidence: each command exited 0. Scope: type safety, lint, dependency boundaries, whitespace.
    - Command: bunx prettier --check packages/agentplane/src/commands/shared/task-backend.ts packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts .agentplane/tasks/202604251626-FQBWH9/README.md
      Result: pass. Evidence: touched files use Prettier style. Scope: changed files only.
    - Command: bun run format:check
      Result: blocked outside scope. Evidence: fails on unrelated untracked REFACTORING_PLAN_v3.md. Scope: not used as acceptance for this atom because that file was not created or modified by this task.
    - Command: node scripts/hotspot-report.mjs --check
      Result: pass. Evidence: runtime hotspot warning count dropped from 11 to 10; commands/shared/task-backend.ts is no longer listed. Scope: hotspot budget for this atom.
    - Command: node scripts/check-task-state.mjs; node scripts/check-agentplane-artifacts.mjs
      Result: pass. Evidence: task state OK, artifact policy OK. Scope: task and artifact hygiene.
    - Residual: next scheduled atom is 202604251626-BX2JXQ for task plan and finish spec surfaces.
id_source: "generated"
---
## Summary

Refactor command task-backend context

Split commands/shared/task-backend.ts by context loading, validation, and backend projection helpers while preserving command context API and backend behavior.

## Scope

- In scope: Split commands/shared/task-backend.ts by context loading, validation, and backend projection helpers while preserving command context API and backend behavior.
- Out of scope: unrelated refactors not required for "Refactor command task-backend context".

## Plan

1. Inspect commands/shared/task-backend.ts and its tests to locate low-risk extraction boundaries.
2. Extract focused context-loading or projection helpers while preserving exported APIs used by command handlers.
3. Avoid backend behavior changes; keep imports and errors compatible.
4. Run focused task-backend and task lifecycle/listing tests plus typecheck/lint/arch/hotspot checks, record verification, and finish.

## Verify Steps

1. Run `bun run test:project -- agentplane packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck && bun run lint:core && bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-25T16:46:57.397Z — VERIFY — ok

By: CODER

Note: Task-backend branch snapshot extraction passed focused task-backend tests, cli-core lifecycle/listing tests, typecheck, lint, architecture, touched-file formatting, hotspot, task/artifact gates, and diff checks; full format:check remains blocked by unrelated untracked REFACTORING_PLAN_v3.md.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T16:42:59.131Z, excerpt_hash=sha256:ed5a9e4ef205ac0ee3ebf4389491646f7aa795e5bd5ae874257123cec8b24304

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Command: bun run test:project -- agentplane packages/agentplane/src/commands/shared/task-backend.test.ts
  Result: pass. Evidence: 1 file, 9 tests passed. Scope: CommandContext loading and branch snapshot fallback behavior.
- Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts
  Result: pass. Evidence: 2 files, 36 tests passed. Scope: CLI lifecycle/listing behavior over command context and task projection.
- Command: bun run typecheck; bun run lint:core; bun run arch:check; git diff --check
  Result: pass. Evidence: each command exited 0. Scope: type safety, lint, dependency boundaries, whitespace.
- Command: bunx prettier --check packages/agentplane/src/commands/shared/task-backend.ts packages/agentplane/src/commands/shared/task-backend-branch-snapshot.ts .agentplane/tasks/202604251626-FQBWH9/README.md
  Result: pass. Evidence: touched files use Prettier style. Scope: changed files only.
- Command: bun run format:check
  Result: blocked outside scope. Evidence: fails on unrelated untracked REFACTORING_PLAN_v3.md. Scope: not used as acceptance for this atom because that file was not created or modified by this task.
- Command: node scripts/hotspot-report.mjs --check
  Result: pass. Evidence: runtime hotspot warning count dropped from 11 to 10; commands/shared/task-backend.ts is no longer listed. Scope: hotspot budget for this atom.
- Command: node scripts/check-task-state.mjs; node scripts/check-agentplane-artifacts.mjs
  Result: pass. Evidence: task state OK, artifact policy OK. Scope: task and artifact hygiene.
- Residual: next scheduled atom is 202604251626-BX2JXQ for task plan and finish spec surfaces.
