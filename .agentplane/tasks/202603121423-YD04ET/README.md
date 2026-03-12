---
id: "202603121423-YD04ET"
title: "Narrow stale-dist guard for test-only churn"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
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
doc_updated_at: "2026-03-12T14:23:08.181Z"
doc_updated_by: "CODER"
description: "Treat test-only watched source changes as non-runtime so task-local mutators are not blocked by stale-dist when dist output itself is unaffected."
id_source: "generated"
---
## Summary

Narrow stale-dist guard for test-only churn

Treat test-only watched source changes as non-runtime so task-local mutators are not blocked by stale-dist when dist output itself is unaffected.

## Scope

- In scope: Treat test-only watched source changes as non-runtime so task-local mutators are not blocked by stale-dist when dist output itself is unaffected.
- Out of scope: unrelated refactors not required for "Narrow stale-dist guard for test-only churn".

## Plan

1. Implement the change for "Narrow stale-dist guard for test-only churn".
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
