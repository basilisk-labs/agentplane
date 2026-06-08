---
id: "202606081631-MHC3NY"
title: "Clarify non-recipe runner route guidance"
result_summary: "Merged via PR #4495."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "guidance"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-08T16:32:13.855Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-08T16:38:38.497Z"
  updated_by: "CODER"
  note: "Post-commit route guidance verification passed on HEAD 42779867b; PR check reports fresh local artifacts and live task surfaces show current_agent executor semantics."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-08T16:45:02.310Z"
  updated_by: "EVALUATOR"
  note: "Route guidance now distinguishes ordinary current-agent execution from explicit runner routes."
  evaluated_sha: "99ba15ec68fa096d59f48f3e0437b6a9db023039"
  blueprint_digest: "bfda5dea3eba1509d7025de1f7095a7b9e2411e5386d4f010d9ad5b35ca88aac"
  evidence_refs:
    - ".agentplane/tasks/202606081631-MHC3NY/README.md"
    - ".agentplane/tasks/202606081631-MHC3NY/quality/20260608-164502310-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606081631-MHC3NY/quality/20260608-164502310-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606081631-MHC3NY/quality/20260608-164502310-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606081631-MHC3NY/blueprint/resolved-snapshot.json"
    - "bun test packages/agentplane/src/commands/shared/route-guidance.test.ts"
    - "bun run --filter=agentplane typecheck"
    - "node .agentplane/policy/check-routing.mjs"
    - "ap task next-action 202606081631-MHC3NY --explain"
  findings:
    - "Non-runner route surfaces now show executor_context executor=current_agent runner_route_active=false with a warning that the current coding agent must run safe_command itself and must not wait for or retry a runner; explicit wait_runner coverage still preserves runner-owned guidance."
commit:
  hash: "10e521b4ba0d70e1a5b5052698eec89ce3cf18f3"
  message: "🧪 MHC3NY task: record route guidance quality review"
comments:
  -
    author: "CODER"
    body: "Start: implement focused route guidance fix so ordinary Codex agents execute local work themselves unless explicit task-run, wait_runner, runner_alive, or active runner recipe delegation is present."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4495 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-06-08T16:32:55.195Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement focused route guidance fix so ordinary Codex agents execute local work themselves unless explicit task-run, wait_runner, runner_alive, or active runner recipe delegation is present."
  -
    type: "verify"
    at: "2026-06-08T16:36:40.245Z"
    author: "CODER"
    state: "ok"
    note: "Route guidance fix verified: non-runner routes now expose executor=current_agent and runner_route_active=false with explicit no runner wait/retry warning; explicit wait_runner route remains runner-owned."
  -
    type: "verify"
    at: "2026-06-08T16:38:38.497Z"
    author: "CODER"
    state: "ok"
    note: "Post-commit route guidance verification passed on HEAD 42779867b; PR check reports fresh local artifacts and live task surfaces show current_agent executor semantics."
  -
    type: "status"
    at: "2026-06-08T16:54:09.350Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4495 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-06-08T16:54:09.356Z"
