---
id: "202603120950-7QTX45"
title: "Sync workflow test with task doc set outcomes"
result_summary: "sync workflow task-doc expectations"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T09:51:24.195Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-12T09:52:41.180Z"
  updated_by: "CODER"
  note: "Workflow task-doc assertions now match the current outcome-oriented stderr contract and the targeted task-doc workflow test passes."
commit:
  hash: "45c280f8fb91d5e84c8c5e9cb68631e2329e665f"
  message: "🚧 7QTX45 test: sync workflow task-doc expectations"
comments:
  -
    author: "CODER"
    body: "Start: align the stale workflow task-doc stderr expectations with the current outcome-oriented task doc set contract without changing runtime behavior."
  -
    author: "CODER"
    body: "Verified: workflow task-doc tests now assert the current outcome-oriented task doc set stderr strings, matching the live contract already covered in CLI task tests."
events:
  -
    type: "status"
    at: "2026-03-12T09:51:35.141Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align the stale workflow task-doc stderr expectations with the current outcome-oriented task doc set contract without changing runtime behavior."
  -
    type: "verify"
    at: "2026-03-12T09:52:41.180Z"
    author: "CODER"
    state: "ok"
    note: "Workflow task-doc assertions now match the current outcome-oriented stderr contract and the targeted task-doc workflow test passes."
  -
    type: "status"
    at: "2026-03-12T09:52:47.054Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: workflow task-doc tests now assert the current outcome-oriented task doc set stderr strings, matching the live contract already covered in CLI task tests."
doc_version: 3
doc_updated_at: "2026-03-12T09:52:47.054Z"
doc_updated_by: "CODER"
description: "Update stale workflow test expectations to match the current task doc set outcome-oriented stderr contract."
id_source: "generated"
---
## Summary

Update stale workflow tests so task doc set assertions match the current outcome-oriented stderr messages.

## Scope

Touch only workflow tests and task-local README artifacts needed to align stale expectations with the current task doc set contract.

## Plan

Align stale workflow.test.ts task doc set stderr expectations with the current outcome-oriented contract without changing runtime behavior.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/workflow.test.ts -t "task doc set" --hookTimeout 60000 --testTimeout 60000`.
2. Confirm the stale expectations are replaced with the same outcome-oriented strings already used by other CLI tests.
3. Ensure no runtime/task-doc implementation files change.

## Verification

Pending.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T09:52:41.180Z — VERIFY — ok

By: CODER

Note: Workflow task-doc assertions now match the current outcome-oriented stderr contract and the targeted task-doc workflow test passes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T09:51:35.141Z, excerpt_hash=sha256:37f7d41fc854ac7efab274529eb225e66bdaca9b0a42a3e7b934b3cf08e6ec53

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the workflow test expectation changes if they stop matching the current task doc set stderr contract or require runtime changes.

## Findings

None yet.
