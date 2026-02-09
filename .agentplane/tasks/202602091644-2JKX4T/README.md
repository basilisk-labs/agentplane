---
id: "202602091644-2JKX4T"
title: "Usecases: resolveContext single entrypoint"
result_summary: "resolveContext + pilot usecases"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602091644-5RH64E"
  - "202602091644-JS84Q6"
tags:
  - "code"
  - "architecture"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-09T16:59:52.458Z"
  updated_by: "TESTER"
  note: "Verified: bun run lint and bun run test:full pass."
commit:
  hash: "a86379934ee94c79865b5948ded83f220cd7255c"
  message: "✅ 2JKX4T architecture: add resolveContext + pilot usecases"
comments:
  -
    author: "CODER"
    body: "Start: Implement resolveContext usecase entrypoint + minimal pilot migrations (task list/new or upgrade) using ports/adapters + PolicyEngine."
  -
    author: "CODER"
    body: "Verified: bun run lint and bun run test:full pass. Added resolveContext entrypoint and introduced thin usecases for task list/new, wiring CLI handlers through usecases."
events:
  -
    type: "status"
    at: "2026-02-09T16:55:00.739Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement resolveContext usecase entrypoint + minimal pilot migrations (task list/new or upgrade) using ports/adapters + PolicyEngine."
  -
    type: "verify"
    at: "2026-02-09T16:59:52.458Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun run lint and bun run test:full pass."
  -
    type: "status"
    at: "2026-02-09T16:59:57.601Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun run lint and bun run test:full pass. Added resolveContext entrypoint and introduced thin usecases for task list/new, wiring CLI handlers through usecases."
doc_version: 2
doc_updated_at: "2026-02-09T16:59:57.601Z"
doc_updated_by: "CODER"
description: "Add usecases/context/resolveContext and migrate 1-2 commands to the cli->spec->resolveContext->usecase pipeline."
id_source: "generated"
---
## Summary

Add usecases/context/resolveContext as the single context entrypoint and migrate a pilot set of commands to cli->spec->resolveContext->usecase->print.

## Scope

packages/agentplane/src/usecases/context/** and 2-3 pilot commands (task list, task new, upgrade) migrated.

## Plan

1) Implement resolveContext returning a typed CommandContext-like object for usecases (ports/adapters + config + project roots).\n2) Create usecases for task list and task new (thin wrappers around existing logic initially).\n3) Rewire CLI command handlers to call resolveContext + usecase.\n4) Add unit tests for resolveContext and usecases; rely on existing CLI tests for regressions.\n5) Run bun run lint and bun run test:full.

## Risks

Risk: context duplication with existing getCtx(); mitigate by reusing existing loadCommandContext under the hood and migrating incrementally.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-09T16:59:52.458Z — VERIFY — ok

By: TESTER

Note: Verified: bun run lint and bun run test:full pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-09T16:55:00.739Z, excerpt_hash=sha256:b1c0b70f1d34c90da71779587c3cd50a8f706cb5646069c8a11489209697a440

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert pilot command rewires; keep resolveContext unused until migration is complete.

## Verify Steps

- bun run lint\n- bun run test:full
