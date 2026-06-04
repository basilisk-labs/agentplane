---
id: "202606042326-M1JYRV"
title: "Clarify release candidate missing plan diagnostic"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "diagnostics"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-04T23:26:14.898Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-04T23:28:26.955Z"
  updated_by: "CODER"
  note: "Verified: bunx vitest run packages/agentplane/src/commands/release/apply.preflight.test.ts passed; npm run typecheck passed in packages/agentplane; rebuilt agentplane; ap release candidate now reports E_VALIDATION with next_action agentplane release plan --patch instead of E_INTERNAL."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fix release candidate missing-plan diagnostic."
events:
  -
    type: "status"
    at: "2026-06-04T23:26:15.454Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix release candidate missing-plan diagnostic."
  -
    type: "verify"
    at: "2026-06-04T23:28:26.955Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bunx vitest run packages/agentplane/src/commands/release/apply.preflight.test.ts passed; npm run typecheck passed in packages/agentplane; rebuilt agentplane; ap release candidate now reports E_VALIDATION with next_action agentplane release plan --patch instead of E_INTERNAL."
doc_version: 3
doc_updated_at: "2026-06-04T23:28:27.059Z"
doc_updated_by: "CODER"
description: "Make release candidate report a direct validation error and next command when the release plan directory is missing, instead of E_INTERNAL."
sections:
  Summary: |-
    Clarify release candidate missing plan diagnostic

    Make release candidate report a direct validation error and next command when the release plan directory is missing, instead of E_INTERNAL.
  Scope: |-
    - In scope: Make release candidate report a direct validation error and next command when the release plan directory is missing, instead of E_INTERNAL.
    - Out of scope: unrelated refactors not required for "Clarify release candidate missing plan diagnostic".
  Plan: "Update release candidate planning lookup so a missing .agentplane/.release/plan directory raises an actionable validation error with next_action 'agentplane release plan --patch' instead of E_INTERNAL. Add a focused regression test for the missing-plan case."
  Verify Steps: |-
    PLANNER fallback scaffold for "Clarify release candidate missing plan diagnostic". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Clarify release candidate missing plan diagnostic". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-04T23:28:26.955Z — VERIFY — ok

    By: CODER

    Note: Verified: bunx vitest run packages/agentplane/src/commands/release/apply.preflight.test.ts passed; npm run typecheck passed in packages/agentplane; rebuilt agentplane; ap release candidate now reports E_VALIDATION with next_action agentplane release plan --patch instead of E_INTERNAL.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T23:26:15.454Z, excerpt_hash=sha256:c6bf24b3178299c0df4cbb97eb72c8c98b8f23103bffb26d4da9272b12a0a424

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606042326-M1JYRV/blueprint/resolved-snapshot.json
    - old_digest: 7c58465ba42afce3feff453716db4379731448b1eef3f2d9b8c59d589c87340d
    - current_digest: 7c58465ba42afce3feff453716db4379731448b1eef3f2d9b8c59d589c87340d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606042326-M1JYRV

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606042326-M1JYRV --agent CODER --slug clarify-release-candidate-missing-plan-diagnosti --worktree
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - runner_required: false
    - runner_failure_means: not_runner_route
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Clarify release candidate missing plan diagnostic

Make release candidate report a direct validation error and next command when the release plan directory is missing, instead of E_INTERNAL.

## Scope

- In scope: Make release candidate report a direct validation error and next command when the release plan directory is missing, instead of E_INTERNAL.
- Out of scope: unrelated refactors not required for "Clarify release candidate missing plan diagnostic".

## Plan

Update release candidate planning lookup so a missing .agentplane/.release/plan directory raises an actionable validation error with next_action 'agentplane release plan --patch' instead of E_INTERNAL. Add a focused regression test for the missing-plan case.

## Verify Steps

PLANNER fallback scaffold for "Clarify release candidate missing plan diagnostic". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Clarify release candidate missing plan diagnostic". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-04T23:28:26.955Z — VERIFY — ok

By: CODER

Note: Verified: bunx vitest run packages/agentplane/src/commands/release/apply.preflight.test.ts passed; npm run typecheck passed in packages/agentplane; rebuilt agentplane; ap release candidate now reports E_VALIDATION with next_action agentplane release plan --patch instead of E_INTERNAL.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T23:26:15.454Z, excerpt_hash=sha256:c6bf24b3178299c0df4cbb97eb72c8c98b8f23103bffb26d4da9272b12a0a424

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606042326-M1JYRV/blueprint/resolved-snapshot.json
- old_digest: 7c58465ba42afce3feff453716db4379731448b1eef3f2d9b8c59d589c87340d
- current_digest: 7c58465ba42afce3feff453716db4379731448b1eef3f2d9b8c59d589c87340d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606042326-M1JYRV

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606042326-M1JYRV --agent CODER --slug clarify-release-candidate-missing-plan-diagnosti --worktree
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- runner_required: false
- runner_failure_means: not_runner_route
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
