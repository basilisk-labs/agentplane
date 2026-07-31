---
id: "202607221852-71SCSW"
title: "Extend supervised execution to branch_pr"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 24
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
  state: "approved"
  updated_at: "2026-07-31T11:13:44.168Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-31T12:09:21.598Z"
  updated_by: "TESTER"
  note: "Verified: branch_pr supervisor owns mechanical lifecycle and provider preparation while semantic episodes remain role-scoped; all declared gates passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-31T13:00:55.955Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 3 typed finding(s)."
  evaluated_sha: "3fd3313d8c8a45e7c36a004f07b4d9071bc3abea"
  blueprint_digest: "1546fb324a2b5f29a94664925b6e887f2a66ded00af61563b8e344f9297ba363"
  evidence_refs:
    - ".agentplane/tasks/202607221852-71SCSW/quality/20260731-130055501-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221852-71SCSW/quality/20260731-130055501-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221852-71SCSW/quality/20260731-130055501-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221852-71SCSW/quality/20260731-130055501-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221852-71SCSW/quality/20260731-130055501-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221852-71SCSW/README.md"
    - ".agentplane/tasks/202607221852-71SCSW/quality/20260731-130055501-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221852-71SCSW/quality/20260731-130055501-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221852-71SCSW/quality/20260731-130055501-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "PASS: stale inactive queue entries fall through to one typed integration.enqueue refresh, while matching queued/done entries and all claimed/handoff entries remain non-destructive waits."
    - "PASS: the branch_pr supervisor keeps semantic EXECUTOR/EVALUATOR work role-scoped and routes worktree, verification, PR publication, queue, hosted-close, and cleanup through typed CLI operations with durable idempotency."
    - "PASS: the real two-worktree regression proves a stale base README cannot override DONE task-branch truth and that base-owned queue state is observed from the task worktree."
commit:
  hash: "2257c5a99a1e980b8ba0817a3f78e6c9ddf5cb55"
  message: "🧭 71SCSW task: pass stale queue fix"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: 49f4e7c7a. CLI-owned branch_pr supervision now covers semantic work, verification, PR/provider operations, integration queue, hosted close, durable idempotency, and cleanup."
  -
    author: "CODER"
    body: "Implementation committed: strict quality target handling for CLI lifecycle receipts."
  -
    author: "CODER"
    body: "Implementation committed: receipt resolver passes project lint."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Reopened for live integration queue checkout-boundary rework."
  -
    author: "CODER"
    body: "Implementation rework committed: task truth remains in task worktree while queue truth comes from base checkout."
  -
    author: "CODER"
    body: "Implementation rework finalized: integration queue routing extracted below hotspot limit."
  -
    author: "CODER"
    body: "Implementation rework finalized: queue waits are bound to current branch, head, base, and PR identity."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-31T11:14:18.514Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-31T12:08:34.970Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 49f4e7c7a. CLI-owned branch_pr supervision now covers semantic work, verification, PR/provider operations, integration queue, hosted close, durable idempotency, and cleanup."
  -
    type: "verify"
    at: "2026-07-31T12:09:21.598Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: branch_pr supervisor owns mechanical lifecycle and provider preparation while semantic episodes remain role-scoped; all declared gates passed."
  -
    type: "status"
    at: "2026-07-31T12:20:58.037Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: strict quality target handling for CLI lifecycle receipts."
  -
    type: "status"
    at: "2026-07-31T12:24:12.450Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: receipt resolver passes project lint."
  -
    type: "status"
    at: "2026-07-31T12:30:28.585Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-31T12:39:48.571Z"
    author: "CODER"
    from: "DONE"
    to: "DOING"
    note: "Reopened for live integration queue checkout-boundary rework."
  -
    type: "status"
    at: "2026-07-31T12:47:57.474Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework committed: task truth remains in task worktree while queue truth comes from base checkout."
  -
    type: "status"
    at: "2026-07-31T12:50:10.329Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework finalized: integration queue routing extracted below hotspot limit."
  -
    type: "status"
    at: "2026-07-31T12:54:46.712Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation rework finalized: queue waits are bound to current branch, head, base, and PR identity."
  -
    type: "status"
    at: "2026-07-31T13:01:58.753Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-31T13:01:58.754Z"
