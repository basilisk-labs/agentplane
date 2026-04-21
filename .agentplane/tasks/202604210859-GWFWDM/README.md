---
id: "202604210859-GWFWDM"
title: "Unify Zod validation error formatting"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "schemas"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-21T08:59:06.883Z"
doc_updated_by: "PLANNER"
description: "Standardize schema validation diagnostics on zod-validation-error so CLI and core schema failures use one readable format."
sections:
  Summary: "Route schema validation formatting through zod-validation-error consistently across CLI/core-facing validation surfaces."
  Scope: "In scope: existing formatSchemaErrors helpers, package dependency placement if required, and validation tests. Out of scope: schema shape changes."
  Plan: |-
    1. Locate all schema error formatting helpers and direct ZodError rendering.
    2. Consolidate through zod-validation-error while preserving machine-readable codes.
    3. Add/adjust tests for nested path and multiple issue output.
    4. Run schema/CLI tests.
  Verify Steps: |-
    - Validation messages share one format across command/config/schema surfaces.
    - Existing error codes and exit behavior are preserved.
    - Tests cover representative nested errors.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert formatter and dependency changes for this task only."
  Findings: "Source input: REFACTORING_PLAN A.4."
id_source: "generated"
---
## Summary

Route schema validation formatting through zod-validation-error consistently across CLI/core-facing validation surfaces.

## Scope

In scope: existing formatSchemaErrors helpers, package dependency placement if required, and validation tests. Out of scope: schema shape changes.

## Plan

1. Locate all schema error formatting helpers and direct ZodError rendering.
2. Consolidate through zod-validation-error while preserving machine-readable codes.
3. Add/adjust tests for nested path and multiple issue output.
4. Run schema/CLI tests.

## Verify Steps

- Validation messages share one format across command/config/schema surfaces.
- Existing error codes and exit behavior are preserved.
- Tests cover representative nested errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert formatter and dependency changes for this task only.

## Findings

Source input: REFACTORING_PLAN A.4.
