---
id: "202604251820-7BWJQY"
title: "Refactor scenario command helpers"
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
  updated_at: "2026-04-25T18:20:23.643Z"
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
    body: "Start: Extract scenario selection, validation, and tool-runtime helpers from commands/scenario/impl/commands.ts into focused sibling modules while preserving CLI output and error mapping."
events:
  -
    type: "status"
    at: "2026-04-25T18:20:23.649Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract scenario selection, validation, and tool-runtime helpers from commands/scenario/impl/commands.ts into focused sibling modules while preserving CLI output and error mapping."
doc_version: 3
doc_updated_at: "2026-04-25T18:20:23.672Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
