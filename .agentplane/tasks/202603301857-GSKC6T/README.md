---
id: "202603301857-GSKC6T"
title: "Re-lock JSON compatibility and document any intentional invariants"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301857-F0343K"
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
doc_updated_at: "2026-03-30T18:57:14.958Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 6 / R6.3 from REFACTOR.md. `agent_json_v1` compatibility is explicitly tested and documented as a stable contract."
sections:
  Summary: |-
    Re-lock JSON compatibility and document any intentional invariants
    
    Implement Epic 6 / R6.3 from REFACTOR.md. `agent_json_v1` compatibility is explicitly tested and documented as a stable contract.
  Scope: |-
    - In scope: Implement Epic 6 / R6.3 from REFACTOR.md. `agent_json_v1` compatibility is explicitly tested and documented as a stable contract.
    - Out of scope: unrelated refactors not required for "Re-lock JSON compatibility and document any intentional invariants".
  Plan: |-
    1. Audit the current implementation and tests around tests and developer docs to isolate the exact behavior gap for R6.3.
    2. Implement the smallest change set that satisfies the REFACTOR contract: `agent_json_v1` compatibility is explicitly tested and documented as a stable contract.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering tests and developer docs. Expected: the behavior described by R6.3 is observable and stable.
    2. Inspect the final diff for 202603301857-GSKC6T. Expected: scope stays limited to tests and developer docs plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: `agent_json_v1` compatibility is explicitly tested and documented as a stable contract.
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

Re-lock JSON compatibility and document any intentional invariants

Implement Epic 6 / R6.3 from REFACTOR.md. `agent_json_v1` compatibility is explicitly tested and documented as a stable contract.

## Scope

- In scope: Implement Epic 6 / R6.3 from REFACTOR.md. `agent_json_v1` compatibility is explicitly tested and documented as a stable contract.
- Out of scope: unrelated refactors not required for "Re-lock JSON compatibility and document any intentional invariants".

## Plan

1. Audit the current implementation and tests around tests and developer docs to isolate the exact behavior gap for R6.3.
2. Implement the smallest change set that satisfies the REFACTOR contract: `agent_json_v1` compatibility is explicitly tested and documented as a stable contract.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering tests and developer docs. Expected: the behavior described by R6.3 is observable and stable.
2. Inspect the final diff for 202603301857-GSKC6T. Expected: scope stays limited to tests and developer docs plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: `agent_json_v1` compatibility is explicitly tested and documented as a stable contract.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
