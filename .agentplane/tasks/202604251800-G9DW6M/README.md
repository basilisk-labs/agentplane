---
id: "202604251800-G9DW6M"
title: "Refactor preflight report helpers"
result_summary: "cli/run-cli/commands/core/preflight.ts now delegates report building and text rendering to focused helpers, dropped below hotspot threshold, and preflight readiness behavior stayed green under focused and global checks."
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
  updated_at: "2026-04-25T18:00:27.538Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-25T18:19:16.786Z"
  updated_by: "CODER"
  note: "Split cli/run-cli/commands/core/preflight.ts into preflight-report.ts and preflight-render.ts, reduced preflight.ts to 81 lines, and passed focused preflight/readiness tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks."
commit:
  hash: "5bd05f70b521236e4a86c4a34038d12582402881"
  message: "♻️ G9DW6M task: split preflight report helpers"
comments:
  -
    author: "CODER"
    body: "Start: Extract preflight report inference and drift-detection helpers from cli/run-cli/commands/core/preflight.ts into focused sibling modules while preserving CLI output, JSON shape, and exit behavior."
  -
    author: "CODER"
    body: "Verified: split preflight report inference and rendering helpers without changing JSON/text output or exit behavior; full validation suite passed."
events:
  -
    type: "status"
    at: "2026-04-25T18:00:27.572Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract preflight report inference and drift-detection helpers from cli/run-cli/commands/core/preflight.ts into focused sibling modules while preserving CLI output, JSON shape, and exit behavior."
  -
    type: "verify"
    at: "2026-04-25T18:19:16.786Z"
    author: "CODER"
    state: "ok"
    note: "Split cli/run-cli/commands/core/preflight.ts into preflight-report.ts and preflight-render.ts, reduced preflight.ts to 81 lines, and passed focused preflight/readiness tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks."
  -
    type: "status"
    at: "2026-04-25T18:19:23.833Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: split preflight report inference and rendering helpers without changing JSON/text output or exit behavior; full validation suite passed."
doc_version: 3
doc_updated_at: "2026-04-25T18:19:23.834Z"
doc_updated_by: "CODER"
description: "Extract preflight report inference and drift-detection helpers from cli/run-cli/commands/core/preflight.ts into focused sibling modules while preserving CLI output and exit behavior."
sections:
  Summary: |-
    Refactor preflight report helpers
    
    Extract preflight report inference and drift-detection helpers from cli/run-cli/commands/core/preflight.ts into focused sibling modules while preserving CLI output and exit behavior.
  Scope: |-
    - In scope: Extract preflight report inference and drift-detection helpers from cli/run-cli/commands/core/preflight.ts into focused sibling modules while preserving CLI output and exit behavior.
    - Out of scope: unrelated refactors not required for "Refactor preflight report helpers".
  Plan: "1. Split cli/run-cli/commands/core/preflight.ts into focused helpers for report inference/drift detection and command rendering while preserving JSON/text output and exit behavior. 2. Keep project/config/workflow/task-backend probing semantics unchanged, including next_actions and harness_health inference. 3. Run focused preflight tests if present plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-25T18:19:16.786Z — VERIFY — ok
    
    By: CODER
    
    Note: Split cli/run-cli/commands/core/preflight.ts into preflight-report.ts and preflight-render.ts, reduced preflight.ts to 81 lines, and passed focused preflight/readiness tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T18:00:27.611Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Refactor preflight report helpers

Extract preflight report inference and drift-detection helpers from cli/run-cli/commands/core/preflight.ts into focused sibling modules while preserving CLI output and exit behavior.

## Scope

- In scope: Extract preflight report inference and drift-detection helpers from cli/run-cli/commands/core/preflight.ts into focused sibling modules while preserving CLI output and exit behavior.
- Out of scope: unrelated refactors not required for "Refactor preflight report helpers".

## Plan

1. Split cli/run-cli/commands/core/preflight.ts into focused helpers for report inference/drift detection and command rendering while preserving JSON/text output and exit behavior. 2. Keep project/config/workflow/task-backend probing semantics unchanged, including next_actions and harness_health inference. 3. Run focused preflight tests if present plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-25T18:19:16.786Z — VERIFY — ok

By: CODER

Note: Split cli/run-cli/commands/core/preflight.ts into preflight-report.ts and preflight-render.ts, reduced preflight.ts to 81 lines, and passed focused preflight/readiness tests plus typecheck, lint, arch, hotspot, task-state, artifact, format, bootstrap, doctor, and routing checks.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T18:00:27.611Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
