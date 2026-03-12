---
id: "202603121302-8FQYFN"
title: "Cleanup phase: deduplicate no-op and duplicate task close paths"
result_summary: "Extracted a shared no-op closure helper for close-noop and close-duplicate, removing duplicated DONE/comment/event/result update logic without changing command contracts."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T13:34:02.252Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-12T13:39:50.199Z"
  updated_by: "CODER"
  note: "Deduplicated the close-noop and close-duplicate write path behind a shared helper, reran targeted close-path CLI tests (3 assertions in run-cli.core.tasks), linted the touched command files, and rebuilt @agentplaneorg/core plus agentplane."
commit:
  hash: "286b21f594923c9cb3b51cf2ebc82c0a5ec26e89"
  message: "🚧 8FQYFN task: dedupe close no-op paths"
comments:
  -
    author: "CODER"
    body: "Start: deduplicate close-noop and close-duplicate behind a shared internal helper while preserving their separate CLI behavior and task side effects."
  -
    author: "CODER"
    body: "Verified: close-noop and close-duplicate now share one internal verified-closure write path while their CLI behavior and outputs remain unchanged."
events:
  -
    type: "status"
    at: "2026-03-12T13:34:25.872Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: deduplicate close-noop and close-duplicate behind a shared internal helper while preserving their separate CLI behavior and task side effects."
  -
    type: "verify"
    at: "2026-03-12T13:39:50.199Z"
    author: "CODER"
    state: "ok"
    note: "Deduplicated the close-noop and close-duplicate write path behind a shared helper, reran targeted close-path CLI tests (3 assertions in run-cli.core.tasks), linted the touched command files, and rebuilt @agentplaneorg/core plus agentplane."
  -
    type: "status"
    at: "2026-03-12T13:40:00.951Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: close-noop and close-duplicate now share one internal verified-closure write path while their CLI behavior and outputs remain unchanged."
doc_version: 3
doc_updated_at: "2026-03-12T13:40:00.951Z"
doc_updated_by: "CODER"
description: "Extract a shared helper for task close-noop and close-duplicate so the no-op close flows share approval, status guard, event append, and write semantics without changing their CLI contract."
id_source: "generated"
---
## Summary

Cleanup phase: deduplicate no-op and duplicate task close paths

Extract a shared helper for task close-noop and close-duplicate so the no-op close flows share approval, status guard, event append, and write semantics without changing their CLI contract.

## Scope

- In scope: Extract a shared helper for task close-noop and close-duplicate so the no-op close flows share approval, status guard, event append, and write semantics without changing their CLI contract.
- Out of scope: unrelated refactors not required for "Cleanup phase: deduplicate no-op and duplicate task close paths".

## Plan

1. Compare close-noop and close-duplicate to identify the exact shared close-task workflow that can move behind an internal helper.
2. Extract the shared no-op close path helper while preserving separate command entrypoints and CLI contracts.
3. Update unit or CLI coverage around the deduplicated close flow if needed to lock behavior.
4. Run targeted tests, lint, and builds; then record evidence and finish the task.

## Verify Steps

1. Run targeted close-path tests covering close-noop and close-duplicate behavior. Expected: both commands still produce the same status/event/comment outcomes as before.
2. Run lint for the deduplicated close-path files. Expected: no new lint violations.
3. Build the touched packages after the refactor. Expected: @agentplaneorg/core and agentplane build successfully.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T13:39:50.199Z — VERIFY — ok

By: CODER

Note: Deduplicated the close-noop and close-duplicate write path behind a shared helper, reran targeted close-path CLI tests (3 assertions in run-cli.core.tasks), linted the touched command files, and rebuilt @agentplaneorg/core plus agentplane.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T13:37:17.522Z, excerpt_hash=sha256:cd7a4632794990e88cf241a6ef0474d5ab465e1ace7c8c2659c483702f850179

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. close-noop and close-duplicate now share one internal write-path for verified no-op closures; command-specific parsing, approval reasons, and body text remain separate.
2. The shared helper starts after task lookup, which keeps not-found and canonical-duplicate semantics unchanged while removing duplicated DONE/event/comment/result update logic.
