---
id: "202607252235-5ZKP6T"
title: "Prevent foreign task artifacts in branch_pr worktrees"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "correctness"
  - "milestone-alpha2"
  - "v0.7"
  - "workflow"
  - "code"
verify:
  - "bun run typecheck"
  - "bun run lint:core"
  - "bun run lifecycle:invariants"
  - "node .agentplane/policy/check-routing.mjs"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-07-25T22:41:52.446Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-07-25T23:29:57.587Z"
  updated_by: "TESTER"
  note: "Rework: guarded repair may unlink the replica after its authoritative source changed, so the proof is stale at deletion time."
  attempts: 1
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-25T22:39:31.207Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-25T23:29:57.587Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework: guarded repair may unlink the replica after its authoritative source changed, so the proof is stale at deletion time."
doc_version: 3
doc_updated_at: "2026-07-25T23:29:58.303Z"
doc_updated_by: "CODER"
description: "Stop work start from materializing foreign untracked task artifacts into a task worktree, and add a deterministic guarded repair route for already contaminated worktrees so their lifecycle can resume without manual deletion."
sections:
  Summary: |-
    Prevent foreign task artifacts in branch_pr worktrees

    Stop work start from materializing foreign untracked task artifacts into a task worktree, and add a deterministic guarded repair route for already contaminated worktrees so their lifecycle can resume without manual deletion.
  Scope: |-
    - In scope: Stop work start from materializing foreign untracked task artifacts into a task worktree, and add a deterministic guarded repair route for already contaminated worktrees so their lifecycle can resume without manual deletion.
    - Out of scope: unrelated refactors not required for "Prevent foreign task artifacts in branch_pr worktrees".
  Plan: "1. Trace branch_pr work-start materialization and the task-worktree-dirty route with an isolated fixture. 2. Make work start materialize and hand off only the active task artifact; preserve backend/branch-snapshot resolution for other tasks. 3. Extend the formal flow-repair route with a deterministic, guarded repair for a foreign untracked task README replica. Permit removal only when the path is a regular untracked README under a foreign valid task ID, there are no other dirty paths, and it is proven either byte-identical to the authoritative source or a recognized lifecycle replica: immutable and semantic task fields match, and the only delta is the exact allowed start-ready transition. Reject missing, modified, symlinked, active-task, unknown, or mixed artifacts. 4. Add focused regression tests for prevention, safe repair, lifecycle-replica repair, and fail-closed cases; keep all user and unrelated artifacts untouched. 5. Add this corrective task to the alpha.2 fan-in and v0.7 roadmap, preserving existing SNV and THDN fan-in changes, then run focused tests, typecheck, lint, lifecycle invariants, routing check, and diff check. 6. Complete branch_pr verification, quality review, hosted checks, and integration."
  Verify Steps: |-
    1. Run the focused work-start and foreign-replica test files. Expected: only the active task artifact is materialized, byte-identical and exact start-ready replicas are removable, and modified, missing, symlinked, active-task, mixed, and wrong-root cases fail closed.
    2. Run task next-action and flow repair from a current checkout with --root pointing to the older target worktree. Expected: the route emits flow repair and safe-apply removes only the proven foreign README.
    3. Confirm the alpha.2 gate depends on SNV847, THDN0G, and 5ZKP6T, and the v0.7 roadmap lists both corrective leaves.
    4. Run typecheck, core lint, lifecycle invariants, policy routing, and diff checks. Expected: all pass without unrelated artifacts.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-25T23:29:57.587Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework: guarded repair may unlink the replica after its authoritative source changed, so the proof is stale at deletion time.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T23:10:49.452Z, excerpt_hash=sha256:e861d2f2fe43755547db6bee543bf231d306135ebb7898f1a924c06b90c65dc8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252235-5ZKP6T-prevent-foreign-task-artifacts-in-branch-pr-work/.agentplane/tasks/202607252235-5ZKP6T/blueprint/resolved-snapshot.json
    - old_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
    - current_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607252235-5ZKP6T

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607252235-5ZKP6T
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Deterministic TOCTOU probe changed the authoritative source on inspect's post-proof git-status call; applyForeignTaskReadmeReplicaRepair still returned applied and removed the replica.
      Impact: A destructive repair can delete a README that is no longer an exact byte-identical or TODO-to-DOING replica of the live source.
      Resolution: Capture the authoritative source path-chain identity with the proof and revalidate it immediately before unlink; add a durable regression that mutates the source after proof and expects skipped/no deletion.
