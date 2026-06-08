---
id: "202606081626-MH14DH"
title: "Fix direct workflow closeout regressions from GitHub issues"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github-issue-4471"
  - "github-issue-4472"
  - "github-issue-4473"
task_kind: "code"
mutation_scope: "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-08T16:27:31.846Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-08T16:48:03.267Z"
  updated_by: "CODER"
  note: "Verified: review fix preserves runner startup for approved TODO direct tasks while started direct tasks without runner state route to verify-show."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-08T16:48:14.365Z"
  updated_by: "EVALUATOR"
  note: "Direct workflow closeout regressions remain fixed after review feedback on TODO runner startup routing."
  evaluated_sha: "fd4860785cef3095b59d439dce253356c06f4903"
  blueprint_digest: "5ee7a437281ec2ccd0f086778f224520cf470e80c1cf6f9a5839fb09ff360d58"
  evidence_refs:
    - ".agentplane/tasks/202606081626-MH14DH/README.md"
    - ".agentplane/tasks/202606081626-MH14DH/quality/20260608-164814365-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606081626-MH14DH/quality/20260608-164814365-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606081626-MH14DH/quality/20260608-164814365-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606081626-MH14DH/blueprint/resolved-snapshot.json"
    - "bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts"
    - "bun run format:check"
    - "bun run lint:core"
    - "node .agentplane/policy/check-routing.mjs"
  findings:
    - "PASS: Approved TODO direct tasks still route to agentplane task run, while started direct tasks with no runner state route to task verify-show; reconcile and close-commit regressions remain covered by focused tests."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fix the three direct workflow closeout regressions reported in GitHub issues #4471, #4472, and #4473 with focused route, reconcile, and close-commit tests."
events:
  -
    type: "status"
    at: "2026-06-08T16:28:14.629Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix the three direct workflow closeout regressions reported in GitHub issues #4471, #4472, and #4473 with focused route, reconcile, and close-commit tests."
  -
    type: "verify"
    at: "2026-06-08T16:34:37.058Z"
    author: "CODER"
    state: "ok"
    note: "Verified: direct route, reconcile guard, and direct close-commit regressions are covered and passing."
  -
    type: "verify"
    at: "2026-06-08T16:48:03.267Z"
    author: "CODER"
    state: "ok"
    note: "Verified: review fix preserves runner startup for approved TODO direct tasks while started direct tasks without runner state route to verify-show."