doc_updated_by: "INTEGRATOR"
description: "Fix AgentPlane route/operator guidance so normal Codex agents do not treat runner_context or stale runner attempts as an active runner route unless task run, wait_runner, runner_alive, or an active runner recipe such as parallel-codex explicitly delegates execution."
sections:
  Summary: |-
    Clarify non-recipe runner route guidance

    Fix AgentPlane route/operator guidance so normal Codex agents do not treat runner_context or stale runner attempts as an active runner route unless task run, wait_runner, runner_alive, or an active runner recipe such as parallel-codex explicitly delegates execution.
  Scope: "Fix AgentPlane route/operator guidance for ordinary Codex-agent execution when no runner recipe is active. Scope includes route guidance code, focused tests, and task lifecycle artifacts only. Out of scope: implementing a new runner, changing parallel-codex behavior, or altering branch_pr lifecycle semantics."
  Plan: |-
    1. Reproduce the ambiguity in the current route guidance surfaces around runner_context for non-runner routes.
    2. Update operator guidance/rendered JSON or prompt surfaces so normal Codex execution states explicitly say the current coding agent is the executor unless an explicit task-run/wait_runner/runner_alive/active runner recipe route is present.
    3. Add focused regression coverage for non-runner route guidance and explicit runner route preservation.
    4. Run focused tests plus routing validation and record verification.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/shared/route-guidance.test.ts`. Expected: non-runner routes report executor semantics that forbid runner retry/wait language, while explicit `wait_runner` routes still surface runner guidance.
    2. Run focused task rendering tests if present. Expected: rendered task guidance does not expose misleading runner context for ordinary routes; if no focused suites exist, record the absence and rely on route-guidance coverage.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy/routing validation passes.
    4. Inspect changed paths. Expected: scope is limited to route/operator guidance, tests, and task artifacts for `202606081631-MHC3NY`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-08T16:36:40.245Z — VERIFY — ok

    By: CODER

    Note: Route guidance fix verified: non-runner routes now expose executor=current_agent and runner_route_active=false with explicit no runner wait/retry warning; explicit wait_runner route remains runner-owned.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T16:32:55.195Z, excerpt_hash=sha256:cb5cdbce63d151600bb638100edaaf7fa2bee559e9914aa4614d645201ba7ceb

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606081631-MHC3NY-clarify-non-recipe-runner-route-guidance/.agentplane/tasks/202606081631-MHC3NY/blueprint/resolved-snapshot.json
    - old_digest: bfda5dea3eba1509d7025de1f7095a7b9e2411e5386d4f010d9ad5b35ca88aac
    - current_digest: bfda5dea3eba1509d7025de1f7095a7b9e2411e5386d4f010d9ad5b35ca88aac
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606081631-MHC3NY

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606081631-MHC3NY
    - diagnostic_command: agentplane pr check 202606081631-MHC3NY
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-08T16:38:38.497Z — VERIFY — ok

    By: CODER

    Note: Post-commit route guidance verification passed on HEAD 42779867b; PR check reports fresh local artifacts and live task surfaces show current_agent executor semantics.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T16:36:40.567Z, excerpt_hash=sha256:cb5cdbce63d151600bb638100edaaf7fa2bee559e9914aa4614d645201ba7ceb

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606081631-MHC3NY-clarify-non-recipe-runner-route-guidance/.agentplane/tasks/202606081631-MHC3NY/blueprint/resolved-snapshot.json
    - old_digest: bfda5dea3eba1509d7025de1f7095a7b9e2411e5386d4f010d9ad5b35ca88aac
    - current_digest: bfda5dea3eba1509d7025de1f7095a7b9e2411e5386d4f010d9ad5b35ca88aac
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606081631-MHC3NY

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606081631-MHC3NY
    - diagnostic_command: agentplane pr check 202606081631-MHC3NY
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun test packages/agentplane/src/commands/shared/route-guidance.test.ts; Result: pass; Evidence: 6 pass, 0 fail, 9 expectations. Command: bun run --filter=agentplane typecheck; Result: pass; Evidence: agentplane typecheck exited 0. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: ap task next-action 202606081631-MHC3NY --explain and ap task brief 202606081631-MHC3NY after bun run framework:dev:bootstrap; Result: pass; Evidence: executor_context executor=current_agent runner_route_active=false instruction=current_agent_executes_safe_command plus warning not to wait for or retry a runner. Render-test path search found no dedicated next-action/brief/status test files, so coverage is route-guidance test + typecheck + live CLI output.
      Impact: Ordinary Codex agents should no longer convert non-runner work into a false runner-infra diagnosis when parallel-codex or task-run delegation is not active.
      Resolution: Added RouteExecutorContext and rendered it in task next-action, task brief, and task status while preserving runnerContext for explicit runner routes.

    - Observation: Command: ap pr check 202606081631-MHC3NY; Result: pass; Evidence: artifact_freshness=fresh branch_head=42779867b verify_status=pass. Command: ap task next-action 202606081631-MHC3NY --explain; Result: pass; Evidence: executor_context executor=current_agent runner_route_active=false instruction=current_agent_executes_safe_command and warning that the current coding agent must run safe_command itself and must not wait for or retry a runner.
      Impact: Task evidence now reflects the committed branch head rather than the pre-commit working tree.
      Resolution: Recorded post-commit verification readback before final PR artifact update.
id_source: "generated"
---
## Summary

Clarify non-recipe runner route guidance

Fix AgentPlane route/operator guidance so normal Codex agents do not treat runner_context or stale runner attempts as an active runner route unless task run, wait_runner, runner_alive, or an active runner recipe such as parallel-codex explicitly delegates execution.

## Scope

Fix AgentPlane route/operator guidance for ordinary Codex-agent execution when no runner recipe is active. Scope includes route guidance code, focused tests, and task lifecycle artifacts only. Out of scope: implementing a new runner, changing parallel-codex behavior, or altering branch_pr lifecycle semantics.

## Plan

1. Reproduce the ambiguity in the current route guidance surfaces around runner_context for non-runner routes.
2. Update operator guidance/rendered JSON or prompt surfaces so normal Codex execution states explicitly say the current coding agent is the executor unless an explicit task-run/wait_runner/runner_alive/active runner recipe route is present.
3. Add focused regression coverage for non-runner route guidance and explicit runner route preservation.
4. Run focused tests plus routing validation and record verification.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/shared/route-guidance.test.ts`. Expected: non-runner routes report executor semantics that forbid runner retry/wait language, while explicit `wait_runner` routes still surface runner guidance.
2. Run focused task rendering tests if present. Expected: rendered task guidance does not expose misleading runner context for ordinary routes; if no focused suites exist, record the absence and rely on route-guidance coverage.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy/routing validation passes.
4. Inspect changed paths. Expected: scope is limited to route/operator guidance, tests, and task artifacts for `202606081631-MHC3NY`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-08T16:36:40.245Z — VERIFY — ok

