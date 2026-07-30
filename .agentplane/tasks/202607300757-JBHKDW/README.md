---
id: "202607300757-JBHKDW"
title: "Fix direct verified-task closeout route"
result_summary: "Fixed direct closeout and post-work-start routing"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 15
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
  - "bun run test:project -- agentplane packages/agentplane/src/commands/shared/route-guidance.test.ts"
  - "bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.work-start.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T10:24:21.735Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-30T10:44:58.171Z"
  updated_by: "EVALUATOR"
  note: "Verified: both routing regressions pass targeted coverage and full local CI (369 files, 2176 unit tests, 14 critical CLI tests, 90 platform-critical tests, significant coverage)."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-30T10:53:23.180Z"
  updated_by: "EVALUATOR"
  note: "Corrected integration verification contract passes on the routing implementation."
  evaluated_sha: "c3d51c336a9af8a0172c75e36c2597f2aa788841"
  blueprint_digest: "f46f992a26c22cb3a11cc073c1e371e5b58b0c03db398f719af23da0857ad2b6"
  evidence_refs:
    - ".agentplane/tasks/202607300757-JBHKDW/README.md"
    - ".agentplane/tasks/202607300757-JBHKDW/quality/20260730-105323180-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607300757-JBHKDW/quality/20260730-105323180-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607300757-JBHKDW/quality/20260730-105323180-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607300757-JBHKDW/blueprint/resolved-snapshot.json"
  findings:
    - "All task Verify Steps now use the matching Vitest projects and pass together with full local and hosted CI."
commit:
  hash: "c3d51c336a9af8a0172c75e36c2597f2aa788841"
  message: "🐛 JBHKDW routing: resume existing task worktree"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the verified direct-workflow closeout dead end and implement the narrow argv-safe route fix on the v0.6.24 maintenance branch."
  -
    author: "CODER"
    body: "Verified: both routing dead ends are fixed and full local CI passed before the v0.6.25 maintenance release."
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
  -
    type: "verify"
    at: "2026-07-30T10:44:58.171Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Verified: both routing regressions pass targeted coverage and full local CI (369 files, 2176 unit tests, 14 critical CLI tests, 90 platform-critical tests, significant coverage)."
  -
    type: "status"
    at: "2026-07-30T10:45:44.721Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: both routing dead ends are fixed and full local CI passed before the v0.6.25 maintenance release."
doc_version: 3
doc_updated_at: "2026-07-30T10:45:44.721Z"
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

    1. Run `bun run test:project -- agentplane packages/agentplane/src/commands/shared/route-guidance.test.ts`. Expected: route guidance tests pass.
    2. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.work-start.test.ts`. Expected: direct closeout and post-work-start route regressions pass.
    3. Run `bun run typecheck`. Expected: it succeeds.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds.
    5. Review the changed routing behavior and compare the final result against the task summary. Expected: both reported dead ends are closed and any remaining follow-up is explicit in Findings.
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

    ### 2026-07-30T10:44:58.171Z — VERIFY — ok

    By: EVALUATOR

    Note: Verified: both routing regressions pass targeted coverage and full local CI (369 files, 2176 unit tests, 14 critical CLI tests, 90 platform-critical tests, significant coverage).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T10:24:15.683Z, excerpt_hash=sha256:e4725dfc056d3fa7a3c6ac3cdbc0f4ea4e7c4847b89f8d617889b09821e13e08

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v0625-release.eugTda/repo/.agentplane/worktrees/202607300757-JBHKDW-fix-direct-verified-task-closeout-route/.agentplane/tasks/202607300757-JBHKDW/blueprint/resolved-snapshot.json
    - old_digest: f46f992a26c22cb3a11cc073c1e371e5b58b0c03db398f719af23da0857ad2b6
    - current_digest: f46f992a26c22cb3a11cc073c1e371e5b58b0c03db398f719af23da0857ad2b6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607300757-JBHKDW

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane finish 202607300757-JBHKDW --author CODER --body Verified: pre-merge closure packet is ready for the task PR. --result pre-merge closure --commit c3d51c336a9af8a0172c75e36c2597f2aa788841 --pre-merge-closure
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

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

    - Observation: After successful branch_pr work start, route state lacked a recorded PR branch and repeated work start.
      Impact: Agents could enter a deterministic recovery loop and hit an existing-worktree error.
      Resolution: Infer one matching local task branch, route unlinked worktrees to pr open, and cover the base-checkout transition.
extensions:
  implementation_commit:
    hash: "c3d51c336a9af8a0172c75e36c2597f2aa788841"
    message: "🐛 JBHKDW routing: resume existing task worktree"
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

1. Run `bun run test:project -- agentplane packages/agentplane/src/commands/shared/route-guidance.test.ts`. Expected: route guidance tests pass.
2. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.route-decision.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.work-start.test.ts`. Expected: direct closeout and post-work-start route regressions pass.
3. Run `bun run typecheck`. Expected: it succeeds.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds.
5. Review the changed routing behavior and compare the final result against the task summary. Expected: both reported dead ends are closed and any remaining follow-up is explicit in Findings.

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

### 2026-07-30T10:44:58.171Z — VERIFY — ok

By: EVALUATOR

Note: Verified: both routing regressions pass targeted coverage and full local CI (369 files, 2176 unit tests, 14 critical CLI tests, 90 platform-critical tests, significant coverage).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T10:24:15.683Z, excerpt_hash=sha256:e4725dfc056d3fa7a3c6ac3cdbc0f4ea4e7c4847b89f8d617889b09821e13e08

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v0625-release.eugTda/repo/.agentplane/worktrees/202607300757-JBHKDW-fix-direct-verified-task-closeout-route/.agentplane/tasks/202607300757-JBHKDW/blueprint/resolved-snapshot.json
- old_digest: f46f992a26c22cb3a11cc073c1e371e5b58b0c03db398f719af23da0857ad2b6
- current_digest: f46f992a26c22cb3a11cc073c1e371e5b58b0c03db398f719af23da0857ad2b6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607300757-JBHKDW

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane finish 202607300757-JBHKDW --author CODER --body Verified: pre-merge closure packet is ready for the task PR. --result pre-merge closure --commit c3d51c336a9af8a0172c75e36c2597f2aa788841 --pre-merge-closure
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

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

- Observation: After successful branch_pr work start, route state lacked a recorded PR branch and repeated work start.
  Impact: Agents could enter a deterministic recovery loop and hit an existing-worktree error.
  Resolution: Infer one matching local task branch, route unlinked worktrees to pr open, and cover the base-checkout transition.
