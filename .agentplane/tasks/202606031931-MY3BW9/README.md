---
id: "202606031931-MY3BW9"
title: "Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "github-issue"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-03T19:32:00.384Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
runner:
  run_id: "2026-06-03T20-02-04-185Z"
  status: "failed"
  adapter_id: "codex"
  mode: "execute"
  updated_at: "2026-06-03T20:02:27.898Z"
  started_at: "2026-06-03T20:02:04.202Z"
  ended_at: "2026-06-03T20:02:27.888Z"
  exit_code: 1
  target:
    kind: "task"
    task_id: "202606031931-MY3BW9"
  summary: "Codex runner failed; inspect run artifacts for details."
  output_paths:
    - "/home/deus/workspace/projects/agentplane/repository/worktree/.agentplane/worktrees/202606031931-MY3BW9-fix-upstream-issue-4407-direct-workflow-leaves-v/.agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z/bundle.json"
    - "/home/deus/workspace/projects/agentplane/repository/worktree/.agentplane/worktrees/202606031931-MY3BW9-fix-upstream-issue-4407-direct-workflow-leaves-v/.agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z/bootstrap.md"
    - "/home/deus/workspace/projects/agentplane/repository/worktree/.agentplane/worktrees/202606031931-MY3BW9-fix-upstream-issue-4407-direct-workflow-leaves-v/.agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z/agent-trace.jsonl"
    - "/home/deus/workspace/projects/agentplane/repository/worktree/.agentplane/worktrees/202606031931-MY3BW9-fix-upstream-issue-4407-direct-workflow-leaves-v/.agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z/stderr.log"
    - "/home/deus/workspace/projects/agentplane/repository/worktree/.agentplane/worktrees/202606031931-MY3BW9-fix-upstream-issue-4407-direct-workflow-leaves-v/.agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z/codex-last-message.md"
    - "/home/deus/workspace/projects/agentplane/repository/worktree/.agentplane/worktrees/202606031931-MY3BW9-fix-upstream-issue-4407-direct-workflow-leaves-v/.agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z/result.json"
  metrics:
    duration_ms: 23686
    stdout_bytes: 2703
    stderr_bytes: 1239
    output_last_message_bytes: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: investigating the stale active-task lifecycle in branch_pr mode, reproducing issue #4407, and preparing a bounded fix with focused verification evidence."
events:
  -
    type: "status"
    at: "2026-06-03T19:32:40.537Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: investigating the stale active-task lifecycle in branch_pr mode, reproducing issue #4407, and preparing a bounded fix with focused verification evidence."
doc_version: 3
doc_updated_at: "2026-06-03T20:02:27.917Z"
doc_updated_by: "CODER"
description: "Resolve https://github.com/basilisk-labs/agentplane/issues/4407"
sections:
  Summary: |-
    Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run

    Resolve https://github.com/basilisk-labs/agentplane/issues/4407
  Scope: |-
    - In scope: Resolve https://github.com/basilisk-labs/agentplane/issues/4407.
    - Out of scope: unrelated refactors not required for "Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run".
  Plan: "1. Reproduce the stale-active-task behavior for verified direct-workflow tasks and identify the lifecycle state source that keeps them active. 2. Patch the task lifecycle/status pipeline so verified direct-workflow tasks leave the active set and no longer route back to run. 3. Add or update focused tests for the stale-active-task path and run targeted verification plus required route/doctor checks. 4. Record verification evidence, publish concise upstream milestone comments, and close the task only after implementation evidence is complete."
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    <!-- BEGIN RUNNER OUTCOME -->

    #### 2026-06-03T20:02:27.898Z — RUNNER — failed

    RunId: 2026-06-03T20-02-04-185Z

    Adapter: codex

    Mode: execute

    Target: task 202606031931-MY3BW9

    UpdatedAt: 2026-06-03T20:02:27.898Z

    RunArtifacts: .agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z

    ExitCode: 1

    StartedAt: 2026-06-03T20:02:04.202Z

    EndedAt: 2026-06-03T20:02:27.888Z

    Summary: Codex runner failed; inspect run artifacts for details.

    Artifacts: bundle=/home/deus/workspace/projects/agentplane/repository/worktree/.agentplane/worktrees/202606031931-MY3BW9-fix-upstream-issue-4407-direct-workflow-leaves-v/.agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z/bundle.json, bootstrap=/home/deus/workspace/projects/agentplane/repository/worktree/.agentplane/worktrees/202606031931-MY3BW9-fix-upstream-issue-4407-direct-workflow-leaves-v/.agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z/bootstrap.md, raw-trace=/home/deus/workspace/projects/agentplane/repository/worktree/.agentplane/worktrees/202606031931-MY3BW9-fix-upstream-issue-4407-direct-workflow-leaves-v/.agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z/agent-trace.jsonl, stderr-log=/home/deus/workspace/projects/agentplane/repository/worktree/.agentplane/worktrees/202606031931-MY3BW9-fix-upstream-issue-4407-direct-workflow-leaves-v/.agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z/stderr.log, assistant-last-message=/home/deus/workspace/projects/agentplane/repository/worktree/.agentplane/worktrees/202606031931-MY3BW9-fix-upstream-issue-4407-direct-workflow-leaves-v/.agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z/codex-last-message.md, result-manifest=/home/deus/workspace/projects/agentplane/repository/worktree/.agentplane/worktrees/202606031931-MY3BW9-fix-upstream-issue-4407-direct-workflow-leaves-v/.agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z/result.json

    Capabilities: codex.exec

    Metrics: duration_ms=23686, stdout_bytes=2703, stderr_bytes=1239, output_last_message_bytes=null

    VerificationHint: runner failed; inspect artifacts before retrying or recording verification evidence.

    <!-- END RUNNER OUTCOME -->
