---
id: "202606050055-6XZ1JZ"
title: "Normalize lifecycle doctor warnings before v0.6.17"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "lifecycle"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-05T00:55:55.567Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: normalize lifecycle doctor warnings found during v0.6.17 release preparation."
events:
  -
    type: "status"
    at: "2026-06-05T00:56:01.059Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: normalize lifecycle doctor warnings found during v0.6.17 release preparation."
doc_version: 3
doc_updated_at: "2026-06-05T00:56:01.059Z"
doc_updated_by: "CODER"
description: "Doctor reported shipped branch_pr task drift and DONE tasks missing implementation commit hashes during the v0.6.17 release candidate. Normalize those lifecycle records so future agents get direct, unambiguous task context."
sections:
  Summary: |-
    Normalize lifecycle doctor warnings before v0.6.17

    Doctor reported shipped branch_pr task drift and DONE tasks missing implementation commit hashes during the v0.6.17 release candidate. Normalize those lifecycle records so future agents get direct, unambiguous task context.
  Scope: |-
    - In scope: Doctor reported shipped branch_pr task drift and DONE tasks missing implementation commit hashes during the v0.6.17 release candidate. Normalize those lifecycle records so future agents get direct, unambiguous task context.
    - Out of scope: unrelated refactors not required for "Normalize lifecycle doctor warnings before v0.6.17".
  Plan: "Normalize lifecycle doctor warnings found during v0.6.17 release preparation: sync shipped branch_pr state, repair missing implementation commit hashes where repository metadata can identify them, rerun doctor, and commit lifecycle-only artifacts before the release PR proceeds."
  Verify Steps: |-
    PLANNER fallback scaffold for "Normalize lifecycle doctor warnings before v0.6.17". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Normalize lifecycle doctor warnings before v0.6.17". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

Normalize lifecycle doctor warnings before v0.6.17

Doctor reported shipped branch_pr task drift and DONE tasks missing implementation commit hashes during the v0.6.17 release candidate. Normalize those lifecycle records so future agents get direct, unambiguous task context.

## Scope

- In scope: Doctor reported shipped branch_pr task drift and DONE tasks missing implementation commit hashes during the v0.6.17 release candidate. Normalize those lifecycle records so future agents get direct, unambiguous task context.
- Out of scope: unrelated refactors not required for "Normalize lifecycle doctor warnings before v0.6.17".

## Plan

Normalize lifecycle doctor warnings found during v0.6.17 release preparation: sync shipped branch_pr state, repair missing implementation commit hashes where repository metadata can identify them, rerun doctor, and commit lifecycle-only artifacts before the release PR proceeds.

## Verify Steps

PLANNER fallback scaffold for "Normalize lifecycle doctor warnings before v0.6.17". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Normalize lifecycle doctor warnings before v0.6.17". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
