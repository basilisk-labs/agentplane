---
id: "202603311332-75NADP"
title: "N4.5 Lock doc-path parity with tests"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603311332-95GHP9"
  - "202603311332-V2JXFM"
  - "202603311332-5K9CNK"
tags:
  - "code"
  - "refactor"
  - "backend"
  - "tests"
  - "task-doc"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T18:29:38.552Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T18:36:04.537Z"
  updated_by: "CODER"
  note: "Command: bunx eslint packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts; Result: pass; Evidence: 0 lint errors on the narrowed doc-parity diff; Scope: local-backend canonical doc reads plus backend/task-store/command parity locks. Command: bunx vitest run packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts; Result: pass; Evidence: 6 files, 89 tests passed; Scope: doc set/show/plan/verify parity and canonical doc regeneration. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0; Scope: compile safety for the local-backend doc read change."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: lock doc-path parity with focused tests across local and non-local doc mutation flows, delete representational mismatches instead of preserving them, and keep the diff centered on command/backend/test contracts."
events:
  -
    type: "status"
    at: "2026-03-31T18:30:11.583Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: lock doc-path parity with focused tests across local and non-local doc mutation flows, delete representational mismatches instead of preserving them, and keep the diff centered on command/backend/test contracts."
  -
    type: "verify"
    at: "2026-03-31T18:36:04.537Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx eslint packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts; Result: pass; Evidence: 0 lint errors on the narrowed doc-parity diff; Scope: local-backend canonical doc reads plus backend/task-store/command parity locks. Command: bunx vitest run packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts; Result: pass; Evidence: 6 files, 89 tests passed; Scope: doc set/show/plan/verify parity and canonical doc regeneration. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0; Scope: compile safety for the local-backend doc read change."
doc_version: 3
doc_updated_at: "2026-03-31T18:36:04.541Z"
doc_updated_by: "CODER"
description: "Implement N4.5 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: doc set/show/plan/verify flows prove parity across local and non-local paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N4.5 Lock doc-path parity with tests
    
    Implement N4.5 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: doc set/show/plan/verify flows prove parity across local and non-local paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N4.5 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: doc set/show/plan/verify flows prove parity across local and non-local paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N4.5 Lock doc-path parity with tests".
  Plan: |-
    1. Audit command tests, backend tests, core task-store tests and isolate the narrowest change set that satisfies N4.5.
    2. Implement lock doc-path parity with tests with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering command tests, backend tests, core task-store tests. Expected: the behavior targeted by N4.5 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-75NADP. Expected: scope stays anchored to command tests, backend tests, core task-store tests plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: doc set/show/plan/verify flows prove parity across local and non-local paths.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T18:36:04.537Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx eslint packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts; Result: pass; Evidence: 0 lint errors on the narrowed doc-parity diff; Scope: local-backend canonical doc reads plus backend/task-store/command parity locks. Command: bunx vitest run packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts; Result: pass; Evidence: 6 files, 89 tests passed; Scope: doc set/show/plan/verify parity and canonical doc regeneration. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0; Scope: compile safety for the local-backend doc read change.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T18:30:11.605Z, excerpt_hash=sha256:bf2c587abeecdb4f7f932bb18392ffa6471c7167da516ccfbe95f0c7486d5b87
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N4.5 Lock doc-path parity with tests

Implement N4.5 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: doc set/show/plan/verify flows prove parity across local and non-local paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N4.5 from REFACTOR.md. Remove the current duplication between core task-doc primitives, the local task store, and backend doc mutation paths.. Acceptance: doc set/show/plan/verify flows prove parity across local and non-local paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N4.5 Lock doc-path parity with tests".

## Plan

1. Audit command tests, backend tests, core task-store tests and isolate the narrowest change set that satisfies N4.5.
2. Implement lock doc-path parity with tests with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering command tests, backend tests, core task-store tests. Expected: the behavior targeted by N4.5 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-75NADP. Expected: scope stays anchored to command tests, backend tests, core task-store tests plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: doc set/show/plan/verify flows prove parity across local and non-local paths.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T18:36:04.537Z — VERIFY — ok

By: CODER

Note: Command: bunx eslint packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts; Result: pass; Evidence: 0 lint errors on the narrowed doc-parity diff; Scope: local-backend canonical doc reads plus backend/task-store/command parity locks. Command: bunx vitest run packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts; Result: pass; Evidence: 6 files, 89 tests passed; Scope: doc set/show/plan/verify parity and canonical doc regeneration. Command: bun run --filter=agentplane build; Result: pass; Evidence: agentplane build exited with code 0; Scope: compile safety for the local-backend doc read change.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T18:30:11.605Z, excerpt_hash=sha256:bf2c587abeecdb4f7f932bb18392ffa6471c7167da516ccfbe95f0c7486d5b87

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
