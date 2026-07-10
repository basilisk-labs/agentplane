---
id: "202607100244-T9T7B2"
title: "Prefer merged PR commit when reconciling included batch tasks"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "branch-pr"
  - "post-merge"
  - "reconciliation"
  - "release-0.6.22"
verify:
  - "bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
  - "bun run --filter=agentplane typecheck"
  - "bun run lint:core"
  - "bun run ci:contract"
  - "bun run test:fast"
plan_approval:
  state: "approved"
  updated_at: "2026-07-10T02:46:49.487Z"
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
    body: "Start: implement rebase-aware included-task reconciliation with a regression test and preserve legacy commit fallbacks."
events:
  -
    type: "status"
    at: "2026-07-10T02:47:14.965Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement rebase-aware included-task reconciliation with a regression test and preserve legacy commit fallbacks."
doc_version: 3
doc_updated_at: "2026-07-10T02:47:14.965Z"
doc_updated_by: "CODER"
description: "For v0.6.22, make release task reconciliation close verified included batch tasks after GitHub rebase merges by preferring the primary PR merge_commit over the rewritten-away branch task commit, while preserving the task commit fallback when merged PR metadata is unavailable."
sections:
  Summary: |-
    Prefer merged PR commit when reconciling included batch tasks

    For v0.6.22, make release task reconciliation close verified included batch tasks after GitHub rebase merges by preferring the primary PR merge_commit over the rewritten-away branch task commit, while preserving the task commit fallback when merged PR metadata is unavailable.
  Scope: |-
    - In scope: For v0.6.22, make release task reconciliation close verified included batch tasks after GitHub rebase merges by preferring the primary PR merge_commit over the rewritten-away branch task commit, while preserving the task commit fallback when merged PR metadata is unavailable.
    - Out of scope: unrelated refactors not required for "Prefer merged PR commit when reconciling included batch tasks".
  Plan: |-
    1. Prefer the primary merged PR merge_commit as the landed commit proof for included-task reconciliation.
    2. Preserve the primary task commit fallback when merged PR metadata is unavailable, then retain head_sha as the final compatibility fallback.
    3. Add a regression test covering a GitHub rebase merge where the original task commit is not an ancestor of main but merge_commit is.
    4. Run focused reconciliation, typecheck, lint, contract, and fast-suite verification.
    5. Reconcile included task 202607100140-WGV79Y and keep this fix in the v0.6.22 release dependency graph.
  Verify Steps: |-
    1. `bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts`
    2. `bun run --filter=agentplane typecheck`
    3. `bun run lint:core`
    4. `bun run ci:contract`
    5. `bun run test:fast`
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

Prefer merged PR commit when reconciling included batch tasks

For v0.6.22, make release task reconciliation close verified included batch tasks after GitHub rebase merges by preferring the primary PR merge_commit over the rewritten-away branch task commit, while preserving the task commit fallback when merged PR metadata is unavailable.

## Scope

- In scope: For v0.6.22, make release task reconciliation close verified included batch tasks after GitHub rebase merges by preferring the primary PR merge_commit over the rewritten-away branch task commit, while preserving the task commit fallback when merged PR metadata is unavailable.
- Out of scope: unrelated refactors not required for "Prefer merged PR commit when reconciling included batch tasks".

## Plan

1. Prefer the primary merged PR merge_commit as the landed commit proof for included-task reconciliation.
2. Preserve the primary task commit fallback when merged PR metadata is unavailable, then retain head_sha as the final compatibility fallback.
3. Add a regression test covering a GitHub rebase merge where the original task commit is not an ancestor of main but merge_commit is.
4. Run focused reconciliation, typecheck, lint, contract, and fast-suite verification.
5. Reconcile included task 202607100140-WGV79Y and keep this fix in the v0.6.22 release dependency graph.

## Verify Steps

1. `bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts`
2. `bun run --filter=agentplane typecheck`
3. `bun run lint:core`
4. `bun run ci:contract`
5. `bun run test:fast`

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
