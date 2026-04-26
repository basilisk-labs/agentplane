---
id: "202604251820-7BWJQY"
title: "Refactor scenario command helpers"
result_summary: "commands/scenario/impl/commands.ts now delegates selection/validation and tool execution to focused helpers, dropped below hotspot threshold, and scenario command behavior remained green under focused and global checks."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-25T18:20:23.643Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-25T19:04:35.623Z"
  updated_by: "CODER"
  note: "Split commands/scenario/impl/commands.ts into scenario-selection.ts and scenario-tool-runtime.ts, reduced commands.ts to 144 lines, and passed focused scenario command tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks."
commit:
  hash: "b240ce466579d657d5f1520291ac0c8cf4c23cb9"
  message: "♻️ 7BWJQY task: split scenario command helpers"
comments:
  -
    author: "CODER"
    body: "Start: Extract scenario selection, validation, and tool-runtime helpers from commands/scenario/impl/commands.ts into focused sibling modules while preserving CLI output and error mapping."
  -
    author: "CODER"
    body: "Verified: split scenario selection, validation, and tool-runtime helpers without changing CLI output or error semantics; full validation suite passed."
events:
  -
    type: "status"
    at: "2026-04-25T18:20:23.649Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract scenario selection, validation, and tool-runtime helpers from commands/scenario/impl/commands.ts into focused sibling modules while preserving CLI output and error mapping."
  -
    type: "verify"
    at: "2026-04-25T19:04:35.623Z"
    author: "CODER"
    state: "ok"
    note: "Split commands/scenario/impl/commands.ts into scenario-selection.ts and scenario-tool-runtime.ts, reduced commands.ts to 144 lines, and passed focused scenario command tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks."
  -
    type: "status"
    at: "2026-04-25T19:04:42.516Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: split scenario selection, validation, and tool-runtime helpers without changing CLI output or error semantics; full validation suite passed."
doc_version: 3
doc_updated_at: "2026-04-25T19:04:42.517Z"
doc_updated_by: "CODER"
description: "Extract recipe-scenario selection, validation, and tool-runtime helpers from commands/scenario/impl/commands.ts into focused sibling modules while preserving CLI output and error mapping."
sections:
  Summary: |-
    Refactor scenario command helpers
    
    Extract recipe-scenario selection, validation, and tool-runtime helpers from commands/scenario/impl/commands.ts into focused sibling modules while preserving CLI output and error mapping.
  Scope: |-
    - In scope: Extract recipe-scenario selection, validation, and tool-runtime helpers from commands/scenario/impl/commands.ts into focused sibling modules while preserving CLI output and error mapping.
    - Out of scope: unrelated refactors not required for "Refactor scenario command helpers".
  Plan: "1. Split commands/scenario/impl/commands.ts into focused helpers for scenario selection/validation and tool runtime execution while preserving current CLI output and error semantics. 2. Keep recipe scenario list/info/run behavior unchanged, including compatibility checks and CliError mapping. 3. Run focused scenario command tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-25T19:04:35.623Z — VERIFY — ok
    
    By: CODER
    
    Note: Split commands/scenario/impl/commands.ts into scenario-selection.ts and scenario-tool-runtime.ts, reduced commands.ts to 144 lines, and passed focused scenario command tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T18:20:23.672Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Refactor scenario command helpers

Extract recipe-scenario selection, validation, and tool-runtime helpers from commands/scenario/impl/commands.ts into focused sibling modules while preserving CLI output and error mapping.

## Scope

- In scope: Extract recipe-scenario selection, validation, and tool-runtime helpers from commands/scenario/impl/commands.ts into focused sibling modules while preserving CLI output and error mapping.
- Out of scope: unrelated refactors not required for "Refactor scenario command helpers".

## Plan

1. Split commands/scenario/impl/commands.ts into focused helpers for scenario selection/validation and tool runtime execution while preserving current CLI output and error semantics. 2. Keep recipe scenario list/info/run behavior unchanged, including compatibility checks and CliError mapping. 3. Run focused scenario command tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-25T19:04:35.623Z — VERIFY — ok

By: CODER

Note: Split commands/scenario/impl/commands.ts into scenario-selection.ts and scenario-tool-runtime.ts, reduced commands.ts to 144 lines, and passed focused scenario command tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T18:20:23.672Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
