---
id: "202604231752-A45A6M"
title: "Realign 0.3 foundation backlog and retire v0.4 prompt-assembly carryover"
status: "DOING"
priority: "high"
owner: "PLANNER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "foundation"
  - "planning"
  - "release-readiness"
  - "v0.3"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T17:53:29.747Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: establish the active 0.3 foundation execution graph and retire non-active carryover backlog first."
verification:
  state: "ok"
  updated_at: "2026-04-23T17:55:36.068Z"
  updated_by: "PLANNER"
  note: "Backlog realignment completed: the active board now contains only the intended 0.3 foundation tasks and the prompt-assembly carryover backlog has been retired from the active execution path."
commit: null
comments:
  -
    author: "PLANNER"
    body: "Start: audit the active TODO backlog, define the 0.3 foundation execution graph, and retire non-active prompt-assembly carryover so the board reflects the approved release strategy."
events:
  -
    type: "status"
    at: "2026-04-23T17:54:11.047Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: audit the active TODO backlog, define the 0.3 foundation execution graph, and retire non-active prompt-assembly carryover so the board reflects the approved release strategy."
  -
    type: "verify"
    at: "2026-04-23T17:55:36.068Z"
    author: "PLANNER"
    state: "ok"
    note: "Backlog realignment completed: the active board now contains only the intended 0.3 foundation tasks and the prompt-assembly carryover backlog has been retired from the active execution path."
doc_version: 3
doc_updated_at: "2026-04-23T17:55:36.089Z"
doc_updated_by: "PLANNER"
description: "Audit the remaining open prompt-assembly backlog, define the explicit 0.3 foundation scope, create the active execution graph for foundation stabilization, and close or defer superseded open tasks so the task board matches the current release strategy."
sections:
  Summary: |-
    Realign 0.3 foundation backlog and retire v0.4 prompt-assembly carryover
    
    Audit the remaining open prompt-assembly backlog, define the explicit 0.3 foundation scope, create the active execution graph for foundation stabilization, and close or defer superseded open tasks so the task board matches the current release strategy.
  Scope: |-
    - In scope: Audit the remaining open prompt-assembly backlog, define the explicit 0.3 foundation scope, create the active execution graph for foundation stabilization, and close or defer superseded open tasks so the task board matches the current release strategy.
    - Out of scope: unrelated refactors not required for "Realign 0.3 foundation backlog and retire v0.4 prompt-assembly carryover".
  Plan: "1. Inventory all open TODO tasks and classify them into keep-for-0.3, defer, or retire. 2. Define the active 0.3 foundation execution graph and dependency order for docs cleanup, guardrail hardening, and backlog reconciliation. 3. Update the affected task docs with explicit scope and close or defer the non-active v0.4 carryover tasks so the board reflects the approved strategy."
  Verify Steps: |-
    1.  shows only the intended active foundation tasks after backlog reconciliation.
    2. Every pre-existing open prompt-assembly task is either explicitly deferred/retired with a traceable note or deliberately kept with an explicit reason.
    3. The task graph for the current rollout is reflected in canonical task docs, not only in chat context.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T17:55:36.068Z — VERIFY — ok
    
    By: PLANNER
    
    Note: Backlog realignment completed: the active board now contains only the intended 0.3 foundation tasks and the prompt-assembly carryover backlog has been retired from the active execution path.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T17:54:11.067Z, excerpt_hash=sha256:cc5e228b6faf0ad9d8b75e5f079003dbcde2972dcf2e4b0b53b379f10b7612d2
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Realign 0.3 foundation backlog and retire v0.4 prompt-assembly carryover

Audit the remaining open prompt-assembly backlog, define the explicit 0.3 foundation scope, create the active execution graph for foundation stabilization, and close or defer superseded open tasks so the task board matches the current release strategy.

## Scope

- In scope: Audit the remaining open prompt-assembly backlog, define the explicit 0.3 foundation scope, create the active execution graph for foundation stabilization, and close or defer superseded open tasks so the task board matches the current release strategy.
- Out of scope: unrelated refactors not required for "Realign 0.3 foundation backlog and retire v0.4 prompt-assembly carryover".

## Plan

1. Inventory all open TODO tasks and classify them into keep-for-0.3, defer, or retire. 2. Define the active 0.3 foundation execution graph and dependency order for docs cleanup, guardrail hardening, and backlog reconciliation. 3. Update the affected task docs with explicit scope and close or defer the non-active v0.4 carryover tasks so the board reflects the approved strategy.

## Verify Steps

1.  shows only the intended active foundation tasks after backlog reconciliation.
2. Every pre-existing open prompt-assembly task is either explicitly deferred/retired with a traceable note or deliberately kept with an explicit reason.
3. The task graph for the current rollout is reflected in canonical task docs, not only in chat context.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T17:55:36.068Z — VERIFY — ok

By: PLANNER

Note: Backlog realignment completed: the active board now contains only the intended 0.3 foundation tasks and the prompt-assembly carryover backlog has been retired from the active execution path.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T17:54:11.067Z, excerpt_hash=sha256:cc5e228b6faf0ad9d8b75e5f079003dbcde2972dcf2e4b0b53b379f10b7612d2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
