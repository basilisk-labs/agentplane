---
id: "202604210859-2TSS0Y"
title: "Add depcruise trend guard"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "ci"
  - "code"
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
doc_updated_at: "2026-04-21T08:59:28.194Z"
doc_updated_by: "PLANNER"
description: "Prevent dependency-cruiser known-violation baseline growth and verify the baseline format is stable enough for review."
sections:
  Summary: "Add a guard that fails on growth in dependency-cruiser known violations and documents the baseline format decision."
  Scope: "In scope: depcruise check script/config/CI script and baseline-count validation. Out of scope: draining violations."
  Plan: |-
    1. Inspect current depcruise scripts and known-violations format.
    2. Add a trend/count guard that fails on growth.
    3. If the file format is unstable, normalize or document why current format is acceptable.
    4. Run arch dependency checks.
  Verify Steps: |-
    - Current baseline passes.
    - Artificial baseline growth fails the guard.
    - arch:deps or equivalent command remains green.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Remove trend guard wiring and any baseline normalization."
  Findings: "Source input: AUDIT H-3/M-1 and REFACTORING_PLAN D.1."
id_source: "generated"
---
## Summary

Add a guard that fails on growth in dependency-cruiser known violations and documents the baseline format decision.

## Scope

In scope: depcruise check script/config/CI script and baseline-count validation. Out of scope: draining violations.

## Plan

1. Inspect current depcruise scripts and known-violations format.
2. Add a trend/count guard that fails on growth.
3. If the file format is unstable, normalize or document why current format is acceptable.
4. Run arch dependency checks.

## Verify Steps

- Current baseline passes.
- Artificial baseline growth fails the guard.
- arch:deps or equivalent command remains green.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove trend guard wiring and any baseline normalization.

## Findings

Source input: AUDIT H-3/M-1 and REFACTORING_PLAN D.1.
