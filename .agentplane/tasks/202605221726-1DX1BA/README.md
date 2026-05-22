---
id: "202605221726-1DX1BA"
title: "Make flow repair apply safe branch_pr repairs"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "workflow"
verify:
  - "Confirm provider merge and approval actions are never executed by safe-apply."
  - "Run branch_pr route-decision tests for missing branch, stale PR metadata, missing close-tail, and stale cleanup."
  - "Run flow repair unit tests for dry-run and safe-apply modes."
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:26:31.553Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-22T17:27:51.701Z"
doc_updated_by: "PLANNER"
description: "Extend flow repair beyond dry-run for safe mechanical branch_pr repairs such as PR metadata refresh, branch fetch, hosted close-tail opening, and stale worktree cleanup while keeping merge/publish/provider actions approval-gated."
sections:
  Summary: |-
    Make flow repair apply safe branch_pr repairs

    Extend flow repair beyond dry-run for safe mechanical branch_pr repairs such as PR metadata refresh, branch fetch, hosted close-tail opening, and stale worktree cleanup while keeping merge/publish/provider actions approval-gated.
  Scope: |-
    - In scope: Extend flow repair beyond dry-run for safe mechanical branch_pr repairs such as PR metadata refresh, branch fetch, hosted close-tail opening, and stale worktree cleanup while keeping merge/publish/provider actions approval-gated.
    - Out of scope: unrelated refactors not required for "Make flow repair apply safe branch_pr repairs".
  Plan: "Add an explicit safe-apply mode for flow repair. Limit mutation to deterministic local or lifecycle repairs that are already printed by dry-run. Keep provider merges, approvals, verification verdicts, and scope changes out of automatic repair. Verify every repair class separately."
  Verify Steps: |-
    1. Run flow repair unit tests for dry-run and safe-apply modes.
    2. Run branch_pr route-decision tests for missing branch, stale PR metadata, missing close-tail, and stale cleanup.
    3. Confirm provider merge and approval actions are never executed by safe-apply.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make flow repair apply safe branch_pr repairs

Extend flow repair beyond dry-run for safe mechanical branch_pr repairs such as PR metadata refresh, branch fetch, hosted close-tail opening, and stale worktree cleanup while keeping merge/publish/provider actions approval-gated.

## Scope

- In scope: Extend flow repair beyond dry-run for safe mechanical branch_pr repairs such as PR metadata refresh, branch fetch, hosted close-tail opening, and stale worktree cleanup while keeping merge/publish/provider actions approval-gated.
- Out of scope: unrelated refactors not required for "Make flow repair apply safe branch_pr repairs".

## Plan

Add an explicit safe-apply mode for flow repair. Limit mutation to deterministic local or lifecycle repairs that are already printed by dry-run. Keep provider merges, approvals, verification verdicts, and scope changes out of automatic repair. Verify every repair class separately.

## Verify Steps

1. Run flow repair unit tests for dry-run and safe-apply modes.
2. Run branch_pr route-decision tests for missing branch, stale PR metadata, missing close-tail, and stale cleanup.
3. Confirm provider merge and approval actions are never executed by safe-apply.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
