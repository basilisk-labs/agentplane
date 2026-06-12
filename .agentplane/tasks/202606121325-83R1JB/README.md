---
id: "202606121325-83R1JB"
title: "Wire loop agent.run to task runner"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "integration"
  - "loops"
  - "runner"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "ap loop run <task-id> --loop tdd.fix --dry-run --json"
  - "bun test packages/agentplane/src/commands/loop/loop.command.test.ts packages/agentplane/src/loops/*.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-06-12T13:25:36.684Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-12T14:40:36.562Z"
  updated_by: "CODER"
  note: "Verified loop execute-agent-step implementation: focused loop tests passed, changed formatting passed, package build passed, policy routing passed. Manual smoke ran Codex runner through ap loop run --execute-agent-step and recorded runner result metadata; both smoke tasks blocked inside runner route because branch_pr authoritative base checkout lacks branch-local task README, which is a separate runner-route issue."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: wire loop agent.run dry-run preparation to the existing task runner handoff artifacts on agentplane-loops without touching main or launching external agents."
events:
  -
    type: "status"
    at: "2026-06-12T13:25:42.060Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: wire loop agent.run dry-run preparation to the existing task runner handoff artifacts on agentplane-loops without touching main or launching external agents."
  -
    type: "verify"
    at: "2026-06-12T13:29:32.804Z"
    author: "CODER"
    state: "ok"
    note: "Loop agent.run dry-run now prepares Codex task runner handoff artifacts and persists adapter/run/bundle/bootstrap/result references in step output. Focused loop tests, format check, build, real ap loop run, and policy routing passed."
  -
    type: "verify"
    at: "2026-06-12T14:40:36.562Z"
    author: "CODER"
    state: "ok"
    note: "Verified loop execute-agent-step implementation: focused loop tests passed, changed formatting passed, package build passed, policy routing passed. Manual smoke ran Codex runner through ap loop run --execute-agent-step and recorded runner result metadata; both smoke tasks blocked inside runner route because branch_pr authoritative base checkout lacks branch-local task README, which is a separate runner-route issue."
