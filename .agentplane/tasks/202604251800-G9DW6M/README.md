---
id: "202604251800-G9DW6M"
title: "Refactor preflight report helpers"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Extract preflight report inference and drift-detection helpers from cli/run-cli/commands/core/preflight.ts into focused sibling modules while preserving CLI output, JSON shape, and exit behavior."
events:
  -
    type: "status"
    at: "2026-04-25T18:00:27.572Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract preflight report inference and drift-detection helpers from cli/run-cli/commands/core/preflight.ts into focused sibling modules while preserving CLI output, JSON shape, and exit behavior."
doc_version: 3
doc_updated_at: "2026-04-25T18:00:27.611Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
