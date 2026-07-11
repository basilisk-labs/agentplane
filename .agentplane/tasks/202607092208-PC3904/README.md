---
id: "202607092208-PC3904"
title: "Decompose oversized test suites for v0.6.22"
result_summary: "Split the oversized doc-write suite into two focused files and reduced the oversized baseline to 10 files / 11424 lines."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "patch-0.6.22"
  - "refactor"
  - "tests"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run coverage:thresholds:check"
  - "bun run hotspots:check"
  - "bun run test:fast"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-09T22:09:57.688Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-11T12:35:09.544Z"
  updated_by: "REVIEWER"
  note: "All 16 cases are preserved across two sub-1000-line files; oversized baseline is 10/11424 and focused, coverage, contract, type, and full 364/2157 checks pass."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-11T12:35:11.294Z"
  updated_by: "EVALUATOR"
  note: "The test-only split preserves assertions and routing while tightening the oversized-suite budget."
  evaluated_sha: "074a5fb769b38408171a1a74fa4258fdc2983629"
  blueprint_digest: "3c44ab7cdcc64a64d29e38365780c53a1f390e7255d2a20dd26386449e039315"
  evidence_refs:
    - ".agentplane/tasks/202607092208-PC3904/README.md"
    - ".agentplane/tasks/202607092208-PC3904/quality/20260711-123511294-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607092208-PC3904/quality/20260711-123511294-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607092208-PC3904/quality/20260711-123511294-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607092208-PC3904/blueprint/resolved-snapshot.json"
    - "074a5fb769b38408171a1a74fa4258fdc2983629"
    - "focused:2-files-16-tests;full:364-files-2157-tests"
    - "oversized:10-files-11424-lines;max-file:1281"
    - "typecheck,coverage,ci-contract:pass"
  findings:
    - "No blocking defects found; no cases were lost and the baseline decreases by one file and 1014 lines."
commit:
  hash: "074a5fb769b38408171a1a74fa4258fdc2983629"
  message: "🧪 PC3904 task: split oversized doc-write tests"
comments:
  -
    author: "CODER"
    body: "Start: split one oversized suite along existing describe boundaries without changing cases or assertions."
  -
    author: "INTEGRATOR"
    body: "Verified: test cases are preserved and all local/hosted checks pass."
events:
  -
    type: "status"
    at: "2026-07-11T12:30:11.316Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split one oversized suite along existing describe boundaries without changing cases or assertions."
  -
    type: "verify"
    at: "2026-07-11T12:35:09.544Z"
    author: "REVIEWER"
    state: "ok"
    note: "All 16 cases are preserved across two sub-1000-line files; oversized baseline is 10/11424 and focused, coverage, contract, type, and full 364/2157 checks pass."
  -
    type: "status"
    at: "2026-07-11T12:42:42.836Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: test cases are preserved and all local/hosted checks pass."
