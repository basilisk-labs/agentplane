---
id: "202607092208-VQ05Q1"
title: "Split context pipeline hotspots for v0.6.22"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202607092207-MS2B7B"
tags:
  - "code"
  - "context"
  - "patch-0.6.22"
  - "refactor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run hotspots:check"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/context packages/agentplane/src/context"
plan_approval:
  state: "approved"
  updated_at: "2026-07-09T22:09:56.453Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-10T16:10:11.000Z"
  updated_by: "REVIEWER"
  note: "Verified context behavior, artifact contracts, hotspot reduction, type safety, CI contract, and full fast suite."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-10T16:10:24.538Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed."
  evaluated_sha: "a3de317575ac256bc196923d9d89d9a487cdb771"
  blueprint_digest: "ecb4a89dc49defb050ed30c1309caac3546a6af81d4edce5718efd2ab38022f8"
  evidence_refs:
    - ".agentplane/tasks/202607092208-VQ05Q1/README.md"
    - ".agentplane/tasks/202607092208-VQ05Q1/quality/20260710-161024538-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607092208-VQ05Q1/quality/20260710-161024538-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607092208-VQ05Q1/quality/20260710-161024538-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607092208-VQ05Q1/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings; module boundaries are cohesive and behavior remains covered by focused and full suites."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split context pipeline hotspots along existing domain boundaries while preserving CLI, artifact, graph, and extraction contracts."
events:
  -
    type: "status"
    at: "2026-07-10T15:55:48.087Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split context pipeline hotspots along existing domain boundaries while preserving CLI, artifact, graph, and extraction contracts."
  -
    type: "verify"
    at: "2026-07-10T16:10:11.000Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified context behavior, artifact contracts, hotspot reduction, type safety, CI contract, and full fast suite."
doc_version: 3
doc_updated_at: "2026-07-10T16:10:11.112Z"
doc_updated_by: "CODER"
description: "Decompose the oversized context dashboard, wiki reports, extraction writer, and maximum-assimilation validation modules along existing domain boundaries without changing CLI or artifact contracts."
sections:
  Summary: |-
    Split context pipeline hotspots for v0.6.22

    Decompose the oversized context dashboard, wiki reports, extraction writer, and maximum-assimilation validation modules along existing domain boundaries without changing CLI or artifact contracts.
  Scope: |-
    - In scope: Decompose the oversized context dashboard, wiki reports, extraction writer, and maximum-assimilation validation modules along existing domain boundaries without changing CLI or artifact contracts.
    - Out of scope: unrelated refactors not required for "Split context pipeline hotspots for v0.6.22".
  Plan: |-
    1. Re-measure the four context hotspots after the transactional writer task lands.
    2. Extract cohesive parsing, projection, report, and validation helpers without changing schemas or CLI output.
    3. Keep each production module below the configured hotspot warning where practical and never above the error threshold.
    4. Run focused context tests, hotspot checks, and typecheck.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/context packages/agentplane/src/context`; all context behavior and artifact-contract tests pass.
    2. Run `bun run hotspots:check`; touched context modules are removed from or materially reduced in the >400-line warning set, with none above 600 lines.
    3. Run `bun run typecheck`; it passes.
    4. Run `bun run ci:contract`; it passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-10T16:10:11.000Z — VERIFY — ok

    By: REVIEWER

    Note: Verified context behavior, artifact contracts, hotspot reduction, type safety, CI contract, and full fast suite.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T16:09:26.128Z, excerpt_hash=sha256:84f2801df74a42ef77d2c88ce4e2658d44e17420ff35482b688252b4e2de7bac

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092208-VQ05Q1-split-context-pipeline-hotspots-for-v0-6-22/.agentplane/tasks/202607092208-VQ05Q1/blueprint/resolved-snapshot.json
    - old_digest: ecb4a89dc49defb050ed30c1309caac3546a6af81d4edce5718efd2ab38022f8
    - current_digest: ecb4a89dc49defb050ed30c1309caac3546a6af81d4edce5718efd2ab38022f8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607092208-VQ05Q1

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607092208-VQ05Q1
    - diagnostic_command: agentplane pr check 202607092208-VQ05Q1
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Split dashboard HTTP facade, snapshot orchestration, wiki parsing/linking, and graph assembly into focused modules while preserving buildContextDashboardSnapshot and cmdContextDashboard exports.
    - Split wiki link analysis from generated report rendering; retained link-index, orphan-report, state, and Markdown report contracts.
    - Extracted extraction-quality derivation and ontology/topology validation into focused helpers without changing persisted row shapes or validation messages.
    - Hotspot warning count decreased from 18 to 14; all touched runtime modules are below 400 lines (largest: extraction-writer.ts at 366).
    - Verification passed: context Vitest 23 files/104 tests, hotspots:check, typecheck, ci:contract, and full test:fast.

    - Observation: Four context runtime hotspots were decomposed into focused modules with unchanged public exports and persisted artifact formats.
      Impact: Runtime hotspot warning count decreased from 18 to 14; all touched modules are below 400 lines.
      Resolution: Context tests 23/104, hotspots:check, typecheck, ci:contract, and test:fast passed.
id_source: "generated"
---
## Summary

Split context pipeline hotspots for v0.6.22

Decompose the oversized context dashboard, wiki reports, extraction writer, and maximum-assimilation validation modules along existing domain boundaries without changing CLI or artifact contracts.

## Scope

- In scope: Decompose the oversized context dashboard, wiki reports, extraction writer, and maximum-assimilation validation modules along existing domain boundaries without changing CLI or artifact contracts.
- Out of scope: unrelated refactors not required for "Split context pipeline hotspots for v0.6.22".

## Plan

1. Re-measure the four context hotspots after the transactional writer task lands.
2. Extract cohesive parsing, projection, report, and validation helpers without changing schemas or CLI output.
3. Keep each production module below the configured hotspot warning where practical and never above the error threshold.
4. Run focused context tests, hotspot checks, and typecheck.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/context packages/agentplane/src/context`; all context behavior and artifact-contract tests pass.
2. Run `bun run hotspots:check`; touched context modules are removed from or materially reduced in the >400-line warning set, with none above 600 lines.
3. Run `bun run typecheck`; it passes.
4. Run `bun run ci:contract`; it passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-10T16:10:11.000Z — VERIFY — ok

