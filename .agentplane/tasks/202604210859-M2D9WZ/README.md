---
id: "202604210859-M2D9WZ"
title: "Inventory production console usage"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "logging"
  - "tooling"
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
doc_updated_at: "2026-04-21T08:59:11.133Z"
doc_updated_by: "PLANNER"
description: "Add a baseline check for production console.* usage so structured logging migration has measurable progress."
sections:
  Summary: "Create a production console usage inventory/check that excludes tests and approved script/UX paths."
  Scope: "In scope: a small check script, package script wiring, baseline count, and docs in task findings. Out of scope: replacing console usages."
  Plan: |-
    1. Inspect existing script-runtime/check patterns.
    2. Add a check that scans packages/**/*.ts excluding tests and approved paths.
    3. Record a baseline and fail only above baseline for this step.
    4. Wire into an appropriate local check surface.
  Verify Steps: |-
    - Check reports current console usage count and exits non-zero when count exceeds baseline.
    - Baseline is below the audit target or justified if higher.
    - Tests/scripts are excluded deliberately, not accidentally.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Remove the check and script wiring."
  Findings: "Source input: REFACTORING_PLAN B.1 and AUDIT H-2/M-7."
id_source: "generated"
---
## Summary

Create a production console usage inventory/check that excludes tests and approved script/UX paths.

## Scope

In scope: a small check script, package script wiring, baseline count, and docs in task findings. Out of scope: replacing console usages.

## Plan

1. Inspect existing script-runtime/check patterns.
2. Add a check that scans packages/**/*.ts excluding tests and approved paths.
3. Record a baseline and fail only above baseline for this step.
4. Wire into an appropriate local check surface.

## Verify Steps

- Check reports current console usage count and exits non-zero when count exceeds baseline.
- Baseline is below the audit target or justified if higher.
- Tests/scripts are excluded deliberately, not accidentally.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Remove the check and script wiring.

## Findings

Source input: REFACTORING_PLAN B.1 and AUDIT H-2/M-7.
