---
id: "202603090655-TZHRG4"
title: "Make doctor and task migration backend-aware"
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
doc_updated_at: "2026-03-09T06:55:31.372Z"
doc_updated_by: "CODER"
description: "Teach doctor and task doc migration flows to reason about backend projection state instead of stale export snapshots."
id_source: "generated"
---
## Summary

Make doctor and task migration backend-aware

Teach doctor and task doc migration flows to reason about backend projection state instead of stale export snapshots.

## Scope

- In scope: Teach doctor and task doc migration flows to reason about backend projection state instead of stale export snapshots.
- Out of scope: unrelated refactors not required for "Make doctor and task migration backend-aware".

## Plan

1. Implement the change for "Make doctor and task migration backend-aware".
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
