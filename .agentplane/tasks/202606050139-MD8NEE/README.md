---
id: "202606050139-MD8NEE"
title: "Restore branch artifact fallback for PR check"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-05T01:39:18.382Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-05T01:39:19.371Z"
  updated_by: "REVIEWER"
  note: "Branch artifact fallback regression test passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-05T01:39:54.802Z"
  updated_by: "EVALUATOR"
  note: "PR check branch artifact fallback is restored and covered."
  evaluated_sha: "be4952a78bab305c4aa693fcadc3b89d458af2f2"
  blueprint_digest: "b611de77be52434444908a464d2d072dfb3f00d9ba7d99c0f662510566e086be"
  evidence_refs:
    - ".agentplane/tasks/202606050139-MD8NEE/README.md"
    - ".agentplane/tasks/202606050139-MD8NEE/quality/20260605-013954802-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606050139-MD8NEE/quality/20260605-013954802-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606050139-MD8NEE/quality/20260605-013954802-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606050139-MD8NEE/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts"
  findings:
    - "The fallback guard now permits branch snapshot reads when the base checkout lacks a local task README, and the regression test validates artifact_source: branch."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: restore branch artifact fallback for PR check after review feedback."
events:
  -
    type: "status"
    at: "2026-06-05T01:39:18.738Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: restore branch artifact fallback for PR check after review feedback."
  -
    type: "verify"
    at: "2026-06-05T01:39:19.371Z"
    author: "REVIEWER"
    state: "ok"
    note: "Branch artifact fallback regression test passed."
doc_version: 3
doc_updated_at: "2026-06-05T01:39:19.469Z"
doc_updated_by: "CODER"
description: "Review found that pr check no longer reads branch PR artifacts when the base checkout lacks a local task README. Restore branch-only artifact fallback and cover it with a focused regression test."
sections:
  Summary: |-
    Restore branch artifact fallback for PR check

    Review found that pr check no longer reads branch PR artifacts when the base checkout lacks a local task README. Restore branch-only artifact fallback and cover it with a focused regression test.
  Scope: |-
    - In scope: Review found that pr check no longer reads branch PR artifacts when the base checkout lacks a local task README. Restore branch-only artifact fallback and cover it with a focused regression test.
    - Out of scope: unrelated refactors not required for "Restore branch artifact fallback for PR check".
  Plan: "Restore pr check branch artifact fallback when the base checkout lacks a local task README, update the regression test that previously expected missing local artifacts, and rerun the focused PR validation test before updating the release PR."
  Verify Steps: |-
    PLANNER fallback scaffold for "Restore branch artifact fallback for PR check". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Restore branch artifact fallback for PR check". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-05T01:39:19.371Z — VERIFY — ok

    By: REVIEWER

    Note: Branch artifact fallback regression test passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T01:39:18.738Z, excerpt_hash=sha256:8d6de77b24a7dab25a39f9b02fcef68a94a8896a4e170df63953180731dad068

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606050139-MD8NEE/blueprint/resolved-snapshot.json
    - old_digest: b611de77be52434444908a464d2d072dfb3f00d9ba7d99c0f662510566e086be
    - current_digest: b611de77be52434444908a464d2d072dfb3f00d9ba7d99c0f662510566e086be
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606050139-MD8NEE

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606050139-MD8NEE --agent CODER --slug restore-branch-artifact-fallback-for-pr-check --worktree
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
    - Observation: Changed pr check fallback guard and updated the regression test so a base checkout without local task README validates fresh branch PR artifacts. Verification: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --test-name-pattern 'branch artifacts'; prettier check for changed files.
      Impact: Integrators can validate PRs for branch-only tasks instead of getting false missing-artifact errors.
      Resolution: Push fix and resolve PR review thread.
id_source: "generated"
---
## Summary

Restore branch artifact fallback for PR check

Review found that pr check no longer reads branch PR artifacts when the base checkout lacks a local task README. Restore branch-only artifact fallback and cover it with a focused regression test.

## Scope

- In scope: Review found that pr check no longer reads branch PR artifacts when the base checkout lacks a local task README. Restore branch-only artifact fallback and cover it with a focused regression test.
- Out of scope: unrelated refactors not required for "Restore branch artifact fallback for PR check".

## Plan

Restore pr check branch artifact fallback when the base checkout lacks a local task README, update the regression test that previously expected missing local artifacts, and rerun the focused PR validation test before updating the release PR.

## Verify Steps

PLANNER fallback scaffold for "Restore branch artifact fallback for PR check". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Restore branch artifact fallback for PR check". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-05T01:39:19.371Z — VERIFY — ok

By: REVIEWER

Note: Branch artifact fallback regression test passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T01:39:18.738Z, excerpt_hash=sha256:8d6de77b24a7dab25a39f9b02fcef68a94a8896a4e170df63953180731dad068

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606050139-MD8NEE/blueprint/resolved-snapshot.json
- old_digest: b611de77be52434444908a464d2d072dfb3f00d9ba7d99c0f662510566e086be
- current_digest: b611de77be52434444908a464d2d072dfb3f00d9ba7d99c0f662510566e086be
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606050139-MD8NEE

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606050139-MD8NEE --agent CODER --slug restore-branch-artifact-fallback-for-pr-check --worktree
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

- Observation: Changed pr check fallback guard and updated the regression test so a base checkout without local task README validates fresh branch PR artifacts. Verification: bun test packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts --test-name-pattern 'branch artifacts'; prettier check for changed files.
  Impact: Integrators can validate PRs for branch-only tasks instead of getting false missing-artifact errors.
  Resolution: Push fix and resolve PR review thread.
