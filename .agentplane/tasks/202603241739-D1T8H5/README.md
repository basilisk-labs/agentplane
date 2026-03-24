---
id: "202603241739-D1T8H5"
title: "Add live smoke harness for custom runner wrapper mode"
result_summary: "Live custom-wrapper smoke harness added and verified with both fixture and live wrapper executions."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "custom"
  - "smoke"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-24T17:40:53.633Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-24T17:54:13.123Z"
  updated_by: "CODER"
  note: "Verified live custom-wrapper smoke harness with bunx vitest run packages/agentplane/src/runner/codex-smoke.test.ts, bun scripts/run-runner-codex-smoke.mjs --fixture-outcome success, bun scripts/run-runner-codex-smoke.mjs --live-custom-wrapper --keep-workspace, bun run --filter=agentplane build; the live wrapper run completed with outcome success, exit_code 0, and the RUNNER_CUSTOM_WRAPPER_SMOKE_OK marker present in the run-local smoke artifact."
commit:
  hash: "a776a3b6b8c27a71ab07e2249b0fd64732a5bd3d"
  message: "✅ D1T8H5 code: add live custom wrapper smoke harness"
comments:
  -
    author: "CODER"
    body: "Start: extend the existing runner smoke harness with a live custom-wrapper mode that configures the custom adapter under codex sandbox full-auto, executes a deterministic smoke runner, and records the resulting trace and manifest artifacts."
  -
    author: "CODER"
    body: "Verified: the smoke harness now supports a live custom-wrapper mode that configures a project-local custom adapter under codex sandbox full-auto, executes the wrapper scenario through scenario execute, classifies the resulting run, and preserves run-state, result, trace, and smoke-artifact evidence for inspection."
events:
  -
    type: "status"
    at: "2026-03-24T17:41:06.448Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extend the existing runner smoke harness with a live custom-wrapper mode that configures the custom adapter under codex sandbox full-auto, executes a deterministic smoke runner, and records the resulting trace and manifest artifacts."
  -
    type: "verify"
    at: "2026-03-24T17:54:13.123Z"
    author: "CODER"
    state: "ok"
    note: "Verified live custom-wrapper smoke harness with bunx vitest run packages/agentplane/src/runner/codex-smoke.test.ts, bun scripts/run-runner-codex-smoke.mjs --fixture-outcome success, bun scripts/run-runner-codex-smoke.mjs --live-custom-wrapper --keep-workspace, bun run --filter=agentplane build; the live wrapper run completed with outcome success, exit_code 0, and the RUNNER_CUSTOM_WRAPPER_SMOKE_OK marker present in the run-local smoke artifact."
  -
    type: "status"
    at: "2026-03-24T17:54:25.178Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the smoke harness now supports a live custom-wrapper mode that configures a project-local custom adapter under codex sandbox full-auto, executes the wrapper scenario through scenario execute, classifies the resulting run, and preserves run-state, result, trace, and smoke-artifact evidence for inspection."
