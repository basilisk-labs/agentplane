---
id: "202603120929-158DXD"
title: "Split lifecycle CLI integration suite"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T09:30:22.988Z"
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
    body: "Start: split the oversized lifecycle CLI integration bucket into smaller suites while preserving the same lifecycle contracts and targeted regression coverage."
events:
  -
    type: "status"
    at: "2026-03-12T09:30:31.986Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split the oversized lifecycle CLI integration bucket into smaller suites while preserving the same lifecycle contracts and targeted regression coverage."
doc_version: 3
doc_updated_at: "2026-03-12T09:30:31.986Z"
doc_updated_by: "CODER"
description: "Decompose the oversized lifecycle integration test bucket into smaller suites without changing lifecycle behavior."
id_source: "generated"
---
## Summary

Split the oversized lifecycle CLI integration bucket into smaller suites without changing external lifecycle behavior.

## Scope

Touch only lifecycle integration tests and minimal shared test helpers needed for the split.

## Plan

Split lifecycle integration coverage into smaller suites with unchanged runtime behavior and equivalent assertions.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts --hookTimeout 60000 --testTimeout 60000` or the exact replacement test set.
2. Confirm moved cases preserve the previous lifecycle assertions and snapshots.
3. Run any additional targeted suite required by extracted shared helpers.

## Verification

Pending.

## Rollback Plan

Revert moved test files and helper extraction if the split changes behavior or weakens coverage.

## Findings

None yet.
