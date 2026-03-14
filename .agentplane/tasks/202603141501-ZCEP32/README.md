---
id: "202603141501-ZCEP32"
title: "Stabilize finish close-commit deterministic timeout case"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
depends_on: []
tags:
  - "release"
  - "code"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T15:03:01.956Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as atomic release unblock task for v0.3.7."
verification:
  state: "ok"
  updated_at: "2026-03-14T15:13:59.173Z"
  updated_by: "CODER"
  note: "The deterministic finish --close-commit case was not semantically regressing; isolated it takes about 3s, but under full release load it exhausted the existing 60s budget. Raising only that test to 120s keeps the close-commit assertions unchanged while leaving the full block-finish suite, tsc, and package builds green."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce the finish --close-commit deterministic timeout in isolation and under full release-gate load, confirm whether the 60s budget is simply too low, and patch the smallest coherent fix without weakening close-commit assertions."
events:
  -
    type: "status"
    at: "2026-03-14T15:12:47.254Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the finish --close-commit deterministic timeout in isolation and under full release-gate load, confirm whether the 60s budget is simply too low, and patch the smallest coherent fix without weakening close-commit assertions."
  -
    type: "verify"
    at: "2026-03-14T15:13:59.173Z"
    author: "CODER"
    state: "ok"
    note: "The deterministic finish --close-commit case was not semantically regressing; isolated it takes about 3s, but under full release load it exhausted the existing 60s budget. Raising only that test to 120s keeps the close-commit assertions unchanged while leaving the full block-finish suite, tsc, and package builds green."
doc_version: 3
doc_updated_at: "2026-03-14T15:13:59.178Z"
doc_updated_by: "CODER"
description: "Stabilize the finish --close-commit deterministic same-command flow under full release load."
sections:
  Summary: |-
    Stabilize finish close-commit deterministic timeout case
    
    Stabilize the finish --close-commit deterministic same-command flow under full release load.
  Scope: |-
    - In scope: Stabilize the finish --close-commit deterministic same-command flow under full release load.
    - Out of scope: unrelated refactors not required for "Stabilize finish close-commit deterministic timeout case".
  Plan: |-
    1. Reproduce the finish --close-commit deterministic timeout in isolation and confirm whether the slowdown is budget drift or a close-commit regression.
    2. Patch the narrowest timeout or fixture detail needed while keeping deterministic close-commit assertions intact.
    3. Re-run the block-finish suite and tsc, then record any remaining full-gate caveat in Findings.
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T15:13:59.173Z — VERIFY — ok
    
    By: CODER
    
    Note: The deterministic finish --close-commit case was not semantically regressing; isolated it takes about 3s, but under full release load it exhausted the existing 60s budget. Raising only that test to 120s keeps the close-commit assertions unchanged while leaving the full block-finish suite, tsc, and package builds green.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T15:12:47.256Z, excerpt_hash=sha256:b5b56c8101aefe5a54d562e58760488224a091d9252995e4ddd36d7656d13e0e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Stabilize finish close-commit deterministic timeout case

Stabilize the finish --close-commit deterministic same-command flow under full release load.

## Scope

- In scope: Stabilize the finish --close-commit deterministic same-command flow under full release load.
- Out of scope: unrelated refactors not required for "Stabilize finish close-commit deterministic timeout case".

## Plan

1. Reproduce the finish --close-commit deterministic timeout in isolation and confirm whether the slowdown is budget drift or a close-commit regression.
2. Patch the narrowest timeout or fixture detail needed while keeping deterministic close-commit assertions intact.
3. Re-run the block-finish suite and tsc, then record any remaining full-gate caveat in Findings.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T15:13:59.173Z — VERIFY — ok

By: CODER

Note: The deterministic finish --close-commit case was not semantically regressing; isolated it takes about 3s, but under full release load it exhausted the existing 60s budget. Raising only that test to 120s keeps the close-commit assertions unchanged while leaving the full block-finish suite, tsc, and package builds green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T15:12:47.256Z, excerpt_hash=sha256:b5b56c8101aefe5a54d562e58760488224a091d9252995e4ddd36d7656d13e0e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
