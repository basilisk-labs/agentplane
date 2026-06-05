---
id: "202606050035-YEAKJF"
title: "Format TypeScript build wrapper"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cognitive-load"
  - "format"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-05T00:36:06.397Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-05T00:36:20.254Z"
  updated_by: "CODER"
  note: "Formatted build wrappers; focused Prettier, eslint, typecheck, and build checks passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-05T00:36:21.060Z"
  updated_by: "EVALUATOR"
  note: "The TypeScript build wrapper is formatted and focused build checks still pass."
  evaluated_sha: "7c1031520434708ca061e79746e77c36ea07472a"
  blueprint_digest: "ea2c1295a3612cd026e3ddce7db7a61026037ea80fafb28befe5692d23e49c05"
  evidence_refs:
    - ".agentplane/tasks/202606050035-YEAKJF/README.md"
    - ".agentplane/tasks/202606050035-YEAKJF/quality/20260605-003621060-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606050035-YEAKJF/quality/20260605-003621060-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606050035-YEAKJF/quality/20260605-003621060-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606050035-YEAKJF/blueprint/resolved-snapshot.json"
    - "scripts/checks/run-typescript-build.mjs"
    - "build-wrapper-format-check"
  findings:
    - "Prettier check, eslint, typecheck, and root build passed under the release Node 24 shell."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: format build wrappers after prepublish format gate failure."
events:
  -
    type: "status"
    at: "2026-06-05T00:36:06.962Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: format build wrappers after prepublish format gate failure."
  -
    type: "verify"
    at: "2026-06-05T00:36:20.254Z"
    author: "CODER"
    state: "ok"
    note: "Formatted build wrappers; focused Prettier, eslint, typecheck, and build checks passed."
doc_version: 3
doc_updated_at: "2026-06-05T00:36:20.353Z"
doc_updated_by: "CODER"
description: "After the TypeScript/tsup build wrapper fix, final release prepublish failed format:check on scripts/checks/run-typescript-build.mjs. Format the wrapper, run focused format/lint/build checks, and continue release validation."
sections:
  Summary: |-
    Format TypeScript build wrapper

    After the TypeScript/tsup build wrapper fix, final release prepublish failed format:check on scripts/checks/run-typescript-build.mjs. Format the wrapper, run focused format/lint/build checks, and continue release validation.
  Scope: |-
    - In scope: After the TypeScript/tsup build wrapper fix, final release prepublish failed format:check on scripts/checks/run-typescript-build.mjs. Format the wrapper, run focused format/lint/build checks, and continue release validation.
    - Out of scope: unrelated refactors not required for "Format TypeScript build wrapper".
  Plan: "1. Format run-typescript-build.mjs and run-tsup-build.mjs with Prettier. 2. Run focused Prettier check, eslint, typecheck, and build under the release Node 24 shell. 3. Record verification and evaluator evidence, then retry full release prepublish."
  Verify Steps: |-
    PLANNER fallback scaffold for "Format TypeScript build wrapper". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Format TypeScript build wrapper". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-05T00:36:20.254Z — VERIFY — ok

    By: CODER

    Note: Formatted build wrappers; focused Prettier, eslint, typecheck, and build checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T00:36:06.962Z, excerpt_hash=sha256:bbecd2fecf39f7faa85e4424e2c0125996e0775c503f5988012da043dac9d29e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606050035-YEAKJF/blueprint/resolved-snapshot.json
    - old_digest: ea2c1295a3612cd026e3ddce7db7a61026037ea80fafb28befe5692d23e49c05
    - current_digest: ea2c1295a3612cd026e3ddce7db7a61026037ea80fafb28befe5692d23e49c05
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606050035-YEAKJF

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606050035-YEAKJF --agent CODER --slug format-typescript-build-wrapper --worktree
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

Format TypeScript build wrapper

After the TypeScript/tsup build wrapper fix, final release prepublish failed format:check on scripts/checks/run-typescript-build.mjs. Format the wrapper, run focused format/lint/build checks, and continue release validation.

## Scope

- In scope: After the TypeScript/tsup build wrapper fix, final release prepublish failed format:check on scripts/checks/run-typescript-build.mjs. Format the wrapper, run focused format/lint/build checks, and continue release validation.
- Out of scope: unrelated refactors not required for "Format TypeScript build wrapper".

## Plan

1. Format run-typescript-build.mjs and run-tsup-build.mjs with Prettier. 2. Run focused Prettier check, eslint, typecheck, and build under the release Node 24 shell. 3. Record verification and evaluator evidence, then retry full release prepublish.

## Verify Steps

PLANNER fallback scaffold for "Format TypeScript build wrapper". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Format TypeScript build wrapper". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-05T00:36:20.254Z — VERIFY — ok

By: CODER

Note: Formatted build wrappers; focused Prettier, eslint, typecheck, and build checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T00:36:06.962Z, excerpt_hash=sha256:bbecd2fecf39f7faa85e4424e2c0125996e0775c503f5988012da043dac9d29e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606050035-YEAKJF/blueprint/resolved-snapshot.json
- old_digest: ea2c1295a3612cd026e3ddce7db7a61026037ea80fafb28befe5692d23e49c05
- current_digest: ea2c1295a3612cd026e3ddce7db7a61026037ea80fafb28befe5692d23e49c05
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606050035-YEAKJF

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606050035-YEAKJF --agent CODER --slug format-typescript-build-wrapper --worktree
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
