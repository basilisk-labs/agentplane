---
id: "202604210859-824XT0"
title: "Split oversized test files by scenario family"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604210859-0RCJ44"
tags:
  - "code"
  - "refactor"
  - "testing"
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
doc_updated_at: "2026-04-21T08:59:46.119Z"
doc_updated_by: "PLANNER"
description: "Break selected large test files into smaller scenario-focused files after the suffix convention is settled."
sections:
  Summary: "Split the highest-value oversized test files using describe/scenario boundaries while preserving test semantics and runtime selection."
  Scope: "In scope: top test files from T15, import/testkit updates, and Vitest workspace inclusion. Out of scope: production code changes unless required by test helper extraction."
  Plan: |-
    1. Pick the top files from the approved T15 inventory.
    2. Split by scenario family and keep helper duplication low.
    3. Ensure Vitest workspace globs still include renamed files.
    4. Run affected Vitest projects.
  Verify Steps: |-
    - Selected files fall below the target size threshold or have a documented exception.
    - Affected tests pass.
    - No production behavior changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore original test files and remove split files for this task only."
  Findings: "Depends on T15 to avoid churn from changing suffix convention later."
id_source: "generated"
---
## Summary

Split the highest-value oversized test files using describe/scenario boundaries while preserving test semantics and runtime selection.

## Scope

In scope: top test files from T15, import/testkit updates, and Vitest workspace inclusion. Out of scope: production code changes unless required by test helper extraction.

## Plan

1. Pick the top files from the approved T15 inventory.
2. Split by scenario family and keep helper duplication low.
3. Ensure Vitest workspace globs still include renamed files.
4. Run affected Vitest projects.

## Verify Steps

- Selected files fall below the target size threshold or have a documented exception.
- Affected tests pass.
- No production behavior changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore original test files and remove split files for this task only.

## Findings

Depends on T15 to avoid churn from changing suffix convention later.
