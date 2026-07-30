---
id: "202607300757-JBHKDW"
title: "Fix direct verified-task closeout route"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
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
  updated_at: "2026-07-30T10:24:21.735Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-30T08:11:12.984Z"
  updated_by: "EVALUATOR"
  note: "Verified: direct verified-task closeout now emits concrete exactArgv, safe_to_mutate=true, and canExecuteNow=true; targeted and full fast CI passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-30T08:11:23.563Z"
  updated_by: "EVALUATOR"
  note: "v0.6.24 direct verified-task closeout is argv-safe and covered by regression tests."
  evaluated_sha: "aef3a0651787130e839d949ce4f9edbb4ff3e6c6"
  blueprint_digest: "f46f992a26c22cb3a11cc073c1e371e5b58b0c03db398f719af23da0857ad2b6"
  evidence_refs:
    - ".agentplane/tasks/202607300757-JBHKDW/README.md"
    - ".agentplane/tasks/202607300757-JBHKDW/quality/20260730-081123563-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607300757-JBHKDW/quality/20260730-081123563-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607300757-JBHKDW/quality/20260730-081123563-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607300757-JBHKDW/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/shared/route-decision-next-action.ts"
    - "packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
  findings:
    - "complete_direct no longer emits placeholder arguments; it resolves a concrete commit and produces exactArgv with safe_to_mutate=true."
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
  -
    type: "verify"
    at: "2026-07-30T08:11:12.984Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Verified: direct verified-task closeout now emits concrete exactArgv, safe_to_mutate=true, and canExecuteNow=true; targeted and full fast CI passed."
doc_version: 3
doc_updated_at: "2026-07-30T10:24:15.683Z"
doc_updated_by: "CODER"
description: "Reproduce and fix v0.6.24 route guidance that selects task complete with placeholder arguments, leaving verified direct-workflow tasks without an argv-safe closeout command."
sections:
  Summary: |-
    Fix direct verified-task closeout route

    Reproduce and fix v0.6.24 route guidance that selects task complete with placeholder arguments, leaving verified direct-workflow tasks without an argv-safe closeout command.
  Scope: |-
    - In scope: Reproduce and fix v0.6.24 route guidance that selects task complete with placeholder arguments, leaving verified direct-workflow tasks without an argv-safe closeout command.
    - Out of scope: unrelated refactors not required for "Fix direct verified-task closeout route".
  Plan: "1. Keep the direct verified-task argv-safe closeout fix. 2. Infer a unique existing local task branch when PR metadata is not recorded so next-action does not repeat work start after successful worktree creation. 3. Add regression coverage for the post-work-start route from the base checkout. 4. Run targeted route tests, typecheck, policy routing, full local CI, evaluator review, and release gates."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-30T08:11:12.984Z — VERIFY — ok

    By: EVALUATOR

    Note: Verified: direct verified-task closeout now emits concrete exactArgv, safe_to_mutate=true, and canExecuteNow=true; targeted and full fast CI passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T08:10:28.021Z, excerpt_hash=sha256:e4725dfc056d3fa7a3c6ac3cdbc0f4ea4e7c4847b89f8d617889b09821e13e08

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane-v0.6.24-closeout-fix/.agentplane/tasks/202607300757-JBHKDW/blueprint/resolved-snapshot.json
    - old_digest: f46f992a26c22cb3a11cc073c1e371e5b58b0c03db398f719af23da0857ad2b6
    - current_digest: f46f992a26c22cb3a11cc073c1e371e5b58b0c03db398f719af23da0857ad2b6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607300757-JBHKDW

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202607300757-JBHKDW --agent CODER --slug fix-direct-verified-task-closeout-route --worktree
    - diagnostic_command: agentplane work resume 202607300757-JBHKDW
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: worktree_projection_drift

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

    - Observation: v0.6.24 emitted literal result and commit placeholders in complete_direct.
      Impact: The route selected task complete but its own argv guard blocked mutation.
      Resolution: Resolve commit from task metadata or resume HEAD and emit a deterministic result token.
id_source: "generated"
---
## Summary

Fix direct verified-task closeout route

Reproduce and fix v0.6.24 route guidance that selects task complete with placeholder arguments, leaving verified direct-workflow tasks without an argv-safe closeout command.

## Scope

- In scope: Reproduce and fix v0.6.24 route guidance that selects task complete with placeholder arguments, leaving verified direct-workflow tasks without an argv-safe closeout command.
- Out of scope: unrelated refactors not required for "Fix direct verified-task closeout route".

## Plan

1. Keep the direct verified-task argv-safe closeout fix. 2. Infer a unique existing local task branch when PR metadata is not recorded so next-action does not repeat work start after successful worktree creation. 3. Add regression coverage for the post-work-start route from the base checkout. 4. Run targeted route tests, typecheck, policy routing, full local CI, evaluator review, and release gates.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/route-guidance.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-30T08:11:12.984Z — VERIFY — ok

By: EVALUATOR

Note: Verified: direct verified-task closeout now emits concrete exactArgv, safe_to_mutate=true, and canExecuteNow=true; targeted and full fast CI passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T08:10:28.021Z, excerpt_hash=sha256:e4725dfc056d3fa7a3c6ac3cdbc0f4ea4e7c4847b89f8d617889b09821e13e08

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane-v0.6.24-closeout-fix/.agentplane/tasks/202607300757-JBHKDW/blueprint/resolved-snapshot.json
- old_digest: f46f992a26c22cb3a11cc073c1e371e5b58b0c03db398f719af23da0857ad2b6
- current_digest: f46f992a26c22cb3a11cc073c1e371e5b58b0c03db398f719af23da0857ad2b6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607300757-JBHKDW

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202607300757-JBHKDW --agent CODER --slug fix-direct-verified-task-closeout-route --worktree
- diagnostic_command: agentplane work resume 202607300757-JBHKDW
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: worktree_projection_drift

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

- Observation: v0.6.24 emitted literal result and commit placeholders in complete_direct.
  Impact: The route selected task complete but its own argv guard blocked mutation.
  Resolution: Resolve commit from task metadata or resume HEAD and emit a deterministic result token.