doc_version: 3
doc_updated_at: "2026-07-11T12:42:42.837Z"
doc_updated_by: "INTEGRATOR"
description: "Split the 11 test files above 1000 lines by behavior and fixture boundary, centralize only stable helpers, and reduce the oversized-test baseline without weakening assertions or coverage."
sections:
  Summary: |-
    Decompose oversized test suites for v0.6.22

    Split the 11 test files above 1000 lines by behavior and fixture boundary, centralize only stable helpers, and reduce the oversized-test baseline without weakening assertions or coverage.
  Scope: |-
    - In scope: Split the 11 test files above 1000 lines by behavior and fixture boundary, centralize only stable helpers, and reduce the oversized-test baseline without weakening assertions or coverage.
    - Out of scope: unrelated refactors not required for "Decompose oversized test suites for v0.6.22".
  Plan: |-
    1. Group the 11 oversized suites by behavior and fixture boundary.
    2. Split files without deleting assertions; extract helpers only when stable across suites.
    3. Update the oversized-test baseline downward and preserve coverage thresholds.
    4. Run fast tests, coverage, hotspots, and typecheck.
  Verify Steps: |-
    1. Run `bun run hotspots:check`; the >1000-line test baseline drops below 11 files and 12438 total lines, with no file above 1300 lines.
    2. Run `bun run test:fast`; all suites pass with no lost test cases attributable to the split.
    3. Run `bun run coverage:thresholds:check`; thresholds do not regress.
    4. Run `bun run typecheck` and `bun run ci:contract`; both pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-11T12:35:09.544Z — VERIFY — ok

    By: REVIEWER

    Note: All 16 cases are preserved across two sub-1000-line files; oversized baseline is 10/11424 and focused, coverage, contract, type, and full 364/2157 checks pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-11T12:34:53.782Z, excerpt_hash=sha256:e7fb19f5121d492b1afdd37f4185872d75ba32c449e9227fed0f833307fc8396

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092208-PC3904-decompose-oversized-test-suites-for-v0-6-22/.agentplane/tasks/202607092208-PC3904/blueprint/resolved-snapshot.json
    - old_digest: 3c44ab7cdcc64a64d29e38365780c53a1f390e7255d2a20dd26386449e039315
    - current_digest: 3c44ab7cdcc64a64d29e38365780c53a1f390e7255d2a20dd26386449e039315
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607092208-PC3904

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607092208-PC3904
    - diagnostic_command: agentplane pr check 202607092208-PC3904
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "Split run-cli.core.tasks.doc-write.test.ts at an existing test boundary into 557-line content/update coverage and 476-line validation/error coverage. All 16 original cases remain and pass across the two files. The oversized-test baseline falls from 11 files / 12438 current lines to 10 files / 11424 lines; no test exceeds 1300 lines and both split files are below 1000. Verification passed: focused 2 files / 16 tests, hotspots:check, typecheck, coverage thresholds, ci:contract, and full 364 files / 2157 tests."
id_source: "generated"
---
## Summary

Decompose oversized test suites for v0.6.22

Split the 11 test files above 1000 lines by behavior and fixture boundary, centralize only stable helpers, and reduce the oversized-test baseline without weakening assertions or coverage.

## Scope

- In scope: Split the 11 test files above 1000 lines by behavior and fixture boundary, centralize only stable helpers, and reduce the oversized-test baseline without weakening assertions or coverage.
- Out of scope: unrelated refactors not required for "Decompose oversized test suites for v0.6.22".

## Plan

1. Group the 11 oversized suites by behavior and fixture boundary.
2. Split files without deleting assertions; extract helpers only when stable across suites.
3. Update the oversized-test baseline downward and preserve coverage thresholds.
4. Run fast tests, coverage, hotspots, and typecheck.

## Verify Steps

1. Run `bun run hotspots:check`; the >1000-line test baseline drops below 11 files and 12438 total lines, with no file above 1300 lines.
2. Run `bun run test:fast`; all suites pass with no lost test cases attributable to the split.
3. Run `bun run coverage:thresholds:check`; thresholds do not regress.
4. Run `bun run typecheck` and `bun run ci:contract`; both pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-11T12:35:09.544Z — VERIFY — ok

By: REVIEWER

Note: All 16 cases are preserved across two sub-1000-line files; oversized baseline is 10/11424 and focused, coverage, contract, type, and full 364/2157 checks pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-11T12:34:53.782Z, excerpt_hash=sha256:e7fb19f5121d492b1afdd37f4185872d75ba32c449e9227fed0f833307fc8396

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092208-PC3904-decompose-oversized-test-suites-for-v0-6-22/.agentplane/tasks/202607092208-PC3904/blueprint/resolved-snapshot.json
- old_digest: 3c44ab7cdcc64a64d29e38365780c53a1f390e7255d2a20dd26386449e039315
- current_digest: 3c44ab7cdcc64a64d29e38365780c53a1f390e7255d2a20dd26386449e039315
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607092208-PC3904

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607092208-PC3904
- diagnostic_command: agentplane pr check 202607092208-PC3904
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

Split run-cli.core.tasks.doc-write.test.ts at an existing test boundary into 557-line content/update coverage and 476-line validation/error coverage. All 16 original cases remain and pass across the two files. The oversized-test baseline falls from 11 files / 12438 current lines to 10 files / 11424 lines; no test exceeds 1300 lines and both split files are below 1000. Verification passed: focused 2 files / 16 tests, hotspots:check, typecheck, coverage thresholds, ci:contract, and full 364 files / 2157 tests.
