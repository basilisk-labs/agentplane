---
id: "202604210859-21TB3J"
title: "Resolve recipe manifest and types hotspot"
status: "TODO"
priority: "low"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
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
doc_updated_at: "2026-04-21T09:00:00.618Z"
doc_updated_by: "PLANNER"
description: "Determine whether recipe manifest/types files are generated or hand-maintained, then either mark generated or decompose by domain."
sections:
  Summary: "Close the recipe manifest/types hotspot with the least-churn option: generated marker if generated, or domain split if hand-maintained."
  Scope: "In scope: packages/recipes manifest/types files and related imports/tests. Out of scope: recipe schema redesign."
  Plan: |-
    1. Determine whether files are generated, data-heavy, or manually structured code.
    2. If generated/data-heavy, add marker/docs and exclude from hotspot pressure if appropriate.
    3. If manual code, split into cohesive domain modules.
    4. Run recipe package tests/typecheck.
  Verify Steps: |-
    - Decision is explicit in code/docs/task findings.
    - If split, imports remain stable.
    - Recipe tests/typecheck pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert marker or module split changes."
  Findings: "Source input: REFACTORING_PLAN C.3."
id_source: "generated"
---
## Summary

Close the recipe manifest/types hotspot with the least-churn option: generated marker if generated, or domain split if hand-maintained.

## Scope

In scope: packages/recipes manifest/types files and related imports/tests. Out of scope: recipe schema redesign.

## Plan

1. Determine whether files are generated, data-heavy, or manually structured code.
2. If generated/data-heavy, add marker/docs and exclude from hotspot pressure if appropriate.
3. If manual code, split into cohesive domain modules.
4. Run recipe package tests/typecheck.

## Verify Steps

- Decision is explicit in code/docs/task findings.
- If split, imports remain stable.
- Recipe tests/typecheck pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert marker or module split changes.

## Findings

Source input: REFACTORING_PLAN C.3.
