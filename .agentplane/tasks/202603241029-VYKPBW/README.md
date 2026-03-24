---
id: "202603241029-VYKPBW"
title: "Add live Codex smoke harness for runner regressions"
result_summary: "Live Codex smoke harness now classifies runner outcomes and validates the current repo-local runner via fixture and live temp-repo execution."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603241029-3A427Q"
  - "202603241029-A28MVW"
tags:
  - "code"
  - "runner"
  - "codex"
  - "smoke"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T12:12:10.875Z"
  updated_by: "ORCHESTRATOR"
  note: "Live Codex smoke harness scope approved for temp-repo execution and classification."
verification:
  state: "ok"
  updated_at: "2026-03-24T12:21:24.516Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/runner/codex-smoke.test.ts | bun scripts/run-runner-codex-smoke.mjs --fixture-outcome success|timeout|policy_refusal|runner_failure | bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build | bun scripts/run-runner-codex-smoke.mjs --live --keep-workspace; Result: pass; Evidence: 4 classification tests passed, all four fixture outcomes normalized correctly, and live smoke on repo-local bin completed with status=success, exit_code=0, marker RUNNER_LIVE_SMOKE_OK present, raw-trace/stderr/result artifacts emitted, duration_ms=90770; Scope: packages/agentplane/src/runner/codex-smoke.ts, packages/agentplane/src/runner/codex-smoke.test.ts, scripts/run-runner-codex-smoke.mjs, package.json."
commit:
  hash: "cfdb26ba6113b025a8178aea70563c6f5541116d"
  message: "✅ VYKPBW code: done"
comments:
  -
    author: "CODER"
    body: "Start: implement a temp-repo live Codex smoke harness, add classification tests, and verify it with focused tests plus source builds."
  -
    author: "CODER"
    body: "Verified: added a repo-local live Codex smoke harness, covered outcome classification with focused tests, and confirmed the current checkout runner succeeds on a temp task with emitted trace artifacts."
events:
  -
    type: "status"
    at: "2026-03-24T12:12:10.879Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement a temp-repo live Codex smoke harness, add classification tests, and verify it with focused tests plus source builds."
  -
    type: "verify"
    at: "2026-03-24T12:21:24.516Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/runner/codex-smoke.test.ts | bun scripts/run-runner-codex-smoke.mjs --fixture-outcome success|timeout|policy_refusal|runner_failure | bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build | bun scripts/run-runner-codex-smoke.mjs --live --keep-workspace; Result: pass; Evidence: 4 classification tests passed, all four fixture outcomes normalized correctly, and live smoke on repo-local bin completed with status=success, exit_code=0, marker RUNNER_LIVE_SMOKE_OK present, raw-trace/stderr/result artifacts emitted, duration_ms=90770; Scope: packages/agentplane/src/runner/codex-smoke.ts, packages/agentplane/src/runner/codex-smoke.test.ts, scripts/run-runner-codex-smoke.mjs, package.json."
  -
    type: "status"
    at: "2026-03-24T12:21:45.870Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: added a repo-local live Codex smoke harness, covered outcome classification with focused tests, and confirmed the current checkout runner succeeds on a temp task with emitted trace artifacts."
