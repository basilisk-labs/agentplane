---
id: "202604210900-Q33H9D"
title: "Split task artifact schema by document domain"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
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
doc_updated_at: "2026-04-21T09:00:05.527Z"
doc_updated_by: "PLANNER"
description: "Break the large task artifact Zod schema into focused schema modules for task, handoff, findings, verification, and PR metadata."
sections:
  Summary: "Decompose task-artifact-schema.ts into domain-specific schema modules without changing serialized artifact compatibility."
  Scope: "In scope: core task artifact schemas, exports, and schema tests. Out of scope: schema version changes."
  Plan: |-
    1. Map existing schema sections to task/handoff/findings/verify/pr-meta domains.
    2. Extract modules while preserving public exports and inferred types.
    3. Add/adjust tests to prove artifact compatibility.
    4. Run core schema tests/typecheck.
  Verify Steps: |-
    - Serialized task artifacts remain compatible.
    - Public exports do not break downstream imports.
    - Schema tests/typecheck pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert schema module extraction."
  Findings: "Source input: REFACTORING_PLAN C.4."
id_source: "generated"
---
## Summary

Decompose task-artifact-schema.ts into domain-specific schema modules without changing serialized artifact compatibility.

## Scope

In scope: core task artifact schemas, exports, and schema tests. Out of scope: schema version changes.

## Plan

1. Map existing schema sections to task/handoff/findings/verify/pr-meta domains.
2. Extract modules while preserving public exports and inferred types.
3. Add/adjust tests to prove artifact compatibility.
4. Run core schema tests/typecheck.

## Verify Steps

- Serialized task artifacts remain compatible.
- Public exports do not break downstream imports.
- Schema tests/typecheck pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert schema module extraction.

## Findings

Source input: REFACTORING_PLAN C.4.
