---
id: "202606050431-TKMZWV"
title: "Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-only commits"
result_summary: "Merged via PR #4465."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "github-issue"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-05T04:32:22.916Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-06T16:41:48.030Z"
  updated_by: "CODER"
  note: "Verified: fixed direct closeout quality review target selection for existing task-artifact-only commit metadata. Commands: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts; git diff --check; node .agentplane/policy/check-routing.mjs."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-06T16:43:20.798Z"
  updated_by: "EVALUATOR"
  note: "Reviewed the focused finish closeout diff and regression evidence for issue #4451."
  evaluated_sha: "0e491ed63c0984063d4e7fd4dc6aa467543d603b"
  blueprint_digest: "9574f5a3ad62e5b13055839429cae1cb6446d9ed9caf4505903ef2f8cb4f1442"
  evidence_refs:
    - ".agentplane/tasks/202606050431-TKMZWV/README.md"
    - ".agentplane/tasks/202606050431-TKMZWV/quality/20260606-164320798-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606050431-TKMZWV/quality/20260606-164320798-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606050431-TKMZWV/quality/20260606-164320798-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606050431-TKMZWV/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/task/finish-execute-commit.ts"
    - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
    - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
    - "git diff --check"
    - "node .agentplane/policy/check-routing.mjs"
  findings:
    - "resolveImplementationCommitInfo now normalizes existing task.commit artifact-only metadata through quality_review.evaluated_sha when isTaskLocalOnlyAdvance proves the tail is task-local."
    - "Regression coverage exercises both explicit --commit artifact tails and existing task commit artifact tails without weakening stale-review rejection for non-task-local changes."
commit:
  hash: "70588b44881f46ba06fa6416e0a0bfca5d6034bd"
  message: "Fix direct closeout artifact-only quality review target"
comments:
  -
    author: "CODER"
    body: "Start: investigating upstream issue #4451 in the dedicated branch_pr worktree and preparing the bounded Codex runner handoff."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4465 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-06-05T04:33:32.696Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: investigating upstream issue #4451 in the dedicated branch_pr worktree and preparing the bounded Codex runner handoff."
  -
    type: "verify"
    at: "2026-06-06T16:41:48.030Z"
    author: "CODER"
    state: "ok"
    note: "Verified: fixed direct closeout quality review target selection for existing task-artifact-only commit metadata. Commands: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts; git diff --check; node .agentplane/policy/check-routing.mjs."
  -
    type: "status"
    at: "2026-06-06T16:54:19.050Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4465 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-06-06T16:54:19.055Z"
doc_updated_by: "INTEGRATOR"
description: "Resolve https://github.com/basilisk-labs/agentplane/issues/4451"
sections:
  Summary: |-
    Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-only commits

    Resolve https://github.com/basilisk-labs/agentplane/issues/4451
  Scope: |-
    - In scope: Resolve https://github.com/basilisk-labs/agentplane/issues/4451.
    - Out of scope: unrelated refactors not required for "Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-only commits".
  Plan: |-
    1. Reproduce the stale `quality_review.evaluated_sha` closeout loop described in upstream issue #4451 and identify which finish/task-complete validation still binds to outdated evaluation state after task-artifact-only commits.
    2. Implement the smallest route-safe fix so artifact-only follow-up commits do not force a fresh evaluator run when prior evaluation evidence is still valid for the task closeout path.
    3. Verify with targeted reproduction coverage and the required policy checks, then prepare branch/PR evidence and upstream closeout notes only if the fix is validated.
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-only commits". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-only commits". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-06T16:41:48.030Z — VERIFY — ok

    By: CODER

    Note: Verified: fixed direct closeout quality review target selection for existing task-artifact-only commit metadata. Commands: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts; git diff --check; node .agentplane/policy/check-routing.mjs.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T04:33:32.696Z, excerpt_hash=sha256:ffd25d481a7f9d3f97cacaf135e78dbd8c18b1d2f457b10ada75f95c7d59fdb4

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606050431-TKMZWV/.agentplane/tasks/202606050431-TKMZWV/blueprint/resolved-snapshot.json
    - old_digest: 9574f5a3ad62e5b13055839429cae1cb6446d9ed9caf4505903ef2f8cb4f1442
    - current_digest: 9574f5a3ad62e5b13055839429cae1cb6446d9ed9caf4505903ef2f8cb4f1442
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606050431-TKMZWV

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606050431-TKMZWV
    - diagnostic_command: agentplane pr check 202606050431-TKMZWV
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-only commits

Resolve https://github.com/basilisk-labs/agentplane/issues/4451

## Scope

- In scope: Resolve https://github.com/basilisk-labs/agentplane/issues/4451.
- Out of scope: unrelated refactors not required for "Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-only commits".

## Plan

1. Reproduce the stale `quality_review.evaluated_sha` closeout loop described in upstream issue #4451 and identify which finish/task-complete validation still binds to outdated evaluation state after task-artifact-only commits.
2. Implement the smallest route-safe fix so artifact-only follow-up commits do not force a fresh evaluator run when prior evaluation evidence is still valid for the task closeout path.
3. Verify with targeted reproduction coverage and the required policy checks, then prepare branch/PR evidence and upstream closeout notes only if the fix is validated.

## Verify Steps

PLANNER fallback scaffold for "Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-only commits". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix upstream issue #4451: finish/task complete can loop on stale quality_review.evaluated_sha after task-artifact-only commits". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-06T16:41:48.030Z — VERIFY — ok

By: CODER

Note: Verified: fixed direct closeout quality review target selection for existing task-artifact-only commit metadata. Commands: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts; git diff --check; node .agentplane/policy/check-routing.mjs.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T04:33:32.696Z, excerpt_hash=sha256:ffd25d481a7f9d3f97cacaf135e78dbd8c18b1d2f457b10ada75f95c7d59fdb4

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606050431-TKMZWV/.agentplane/tasks/202606050431-TKMZWV/blueprint/resolved-snapshot.json
- old_digest: 9574f5a3ad62e5b13055839429cae1cb6446d9ed9caf4505903ef2f8cb4f1442
- current_digest: 9574f5a3ad62e5b13055839429cae1cb6446d9ed9caf4505903ef2f8cb4f1442
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606050431-TKMZWV

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606050431-TKMZWV
- diagnostic_command: agentplane pr check 202606050431-TKMZWV
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
