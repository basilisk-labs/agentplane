---
id: "202606050001-Y1Z967"
title: "Reject stale branch fallback PR artifacts"
result_summary: "Release follow-up completed and included in the v0.6.17 release branch."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "cognitive-load"
  - "pr-check"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-05T00:01:25.218Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-05T00:02:56.602Z"
  updated_by: "CODER"
  note: "Targeted PR validation and remote artifact fallback tests passed; package typecheck passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-05T00:03:05.141Z"
  updated_by: "EVALUATOR"
  note: "pr check rejects stale branch fallback artifacts when the local task projection is missing while preserving valid local, branch, and remote artifact fallback paths."
  evaluated_sha: "704ced217a8068fb992a02f433e01202f1119a56"
  blueprint_digest: "68ea9289dcefd98d0bb57ecba50245d142852e09c73e8e61f2f1525e794ca23d"
  evidence_refs:
    - ".agentplane/tasks/202606050001-Y1Z967/README.md"
    - ".agentplane/tasks/202606050001-Y1Z967/quality/20260605-000305141-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606050001-Y1Z967/quality/20260605-000305141-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606050001-Y1Z967/quality/20260605-000305141-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606050001-Y1Z967/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/pr/check.ts"
    - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
    - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-check-remote-artifacts.test.ts"
  findings:
    - "Focused PR validation tests passed, remote artifact fallback stayed green, and package typecheck passed."
commit:
  hash: "704ced217a8068fb992a02f433e01202f1119a56"
  message: "🧭 202606050001-Y1Z967 cli: reject stale branch fallback artifacts"
comments:
  -
    author: "CODER"
    body: "Start: fix stale branch fallback PR artifact acceptance found by release-ci-base chunk 31."
  -
    author: "INTEGRATOR"
    body: "Verified: release follow-up was implemented, reviewed, and merged through the v0.6.17 release branch."
events:
  -
    type: "status"
    at: "2026-06-05T00:01:25.799Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix stale branch fallback PR artifact acceptance found by release-ci-base chunk 31."
  -
    type: "verify"
    at: "2026-06-05T00:02:56.602Z"
    author: "CODER"
    state: "ok"
    note: "Targeted PR validation and remote artifact fallback tests passed; package typecheck passed."
  -
    type: "status"
    at: "2026-06-05T02:00:47.349Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: release follow-up was implemented, reviewed, and merged through the v0.6.17 release branch."
doc_version: 3
doc_updated_at: "2026-06-05T02:00:47.349Z"
doc_updated_by: "INTEGRATOR"
description: "Release candidate validation showed pr check can accept stale branch fallback artifacts and return success instead of reporting missing local PR artifacts. Make the CLI reject stale fallback state with direct diagnostics, then rerun targeted PR validation tests before release candidate retry."
sections:
  Summary: |-
    Reject stale branch fallback PR artifacts

    Release candidate validation showed pr check can accept stale branch fallback artifacts and return success instead of reporting missing local PR artifacts. Make the CLI reject stale fallback state with direct diagnostics, then rerun targeted PR validation tests before release candidate retry.
  Scope: |-
    - In scope: Release candidate validation showed pr check can accept stale branch fallback artifacts and return success instead of reporting missing local PR artifacts. Make the CLI reject stale fallback state with direct diagnostics, then rerun targeted PR validation tests before release candidate retry.
    - Out of scope: unrelated refactors not required for "Reject stale branch fallback PR artifacts".
  Plan: "1. Reproduce the release-gate failure with the focused pr-validation test. 2. Inspect pr check artifact discovery and branch fallback freshness rules. 3. Reject stale branch fallback artifacts when local PR artifacts are missing, preserving valid local-artifact preference. 4. Run the focused PR validation test and adjacent freshness checks, then record evaluator evidence before retrying the release candidate."
  Verify Steps: |-
    PLANNER fallback scaffold for "Reject stale branch fallback PR artifacts". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Reject stale branch fallback PR artifacts". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-05T00:02:56.602Z — VERIFY — ok

    By: CODER

    Note: Targeted PR validation and remote artifact fallback tests passed; package typecheck passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T00:01:25.799Z, excerpt_hash=sha256:1501da9525edfd81cfbc7e57b00e9c60bf187565107769a3a362620c9d139712

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606050001-Y1Z967/blueprint/resolved-snapshot.json
    - old_digest: 68ea9289dcefd98d0bb57ecba50245d142852e09c73e8e61f2f1525e794ca23d
    - current_digest: 68ea9289dcefd98d0bb57ecba50245d142852e09c73e8e61f2f1525e794ca23d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606050001-Y1Z967

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606050001-Y1Z967 --agent CODER --slug reject-stale-branch-fallback-pr-artifacts --worktree
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
  Findings: |-
    - Observation: pr check no longer accepts branch fallback artifacts when the local task projection is missing from the current checkout.
      Impact: Agents now receive the missing local PR artifact diagnostic instead of a false green pr check on stale branch fallback state.
      Resolution: Require an existing local task README before selecting branch-backed PR artifacts as a replacement for local artifacts.
id_source: "generated"
---
## Summary

Reject stale branch fallback PR artifacts

Release candidate validation showed pr check can accept stale branch fallback artifacts and return success instead of reporting missing local PR artifacts. Make the CLI reject stale fallback state with direct diagnostics, then rerun targeted PR validation tests before release candidate retry.

## Scope

- In scope: Release candidate validation showed pr check can accept stale branch fallback artifacts and return success instead of reporting missing local PR artifacts. Make the CLI reject stale fallback state with direct diagnostics, then rerun targeted PR validation tests before release candidate retry.
- Out of scope: unrelated refactors not required for "Reject stale branch fallback PR artifacts".

## Plan

1. Reproduce the release-gate failure with the focused pr-validation test. 2. Inspect pr check artifact discovery and branch fallback freshness rules. 3. Reject stale branch fallback artifacts when local PR artifacts are missing, preserving valid local-artifact preference. 4. Run the focused PR validation test and adjacent freshness checks, then record evaluator evidence before retrying the release candidate.

## Verify Steps

PLANNER fallback scaffold for "Reject stale branch fallback PR artifacts". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Reject stale branch fallback PR artifacts". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-05T00:02:56.602Z — VERIFY — ok

By: CODER

Note: Targeted PR validation and remote artifact fallback tests passed; package typecheck passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T00:01:25.799Z, excerpt_hash=sha256:1501da9525edfd81cfbc7e57b00e9c60bf187565107769a3a362620c9d139712

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606050001-Y1Z967/blueprint/resolved-snapshot.json
- old_digest: 68ea9289dcefd98d0bb57ecba50245d142852e09c73e8e61f2f1525e794ca23d
- current_digest: 68ea9289dcefd98d0bb57ecba50245d142852e09c73e8e61f2f1525e794ca23d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606050001-Y1Z967

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606050001-Y1Z967 --agent CODER --slug reject-stale-branch-fallback-pr-artifacts --worktree
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

- Observation: pr check no longer accepts branch fallback artifacts when the local task projection is missing from the current checkout.
  Impact: Agents now receive the missing local PR artifact diagnostic instead of a false green pr check on stale branch fallback state.
  Resolution: Require an existing local task README before selecting branch-backed PR artifacts as a replacement for local artifacts.
