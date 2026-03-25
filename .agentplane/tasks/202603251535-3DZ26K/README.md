---
id: "202603251535-3DZ26K"
title: "Introduce unified workflow transition service for task lifecycle mutations"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202603251535-DNNMD4"
tags:
  - "code"
  - "architecture"
  - "refactor"
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
doc_updated_at: "2026-03-25T15:35:08.452Z"
doc_updated_by: "CODER"
description: "Replace ad hoc task state mutations across start, block, set-status, verify, and finish with one transition service that owns status, plan approval, verification, commit, and comment/event side effects."
sections:
  Summary: |-
    Introduce unified workflow transition service for task lifecycle mutations
    
    Replace ad hoc task state mutations across start, block, set-status, verify, and finish with one transition service that owns status, plan approval, verification, commit, and comment/event side effects.
  Scope: |-
    - In scope: Replace ad hoc task state mutations across start, block, set-status, verify, and finish with one transition service that owns status, plan approval, verification, commit, and comment/event side effects.
    - Out of scope: unrelated refactors not required for "Introduce unified workflow transition service for task lifecycle mutations".
  Plan: |-
    1. Implement the change for "Introduce unified workflow transition service for task lifecycle mutations".
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

Introduce unified workflow transition service for task lifecycle mutations

Replace ad hoc task state mutations across start, block, set-status, verify, and finish with one transition service that owns status, plan approval, verification, commit, and comment/event side effects.

## Scope

- In scope: Replace ad hoc task state mutations across start, block, set-status, verify, and finish with one transition service that owns status, plan approval, verification, commit, and comment/event side effects.
- Out of scope: unrelated refactors not required for "Introduce unified workflow transition service for task lifecycle mutations".

## Plan

1. Implement the change for "Introduce unified workflow transition service for task lifecycle mutations".
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