extensions:
  workflow_route_baseline:
    start_head_sha: "220c7f110c07a14b2b055003cd338ad4c1c3503e"
    version: 1
id_source: "generated"
---
## Summary

Prevent foreign task artifacts in branch_pr worktrees

Stop work start from materializing foreign untracked task artifacts into a task worktree, and add a deterministic guarded repair route for already contaminated worktrees so their lifecycle can resume without manual deletion.

## Scope

- In scope: Stop work start from materializing foreign untracked task artifacts into a task worktree, and add a deterministic guarded repair route for already contaminated worktrees so their lifecycle can resume without manual deletion.
- Out of scope: unrelated refactors not required for "Prevent foreign task artifacts in branch_pr worktrees".

## Plan

1. Trace branch_pr work-start materialization and the task-worktree-dirty route with an isolated fixture. 2. Make work start materialize and hand off only the active task artifact; preserve backend/branch-snapshot resolution for other tasks. 3. Extend the formal flow-repair route with a deterministic, guarded repair for a foreign untracked task README replica. Permit removal only when the path is a regular untracked README under a foreign valid task ID, there are no other dirty paths, and it is proven either byte-identical to the authoritative source or a recognized lifecycle replica: immutable and semantic task fields match, and the only delta is the exact allowed start-ready transition. Reject missing, modified, symlinked, active-task, unknown, or mixed artifacts. 4. Add focused regression tests for prevention, safe repair, lifecycle-replica repair, and fail-closed cases; keep all user and unrelated artifacts untouched. 5. Add this corrective task to the alpha.2 fan-in and v0.7 roadmap, preserving existing SNV and THDN fan-in changes, then run focused tests, typecheck, lint, lifecycle invariants, routing check, and diff check. 6. Complete branch_pr verification, quality review, hosted checks, and integration.

## Verify Steps

1. Run the focused work-start and foreign-replica test files. Expected: only the active task artifact is materialized, byte-identical and exact start-ready replicas are removable, and modified, missing, symlinked, active-task, mixed, and wrong-root cases fail closed.
2. Run task next-action and flow repair from a current checkout with --root pointing to the older target worktree. Expected: the route emits flow repair and safe-apply removes only the proven foreign README.
3. Confirm the alpha.2 gate depends on SNV847, THDN0G, and 5ZKP6T, and the v0.7 roadmap lists both corrective leaves.
4. Run typecheck, core lint, lifecycle invariants, policy routing, and diff checks. Expected: all pass without unrelated artifacts.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-25T23:29:57.587Z — VERIFY — needs_rework

By: TESTER

Note: Rework: guarded repair may unlink the replica after its authoritative source changed, so the proof is stale at deletion time.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T23:10:49.452Z, excerpt_hash=sha256:e861d2f2fe43755547db6bee543bf231d306135ebb7898f1a924c06b90c65dc8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252235-5ZKP6T-prevent-foreign-task-artifacts-in-branch-pr-work/.agentplane/tasks/202607252235-5ZKP6T/blueprint/resolved-snapshot.json
- old_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
- current_digest: 2f56cc173030ddf9dc58489bddc12c017a6aad68fb7daa14e7ced35f5be68acb
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607252235-5ZKP6T

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607252235-5ZKP6T
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Deterministic TOCTOU probe changed the authoritative source on inspect's post-proof git-status call; applyForeignTaskReadmeReplicaRepair still returned applied and removed the replica.
  Impact: A destructive repair can delete a README that is no longer an exact byte-identical or TODO-to-DOING replica of the live source.
  Resolution: Capture the authoritative source path-chain identity with the proof and revalidate it immediately before unlink; add a durable regression that mutates the source after proof and expects skipped/no deletion.
