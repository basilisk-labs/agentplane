---
id: "202603131047-Q916G7"
title: "Fix start Verify Steps stale-read path"
result_summary: "Local start no longer fails on stale Verify Steps or stale plan-approval state before entering the store-backed mutation path."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "task-doc"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T10:47:40.805Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T10:51:03.107Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 26/26 tests passed. Scope: start stale-read regression and lifecycle contract when plan approval is disabled. Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/task/start.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts; Result: pass; Evidence: no lint errors. Scope: touched runtime and test files. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both builds exited 0. Scope: repo-local CLI runtime build surfaces."
commit:
  hash: "31d893c854f10fa60f283fcf1cea1f80d2f5a737"
  message: "🩹 Q916G7 task: fix start Verify Steps stale-read path"
comments:
  -
    author: "CODER"
    body: "Start: reproduce and fix the stale Verify Steps gate in start when plan approval is disabled."
  -
    author: "CODER"
    body: "Verified: start now rechecks Verify Steps readiness against the current local task state and the stale snapshot regression is covered."
events:
  -
    type: "status"
    at: "2026-03-13T10:47:42.450Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce and fix the stale Verify Steps gate in start when plan approval is disabled."
  -
    type: "verify"
    at: "2026-03-13T10:51:03.107Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 26/26 tests passed. Scope: start stale-read regression and lifecycle contract when plan approval is disabled. Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/task/start.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts; Result: pass; Evidence: no lint errors. Scope: touched runtime and test files. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both builds exited 0. Scope: repo-local CLI runtime build surfaces."
  -
    type: "status"
    at: "2026-03-13T10:51:18.698Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: start now rechecks Verify Steps readiness against the current local task state and the stale snapshot regression is covered."
doc_version: 3
doc_updated_at: "2026-03-13T10:51:18.699Z"
doc_updated_by: "CODER"
description: "Make start use the current README state for Verify Steps gating when plan approval is disabled, and add regression coverage."
id_source: "generated"
---
## Summary

Fix start Verify Steps stale-read path

Make start use the current README state for Verify Steps gating when plan approval is disabled, and add regression coverage.

## Scope

- In scope: Make start use the current README state for Verify Steps gating when plan approval is disabled, and add regression coverage.
- Out of scope: unrelated refactors not required for "Fix start Verify Steps stale-read path".

## Plan

1. Reproduce the stale-read path in `start` when plan approval is disabled and Verify Steps is updated concurrently.
2. Add regression coverage for the current README-state contract in `start`.
3. Fix the local-file start path to validate against fresh store-backed state, not a stale initial snapshot.
4. Verify with targeted tests and record results.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000` and expect all tests to pass.
2. Run `./node_modules/.bin/eslint packages/agentplane/src/commands/task/start.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts` and expect no lint errors.
3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build` and expect both builds to exit 0.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T10:51:03.107Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 26/26 tests passed. Scope: start stale-read regression and lifecycle contract when plan approval is disabled. Command: ./node_modules/.bin/eslint packages/agentplane/src/commands/task/start.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts; Result: pass; Evidence: no lint errors. Scope: touched runtime and test files. Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; Result: pass; Evidence: both builds exited 0. Scope: repo-local CLI runtime build surfaces.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T10:50:54.960Z, excerpt_hash=sha256:152715abcc604154c63166a771b2aaa93b63286c886f4e533c2397e91f393e67

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Source: local-file `start` validated `Verify Steps` and plan-approval readiness against the initial `store.get()` snapshot before entering `store.patch`, so a concurrent README update could leave the live task startable while the command still failed on stale data.
- Fix: local-file `start` now defers those gates to the store-backed mutation path and derives commit metadata from the current task state captured inside the patch callback.
- Coverage: added a focused unit regression for stale initial snapshots and kept the CLI lifecycle suite green for the user-facing `require_plan=false` path.
