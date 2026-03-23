---
id: "202603231310-T3Z3TQ"
title: "R7: Introduce RunnerAdapter and Codex stub"
result_summary: "Added RunnerAdapter interface and Codex stub adapter."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
depends_on:
  - "202603231310-BWD402"
tags:
  - "code"
  - "runner"
  - "codex"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T13:10:47.444Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved task graph for runner/scenario execute rollout"
verification:
  state: "ok"
  updated_at: "2026-03-23T14:14:45.437Z"
  updated_by: "CODER"
  note: "Runner adapter contract and Codex stub verified."
commit:
  hash: "b9afbee5b98f988390a76a80267ed577f3e6ca93"
  message: "✅ T3Z3TQ code: done"
comments:
  -
    author: "CODER"
    body: "Start: introduce the shared RunnerAdapter contract and a CodexAdapter stub that prepares a normalized invocation/result shape without executing a real runner yet."
  -
    author: "CODER"
    body: "Verified: introduced the shared RunnerAdapter contract, a config-selected adapter factory, and a Codex stub that normalizes invocation metadata and maps failures into RunnerResult."
events:
  -
    type: "status"
    at: "2026-03-23T14:08:28.813Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: introduce the shared RunnerAdapter contract and a CodexAdapter stub that prepares a normalized invocation/result shape without executing a real runner yet."
  -
    type: "verify"
    at: "2026-03-23T14:14:45.437Z"
    author: "CODER"
    state: "ok"
    note: "Runner adapter contract and Codex stub verified."
  -
    type: "status"
    at: "2026-03-23T14:14:55.277Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: introduced the shared RunnerAdapter contract, a config-selected adapter factory, and a Codex stub that normalizes invocation metadata and maps failures into RunnerResult."
doc_version: 3
doc_updated_at: "2026-03-23T14:14:59.695Z"
doc_updated_by: "CODER"
description: "Isolate runner execution behind a RunnerAdapter interface and add a Codex stub that only prepares invocation data."
sections:
  Summary: |-
    R7: Introduce RunnerAdapter and Codex stub
    
    Isolate runner execution behind a RunnerAdapter interface and add a Codex stub that only prepares invocation data.
  Scope: |-
    - In scope: Isolate runner execution behind a RunnerAdapter interface and add a Codex stub that only prepares invocation data.
    - Out of scope: unrelated refactors not required for "R7: Introduce RunnerAdapter and Codex stub".
  Plan: |-
    1. Define the RunnerAdapter contract used by task run and later scenario execute.
    2. Implement a Codex adapter stub that resolves command/env/args from the bundle path without actually executing work.
    3. Add unit tests for adapter success and error normalization.
  Verify Steps: |-
    1. Run adapter contract tests. Expected: the Codex stub returns normalized invocation metadata.
    2. Trigger an adapter error path in tests. Expected: the failure is mapped into the shared runner result contract.
    3. Inspect the stub output. Expected: it depends on bundle path and config, not on ad hoc inline prompt assembly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T14:14:45.437Z — VERIFY — ok
    
    By: CODER
    
    Note: Runner adapter contract and Codex stub verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T14:08:28.814Z, excerpt_hash=sha256:c9ca4e8ef294a9b8a4b730e33dd72447877a42d093dff146f3d399785f1531aa
    
    Details:
    
    - Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts
      Result: pass
      Evidence: 1 file, 2 tests passed; normalized invocation metadata and adapter failure-result mapping both covered.
      Scope: RunnerAdapter contract, Codex stub prepare/execute behavior, and factory-selected adapter path.
    - Command: ./node_modules/.bin/eslint packages/agentplane/src/runner/adapters/shared.ts packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/index.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/index.ts
      Result: pass
      Evidence: no lint findings after factory typing cleanup.
      Scope: new adapter layer and runner barrel exports.
    - Command: ./node_modules/.bin/prettier --check packages/agentplane/src/runner/adapters/shared.ts packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/index.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/index.ts
      Result: pass
      Evidence: all matched adapter files use Prettier code style.
      Scope: adapter layer formatting.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

R7: Introduce RunnerAdapter and Codex stub

Isolate runner execution behind a RunnerAdapter interface and add a Codex stub that only prepares invocation data.

## Scope

- In scope: Isolate runner execution behind a RunnerAdapter interface and add a Codex stub that only prepares invocation data.
- Out of scope: unrelated refactors not required for "R7: Introduce RunnerAdapter and Codex stub".

## Plan

1. Define the RunnerAdapter contract used by task run and later scenario execute.
2. Implement a Codex adapter stub that resolves command/env/args from the bundle path without actually executing work.
3. Add unit tests for adapter success and error normalization.

## Verify Steps

1. Run adapter contract tests. Expected: the Codex stub returns normalized invocation metadata.
2. Trigger an adapter error path in tests. Expected: the failure is mapped into the shared runner result contract.
3. Inspect the stub output. Expected: it depends on bundle path and config, not on ad hoc inline prompt assembly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T14:14:45.437Z — VERIFY — ok

By: CODER

Note: Runner adapter contract and Codex stub verified.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T14:08:28.814Z, excerpt_hash=sha256:c9ca4e8ef294a9b8a4b730e33dd72447877a42d093dff146f3d399785f1531aa

Details:

- Command: bunx vitest run packages/agentplane/src/runner/adapters/codex.test.ts
  Result: pass
  Evidence: 1 file, 2 tests passed; normalized invocation metadata and adapter failure-result mapping both covered.
  Scope: RunnerAdapter contract, Codex stub prepare/execute behavior, and factory-selected adapter path.
- Command: ./node_modules/.bin/eslint packages/agentplane/src/runner/adapters/shared.ts packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/index.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/index.ts
  Result: pass
  Evidence: no lint findings after factory typing cleanup.
  Scope: new adapter layer and runner barrel exports.
- Command: ./node_modules/.bin/prettier --check packages/agentplane/src/runner/adapters/shared.ts packages/agentplane/src/runner/adapters/codex.ts packages/agentplane/src/runner/adapters/index.ts packages/agentplane/src/runner/adapters/codex.test.ts packages/agentplane/src/runner/index.ts
  Result: pass
  Evidence: all matched adapter files use Prettier code style.
  Scope: adapter layer formatting.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
