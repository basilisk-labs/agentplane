---
id: "202606081311-TXT5A5"
title: "Clarify no-close-commit finish cleanup route"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github-issue-4474"
task_kind: "code"
mutation_scope: "code"
verify:
  - "ap doctor"
  - "bun test packages/agentplane/src/__tests__ --grep no-close"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-06-08T13:12:00.609Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-08T13:17:36.890Z"
  updated_by: "CODER"
  note: "Command: bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts; Result: pass; Evidence: 2 tests passed including no-close-commit dirty tracked artifact route cleanup regression. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: ap doctor; Result: pass; Evidence: doctor OK with 2 unrelated pre-existing DONE-task commit-hash warnings. Command: bun run lint:core and bun run test:critical; Result: pass; Evidence: ESLint passed and critical-cli suite passed 5/5 chunks. Scope: route oracle/next-action cleanup behavior for direct DONE tasks with tracked task artifacts."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing issue #4474 in dedicated branch_pr worktree; scope is direct finish --no-close-commit route cleanup visibility plus focused regression coverage."
events:
  -
    type: "status"
    at: "2026-06-08T13:12:33.514Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing issue #4474 in dedicated branch_pr worktree; scope is direct finish --no-close-commit route cleanup visibility plus focused regression coverage."
  -
    type: "verify"
    at: "2026-06-08T13:17:36.890Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts; Result: pass; Evidence: 2 tests passed including no-close-commit dirty tracked artifact route cleanup regression. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: ap doctor; Result: pass; Evidence: doctor OK with 2 unrelated pre-existing DONE-task commit-hash warnings. Command: bun run lint:core and bun run test:critical; Result: pass; Evidence: ESLint passed and critical-cli suite passed 5/5 chunks. Scope: route oracle/next-action cleanup behavior for direct DONE tasks with tracked task artifacts."
doc_version: 3
doc_updated_at: "2026-06-08T13:17:37.072Z"
doc_updated_by: "CODER"
description: "Fix GitHub issue #4474: finish --no-close-commit can mark a direct-workflow task DONE while route guidance says no cleanup is needed even though tracked task artifacts still require an explicit cleanup commit. Improve code and verification so the route oracle surfaces required artifact cleanup instead of a misleading terminal state."
sections:
  Summary: |-
    Clarify no-close-commit finish cleanup route

    Fix GitHub issue #4474: finish --no-close-commit can mark a direct-workflow task DONE while route guidance says no cleanup is needed even though tracked task artifacts still require an explicit cleanup commit. Improve code and verification so the route oracle surfaces required artifact cleanup instead of a misleading terminal state.
  Scope: "In scope: inspect issue #4474, route/finish/direct workflow code, targeted tests, and local verification. Out of scope: merging dependency PRs, publishing releases, changing authentication or provider merge behavior."
  Plan: |-
    1. Inspect GitHub issue #4474 and current open PRs to separate the user-reported defect from dependency update noise.
    2. Use branch_pr route oracle to start a dedicated CODER worktree.
    3. Locate finish/no-close-commit and next-action route code that decides terminal done guidance.
    4. Add a regression test for direct workflow DONE state with dirty tracked task artifacts and implement the smallest code change that surfaces cleanup instead of misleading no-op route guidance.
    5. Run focused tests, routing policy check, ap doctor, and git status evidence; record verification in AgentPlane.
    6. Commit intentional changes on the task branch and leave merge/publish for explicit merge-lane approval.
  Verify Steps: |-
    1. Reproduce or add a focused regression test for finish --no-close-commit when tracked AgentPlane task artifacts still require cleanup. Expected: route/next-action output surfaces a cleanup action or blocker instead of terminal no-op guidance.
    2. Run the focused test file or closest package test command covering finish/route behavior. Expected: pass.
    3. Run node .agentplane/policy/check-routing.mjs. Expected: pass.
    4. Run ap doctor. Expected: pass or record non-task environmental failures explicitly in Findings.
    5. Run git status --short --untracked-files=all from the task worktree and base checkout. Expected: only intentional task changes before commit; clean after commit except known unrelated artifacts.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-08T13:17:36.890Z — VERIFY — ok

    By: CODER

    Note: Command: bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts; Result: pass; Evidence: 2 tests passed including no-close-commit dirty tracked artifact route cleanup regression. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: ap doctor; Result: pass; Evidence: doctor OK with 2 unrelated pre-existing DONE-task commit-hash warnings. Command: bun run lint:core and bun run test:critical; Result: pass; Evidence: ESLint passed and critical-cli suite passed 5/5 chunks. Scope: route oracle/next-action cleanup behavior for direct DONE tasks with tracked task artifacts.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T13:12:33.514Z, excerpt_hash=sha256:97c982ad8211f9396d5b6bab798b66666cac94f2ddb7cc9b770c93ae91c69573

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606081311-TXT5A5-clarify-no-close-commit-finish-cleanup-route/.agentplane/tasks/202606081311-TXT5A5/blueprint/resolved-snapshot.json
    - old_digest: 394c75a6dd79044a98c96986aa2781aeeed28db4d1d57109e754abd84f0d3554
    - current_digest: 394c75a6dd79044a98c96986aa2781aeeed28db4d1d57109e754abd84f0d3554
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606081311-TXT5A5

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606081311-TXT5A5
    - diagnostic_command: agentplane pr check 202606081311-TXT5A5
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the implementation and test commits for task 202606081311-TXT5A5. No data migration or release state is expected."
  Findings: ""
