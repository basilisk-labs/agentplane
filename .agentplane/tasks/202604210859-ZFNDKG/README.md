---
id: "202604210859-ZFNDKG"
title: "Tighten Knip unused-code guard"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604210859-2TSS0Y"
tags:
  - "ci"
  - "code"
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
doc_updated_at: "2026-04-21T08:59:32.524Z"
doc_updated_by: "PLANNER"
description: "Move Knip enforcement from warn-only toward failing on newly introduced unused exports/files while preserving existing ignores."
sections:
  Summary: "Make Knip useful as a regression guard without forcing immediate cleanup of all historical unused-code findings."
  Scope: "In scope: knip config/scripts and CI/local command behavior. Out of scope: broad unused-code cleanup."
  Plan: |-
    1. Inspect current knip scripts and ignore baseline.
    2. Configure failure for new unused files/exports if supported by existing workflow.
    3. Keep existing known ignores explicit.
    4. Run knip and related checks.
  Verify Steps: |-
    - Existing repository passes without expanding ignore lists.
    - A newly added unused export/file would fail the chosen guard.
    - The command behavior is documented in package scripts/config.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert knip config/script changes."
  Findings: "Source input: REFACTORING_PLAN D.2."
id_source: "generated"
---
## Summary

Make Knip useful as a regression guard without forcing immediate cleanup of all historical unused-code findings.

## Scope

In scope: knip config/scripts and CI/local command behavior. Out of scope: broad unused-code cleanup.

## Plan

1. Inspect current knip scripts and ignore baseline.
2. Configure failure for new unused files/exports if supported by existing workflow.
3. Keep existing known ignores explicit.
4. Run knip and related checks.

## Verify Steps

- Existing repository passes without expanding ignore lists.
- A newly added unused export/file would fail the chosen guard.
- The command behavior is documented in package scripts/config.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert knip config/script changes.

## Findings

Source input: REFACTORING_PLAN D.2.