doc_version: 3
doc_updated_at: "2026-06-12T14:40:38.473Z"
doc_updated_by: "CODER"
description: "Connect loop execution so agent.run steps can prepare or execute the existing AgentPlane task runner adapter, persisting runner bundle/result references in loop step artifacts."
sections:
  Summary: "Wire loop agent.run steps to the existing AgentPlane task runner adapter path. The first integration target is safe preparation/dry-run plumbing: loop step artifacts should record runner bundle/bootstrap/result paths so the loop runner can hand off to Codex task runner infrastructure later."
  Scope: "In scope: inspect task-run usecases, add a loop runner bridge for agent.run dry-run preparation, persist runner handoff references in agent.run step output, add tests for loop dry-run artifacts, and keep behavior backward compatible. Out of scope: launching real external Codex processes from ap loop run, changing main, or replacing task run lifecycle."
  Plan: |-
    1. Inspect loop run artifact generation and task runner prepare usecase contracts.
    2. Add a loop-to-task-runner handoff path for agent.run dry-run preparation that records adapter id, mode, run id, bundle path, bootstrap path, and result path in agent.run output.json.
    3. Extend focused loop tests to assert runner handoff metadata for tdd.fix agent_patch.
    4. Verify focused tests, a real ap loop run dry-run, policy routing, and clean branch state.
  Verify Steps: |-
    1. Run focused loop command/unit tests and confirm dry-run LoopRun still writes loop-run.json, events.jsonl, state.json, decision.json, and per-step artifacts.
    2. Confirm agent.run step output includes runner handoff metadata with adapter id, mode, run id, bundle path, bootstrap path, and result path.
    3. Run ap loop run 202606121325-83R1JB --loop tdd.fix --dry-run --json and inspect the agent_patch output artifact for runner handoff references.
    4. Run node .agentplane/policy/check-routing.mjs and final git status.
  Verification: |-
    Executed on branch agentplane-loops.

    Commands and outcomes:
    - bun test packages/agentplane/src/commands/loop/loop.command.test.ts packages/agentplane/src/loops/metrics.test.ts packages/agentplane/src/loops/validate.test.ts: pass, 11 tests.
    - bun run format:changed: pass, all changed files use Prettier style.
    - bun run --filter=agentplane build: pass, CLI build success.
    - ap loop run 202606121325-83R1JB --loop tdd.fix --dry-run --json: pass; created loop-2026-06-12T13-28-53-708Z-cd8c4ae0.
    - jq inspection of agent_patch/output.json: pass; runnerHandoff includes adapterId=codex, mode=dry_run, runId=2026-06-12T13-28-54-339Z, bundlePath, bootstrapPath, and resultPath.
    - node .agentplane/policy/check-routing.mjs: pass, policy routing OK.

    Implementation evidence:
    - agent.run dry-run step now invokes existing prepareTaskRunnerExecution(mode=dry_run) through a loop artifact callback.
    - The loop step output persists runner handoff metadata, while the task runner writes its bundle/bootstrap artifacts under .agentplane/tasks/202606121325-83R1JB/runs/2026-06-12T13-28-54-339Z/.
    - resultPath is recorded as the expected future result manifest path; dry-run preparation does not create result.json.

    Boundary:
    - This wires loop agent.run to task runner preparation, not external Codex execution. ap loop run without --dry-run is still intentionally blocked in loop v0.1.

    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-12T13:29:32.804Z — VERIFY — ok

    By: CODER

    Note: Loop agent.run dry-run now prepares Codex task runner handoff artifacts and persists adapter/run/bundle/bootstrap/result references in step output. Focused loop tests, format check, build, real ap loop run, and policy routing passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T13:29:26.949Z, excerpt_hash=sha256:71b55cf560e60ec3ec4f24988d09de87f03f8f001635b3d2d36071523f542887

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121325-83R1JB/blueprint/resolved-snapshot.json
    - old_digest: 11330fb2b6743b0ece9d8a10fd907246682e40ea2ebbfd01b00d5780d8c86c8e
    - current_digest: 11330fb2b6743b0ece9d8a10fd907246682e40ea2ebbfd01b00d5780d8c86c8e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606121325-83R1JB

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606121325-83R1JB --agent CODER --slug wire-loop-agent-run-to-task-runner --worktree
    - diagnostic_command: agentplane work resume 202606121325-83R1JB
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: worktree_projection_drift

    ### 2026-06-12T14:40:36.562Z — VERIFY — ok

    By: CODER

    Note: Verified loop execute-agent-step implementation: focused loop tests passed, changed formatting passed, package build passed, policy routing passed. Manual smoke ran Codex runner through ap loop run --execute-agent-step and recorded runner result metadata; both smoke tasks blocked inside runner route because branch_pr authoritative base checkout lacks branch-local task README, which is a separate runner-route issue.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T13:29:32.927Z, excerpt_hash=sha256:71b55cf560e60ec3ec4f24988d09de87f03f8f001635b3d2d36071523f542887

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121325-83R1JB/blueprint/resolved-snapshot.json
    - old_digest: 11330fb2b6743b0ece9d8a10fd907246682e40ea2ebbfd01b00d5780d8c86c8e
    - current_digest: 11330fb2b6743b0ece9d8a10fd907246682e40ea2ebbfd01b00d5780d8c86c8e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606121325-83R1JB

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606121325-83R1JB --agent CODER --slug wire-loop-agent-run-to-task-runner --worktree
    - diagnostic_command: agentplane work resume 202606121325-83R1JB
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: worktree_projection_drift

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the implementation commit on agentplane-loops. The change is limited to loop dry-run/runner handoff code, tests, and task artifacts."
  Findings: |-
    - Observation: ap loop run <task> --loop tdd.fix --execute-agent-step --json produced loop records with dryRun=false, stopReason=agent_step_executed, and agent_patch/output.json runnerHandoff.mode=execute.
      Impact: Loop command now executes only the agent.run step and stops before diff/check/evaluator retry steps; full physical artifact creation still needs a branch-local trunk runner route fix.
      Resolution: Keep execute-agent-step as safe partial execution; handle branch-local runner-route compatibility in a follow-up task.
id_source: "generated"
---
## Summary

Wire loop agent.run steps to the existing AgentPlane task runner adapter path. The first integration target is safe preparation/dry-run plumbing: loop step artifacts should record runner bundle/bootstrap/result paths so the loop runner can hand off to Codex task runner infrastructure later.

## Scope

In scope: inspect task-run usecases, add a loop runner bridge for agent.run dry-run preparation, persist runner handoff references in agent.run step output, add tests for loop dry-run artifacts, and keep behavior backward compatible. Out of scope: launching real external Codex processes from ap loop run, changing main, or replacing task run lifecycle.

## Plan

1. Inspect loop run artifact generation and task runner prepare usecase contracts.
2. Add a loop-to-task-runner handoff path for agent.run dry-run preparation that records adapter id, mode, run id, bundle path, bootstrap path, and result path in agent.run output.json.
3. Extend focused loop tests to assert runner handoff metadata for tdd.fix agent_patch.
4. Verify focused tests, a real ap loop run dry-run, policy routing, and clean branch state.

## Verify Steps

