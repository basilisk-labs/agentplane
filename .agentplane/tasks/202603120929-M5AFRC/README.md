---
id: "202603120929-M5AFRC"
title: "Split guard CLI integration suite"
status: "TODO"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T09:38:09.915Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-03-12T09:30:00.144Z"
doc_updated_by: "PLANNER"
description: "Decompose the oversized guard integration test bucket by contract area without changing guard behavior."
id_source: "generated"
---
## Summary

Split the oversized guard CLI integration bucket by contract area without changing guard or commit behavior.

## Scope

Touch only guard integration tests and minimal shared helpers needed to separate contract-focused suites.

## Plan

Split guard integration coverage into contract-focused suites with unchanged guard semantics and equivalent regression coverage.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.guard*.test.ts --hookTimeout 60000 --testTimeout 60000` or the exact replacement test set.
2. Confirm allowlist, reconcile, and guard-diagnostic assertions are preserved after the split.
3. Run any additional targeted suite required by shared helper extraction.

## Verification

Pending.

## Rollback Plan

Revert the test file split and helper changes if any guard contract becomes weaker or moves out of coverage.

## Findings

None yet.