doc_version: 3
doc_updated_at: "2026-06-08T16:48:03.711Z"
doc_updated_by: "CODER"
description: "Fix direct-mode regressions reported in GitHub issues #4471, #4472, and #4473: avoid unnecessary runner route after start-ready, avoid blocking unrelated mutation on unreadable historical task artifacts, and ensure direct closeout commit scope is accepted by repository policy."
sections:
  Summary: "Fix direct workflow closeout regressions reported by GitHub issues #4471, #4472, and #4473. The intended behavior is that ordinary direct tasks are not routed to runner execution unless runner evidence is actually required, unreadable historical task artifacts do not block unrelated active-task verify/finish flows, and generated direct closeout commits use repository-accepted task/close scope semantics."
  Scope: |-
    - In scope: Fix direct-mode regressions reported in GitHub issues #4471, #4472, and #4473: avoid unnecessary runner route after start-ready, avoid blocking unrelated mutation on unreadable historical task artifacts, and ensure direct closeout commit scope is accepted by repository policy.
    - Out of scope: unrelated refactors not required for "Fix direct workflow closeout regressions from GitHub issues".
  Plan: "1. Reproduce the three direct workflow regressions with focused tests before changing behavior. 2. Patch the smallest route/reconcile/finish code paths so direct tasks do not falsely require runner execution, unreadable historical artifacts do not block unrelated active-task mutation, and direct close commits use accepted close/task scope. 3. Run focused tests plus policy routing and doctor, then publish PR linking #4471, #4472, and #4473. 4. After hosted checks pass, integrate through branch_pr merge lane and close the three issues with merge evidence."
  Verify Steps: |-
    1. Add focused regression coverage for a direct task after plan approval/start-ready with no runner-backed work. Expected: task next-action does not require runner_context or agentplane task run, and instead routes to normal direct implementation/verification guidance.
    2. Add focused regression coverage for an unrelated direct active task when a historical task artifact README is missing/unreadable. Expected: verify and finish task-scoped mutation guards do not fail with reconcile_task_scan_incomplete for the unrelated active task.
    3. Add focused regression coverage for direct closeout commit generation under repository commit policy. Expected: generated close commit subject/scope uses task/close-safe scope, not code scope, even when implementation context looks code-shaped.
    4. Run bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts. Expected: pass.
    5. Run bun test packages/agentplane/src/commands/shared/reconcile-check.test.ts. Expected: pass.
    6. Run bun test packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts. Expected: pass.
    7. Run node .agentplane/policy/check-routing.mjs. Expected: pass.
    8. Run ap doctor. Expected: pass or record unrelated existing warnings.
    9. Run git status --short --untracked-files=all from task worktree and base checkout. Expected: clean after commit/merge.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-08T16:34:37.058Z — VERIFY — ok

    By: CODER

    Note: Verified: direct route, reconcile guard, and direct close-commit regressions are covered and passing.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T16:32:30.859Z, excerpt_hash=sha256:42b3d29e4d298701f1bd8e65026fe7187d9449a36b0f234efd82f001f0430c07

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606081626-MH14DH-fix-direct-workflow-closeout-regressions-from-gi/.agentplane/tasks/202606081626-MH14DH/blueprint/resolved-snapshot.json
    - old_digest: 5ee7a437281ec2ccd0f086778f224520cf470e80c1cf6f9a5839fb09ff360d58
    - current_digest: 5ee7a437281ec2ccd0f086778f224520cf470e80c1cf6f9a5839fb09ff360d58
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606081626-MH14DH

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606081626-MH14DH
    - diagnostic_command: agentplane pr check 202606081626-MH14DH
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-08T16:48:03.267Z — VERIFY — ok

    By: CODER

    Note: Verified: review fix preserves runner startup for approved TODO direct tasks while started direct tasks without runner state route to verify-show.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T16:34:37.376Z, excerpt_hash=sha256:42b3d29e4d298701f1bd8e65026fe7187d9449a36b0f234efd82f001f0430c07

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606081626-MH14DH-fix-direct-workflow-closeout-regressions-from-gi/.agentplane/tasks/202606081626-MH14DH/blueprint/resolved-snapshot.json
    - old_digest: 5ee7a437281ec2ccd0f086778f224520cf470e80c1cf6f9a5839fb09ff360d58
    - current_digest: 5ee7a437281ec2ccd0f086778f224520cf470e80c1cf6f9a5839fb09ff360d58
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606081626-MH14DH

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606081626-MH14DH
    - diagnostic_command: agentplane pr check 202606081626-MH14DH
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task branch/PR before merge. After merge, revert the merge commit or follow-up close-tail commit and reopen the affected GitHub issues with the failing route/reconcile/commit-scope evidence."
  Findings: |-
    - Observation: Commands: bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts; bun run format:check; bun run lint:core; node .agentplane/policy/check-routing.mjs; ap doctor.
      Impact: Result: focused tests passed 15 tests / 75 expects; format, lint, and policy routing passed; ap doctor returned OK with existing unrelated warnings for DONE tasks 202606040927-KSESDS and 202606041702-TVTSM2 missing implementation commit hash.
      Resolution: Route decision now uses task verify-show for direct tasks without runner state; reconciliation regression is covered for verify and finish task-scoped mutations; finish close-commit regression confirms task-safe scope for code-shaped close commits.

    - Observation: Commands after review fix: bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts; bun run format:check; bun run lint:core; node .agentplane/policy/check-routing.mjs; ap doctor.
      Impact: Result: focused tests passed 16 tests / 80 expects; format, lint, policy routing, and doctor passed. Doctor warnings are unchanged unrelated historical DONE task commit metadata gaps: 202606040927-KSESDS and 202606041702-TVTSM2.
      Resolution: Review feedback addressed by limiting the no-runner fallback to started direct tasks; approved TODO direct tasks still route to agentplane task run.
id_source: "generated"
---
## Summary

Fix direct workflow closeout regressions reported by GitHub issues #4471, #4472, and #4473. The intended behavior is that ordinary direct tasks are not routed to runner execution unless runner evidence is actually required, unreadable historical task artifacts do not block unrelated active-task verify/finish flows, and generated direct closeout commits use repository-accepted task/close scope semantics.

## Scope

- In scope: Fix direct-mode regressions reported in GitHub issues #4471, #4472, and #4473: avoid unnecessary runner route after start-ready, avoid blocking unrelated mutation on unreadable historical task artifacts, and ensure direct closeout commit scope is accepted by repository policy.
- Out of scope: unrelated refactors not required for "Fix direct workflow closeout regressions from GitHub issues".

## Plan

