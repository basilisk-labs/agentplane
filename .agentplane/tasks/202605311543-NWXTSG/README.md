---
id: "202605311543-NWXTSG"
title: "Add branch cleanup dry-run reports"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-cleanup"
  - "cli"
  - "worktree"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test -- branch"
  - "bun run verify:cli"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:52.408Z"
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
    body: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-05-31T15:53:33.051Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
doc_version: 3
doc_updated_at: "2026-05-31T15:53:33.051Z"
doc_updated_by: "CODER"
description: "Add a branch cleanup command that classifies merged, dirty, backup, active-worktree, and unmerged branches; supports dry-run; preserves dirty state with named stashes; and writes a cleanup report."
sections:
  Summary: |-
    Add branch cleanup dry-run reports

    Add a branch cleanup command that classifies merged, dirty, backup, active-worktree, and unmerged branches; supports dry-run; preserves dirty state with named stashes; and writes a cleanup report.
  Scope: |-
    - In scope: Add a branch cleanup command that classifies merged, dirty, backup, active-worktree, and unmerged branches; supports dry-run; preserves dirty state with named stashes; and writes a cleanup report.
    - Out of scope: unrelated refactors not required for "Add branch cleanup dry-run reports".
  Plan: |-
    1. Define branch cleanup classification for merged, dirty, backup, active-worktree, unmerged, and remote-tracking branches.
    2. Implement dry-run report before destructive cleanup.
    3. Preserve dirty worktree state with named stashes and write a manifest mapping stash to removed branch/worktree.
    4. Add tests for cleanup safety and final status reporting.
  Verify Steps: |-
    PLANNER fallback scaffold for "Add branch cleanup dry-run reports". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Add branch cleanup dry-run reports". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

Add branch cleanup dry-run reports

Add a branch cleanup command that classifies merged, dirty, backup, active-worktree, and unmerged branches; supports dry-run; preserves dirty state with named stashes; and writes a cleanup report.

## Scope

- In scope: Add a branch cleanup command that classifies merged, dirty, backup, active-worktree, and unmerged branches; supports dry-run; preserves dirty state with named stashes; and writes a cleanup report.
- Out of scope: unrelated refactors not required for "Add branch cleanup dry-run reports".

## Plan

1. Define branch cleanup classification for merged, dirty, backup, active-worktree, unmerged, and remote-tracking branches.
2. Implement dry-run report before destructive cleanup.
3. Preserve dirty worktree state with named stashes and write a manifest mapping stash to removed branch/worktree.
4. Add tests for cleanup safety and final status reporting.

## Verify Steps

PLANNER fallback scaffold for "Add branch cleanup dry-run reports". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Add branch cleanup dry-run reports". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
