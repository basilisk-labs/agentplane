---
id: "202605311543-0VPDRD"
title: "Support finish closure branches in branch_pr"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "cli"
  - "closeout"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run release:tasks:check"
  - "bun run verify:cli"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:46.453Z"
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
    at: "2026-05-31T15:53:29.809Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
doc_version: 3
doc_updated_at: "2026-05-31T15:53:29.809Z"
doc_updated_by: "CODER"
description: "Make ap finish provide a safe branch_pr closeout path for metadata-only closure, including closure branch creation or explicit recovery hints when finish is attempted from the wrong checkout."
sections:
  Summary: |-
    Support finish closure branches in branch_pr

    Make ap finish provide a safe branch_pr closeout path for metadata-only closure, including closure branch creation or explicit recovery hints when finish is attempted from the wrong checkout.
  Scope: |-
    - In scope: Make ap finish provide a safe branch_pr closeout path for metadata-only closure, including closure branch creation or explicit recovery hints when finish is attempted from the wrong checkout.
    - Out of scope: unrelated refactors not required for "Support finish closure branches in branch_pr".
  Plan: |-
    1. Reproduce branch_pr finish attempts from non-base and base dirty states.
    2. Add closure-branch support or precise recovery hints for metadata-only closeout.
    3. Preserve existing base-branch protections and close-commit behavior.
    4. Verify command help, branch_pr lifecycle tests, and release task checks.
  Verify Steps: |-
    PLANNER fallback scaffold for "Support finish closure branches in branch_pr". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Support finish closure branches in branch_pr". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Support finish closure branches in branch_pr

Make ap finish provide a safe branch_pr closeout path for metadata-only closure, including closure branch creation or explicit recovery hints when finish is attempted from the wrong checkout.

## Scope

- In scope: Make ap finish provide a safe branch_pr closeout path for metadata-only closure, including closure branch creation or explicit recovery hints when finish is attempted from the wrong checkout.
- Out of scope: unrelated refactors not required for "Support finish closure branches in branch_pr".

## Plan

1. Reproduce branch_pr finish attempts from non-base and base dirty states.
2. Add closure-branch support or precise recovery hints for metadata-only closeout.
3. Preserve existing base-branch protections and close-commit behavior.
4. Verify command help, branch_pr lifecycle tests, and release task checks.

## Verify Steps

PLANNER fallback scaffold for "Support finish closure branches in branch_pr". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Support finish closure branches in branch_pr". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