1. Reproduce the three direct workflow regressions with focused tests before changing behavior. 2. Patch the smallest route/reconcile/finish code paths so direct tasks do not falsely require runner execution, unreadable historical artifacts do not block unrelated active-task mutation, and direct close commits use accepted close/task scope. 3. Run focused tests plus policy routing and doctor, then publish PR linking #4471, #4472, and #4473. 4. After hosted checks pass, integrate through branch_pr merge lane and close the three issues with merge evidence.

## Verify Steps

1. Add focused regression coverage for a direct task after plan approval/start-ready with no runner-backed work. Expected: task next-action does not require runner_context or agentplane task run, and instead routes to normal direct implementation/verification guidance.
2. Add focused regression coverage for an unrelated direct active task when a historical task artifact README is missing/unreadable. Expected: verify and finish task-scoped mutation guards do not fail with reconcile_task_scan_incomplete for the unrelated active task.
3. Add focused regression coverage for direct closeout commit generation under repository commit policy. Expected: generated close commit subject/scope uses task/close-safe scope, not code scope, even when implementation context looks code-shaped.
4. Run bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts. Expected: pass.
5. Run bun test packages/agentplane/src/commands/shared/reconcile-check.test.ts. Expected: pass.
6. Run bun test packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts. Expected: pass.
7. Run node .agentplane/policy/check-routing.mjs. Expected: pass.
8. Run ap doctor. Expected: pass or record unrelated existing warnings.
9. Run git status --short --untracked-files=all from task worktree and base checkout. Expected: clean after commit/merge.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-08T16:34:37.058Z — VERIFY — ok

By: CODER

Note: Verified: direct route, reconcile guard, and direct close-commit regressions are covered and passing.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T16:32:30.859Z, excerpt_hash=sha256:42b3d29e4d298701f1bd8e65026fe7187d9449a36b0f234efd82f001f0430c07

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606081626-MH14DH-fix-direct-workflow-closeout-regressions-from-gi/.agentplane/tasks/202606081626-MH14DH/blueprint/resolved-snapshot.json
- old_digest: 5ee7a437281ec2ccd0f086778f224520cf470e80c1cf6f9a5839fb09ff360d58
- current_digest: 5ee7a437281ec2ccd0f086778f224520cf470e80c1cf6f9a5839fb09ff360d58
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606081626-MH14DH

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606081626-MH14DH
- diagnostic_command: agentplane pr check 202606081626-MH14DH
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-08T16:48:03.267Z — VERIFY — ok

By: CODER

Note: Verified: review fix preserves runner startup for approved TODO direct tasks while started direct tasks without runner state route to verify-show.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T16:34:37.376Z, excerpt_hash=sha256:42b3d29e4d298701f1bd8e65026fe7187d9449a36b0f234efd82f001f0430c07

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606081626-MH14DH-fix-direct-workflow-closeout-regressions-from-gi/.agentplane/tasks/202606081626-MH14DH/blueprint/resolved-snapshot.json
- old_digest: 5ee7a437281ec2ccd0f086778f224520cf470e80c1cf6f9a5839fb09ff360d58
- current_digest: 5ee7a437281ec2ccd0f086778f224520cf470e80c1cf6f9a5839fb09ff360d58
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606081626-MH14DH

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606081626-MH14DH
- diagnostic_command: agentplane pr check 202606081626-MH14DH
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task branch/PR before merge. After merge, revert the merge commit or follow-up close-tail commit and reopen the affected GitHub issues with the failing route/reconcile/commit-scope evidence.

## Findings

- Observation: Commands: bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts; bun run format:check; bun run lint:core; node .agentplane/policy/check-routing.mjs; ap doctor.
  Impact: Result: focused tests passed 15 tests / 75 expects; format, lint, and policy routing passed; ap doctor returned OK with existing unrelated warnings for DONE tasks 202606040927-KSESDS and 202606041702-TVTSM2 missing implementation commit hash.
  Resolution: Route decision now uses task verify-show for direct tasks without runner state; reconciliation regression is covered for verify and finish task-scoped mutations; finish close-commit regression confirms task-safe scope for code-shaped close commits.

- Observation: Commands after review fix: bun test packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts packages/agentplane/src/commands/shared/reconcile-check.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.finish-close-commit.test.ts; bun run format:check; bun run lint:core; node .agentplane/policy/check-routing.mjs; ap doctor.
  Impact: Result: focused tests passed 16 tests / 80 expects; format, lint, policy routing, and doctor passed. Doctor warnings are unchanged unrelated historical DONE task commit metadata gaps: 202606040927-KSESDS and 202606041702-TVTSM2.
  Resolution: Review feedback addressed by limiting the no-runner fallback to started direct tasks; approved TODO direct tasks still route to agentplane task run.
