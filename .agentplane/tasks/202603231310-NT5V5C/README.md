---
id: "202603231310-NT5V5C"
title: "R3: Define runner bundle and artifact layout"
result_summary: "Introduced runner-neutral bundle and artifact layout contracts."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
depends_on:
  - "202603231310-KRJJY0"
tags:
  - "code"
  - "runner"
  - "schema"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T13:10:40.800Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved task graph for runner/scenario execute rollout"
verification:
  state: "ok"
  updated_at: "2026-03-23T13:48:33.203Z"
  updated_by: "CODER"
  note: "Runner bundle/layout contract and artifact writers verified."
commit:
  hash: "1a7895126a1867597368658c3f9b2654dbfef44a"
  message: "✅ NT5V5C code: done"
comments:
  -
    author: "CODER"
    body: "Start: define runner-neutral bundle schema, run artifact layout, and stable serialization paths for task executions."
  -
    author: "CODER"
    body: "Verified: introduced a runner-neutral bundle/run-state contract with task-local runs/<run-id> artifact paths and prepared artifact writers."
events:
  -
    type: "status"
    at: "2026-03-23T13:42:02.127Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: define runner-neutral bundle schema, run artifact layout, and stable serialization paths for task executions."
  -
    type: "verify"
    at: "2026-03-23T13:48:33.203Z"
    author: "CODER"
    state: "ok"
    note: "Runner bundle/layout contract and artifact writers verified."
  -
    type: "status"
    at: "2026-03-23T13:48:50.934Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: introduced a runner-neutral bundle/run-state contract with task-local runs/<run-id> artifact paths and prepared artifact writers."
doc_version: 3
doc_updated_at: "2026-03-23T13:49:07.557Z"
doc_updated_by: "CODER"
description: "Introduce runner-neutral bundle and run-state contracts with task-local run artifact directories."
sections:
  Summary: |-
    R3: Define runner bundle and artifact layout
    
    Introduce runner-neutral bundle and run-state contracts with task-local run artifact directories.
  Scope: |-
    - In scope: Introduce runner-neutral bundle and run-state contracts with task-local run artifact directories.
    - Out of scope: unrelated refactors not required for "R3: Define runner bundle and artifact layout".
  Plan: |-
    1. Define bundle, invocation result, and run-state data structures for the runner flow.
    2. Choose and implement task-local artifact paths under .agentplane/tasks/<task-id>/runs/<run-id>/.
    3. Add tests for artifact naming and serialized bundle snapshots.
  Verify Steps: |-
    1. Produce a dry bundle snapshot in tests. Expected: bundle.json and run-state metadata match the contract.
    2. Inspect the computed artifact paths. Expected: they live under the task-local runs directory and include a stable run id.
    3. Run schema or snapshot tests for the new artifacts. Expected: contract changes are captured explicitly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T13:48:33.203Z — VERIFY — ok
    
    By: CODER
    
    Note: Runner bundle/layout contract and artifact writers verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T13:42:02.128Z, excerpt_hash=sha256:637b997772aa4ce027650bc500e299791ad88d64fdb4a34dbc4705335d78f8b0
    
    Details:
    
    Command: ./node_modules/.bin/prettier --check packages/agentplane/src/runner/types.ts packages/agentplane/src/runner/run-id.ts packages/agentplane/src/runner/task-run-paths.ts packages/agentplane/src/runner/artifacts.ts packages/agentplane/src/runner/index.ts packages/agentplane/src/runner/task-run-paths.test.ts packages/agentplane/src/runner/artifacts.test.ts
    Result: pass
    Evidence: runner contract and test files match repo formatting rules.
    Scope: runner-neutral schema and artifact helper layer.
    
    Command: ./node_modules/.bin/eslint packages/agentplane/src/runner/types.ts packages/agentplane/src/runner/run-id.ts packages/agentplane/src/runner/task-run-paths.ts packages/agentplane/src/runner/artifacts.ts packages/agentplane/src/runner/index.ts packages/agentplane/src/runner/task-run-paths.test.ts packages/agentplane/src/runner/artifacts.test.ts
    Result: pass
    Evidence: no lint violations in the new runner layer.
    Scope: runner-neutral schema and artifact helper layer.
    
    Command: bunx vitest run packages/agentplane/src/runner/task-run-paths.test.ts packages/agentplane/src/runner/artifacts.test.ts
    Result: pass
    Evidence: 2 test files passed, 2 tests passed; verified task-local runs/<run-id> layout plus bundle/state/events serialization.
    Scope: runner artifact path and prepared bundle contract.
    
    Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane task show 202603231310-NT5V5C
    Result: pass
    Evidence: task show remained readable for the active runner-contract task.
    Scope: task metadata surface during runner rollout.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

R3: Define runner bundle and artifact layout

Introduce runner-neutral bundle and run-state contracts with task-local run artifact directories.

## Scope

- In scope: Introduce runner-neutral bundle and run-state contracts with task-local run artifact directories.
- Out of scope: unrelated refactors not required for "R3: Define runner bundle and artifact layout".

## Plan

1. Define bundle, invocation result, and run-state data structures for the runner flow.
2. Choose and implement task-local artifact paths under .agentplane/tasks/<task-id>/runs/<run-id>/.
3. Add tests for artifact naming and serialized bundle snapshots.

## Verify Steps

1. Produce a dry bundle snapshot in tests. Expected: bundle.json and run-state metadata match the contract.
2. Inspect the computed artifact paths. Expected: they live under the task-local runs directory and include a stable run id.
3. Run schema or snapshot tests for the new artifacts. Expected: contract changes are captured explicitly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T13:48:33.203Z — VERIFY — ok

By: CODER

Note: Runner bundle/layout contract and artifact writers verified.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T13:42:02.128Z, excerpt_hash=sha256:637b997772aa4ce027650bc500e299791ad88d64fdb4a34dbc4705335d78f8b0

Details:

Command: ./node_modules/.bin/prettier --check packages/agentplane/src/runner/types.ts packages/agentplane/src/runner/run-id.ts packages/agentplane/src/runner/task-run-paths.ts packages/agentplane/src/runner/artifacts.ts packages/agentplane/src/runner/index.ts packages/agentplane/src/runner/task-run-paths.test.ts packages/agentplane/src/runner/artifacts.test.ts
Result: pass
Evidence: runner contract and test files match repo formatting rules.
Scope: runner-neutral schema and artifact helper layer.

Command: ./node_modules/.bin/eslint packages/agentplane/src/runner/types.ts packages/agentplane/src/runner/run-id.ts packages/agentplane/src/runner/task-run-paths.ts packages/agentplane/src/runner/artifacts.ts packages/agentplane/src/runner/index.ts packages/agentplane/src/runner/task-run-paths.test.ts packages/agentplane/src/runner/artifacts.test.ts
Result: pass
Evidence: no lint violations in the new runner layer.
Scope: runner-neutral schema and artifact helper layer.

Command: bunx vitest run packages/agentplane/src/runner/task-run-paths.test.ts packages/agentplane/src/runner/artifacts.test.ts
Result: pass
Evidence: 2 test files passed, 2 tests passed; verified task-local runs/<run-id> layout plus bundle/state/events serialization.
Scope: runner artifact path and prepared bundle contract.

Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane task show 202603231310-NT5V5C
Result: pass
Evidence: task show remained readable for the active runner-contract task.
Scope: task metadata surface during runner rollout.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
