---
id: "202606042239-5Z9J95"
title: "Align PR check with live-head artifacts"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "cognitive-load"
  - "followup"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-04T22:39:20.509Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-04T22:40:25.268Z"
  updated_by: "CODER"
  note: "Verified: PR freshness treats missing meta.head_sha as live-head artifacts instead of stale, aligning pr check with route oracle. Checks: bunx vitest run packages/agentplane/src/commands/pr/internal/freshness.test.ts packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.test.ts; npm run typecheck in packages/agentplane; npm run build in packages/agentplane."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: align pr check with route oracle for live-head PR artifacts."
events:
  -
    type: "status"
    at: "2026-06-04T22:39:20.951Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align pr check with route oracle for live-head PR artifacts."
  -
    type: "verify"
    at: "2026-06-04T22:40:25.268Z"
    author: "CODER"
    state: "ok"
    note: "Verified: PR freshness treats missing meta.head_sha as live-head artifacts instead of stale, aligning pr check with route oracle. Checks: bunx vitest run packages/agentplane/src/commands/pr/internal/freshness.test.ts packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.test.ts; npm run typecheck in packages/agentplane; npm run build in packages/agentplane."
doc_version: 3
doc_updated_at: "2026-06-04T22:40:25.371Z"
doc_updated_by: "CODER"
description: "Make pr check treat live-head PR artifacts consistently with route oracle instead of failing with recorded_head=<live> when local artifacts are otherwise fresh."
sections:
  Summary: |-
    Align PR check with live-head artifacts

    Make pr check treat live-head PR artifacts consistently with route oracle instead of failing with recorded_head=<live> when local artifacts are otherwise fresh.
  Scope: |-
    - In scope: Make pr check treat live-head PR artifacts consistently with route oracle instead of failing with recorded_head=<live> when local artifacts are otherwise fresh.
    - Out of scope: unrelated refactors not required for "Align PR check with live-head artifacts".
  Plan: "Update PR artifact snapshot freshness so missing meta.head_sha means live-head artifacts and does not fail stale checks when the snapshot is otherwise current; add a focused test for recorded_head=<live> behavior."
  Verify Steps: |-
    PLANNER fallback scaffold for "Align PR check with live-head artifacts". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Align PR check with live-head artifacts". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-04T22:40:25.268Z — VERIFY — ok

    By: CODER

    Note: Verified: PR freshness treats missing meta.head_sha as live-head artifacts instead of stale, aligning pr check with route oracle. Checks: bunx vitest run packages/agentplane/src/commands/pr/internal/freshness.test.ts packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.test.ts; npm run typecheck in packages/agentplane; npm run build in packages/agentplane.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T22:39:20.951Z, excerpt_hash=sha256:a67bbe6eb9b0fdbd199ac84fcd967a77ed44adda2f7e243060e69911e657952f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042157-020DWK-reduce-agent-cognitive-load-and-publish-next-pat/.agentplane/tasks/202606042239-5Z9J95/blueprint/resolved-snapshot.json
    - old_digest: bdeb86df5f8f74581bd963d4351e80777caa05eb3e4ba234e9faa1100489156b
    - current_digest: bdeb86df5f8f74581bd963d4351e80777caa05eb3e4ba234e9faa1100489156b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606042239-5Z9J95

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606042239-5Z9J95 --agent CODER --slug align-pr-check-with-live-head-artifacts --worktree
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

Align PR check with live-head artifacts

Make pr check treat live-head PR artifacts consistently with route oracle instead of failing with recorded_head=<live> when local artifacts are otherwise fresh.

## Scope

- In scope: Make pr check treat live-head PR artifacts consistently with route oracle instead of failing with recorded_head=<live> when local artifacts are otherwise fresh.
- Out of scope: unrelated refactors not required for "Align PR check with live-head artifacts".

## Plan

Update PR artifact snapshot freshness so missing meta.head_sha means live-head artifacts and does not fail stale checks when the snapshot is otherwise current; add a focused test for recorded_head=<live> behavior.

## Verify Steps

PLANNER fallback scaffold for "Align PR check with live-head artifacts". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Align PR check with live-head artifacts". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-04T22:40:25.268Z — VERIFY — ok

By: CODER

Note: Verified: PR freshness treats missing meta.head_sha as live-head artifacts instead of stale, aligning pr check with route oracle. Checks: bunx vitest run packages/agentplane/src/commands/pr/internal/freshness.test.ts packages/agentplane/src/commands/pr/internal/pr-artifact-snapshot.test.ts; npm run typecheck in packages/agentplane; npm run build in packages/agentplane.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T22:39:20.951Z, excerpt_hash=sha256:a67bbe6eb9b0fdbd199ac84fcd967a77ed44adda2f7e243060e69911e657952f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042157-020DWK-reduce-agent-cognitive-load-and-publish-next-pat/.agentplane/tasks/202606042239-5Z9J95/blueprint/resolved-snapshot.json
- old_digest: bdeb86df5f8f74581bd963d4351e80777caa05eb3e4ba234e9faa1100489156b
- current_digest: bdeb86df5f8f74581bd963d4351e80777caa05eb3e4ba234e9faa1100489156b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606042239-5Z9J95

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606042239-5Z9J95 --agent CODER --slug align-pr-check-with-live-head-artifacts --worktree
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
