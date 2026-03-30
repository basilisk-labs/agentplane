---
id: "202603301857-DMYRDF"
title: "Collapse low-value wrappers with tests still green"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301857-SZATBJ"
tags:
  - "code"
  - "refactor"
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
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-03-30T18:57:12.762Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 5 / R5.4 from REFACTOR.md. purely pass-through files are removed or merged, and module boundaries that remain have a documented reason."
sections:
  Summary: |-
    Collapse low-value wrappers with tests still green
    
    Implement Epic 5 / R5.4 from REFACTOR.md. purely pass-through files are removed or merged, and module boundaries that remain have a documented reason.
  Scope: |-
    - In scope: Implement Epic 5 / R5.4 from REFACTOR.md. purely pass-through files are removed or merged, and module boundaries that remain have a documented reason.
    - Out of scope: unrelated refactors not required for "Collapse low-value wrappers with tests still green".
  Plan: |-
    1. Audit the current implementation and tests around wrapper modules selected by the audit to isolate the exact behavior gap for R5.4.
    2. Implement the smallest change set that satisfies the REFACTOR contract: purely pass-through files are removed or merged, and module boundaries that remain have a documented reason.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering wrapper modules selected by the audit. Expected: the behavior described by R5.4 is observable and stable.
    2. Inspect the final diff for 202603301857-DMYRDF. Expected: scope stays limited to wrapper modules selected by the audit plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: purely pass-through files are removed or merged, and module boundaries that remain have a documented reason.
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

Collapse low-value wrappers with tests still green

Implement Epic 5 / R5.4 from REFACTOR.md. purely pass-through files are removed or merged, and module boundaries that remain have a documented reason.

## Scope

- In scope: Implement Epic 5 / R5.4 from REFACTOR.md. purely pass-through files are removed or merged, and module boundaries that remain have a documented reason.
- Out of scope: unrelated refactors not required for "Collapse low-value wrappers with tests still green".

## Plan

1. Audit the current implementation and tests around wrapper modules selected by the audit to isolate the exact behavior gap for R5.4.
2. Implement the smallest change set that satisfies the REFACTOR contract: purely pass-through files are removed or merged, and module boundaries that remain have a documented reason.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering wrapper modules selected by the audit. Expected: the behavior described by R5.4 is observable and stable.
2. Inspect the final diff for 202603301857-DMYRDF. Expected: scope stays limited to wrapper modules selected by the audit plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: purely pass-through files are removed or merged, and module boundaries that remain have a documented reason.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
