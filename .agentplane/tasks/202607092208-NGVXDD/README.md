---
id: "202607092208-NGVXDD"
title: "Reduce the Knip baseline for v0.6.22"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "patch-0.6.22"
  - "quality"
  - "refactor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run knip:check"
  - "bun run knip:report"
  - "bun run test:fast"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-09T22:09:57.378Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-11T12:13:46.927Z"
  updated_by: "REVIEWER"
  note: "Knip debt decreases from 574 to 555 with no ignore expansion. Critical-init verification identified and preserved the path-launched CLI runner; all focused, critical, contract, type, lint, and full 364/2157 tests pass."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-11T12:13:48.910Z"
  updated_by: "EVALUATOR"
  note: "The revised reduction preserves the dynamically launched CLI runner and removes only proven dead or unnecessary export surface."
  evaluated_sha: "b0eefc7a252b9f9cdf7c5b6ffed65b8949617dad"
  blueprint_digest: "7c05baa832e06acc612f0dcf7a01d5f9f46c89f777222a2c6bebfcaaa139bac7"
  evidence_refs:
    - ".agentplane/tasks/202607092208-NGVXDD/README.md"
    - ".agentplane/tasks/202607092208-NGVXDD/quality/20260711-121348910-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607092208-NGVXDD/quality/20260711-121348910-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607092208-NGVXDD/quality/20260711-121348910-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607092208-NGVXDD/blueprint/resolved-snapshot.json"
    - "b0eefc7a252b9f9cdf7c5b6ffed65b8949617dad"
    - ".agentplane/tasks/202607092208-NGVXDD/knip-classification.md"
    - "knip:555/555;critical-cli:5-files-14-tests;full:364-files-2157-tests"
    - "typecheck,lint,ci-contract:pass"
  findings:
    - "No blocking defects found; 19 unused exports were eliminated, the runner false positive is explicitly classified, and all gates pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: classify and remove safe Knip findings, then lower the accepted baseline without broader ignores."
events:
  -
    type: "status"
    at: "2026-07-11T12:02:25.721Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: classify and remove safe Knip findings, then lower the accepted baseline without broader ignores."
  -
    type: "verify"
    at: "2026-07-11T12:10:11.068Z"
    author: "REVIEWER"
    state: "ok"
    note: "Knip debt decreases from 574 to 554 with no ignore expansion; each remaining entry is classified and all declared checks pass, including full 364/2157 tests."
  -
    type: "verify"
    at: "2026-07-11T12:13:46.927Z"
    author: "REVIEWER"
    state: "ok"
    note: "Knip debt decreases from 574 to 555 with no ignore expansion. Critical-init verification identified and preserved the path-launched CLI runner; all focused, critical, contract, type, lint, and full 364/2157 tests pass."
doc_version: 3
doc_updated_at: "2026-07-11T12:13:47.144Z"
doc_updated_by: "CODER"
description: "Classify current Knip findings into public API, intentional framework entry points, and removable dead code; delete or export correctly so the accepted baseline shrinks materially without hiding new debt."
sections:
  Summary: |-
    Reduce the Knip baseline for v0.6.22

    Classify current Knip findings into public API, intentional framework entry points, and removable dead code; delete or export correctly so the accepted baseline shrinks materially without hiding new debt.
  Scope: |-
    - In scope: Classify current Knip findings into public API, intentional framework entry points, and removable dead code; delete or export correctly so the accepted baseline shrinks materially without hiding new debt.
    - Out of scope: unrelated refactors not required for "Reduce the Knip baseline for v0.6.22".
  Plan: |-
    1. Snapshot Knip findings and classify each as public API, intentional dynamic entry point, or dead code.
    2. Remove dead code, correct exports for true public APIs, and document only unavoidable dynamic exceptions.
    3. Regenerate the baseline with a strictly lower accepted count and no broad ignore expansion.
    4. Run Knip, typecheck, fast tests, and contract checks.
  Verify Steps: |-
    1. Run `bun run knip:report`; every remaining finding has an explicit classification.
    2. Run `bun run knip:check`; the accepted baseline is lower than 574 entries and 158 files, with no new blanket ignore.
    3. Run `bun run typecheck`; it passes.
    4. Run `bun run test:fast` and `bun run ci:contract`; both pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-11T12:10:11.068Z — VERIFY — ok

    By: REVIEWER

    Note: Knip debt decreases from 574 to 554 with no ignore expansion; each remaining entry is classified and all declared checks pass, including full 364/2157 tests.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-11T12:09:53.872Z, excerpt_hash=sha256:78548487052514d9ffe695ab517c4ed162f584c4f8a1dd5be5543ea90faae794

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092208-NGVXDD-reduce-the-knip-baseline-for-v0-6-22/.agentplane/tasks/202607092208-NGVXDD/blueprint/resolved-snapshot.json
    - old_digest: 7c05baa832e06acc612f0dcf7a01d5f9f46c89f777222a2c6bebfcaaa139bac7
    - current_digest: 7c05baa832e06acc612f0dcf7a01d5f9f46c89f777222a2c6bebfcaaa139bac7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607092208-NGVXDD

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607092208-NGVXDD
    - diagnostic_command: agentplane pr check 202607092208-NGVXDD
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-07-11T12:13:46.927Z — VERIFY — ok

    By: REVIEWER

    Note: Knip debt decreases from 574 to 555 with no ignore expansion. Critical-init verification identified and preserved the path-launched CLI runner; all focused, critical, contract, type, lint, and full 364/2157 tests pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-11T12:13:30.563Z, excerpt_hash=sha256:78548487052514d9ffe695ab517c4ed162f584c4f8a1dd5be5543ea90faae794

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092208-NGVXDD-reduce-the-knip-baseline-for-v0-6-22/.agentplane/tasks/202607092208-NGVXDD/blueprint/resolved-snapshot.json
    - old_digest: 7c05baa832e06acc612f0dcf7a01d5f9f46c89f777222a2c6bebfcaaa139bac7
    - current_digest: 7c05baa832e06acc612f0dcf7a01d5f9f46c89f777222a2c6bebfcaaa139bac7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607092208-NGVXDD

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane evaluator run 202607092208-NGVXDD --verdict pass --summary Quality review passed. --finding No blocking findings. --evidence .agentplane/tasks/202607092208-NGVXDD/README.md
    - diagnostic_command: agentplane evaluator run 202607092208-NGVXDD --verdict pass --summary "Quality review passed." --finding "No blocking findings." --evidence .agentplane/tasks/202607092208-NGVXDD/README.md
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "Reduced the accepted Knip baseline from 574 to 555 findings without changing knip.json or adding ignores: unused exports 204 to 185, unused files unchanged at 1, and unused types unchanged at 369. Deleted three unreachable helpers and made sixteen internal helpers file-local. The critical CLI runner initially appeared removable but critical-init verification proved it is launched by filesystem path; it was restored and explicitly classified as a dynamic entry point. Remaining findings are deterministically classified in knip-classification.md as public contracts (312), dynamic entry points (169), or visible accepted debt (74). Verification passed: Knip 555/555, typecheck, lint, focused 8 files / 36 tests, critical CLI 5 files / 14 tests, ci:contract, and full 364 files / 2157 tests."
id_source: "generated"
---
## Summary

