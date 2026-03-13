---
id: "202603131309-YDAC7K"
title: "Add CAS revision contract to TaskStore"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 2
depends_on:
  - "202603131309-HSRN23"
tags:
  - "code"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T15:14:20.597Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T15:22:14.108Z"
  updated_by: "CODER"
  note: |-
    Command: bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts --hookTimeout 60000 --testTimeout 60000 && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build && node --input-type=module <CAS-check>
    Result: TaskStore now enforces expectedRevision, increments revision only on successful writes, and rejects stale writes with reason_code=task_revision_conflict.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add revision-aware CAS semantics to local TaskStore mutation paths with typed stale-write conflicts."
events:
  -
    type: "status"
    at: "2026-03-13T15:14:21.121Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add revision-aware CAS semantics to local TaskStore mutation paths with typed stale-write conflicts."
  -
    type: "verify"
    at: "2026-03-13T15:22:14.108Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts --hookTimeout 60000 --testTimeout 60000 && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build && node --input-type=module <CAS-check>
      Result: TaskStore now enforces expectedRevision, increments revision only on successful writes, and rejects stale writes with reason_code=task_revision_conflict.
doc_version: 3
doc_updated_at: "2026-03-13T15:22:14.110Z"
doc_updated_by: "CODER"
description: "Add revision and expectedRevision semantics to local one-file task writes so task mutations can fail or retry on typed canonical-state conflicts instead of markdown-body drift."
sections:
  Summary: |-
    Add CAS revision contract to TaskStore
    
    Add revision and expectedRevision semantics to local one-file task writes so task mutations can fail or retry on typed canonical-state conflicts instead of markdown-body drift.
  Scope: |-
    - In scope: Add revision and expectedRevision semantics to local one-file task writes so task mutations can fail or retry on typed canonical-state conflicts instead of markdown-body drift.
    - Out of scope: unrelated refactors not required for "Add CAS revision contract to TaskStore".
  Plan: |-
    1. Extend the local TaskStore mutation path with revision-aware compare-and-swap semantics so writes can assert the expected canonical task revision before committing changes.
    2. Surface typed revision conflicts for local task updates and semantic doc patches without widening the contract to remote backends yet.
    3. Add focused regressions for revision mismatch failure, successful retry on refreshed state, and no-op behavior when no mutation is applied.
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: local CAS revision checks pass for update/patch callers and emit typed conflicts on mismatch.
    2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: revision-aware TaskStore changes compile cleanly.
    3. Inspect a local task README or test fixture after a successful mutation and a rejected stale mutation. Expected: revision stays stable across no-op reads, increments only on successful writes, and stale writes fail with explicit conflict context.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-13T15:22:14.108Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts --hookTimeout 60000 --testTimeout 60000 && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build && node --input-type=module <CAS-check>
    Result: TaskStore now enforces expectedRevision, increments revision only on successful writes, and rejects stale writes with reason_code=task_revision_conflict.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T15:14:21.122Z, excerpt_hash=sha256:55fe963dfef4fb5f4c4ddc3f94c653c22960f1bdf219defa221a4ad11e67234c
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add CAS revision contract to TaskStore

Add revision and expectedRevision semantics to local one-file task writes so task mutations can fail or retry on typed canonical-state conflicts instead of markdown-body drift.

## Scope

- In scope: Add revision and expectedRevision semantics to local one-file task writes so task mutations can fail or retry on typed canonical-state conflicts instead of markdown-body drift.
- Out of scope: unrelated refactors not required for "Add CAS revision contract to TaskStore".

## Plan

1. Extend the local TaskStore mutation path with revision-aware compare-and-swap semantics so writes can assert the expected canonical task revision before committing changes.
2. Surface typed revision conflicts for local task updates and semantic doc patches without widening the contract to remote backends yet.
3. Add focused regressions for revision mismatch failure, successful retry on refreshed state, and no-op behavior when no mutation is applied.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: local CAS revision checks pass for update/patch callers and emit typed conflicts on mismatch.
2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: revision-aware TaskStore changes compile cleanly.
3. Inspect a local task README or test fixture after a successful mutation and a rejected stale mutation. Expected: revision stays stable across no-op reads, increments only on successful writes, and stale writes fail with explicit conflict context.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T15:22:14.108Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts --hookTimeout 60000 --testTimeout 60000 && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build && node --input-type=module <CAS-check>
Result: TaskStore now enforces expectedRevision, increments revision only on successful writes, and rejects stale writes with reason_code=task_revision_conflict.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T15:14:21.122Z, excerpt_hash=sha256:55fe963dfef4fb5f4c4ddc3f94c653c22960f1bdf219defa221a4ad11e67234c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