doc_updated_by: "CODER"
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
    ### 2026-07-31T12:09:21.598Z — VERIFY — ok

    By: TESTER

    Note: Verified: branch_pr supervisor owns mechanical lifecycle and provider preparation while semantic episodes remain role-scoped; all declared gates passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T12:08:34.970Z, excerpt_hash=sha256:a38f1a3407037d57e61f4de991ed22561af0ace7a6acda607c2d462b937343f7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-71SCSW-extend-supervised-execution-to-branch-pr/.agentplane/tasks/202607221852-71SCSW/blueprint/resolved-snapshot.json
    - old_digest: 1546fb324a2b5f29a94664925b6e887f2a66ded00af61563b8e344f9297ba363
    - current_digest: 1546fb324a2b5f29a94664925b6e887f2a66ded00af61563b8e344f9297ba363
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221852-71SCSW

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221852-71SCSW
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Before PR open: remove only the task-owned clean worktree/branch through the AgentPlane cleanup route and restore the previous supervisor feature boundary.
    - After PR open but before queue: close or supersede only the task PR through an authority-recorded provider action; preserve branch and review evidence.
    - While queued: release the claimed/handoff lane through the integration queue recovery operation before reverting code.
    - After merge: never rewrite protected main; create a new follow-up task/PR and let hosted close reconcile the merged SHA.
    - After hosted close: preserve closure evidence and use a new rollback release/task; cleanup only verified clean task-owned worktrees and branches.
  Findings: |-
    - Observation: ci:contract passed; workflow coverage passed 14 files/52 tests; critical CLI passed all 12 chunks; focused supervisor and lifecycle suites passed.
      Impact: Protected-main branch_pr execution now stops safely on waits, authority, stale provider state, and effect uncertainty without duplicate side effects.
      Resolution: Accept implementation commit 49f4e7c7a with durable operation receipts, zero executor lifecycle mutation coverage, and final-main/provider truth fixtures.
extensions:
  implementation_commit:
    hash: "3fd3313d8c8a45e7c36a004f07b4d9071bc3abea"
    message: "🚧 71SCSW task: bind queue wait to current head"
  workflow_route_baseline:
    start_head_sha: "b9a52b4f3fafe1d1f09f240ae376bdb2c87e729c"
    version: 1
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
### 2026-07-31T12:09:21.598Z — VERIFY — ok

By: TESTER

Note: Verified: branch_pr supervisor owns mechanical lifecycle and provider preparation while semantic episodes remain role-scoped; all declared gates passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T12:08:34.970Z, excerpt_hash=sha256:a38f1a3407037d57e61f4de991ed22561af0ace7a6acda607c2d462b937343f7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-71SCSW-extend-supervised-execution-to-branch-pr/.agentplane/tasks/202607221852-71SCSW/blueprint/resolved-snapshot.json
- old_digest: 1546fb324a2b5f29a94664925b6e887f2a66ded00af61563b8e344f9297ba363
- current_digest: 1546fb324a2b5f29a94664925b6e887f2a66ded00af61563b8e344f9297ba363
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221852-71SCSW

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221852-71SCSW
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Before PR open: remove only the task-owned clean worktree/branch through the AgentPlane cleanup route and restore the previous supervisor feature boundary.
- After PR open but before queue: close or supersede only the task PR through an authority-recorded provider action; preserve branch and review evidence.
- While queued: release the claimed/handoff lane through the integration queue recovery operation before reverting code.
- After merge: never rewrite protected main; create a new follow-up task/PR and let hosted close reconcile the merged SHA.
- After hosted close: preserve closure evidence and use a new rollback release/task; cleanup only verified clean task-owned worktrees and branches.

## Findings

- Observation: ci:contract passed; workflow coverage passed 14 files/52 tests; critical CLI passed all 12 chunks; focused supervisor and lifecycle suites passed.
  Impact: Protected-main branch_pr execution now stops safely on waits, authority, stale provider state, and effect uncertainty without duplicate side effects.
  Resolution: Accept implementation commit 49f4e7c7a with durable operation receipts, zero executor lifecycle mutation coverage, and final-main/provider truth fixtures.
