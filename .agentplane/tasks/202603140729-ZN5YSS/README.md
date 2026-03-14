---
id: "202603140729-ZN5YSS"
title: "Add Redmine canonical-state migration command"
result_summary: "Closed as duplicate of 202603140729-W4D9ZT."
risk_level: "low"
breaking: false
status: "DONE"
priority: "med"
owner: "CODER"
revision: 2
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
comments:
  -
    author: "ORCHESTRATOR"
    body: |-
      Verified: 202603140729-ZN5YSS is a bookkeeping duplicate of 202603140729-W4D9ZT (Add Redmine canonical-state migration command); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Duplicate task was created while task new output hung; canonical migration scope continues in W4D9ZT.
events:
  -
    type: "status"
    at: "2026-03-14T07:30:51.909Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: |-
      Verified: 202603140729-ZN5YSS is a bookkeeping duplicate of 202603140729-W4D9ZT (Add Redmine canonical-state migration command); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Duplicate task was created while task new output hung; canonical migration scope continues in W4D9ZT.
doc_version: 3
doc_updated_at: "2026-03-14T07:30:51.910Z"
doc_updated_by: "ORCHESTRATOR"
description: "Provide a migration path that backfills canonical_state into existing Redmine issues from legacy doc-backed tasks, reports migrated or skipped issues, and preserves canonical task content."
sections:
  Summary: |-
    Add Redmine canonical-state migration command
    
    Provide a migration path that backfills canonical_state into existing Redmine issues from legacy doc-backed tasks, reports migrated or skipped issues, and preserves canonical task content.
  Scope: |-
    - In scope: Provide a migration path that backfills canonical_state into existing Redmine issues from legacy doc-backed tasks, reports migrated or skipped issues, and preserves canonical task content.
    - Out of scope: unrelated refactors not required for "Add Redmine canonical-state migration command".
  Plan: |-
    1. Implement the change for "Add Redmine canonical-state migration command".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

1. Implement the change for "Add Redmine canonical-state migration command".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. Review the changed artifact or behavior. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
