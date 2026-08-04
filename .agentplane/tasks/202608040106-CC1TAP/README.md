---
id: "202608040106-CC1TAP"
title: "Remove calendar-date flake from merge token-usage unit test"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "test"
  - "token-usage"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
verify:
  - "The assertion must still prove token_usage.updated_at is a valid observed timestamp rather than weakening coverage to mere presence."
  - "The exact hosted-merge-sync.token-usage test must fail before the change and pass afterward on any UTC calendar day."
plan_approval:
  state: "approved"
  updated_at: "2026-08-04T01:06:30.775Z"
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
    author: "TESTER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-04T01:06:51.986Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-04T01:06:51.986Z"
doc_updated_by: "TESTER"
description: "Replace the hard-coded UTC calendar-day assertion in hosted merge token-usage coverage with a deterministic invariant tied to the observed journal projection, preserving the production token-usage contract and reproducing the hosted failure locally before the fix."
sections:
  Summary: |-
    Remove calendar-date flake from merge token-usage unit test

    Replace the hard-coded UTC calendar-day assertion in hosted merge token-usage coverage with a deterministic invariant tied to the observed journal projection, preserving the production token-usage contract and reproducing the hosted failure locally before the fix.
  Scope: |-
    - In scope: Replace the hard-coded UTC calendar-day assertion in hosted merge token-usage coverage with a deterministic invariant tied to the observed journal projection, preserving the production token-usage contract and reproducing the hosted failure locally before the fix.
    - Out of scope: unrelated refactors not required for "Remove calendar-date flake from merge token-usage unit test".
  Plan: "1. Preserve the hosted PR #4769 failure and reproduce the exact test locally on current main. 2. Identify the real timestamp contract produced by merge reconciliation and replace only the fixed 2026-08-03 calendar assertion with a deterministic relationship or ISO-time invariant. 3. Run the focused test across an injected cross-midnight case if the fixture supports it, then run the nearby token-usage and merge-reconciliation suites plus formatting/static checks. 4. Record structured verification and independent quality evidence, publish a dedicated branch_pr, merge it into main, and update PR #4769 onto the repaired base."
  Verify Steps: |-
    PLANNER fallback scaffold for "Remove calendar-date flake from merge token-usage unit test". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Remove calendar-date flake from merge token-usage unit test". Expected: the visible result matches ## Summary and stays inside approved scope.
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
    start_head_sha: "bae47b05c31e7e489a1c49ce12f7a27d6f44486a"
    version: 1
id_source: "generated"
---
## Summary

Remove calendar-date flake from merge token-usage unit test

Replace the hard-coded UTC calendar-day assertion in hosted merge token-usage coverage with a deterministic invariant tied to the observed journal projection, preserving the production token-usage contract and reproducing the hosted failure locally before the fix.

## Scope

- In scope: Replace the hard-coded UTC calendar-day assertion in hosted merge token-usage coverage with a deterministic invariant tied to the observed journal projection, preserving the production token-usage contract and reproducing the hosted failure locally before the fix.
- Out of scope: unrelated refactors not required for "Remove calendar-date flake from merge token-usage unit test".

## Plan

1. Preserve the hosted PR #4769 failure and reproduce the exact test locally on current main. 2. Identify the real timestamp contract produced by merge reconciliation and replace only the fixed 2026-08-03 calendar assertion with a deterministic relationship or ISO-time invariant. 3. Run the focused test across an injected cross-midnight case if the fixture supports it, then run the nearby token-usage and merge-reconciliation suites plus formatting/static checks. 4. Record structured verification and independent quality evidence, publish a dedicated branch_pr, merge it into main, and update PR #4769 onto the repaired base.

## Verify Steps

PLANNER fallback scaffold for "Remove calendar-date flake from merge token-usage unit test". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Remove calendar-date flake from merge token-usage unit test". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
