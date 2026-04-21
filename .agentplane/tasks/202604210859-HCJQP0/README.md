---
id: "202604210859-HCJQP0"
title: "Split hosted-close PR command pipeline"
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
  - "workflow"
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
doc_updated_at: "2026-04-21T08:59:50.432Z"
doc_updated_by: "PLANNER"
description: "Decompose hosted-close PR command into lifecycle modules while keeping command behavior unchanged."
sections:
  Summary: "Reduce the hosted-close PR command hotspot by extracting pre-check, execute, post-check, and report phases."
  Scope: "In scope: hosted-close PR command implementation and direct tests. Out of scope: changing hosted provider behavior or task lifecycle semantics."
  Plan: |-
    1. Read the existing hosted-close PR command flow and tests.
    2. Extract lifecycle modules following the existing finish-* pattern.
    3. Keep the command entrypoint small and declarative.
    4. Run affected command tests.
  Verify Steps: |-
    - Command entrypoint is substantially smaller and delegates to phase modules.
    - Existing hosted-close PR tests pass.
    - No public CLI contract changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert extracted modules and command entrypoint changes."
  Findings: "Source input: REFACTORING_PLAN C.1."
id_source: "generated"
---
## Summary

Reduce the hosted-close PR command hotspot by extracting pre-check, execute, post-check, and report phases.

## Scope

In scope: hosted-close PR command implementation and direct tests. Out of scope: changing hosted provider behavior or task lifecycle semantics.

## Plan

1. Read the existing hosted-close PR command flow and tests.
2. Extract lifecycle modules following the existing finish-* pattern.
3. Keep the command entrypoint small and declarative.
4. Run affected command tests.

## Verify Steps

- Command entrypoint is substantially smaller and delegates to phase modules.
- Existing hosted-close PR tests pass.
- No public CLI contract changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert extracted modules and command entrypoint changes.

## Findings

Source input: REFACTORING_PLAN C.1.