doc_version: 3
doc_updated_at: "2026-03-24T17:54:25.179Z"
doc_updated_by: "CODER"
description: "Extend the runner smoke harness to exercise the custom adapter under codex sandbox full-auto wrapper mode, classify the outcome, and preserve the resulting trace and manifest artifacts."
sections:
  Summary: |-
    Add live smoke harness for custom runner wrapper mode
    
    Extend the runner smoke harness to exercise the custom adapter under codex sandbox full-auto wrapper mode, classify the outcome, and preserve the resulting trace and manifest artifacts.
  Scope: |-
    - In scope: Extend the runner smoke harness to exercise the custom adapter under codex sandbox full-auto wrapper mode, classify the outcome, and preserve the resulting trace and manifest artifacts.
    - Out of scope: unrelated refactors not required for "Add live smoke harness for custom runner wrapper mode".
  Plan: |-
    1. Extend the existing runner smoke harness so it can run a live custom-adapter smoke under codex sandbox full-auto wrapper mode in a temporary repo-local workspace.
    2. Materialize a deterministic custom smoke runner script/config inside the temp repo, execute the run, and classify the outcome while preserving run-state/result/trace artifact paths.
    3. Add focused tests for the new fixture or live-mode surface, then run targeted smoke and build verification.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/runner/codex-smoke.test.ts. Expected: the smoke classifier and opt-in script surface still pass after adding the custom-wrapper mode.
    2. Run bun scripts/run-runner-codex-smoke.mjs --fixture-outcome success and bun scripts/run-runner-codex-smoke.mjs --live-custom-wrapper --keep-workspace. Expected: the fixture path succeeds and the live custom-wrapper run reports success with trace/result artifacts and the smoke marker present.
    3. Run bun run --filter=agentplane build. Expected: the smoke harness script and runner package build cleanly after the new mode is added.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-24T17:54:13.123Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified live custom-wrapper smoke harness with bunx vitest run packages/agentplane/src/runner/codex-smoke.test.ts, bun scripts/run-runner-codex-smoke.mjs --fixture-outcome success, bun scripts/run-runner-codex-smoke.mjs --live-custom-wrapper --keep-workspace, bun run --filter=agentplane build; the live wrapper run completed with outcome success, exit_code 0, and the RUNNER_CUSTOM_WRAPPER_SMOKE_OK marker present in the run-local smoke artifact.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T17:51:17.344Z, excerpt_hash=sha256:a9e00cdef60648f653a3da184f142a207fadb04381378c572b25111cfebfb41d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "- The live custom-wrapper smoke harness confirms a real codex sandbox full-auto run, and it also confirms the write boundary of that mode: custom smoke artifacts must be written inside run_dir rather than an arbitrary task subtree path."
id_source: "generated"
---
## Summary

Add live smoke harness for custom runner wrapper mode

Extend the runner smoke harness to exercise the custom adapter under codex sandbox full-auto wrapper mode, classify the outcome, and preserve the resulting trace and manifest artifacts.

## Scope

- In scope: Extend the runner smoke harness to exercise the custom adapter under codex sandbox full-auto wrapper mode, classify the outcome, and preserve the resulting trace and manifest artifacts.
- Out of scope: unrelated refactors not required for "Add live smoke harness for custom runner wrapper mode".

## Plan

1. Extend the existing runner smoke harness so it can run a live custom-adapter smoke under codex sandbox full-auto wrapper mode in a temporary repo-local workspace.
2. Materialize a deterministic custom smoke runner script/config inside the temp repo, execute the run, and classify the outcome while preserving run-state/result/trace artifact paths.
3. Add focused tests for the new fixture or live-mode surface, then run targeted smoke and build verification.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/runner/codex-smoke.test.ts. Expected: the smoke classifier and opt-in script surface still pass after adding the custom-wrapper mode.
2. Run bun scripts/run-runner-codex-smoke.mjs --fixture-outcome success and bun scripts/run-runner-codex-smoke.mjs --live-custom-wrapper --keep-workspace. Expected: the fixture path succeeds and the live custom-wrapper run reports success with trace/result artifacts and the smoke marker present.
3. Run bun run --filter=agentplane build. Expected: the smoke harness script and runner package build cleanly after the new mode is added.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-24T17:54:13.123Z — VERIFY — ok

By: CODER

Note: Verified live custom-wrapper smoke harness with bunx vitest run packages/agentplane/src/runner/codex-smoke.test.ts, bun scripts/run-runner-codex-smoke.mjs --fixture-outcome success, bun scripts/run-runner-codex-smoke.mjs --live-custom-wrapper --keep-workspace, bun run --filter=agentplane build; the live wrapper run completed with outcome success, exit_code 0, and the RUNNER_CUSTOM_WRAPPER_SMOKE_OK marker present in the run-local smoke artifact.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-24T17:51:17.344Z, excerpt_hash=sha256:a9e00cdef60648f653a3da184f142a207fadb04381378c572b25111cfebfb41d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- The live custom-wrapper smoke harness confirms a real codex sandbox full-auto run, and it also confirms the write boundary of that mode: custom smoke artifacts must be written inside run_dir rather than an arbitrary task subtree path.
