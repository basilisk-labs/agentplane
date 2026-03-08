---
id: "202603080540-WNE4RR"
title: "P1: split task shared helpers by semantics"
result_summary: "task shared helper logic is now split by semantics behind the same ./shared.js import surface, reducing maintenance cost without changing lifecycle behavior."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T07:09:39.634Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T07:09:58.162Z"
  updated_by: "CODER"
  note: |-
    Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit
    Result: pass
    Evidence: TypeScript no-emit succeeded after splitting task/shared.ts into semantic modules and keeping the barrel surface stable.
    Scope: task command helper typings and export surface.
    
    Command: bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/shared.verify-steps.test.ts packages/agentplane/src/commands/task/warn-owner.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts --pool=threads --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: 6 files, 66 tests passed after the split; shared helper, finish, verify-record, and plan behavior stayed green.
    Scope: task helper semantics and representative lifecycle unit coverage.
    
    Command: bun run lint:core -- packages/agentplane/src/commands/task/shared.ts packages/agentplane/src/commands/task/shared/*.ts packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/shared.verify-steps.test.ts packages/agentplane/src/commands/task/warn-owner.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts
    Result: pass
    Evidence: eslint completed clean on the new shared module set and related tests.
    Scope: barrel file plus extracted task helper modules.
    
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both builds completed after the refactor, confirming the task command source tree still assembles cleanly.
    Scope: package build integrity after task helper modularization.
commit:
  hash: "077bc4af0a11179b765081d005b475f4fdf7d345"
  message: "♻️ WNE4RR task: split shared helpers by semantics"
comments:
  -
    author: "CODER"
    body: "Start: splitting task shared helpers by semantics while preserving ./shared.js as the public barrel for task lifecycle commands."
  -
    author: "CODER"
    body: "Verified: task/shared.ts was reduced to a stable barrel over docs, tags, dependencies, transitions, and listing helpers; TypeScript, task helper unit suites, lint, and package builds all passed."
events:
  -
    type: "status"
    at: "2026-03-08T07:09:39.928Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: splitting task shared helpers by semantics while preserving ./shared.js as the public barrel for task lifecycle commands."
  -
    type: "verify"
    at: "2026-03-08T07:09:58.162Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit
      Result: pass
      Evidence: TypeScript no-emit succeeded after splitting task/shared.ts into semantic modules and keeping the barrel surface stable.
      Scope: task command helper typings and export surface.
      
      Command: bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/shared.verify-steps.test.ts packages/agentplane/src/commands/task/warn-owner.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts --pool=threads --testTimeout 60000 --hookTimeout 60000
      Result: pass
      Evidence: 6 files, 66 tests passed after the split; shared helper, finish, verify-record, and plan behavior stayed green.
      Scope: task helper semantics and representative lifecycle unit coverage.
      
      Command: bun run lint:core -- packages/agentplane/src/commands/task/shared.ts packages/agentplane/src/commands/task/shared/*.ts packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/shared.verify-steps.test.ts packages/agentplane/src/commands/task/warn-owner.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts
      Result: pass
      Evidence: eslint completed clean on the new shared module set and related tests.
      Scope: barrel file plus extracted task helper modules.
      
      Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
      Result: pass
      Evidence: both builds completed after the refactor, confirming the task command source tree still assembles cleanly.
      Scope: package build integrity after task helper modularization.
  -
    type: "status"
    at: "2026-03-08T07:10:20.385Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: task/shared.ts was reduced to a stable barrel over docs, tags, dependencies, transitions, and listing helpers; TypeScript, task helper unit suites, lint, and package builds all passed."
doc_version: 3
doc_updated_at: "2026-03-08T07:10:20.385Z"
doc_updated_by: "CODER"
description: "Refactor commands/task/shared.ts into focused helpers for transitions, verify-step docs, filters, and close/commit utilities while preserving lifecycle behavior."
id_source: "generated"
---
## Summary

P1: split task shared helpers by semantics

Refactor commands/task/shared.ts into focused helpers for transitions, verify-step docs, filters, and close/commit utilities while preserving lifecycle behavior.

## Scope

- In scope: Refactor commands/task/shared.ts into focused helpers for transitions, verify-step docs, filters, and close/commit utilities while preserving lifecycle behavior..
- Out of scope: unrelated refactors not required for "P1: split task shared helpers by semantics".

## Plan

1. Implement the change for "P1: split task shared helpers by semantics".
2. Run required checks and capture verification evidence.
3. Finalize task notes and finish with traceable commit metadata.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- `bunx tsc -p packages/agentplane/tsconfig.json --noEmit`
- `bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/shared.verify-steps.test.ts packages/agentplane/src/commands/task/warn-owner.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts --pool=threads --testTimeout 60000 --hookTimeout 60000`
- `bun run lint:core -- packages/agentplane/src/commands/task/shared.ts packages/agentplane/src/commands/task/shared/*.ts packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/shared.verify-steps.test.ts packages/agentplane/src/commands/task/warn-owner.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts`

### Evidence / Commands
- Record module boundaries introduced and confirm that shared barrel exports still satisfy existing task command imports.

### Pass criteria
- task/shared.ts becomes a barrel, semantic helpers move into narrower modules, and unit/lifecycle behavior stays unchanged.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T07:09:58.162Z — VERIFY — ok

By: CODER

Note: Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit
Result: pass
Evidence: TypeScript no-emit succeeded after splitting task/shared.ts into semantic modules and keeping the barrel surface stable.
Scope: task command helper typings and export surface.

Command: bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/shared.verify-steps.test.ts packages/agentplane/src/commands/task/warn-owner.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts --pool=threads --testTimeout 60000 --hookTimeout 60000
Result: pass
Evidence: 6 files, 66 tests passed after the split; shared helper, finish, verify-record, and plan behavior stayed green.
Scope: task helper semantics and representative lifecycle unit coverage.

Command: bun run lint:core -- packages/agentplane/src/commands/task/shared.ts packages/agentplane/src/commands/task/shared/*.ts packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/shared.verify-steps.test.ts packages/agentplane/src/commands/task/warn-owner.unit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts
Result: pass
Evidence: eslint completed clean on the new shared module set and related tests.
Scope: barrel file plus extracted task helper modules.

Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: both builds completed after the refactor, confirming the task command source tree still assembles cleanly.
Scope: package build integrity after task helper modularization.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T07:09:39.928Z, excerpt_hash=sha256:40ad241383244c413d8d8db0fbdce1de19b04c6f4c542178bdc5f55a9299e7aa

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Preserve ./shared.js as the public import surface for task commands in this refactor.
- Scope is structural only; do not change lifecycle semantics or user-facing task command behavior.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
