---
id: "202603121302-NWCQ46"
title: "Cleanup phase: extract shared CLI integration test harness"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T13:04:56.658Z"
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
    body: "Start: extract a shared run-cli integration harness from existing helpers and migrate the highest-churn CLI suites without changing behavior."
events:
  -
    type: "status"
    at: "2026-03-12T13:05:06.081Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract a shared run-cli integration harness from existing helpers and migrate the highest-churn CLI suites without changing behavior."
doc_version: 3
doc_updated_at: "2026-03-12T13:05:06.081Z"
doc_updated_by: "CODER"
description: "Introduce a shared helper for run-cli integration suites to remove repeated registerAgentplaneHome/stdIO/task-backend stub boilerplate and migrate the highest-churn CLI test buckets to it without changing behavior."
id_source: "generated"
---
## Summary

Cleanup phase: extract shared CLI integration test harness

Introduce a shared helper for run-cli integration suites to remove repeated registerAgentplaneHome/stdIO/task-backend stub boilerplate and migrate the highest-churn CLI test buckets to it without changing behavior.

## Scope

- In scope: Introduce a shared helper for run-cli integration suites to remove repeated registerAgentplaneHome/stdIO/task-backend stub boilerplate and migrate the highest-churn CLI test buckets to it without changing behavior.
- Out of scope: unrelated refactors not required for "Cleanup phase: extract shared CLI integration test harness".

## Plan

1. Extend the existing run-cli test helper with a reusable harness for agent home registration and stdio silencing.
2. Add a shared stubTaskBackend helper to remove repeated boilerplate from CLI integration suites.
3. Migrate the highest-churn run-cli suites to the shared helper without changing runtime behavior.
4. Run targeted tests, lint, and builds; then record evidence and finish the task.

## Verify Steps

1. Run targeted CLI integration suites that were migrated to the shared harness. Expected: they pass with no behavior change.
2. Run lint for the shared helper and migrated test files. Expected: no new lint violations.
3. Build the touched packages after the refactor. Expected: both @agentplaneorg/core and agentplane build successfully.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