By: REVIEWER

Note: Verified context behavior, artifact contracts, hotspot reduction, type safety, CI contract, and full fast suite.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T16:09:26.128Z, excerpt_hash=sha256:84f2801df74a42ef77d2c88ce4e2658d44e17420ff35482b688252b4e2de7bac

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092208-VQ05Q1-split-context-pipeline-hotspots-for-v0-6-22/.agentplane/tasks/202607092208-VQ05Q1/blueprint/resolved-snapshot.json
- old_digest: ecb4a89dc49defb050ed30c1309caac3546a6af81d4edce5718efd2ab38022f8
- current_digest: ecb4a89dc49defb050ed30c1309caac3546a6af81d4edce5718efd2ab38022f8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607092208-VQ05Q1

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607092208-VQ05Q1
- diagnostic_command: agentplane pr check 202607092208-VQ05Q1
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

- Split dashboard HTTP facade, snapshot orchestration, wiki parsing/linking, and graph assembly into focused modules while preserving buildContextDashboardSnapshot and cmdContextDashboard exports.
- Split wiki link analysis from generated report rendering; retained link-index, orphan-report, state, and Markdown report contracts.
- Extracted extraction-quality derivation and ontology/topology validation into focused helpers without changing persisted row shapes or validation messages.
- Hotspot warning count decreased from 18 to 14; all touched runtime modules are below 400 lines (largest: extraction-writer.ts at 366).
- Verification passed: context Vitest 23 files/104 tests, hotspots:check, typecheck, ci:contract, and full test:fast.

- Observation: Four context runtime hotspots were decomposed into focused modules with unchanged public exports and persisted artifact formats.
  Impact: Runtime hotspot warning count decreased from 18 to 14; all touched modules are below 400 lines.
  Resolution: Context tests 23/104, hotspots:check, typecheck, ci:contract, and test:fast passed.