id_source: "generated"
---
## Summary

Clarify no-close-commit finish cleanup route

Fix GitHub issue #4474: finish --no-close-commit can mark a direct-workflow task DONE while route guidance says no cleanup is needed even though tracked task artifacts still require an explicit cleanup commit. Improve code and verification so the route oracle surfaces required artifact cleanup instead of a misleading terminal state.

## Scope

In scope: inspect issue #4474, route/finish/direct workflow code, targeted tests, and local verification. Out of scope: merging dependency PRs, publishing releases, changing authentication or provider merge behavior.

## Plan

1. Inspect GitHub issue #4474 and current open PRs to separate the user-reported defect from dependency update noise.
2. Use branch_pr route oracle to start a dedicated CODER worktree.
3. Locate finish/no-close-commit and next-action route code that decides terminal done guidance.
4. Add a regression test for direct workflow DONE state with dirty tracked task artifacts and implement the smallest code change that surfaces cleanup instead of misleading no-op route guidance.
5. Run focused tests, routing policy check, ap doctor, and git status evidence; record verification in AgentPlane.
6. Commit intentional changes on the task branch and leave merge/publish for explicit merge-lane approval.

## Verify Steps

1. Reproduce or add a focused regression test for finish --no-close-commit when tracked AgentPlane task artifacts still require cleanup. Expected: route/next-action output surfaces a cleanup action or blocker instead of terminal no-op guidance.
2. Run the focused test file or closest package test command covering finish/route behavior. Expected: pass.
3. Run node .agentplane/policy/check-routing.mjs. Expected: pass.
4. Run ap doctor. Expected: pass or record non-task environmental failures explicitly in Findings.
5. Run git status --short --untracked-files=all from the task worktree and base checkout. Expected: only intentional task changes before commit; clean after commit except known unrelated artifacts.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-08T13:17:36.890Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts; Result: pass; Evidence: 2 tests passed including no-close-commit dirty tracked artifact route cleanup regression. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: ap doctor; Result: pass; Evidence: doctor OK with 2 unrelated pre-existing DONE-task commit-hash warnings. Command: bun run lint:core and bun run test:critical; Result: pass; Evidence: ESLint passed and critical-cli suite passed 5/5 chunks. Scope: route oracle/next-action cleanup behavior for direct DONE tasks with tracked task artifacts.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T13:12:33.514Z, excerpt_hash=sha256:97c982ad8211f9396d5b6bab798b66666cac94f2ddb7cc9b770c93ae91c69573

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606081311-TXT5A5-clarify-no-close-commit-finish-cleanup-route/.agentplane/tasks/202606081311-TXT5A5/blueprint/resolved-snapshot.json
- old_digest: 394c75a6dd79044a98c96986aa2781aeeed28db4d1d57109e754abd84f0d3554
- current_digest: 394c75a6dd79044a98c96986aa2781aeeed28db4d1d57109e754abd84f0d3554
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606081311-TXT5A5

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606081311-TXT5A5
- diagnostic_command: agentplane pr check 202606081311-TXT5A5
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the implementation and test commits for task 202606081311-TXT5A5. No data migration or release state is expected.

## Findings
