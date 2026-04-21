---
id: "202604210900-M6XXWF"
title: "Resolve old source redirect and doctor legacy fix retention"
status: "TODO"
priority: "normal"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604210900-RP5GA0"
tags:
  - "code"
  - "doctor"
  - "migration"
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
doc_updated_at: "2026-04-21T09:00:54.107Z"
doc_updated_by: "PLANNER"
description: "Either remove or explicitly retain the old source redirect and doctor legacy README fix based on evidence and user-impact policy."
sections:
  Summary: "Handle two low-cost compatibility paths that SAFE_TO_REMOVE marks as questionable removals: old source redirect and safeFixLegacyUntrackedTaskReadmes."
  Scope: "In scope: materialize/source redirect, doctor legacy README fix, tests, and retention/removal documentation. Out of scope: broad upgrade command redesign."
  Plan: |-
    1. Read T23 decision for each path.
    2. If removal is approved, delete code/tests and add migration note.
    3. If retention is approved, add clear comments/tests documenting why it stays.
    4. Run upgrade/doctor tests.
  Verify Steps: |-
    - Each path is either removed with release notes or retained with explicit rationale.
    - Tests match the chosen policy.
    - No ambiguous half-deprecated state remains.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore previous redirect/doctor behavior if removal causes regressions."
  Findings: "SAFE_TO_REMOVE recommends retaining these longer despite the generic cleanup plan."
id_source: "generated"
---
## Summary

Handle two low-cost compatibility paths that SAFE_TO_REMOVE marks as questionable removals: old source redirect and safeFixLegacyUntrackedTaskReadmes.

## Scope

In scope: materialize/source redirect, doctor legacy README fix, tests, and retention/removal documentation. Out of scope: broad upgrade command redesign.

## Plan

1. Read T23 decision for each path.
2. If removal is approved, delete code/tests and add migration note.
3. If retention is approved, add clear comments/tests documenting why it stays.
4. Run upgrade/doctor tests.

## Verify Steps

- Each path is either removed with release notes or retained with explicit rationale.
- Tests match the chosen policy.
- No ambiguous half-deprecated state remains.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore previous redirect/doctor behavior if removal causes regressions.

## Findings

SAFE_TO_REMOVE recommends retaining these longer despite the generic cleanup plan.
