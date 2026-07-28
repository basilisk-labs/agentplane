---
id: "202607282053-BYCY0Q"
title: "Charge supervisor wall-time budget from observed execution"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T20:53:38.859Z"
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
    author: "ORCHESTRATOR"
    body: "Start: approved repair for observed active wall-time accounting and bounded evaluator replacement continuation."
events:
  -
    type: "status"
    at: "2026-07-28T20:53:43.149Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: approved repair for observed active wall-time accounting and bounded evaluator replacement continuation."
doc_version: 3
doc_updated_at: "2026-07-28T20:53:43.149Z"
doc_updated_by: "ORCHESTRATOR"
description: "Make max_wall_time_ms charge cumulative supervisor-observed provider or runner duration rather than journal age, so external waits do not consume execution budget. Preserve durable episode history, terminal operation_failed rules, one explicit replacement authorization, and all other budget dimensions. Add deterministic core and evaluator coverage, then validate one post-integration replacement pilot if the journal remains eligible."
sections:
  Summary: |-
    Charge supervisor wall-time budget from observed execution

    Make max_wall_time_ms charge cumulative supervisor-observed provider or runner duration rather than journal age, so external waits do not consume execution budget. Preserve durable episode history, terminal operation_failed rules, one explicit replacement authorization, and all other budget dimensions. Add deterministic core and evaluator coverage, then validate one post-integration replacement pilot if the journal remains eligible.
  Scope: |-
    - In scope: Make max_wall_time_ms charge cumulative supervisor-observed provider or runner duration rather than journal age, so external waits do not consume execution budget. Preserve durable episode history, terminal operation_failed rules, one explicit replacement authorization, and all other budget dimensions. Add deterministic core and evaluator coverage, then validate one post-integration replacement pilot if the journal remains eligible.
    - Out of scope: unrelated refactors not required for "Charge supervisor wall-time budget from observed execution".
  Plan: "1. Define max_wall_time_ms as cumulative supervisor-observed active duration and keep journal age out of its exhaustion calculation. 2. Preserve current terminal operation_failed and replacement CAS semantics, token/run/file/no-progress limits, and stale-state protections. 3. Add core tests for inactive elapsed time versus accumulated active duration and evaluator coverage that an eligible replacement can proceed after external waiting. 4. Run focused and required policy/type checks, independent quality review, hosted CI, integration, then execute the deferred real replacement pilot without retry if its journal is eligible."
  Verify Steps: |-
    1. Run core supervisor episode tests. Expected: inactive elapsed time does not exhaust max_wall_time_ms, while cumulative observed execution time does.
    2. Run evaluator execute tests. Expected: one explicit replacement remains linked to the original failed operation after external waiting, with no retry or duplicate provider start.
    3. Run typecheck, formatting, policy routing, and the relevant fast test gate. Expected: touched contracts and repository gates pass.
    4. After integration, execute the deferred real replacement pilot once. Expected: it either creates one linked completed operation with the original failure retained, or exits before a provider start with a durable, explicit stop reason.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "d1a9ac4c1ac9aee2e799ff2247b0f369be7f644c"
    version: 1
id_source: "generated"
---
## Summary

Charge supervisor wall-time budget from observed execution

Make max_wall_time_ms charge cumulative supervisor-observed provider or runner duration rather than journal age, so external waits do not consume execution budget. Preserve durable episode history, terminal operation_failed rules, one explicit replacement authorization, and all other budget dimensions. Add deterministic core and evaluator coverage, then validate one post-integration replacement pilot if the journal remains eligible.

## Scope

- In scope: Make max_wall_time_ms charge cumulative supervisor-observed provider or runner duration rather than journal age, so external waits do not consume execution budget. Preserve durable episode history, terminal operation_failed rules, one explicit replacement authorization, and all other budget dimensions. Add deterministic core and evaluator coverage, then validate one post-integration replacement pilot if the journal remains eligible.
- Out of scope: unrelated refactors not required for "Charge supervisor wall-time budget from observed execution".

## Plan

1. Define max_wall_time_ms as cumulative supervisor-observed active duration and keep journal age out of its exhaustion calculation. 2. Preserve current terminal operation_failed and replacement CAS semantics, token/run/file/no-progress limits, and stale-state protections. 3. Add core tests for inactive elapsed time versus accumulated active duration and evaluator coverage that an eligible replacement can proceed after external waiting. 4. Run focused and required policy/type checks, independent quality review, hosted CI, integration, then execute the deferred real replacement pilot without retry if its journal is eligible.

## Verify Steps

1. Run core supervisor episode tests. Expected: inactive elapsed time does not exhaust max_wall_time_ms, while cumulative observed execution time does.
2. Run evaluator execute tests. Expected: one explicit replacement remains linked to the original failed operation after external waiting, with no retry or duplicate provider start.
3. Run typecheck, formatting, policy routing, and the relevant fast test gate. Expected: touched contracts and repository gates pass.
4. After integration, execute the deferred real replacement pilot once. Expected: it either creates one linked completed operation with the original failure retained, or exits before a provider start with a durable, explicit stop reason.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
