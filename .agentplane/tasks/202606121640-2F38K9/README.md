---
id: "202606121640-2F38K9"
title: "Add loop step runner target"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "loops"
  - "runner"
task_kind: "code"
mutation_scope: "code"
verify:
  - "ap loop run 202606121437-V50C2K --loop tdd.fix --execute-agent-step --json"
  - "bun run --filter=agentplane build"
  - "bun run format:changed"
  - "bun test packages/agentplane/src/commands/loop/loop.command.test.ts packages/agentplane/src/loops/run-artifacts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-06-12T16:40:17.813Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-12T16:55:52.720Z"
  updated_by: "CODER"
  note: "Verified loop_step runner target implementation. Focused tests passed, format passed, core/agentplane/testkit builds passed, policy routing passed, and real ap loop run --execute-agent-step produced runnerHandoff.resultStatus=success with a task-local artifact."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement loop_step runner target for execute-agent-step."
events:
  -
    type: "status"
    at: "2026-06-12T16:40:19.545Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement loop_step runner target for execute-agent-step."
  -
    type: "verify"
    at: "2026-06-12T16:55:52.720Z"
    author: "CODER"
    state: "ok"
    note: "Verified loop_step runner target implementation. Focused tests passed, format passed, core/agentplane/testkit builds passed, policy routing passed, and real ap loop run --execute-agent-step produced runnerHandoff.resultStatus=success with a task-local artifact."
doc_version: 3
doc_updated_at: "2026-06-12T16:55:53.215Z"
doc_updated_by: "CODER"
description: "Implement a runner target for loop agent.run execution so ap loop run --execute-agent-step executes the loop step in the current checkout instead of following branch_pr task lifecycle route through base-main."
sections:
  Summary: |-
    Add loop step runner target

    Implement a runner target for loop agent.run execution so ap loop run --execute-agent-step executes the loop step in the current checkout instead of following branch_pr task lifecycle route through base-main.
  Scope: |-
    - In scope: Implement a runner target for loop agent.run execution so ap loop run --execute-agent-step executes the loop step in the current checkout instead of following branch_pr task lifecycle route through base-main.
    - Out of scope: unrelated refactors not required for "Add loop step runner target".
  Plan: |-
    1. Add a loop_step RunnerTarget that carries task id, loop id/version, step id/type, prompt module, and step contract.
    2. Make loop --execute-agent-step call executeTaskRunnerExecution with target.kind=loop_step.
    3. In runner preparation, replace normal task lifecycle route_decision with a current-checkout loop-step route packet for loop_step targets.
    4. Teach bootstrap/goal rendering to instruct Codex to execute the loop step directly and not run branch_pr lifecycle commands.
    5. Verify focused tests, build, and real execute-agent-step smoke artifact.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun test packages/agentplane/src/commands/loop/loop.command.test.ts packages/agentplane/src/loops/run-artifacts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run format:changed`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run --filter=agentplane build`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `ap loop run 202606121437-V50C2K --loop tdd.fix --execute-agent-step --json`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-12T16:55:52.720Z — VERIFY — ok

    By: CODER

    Note: Verified loop_step runner target implementation. Focused tests passed, format passed, core/agentplane/testkit builds passed, policy routing passed, and real ap loop run --execute-agent-step produced runnerHandoff.resultStatus=success with a task-local artifact.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T16:40:19.545Z, excerpt_hash=sha256:3a0ad349a6c0e20963cf8b92701a2b515dd6f60e044cc0968f8256408fbd7ef7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121640-2F38K9/blueprint/resolved-snapshot.json
    - old_digest: a940f30d542fa366f69abf394a5a2e20c28c2b0dc44ff9e60b20b265027c1b53
    - current_digest: a940f30d542fa366f69abf394a5a2e20c28c2b0dc44ff9e60b20b265027c1b53
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606121640-2F38K9

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606121640-2F38K9 --agent CODER --slug add-loop-step-runner-target --worktree
    - diagnostic_command: agentplane work resume 202606121640-2F38K9
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
    - Observation: Final smoke run .agentplane/tasks/202606121437-V50C2K/runs/loop-2026-06-12T16-52-42-228Z-4254144c recorded dryRun=false, stopReason=agent_step_executed, and agent_patch output status=success.
      Impact: Loop step execution no longer follows branch_pr lifecycle route through base-main; runner target is loop_step with route_phase=loop_agent_step and no route_exact_argv.
      Resolution: Added loop_step target/schema/normalizers/bootstrap contract and wired loop --execute-agent-step to use it.
id_source: "generated"
---
## Summary

Add loop step runner target

Implement a runner target for loop agent.run execution so ap loop run --execute-agent-step executes the loop step in the current checkout instead of following branch_pr task lifecycle route through base-main.

## Scope

- In scope: Implement a runner target for loop agent.run execution so ap loop run --execute-agent-step executes the loop step in the current checkout instead of following branch_pr task lifecycle route through base-main.
- Out of scope: unrelated refactors not required for "Add loop step runner target".

## Plan

1. Add a loop_step RunnerTarget that carries task id, loop id/version, step id/type, prompt module, and step contract.
2. Make loop --execute-agent-step call executeTaskRunnerExecution with target.kind=loop_step.
3. In runner preparation, replace normal task lifecycle route_decision with a current-checkout loop-step route packet for loop_step targets.
4. Teach bootstrap/goal rendering to instruct Codex to execute the loop step directly and not run branch_pr lifecycle commands.
5. Verify focused tests, build, and real execute-agent-step smoke artifact.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun test packages/agentplane/src/commands/loop/loop.command.test.ts packages/agentplane/src/loops/run-artifacts.test.ts packages/agentplane/src/runner/usecases/task-run-bootstrap.test.ts packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run format:changed`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run --filter=agentplane build`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `ap loop run 202606121437-V50C2K --loop tdd.fix --execute-agent-step --json`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-12T16:55:52.720Z — VERIFY — ok

By: CODER

Note: Verified loop_step runner target implementation. Focused tests passed, format passed, core/agentplane/testkit builds passed, policy routing passed, and real ap loop run --execute-agent-step produced runnerHandoff.resultStatus=success with a task-local artifact.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T16:40:19.545Z, excerpt_hash=sha256:3a0ad349a6c0e20963cf8b92701a2b515dd6f60e044cc0968f8256408fbd7ef7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121640-2F38K9/blueprint/resolved-snapshot.json
- old_digest: a940f30d542fa366f69abf394a5a2e20c28c2b0dc44ff9e60b20b265027c1b53
- current_digest: a940f30d542fa366f69abf394a5a2e20c28c2b0dc44ff9e60b20b265027c1b53
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606121640-2F38K9

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606121640-2F38K9 --agent CODER --slug add-loop-step-runner-target --worktree
- diagnostic_command: agentplane work resume 202606121640-2F38K9
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

- Observation: Final smoke run .agentplane/tasks/202606121437-V50C2K/runs/loop-2026-06-12T16-52-42-228Z-4254144c recorded dryRun=false, stopReason=agent_step_executed, and agent_patch output status=success.
  Impact: Loop step execution no longer follows branch_pr lifecycle route through base-main; runner target is loop_step with route_phase=loop_agent_step and no route_exact_argv.
  Resolution: Added loop_step target/schema/normalizers/bootstrap contract and wired loop --execute-agent-step to use it.
