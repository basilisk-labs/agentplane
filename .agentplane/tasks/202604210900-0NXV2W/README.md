---
id: "202604210900-0NXV2W"
title: "Remove legacy workflow path support"
status: "TODO"
priority: "normal"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604210900-RP5GA0"
tags:
  - "breaking"
  - "code"
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
doc_updated_at: "2026-04-21T09:00:35.649Z"
doc_updated_by: "PLANNER"
description: "Remove WORKFLOW.md compatibility only after the legacy bridge policy allows breaking cleanup."
sections:
  Summary: "Delete legacy workflow path compatibility if T23 approves removal; otherwise close as deferred with rationale."
  Scope: "In scope: workflow-runtime paths/file ops, workflow artifact helpers, doctor workflow checks, and tests. Out of scope: new workflow artifact layout."
  Plan: |-
    1. Confirm T23 authorizes removal.
    2. Remove legacyWorkflowPath branches and copy/delete behavior.
    3. Update tests and migration notes.
    4. Run workflow runtime and doctor tests.
  Verify Steps: |-
    - No live code depends on WORKFLOW.md as a compatibility source.
    - Migration guidance exists.
    - Workflow runtime/doctor tests pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore legacy path support and tests."
  Findings: "Breaking cleanup; gated by T23."
id_source: "generated"
---
## Summary

Delete legacy workflow path compatibility if T23 approves removal; otherwise close as deferred with rationale.

## Scope

In scope: workflow-runtime paths/file ops, workflow artifact helpers, doctor workflow checks, and tests. Out of scope: new workflow artifact layout.

## Plan

1. Confirm T23 authorizes removal.
2. Remove legacyWorkflowPath branches and copy/delete behavior.
3. Update tests and migration notes.
4. Run workflow runtime and doctor tests.

## Verify Steps

- No live code depends on WORKFLOW.md as a compatibility source.
- Migration guidance exists.
- Workflow runtime/doctor tests pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore legacy path support and tests.

## Findings

Breaking cleanup; gated by T23.
