---
id: "202604191642-E9ZVBF"
title: "Use zod-validation-error in CLI validation output"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "schemas"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T15:38:58.244Z"
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
    body: "Start: Wiring zod-validation-error into CLI validation error rendering."
events:
  -
    type: "status"
    at: "2026-04-20T15:38:58.827Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Wiring zod-validation-error into CLI validation error rendering."
doc_version: 3
doc_updated_at: "2026-04-20T15:38:58.844Z"
doc_updated_by: "CODER"
description: "Epic K and H′. Adopt zod-validation-error for human-readable schema and config validation output in the CLI."
sections:
  Summary: |-
    Use zod-validation-error in CLI validation output
    
    Epic K and H′. Adopt zod-validation-error for human-readable schema and config validation output in the CLI.
  Scope: |-
    - In scope: Epic K and H′. Adopt zod-validation-error for human-readable schema and config validation output in the CLI.
    - Out of scope: unrelated refactors not required for "Use zod-validation-error in CLI validation output".
  Plan: "Adopt zod-validation-error only at the CLI error-rendering boundary. Add the dependency, route ZodError rendering through the helper in the unified error mapper, preserve existing CLI error envelope fields, and add focused tests for config/schema validation output so invalid Zod input produces stable human-readable guidance without ad-hoc formatting. Verification: focused error-map/config tests plus format, lint, build."
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

Use zod-validation-error in CLI validation output

Epic K and H′. Adopt zod-validation-error for human-readable schema and config validation output in the CLI.

## Scope

- In scope: Epic K and H′. Adopt zod-validation-error for human-readable schema and config validation output in the CLI.
- Out of scope: unrelated refactors not required for "Use zod-validation-error in CLI validation output".

## Plan

Adopt zod-validation-error only at the CLI error-rendering boundary. Add the dependency, route ZodError rendering through the helper in the unified error mapper, preserve existing CLI error envelope fields, and add focused tests for config/schema validation output so invalid Zod input produces stable human-readable guidance without ad-hoc formatting. Verification: focused error-map/config tests plus format, lint, build.

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
