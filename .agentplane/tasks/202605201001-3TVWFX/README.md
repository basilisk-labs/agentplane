---
id: "202605201001-3TVWFX"
title: "Lint task Verify Steps ambiguity"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evidence"
  - "tasks"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap doctor"
  - "bunx vitest run packages/core/src/tasks/tasks-lint.test.ts packages/agentplane/src/commands/task/lint*"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-20T10:01:04.393Z"
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
    body: "Start: Batch task for Verify Steps linting; implementation will be included in primary ambiguity-route-contract worktree."
events:
  -
    type: "status"
    at: "2026-05-20T10:03:41.577Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Batch task for Verify Steps linting; implementation will be included in primary ambiguity-route-contract worktree."
doc_version: 3
doc_updated_at: "2026-05-20T10:03:41.577Z"
doc_updated_by: "CODER"
description: "Add machine checks that prevent Verify Steps from being polluted with executed output, empty Run commands, or evidence that belongs in Verification."
sections:
  Summary: |-
    Lint task Verify Steps ambiguity

    Add machine checks that prevent Verify Steps from being polluted with executed output, empty Run commands, or evidence that belongs in Verification.
  Scope: |-
    - In scope: Add machine checks that prevent Verify Steps from being polluted with executed output, empty Run commands, or evidence that belongs in Verification.
    - Out of scope: unrelated refactors not required for "Lint task Verify Steps ambiguity".
  Plan: |-
    1. Clarify the smallest safe implementation scope for: Lint task Verify Steps ambiguity.
    2. Make the scoped change using existing project conventions.
    3. Run the task Verify Steps and record the result before finishing.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/core/src/tasks/tasks-lint.test.ts packages/agentplane/src/commands/task/lint*`. Expected: it succeeds and confirms the requested outcome for this task.
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

Lint task Verify Steps ambiguity

Add machine checks that prevent Verify Steps from being polluted with executed output, empty Run commands, or evidence that belongs in Verification.

## Scope

- In scope: Add machine checks that prevent Verify Steps from being polluted with executed output, empty Run commands, or evidence that belongs in Verification.
- Out of scope: unrelated refactors not required for "Lint task Verify Steps ambiguity".

## Plan

1. Clarify the smallest safe implementation scope for: Lint task Verify Steps ambiguity.
2. Make the scoped change using existing project conventions.
3. Run the task Verify Steps and record the result before finishing.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/core/src/tasks/tasks-lint.test.ts packages/agentplane/src/commands/task/lint*`. Expected: it succeeds and confirms the requested outcome for this task.
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
