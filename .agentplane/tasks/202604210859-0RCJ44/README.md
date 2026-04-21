---
id: "202604210859-0RCJ44"
title: "Inventory large tests and settle test suffix convention"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "conventions"
  - "docs"
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
doc_updated_at: "2026-04-21T08:59:41.647Z"
doc_updated_by: "PLANNER"
description: "Document the largest test files and decide whether the repository standard is .test.ts or .spec.ts before further splitting."
sections:
  Summary: "Create a concrete inventory of oversized tests and establish a single test file suffix convention for future cleanup."
  Scope: "In scope: inventory output in task findings/docs, CONTRIBUTING/ADR update if appropriate, and no behavior changes. Out of scope: renaming/splitting tests."
  Plan: |-
    1. Generate top test-file size inventory.
    2. Compare current .test.ts/.spec.ts usage by package/domain.
    3. Record a convention decision in the smallest appropriate docs location.
    4. Identify top candidates for the split task.
  Verify Steps: |-
    - Top oversized tests are listed with line counts.
    - The suffix convention is explicitly documented.
    - No test behavior changes occur in this task.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert documentation changes; inventory remains in task findings if useful."
  Findings: "Source input: AUDIT L-3 and REFACTORING_PLAN G.1/G.3."
id_source: "generated"
---
## Summary

Create a concrete inventory of oversized tests and establish a single test file suffix convention for future cleanup.

## Scope

In scope: inventory output in task findings/docs, CONTRIBUTING/ADR update if appropriate, and no behavior changes. Out of scope: renaming/splitting tests.

## Plan

1. Generate top test-file size inventory.
2. Compare current .test.ts/.spec.ts usage by package/domain.
3. Record a convention decision in the smallest appropriate docs location.
4. Identify top candidates for the split task.

## Verify Steps

- Top oversized tests are listed with line counts.
- The suffix convention is explicitly documented.
- No test behavior changes occur in this task.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert documentation changes; inventory remains in task findings if useful.

## Findings

Source input: AUDIT L-3 and REFACTORING_PLAN G.1/G.3.