By: CODER

Note: Route guidance fix verified: non-runner routes now expose executor=current_agent and runner_route_active=false with explicit no runner wait/retry warning; explicit wait_runner route remains runner-owned.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T16:32:55.195Z, excerpt_hash=sha256:cb5cdbce63d151600bb638100edaaf7fa2bee559e9914aa4614d645201ba7ceb

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606081631-MHC3NY-clarify-non-recipe-runner-route-guidance/.agentplane/tasks/202606081631-MHC3NY/blueprint/resolved-snapshot.json
- old_digest: bfda5dea3eba1509d7025de1f7095a7b9e2411e5386d4f010d9ad5b35ca88aac
- current_digest: bfda5dea3eba1509d7025de1f7095a7b9e2411e5386d4f010d9ad5b35ca88aac
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606081631-MHC3NY

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606081631-MHC3NY
- diagnostic_command: agentplane pr check 202606081631-MHC3NY
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-08T16:38:38.497Z — VERIFY — ok

By: CODER

Note: Post-commit route guidance verification passed on HEAD 42779867b; PR check reports fresh local artifacts and live task surfaces show current_agent executor semantics.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T16:36:40.567Z, excerpt_hash=sha256:cb5cdbce63d151600bb638100edaaf7fa2bee559e9914aa4614d645201ba7ceb

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606081631-MHC3NY-clarify-non-recipe-runner-route-guidance/.agentplane/tasks/202606081631-MHC3NY/blueprint/resolved-snapshot.json
- old_digest: bfda5dea3eba1509d7025de1f7095a7b9e2411e5386d4f010d9ad5b35ca88aac
- current_digest: bfda5dea3eba1509d7025de1f7095a7b9e2411e5386d4f010d9ad5b35ca88aac
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606081631-MHC3NY

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606081631-MHC3NY
- diagnostic_command: agentplane pr check 202606081631-MHC3NY
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun test packages/agentplane/src/commands/shared/route-guidance.test.ts; Result: pass; Evidence: 6 pass, 0 fail, 9 expectations. Command: bun run --filter=agentplane typecheck; Result: pass; Evidence: agentplane typecheck exited 0. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: ap task next-action 202606081631-MHC3NY --explain and ap task brief 202606081631-MHC3NY after bun run framework:dev:bootstrap; Result: pass; Evidence: executor_context executor=current_agent runner_route_active=false instruction=current_agent_executes_safe_command plus warning not to wait for or retry a runner. Render-test path search found no dedicated next-action/brief/status test files, so coverage is route-guidance test + typecheck + live CLI output.
  Impact: Ordinary Codex agents should no longer convert non-runner work into a false runner-infra diagnosis when parallel-codex or task-run delegation is not active.
  Resolution: Added RouteExecutorContext and rendered it in task next-action, task brief, and task status while preserving runnerContext for explicit runner routes.

- Observation: Command: ap pr check 202606081631-MHC3NY; Result: pass; Evidence: artifact_freshness=fresh branch_head=42779867b verify_status=pass. Command: ap task next-action 202606081631-MHC3NY --explain; Result: pass; Evidence: executor_context executor=current_agent runner_route_active=false instruction=current_agent_executes_safe_command and warning that the current coding agent must run safe_command itself and must not wait for or retry a runner.
  Impact: Task evidence now reflects the committed branch head rather than the pre-commit working tree.
  Resolution: Recorded post-commit verification readback before final PR artifact update.
