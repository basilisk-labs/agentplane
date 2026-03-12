---
id: "202603121004-16JS42"
title: "Split workflow command mixed test bucket"
status: "DOING"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split the oversized workflow command test bucket into smaller task-doc, verify-hooks, and maintenance suites while preserving the same assertions and runtime contracts."
events:
  -
    type: "status"
    at: "2026-03-12T10:04:50.408Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split the oversized workflow command test bucket into smaller task-doc, verify-hooks, and maintenance suites while preserving the same assertions and runtime contracts."
doc_version: 3
doc_updated_at: "2026-03-12T10:04:50.408Z"
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

## Rollback Plan

Revert the suite split if the new file layout weakens coverage, changes assertions, or forces runtime behavior changes.

## Findings

None yet.
