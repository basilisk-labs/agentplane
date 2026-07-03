---
id: "202607030856-SQ3TMK"
title: "Fix context wiki index lint and strengthen extraction assimilation"
status: "DOING"
priority: "med"
owner: "CURATOR"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
  - "followup"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-03T08:57:16.502Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-03T09:12:01.536Z"
  updated_by: "CURATOR"
  note: "Focused context tests, routing policy check, doctor, typecheck, lint:core, format:changed, and six-document assimilation smoke test passed."
  attempts: 0
commit: null
comments:
  -
    author: "CURATOR"
    body: "Start: Reproduced post-index wiki lint failure; implementation will fix generated index page validity and strengthen extraction assimilation reporting before larger network-document verification."
events:
  -
    type: "status"
    at: "2026-07-03T08:58:48.747Z"
    author: "CURATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: Reproduced post-index wiki lint failure; implementation will fix generated index page validity and strengthen extraction assimilation reporting before larger network-document verification."
  -
    type: "verify"
    at: "2026-07-03T09:12:01.536Z"
    author: "CURATOR"
    state: "ok"
    note: "Focused context tests, routing policy check, doctor, typecheck, lint:core, format:changed, and six-document assimilation smoke test passed."
doc_version: 3
doc_updated_at: "2026-07-03T09:12:02.514Z"
doc_updated_by: "CURATOR"
description: "Fix the post-index wiki lint failure found during assimilation smoke testing, improve extraction apply/reporting where source-backed assimilation is weak, and verify with a larger network-document assimilation test on main."
sections:
  Summary: |-
    Fix context wiki index lint and strengthen extraction assimilation

    Fix the post-index wiki lint failure found during assimilation smoke testing, improve extraction apply/reporting where source-backed assimilation is weak, and verify with a larger network-document assimilation test on main.
  Scope: |-
    - In scope: Fix the post-index wiki lint failure found during assimilation smoke testing, improve extraction apply/reporting where source-backed assimilation is weak, and verify with a larger network-document assimilation test on main.
    - Out of scope: unrelated refactors not required for "Fix context wiki index lint and strengthen extraction assimilation".
  Plan: |-
    1. Reproduce the post-index wiki lint failure and cover it with focused tests.
    2. Fix generated wiki index pages so `context wiki index` emits lint-valid context wiki artifacts.
    3. Improve extraction apply ergonomics/reporting for source-backed assimilation artifacts without changing accepted SGR schema.
    4. Verify with focused unit tests, routing checks, and an end-to-end assimilation smoke test using more network documents.
    5. Commit intentional changes on the task branch and merge back to main after checks pass.
  Verify Steps: |-
    1. Run focused context wiki/extraction tests. Expected: index generation, wiki lint, and extraction apply tests pass.
    2. Run routing/static policy checks. Expected: no routing or policy-budget regression.
    3. Run an end-to-end assimilation smoke test with more network documents than the original reproduction. Expected: context init, extraction apply, graph validate, wiki index, wiki report, wiki lint, reindex, and search all pass; graph remains connected and wiki has no unresolved links or orphans.
    4. Confirm final git state. Expected: only intentional task changes are committed and main is clean after integration.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-03T09:12:01.536Z — VERIFY — ok

    By: CURATOR

    Note: Focused context tests, routing policy check, doctor, typecheck, lint:core, format:changed, and six-document assimilation smoke test passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-03T08:58:48.747Z, excerpt_hash=sha256:15d02275a157ee0e50371835818a3859e1916b4aaf493c5bcb97fe188250aad9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607030856-SQ3TMK-fix-context-wiki-index-lint-and-strengthen-extra/.agentplane/tasks/202607030856-SQ3TMK/blueprint/resolved-snapshot.json
    - old_digest: 5886aa9525d610fc150968b1b7a8b1ad9bb3858c264f5ab8c512763d5853f7a6
    - current_digest: 5886aa9525d610fc150968b1b7a8b1ad9bb3858c264f5ab8c512763d5853f7a6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607030856-SQ3TMK

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607030856-SQ3TMK
    - diagnostic_command: agentplane pr check 202607030856-SQ3TMK
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
    - Observation: Original failure reproduced before fix: context wiki index generated subdirectory index.md pages without YAML frontmatter, making context wiki lint context/wiki fail. After fix, large smoke test passed context init, extraction apply, graph validate, wiki lint before index, wiki index, wiki report, wiki lint after index/report, reindex, and search. Large smoke metrics: documents=6 facts=6 entities=14 edges=18 tests_edges=6 provenance=68 resolved_links=25 unresolved_links=0 orphans=0 components=1 isolated_entities=0.
      Impact: Generated wiki indexes are now valid context wiki pages, and extraction apply output now reports items/source_paths/source_refs for immediate granularity diagnostics.
      Resolution: Implemented lint-valid generated index pages and extraction apply source counters with focused regression tests.