id_source: "generated"
---
## Summary

Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run

Resolve https://github.com/basilisk-labs/agentplane/issues/4407

## Scope

- In scope: Resolve https://github.com/basilisk-labs/agentplane/issues/4407.
- Out of scope: unrelated refactors not required for "Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run".

## Plan

1. Reproduce the stale-active-task behavior for verified direct-workflow tasks and identify the lifecycle state source that keeps them active. 2. Patch the task lifecycle/status pipeline so verified direct-workflow tasks leave the active set and no longer route back to run. 3. Add or update focused tests for the stale-active-task path and run targeted verification plus required route/doctor checks. 4. Record verification evidence, publish concise upstream milestone comments, and close the task only after implementation evidence is complete.

## Verify Steps

PLANNER fallback scaffold for "Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

<!-- BEGIN RUNNER OUTCOME -->

#### 2026-06-03T20:02:27.898Z — RUNNER — failed

RunId: 2026-06-03T20-02-04-185Z

Adapter: codex

Mode: execute

Target: task 202606031931-MY3BW9

UpdatedAt: 2026-06-03T20:02:27.898Z

RunArtifacts: .agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z

ExitCode: 1

StartedAt: 2026-06-03T20:02:04.202Z

EndedAt: 2026-06-03T20:02:27.888Z

Summary: Codex runner failed; inspect run artifacts for details.

Artifacts: bundle=/home/deus/workspace/projects/agentplane/repository/worktree/.agentplane/worktrees/202606031931-MY3BW9-fix-upstream-issue-4407-direct-workflow-leaves-v/.agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z/bundle.json, bootstrap=/home/deus/workspace/projects/agentplane/repository/worktree/.agentplane/worktrees/202606031931-MY3BW9-fix-upstream-issue-4407-direct-workflow-leaves-v/.agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z/bootstrap.md, raw-trace=/home/deus/workspace/projects/agentplane/repository/worktree/.agentplane/worktrees/202606031931-MY3BW9-fix-upstream-issue-4407-direct-workflow-leaves-v/.agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z/agent-trace.jsonl, stderr-log=/home/deus/workspace/projects/agentplane/repository/worktree/.agentplane/worktrees/202606031931-MY3BW9-fix-upstream-issue-4407-direct-workflow-leaves-v/.agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z/stderr.log, assistant-last-message=/home/deus/workspace/projects/agentplane/repository/worktree/.agentplane/worktrees/202606031931-MY3BW9-fix-upstream-issue-4407-direct-workflow-leaves-v/.agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z/codex-last-message.md, result-manifest=/home/deus/workspace/projects/agentplane/repository/worktree/.agentplane/worktrees/202606031931-MY3BW9-fix-upstream-issue-4407-direct-workflow-leaves-v/.agentplane/tasks/202606031931-MY3BW9/runs/2026-06-03T20-02-04-185Z/result.json

Capabilities: codex.exec

Metrics: duration_ms=23686, stdout_bytes=2703, stderr_bytes=1239, output_last_message_bytes=null

VerificationHint: runner failed; inspect artifacts before retrying or recording verification evidence.

<!-- END RUNNER OUTCOME -->
