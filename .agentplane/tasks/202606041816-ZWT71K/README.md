---
id: "202606041816-ZWT71K"
title: "Make hosted-close tolerate pre-merge closed tasks"
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
  updated_at: "2026-06-04T18:16:29.347Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-04T18:21:01.697Z"
  updated_by: "CODER"
  note: "Verified hosted-close pre-merge closure idempotency: targeted hosted-close.command unit test passed (5 tests), format:changed passed, typecheck passed, policy routing checks passed, hotspots check passed, agentplane package build passed, and synthetic PR #4439 hosted-close event exited 0 without creating a commit."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: make hosted-close idempotent for tasks closed inside the merged PR before the GitHub merge commit."
events:
  -
    type: "status"
    at: "2026-06-04T18:16:34.262Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make hosted-close idempotent for tasks closed inside the merged PR before the GitHub merge commit."
  -
    type: "verify"
    at: "2026-06-04T18:21:01.697Z"
    author: "CODER"
    state: "ok"
    note: "Verified hosted-close pre-merge closure idempotency: targeted hosted-close.command unit test passed (5 tests), format:changed passed, typecheck passed, policy routing checks passed, hotspots check passed, agentplane package build passed, and synthetic PR #4439 hosted-close event exited 0 without creating a commit."
doc_version: 3
doc_updated_at: "2026-06-04T18:21:01.790Z"
doc_updated_by: "CODER"
description: "Post-merge hosted-close failed after PR #4439 because the task was already DONE in the merged PR with a close commit that is an ancestor of the GitHub merge commit. Treat that state as an idempotent noop when the PR metadata matches the merged task branch/number and the recorded DONE commit is reachable from the merge commit."
sections:
  Summary: |-
    Make hosted-close tolerate pre-merge closed tasks

    Post-merge hosted-close failed after PR #4439 because the task was already DONE in the merged PR with a close commit that is an ancestor of the GitHub merge commit. Treat that state as an idempotent noop when the PR metadata matches the merged task branch/number and the recorded DONE commit is reachable from the merge commit.
  Scope: |-
    - In scope: Post-merge hosted-close failed after PR #4439 because the task was already DONE in the merged PR with a close commit that is an ancestor of the GitHub merge commit. Treat that state as an idempotent noop when the PR metadata matches the merged task branch/number and the recorded DONE commit is reachable from the merge commit.
    - Out of scope: unrelated refactors not required for "Make hosted-close tolerate pre-merge closed tasks".
  Plan: "1. Reproduce the hosted-close conflict path with a regression test where a task is DONE before the merged PR event and its recorded close commit is an ancestor of the merge commit. 2. Update hosted-close conflict handling to return a noop for that verified pre-merge closure state while keeping unrelated conflicting DONE commits blocked. 3. Verify targeted hosted-close tests plus policy/type checks needed for this workflow slice. 4. Publish and merge the follow-up PR."
  Verify Steps: |-
    PLANNER fallback scaffold for "Make hosted-close tolerate pre-merge closed tasks". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Make hosted-close tolerate pre-merge closed tasks". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-04T18:21:01.697Z — VERIFY — ok

    By: CODER

    Note: Verified hosted-close pre-merge closure idempotency: targeted hosted-close.command unit test passed (5 tests), format:changed passed, typecheck passed, policy routing checks passed, hotspots check passed, agentplane package build passed, and synthetic PR #4439 hosted-close event exited 0 without creating a commit.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T18:16:34.262Z, excerpt_hash=sha256:79689b071560d3081524ca42a85f2a088731aadde3090de290ae0358997b185c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606041738-A531FX-address-feedback-issues-for-route-and-diagnostic/.agentplane/tasks/202606041816-ZWT71K/blueprint/resolved-snapshot.json
    - old_digest: e4aa630096044e20f02a3ab4d8495dcd681bcc724869953f299c38b77b04a4e9
    - current_digest: e4aa630096044e20f02a3ab4d8495dcd681bcc724869953f299c38b77b04a4e9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606041816-ZWT71K

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606041816-ZWT71K
    - diagnostic_command: agentplane pr check 202606041816-ZWT71K
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - runner_required: false
    - runner_failure_means: not_runner_route
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: GitHub hosted-close failed after PR #4439 because pre_merge_closure metadata omitted pr_number even though branch and marker matched the merged PR.
      Impact: Post-merge task closure could fail after an otherwise valid merged PR, leaving operators with a false conflicting-DONE signal.
      Resolution: Treat missing pr_number as acceptable for explicit pre_merge_closure markers when branch matches and the marker basis is an ancestor of the merged head.
id_source: "generated"
---
## Summary

Make hosted-close tolerate pre-merge closed tasks

Post-merge hosted-close failed after PR #4439 because the task was already DONE in the merged PR with a close commit that is an ancestor of the GitHub merge commit. Treat that state as an idempotent noop when the PR metadata matches the merged task branch/number and the recorded DONE commit is reachable from the merge commit.

## Scope

- In scope: Post-merge hosted-close failed after PR #4439 because the task was already DONE in the merged PR with a close commit that is an ancestor of the GitHub merge commit. Treat that state as an idempotent noop when the PR metadata matches the merged task branch/number and the recorded DONE commit is reachable from the merge commit.
- Out of scope: unrelated refactors not required for "Make hosted-close tolerate pre-merge closed tasks".

## Plan

1. Reproduce the hosted-close conflict path with a regression test where a task is DONE before the merged PR event and its recorded close commit is an ancestor of the merge commit. 2. Update hosted-close conflict handling to return a noop for that verified pre-merge closure state while keeping unrelated conflicting DONE commits blocked. 3. Verify targeted hosted-close tests plus policy/type checks needed for this workflow slice. 4. Publish and merge the follow-up PR.

## Verify Steps

PLANNER fallback scaffold for "Make hosted-close tolerate pre-merge closed tasks". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Make hosted-close tolerate pre-merge closed tasks". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-04T18:21:01.697Z — VERIFY — ok

By: CODER

Note: Verified hosted-close pre-merge closure idempotency: targeted hosted-close.command unit test passed (5 tests), format:changed passed, typecheck passed, policy routing checks passed, hotspots check passed, agentplane package build passed, and synthetic PR #4439 hosted-close event exited 0 without creating a commit.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T18:16:34.262Z, excerpt_hash=sha256:79689b071560d3081524ca42a85f2a088731aadde3090de290ae0358997b185c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606041738-A531FX-address-feedback-issues-for-route-and-diagnostic/.agentplane/tasks/202606041816-ZWT71K/blueprint/resolved-snapshot.json
- old_digest: e4aa630096044e20f02a3ab4d8495dcd681bcc724869953f299c38b77b04a4e9
- current_digest: e4aa630096044e20f02a3ab4d8495dcd681bcc724869953f299c38b77b04a4e9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606041816-ZWT71K

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606041816-ZWT71K
- diagnostic_command: agentplane pr check 202606041816-ZWT71K
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- runner_required: false
- runner_failure_means: not_runner_route
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: GitHub hosted-close failed after PR #4439 because pre_merge_closure metadata omitted pr_number even though branch and marker matched the merged PR.
  Impact: Post-merge task closure could fail after an otherwise valid merged PR, leaving operators with a false conflicting-DONE signal.
  Resolution: Treat missing pr_number as acceptable for explicit pre_merge_closure markers when branch matches and the marker basis is an ancestor of the merged head.
