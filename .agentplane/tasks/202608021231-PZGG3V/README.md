---
id: "202608021231-PZGG3V"
title: "Unify the v0.7.1 task supervisor and external advance protocol"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "supervisor"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:critical"
  - "bun run typecheck"
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
doc_updated_at: "2026-08-02T12:31:27.804Z"
doc_updated_by: "CODER"
description: "Expose one compact task advance --agent-json command over the canonical supervisor state machine, make managed and external execution produce equivalent transitions and evidence, cap executor packets at 2048 bytes, and remove semantic lifecycle shortcuts from default onboarding."
sections:
  Summary: |-
    Unify the v0.7.1 task supervisor and external advance protocol

    Expose one compact task advance --agent-json command over the canonical supervisor state machine, make managed and external execution produce equivalent transitions and evidence, cap executor packets at 2048 bytes, and remove semantic lifecycle shortcuts from default onboarding.
  Scope: |-
    - In scope: Expose one compact task advance --agent-json command over the canonical supervisor state machine, make managed and external execution produce equivalent transitions and evidence, cap executor packets at 2048 bytes, and remove semantic lifecycle shortcuts from default onboarding.
    - Out of scope: unrelated refactors not required for "Unify the v0.7.1 task supervisor and external advance protocol".
  Plan: |-
    1. Implement the change for "Unify the v0.7.1 task supervisor and external advance protocol".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    PLANNER fallback scaffold for "Unify the v0.7.1 task supervisor and external advance protocol". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Unify the v0.7.1 task supervisor and external advance protocol". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Unify the v0.7.1 task supervisor and external advance protocol

Expose one compact task advance --agent-json command over the canonical supervisor state machine, make managed and external execution produce equivalent transitions and evidence, cap executor packets at 2048 bytes, and remove semantic lifecycle shortcuts from default onboarding.

## Scope

- In scope: Expose one compact task advance --agent-json command over the canonical supervisor state machine, make managed and external execution produce equivalent transitions and evidence, cap executor packets at 2048 bytes, and remove semantic lifecycle shortcuts from default onboarding.
- Out of scope: unrelated refactors not required for "Unify the v0.7.1 task supervisor and external advance protocol".

## Plan

1. Implement the change for "Unify the v0.7.1 task supervisor and external advance protocol".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

PLANNER fallback scaffold for "Unify the v0.7.1 task supervisor and external advance protocol". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Unify the v0.7.1 task supervisor and external advance protocol". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
