---
id: "202608032042-DAMQDM"
title: "Skip provider-dependent qualification checks before provider capture"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "qualification"
  - "release-harness"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run e2e:v0.7.1:check"
  - "node --test scripts/qualification/release-qualification.test.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T20:44:34.969Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-03T20:44:49.526Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-03T20:44:49.526Z"
doc_updated_by: "CODER"
description: "Make the v0.7.1 qualification selector exclude scenarios whose dependencies are not selected, and fail closed for explicit orphan scenario selection, so a deterministic no-provider audit can complete before the one allowed provider generation."
sections:
  Summary: |-
    Skip provider-dependent qualification checks before provider capture

    Make the v0.7.1 qualification selector exclude scenarios whose dependencies are not selected, and fail closed for explicit orphan scenario selection, so a deterministic no-provider audit can complete before the one allowed provider generation.
  Scope: |-
    - In scope: Make the v0.7.1 qualification selector exclude scenarios whose dependencies are not selected, and fail closed for explicit orphan scenario selection, so a deterministic no-provider audit can complete before the one allowed provider generation.
    - Out of scope: unrelated refactors not required for "Skip provider-dependent qualification checks before provider capture".
  Plan: "1. Restrict the qualification selector to scenarios whose declared dependencies are also selected, pruning provider-dependent checks from automatic no-provider profiles without changing the manifest. 2. Fail closed with an actionable dependency error when an explicitly requested scenario omits a required dependency. 3. Add focused selector tests for no-provider exclusion, provider ordering, and explicit orphan rejection. 4. Verify the unit contract and both dry-run routes: the default check must exclude provider-matrix and efficiency-evidence; the provider dry-run must order provider-matrix before efficiency-evidence. 5. Record verification, pass the evaluator and hosted checks, integrate through the guarded branch_pr workflow, then resume the frozen qualification task on updated main."
  Verify Steps: |-
    PLANNER fallback scaffold for "Skip provider-dependent qualification checks before provider capture". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Skip provider-dependent qualification checks before provider capture". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "c0a1a703a165740ef01e1c5524fcc5bd69020ecf"
    version: 1
id_source: "generated"
---
## Summary

Skip provider-dependent qualification checks before provider capture

Make the v0.7.1 qualification selector exclude scenarios whose dependencies are not selected, and fail closed for explicit orphan scenario selection, so a deterministic no-provider audit can complete before the one allowed provider generation.

## Scope

- In scope: Make the v0.7.1 qualification selector exclude scenarios whose dependencies are not selected, and fail closed for explicit orphan scenario selection, so a deterministic no-provider audit can complete before the one allowed provider generation.
- Out of scope: unrelated refactors not required for "Skip provider-dependent qualification checks before provider capture".

## Plan

1. Restrict the qualification selector to scenarios whose declared dependencies are also selected, pruning provider-dependent checks from automatic no-provider profiles without changing the manifest. 2. Fail closed with an actionable dependency error when an explicitly requested scenario omits a required dependency. 3. Add focused selector tests for no-provider exclusion, provider ordering, and explicit orphan rejection. 4. Verify the unit contract and both dry-run routes: the default check must exclude provider-matrix and efficiency-evidence; the provider dry-run must order provider-matrix before efficiency-evidence. 5. Record verification, pass the evaluator and hosted checks, integrate through the guarded branch_pr workflow, then resume the frozen qualification task on updated main.

## Verify Steps

PLANNER fallback scaffold for "Skip provider-dependent qualification checks before provider capture". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Skip provider-dependent qualification checks before provider capture". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
