---
id: "202607281506-WWNFXE"
title: "Enforce non-empty EVALUATOR pass findings"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evaluator"
  - "quality-gate"
  - "regression"
  - "release-blocker"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run format:changed"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T15:06:34.290Z"
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
    body: "Start: enforce evidence-backed EVALUATOR pass findings across the output schema and strict SGR validation."
events:
  -
    type: "status"
    at: "2026-07-28T15:06:48.124Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: enforce evidence-backed EVALUATOR pass findings across the output schema and strict SGR validation."
doc_version: 3
doc_updated_at: "2026-07-28T15:06:48.124Z"
doc_updated_by: "CODER"
description: "Quality-gate follow-up: align the Codex output schema and strict evaluator SGR validation with the branch_pr requirement that a pass review contains at least one evidence-backed finding, so an empty pass cannot leave a task permanently quality-stale."
sections:
  Summary: |-
    Enforce non-empty EVALUATOR pass findings

    Quality-gate follow-up: align the Codex output schema and strict evaluator SGR validation with the branch_pr requirement that a pass review contains at least one evidence-backed finding, so an empty pass cannot leave a task permanently quality-stale.
  Scope: |-
    - In scope: Quality-gate follow-up: align the Codex output schema and strict evaluator SGR validation with the branch_pr requirement that a pass review contains at least one evidence-backed finding, so an empty pass cannot leave a task permanently quality-stale.
    - Out of scope: unrelated refactors not required for "Enforce non-empty EVALUATOR pass findings".
  Plan: "1. Make the Codex structured-output schema require at least one evaluator finding for every verdict. 2. Make strict evaluator SGR validation reject a pass with no evidence-backed finding, matching branch_pr freshness rules. 3. Update focused evaluator and SGR contract fixtures for a valid pass finding and add explicit empty-pass regression coverage. 4. Run the declared tests, typecheck, formatting, and routing validation; publish, verify, quality-review, and integrate the small PR before retrying task 202607281455-147Q75."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run format:changed`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "322533fd11f322aadf4e77a44d4343c0c6c19341"
    version: 1
id_source: "generated"
---
## Summary

Enforce non-empty EVALUATOR pass findings

Quality-gate follow-up: align the Codex output schema and strict evaluator SGR validation with the branch_pr requirement that a pass review contains at least one evidence-backed finding, so an empty pass cannot leave a task permanently quality-stale.

## Scope

- In scope: Quality-gate follow-up: align the Codex output schema and strict evaluator SGR validation with the branch_pr requirement that a pass review contains at least one evidence-backed finding, so an empty pass cannot leave a task permanently quality-stale.
- Out of scope: unrelated refactors not required for "Enforce non-empty EVALUATOR pass findings".

## Plan

1. Make the Codex structured-output schema require at least one evaluator finding for every verdict. 2. Make strict evaluator SGR validation reject a pass with no evidence-backed finding, matching branch_pr freshness rules. 3. Update focused evaluator and SGR contract fixtures for a valid pass finding and add explicit empty-pass regression coverage. 4. Run the declared tests, typecheck, formatting, and routing validation; publish, verify, quality-review, and integrate the small PR before retrying task 202607281455-147Q75.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts packages/agentplane/src/runtime/sgr/contracts.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run format:changed`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
