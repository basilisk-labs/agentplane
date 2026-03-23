---
id: "202603231533-806E8R"
title: "Enrich runner logs and event stream detail"
result_summary: "Enriched runner run-state and event stream metadata with safe execution metrics."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603231533-2TXXBX"
tags:
  - "code"
  - "runner"
  - "logs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T16:43:13.881Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T16:47:54.762Z"
  updated_by: "CODER"
  note: "Verified richer runner observability across prepared state, adapter execution, and lifecycle flows: safe artifact/invocation metadata is recorded in run-state, execution metrics are emitted into result/events, and builds plus doctor pass."
commit:
  hash: "88edacb47a61a3ceaa9bda64f8aaf087c74f2c0f"
  message: "✅ 806E8R code: done"
comments:
  -
    author: "CODER"
    body: "Start: enrich runner run-state and event-stream metadata with safe artifact, invocation, and execution metrics, then verify adapters and lifecycle flows against the expanded observability contract."
  -
    author: "CODER"
    body: "Verified: enriched runner observability across prepared state, adapter execution, and lifecycle flows; safe artifact and invocation metadata now lands in run-state, execution metrics are emitted into result and events, and targeted tests, builds, and doctor pass."
events:
  -
    type: "status"
    at: "2026-03-23T16:43:14.571Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: enrich runner run-state and event-stream metadata with safe artifact, invocation, and execution metrics, then verify adapters and lifecycle flows against the expanded observability contract."
  -
    type: "verify"
    at: "2026-03-23T16:47:54.762Z"
    author: "CODER"
    state: "ok"
    note: "Verified richer runner observability across prepared state, adapter execution, and lifecycle flows: safe artifact/invocation metadata is recorded in run-state, execution metrics are emitted into result/events, and builds plus doctor pass."
  -
    type: "status"
    at: "2026-03-23T16:48:26.087Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: enriched runner observability across prepared state, adapter execution, and lifecycle flows; safe artifact and invocation metadata now lands in run-state, execution metrics are emitted into result and events, and targeted tests, builds, and doctor pass."
doc_version: 3
doc_updated_at: "2026-03-23T16:48:26.088Z"
doc_updated_by: "CODER"
description: "Increase run observability by writing more detailed lifecycle events and richer execution metadata without leaking prompt payloads into argv or stdout."
sections:
  Summary: |-
    Enrich runner logs and event stream detail
    
    Increase run observability by writing more detailed lifecycle events and richer execution metadata without leaking prompt payloads into argv or stdout.
  Scope: |-
    - In scope: Increase run observability by writing more detailed lifecycle events and richer execution metadata without leaking prompt payloads into argv or stdout.
    - Out of scope: unrelated refactors not required for "Enrich runner logs and event stream detail".
  Plan: |-
    1. Enrich run-state preparation metadata with safe artifact and invocation details such as file sizes, hashes, command identity, env keys, and prompt counts without persisting prompt payloads.
    2. Expand Codex and custom adapter event emission so execute start/finish events carry execution metrics like duration, byte counts, output artifact presence, and state-transition context.
    3. Update lifecycle tests to assert the richer event/state contract across prepare, execute, cancel, resume, and retry flows.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts`. Expected: prepared runs record richer safe metadata, adapter execution writes detailed lifecycle events, and lifecycle commands keep the expanded event stream consistent.
    2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: the richer logging metadata types and adapter changes build cleanly from source.
    3. Run `AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor`. Expected: no new runner/runtime integrity findings are introduced.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T16:47:54.762Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified richer runner observability across prepared state, adapter execution, and lifecycle flows: safe artifact/invocation metadata is recorded in run-state, execution metrics are emitted into result/events, and builds plus doctor pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T16:43:14.572Z, excerpt_hash=sha256:62fe273ea050c6e9f3c995fa4d7f73f5774b5ffaf5bed58bec68972b4c5a1092
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Enrich runner logs and event stream detail

Increase run observability by writing more detailed lifecycle events and richer execution metadata without leaking prompt payloads into argv or stdout.

## Scope

- In scope: Increase run observability by writing more detailed lifecycle events and richer execution metadata without leaking prompt payloads into argv or stdout.
- Out of scope: unrelated refactors not required for "Enrich runner logs and event stream detail".

## Plan

1. Enrich run-state preparation metadata with safe artifact and invocation details such as file sizes, hashes, command identity, env keys, and prompt counts without persisting prompt payloads.
2. Expand Codex and custom adapter event emission so execute start/finish events carry execution metrics like duration, byte counts, output artifact presence, and state-transition context.
3. Update lifecycle tests to assert the richer event/state contract across prepare, execute, cancel, resume, and retry flows.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/runner/artifacts.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts`. Expected: prepared runs record richer safe metadata, adapter execution writes detailed lifecycle events, and lifecycle commands keep the expanded event stream consistent.
2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: the richer logging metadata types and adapter changes build cleanly from source.
3. Run `AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor`. Expected: no new runner/runtime integrity findings are introduced.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T16:47:54.762Z — VERIFY — ok

By: CODER

Note: Verified richer runner observability across prepared state, adapter execution, and lifecycle flows: safe artifact/invocation metadata is recorded in run-state, execution metrics are emitted into result/events, and builds plus doctor pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T16:43:14.572Z, excerpt_hash=sha256:62fe273ea050c6e9f3c995fa4d7f73f5774b5ffaf5bed58bec68972b4c5a1092

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
