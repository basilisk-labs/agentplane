---
id: "202605311543-KS7B7N"
title: "Detect landed included tasks in route oracle"
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
  - "release"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run release:tasks:check"
  - "bun run verify:cli"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:44.616Z"
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
    at: "2026-05-31T15:53:25.729Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
doc_version: 3
doc_updated_at: "2026-05-31T15:53:25.729Z"
doc_updated_by: "CODER"
description: "Teach branch_pr route oracle to classify verified included batch tasks whose implementation already landed but whose finish metadata is missing, instead of returning generic missing_pr_branch/worktree_needed."
sections:
  Summary: |-
    Detect landed included tasks in route oracle

    Teach branch_pr route oracle to classify verified included batch tasks whose implementation already landed but whose finish metadata is missing, instead of returning generic missing_pr_branch/worktree_needed.
  Scope: |-
    - In scope: Teach branch_pr route oracle to classify verified included batch tasks whose implementation already landed but whose finish metadata is missing, instead of returning generic missing_pr_branch/worktree_needed.
    - Out of scope: unrelated refactors not required for "Detect landed included tasks in route oracle".
  Plan: |-
    1. Add tests that reproduce a verified included batch task returning generic worktree_needed.
    2. Update route classification to emit an included-task closure phase with landed evidence requirements.
    3. Make next-action output include the exact safe recovery command and checkout.
    4. Verify release:tasks:check and routing checks still pass.
  Verify Steps: |-
    PLANNER fallback scaffold for "Detect landed included tasks in route oracle". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Detect landed included tasks in route oracle". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Detect landed included tasks in route oracle

Teach branch_pr route oracle to classify verified included batch tasks whose implementation already landed but whose finish metadata is missing, instead of returning generic missing_pr_branch/worktree_needed.

## Scope

- In scope: Teach branch_pr route oracle to classify verified included batch tasks whose implementation already landed but whose finish metadata is missing, instead of returning generic missing_pr_branch/worktree_needed.
- Out of scope: unrelated refactors not required for "Detect landed included tasks in route oracle".

## Plan

1. Add tests that reproduce a verified included batch task returning generic worktree_needed.
2. Update route classification to emit an included-task closure phase with landed evidence requirements.
3. Make next-action output include the exact safe recovery command and checkout.
4. Verify release:tasks:check and routing checks still pass.

## Verify Steps

PLANNER fallback scaffold for "Detect landed included tasks in route oracle". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Detect landed included tasks in route oracle". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
