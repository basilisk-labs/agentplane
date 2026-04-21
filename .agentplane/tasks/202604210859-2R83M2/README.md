---
id: "202604210859-2R83M2"
title: "Split Redmine backend runtime responsibilities"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
  - "refactor"
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
doc_updated_at: "2026-04-21T08:59:54.894Z"
doc_updated_by: "PLANNER"
description: "Decompose Redmine backend runtime into mapping, client-call, and cache-management modules without changing backend behavior."
sections:
  Summary: "Reduce the Redmine backend runtime hotspot by separating data mapping, request/client operations, and cache/state handling."
  Scope: "In scope: Redmine backend runtime files and direct backend tests. Out of scope: Redmine API feature changes and backend registry redesign."
  Plan: |-
    1. Identify cohesive sections in backend-runtime.ts.
    2. Extract mapping helpers, client calls, and cache management into owned modules.
    3. Preserve public exports and backend registry integration.
    4. Run Redmine backend tests.
  Verify Steps: |-
    - backend-runtime.ts is smaller with clear delegated modules.
    - Redmine backend tests pass.
    - No task backend interface changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert extracted modules and restore previous runtime file."
  Findings: "Source input: REFACTORING_PLAN C.2."
id_source: "generated"
---
## Summary

Reduce the Redmine backend runtime hotspot by separating data mapping, request/client operations, and cache/state handling.

## Scope

In scope: Redmine backend runtime files and direct backend tests. Out of scope: Redmine API feature changes and backend registry redesign.

## Plan

1. Identify cohesive sections in backend-runtime.ts.
2. Extract mapping helpers, client calls, and cache management into owned modules.
3. Preserve public exports and backend registry integration.
4. Run Redmine backend tests.

## Verify Steps

- backend-runtime.ts is smaller with clear delegated modules.
- Redmine backend tests pass.
- No task backend interface changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert extracted modules and restore previous runtime file.

## Findings

Source input: REFACTORING_PLAN C.2.
