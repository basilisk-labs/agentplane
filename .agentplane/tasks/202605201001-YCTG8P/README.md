---
id: "202605201001-YCTG8P"
title: "Add runner route decision snapshot"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bunx vitest run packages/agentplane/src/runner/context/*.test.ts packages/agentplane/src/runner/usecases/task-run*.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-20T10:01:47.330Z"
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
    body: "Start: Batch task for runner route decision snapshot; implementation will be included in primary ambiguity-route-contract worktree."
events:
  -
    type: "status"
    at: "2026-05-20T10:03:57.328Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Batch task for runner route decision snapshot; implementation will be included in primary ambiguity-route-contract worktree."
doc_version: 3
doc_updated_at: "2026-05-20T10:03:57.328Z"
doc_updated_by: "CODER"
description: "Include route decision, checkout role, approval contract, and artifact contract in runner bundles so execution agents do not reconstruct the route from fragmented surfaces."
sections:
  Summary: |-
    Add runner route decision snapshot

    Include route decision, checkout role, approval contract, and artifact contract in runner bundles so execution agents do not reconstruct the route from fragmented surfaces.
  Scope: |-
    - In scope: Include route decision, checkout role, approval contract, and artifact contract in runner bundles so execution agents do not reconstruct the route from fragmented surfaces.
    - Out of scope: unrelated refactors not required for "Add runner route decision snapshot".
  Plan: |-
    1. Clarify the smallest safe implementation scope for: Add runner route decision snapshot.
    2. Make the scoped change using existing project conventions.
    3. Run the task Verify Steps and record the result before finishing.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/runner/context/*.test.ts packages/agentplane/src/runner/usecases/task-run*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `ap doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Add runner route decision snapshot

Include route decision, checkout role, approval contract, and artifact contract in runner bundles so execution agents do not reconstruct the route from fragmented surfaces.

## Scope

- In scope: Include route decision, checkout role, approval contract, and artifact contract in runner bundles so execution agents do not reconstruct the route from fragmented surfaces.
- Out of scope: unrelated refactors not required for "Add runner route decision snapshot".

## Plan

1. Clarify the smallest safe implementation scope for: Add runner route decision snapshot.
2. Make the scoped change using existing project conventions.
3. Run the task Verify Steps and record the result before finishing.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/runner/context/*.test.ts packages/agentplane/src/runner/usecases/task-run*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `ap doctor`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
