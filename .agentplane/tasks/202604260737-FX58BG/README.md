---
id: "202604260737-FX58BG"
title: "Refactor init orchestrator helpers"
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
  updated_at: "2026-04-26T07:37:37.978Z"
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
    body: "Start: Extract answer collection, path/conflict resolution, and apply orchestration helpers from cli/run-cli/commands/init/orchestrate.ts into focused sibling modules while preserving init behavior and output semantics."
events:
  -
    type: "status"
    at: "2026-04-26T07:37:38.001Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract answer collection, path/conflict resolution, and apply orchestration helpers from cli/run-cli/commands/init/orchestrate.ts into focused sibling modules while preserving init behavior and output semantics."
doc_version: 3
doc_updated_at: "2026-04-26T07:37:38.040Z"
doc_updated_by: "CODER"
description: "Extract answer collection, path/conflict resolution, and apply orchestration helpers from cli/run-cli/commands/init/orchestrate.ts into focused sibling modules while preserving interactive and non-interactive init behavior."
sections:
  Summary: |-
    Refactor init orchestrator helpers
    
    Extract answer collection, path/conflict resolution, and apply orchestration helpers from cli/run-cli/commands/init/orchestrate.ts into focused sibling modules while preserving interactive and non-interactive init behavior.
  Scope: |-
    - In scope: Extract answer collection, path/conflict resolution, and apply orchestration helpers from cli/run-cli/commands/init/orchestrate.ts into focused sibling modules while preserving interactive and non-interactive init behavior.
    - Out of scope: unrelated refactors not required for "Refactor init orchestrator helpers".
  Plan: "1. Split cli/run-cli/commands/init/orchestrate.ts into focused helpers for answer collection, path/conflict resolution, and apply orchestration while preserving interactive, non-interactive, and --yes init behavior. 2. Keep conflict handling, install commit behavior, cached recipes, and CLI output/error semantics unchanged. 3. Run focused init unit tests plus cli-core init coverage and the standard typecheck/lint/arch/hotspot/task-state/artifact/format/bootstrap/doctor/routing suite."
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

Refactor init orchestrator helpers

Extract answer collection, path/conflict resolution, and apply orchestration helpers from cli/run-cli/commands/init/orchestrate.ts into focused sibling modules while preserving interactive and non-interactive init behavior.

## Scope

- In scope: Extract answer collection, path/conflict resolution, and apply orchestration helpers from cli/run-cli/commands/init/orchestrate.ts into focused sibling modules while preserving interactive and non-interactive init behavior.
- Out of scope: unrelated refactors not required for "Refactor init orchestrator helpers".

## Plan

1. Split cli/run-cli/commands/init/orchestrate.ts into focused helpers for answer collection, path/conflict resolution, and apply orchestration while preserving interactive, non-interactive, and --yes init behavior. 2. Keep conflict handling, install commit behavior, cached recipes, and CLI output/error semantics unchanged. 3. Run focused init unit tests plus cli-core init coverage and the standard typecheck/lint/arch/hotspot/task-state/artifact/format/bootstrap/doctor/routing suite.

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
