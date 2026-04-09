---
id: "202604092339-Z755FH"
title: "Warn on stale verify metadata during pr update"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
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
doc_updated_at: "2026-04-09T23:39:16.419Z"
doc_updated_by: "CODER"
description: "When pr update refreshes PR artifacts after branch HEAD advanced beyond last_verified_sha, surface an exact rerun-verify warning instead of silently leaving the stale verify state for pr check to discover later."
sections:
  Summary: |-
    Warn on stale verify metadata during pr update
    
    When pr update refreshes PR artifacts after branch HEAD advanced beyond last_verified_sha, surface an exact rerun-verify warning instead of silently leaving the stale verify state for pr check to discover later.
  Scope: |-
    - In scope: When pr update refreshes PR artifacts after branch HEAD advanced beyond last_verified_sha, surface an exact rerun-verify warning instead of silently leaving the stale verify state for pr check to discover later.
    - Out of scope: unrelated refactors not required for "Warn on stale verify metadata during pr update".
  Plan: |-
    1. Implement the change for "Warn on stale verify metadata during pr update".
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

Warn on stale verify metadata during pr update

When pr update refreshes PR artifacts after branch HEAD advanced beyond last_verified_sha, surface an exact rerun-verify warning instead of silently leaving the stale verify state for pr check to discover later.

## Scope

- In scope: When pr update refreshes PR artifacts after branch HEAD advanced beyond last_verified_sha, surface an exact rerun-verify warning instead of silently leaving the stale verify state for pr check to discover later.
- Out of scope: unrelated refactors not required for "Warn on stale verify metadata during pr update".

## Plan

1. Implement the change for "Warn on stale verify metadata during pr update".
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
