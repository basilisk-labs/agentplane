---
id: "202603311332-AR77BP"
title: "N6.1 Extract reusable backend/task builders for command and workflow tests"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603311331-81NZD4"
  - "202603311331-7GA03B"
  - "202603311332-75NADP"
tags:
  - "code"
  - "refactor"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T18:39:44.598Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T18:48:19.308Z"
  updated_by: "CODER"
  note: "Command: bunx eslint packages/agentplane/src/commands/task.test-helpers.ts packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts; Result: pass; Evidence: 0 lint errors after centralizing command/workflow task fixtures; Scope: shared testkit plus migrated command/workflow unit suites. Command: bunx vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/backends/task-backend.local.test.ts; Result: pass; Evidence: 12 files, 91 tests passed; Scope: workflow tests, task command unit tests, backend canary. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0; Scope: compile safety for the new shared testkit module and migrated imports."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extract one shared testkit for repeated backend/task builders across workflow and task command suites, keep the API minimal, and replace duplicated builders rather than wrapping them one more level."
events:
  -
    type: "status"
    at: "2026-03-31T18:40:19.102Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract one shared testkit for repeated backend/task builders across workflow and task command suites, keep the API minimal, and replace duplicated builders rather than wrapping them one more level."
  -
    type: "verify"
    at: "2026-03-31T18:48:19.308Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx eslint packages/agentplane/src/commands/task.test-helpers.ts packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts; Result: pass; Evidence: 0 lint errors after centralizing command/workflow task fixtures; Scope: shared testkit plus migrated command/workflow unit suites. Command: bunx vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/backends/task-backend.local.test.ts; Result: pass; Evidence: 12 files, 91 tests passed; Scope: workflow tests, task command unit tests, backend canary. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0; Scope: compile safety for the new shared testkit module and migrated imports."
doc_version: 3
doc_updated_at: "2026-03-31T18:48:19.312Z"
doc_updated_by: "CODER"
description: "Implement N6.1 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: repeated local `TaskBackend` stubs and task fixture builders move into one shared testkit. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N6.1 Extract reusable backend/task builders for command and workflow tests
    
    Implement N6.1 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: repeated local `TaskBackend` stubs and task fixture builders move into one shared testkit. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N6.1 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: repeated local `TaskBackend` stubs and task fixture builders move into one shared testkit. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N6.1 Extract reusable backend/task builders for command and workflow tests".
  Plan: |-
    1. Audit workflow tests, task command unit tests, backend tests and isolate the narrowest change set that satisfies N6.1.
    2. Implement extract reusable backend/task builders for command and workflow tests with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering workflow tests, task command unit tests, backend tests. Expected: the behavior targeted by N6.1 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-AR77BP. Expected: scope stays anchored to workflow tests, task command unit tests, backend tests plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: repeated local `TaskBackend` stubs and task fixture builders move into one shared testkit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T18:48:19.308Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx eslint packages/agentplane/src/commands/task.test-helpers.ts packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts; Result: pass; Evidence: 0 lint errors after centralizing command/workflow task fixtures; Scope: shared testkit plus migrated command/workflow unit suites. Command: bunx vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/backends/task-backend.local.test.ts; Result: pass; Evidence: 12 files, 91 tests passed; Scope: workflow tests, task command unit tests, backend canary. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0; Scope: compile safety for the new shared testkit module and migrated imports.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T18:40:19.125Z, excerpt_hash=sha256:5c33491ff88204169beb8490028f7c72f9c52635337b8c9f7791aa8f58efa8d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N6.1 Extract reusable backend/task builders for command and workflow tests

Implement N6.1 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: repeated local `TaskBackend` stubs and task fixture builders move into one shared testkit. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N6.1 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: repeated local `TaskBackend` stubs and task fixture builders move into one shared testkit. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N6.1 Extract reusable backend/task builders for command and workflow tests".

## Plan

1. Audit workflow tests, task command unit tests, backend tests and isolate the narrowest change set that satisfies N6.1.
2. Implement extract reusable backend/task builders for command and workflow tests with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering workflow tests, task command unit tests, backend tests. Expected: the behavior targeted by N6.1 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-AR77BP. Expected: scope stays anchored to workflow tests, task command unit tests, backend tests plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: repeated local `TaskBackend` stubs and task fixture builders move into one shared testkit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T18:48:19.308Z — VERIFY — ok

By: CODER

Note: Command: bunx eslint packages/agentplane/src/commands/task.test-helpers.ts packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts; Result: pass; Evidence: 0 lint errors after centralizing command/workflow task fixtures; Scope: shared testkit plus migrated command/workflow unit suites. Command: bunx vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/backends/task-backend.local.test.ts; Result: pass; Evidence: 12 files, 91 tests passed; Scope: workflow tests, task command unit tests, backend canary. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0; Scope: compile safety for the new shared testkit module and migrated imports.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T18:40:19.125Z, excerpt_hash=sha256:5c33491ff88204169beb8490028f7c72f9c52635337b8c9f7791aa8f58efa8d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
