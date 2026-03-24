---
id: "202603240131-VNAW92"
title: "Add explicit runner adapter capabilities contract"
result_summary: "Runner adapters now publish explicit capabilities through shared metadata and dry-run output."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "adapters"
  - "architecture"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T01:38:14.279Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T01:42:48.810Z"
  updated_by: "CODER"
  note: "Runner config, artifacts, adapter, and task-run CLI tests passed; dry-run output and prepared metadata now expose an explicit adapter capability contract for codex and custom."
commit:
  hash: "ef011d5717127fcf9c866ddedb2fb3b0118987fc"
  message: "✅ VNAW92 code: done"
comments:
  -
    author: "CODER"
    body: "Start: define an explicit runner adapter capability contract, expose codex and custom capabilities through shared runtime metadata, and keep the first integration focused on capability description rather than preflight enforcement."
  -
    author: "CODER"
    body: "Verified: Added an explicit runner adapter capability contract on the adapter interface, published codex and custom capabilities into bundle/run-state metadata and task run dry-run output, and reran runner config, artifacts, adapter, CLI task-run tests, eslint, and source builds to confirm the new surface stays consistent."
events:
  -
    type: "status"
    at: "2026-03-24T01:38:14.910Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: define an explicit runner adapter capability contract, expose codex and custom capabilities through shared runtime metadata, and keep the first integration focused on capability description rather than preflight enforcement."
  -
    type: "verify"
    at: "2026-03-24T01:42:48.810Z"
    author: "CODER"
    state: "ok"
    note: "Runner config, artifacts, adapter, and task-run CLI tests passed; dry-run output and prepared metadata now expose an explicit adapter capability contract for codex and custom."
  -
    type: "status"
    at: "2026-03-24T01:42:53.301Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Added an explicit runner adapter capability contract on the adapter interface, published codex and custom capabilities into bundle/run-state metadata and task run dry-run output, and reran runner config, artifacts, adapter, CLI task-run tests, eslint, and source builds to confirm the new surface stays consistent."
doc_version: 3
doc_updated_at: "2026-03-24T01:42:53.302Z"
doc_updated_by: "CODER"
description: "Define an adapter capabilities layer that distinguishes native enforcement, advisory propagation, and unsupported policy dimensions for runner adapters before execution."
sections:
  Summary: |-
    Add explicit runner adapter capabilities contract
    
    Define an adapter capabilities layer that distinguishes native enforcement, advisory propagation, and unsupported policy dimensions for runner adapters before execution.
  Scope: |-
    - In scope: Define an adapter capabilities layer that distinguishes native enforcement, advisory propagation, and unsupported policy dimensions for runner adapters before execution.
    - Out of scope: unrelated refactors not required for "Add explicit runner adapter capabilities contract".
  Plan: "1. Define a canonical capability model for runner adapters that distinguishes native enforcement, advisory propagation, and unsupported policy dimensions. 2. Expose capabilities for codex and custom adapters. 3. Add minimal runtime metadata or dry-run visibility for the capability contract. 4. Verify with targeted tests and source builds. Sequence: execute after AW9KZ2."
  Verify Steps: "1. Run bunx vitest run packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts. 2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. 3. Confirm runtime metadata or dry-run output exposes the adapter capability contract."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T01:42:48.810Z — VERIFY — ok
    
    By: CODER
    
    Note: Runner config, artifacts, adapter, and task-run CLI tests passed; dry-run output and prepared metadata now expose an explicit adapter capability contract for codex and custom.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T01:38:14.911Z, excerpt_hash=sha256:ae2b9466b1c9887ae9b675ff23df79315f8f0d80cbc23baa72f6c050d039b623
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add explicit runner adapter capabilities contract

Define an adapter capabilities layer that distinguishes native enforcement, advisory propagation, and unsupported policy dimensions for runner adapters before execution.

## Scope

- In scope: Define an adapter capabilities layer that distinguishes native enforcement, advisory propagation, and unsupported policy dimensions for runner adapters before execution.
- Out of scope: unrelated refactors not required for "Add explicit runner adapter capabilities contract".

## Plan

1. Define a canonical capability model for runner adapters that distinguishes native enforcement, advisory propagation, and unsupported policy dimensions. 2. Expose capabilities for codex and custom adapters. 3. Add minimal runtime metadata or dry-run visibility for the capability contract. 4. Verify with targeted tests and source builds. Sequence: execute after AW9KZ2.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/adapters/custom.test.ts. 2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. 3. Confirm runtime metadata or dry-run output exposes the adapter capability contract.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T01:42:48.810Z — VERIFY — ok

By: CODER

Note: Runner config, artifacts, adapter, and task-run CLI tests passed; dry-run output and prepared metadata now expose an explicit adapter capability contract for codex and custom.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T01:38:14.911Z, excerpt_hash=sha256:ae2b9466b1c9887ae9b675ff23df79315f8f0d80cbc23baa72f6c050d039b623

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
