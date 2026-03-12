---
id: "202603120950-7QTX45"
title: "Sync workflow test with task doc set outcomes"
status: "DOING"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: align the stale workflow task-doc stderr expectations with the current outcome-oriented task doc set contract without changing runtime behavior."
events:
  -
    type: "status"
    at: "2026-03-12T09:51:35.141Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align the stale workflow task-doc stderr expectations with the current outcome-oriented task doc set contract without changing runtime behavior."
doc_version: 3
doc_updated_at: "2026-03-12T09:51:35.141Z"
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

## Rollback Plan

Revert the workflow test expectation changes if they stop matching the current task doc set stderr contract or require runtime changes.

## Findings

None yet.
