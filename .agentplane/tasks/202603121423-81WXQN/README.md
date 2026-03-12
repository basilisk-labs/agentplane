---
id: "202603121423-81WXQN"
title: "Harden task README write retries"
result_summary: "preserve task README writes on retry"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T14:24:02.245Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-12T14:43:01.629Z"
  updated_by: "CODER"
  note: "Store-backed task writes now rebase on the freshest README state; unit, CLI, lint, and build checks passed."
commit:
  hash: "774eef88e00bb784c9e97eabc2d6153c410802cb"
  message: "🚧 81WXQN task: preserve README writes across task-store retries"
comments:
  -
    author: "CODER"
    body: "Start: moving task doc and plan write transforms onto fresh TaskStore state so concurrent retries preserve neighboring README edits instead of replaying stale precomputed payloads."
  -
    author: "CODER"
    body: "Verified: store-backed task writes now compute next state from the freshest README and preserve concurrent section updates."
events:
  -
    type: "status"
    at: "2026-03-12T14:24:17.028Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: moving task doc and plan write transforms onto fresh TaskStore state so concurrent retries preserve neighboring README edits instead of replaying stale precomputed payloads."
  -
    type: "verify"
    at: "2026-03-12T14:43:01.629Z"
    author: "CODER"
    state: "ok"
    note: "Store-backed task writes now rebase on the freshest README state; unit, CLI, lint, and build checks passed."
  -
    type: "status"
    at: "2026-03-12T14:43:54.483Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: store-backed task writes now compute next state from the freshest README and preserve concurrent section updates."
doc_version: 3
doc_updated_at: "2026-03-12T14:43:54.483Z"
doc_updated_by: "CODER"
description: "Fix stale precomputed doc/task payloads so concurrent task doc/plan/verify writes preserve each other's changes instead of clobbering the README."
id_source: "generated"
---
## Summary

Harden task README write retries

Fix stale precomputed doc/task payloads so concurrent task doc/plan/verify writes preserve each other's changes instead of clobbering the README.

## Scope

- In scope: Fix stale precomputed doc/task payloads so concurrent task doc/plan/verify writes preserve each other's changes instead of clobbering the README.
- Out of scope: unrelated refactors not required for "Harden task README write retries".

## Plan

1. Move task doc/plan write transforms onto the freshest task payload inside TaskStore-backed updates instead of reusing stale precomputed nextDoc or nextTask values. 2. Cover concurrent doc-write retries with focused regressions so task doc set and task plan set preserve each other on retry; extend neighboring tests only where the write contract is shared. 3. Run targeted unit/integration checks plus builds and record the concurrency model in task findings.

## Verify Steps

1. Run focused regressions for task doc/plan concurrency and any shared doc-writer contracts touched by the fix. Expected: concurrent retries preserve both changes instead of clobbering the README.
2. Run lint on the touched task command/store files and tests. Expected: no new lint violations.
3. Build the touched packages after the write-path changes. Expected: @agentplaneorg/core and agentplane build successfully.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T14:43:01.629Z — VERIFY — ok

By: CODER

Note: Store-backed task writes now rebase on the freshest README state; unit, CLI, lint, and build checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T14:42:04.621Z, excerpt_hash=sha256:3af158766580bb0fced7a7dd53799c0ead514b5070d51ea5919222e6aee12637

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. Root cause: command handlers precomputed next task/doc payloads before `TaskStore.update(...)`, so the built-in retry preserved file freshness but could replay stale command-layer state.
2. Store-backed write paths now derive next state from the freshest `current` task across doc, plan, verify, comment, start, block, set-status, finish, and close flows.
3. Coverage now includes store-backed regressions for doc/plan/verify/finish plus CLI suites for task doc-write, lifecycle verify/block-finish, and task metadata flows.
