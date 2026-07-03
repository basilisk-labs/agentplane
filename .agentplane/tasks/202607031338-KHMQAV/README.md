---
id: "202607031338-KHMQAV"
title: "Add extraction quality signals for context assimilation"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-03T13:38:25.266Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-03T13:46:24.366Z"
  updated_by: "CODER"
  note: "Extraction quality report implemented and focused context checks passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-03T13:56:40.537Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed after lint fix."
  evaluated_sha: "c71e2c60c805700429defa41df056a0351227de8"
  blueprint_digest: "9e9c51bde24185e0555b669e64d7e290bbf443efe95ba5e5778309a42586cb93"
  evidence_refs:
    - ".agentplane/tasks/202607031338-KHMQAV/README.md"
    - ".agentplane/tasks/202607031338-KHMQAV/quality/20260703-135640537-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607031338-KHMQAV/quality/20260703-135640537-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607031338-KHMQAV/quality/20260703-135640537-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607031338-KHMQAV/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/context/extraction-writer.ts"
    - "packages/agentplane/src/commands/context/extraction-apply.unit.test.ts"
    - "bunx eslint packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/commands/context/extraction.ts packages/agentplane/src/context/extraction-writer.ts"
    - "bunx vitest run packages/agentplane/src/commands/context/extraction-apply.unit.test.ts"
  findings:
    - "No blocking findings."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement extraction quality signals in the existing context extraction apply flow with focused unit coverage."
events:
  -
    type: "status"
    at: "2026-07-03T13:38:55.767Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement extraction quality signals in the existing context extraction apply flow with focused unit coverage."
  -
    type: "verify"
    at: "2026-07-03T13:46:24.366Z"
    author: "CODER"
    state: "ok"
    note: "Extraction quality report implemented and focused context checks passed."
doc_version: 3
doc_updated_at: "2026-07-03T13:46:24.880Z"
doc_updated_by: "CODER"
description: "Add a derived extraction quality report that flags over-fragmentation, unsupported summaries, and risky normalization before wiki publication."
sections:
  Summary: |-
    Add extraction quality signals for context assimilation

    Add a derived extraction quality report that flags over-fragmentation, unsupported summaries, and risky normalization before wiki publication.
  Scope: |-
    - In scope: Add a derived extraction quality report that flags over-fragmentation, unsupported summaries, and risky normalization before wiki publication.
    - Out of scope: unrelated refactors not required for "Add extraction quality signals for context assimilation".
  Plan: |-
    1. Inspect context extraction apply artifact flow and existing tests.
    2. Add an extraction quality report under .agentplane/context/derived/reports that flags over-fragmentation, unsupported summaries, and risky normalization from existing extracted rows.
    3. Add focused unit coverage for the new report and ensure existing extraction apply tests still pass.
    4. Run focused context tests, typecheck/routing checks, record verification, publish PR, and integrate into main.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-03T13:46:24.366Z — VERIFY — ok

    By: CODER

    Note: Extraction quality report implemented and focused context checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-03T13:38:55.767Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    Command: bun run format:changed; Result: pass; Evidence: all changed files use Prettier style. Scope: extraction writer, extraction command, extraction apply test.
    Command: bunx vitest run packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/context/extraction-writer.test.ts packages/agentplane/src/context/coverage-validation.test.ts packages/agentplane/src/commands/context/wiki-reports.unit.test.ts; Result: pass; Evidence: 4 files, 17 tests passed. Scope: context extraction/report interactions.
    Command: bun run typecheck; Result: pass; Evidence: TypeScript build exited 0. Scope: repository TypeScript contracts.
    Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing.
    Command: agentplane doctor; Result: pass; Evidence: doctor OK with only pre-existing DONE-task commit-hash warnings. Scope: workspace health.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607031338-KHMQAV-add-extraction-quality-signals-for-context-assim/.agentplane/tasks/202607031338-KHMQAV/blueprint/resolved-snapshot.json
    - old_digest: 9e9c51bde24185e0555b669e64d7e290bbf443efe95ba5e5778309a42586cb93
    - current_digest: 9e9c51bde24185e0555b669e64d7e290bbf443efe95ba5e5778309a42586cb93
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607031338-KHMQAV

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607031338-KHMQAV
    - diagnostic_command: agentplane pr check 202607031338-KHMQAV
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

Add extraction quality signals for context assimilation

Add a derived extraction quality report that flags over-fragmentation, unsupported summaries, and risky normalization before wiki publication.

## Scope

- In scope: Add a derived extraction quality report that flags over-fragmentation, unsupported summaries, and risky normalization before wiki publication.
- Out of scope: unrelated refactors not required for "Add extraction quality signals for context assimilation".

## Plan

1. Inspect context extraction apply artifact flow and existing tests.
2. Add an extraction quality report under .agentplane/context/derived/reports that flags over-fragmentation, unsupported summaries, and risky normalization from existing extracted rows.
3. Add focused unit coverage for the new report and ensure existing extraction apply tests still pass.
4. Run focused context tests, typecheck/routing checks, record verification, publish PR, and integrate into main.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-03T13:46:24.366Z — VERIFY — ok

By: CODER

Note: Extraction quality report implemented and focused context checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-03T13:38:55.767Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

Command: bun run format:changed; Result: pass; Evidence: all changed files use Prettier style. Scope: extraction writer, extraction command, extraction apply test.
Command: bunx vitest run packages/agentplane/src/commands/context/extraction-apply.unit.test.ts packages/agentplane/src/context/extraction-writer.test.ts packages/agentplane/src/context/coverage-validation.test.ts packages/agentplane/src/commands/context/wiki-reports.unit.test.ts; Result: pass; Evidence: 4 files, 17 tests passed. Scope: context extraction/report interactions.
Command: bun run typecheck; Result: pass; Evidence: TypeScript build exited 0. Scope: repository TypeScript contracts.
Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Scope: policy routing.
Command: agentplane doctor; Result: pass; Evidence: doctor OK with only pre-existing DONE-task commit-hash warnings. Scope: workspace health.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607031338-KHMQAV-add-extraction-quality-signals-for-context-assim/.agentplane/tasks/202607031338-KHMQAV/blueprint/resolved-snapshot.json
- old_digest: 9e9c51bde24185e0555b669e64d7e290bbf443efe95ba5e5778309a42586cb93
- current_digest: 9e9c51bde24185e0555b669e64d7e290bbf443efe95ba5e5778309a42586cb93
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607031338-KHMQAV

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607031338-KHMQAV
- diagnostic_command: agentplane pr check 202607031338-KHMQAV
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
