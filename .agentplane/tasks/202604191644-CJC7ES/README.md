---
id: "202604191644-CJC7ES"
title: "Tune coverage thresholds during large test split rollout"
status: "TODO"
priority: "low"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "ops"
  - "testing"
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
events: []
doc_version: 3
doc_updated_at: "2026-04-19T16:44:45.823Z"
doc_updated_by: "CODER"
description: "Epic L and J′. Adjust coverage thresholds during the large test-file migration window and restore them after the split sequence stabilizes."
sections:
  Summary: |-
    Tune coverage thresholds during large test split rollout
    
    Epic L and J′. Adjust coverage thresholds during the large test-file migration window and restore them after the split sequence stabilizes.
  Scope: |-
    - In scope: Epic L and J′. Adjust coverage thresholds during the large test-file migration window and restore them after the split sequence stabilizes.
    - Out of scope: unrelated refactors not required for "Tune coverage thresholds during large test split rollout".
  Plan: |-
    1. Implement the change for "Tune coverage thresholds during large test split rollout".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `ops` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `ops` task. Expected: it succeeds without unexpected regressions in touched scope.
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

Tune coverage thresholds during large test split rollout

Epic L and J′. Adjust coverage thresholds during the large test-file migration window and restore them after the split sequence stabilizes.

## Scope

- In scope: Epic L and J′. Adjust coverage thresholds during the large test-file migration window and restore them after the split sequence stabilizes.
- Out of scope: unrelated refactors not required for "Tune coverage thresholds during large test split rollout".

## Plan

1. Implement the change for "Tune coverage thresholds during large test split rollout".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the changed artifact or behavior for the `ops` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `ops` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