id_source: "generated"
---
## Summary

Fix context wiki index lint and strengthen extraction assimilation

Fix the post-index wiki lint failure found during assimilation smoke testing, improve extraction apply/reporting where source-backed assimilation is weak, and verify with a larger network-document assimilation test on main.

## Scope

- In scope: Fix the post-index wiki lint failure found during assimilation smoke testing, improve extraction apply/reporting where source-backed assimilation is weak, and verify with a larger network-document assimilation test on main.
- Out of scope: unrelated refactors not required for "Fix context wiki index lint and strengthen extraction assimilation".

## Plan

1. Reproduce the post-index wiki lint failure and cover it with focused tests.
2. Fix generated wiki index pages so `context wiki index` emits lint-valid context wiki artifacts.
3. Improve extraction apply ergonomics/reporting for source-backed assimilation artifacts without changing accepted SGR schema.
4. Verify with focused unit tests, routing checks, and an end-to-end assimilation smoke test using more network documents.
5. Commit intentional changes on the task branch and merge back to main after checks pass.

## Verify Steps

1. Run focused context wiki/extraction tests. Expected: index generation, wiki lint, and extraction apply tests pass.
2. Run routing/static policy checks. Expected: no routing or policy-budget regression.
3. Run an end-to-end assimilation smoke test with more network documents than the original reproduction. Expected: context init, extraction apply, graph validate, wiki index, wiki report, wiki lint, reindex, and search all pass; graph remains connected and wiki has no unresolved links or orphans.
4. Confirm final git state. Expected: only intentional task changes are committed and main is clean after integration.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-03T09:12:01.536Z — VERIFY — ok

By: CURATOR

Note: Focused context tests, routing policy check, doctor, typecheck, lint:core, format:changed, and six-document assimilation smoke test passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-03T08:58:48.747Z, excerpt_hash=sha256:15d02275a157ee0e50371835818a3859e1916b4aaf493c5bcb97fe188250aad9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607030856-SQ3TMK-fix-context-wiki-index-lint-and-strengthen-extra/.agentplane/tasks/202607030856-SQ3TMK/blueprint/resolved-snapshot.json
- old_digest: 5886aa9525d610fc150968b1b7a8b1ad9bb3858c264f5ab8c512763d5853f7a6
- current_digest: 5886aa9525d610fc150968b1b7a8b1ad9bb3858c264f5ab8c512763d5853f7a6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607030856-SQ3TMK

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607030856-SQ3TMK
- diagnostic_command: agentplane pr check 202607030856-SQ3TMK
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

- Observation: Original failure reproduced before fix: context wiki index generated subdirectory index.md pages without YAML frontmatter, making context wiki lint context/wiki fail. After fix, large smoke test passed context init, extraction apply, graph validate, wiki lint before index, wiki index, wiki report, wiki lint after index/report, reindex, and search. Large smoke metrics: documents=6 facts=6 entities=14 edges=18 tests_edges=6 provenance=68 resolved_links=25 unresolved_links=0 orphans=0 components=1 isolated_entities=0.
  Impact: Generated wiki indexes are now valid context wiki pages, and extraction apply output now reports items/source_paths/source_refs for immediate granularity diagnostics.
  Resolution: Implemented lint-valid generated index pages and extraction apply source counters with focused regression tests.
