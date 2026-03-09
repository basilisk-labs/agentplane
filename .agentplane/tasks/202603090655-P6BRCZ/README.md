---
id: "202603090655-P6BRCZ"
title: "Switch Redmine backend to projection-first reads"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "backend"
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
comments: []
doc_version: 3
doc_updated_at: "2026-03-09T06:55:31.402Z"
doc_updated_by: "CODER"
description: "Use the local projection as the default read model for Redmine-backed repos and keep network access behind explicit refresh/sync paths."
id_source: "generated"
---
## Summary

Switch Redmine backend to projection-first reads

Use the local projection as the default read model for Redmine-backed repos and keep network access behind explicit refresh/sync paths.

## Scope

- In scope: Use the local projection as the default read model for Redmine-backed repos and keep network access behind explicit refresh/sync paths.
- Out of scope: unrelated refactors not required for "Switch Redmine backend to projection-first reads".

## Plan

1. Implement the change for "Switch Redmine backend to projection-first reads".
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
