---
id: "202602081238-JRMT4S"
title: "MONO: Decompose remaining large source modules"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081238-E47R1X"
  - "202602081238-XJ2RJJ"
  - "202602081238-QMXVTN"
  - "202602081238-CNP0K7"
  - "202602081238-GEAQGN"
  - "202602081344-5XQEDA"
  - "202602081344-Q67G9W"
  - "202602081344-GF5VSS"
  - "202602081344-7KD2TP"
tags:
  - "cli"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T13:46:45.747Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T14:34:53.505Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: dependent tasks 5XQEDA/Q67G9W/GF5VSS/7KD2TP are DONE; bun run test:full PASS on main (vitest, 704 tests) after completing the final decomposition step."
commit:
  hash: "2232c8ae1f2e380859c13287da6a182478e1c900"
  message: "✅ 7KD2TP close: record finish metadata"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: close out the MONO decomposition wave by verifying all dependent tasks are DONE and full test suite passes."
  -
    author: "ORCHESTRATOR"
    body: "Verified: all dependent decomposition tasks are DONE; bun run test:full PASS on main (vitest, 704 tests). Epic closed without additional code changes."
events: []
doc_version: 2
doc_updated_at: "2026-02-08T14:35:00.378Z"
doc_updated_by: "ORCHESTRATOR"
description: "Second wave of monolith decomposition after CLI2 migration: split remaining large production files into smaller modules with stable boundaries and tests."
---
## Summary

Track the second wave of monolith decomposition after the cli2/spec-driven CLI migration. The goal is to split remaining large production modules into smaller, testable units with stable boundaries and no behavior regressions.

## Scope

In scope:
1. backends/task-backend/redmine-backend.ts
2. cli/run-cli.ts
3. commands/recipes/impl/commands.ts
4. commands/pr/integrate/cmd.ts

Out of scope:
1. Feature changes to CLI behavior or backend semantics (refactor-only).
2. Any network/Redmine integration changes beyond moving code and clarifying boundaries.

## Plan

1. Decompose Redmine backend (task 202602081344-5XQEDA).
2. Decompose cli/run-cli.ts (task 202602081344-Q67G9W).
3. Decompose recipes impl commands (task 202602081344-GF5VSS).
4. Further decompose integrate core (task 202602081344-7KD2TP).
5. Run bun run test:full on main after each task and at the end.

## Risks

1. Accidental behavior changes due to moving logic across modules.
2. Type-level circular dependencies or import cycles after splitting.
3. Test brittleness (string snapshots) when touching help/output code.

## Verify Steps

1. Ensure all dependent decomposition tasks are DONE and pushed.
Pass: agentplane task list shows no DOING/TODO for the listed tasks.
2. Run bun run test:full on main.
Pass: exit code 0.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T14:34:53.505Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: dependent tasks 5XQEDA/Q67G9W/GF5VSS/7KD2TP are DONE; bun run test:full PASS on main (vitest, 704 tests) after completing the final decomposition step.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T14:34:37.096Z, excerpt_hash=sha256:99a2e6a6e2527e160c4f1903c2c0c87c1b9c0c36e70f104f7be3e69b8a066bb8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Rollback is per-task and per-commit.
1. Revert the implementation commit(s) for the failing task id.
2. Re-run bun run test:full.
3. If needed, revert the corresponding close metadata commit.
