---
id: "202606042352-WY0RTM"
title: "Restore stale review metadata PR check"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "pr-check"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-04T23:52:22.608Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-04T23:53:38.372Z"
  updated_by: "CODER"
  note: "Verified: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts packages/agentplane/src/commands/pr/internal/freshness.test.ts passed; npm run typecheck passed in packages/agentplane."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-04T23:55:11.866Z"
  updated_by: "EVALUATOR"
  note: "Stale review metadata is rejected again while live-head missing-head artifacts remain supported."
  evaluated_sha: "e3bb2b4b9e0e43db38cf0f18184ea9bccc747a26"
  blueprint_digest: "37cdd5ff693d13ee76a8e29183c9c681e2b03f0b4159434a88906a31825ae990"
  evidence_refs:
    - ".agentplane/tasks/202606042352-WY0RTM/README.md"
    - ".agentplane/tasks/202606042352-WY0RTM/quality/20260604-235511866-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606042352-WY0RTM/quality/20260604-235511866-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606042352-WY0RTM/quality/20260604-235511866-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606042352-WY0RTM/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/pr/internal/freshness.ts"
    - "packages/agentplane/src/commands/pr/internal/freshness.test.ts"
    - "pr-notes-verify-freshness-tests"
  findings:
    - "Targeted PR notes and freshness tests passed; typecheck passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: restore stale review metadata pr check behavior."
events:
  -
    type: "status"
    at: "2026-06-04T23:52:23.185Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: restore stale review metadata pr check behavior."
  -
    type: "verify"
    at: "2026-06-04T23:53:38.372Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts packages/agentplane/src/commands/pr/internal/freshness.test.ts passed; npm run typecheck passed in packages/agentplane."
doc_version: 3
doc_updated_at: "2026-06-04T23:53:38.510Z"
doc_updated_by: "CODER"
description: "Fix pr check so stale review metadata relative to branch diffstat is still rejected while live-head artifact handling remains aligned."
sections:
  Summary: |-
    Restore stale review metadata PR check

    Fix pr check so stale review metadata relative to branch diffstat is still rejected while live-head artifact handling remains aligned.
  Scope: |-
    - In scope: Fix pr check so stale review metadata relative to branch diffstat is still rejected while live-head artifact handling remains aligned.
    - Out of scope: unrelated refactors not required for "Restore stale review metadata PR check".
  Plan: "Fix PR artifact freshness so missing meta.head_sha can be treated as live-head only when review metadata itself is fresh; stale review metadata relative to branch diffstat must still fail pr check. Verify with packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts and the freshness unit tests."
  Verify Steps: |-
    PLANNER fallback scaffold for "Restore stale review metadata PR check". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Restore stale review metadata PR check". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-04T23:53:38.372Z — VERIFY — ok

    By: CODER

    Note: Verified: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts packages/agentplane/src/commands/pr/internal/freshness.test.ts passed; npm run typecheck passed in packages/agentplane.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T23:52:23.185Z, excerpt_hash=sha256:9b9b34dbdcb8e57b654af407255d675d968727865894df1d01b6521ad285cac3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606042352-WY0RTM/blueprint/resolved-snapshot.json
    - old_digest: 37cdd5ff693d13ee76a8e29183c9c681e2b03f0b4159434a88906a31825ae990
    - current_digest: 37cdd5ff693d13ee76a8e29183c9c681e2b03f0b4159434a88906a31825ae990
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606042352-WY0RTM

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606042352-WY0RTM --agent CODER --slug restore-stale-review-metadata-pr-check --worktree
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

Restore stale review metadata PR check

Fix pr check so stale review metadata relative to branch diffstat is still rejected while live-head artifact handling remains aligned.

## Scope

- In scope: Fix pr check so stale review metadata relative to branch diffstat is still rejected while live-head artifact handling remains aligned.
- Out of scope: unrelated refactors not required for "Restore stale review metadata PR check".

## Plan

Fix PR artifact freshness so missing meta.head_sha can be treated as live-head only when review metadata itself is fresh; stale review metadata relative to branch diffstat must still fail pr check. Verify with packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts and the freshness unit tests.

## Verify Steps

PLANNER fallback scaffold for "Restore stale review metadata PR check". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Restore stale review metadata PR check". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-04T23:53:38.372Z — VERIFY — ok

By: CODER

Note: Verified: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr-notes-verify.test.ts packages/agentplane/src/commands/pr/internal/freshness.test.ts passed; npm run typecheck passed in packages/agentplane.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T23:52:23.185Z, excerpt_hash=sha256:9b9b34dbdcb8e57b654af407255d675d968727865894df1d01b6521ad285cac3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606042352-WY0RTM/blueprint/resolved-snapshot.json
- old_digest: 37cdd5ff693d13ee76a8e29183c9c681e2b03f0b4159434a88906a31825ae990
- current_digest: 37cdd5ff693d13ee76a8e29183c9c681e2b03f0b4159434a88906a31825ae990
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606042352-WY0RTM

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606042352-WY0RTM --agent CODER --slug restore-stale-review-metadata-pr-check --worktree
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
