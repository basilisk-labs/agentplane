---
id: "202605221727-7KQE04"
title: "Split mutable hosted metadata from tracked evidence"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "git"
  - "workflow"
verify:
  - "Confirm quality review freshness can be checked without self-invalidating evidence commits."
  - "Run PR artifact schema and migration tests."
  - "Run pr open/update tests confirming no tracked volatile metadata churn."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:27:13.512Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-22T17:27:53.657Z"
doc_updated_by: "PLANNER"
description: "Move volatile PR/check/head metadata out of tracked task artifacts or make it computed live so evidence updates do not invalidate reviewed implementation commits."
sections:
  Summary: |-
    Split mutable hosted metadata from tracked evidence

    Move volatile PR/check/head metadata out of tracked task artifacts or make it computed live so evidence updates do not invalidate reviewed implementation commits.
  Scope: |-
    - In scope: Move volatile PR/check/head metadata out of tracked task artifacts or make it computed live so evidence updates do not invalidate reviewed implementation commits.
    - Out of scope: unrelated refactors not required for "Split mutable hosted metadata from tracked evidence".
  Plan: "Define and implement a boundary between immutable tracked evidence and mutable hosted/runtime metadata. Tracked task artifacts should not store volatile fields that force artifact-only commits or quality-review SHA churn after implementation review."
  Verify Steps: |-
    1. Run PR artifact schema and migration tests.
    2. Run pr open/update tests confirming no tracked volatile metadata churn.
    3. Confirm quality review freshness can be checked without self-invalidating evidence commits.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Split mutable hosted metadata from tracked evidence

Move volatile PR/check/head metadata out of tracked task artifacts or make it computed live so evidence updates do not invalidate reviewed implementation commits.

## Scope

- In scope: Move volatile PR/check/head metadata out of tracked task artifacts or make it computed live so evidence updates do not invalidate reviewed implementation commits.
- Out of scope: unrelated refactors not required for "Split mutable hosted metadata from tracked evidence".

## Plan

Define and implement a boundary between immutable tracked evidence and mutable hosted/runtime metadata. Tracked task artifacts should not store volatile fields that force artifact-only commits or quality-review SHA churn after implementation review.

## Verify Steps

1. Run PR artifact schema and migration tests.
2. Run pr open/update tests confirming no tracked volatile metadata churn.
3. Confirm quality review freshness can be checked without self-invalidating evidence commits.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
