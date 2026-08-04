---
id: "202608040106-CC1TAP"
title: "Remove calendar-date flake from merge token-usage unit test"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 6
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
commit:
  hash: "87fc9d132fe0253ba6b6cfcf6cbd96ab28f7a0e2"
  message: "🧪 CC1TAP task: stabilize token usage timestamp test"
comments:
  -
    author: "TESTER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "TESTER"
    body: "Implementation complete: exact test now freezes reconciliation time and asserts exact timestamps for hosted, local-merged, and locally-shipped projections; focused 3/3, nearby 16/16, TypeScript 7, lint, formatting, and diff checks pass."
events:
  -
    type: "status"
    at: "2026-08-04T01:06:51.986Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-04T01:08:39.901Z"
    author: "TESTER"
    from: "DOING"
    to: "DOING"
    note: "Implementation complete: exact test now freezes reconciliation time and asserts exact timestamps for hosted, local-merged, and locally-shipped projections; focused 3/3, nearby 16/16, TypeScript 7, lint, formatting, and diff checks pass."
doc_version: 3
doc_updated_at: "2026-08-04T01:08:39.901Z"
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
    1. Reproduce the exact pre-fix failure on current main. Expected: hosted-merge-sync.token-usage.test.ts fails only because the locally-shipped projection crosses the hard-coded 2026-08-03 UTC boundary.
    2. Run the focused hosted merge token-usage suite after the change. Expected: all three paths assert exact contract timestamps and pass independently of the wall-clock date.
    3. Run hosted merge reconciliation and token-usage unit suites. Expected: all nearby token aggregation, merge reconciliation, and replay-stability checks pass.
    4. Run TypeScript 7 typecheck plus touched ESLint, Prettier, and git diff checks. Expected: all pass with no production-code diff.
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

1. Reproduce the exact pre-fix failure on current main. Expected: hosted-merge-sync.token-usage.test.ts fails only because the locally-shipped projection crosses the hard-coded 2026-08-03 UTC boundary.
2. Run the focused hosted merge token-usage suite after the change. Expected: all three paths assert exact contract timestamps and pass independently of the wall-clock date.
3. Run hosted merge reconciliation and token-usage unit suites. Expected: all nearby token aggregation, merge reconciliation, and replay-stability checks pass.
4. Run TypeScript 7 typecheck plus touched ESLint, Prettier, and git diff checks. Expected: all pass with no production-code diff.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