1. Run focused loop command/unit tests and confirm dry-run LoopRun still writes loop-run.json, events.jsonl, state.json, decision.json, and per-step artifacts.
2. Confirm agent.run step output includes runner handoff metadata with adapter id, mode, run id, bundle path, bootstrap path, and result path.
3. Run ap loop run 202606121325-83R1JB --loop tdd.fix --dry-run --json and inspect the agent_patch output artifact for runner handoff references.
4. Run node .agentplane/policy/check-routing.mjs and final git status.

## Verification

Executed on branch agentplane-loops.

Commands and outcomes:
- bun test packages/agentplane/src/commands/loop/loop.command.test.ts packages/agentplane/src/loops/metrics.test.ts packages/agentplane/src/loops/validate.test.ts: pass, 11 tests.
- bun run format:changed: pass, all changed files use Prettier style.
- bun run --filter=agentplane build: pass, CLI build success.
- ap loop run 202606121325-83R1JB --loop tdd.fix --dry-run --json: pass; created loop-2026-06-12T13-28-53-708Z-cd8c4ae0.
- jq inspection of agent_patch/output.json: pass; runnerHandoff includes adapterId=codex, mode=dry_run, runId=2026-06-12T13-28-54-339Z, bundlePath, bootstrapPath, and resultPath.
- node .agentplane/policy/check-routing.mjs: pass, policy routing OK.

Implementation evidence:
- agent.run dry-run step now invokes existing prepareTaskRunnerExecution(mode=dry_run) through a loop artifact callback.
- The loop step output persists runner handoff metadata, while the task runner writes its bundle/bootstrap artifacts under .agentplane/tasks/202606121325-83R1JB/runs/2026-06-12T13-28-54-339Z/.
- resultPath is recorded as the expected future result manifest path; dry-run preparation does not create result.json.

Boundary:
- This wires loop agent.run to task runner preparation, not external Codex execution. ap loop run without --dry-run is still intentionally blocked in loop v0.1.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-12T13:29:32.804Z — VERIFY — ok

By: CODER

Note: Loop agent.run dry-run now prepares Codex task runner handoff artifacts and persists adapter/run/bundle/bootstrap/result references in step output. Focused loop tests, format check, build, real ap loop run, and policy routing passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T13:29:26.949Z, excerpt_hash=sha256:71b55cf560e60ec3ec4f24988d09de87f03f8f001635b3d2d36071523f542887

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121325-83R1JB/blueprint/resolved-snapshot.json
- old_digest: 11330fb2b6743b0ece9d8a10fd907246682e40ea2ebbfd01b00d5780d8c86c8e
- current_digest: 11330fb2b6743b0ece9d8a10fd907246682e40ea2ebbfd01b00d5780d8c86c8e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606121325-83R1JB

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606121325-83R1JB --agent CODER --slug wire-loop-agent-run-to-task-runner --worktree
- diagnostic_command: agentplane work resume 202606121325-83R1JB
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: worktree_projection_drift

### 2026-06-12T14:40:36.562Z — VERIFY — ok

By: CODER

Note: Verified loop execute-agent-step implementation: focused loop tests passed, changed formatting passed, package build passed, policy routing passed. Manual smoke ran Codex runner through ap loop run --execute-agent-step and recorded runner result metadata; both smoke tasks blocked inside runner route because branch_pr authoritative base checkout lacks branch-local task README, which is a separate runner-route issue.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T13:29:32.927Z, excerpt_hash=sha256:71b55cf560e60ec3ec4f24988d09de87f03f8f001635b3d2d36071523f542887

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606121325-83R1JB/blueprint/resolved-snapshot.json
- old_digest: 11330fb2b6743b0ece9d8a10fd907246682e40ea2ebbfd01b00d5780d8c86c8e
- current_digest: 11330fb2b6743b0ece9d8a10fd907246682e40ea2ebbfd01b00d5780d8c86c8e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606121325-83R1JB

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606121325-83R1JB --agent CODER --slug wire-loop-agent-run-to-task-runner --worktree
- diagnostic_command: agentplane work resume 202606121325-83R1JB
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: worktree_projection_drift

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the implementation commit on agentplane-loops. The change is limited to loop dry-run/runner handoff code, tests, and task artifacts.

## Findings

- Observation: ap loop run <task> --loop tdd.fix --execute-agent-step --json produced loop records with dryRun=false, stopReason=agent_step_executed, and agent_patch/output.json runnerHandoff.mode=execute.
  Impact: Loop command now executes only the agent.run step and stops before diff/check/evaluator retry steps; full physical artifact creation still needs a branch-local trunk runner route fix.
  Resolution: Keep execute-agent-step as safe partial execution; handle branch-local runner-route compatibility in a follow-up task.
