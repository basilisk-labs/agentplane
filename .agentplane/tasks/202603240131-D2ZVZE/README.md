---
id: "202603240131-D2ZVZE"
title: "Fail closed before spawn when adapter cannot enforce declared policy"
result_summary: "Runner preflight now refuses unenforceable recipe policy before spawn and records refusal artifacts."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "policy"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T01:43:42.606Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T01:50:49.129Z"
  updated_by: "CODER"
  note: "Task-run and scenario integration tests passed; unenforceable requires_human_approval policy now fails before spawn, writes refusal artifacts, and execute-path refusals are persisted back into task runner state."
commit:
  hash: "b409fce99d4b74b3ae71f6e5cc702b82d17bd3a3"
  message: "✅ D2ZVZE code: done"
comments:
  -
    author: "CODER"
    body: "Start: add a fail-closed preflight gate between declared runner policy and adapter capabilities, record refusal artifacts before spawn, and lock the behavior through task-run and scenario execute integration tests."
  -
    author: "CODER"
    body: "Verified: Added a fail-closed preflight gate between declared recipe policy and adapter capabilities, wrote refusal run artifacts before spawn, persisted execute-path refusals back into task state, and reran task-run and scenario integration tests, eslint, and source builds to confirm runner_refused flows stay deterministic."
events:
  -
    type: "status"
    at: "2026-03-24T01:43:43.232Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a fail-closed preflight gate between declared runner policy and adapter capabilities, record refusal artifacts before spawn, and lock the behavior through task-run and scenario execute integration tests."
  -
    type: "verify"
    at: "2026-03-24T01:50:49.129Z"
    author: "CODER"
    state: "ok"
    note: "Task-run and scenario integration tests passed; unenforceable requires_human_approval policy now fails before spawn, writes refusal artifacts, and execute-path refusals are persisted back into task runner state."
  -
    type: "status"
    at: "2026-03-24T01:50:53.390Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Added a fail-closed preflight gate between declared recipe policy and adapter capabilities, wrote refusal run artifacts before spawn, persisted execute-path refusals back into task state, and reran task-run and scenario integration tests, eslint, and source builds to confirm runner_refused flows stay deterministic."
doc_version: 3
doc_updated_at: "2026-03-24T01:50:53.390Z"
doc_updated_by: "CODER"
description: "Add a preflight compatibility gate between declared runner policy and adapter capabilities so unenforceable runs are rejected before prepare or spawn."
sections:
  Summary: |-
    Fail closed before spawn when adapter cannot enforce declared policy
    
    Add a preflight compatibility gate between declared runner policy and adapter capabilities so unenforceable runs are rejected before prepare or spawn.
  Scope: |-
    - In scope: Add a preflight compatibility gate between declared runner policy and adapter capabilities so unenforceable runs are rejected before prepare or spawn.
    - Out of scope: unrelated refactors not required for "Fail closed before spawn when adapter cannot enforce declared policy".
  Plan: "1. Introduce a preflight gate between declared runner policy and adapter capabilities. 2. Reject unenforceable runs before adapter prepare or process spawn. 3. Record a clear refusal reason in runner artifacts or CLI output. 4. Verify with targeted tests and source builds. Sequence: execute after VNAW92."
  Verify Steps: "1. Run bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts. 2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. 3. Confirm unenforceable declared policy fails before runner spawn and records a refusal reason."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T01:50:49.129Z — VERIFY — ok
    
    By: CODER
    
    Note: Task-run and scenario integration tests passed; unenforceable requires_human_approval policy now fails before spawn, writes refusal artifacts, and execute-path refusals are persisted back into task runner state.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T01:43:43.233Z, excerpt_hash=sha256:0cda527ecc4f4bd1d12413167236652c6742e92e5ac18382a2d5af7ed5eb746d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fail closed before spawn when adapter cannot enforce declared policy

Add a preflight compatibility gate between declared runner policy and adapter capabilities so unenforceable runs are rejected before prepare or spawn.

## Scope

- In scope: Add a preflight compatibility gate between declared runner policy and adapter capabilities so unenforceable runs are rejected before prepare or spawn.
- Out of scope: unrelated refactors not required for "Fail closed before spawn when adapter cannot enforce declared policy".

## Plan

1. Introduce a preflight gate between declared runner policy and adapter capabilities. 2. Reject unenforceable runs before adapter prepare or process spawn. 3. Record a clear refusal reason in runner artifacts or CLI output. 4. Verify with targeted tests and source builds. Sequence: execute after VNAW92.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts. 2. Run bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build. 3. Confirm unenforceable declared policy fails before runner spawn and records a refusal reason.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T01:50:49.129Z — VERIFY — ok

By: CODER

Note: Task-run and scenario integration tests passed; unenforceable requires_human_approval policy now fails before spawn, writes refusal artifacts, and execute-path refusals are persisted back into task runner state.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T01:43:43.233Z, excerpt_hash=sha256:0cda527ecc4f4bd1d12413167236652c6742e92e5ac18382a2d5af7ed5eb746d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
