---
id: "202603121342-B13H40"
title: "Cleanup phase: migrate remaining CLI suites to shared harness"
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
  updated_at: "2026-03-12T13:43:40.255Z"
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
    body: "Start: migrate the remaining run-cli integration suites onto the shared CLI harness and shared backend stub helper, keeping assertions and command behavior unchanged."
events:
  -
    type: "status"
    at: "2026-03-12T13:43:59.101Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate the remaining run-cli integration suites onto the shared CLI harness and shared backend stub helper, keeping assertions and command behavior unchanged."
doc_version: 3
doc_updated_at: "2026-03-12T13:50:13.724Z"
doc_updated_by: "CODER"
description: "Replace residual registerAgentplaneHome/silenceStdIO/stubTaskBackend boilerplate across the remaining run-cli integration suites with the shared run-cli test helpers without changing behavior."
id_source: "generated"
---
## Summary

Cleanup phase: migrate remaining CLI suites to shared harness

Replace residual registerAgentplaneHome/silenceStdIO/stubTaskBackend boilerplate across the remaining run-cli integration suites with the shared run-cli test helpers without changing behavior.

## Scope

- In scope: Replace residual registerAgentplaneHome/silenceStdIO/stubTaskBackend boilerplate across the remaining run-cli integration suites with the shared run-cli test helpers without changing behavior.
- Out of scope: unrelated refactors not required for "Cleanup phase: migrate remaining CLI suites to shared harness".

## Plan

1. Identify the remaining run-cli integration suites that still inline AGENTPLANE_HOME registration, stdio silencing, and local task-backend stubs.
2. Migrate those suites to the shared run-cli test harness and shared backend stub helper without changing runtime behavior.
3. Remove now-stale local boilerplate and tighten imports or eslint suppressions exposed by the migration.
4. Run targeted tests, lint, and builds; then record evidence and finish the task.

## Verify Steps

1. Run the migrated run-cli integration suites. Expected: all touched CLI suites pass with no behavior change.
2. Run lint for the shared helper and migrated test files. Expected: no new lint violations.
3. Build the touched packages after the harness migration. Expected: @agentplaneorg/core and agentplane build successfully.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. The shared run-cli harness now covers the remaining high-churn integration suites, leaving far fewer files with local AGENTPLANE_HOME/stdIO/task-backend stub boilerplate.
2. While migrating the touched suites, one stale guard-commit expectation surfaced and was aligned with the current formatter-specific diagnostics contract.
