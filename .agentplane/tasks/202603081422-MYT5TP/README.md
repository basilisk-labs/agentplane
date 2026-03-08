---
id: "202603081422-MYT5TP"
title: "Raise legacy README migration integration test timeout budget"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on:
  - "202603081422-5XXATM"
tags:
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
doc_updated_at: "2026-03-08T14:22:30.218Z"
doc_updated_by: "CODER"
description: "Fix the CI-only failure where the legacy README v2 recovery scenario times out after 5000ms even though the scenario completes correctly on slower runners; give the test an explicit integration timeout that matches its real runtime."
id_source: "generated"
---
## Summary

Raise legacy README migration integration test timeout budget

Fix the CI-only failure where the legacy README v2 recovery scenario times out after 5000ms even though the scenario completes correctly on slower runners; give the test an explicit integration timeout that matches its real runtime.

## Scope

- In scope: Fix the CI-only failure where the legacy README v2 recovery scenario times out after 5000ms even though the scenario completes correctly on slower runners; give the test an explicit integration timeout that matches its real runtime.
- Out of scope: unrelated refactors not required for "Raise legacy README migration integration test timeout budget".

## Plan

1. Implement the change for "Raise legacy README migration integration test timeout budget".
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
