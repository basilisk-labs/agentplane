---
id: "202603251539-1WNAZX"
title: "Consolidate upgrade and release into one operator pipeline"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202603251538-CMY5ZN"
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
comments: []
doc_version: 3
doc_updated_at: "2026-03-25T15:39:04.502Z"
doc_updated_by: "CODER"
description: "Refactor upgrade and release flows onto a shared operator pipeline for source acquisition, reconcile, verification, and post-apply side effects, so both surfaces reuse one execution model instead of parallel bespoke orchestration stacks."
sections:
  Summary: |-
    Consolidate upgrade and release into one operator pipeline
    
    Refactor upgrade and release flows onto a shared operator pipeline for source acquisition, reconcile, verification, and post-apply side effects, so both surfaces reuse one execution model instead of parallel bespoke orchestration stacks.
  Scope: |-
    - In scope: Refactor upgrade and release flows onto a shared operator pipeline for source acquisition, reconcile, verification, and post-apply side effects, so both surfaces reuse one execution model instead of parallel bespoke orchestration stacks.
    - Out of scope: unrelated refactors not required for "Consolidate upgrade and release into one operator pipeline".
  Plan: |-
    1. Implement the change for "Consolidate upgrade and release into one operator pipeline".
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

Consolidate upgrade and release into one operator pipeline

Refactor upgrade and release flows onto a shared operator pipeline for source acquisition, reconcile, verification, and post-apply side effects, so both surfaces reuse one execution model instead of parallel bespoke orchestration stacks.

## Scope

- In scope: Refactor upgrade and release flows onto a shared operator pipeline for source acquisition, reconcile, verification, and post-apply side effects, so both surfaces reuse one execution model instead of parallel bespoke orchestration stacks.
- Out of scope: unrelated refactors not required for "Consolidate upgrade and release into one operator pipeline".

## Plan

1. Implement the change for "Consolidate upgrade and release into one operator pipeline".
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
