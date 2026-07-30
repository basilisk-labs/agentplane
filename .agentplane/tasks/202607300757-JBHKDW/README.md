---
id: "202607300757-JBHKDW"
title: "Fix direct verified-task closeout route"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "routing"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run typecheck"
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T07:58:43.838Z"
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
    body: "Start: reproduce the verified direct-workflow closeout dead end and implement the narrow argv-safe route fix on the v0.6.24 maintenance branch."
events:
  -
    type: "status"
    at: "2026-07-30T07:59:12.416Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the verified direct-workflow closeout dead end and implement the narrow argv-safe route fix on the v0.6.24 maintenance branch."
doc_version: 3
doc_updated_at: "2026-07-30T08:10:28.021Z"
doc_updated_by: "CODER"
description: "Reproduce and fix v0.6.24 route guidance that selects task complete with placeholder arguments, leaving verified direct-workflow tasks without an argv-safe closeout command."
sections:
  Summary: |-
    Fix direct verified-task closeout route

    Reproduce and fix v0.6.24 route guidance that selects task complete with placeholder arguments, leaving verified direct-workflow tasks without an argv-safe closeout command.
  Scope: |-
    - In scope: Reproduce and fix v0.6.24 route guidance that selects task complete with placeholder arguments, leaving verified direct-workflow tasks without an argv-safe closeout command.
    - Out of scope: unrelated refactors not required for "Fix direct verified-task closeout route".
  Plan: "1. Reproduce direct verified-task next-action output on v0.6.24. 2. Make complete_direct emit a concrete argv-safe task complete command using recorded commit metadata and a deterministic one-token result. 3. Add unit and CLI regression coverage for operator guidance and persistent-carrier-shaped tasks. 4. Run targeted tests, typecheck, routing policy check, and final status review."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Direct verified-task routing emitted task complete with literal result and commit placeholders, which the route argv guard classified as unsafe.
      Impact: Agents received a single closeout command while safe_to_mutate was false, leaving verified direct tasks unable to close.
      Resolution: Emit a deterministic verified-task result token and resolve the commit from task metadata, resume HEAD, or HEAD fallback; regression coverage asserts local_command, exactArgv, and canExecuteNow.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: The shared clone pins branch_pr base to main, so work start rejects the v0.6.24 maintenance branch.
      Impact: A maintenance worktree from the old tag cannot use the normal branch_pr work-start route without changing repo-global base state that is also used by 0.7 worktrees.
      Resolution: Keep this maintenance branch isolated and do not repin the shared clone; use a separate clone or explicitly coordinated base repin for any future PR lifecycle.
id_source: "generated"
---
## Summary

Fix direct verified-task closeout route

Reproduce and fix v0.6.24 route guidance that selects task complete with placeholder arguments, leaving verified direct-workflow tasks without an argv-safe closeout command.

## Scope

- In scope: Reproduce and fix v0.6.24 route guidance that selects task complete with placeholder arguments, leaving verified direct-workflow tasks without an argv-safe closeout command.
- Out of scope: unrelated refactors not required for "Fix direct verified-task closeout route".

## Plan

1. Reproduce direct verified-task next-action output on v0.6.24. 2. Make complete_direct emit a concrete argv-safe task complete command using recorded commit metadata and a deterministic one-token result. 3. Add unit and CLI regression coverage for operator guidance and persistent-carrier-shaped tasks. 4. Run targeted tests, typecheck, routing policy check, and final status review.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Direct verified-task routing emitted task complete with literal result and commit placeholders, which the route argv guard classified as unsafe.
  Impact: Agents received a single closeout command while safe_to_mutate was false, leaving verified direct tasks unable to close.
  Resolution: Emit a deterministic verified-task result token and resolve the commit from task metadata, resume HEAD, or HEAD fallback; regression coverage asserts local_command, exactArgv, and canExecuteNow.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: The shared clone pins branch_pr base to main, so work start rejects the v0.6.24 maintenance branch.
  Impact: A maintenance worktree from the old tag cannot use the normal branch_pr work-start route without changing repo-global base state that is also used by 0.7 worktrees.
  Resolution: Keep this maintenance branch isolated and do not repin the shared clone; use a separate clone or explicitly coordinated base repin for any future PR lifecycle.
