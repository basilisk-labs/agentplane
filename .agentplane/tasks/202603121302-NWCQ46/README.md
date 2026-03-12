---
id: "202603121302-NWCQ46"
title: "Cleanup phase: extract shared CLI integration test harness"
result_summary: "Removed duplicated AGENTPLANE_HOME/stdIO/task-backend-stub boilerplate from six large CLI suites by extending run-cli.test-helpers with a shared integration harness and contract-aligned backend stub defaults."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-12T13:14:47.961Z"
  updated_by: "CODER"
  note: "Passed eslint on the shared helper + migrated suites, reran 6 targeted CLI integration suites (173 tests), and rebuilt @agentplaneorg/core plus agentplane after the shared harness refactor."
commit:
  hash: "2132bfb916ef9b4326d001fe5f3f9ee520e51757"
  message: "🚧 NWCQ46 task: share run-cli integration harness"
comments:
  -
    author: "CODER"
    body: "Start: extract a shared run-cli integration harness from existing helpers and migrate the highest-churn CLI suites without changing behavior."
  -
    author: "CODER"
    body: "Verified: shared run-cli integration harness extracted; six high-churn suites now reuse common setup and backend stubs with no behavior change."
events:
  -
    type: "status"
    at: "2026-03-12T13:05:06.081Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract a shared run-cli integration harness from existing helpers and migrate the highest-churn CLI suites without changing behavior."
  -
    type: "verify"
    at: "2026-03-12T13:14:47.961Z"
    author: "CODER"
    state: "ok"
    note: "Passed eslint on the shared helper + migrated suites, reran 6 targeted CLI integration suites (173 tests), and rebuilt @agentplaneorg/core plus agentplane after the shared harness refactor."
  -
    type: "status"
    at: "2026-03-12T13:14:55.985Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: shared run-cli integration harness extracted; six high-churn suites now reuse common setup and backend stubs with no behavior change."
doc_version: 3
doc_updated_at: "2026-03-12T13:14:55.985Z"
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
#### 2026-03-12T13:14:47.961Z — VERIFY — ok

By: CODER

Note: Passed eslint on the shared helper + migrated suites, reran 6 targeted CLI integration suites (173 tests), and rebuilt @agentplaneorg/core plus agentplane after the shared harness refactor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T13:14:33.153Z, excerpt_hash=sha256:bf4c7b22f9ddcd1e5ef20624259b6f9f704cc26202cfb628cf72ca8af01ced0e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. The shared stub helper now provides default TaskBackend capabilities, which keeps CLI integration tests aligned with the current backend contract instead of relying on weaker ad-hoc local stubs.
