---
id: "202603240901-9NXPCG"
title: "Introduce typed runner trace event schema"
result_summary: "Added a typed runner trace event schema and JSONL serialization helper."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603240901-J4GCTC"
tags:
  - "code"
  - "runner"
  - "traces"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T09:08:43.656Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T09:10:19.282Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/runner/trace.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Result: pass. Evidence: trace schema tests passed 3/3, source builds passed, and the new contract now defines typed stdout/stderr trace records plus stable JSONL serialization helpers without changing live runner execution. Scope: typed runner trace event schema and helper only."
commit:
  hash: "8e689d4b6d889978fae8f869d14fdc2965f91797"
  message: "✅ 9NXPCG code: done"
comments:
  -
    author: "CODER"
    body: "Start: define the normalized runner trace event schema and focused schema tests only, without introducing streaming capture or task-facing summary changes in this commit."
  -
    author: "CODER"
    body: "Verified: the runner trace contract now includes typed stdout and stderr trace events with stable JSONL serialization, and the focused schema test plus package builds passed without changing live runner execution semantics."
events:
  -
    type: "status"
    at: "2026-03-24T09:08:48.981Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: define the normalized runner trace event schema and focused schema tests only, without introducing streaming capture or task-facing summary changes in this commit."
  -
    type: "verify"
    at: "2026-03-24T09:10:19.282Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/runner/trace.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Result: pass. Evidence: trace schema tests passed 3/3, source builds passed, and the new contract now defines typed stdout/stderr trace records plus stable JSONL serialization helpers without changing live runner execution. Scope: typed runner trace event schema and helper only."
  -
    type: "status"
    at: "2026-03-24T09:10:39.291Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the runner trace contract now includes typed stdout and stderr trace events with stable JSONL serialization, and the focused schema test plus package builds passed without changing live runner execution semantics."
doc_version: 3
doc_updated_at: "2026-03-24T09:10:39.291Z"
doc_updated_by: "CODER"
description: "Add a typed append-only trace event schema for runner stdout/stderr capture so adapters can persist normalized line-oriented trace records with timestamps, stream source, and parsed metadata when available."
sections:
  Summary: |-
    Introduce typed runner trace event schema
    
    Add a typed append-only trace event schema for runner stdout/stderr capture so adapters can persist normalized line-oriented trace records with timestamps, stream source, and parsed metadata when available.
  Scope: |-
    - In scope: define the typed schema for normalized runner trace events and any minimal helper needed to encode them consistently.
    - In scope: add focused tests for JSON-event and plain-text trace records.
    - Out of scope: process streaming, task-facing summary sanitization, or trace policy config.
  Plan: |-
    1. Define a typed append-only runner trace event schema and any minimal helper needed to serialize normalized trace records without introducing streaming capture yet.
    2. Add focused tests covering JSON-event and plain-text trace record normalization so later streaming work can build on a stable contract.
    3. Verify the touched trace schema/tests and finish with one task-scoped commit.
  Verify Steps: |-
    1. Inspect the trace schema and helper contract. Expected: stdout and stderr records have explicit stream, sequence, timestamp, and payload shape.
    2. Run focused trace schema tests. Expected: JSON-line and plain-text records serialize predictably.
    3. Run a source build for the touched package. Expected: TypeScript/build checks pass with the new trace types.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T09:10:19.282Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/runner/trace.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Result: pass. Evidence: trace schema tests passed 3/3, source builds passed, and the new contract now defines typed stdout/stderr trace records plus stable JSONL serialization helpers without changing live runner execution. Scope: typed runner trace event schema and helper only.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T09:08:48.983Z, excerpt_hash=sha256:0051346c1336b7cb38267993b7d7993683f8f8753bd22088ce58b05bb68aa1f5
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task commit.
    - Re-run the focused trace schema tests and build to confirm the old contract is restored.
  Findings: ""
id_source: "generated"
---
## Summary

Introduce typed runner trace event schema

Add a typed append-only trace event schema for runner stdout/stderr capture so adapters can persist normalized line-oriented trace records with timestamps, stream source, and parsed metadata when available.

## Scope

- In scope: define the typed schema for normalized runner trace events and any minimal helper needed to encode them consistently.
- In scope: add focused tests for JSON-event and plain-text trace records.
- Out of scope: process streaming, task-facing summary sanitization, or trace policy config.

## Plan

1. Define a typed append-only runner trace event schema and any minimal helper needed to serialize normalized trace records without introducing streaming capture yet.
2. Add focused tests covering JSON-event and plain-text trace record normalization so later streaming work can build on a stable contract.
3. Verify the touched trace schema/tests and finish with one task-scoped commit.

## Verify Steps

1. Inspect the trace schema and helper contract. Expected: stdout and stderr records have explicit stream, sequence, timestamp, and payload shape.
2. Run focused trace schema tests. Expected: JSON-line and plain-text records serialize predictably.
3. Run a source build for the touched package. Expected: TypeScript/build checks pass with the new trace types.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T09:10:19.282Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/runner/trace.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. Result: pass. Evidence: trace schema tests passed 3/3, source builds passed, and the new contract now defines typed stdout/stderr trace records plus stable JSONL serialization helpers without changing live runner execution. Scope: typed runner trace event schema and helper only.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T09:08:48.983Z, excerpt_hash=sha256:0051346c1336b7cb38267993b7d7993683f8f8753bd22088ce58b05bb68aa1f5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task commit.
- Re-run the focused trace schema tests and build to confirm the old contract is restored.

## Findings
