---
id: "202606042230-T1RYR8"
title: "Bound PR artifact amend hook hangs"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cognitive-load"
  - "followup"
  - "hooks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-04T22:30:14.422Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-04T22:30:31.950Z"
  updated_by: "CODER"
  note: "Verified: git commit --amend no-edit now accepts timeoutMs, PR artifact auto-commit and close-refresh pass bounded amend timeouts, and focused tests cover timeout propagation. Checks: bunx vitest run packages/agentplane/src/commands/pr/internal/auto-commit.test.ts packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts; npm run typecheck in packages/agentplane; npm run typecheck in packages/core."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: bound PR artifact update amend hangs discovered during batch PR artifact refresh."
events:
  -
    type: "status"
    at: "2026-06-04T22:30:14.781Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: bound PR artifact update amend hangs discovered during batch PR artifact refresh."
  -
    type: "verify"
    at: "2026-06-04T22:30:31.950Z"
    author: "CODER"
    state: "ok"
    note: "Verified: git commit --amend no-edit now accepts timeoutMs, PR artifact auto-commit and close-refresh pass bounded amend timeouts, and focused tests cover timeout propagation. Checks: bunx vitest run packages/agentplane/src/commands/pr/internal/auto-commit.test.ts packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts; npm run typecheck in packages/agentplane; npm run typecheck in packages/core."
doc_version: 3
doc_updated_at: "2026-06-04T22:30:32.046Z"
doc_updated_by: "CODER"
description: "Prevent PR artifact update from hanging indefinitely when git commit --amend waits on local hooks after artifacts were refreshed."
sections:
  Summary: |-
    Bound PR artifact amend hook hangs

    Prevent PR artifact update from hanging indefinitely when git commit --amend waits on local hooks after artifacts were refreshed.
  Scope: |-
    - In scope: Prevent PR artifact update from hanging indefinitely when git commit --amend waits on local hooks after artifacts were refreshed.
    - Out of scope: unrelated refactors not required for "Bound PR artifact amend hook hangs".
  Plan: "Add timeout support to git commit --amend no-edit, use it from PR artifact auto-commit and close-refresh amend paths, and cover PR artifact amend timeout propagation with a focused unit test."
  Verify Steps: |-
    PLANNER fallback scaffold for "Bound PR artifact amend hook hangs". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Bound PR artifact amend hook hangs". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-04T22:30:31.950Z — VERIFY — ok

    By: CODER

    Note: Verified: git commit --amend no-edit now accepts timeoutMs, PR artifact auto-commit and close-refresh pass bounded amend timeouts, and focused tests cover timeout propagation. Checks: bunx vitest run packages/agentplane/src/commands/pr/internal/auto-commit.test.ts packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts; npm run typecheck in packages/agentplane; npm run typecheck in packages/core.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T22:30:14.781Z, excerpt_hash=sha256:d15d906a8f6b2d84a6e886c67bb0d3b2ba526884d6cc4df8c22596d54e9dadb4

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042157-020DWK-reduce-agent-cognitive-load-and-publish-next-pat/.agentplane/tasks/202606042230-T1RYR8/blueprint/resolved-snapshot.json
    - old_digest: c254770992550a3d0ba7d8e9e9c1561d29bc123649c0f259ec0a6b6b53304a97
    - current_digest: c254770992550a3d0ba7d8e9e9c1561d29bc123649c0f259ec0a6b6b53304a97
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606042230-T1RYR8

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606042230-T1RYR8 --agent CODER --slug bound-pr-artifact-amend-hook-hangs --worktree
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
extensions:
  branch_pr_batch:
    base: "main"
    branch: "task/202606042157-020DWK/reduce-agent-cognitive-load-and-publish-next-pat"
    included_task_ids:
      - "202606042204-NX58GD"
      - "202606042214-GEJ627"
      - "202606042225-FE57GC"
      - "202606042230-T1RYR8"
      - "202606042236-HJCTGD"
      - "202606042239-5Z9J95"
    primary_task_id: "202606042157-020DWK"
    role: "included"
    updated_at: "2026-06-04T23:00:20.671Z"
id_source: "generated"
---
## Summary

Bound PR artifact amend hook hangs

Prevent PR artifact update from hanging indefinitely when git commit --amend waits on local hooks after artifacts were refreshed.

## Scope

- In scope: Prevent PR artifact update from hanging indefinitely when git commit --amend waits on local hooks after artifacts were refreshed.
- Out of scope: unrelated refactors not required for "Bound PR artifact amend hook hangs".

## Plan

Add timeout support to git commit --amend no-edit, use it from PR artifact auto-commit and close-refresh amend paths, and cover PR artifact amend timeout propagation with a focused unit test.

## Verify Steps

PLANNER fallback scaffold for "Bound PR artifact amend hook hangs". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Bound PR artifact amend hook hangs". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-04T22:30:31.950Z — VERIFY — ok

By: CODER

Note: Verified: git commit --amend no-edit now accepts timeoutMs, PR artifact auto-commit and close-refresh pass bounded amend timeouts, and focused tests cover timeout propagation. Checks: bunx vitest run packages/agentplane/src/commands/pr/internal/auto-commit.test.ts packages/agentplane/src/commands/guard/impl/commands.commit-non-close.unit.test.ts; npm run typecheck in packages/agentplane; npm run typecheck in packages/core.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T22:30:14.781Z, excerpt_hash=sha256:d15d906a8f6b2d84a6e886c67bb0d3b2ba526884d6cc4df8c22596d54e9dadb4

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042157-020DWK-reduce-agent-cognitive-load-and-publish-next-pat/.agentplane/tasks/202606042230-T1RYR8/blueprint/resolved-snapshot.json
- old_digest: c254770992550a3d0ba7d8e9e9c1561d29bc123649c0f259ec0a6b6b53304a97
- current_digest: c254770992550a3d0ba7d8e9e9c1561d29bc123649c0f259ec0a6b6b53304a97
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606042230-T1RYR8

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606042230-T1RYR8 --agent CODER --slug bound-pr-artifact-amend-hook-hangs --worktree
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
