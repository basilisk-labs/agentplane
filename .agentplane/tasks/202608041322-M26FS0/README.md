---
id: "202608041322-M26FS0"
title: "Stabilize hosted release evidence closeout"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
task_kind: "release"
mutation_scope: "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T13:24:02.060Z"
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
    body: "Start: implement exact-SHA release evidence verification and terminal DONE routing regressions."
events:
  -
    type: "status"
    at: "2026-08-04T13:24:55.462Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement exact-SHA release evidence verification and terminal DONE routing regressions."
doc_version: 3
doc_updated_at: "2026-08-04T13:24:55.462Z"
doc_updated_by: "CODER"
description: "Fix the v0.7.2 live release-tail regressions: ensure a GitHub Actions-created release-evidence PR obtains a real pull_request-scoped required PR verification without operator repair, and keep an already DONE release task terminal after its evidence-only task README commit lands on main. Add exact regression coverage and ship the corrective patch release."
sections:
  Summary: |-
    Stabilize hosted release evidence closeout

    Fix the v0.7.2 live release-tail regressions: ensure a GitHub Actions-created release-evidence PR obtains a real pull_request-scoped required PR verification without operator repair, and keep an already DONE release task terminal after its evidence-only task README commit lands on main. Add exact regression coverage and ship the corrective patch release.
  Scope: |-
    - In scope: Fix the v0.7.2 live release-tail regressions: ensure a GitHub Actions-created release-evidence PR obtains a real pull_request-scoped required PR verification without operator repair, and keep an already DONE release task terminal after its evidence-only task README commit lands on main. Add exact regression coverage and ship the corrective patch release.
    - Out of scope: unrelated refactors not required for "Stabilize hosted release evidence closeout".
  Plan: "Patch-release plan: version=0.7.3, tag=v0.7.3. 1. Preserve the v0.7.2 live evidence for both release-tail failures. 2. Make release-evidence verification validate the exact closure SHA, wait for that Core CI run, publish a GitHub Actions-owned required PR verification check, and fail closed before merge automation. 3. Keep a fully closed DONE task terminal across a task-evidence-only README advance while preserving stale-verification blocking for real implementation changes. 4. Add focused route and publish-workflow regressions. 5. Run targeted tests, ci:contract, release:prepublish, and independent evaluator. 6. Merge through branch_pr, publish v0.7.3 for the exact merged SHA, and prove that the evidence PR merges without reopen/admin repair and the release task route remains terminal. Stop on product drift outside these release-tail repairs, active incidents, failed required checks, or version/tag drift."
  Verify Steps: |-
    1. Run the focused route regression that closes a branch_pr task, advances main with only its hosted release-evidence README, and queries next-action. Expected: the task remains terminal.done; a real implementation commit still makes verification stale.
    2. Run the publish-workflow contract tests. Expected: release evidence CI validates the exact closure SHA, waits for success, emits a GitHub Actions-owned PR verification check, and does not silently continue after a failed evidence gate.
    3. Run bun run ci:contract and bun run release:prepublish. Expected: all blocking contracts, release checks, release CI suites, coverage guards, and release-critical tests pass.
    4. After merge and publish, verify npm latest for all three packages is 0.7.3, tag and GitHub Release v0.7.3 point to the exact release SHA, clean install and postpublish audit pass, and the release-evidence PR merges without reopen/admin repair.
    5. Pull the evidence merge to main and query next-action for this task. Expected: status is DONE, route is terminal.done, hosted publish evidence is present, token provenance is explicit, and no merged task branch/worktree remains.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "9d0e0089dd83487defa8950d787a5fa67f53db10"
    version: 1
id_source: "generated"
---
## Summary

Stabilize hosted release evidence closeout

Fix the v0.7.2 live release-tail regressions: ensure a GitHub Actions-created release-evidence PR obtains a real pull_request-scoped required PR verification without operator repair, and keep an already DONE release task terminal after its evidence-only task README commit lands on main. Add exact regression coverage and ship the corrective patch release.

## Scope

- In scope: Fix the v0.7.2 live release-tail regressions: ensure a GitHub Actions-created release-evidence PR obtains a real pull_request-scoped required PR verification without operator repair, and keep an already DONE release task terminal after its evidence-only task README commit lands on main. Add exact regression coverage and ship the corrective patch release.
- Out of scope: unrelated refactors not required for "Stabilize hosted release evidence closeout".

## Plan

Patch-release plan: version=0.7.3, tag=v0.7.3. 1. Preserve the v0.7.2 live evidence for both release-tail failures. 2. Make release-evidence verification validate the exact closure SHA, wait for that Core CI run, publish a GitHub Actions-owned required PR verification check, and fail closed before merge automation. 3. Keep a fully closed DONE task terminal across a task-evidence-only README advance while preserving stale-verification blocking for real implementation changes. 4. Add focused route and publish-workflow regressions. 5. Run targeted tests, ci:contract, release:prepublish, and independent evaluator. 6. Merge through branch_pr, publish v0.7.3 for the exact merged SHA, and prove that the evidence PR merges without reopen/admin repair and the release task route remains terminal. Stop on product drift outside these release-tail repairs, active incidents, failed required checks, or version/tag drift.

## Verify Steps

1. Run the focused route regression that closes a branch_pr task, advances main with only its hosted release-evidence README, and queries next-action. Expected: the task remains terminal.done; a real implementation commit still makes verification stale.
2. Run the publish-workflow contract tests. Expected: release evidence CI validates the exact closure SHA, waits for success, emits a GitHub Actions-owned PR verification check, and does not silently continue after a failed evidence gate.
3. Run bun run ci:contract and bun run release:prepublish. Expected: all blocking contracts, release checks, release CI suites, coverage guards, and release-critical tests pass.
4. After merge and publish, verify npm latest for all three packages is 0.7.3, tag and GitHub Release v0.7.3 point to the exact release SHA, clean install and postpublish audit pass, and the release-evidence PR merges without reopen/admin repair.
5. Pull the evidence merge to main and query next-action for this task. Expected: status is DONE, route is terminal.done, hosted publish evidence is present, token provenance is explicit, and no merged task branch/worktree remains.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
