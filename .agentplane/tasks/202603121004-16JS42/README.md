---
id: "202603121004-16JS42"
title: "Split workflow command mixed test bucket"
result_summary: "split workflow command suites"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T10:04:40.270Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-12T10:16:28.628Z"
  updated_by: "CODER"
  note: "Workflow command test split verified by the replacement workflow*.test.ts suite plus scoped eslint on the new files."
commit:
  hash: "7d345c30fa56fe35037011ad88d2c89fe8c684a2"
  message: "🚧 16JS42 test: split workflow command suites"
comments:
  -
    author: "CODER"
    body: "Start: split the oversized workflow command test bucket into smaller task-doc, verify-hooks, and maintenance suites while preserving the same assertions and runtime contracts."
  -
    author: "CODER"
    body: "Verified: workflow command coverage now lives in separate task-doc, verify-hooks, and maintenance suites while the original file remains a smaller core command bucket with the same assertions."
events:
  -
    type: "status"
    at: "2026-03-12T10:04:50.408Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split the oversized workflow command test bucket into smaller task-doc, verify-hooks, and maintenance suites while preserving the same assertions and runtime contracts."
  -
    type: "verify"
    at: "2026-03-12T10:16:28.628Z"
    author: "CODER"
    state: "ok"
    note: "Workflow command test split verified by the replacement workflow*.test.ts suite plus scoped eslint on the new files."
  -
    type: "status"
    at: "2026-03-12T10:16:47.889Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: workflow command coverage now lives in separate task-doc, verify-hooks, and maintenance suites while the original file remains a smaller core command bucket with the same assertions."
doc_version: 3
doc_updated_at: "2026-03-12T10:16:47.889Z"
doc_updated_by: "CODER"
description: "Decompose workflow.test.ts into smaller contract-focused suites without changing workflow/runtime behavior."
id_source: "generated"
---
## Summary

Split the oversized workflow command mixed test bucket into smaller contract-focused suites without changing command/runtime behavior.

## Scope

Touch only workflow command tests and task-local README artifacts needed to separate task-doc/plan, verify/hooks, and maintenance-command coverage.

## Plan

Decompose workflow.test.ts into smaller contract-focused suites while preserving the exact command/runtime assertions.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/workflow*.test.ts --hookTimeout 60000 --testTimeout 60000` or the exact replacement test set.
2. Confirm moved task-doc, verify/hooks, and maintenance-command cases preserve the previous assertions.
3. Ensure no workflow runtime implementation files change.

## Verification

Pending.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T10:16:28.628Z — VERIFY — ok

By: CODER

Note: Workflow command test split verified by the replacement workflow*.test.ts suite plus scoped eslint on the new files.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T10:04:50.408Z, excerpt_hash=sha256:9cf8ddf37e4423e399b80013ad2650a28f56f43d40dc185864f74bcc2bdbf789

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the suite split if the new file layout weakens coverage, changes assertions, or forces runtime behavior changes.

## Findings

None yet.
