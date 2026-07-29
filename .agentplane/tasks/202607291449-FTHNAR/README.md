---
id: "202607291449-FTHNAR"
title: "Permit evidence refresh after evaluator review gaps"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evaluator"
  - "recovery"
  - "refactor"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-29T14:49:52.020Z"
  updated_by: "USER"
  note: "Standing approval granted by the user for the AgentPlane 0.7 refactor and recovery work."
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
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-29T14:50:37.293Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-29T14:55:36.044Z"
doc_updated_by: "CODER"
description: "Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication."
sections:
  Summary: |-
    Permit evidence refresh after evaluator review gaps

    Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication.
  Scope: |-
    - In scope: Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication.
    - Out of scope: unrelated refactors not required for "Permit evidence refresh after evaluator review gaps".
  Plan: |-
    1. Identify the blocked-quality-review route that prevents a task from refreshing deterministic evidence requested by EVALUATOR.
    2. Add a bounded recovery transition that permits only task verification; preserve EVALUATOR as the sole semantic verdict owner and require a fresh quality review before PR publication.
    3. Add regression coverage for the blocked-to-verification route and verify that unrelated quality-review blocks remain non-mutating.
    4. Run the focused tests, policy routing validation, and doctor; record exact results.
    5. Obtain an independent EVALUATOR verdict, publish the narrow PR, wait for hosted checks, then integrate before resuming the beta.1 gate task.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/shared/workflow-step.test.ts`. Expected: the current EVALUATOR-blocked review route delegates only to TESTER evidence refresh.
    2. Run `bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts`. Expected: existing stale-quality-review routing remains protected from PR publication.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid after the command-route change.
    4. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: no new workflow health errors.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "d0b9d694451714a0cbd5a01cdfb8db1faffee6aa"
    version: 1
id_source: "generated"
---
## Summary

Permit evidence refresh after evaluator review gaps

Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication.

## Scope

- In scope: Restore a bounded recovery route when an evaluator blocks a task only because frozen deterministic verification evidence is missing. The CLI must permit the declared verification refresh, preserve semantic review ownership with EVALUATOR, and require a new review before publication.
- Out of scope: unrelated refactors not required for "Permit evidence refresh after evaluator review gaps".

## Plan

1. Identify the blocked-quality-review route that prevents a task from refreshing deterministic evidence requested by EVALUATOR.
2. Add a bounded recovery transition that permits only task verification; preserve EVALUATOR as the sole semantic verdict owner and require a fresh quality review before PR publication.
3. Add regression coverage for the blocked-to-verification route and verify that unrelated quality-review blocks remain non-mutating.
4. Run the focused tests, policy routing validation, and doctor; record exact results.
5. Obtain an independent EVALUATOR verdict, publish the narrow PR, wait for hosted checks, then integrate before resuming the beta.1 gate task.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/shared/workflow-step.test.ts`. Expected: the current EVALUATOR-blocked review route delegates only to TESTER evidence refresh.
2. Run `bun test packages/agentplane/src/commands/shared/route-decision-next-action.test.ts`. Expected: existing stale-quality-review routing remains protected from PR publication.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid after the command-route change.
4. Run `node packages/agentplane/bin/agentplane.js doctor`. Expected: no new workflow health errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