doc_version: 3
doc_updated_at: "2026-03-24T12:21:45.870Z"
doc_updated_by: "CODER"
description: "Add a live Codex-backed smoke harness that distinguishes timeout, policy refusal, and runner failure for tiny runner tasks."
sections:
  Summary: |-
    Add live Codex smoke harness for runner regressions
    
    Add a live Codex-backed smoke harness that distinguishes timeout, policy refusal, and runner failure for tiny runner tasks.
  Scope: |-
    - In scope: Add a live Codex-backed smoke harness that distinguishes timeout, policy refusal, and runner failure for tiny runner tasks.
    - Out of scope: unrelated refactors not required for "Add live Codex smoke harness for runner regressions".
  Plan: "1. Inspect existing smoke and CLI harness helpers plus prior manual Codex repro tasks. 2. Add a live Codex smoke harness entrypoint that materializes a tiny task, runs the shared runner, and classifies success, timeout, policy refusal, or runner failure from persisted artifacts. 3. Add focused tests around the harness logic while keeping live execution opt-in and clearly separated from fake-adapter tests. 4. Run targeted checks, record verification evidence, and finish with a single task-scoped commit."
  Verify Steps: |-
    1. Run focused tests for the smoke harness logic. Expected: the harness classifies success, timeout, policy refusal, and runner failure from persisted run artifacts without requiring fake adapter semantics.
    2. Exercise the harness in dry-run or fixture mode and, when live Codex is available, in live mode. Expected: it materializes a tiny task/run, captures trace evidence, and reports a normalized smoke outcome.
    3. Run source build for @agentplaneorg/core and agentplane. Expected: touched runner, CLI, and harness files build without regressions.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T12:21:24.516Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/runner/codex-smoke.test.ts | bun scripts/run-runner-codex-smoke.mjs --fixture-outcome success|timeout|policy_refusal|runner_failure | bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build | bun scripts/run-runner-codex-smoke.mjs --live --keep-workspace; Result: pass; Evidence: 4 classification tests passed, all four fixture outcomes normalized correctly, and live smoke on repo-local bin completed with status=success, exit_code=0, marker RUNNER_LIVE_SMOKE_OK present, raw-trace/stderr/result artifacts emitted, duration_ms=90770; Scope: packages/agentplane/src/runner/codex-smoke.ts, packages/agentplane/src/runner/codex-smoke.test.ts, scripts/run-runner-codex-smoke.mjs, package.json.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T12:12:10.882Z, excerpt_hash=sha256:96527f8e0f0ca6db0545996e38e6120e2175b567be06453ddc68d69a5f3fcacb
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add live Codex smoke harness for runner regressions

Add a live Codex-backed smoke harness that distinguishes timeout, policy refusal, and runner failure for tiny runner tasks.

## Scope

- In scope: Add a live Codex-backed smoke harness that distinguishes timeout, policy refusal, and runner failure for tiny runner tasks.
- Out of scope: unrelated refactors not required for "Add live Codex smoke harness for runner regressions".

## Plan

1. Inspect existing smoke and CLI harness helpers plus prior manual Codex repro tasks. 2. Add a live Codex smoke harness entrypoint that materializes a tiny task, runs the shared runner, and classifies success, timeout, policy refusal, or runner failure from persisted artifacts. 3. Add focused tests around the harness logic while keeping live execution opt-in and clearly separated from fake-adapter tests. 4. Run targeted checks, record verification evidence, and finish with a single task-scoped commit.

## Verify Steps

1. Run focused tests for the smoke harness logic. Expected: the harness classifies success, timeout, policy refusal, and runner failure from persisted run artifacts without requiring fake adapter semantics.
2. Exercise the harness in dry-run or fixture mode and, when live Codex is available, in live mode. Expected: it materializes a tiny task/run, captures trace evidence, and reports a normalized smoke outcome.
3. Run source build for @agentplaneorg/core and agentplane. Expected: touched runner, CLI, and harness files build without regressions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T12:21:24.516Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/runner/codex-smoke.test.ts | bun scripts/run-runner-codex-smoke.mjs --fixture-outcome success|timeout|policy_refusal|runner_failure | bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build | bun scripts/run-runner-codex-smoke.mjs --live --keep-workspace; Result: pass; Evidence: 4 classification tests passed, all four fixture outcomes normalized correctly, and live smoke on repo-local bin completed with status=success, exit_code=0, marker RUNNER_LIVE_SMOKE_OK present, raw-trace/stderr/result artifacts emitted, duration_ms=90770; Scope: packages/agentplane/src/runner/codex-smoke.ts, packages/agentplane/src/runner/codex-smoke.test.ts, scripts/run-runner-codex-smoke.mjs, package.json.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T12:12:10.882Z, excerpt_hash=sha256:96527f8e0f0ca6db0545996e38e6120e2175b567be06453ddc68d69a5f3fcacb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
