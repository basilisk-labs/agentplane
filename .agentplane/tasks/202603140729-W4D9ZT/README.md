---
id: "202603140729-W4D9ZT"
title: "Add Redmine canonical-state migration command"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 4
depends_on: []
tags:
  - "code"
  - "backend"
  - "redmine"
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
doc_updated_at: "2026-03-14T07:33:58.604Z"
doc_updated_by: "PLANNER"
description: "Provide a migration path that backfills canonical_state into existing Redmine issues from legacy doc-backed tasks, reports migrated or skipped issues, and preserves canonical task content."
sections:
  Summary: |-
    Add Redmine canonical-state migration command
    
    Provide a migration path that backfills canonical_state into existing Redmine issues from legacy doc-backed tasks, reports migrated or skipped issues, and preserves canonical task content.
  Scope: |-
    - In scope: Provide a migration path that backfills canonical_state into existing Redmine issues from legacy doc-backed tasks, reports migrated or skipped issues, and preserves canonical task content.
    - Out of scope: unrelated refactors not required for "Add Redmine canonical-state migration command".
  Plan: |-
    1. Design a migration path that backfills canonical_state for existing Redmine issues from legacy doc-backed remote state.
    2. Implement the migration command or flow with clear migrated/skipped/conflict reporting and canonical-state preservation.
    3. Cover migration behavior in tests and document any operator prerequisites or limits.
  Verify Steps: |-
    1. Run the migration-focused test suites for Redmine backend behavior. Expected: legacy doc-backed issues migrate to canonical_state with explicit migrated/skipped/conflict outcomes.
    2. Run  on the touched migration/backend/test files. Expected: lint passes on the migration command and regressions.
    3. Run @agentplaneorg/core build: Exited with code 0
    agentplane build: Exited with code 0. Expected: both packages still build after the migration changes.
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

Add Redmine canonical-state migration command

Provide a migration path that backfills canonical_state into existing Redmine issues from legacy doc-backed tasks, reports migrated or skipped issues, and preserves canonical task content.

## Scope

- In scope: Provide a migration path that backfills canonical_state into existing Redmine issues from legacy doc-backed tasks, reports migrated or skipped issues, and preserves canonical task content.
- Out of scope: unrelated refactors not required for "Add Redmine canonical-state migration command".

## Plan

1. Design a migration path that backfills canonical_state for existing Redmine issues from legacy doc-backed remote state.
2. Implement the migration command or flow with clear migrated/skipped/conflict reporting and canonical-state preservation.
3. Cover migration behavior in tests and document any operator prerequisites or limits.

## Verify Steps

1. Run the migration-focused test suites for Redmine backend behavior. Expected: legacy doc-backed issues migrate to canonical_state with explicit migrated/skipped/conflict outcomes.
2. Run  on the touched migration/backend/test files. Expected: lint passes on the migration command and regressions.
3. Run @agentplaneorg/core build: Exited with code 0
agentplane build: Exited with code 0. Expected: both packages still build after the migration changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
