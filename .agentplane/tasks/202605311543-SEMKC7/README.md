---
id: "202605311543-SEMKC7"
title: "Explain blocked GitHub merge states"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "github"
  - "integration"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "external_system"
verify:
  - "bun run test -- pr"
  - "bun run verify:cli"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:51.374Z"
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
    at: "2026-05-31T15:53:32.406Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
doc_version: 3
doc_updated_at: "2026-05-31T15:53:32.406Z"
doc_updated_by: "CODER"
description: "Extend ap pr check to explain GitHub mergeStateStatus=BLOCKED with review/protection/auto-merge context and emit the next permitted action instead of only reporting green checks."
sections:
  Summary: |-
    Explain blocked GitHub merge states

    Extend ap pr check to explain GitHub mergeStateStatus=BLOCKED with review/protection/auto-merge context and emit the next permitted action instead of only reporting green checks.
  Scope: |-
    - In scope: Extend ap pr check to explain GitHub mergeStateStatus=BLOCKED with review/protection/auto-merge context and emit the next permitted action instead of only reporting green checks.
    - Out of scope: unrelated refactors not required for "Explain blocked GitHub merge states".
  Plan: |-
    1. Capture GitHub mergeStateStatus=BLOCKED fixtures with green checks.
    2. Extend ap pr check to report review, branch protection, auto-merge, and merge queue reasons when available.
    3. Emit one permitted next action for wait, request review, enable auto-merge, or integrate route.
    4. Verify output remains concise for normal CLEAN PRs.
  Verify Steps: |-
    PLANNER fallback scaffold for "Explain blocked GitHub merge states". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Explain blocked GitHub merge states". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Explain blocked GitHub merge states

Extend ap pr check to explain GitHub mergeStateStatus=BLOCKED with review/protection/auto-merge context and emit the next permitted action instead of only reporting green checks.

## Scope

- In scope: Extend ap pr check to explain GitHub mergeStateStatus=BLOCKED with review/protection/auto-merge context and emit the next permitted action instead of only reporting green checks.
- Out of scope: unrelated refactors not required for "Explain blocked GitHub merge states".

## Plan

1. Capture GitHub mergeStateStatus=BLOCKED fixtures with green checks.
2. Extend ap pr check to report review, branch protection, auto-merge, and merge queue reasons when available.
3. Emit one permitted next action for wait, request review, enable auto-merge, or integrate route.
4. Verify output remains concise for normal CLEAN PRs.

## Verify Steps

PLANNER fallback scaffold for "Explain blocked GitHub merge states". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Explain blocked GitHub merge states". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
