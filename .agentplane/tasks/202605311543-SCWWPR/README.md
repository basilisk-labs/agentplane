---
id: "202605311543-SCWWPR"
title: "Add release task reconciliation command"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "release"
  - "task-registry"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run release:tasks:check"
  - "bun run verify:cli"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:45.214Z"
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
    at: "2026-05-31T15:53:29.162Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
doc_version: 3
doc_updated_at: "2026-05-31T15:53:29.162Z"
doc_updated_by: "CODER"
description: "Add an operator command that reconciles release-blocking verified DOING tasks in batch, records landed PR evidence, writes evaluator/finish metadata, and prepares a safe closure branch."
sections:
  Summary: |-
    Add release task reconciliation command

    Add an operator command that reconciles release-blocking verified DOING tasks in batch, records landed PR evidence, writes evaluator/finish metadata, and prepares a safe closure branch.
  Scope: |-
    - In scope: Add an operator command that reconciles release-blocking verified DOING tasks in batch, records landed PR evidence, writes evaluator/finish metadata, and prepares a safe closure branch.
    - Out of scope: unrelated refactors not required for "Add release task reconciliation command".
  Plan: |-
    1. Define the release reconciliation command contract and inputs for merged PR, primary task, and included task set.
    2. Implement dry-run and apply modes that record evaluator and finish metadata without implementation changes.
    3. Ensure the command prepares a safe closure branch or reports why it cannot.
    4. Cover the v0.6.12 included-task regression with fixture tests.
  Verify Steps: |-
    PLANNER fallback scaffold for "Add release task reconciliation command". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Add release task reconciliation command". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Add release task reconciliation command

Add an operator command that reconciles release-blocking verified DOING tasks in batch, records landed PR evidence, writes evaluator/finish metadata, and prepares a safe closure branch.

## Scope

- In scope: Add an operator command that reconciles release-blocking verified DOING tasks in batch, records landed PR evidence, writes evaluator/finish metadata, and prepares a safe closure branch.
- Out of scope: unrelated refactors not required for "Add release task reconciliation command".

## Plan

1. Define the release reconciliation command contract and inputs for merged PR, primary task, and included task set.
2. Implement dry-run and apply modes that record evaluator and finish metadata without implementation changes.
3. Ensure the command prepares a safe closure branch or reports why it cannot.
4. Cover the v0.6.12 included-task regression with fixture tests.

## Verify Steps

PLANNER fallback scaffold for "Add release task reconciliation command". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Add release task reconciliation command". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
