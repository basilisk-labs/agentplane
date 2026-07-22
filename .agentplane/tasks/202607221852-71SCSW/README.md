---
id: "202607221852-71SCSW"
title: "Extend supervised execution to branch_pr"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202607221849-8YYZ9X"
  - "202607221850-0SFMS7"
  - "202607221852-ECBY56"
tags:
  - "branch-pr"
  - "milestone-rc1"
  - "provider"
  - "refactor"
  - "rf-10"
  - "supervisor"
  - "v0.7"
  - "wave-authority"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run coverage:workflow-suite"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
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
doc_updated_at: "2026-07-22T19:09:39.842Z"
doc_updated_by: "PLANNER"
description: "RF-10b: add worktree, PR sync/open, hosted checks, integration queue, merge, hosted close, and cleanup operations to the proven supervisor while preserving provider waits and user-attributed authority."
sections:
  Summary: |-
    Extend supervised execution to branch_pr

    RF-10b: add worktree, PR sync/open, hosted checks, integration queue, merge, hosted close, and cleanup operations to the proven supervisor while preserving provider waits and user-attributed authority.
  Scope: |-
    - In scope: branch_pr pre/post operations, task worktree recovery, PR artifacts/provider truth, hosted-check stabilization, integration queue, merge authority, pre-merge closure, hosted close, cleanup, retries, and golden metrics.
    - Out of scope: bypassing protected main, assuming provider state from local projections, or granting merge/publish authority implicitly.
  Plan: |-
    1. Map branch_pr lifecycle phases to typed supervisor operations and provider ports.
    2. Reuse direct episode/receipt/evaluator boundaries inside the task worktree.
    3. Add PR open/update, check wait, queue, merge, hosted close, and cleanup with authority and freshness.
    4. Handle provider latency, stale branch, merge conflicts, deleted branch, pre-merge close, and recovery idempotently.
    5. Compare agent lifecycle calls, wrong-checkout errors, and verified success to baseline.
  Verify Steps: |-
    1. Run a protected-main branch_pr golden task. Expected: EXECUTOR performs zero lifecycle calls; supervisor owns worktree through cleanup and uses provider truth.
    2. Exercise late checks, stale head, merge conflict, deleted branch, queue contention, and hosted-close retry. Expected: safe typed waits/rework/recovery without duplicate PR/merge.
    3. Remove merge authority. Expected: an approval step; no provider action is imitated.
    4. Verify actual PR/check/merge receipts and final main SHA in integration fixtures.
    5. Run branch_pr workflow coverage, lifecycle invariants, contract CI, and focused tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Before PR open: remove only the task-owned clean worktree/branch through the AgentPlane cleanup route and restore the previous supervisor feature boundary.
    - After PR open but before queue: close or supersede only the task PR through an authority-recorded provider action; preserve branch and review evidence.
    - While queued: release the claimed/handoff lane through the integration queue recovery operation before reverting code.
    - After merge: never rewrite protected main; create a new follow-up task/PR and let hosted close reconcile the merged SHA.
    - After hosted close: preserve closure evidence and use a new rollback release/task; cleanup only verified clean task-owned worktrees and branches.
  Findings: ""
id_source: "generated"
---
## Summary

Extend supervised execution to branch_pr

RF-10b: add worktree, PR sync/open, hosted checks, integration queue, merge, hosted close, and cleanup operations to the proven supervisor while preserving provider waits and user-attributed authority.

## Scope

- In scope: branch_pr pre/post operations, task worktree recovery, PR artifacts/provider truth, hosted-check stabilization, integration queue, merge authority, pre-merge closure, hosted close, cleanup, retries, and golden metrics.
- Out of scope: bypassing protected main, assuming provider state from local projections, or granting merge/publish authority implicitly.

## Plan

1. Map branch_pr lifecycle phases to typed supervisor operations and provider ports.
2. Reuse direct episode/receipt/evaluator boundaries inside the task worktree.
3. Add PR open/update, check wait, queue, merge, hosted close, and cleanup with authority and freshness.
4. Handle provider latency, stale branch, merge conflicts, deleted branch, pre-merge close, and recovery idempotently.
5. Compare agent lifecycle calls, wrong-checkout errors, and verified success to baseline.

## Verify Steps

1. Run a protected-main branch_pr golden task. Expected: EXECUTOR performs zero lifecycle calls; supervisor owns worktree through cleanup and uses provider truth.
2. Exercise late checks, stale head, merge conflict, deleted branch, queue contention, and hosted-close retry. Expected: safe typed waits/rework/recovery without duplicate PR/merge.
3. Remove merge authority. Expected: an approval step; no provider action is imitated.
4. Verify actual PR/check/merge receipts and final main SHA in integration fixtures.
5. Run branch_pr workflow coverage, lifecycle invariants, contract CI, and focused tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Before PR open: remove only the task-owned clean worktree/branch through the AgentPlane cleanup route and restore the previous supervisor feature boundary.
- After PR open but before queue: close or supersede only the task PR through an authority-recorded provider action; preserve branch and review evidence.
- While queued: release the claimed/handoff lane through the integration queue recovery operation before reverting code.
- After merge: never rewrite protected main; create a new follow-up task/PR and let hosted close reconcile the merged SHA.
- After hosted close: preserve closure evidence and use a new rollback release/task; cleanup only verified clean task-owned worktrees and branches.

## Findings
