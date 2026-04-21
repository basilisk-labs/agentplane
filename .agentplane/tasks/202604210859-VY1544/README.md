---
id: "202604210859-VY1544"
title: "Emit WARN for active legacy migration bridges"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604210859-3GKMTX"
tags:
  - "code"
  - "migration"
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
doc_updated_at: "2026-04-21T08:59:23.928Z"
doc_updated_by: "PLANNER"
description: "Add structured deprecation warnings when legacy migration bridges are exercised so removal readiness can be measured before breaking changes."
sections:
  Summary: "Instrument active legacy paths with logger.warn messages that state the future removal intent and migration action."
  Scope: "In scope: v1 task index, legacy workflow path, doc v2 handling, old source redirect, and doctor legacy task README fix if those paths are present. Out of scope: deleting those bridges."
  Plan: |-
    1. Inventory the exact remaining legacy bridge code paths.
    2. Add structured WARN logs at runtime hit points, with stable event names and migration guidance.
    3. Add tests that trigger each warning without broad fixture churn.
    4. Ensure warnings do not fire on modern paths.
  Verify Steps: |-
    - Each active bridge emits one clear warning when exercised.
    - Modern-path tests do not gain noisy warnings.
    - No bridge is removed in this task.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Remove warning instrumentation and tests for this task only."
  Findings: "This is the safe patch-release alternative before any breaking removal."
id_source: "generated"
---
## Summary

Instrument active legacy paths with logger.warn messages that state the future removal intent and migration action.

## Scope

In scope: v1 task index, legacy workflow path, doc v2 handling, old source redirect, and doctor legacy task README fix if those paths are present. Out of scope: deleting those bridges.

## Plan

1. Inventory the exact remaining legacy bridge code paths.
2. Add structured WARN logs at runtime hit points, with stable event names and migration guidance.
3. Add tests that trigger each warning without broad fixture churn.
4. Ensure warnings do not fire on modern paths.

## Verify Steps

- Each active bridge emits one clear warning when exercised.
- Modern-path tests do not gain noisy warnings.
- No bridge is removed in this task.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove warning instrumentation and tests for this task only.

## Findings

This is the safe patch-release alternative before any breaking removal.
