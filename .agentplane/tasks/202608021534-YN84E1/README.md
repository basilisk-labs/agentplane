---
id: "202608021534-YN84E1"
title: "Harden the v0.7.1 guided lifecycle and canonical help surface"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "trust-boundary"
  - "ux"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run docs:check"
  - "bun run test:critical"
  - "node scripts/qualification/check-v0.7.1-product-contract.mjs"
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
  attempts: 0
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-08-02T15:34:46.293Z"
doc_updated_by: "CODER"
description: "Make task begin stop at a real semantic planning boundary, make task complete fail closed without observed checks plus evaluator or explicit human receipt, keep compatibility flows advanced-only, and cap default help at 10-12 canonical operations centered on task advance and task run."
sections:
  Summary: |-
    Harden the v0.7.1 guided lifecycle and canonical help surface

    Make task begin stop at a real semantic planning boundary, make task complete fail closed without observed checks plus evaluator or explicit human receipt, keep compatibility flows advanced-only, and cap default help at 10-12 canonical operations centered on task advance and task run.
  Scope: |-
    - In scope: Make task begin stop at a real semantic planning boundary, make task complete fail closed without observed checks plus evaluator or explicit human receipt, keep compatibility flows advanced-only, and cap default help at 10-12 canonical operations centered on task advance and task run.
    - Out of scope: unrelated refactors not required for "Harden the v0.7.1 guided lifecycle and canonical help surface".
  Plan: |-
    1. Implement the change for "Harden the v0.7.1 guided lifecycle and canonical help surface".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold for "Harden the v0.7.1 guided lifecycle and canonical help surface". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Harden the v0.7.1 guided lifecycle and canonical help surface". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Harden the v0.7.1 guided lifecycle and canonical help surface

Make task begin stop at a real semantic planning boundary, make task complete fail closed without observed checks plus evaluator or explicit human receipt, keep compatibility flows advanced-only, and cap default help at 10-12 canonical operations centered on task advance and task run.

## Scope

- In scope: Make task begin stop at a real semantic planning boundary, make task complete fail closed without observed checks plus evaluator or explicit human receipt, keep compatibility flows advanced-only, and cap default help at 10-12 canonical operations centered on task advance and task run.
- Out of scope: unrelated refactors not required for "Harden the v0.7.1 guided lifecycle and canonical help surface".

## Plan

1. Implement the change for "Harden the v0.7.1 guided lifecycle and canonical help surface".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold for "Harden the v0.7.1 guided lifecycle and canonical help surface". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Harden the v0.7.1 guided lifecycle and canonical help surface". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