Reduce the Knip baseline for v0.6.22

Classify current Knip findings into public API, intentional framework entry points, and removable dead code; delete or export correctly so the accepted baseline shrinks materially without hiding new debt.

## Scope

- In scope: Classify current Knip findings into public API, intentional framework entry points, and removable dead code; delete or export correctly so the accepted baseline shrinks materially without hiding new debt.
- Out of scope: unrelated refactors not required for "Reduce the Knip baseline for v0.6.22".

## Plan

1. Snapshot Knip findings and classify each as public API, intentional dynamic entry point, or dead code.
2. Remove dead code, correct exports for true public APIs, and document only unavoidable dynamic exceptions.
3. Regenerate the baseline with a strictly lower accepted count and no broad ignore expansion.
4. Run Knip, typecheck, fast tests, and contract checks.

## Verify Steps

1. Run `bun run knip:report`; every remaining finding has an explicit classification.
2. Run `bun run knip:check`; the accepted baseline is lower than 574 entries and 158 files, with no new blanket ignore.
3. Run `bun run typecheck`; it passes.
4. Run `bun run test:fast` and `bun run ci:contract`; both pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-11T12:10:11.068Z — VERIFY — ok

By: REVIEWER

Note: Knip debt decreases from 574 to 554 with no ignore expansion; each remaining entry is classified and all declared checks pass, including full 364/2157 tests.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-11T12:09:53.872Z, excerpt_hash=sha256:78548487052514d9ffe695ab517c4ed162f584c4f8a1dd5be5543ea90faae794

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092208-NGVXDD-reduce-the-knip-baseline-for-v0-6-22/.agentplane/tasks/202607092208-NGVXDD/blueprint/resolved-snapshot.json
- old_digest: 7c05baa832e06acc612f0dcf7a01d5f9f46c89f777222a2c6bebfcaaa139bac7
- current_digest: 7c05baa832e06acc612f0dcf7a01d5f9f46c89f777222a2c6bebfcaaa139bac7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607092208-NGVXDD

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607092208-NGVXDD
- diagnostic_command: agentplane pr check 202607092208-NGVXDD
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-07-11T12:13:46.927Z — VERIFY — ok

By: REVIEWER

Note: Knip debt decreases from 574 to 555 with no ignore expansion. Critical-init verification identified and preserved the path-launched CLI runner; all focused, critical, contract, type, lint, and full 364/2157 tests pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-11T12:13:30.563Z, excerpt_hash=sha256:78548487052514d9ffe695ab517c4ed162f584c4f8a1dd5be5543ea90faae794

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092208-NGVXDD-reduce-the-knip-baseline-for-v0-6-22/.agentplane/tasks/202607092208-NGVXDD/blueprint/resolved-snapshot.json
- old_digest: 7c05baa832e06acc612f0dcf7a01d5f9f46c89f777222a2c6bebfcaaa139bac7
- current_digest: 7c05baa832e06acc612f0dcf7a01d5f9f46c89f777222a2c6bebfcaaa139bac7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607092208-NGVXDD

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane evaluator run 202607092208-NGVXDD --verdict pass --summary Quality review passed. --finding No blocking findings. --evidence .agentplane/tasks/202607092208-NGVXDD/README.md
- diagnostic_command: agentplane evaluator run 202607092208-NGVXDD --verdict pass --summary "Quality review passed." --finding "No blocking findings." --evidence .agentplane/tasks/202607092208-NGVXDD/README.md
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Reduced the accepted Knip baseline from 574 to 555 findings without changing knip.json or adding ignores: unused exports 204 to 185, unused files unchanged at 1, and unused types unchanged at 369. Deleted three unreachable helpers and made sixteen internal helpers file-local. The critical CLI runner initially appeared removable but critical-init verification proved it is launched by filesystem path; it was restored and explicitly classified as a dynamic entry point. Remaining findings are deterministically classified in knip-classification.md as public contracts (312), dynamic entry points (169), or visible accepted debt (74). Verification passed: Knip 555/555, typecheck, lint, focused 8 files / 36 tests, critical CLI 5 files / 14 tests, ci:contract, and full 364 files / 2157 tests.
