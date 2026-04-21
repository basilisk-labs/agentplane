---
id: "202604210900-0KTEA5"
title: "Remove legacy task index v1 support"
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
doc_updated_at: "2026-04-21T09:00:26.156Z"
doc_updated_by: "PLANNER"
description: "Remove tasks-index.v1 compatibility only after the legacy bridge policy allows breaking cleanup."
sections:
  Summary: "Delete legacy v1 task index support if T23 approves removal; otherwise close as deferred with rationale."
  Scope: "In scope: task-index v1 constants/branches/tests and migration documentation. Out of scope: unrelated task backend rewrites."
  Plan: |-
    1. Confirm T23 authorizes removal.
    2. Remove LEGACY_TASK_INDEX_FILENAME and v1 load branches.
    3. Update tests and migration/release notes.
    4. Run task backend tests.
  Verify Steps: |-
    - No live code references tasks-index.v1.json.
    - Migration guidance exists.
    - Task backend tests pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore v1 support branches and tests."
  Findings: "This is intentionally gated because it can break old repositories."
id_source: "generated"
---
## Summary

Delete legacy v1 task index support if T23 approves removal; otherwise close as deferred with rationale.

## Scope

In scope: task-index v1 constants/branches/tests and migration documentation. Out of scope: unrelated task backend rewrites.

## Plan

1. Confirm T23 authorizes removal.
2. Remove LEGACY_TASK_INDEX_FILENAME and v1 load branches.
3. Update tests and migration/release notes.
4. Run task backend tests.

## Verify Steps

- No live code references tasks-index.v1.json.
- Migration guidance exists.
- Task backend tests pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore v1 support branches and tests.

## Findings

This is intentionally gated because it can break old repositories.
