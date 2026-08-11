---
id: "202608110110-3QTGFQ"
title: "Advance the integration queue in the foreground supervisor"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-11T01:10:32.308Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "04c1ee1f6cb74c7da7a7f83a0de39e0b0cee4718"
  message: "🚧 3QTGFQ task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 04c1ee1f6cb7. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-11T01:10:43.736Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-11T01:23:31.957Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 04c1ee1f6cb7. CLI accepted one state-bound external-agent semantic result."
    commit: "04c1ee1f6cb74c7da7a7f83a0de39e0b0cee4718"
doc_version: 3
doc_updated_at: "2026-08-11T01:23:31.957Z"
doc_updated_by: "SUPERVISOR"
description: "Make branch_pr task supervision enqueue and then serialize its own integration queue through typed deterministic operations, recover handoffs without semantic rework, and prevent stale base task replicas while preserving parallel per-task worktrees."
sections:
  Summary: |-
    Advance the integration queue in the foreground supervisor

    Make branch_pr task supervision enqueue and then serialize its own integration queue through typed deterministic operations, recover handoffs without semantic rework, and prevent stale base task replicas while preserving parallel per-task worktrees.
  Scope: |-
    - In scope: Make branch_pr task supervision enqueue and then serialize its own integration queue through typed deterministic operations, recover handoffs without semantic rework, and prevent stale base task replicas while preserving parallel per-task worktrees.
    - Out of scope: unrelated refactors not required for "Advance the integration queue in the foreground supervisor".
  Plan: |-
    1. Add a typed integration queue run-next operation to the workflow registry, deterministic argv projection, effects, postconditions, and authority policy.
    2. Route matching queued and recoverable handoff entries to foreground queue advancement; continue to wait when another live claimant owns the serialized lane and terminate only from provider-backed merged truth.
    3. Execute run-next in-process from the base checkout with hosted-check waiting, bounded lane waiting, no duplicate local verification, and durable supervisor receipts.
    4. Make branch_pr work start transfer the active task artifact out of the base checkout for every repository-local backend shape, while keeping exactly one worktree per active task and allowing multiple different task worktrees in parallel.
    5. Add focused route, registry, authority, supervisor, contention, handoff recovery, provider-unavailability, base-replica, and parallel-worktree tests.
    6. Run targeted tests, typecheck, lint/format/knip/hotspot checks, build, and the full fast suite. Record durable verification and quality evidence before PR integration.
    7. Publish through the guarded branch_pr lifecycle, require hosted CI, and prove the merged task converges without a separate queue-worker process or stale base task README.
  Verify Steps: |-
    PLANNER fallback scaffold for "Advance the integration queue in the foreground supervisor". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Advance the integration queue in the foreground supervisor". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "4677188e875b6a7034f935b382f142e93d7d02e5"
    version: 1
id_source: "generated"
---
## Summary

Advance the integration queue in the foreground supervisor

Make branch_pr task supervision enqueue and then serialize its own integration queue through typed deterministic operations, recover handoffs without semantic rework, and prevent stale base task replicas while preserving parallel per-task worktrees.

## Scope

- In scope: Make branch_pr task supervision enqueue and then serialize its own integration queue through typed deterministic operations, recover handoffs without semantic rework, and prevent stale base task replicas while preserving parallel per-task worktrees.
- Out of scope: unrelated refactors not required for "Advance the integration queue in the foreground supervisor".

## Plan

1. Add a typed integration queue run-next operation to the workflow registry, deterministic argv projection, effects, postconditions, and authority policy.
2. Route matching queued and recoverable handoff entries to foreground queue advancement; continue to wait when another live claimant owns the serialized lane and terminate only from provider-backed merged truth.
3. Execute run-next in-process from the base checkout with hosted-check waiting, bounded lane waiting, no duplicate local verification, and durable supervisor receipts.
4. Make branch_pr work start transfer the active task artifact out of the base checkout for every repository-local backend shape, while keeping exactly one worktree per active task and allowing multiple different task worktrees in parallel.
5. Add focused route, registry, authority, supervisor, contention, handoff recovery, provider-unavailability, base-replica, and parallel-worktree tests.
6. Run targeted tests, typecheck, lint/format/knip/hotspot checks, build, and the full fast suite. Record durable verification and quality evidence before PR integration.
7. Publish through the guarded branch_pr lifecycle, require hosted CI, and prove the merged task converges without a separate queue-worker process or stale base task README.

## Verify Steps

PLANNER fallback scaffold for "Advance the integration queue in the foreground supervisor". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Advance the integration queue in the foreground supervisor". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
