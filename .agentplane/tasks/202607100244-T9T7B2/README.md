---
id: "202607100244-T9T7B2"
title: "Prefer merged PR commit when reconciling included batch tasks"
result_summary: "Prefer merged PR commit for included-task reconciliation while preserving task commit and head SHA fallbacks."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
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
  state: "ok"
  updated_at: "2026-07-10T02:56:00.745Z"
  updated_by: "CODER"
  note: "Focused reconciliation regression 3/3 passed; AgentPlane typecheck, lint:core, ci:contract, and fast suite 361 files / 2,144 tests all passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-10T02:56:39.385Z"
  updated_by: "EVALUATOR"
  note: "Rebase-aware reconciliation remains correct after refreshed task and PR evidence."
  evaluated_sha: "47e34fb44dc0d32e6f13ef40ece538bea966dc05"
  blueprint_digest: "a4d3d7ec5606f10f24b3fbb9c4be4a101ffa4c367e85eccff37c412d9ab1c9c8"
  evidence_refs:
    - ".agentplane/tasks/202607100244-T9T7B2/README.md"
    - ".agentplane/tasks/202607100244-T9T7B2/quality/20260710-025639385-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607100244-T9T7B2/quality/20260710-025639385-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607100244-T9T7B2/quality/20260710-025639385-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607100244-T9T7B2/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts"
  findings:
    - "No blocking findings; current HEAD preserves merge_commit priority and tested fallback order."
commit:
  hash: "d109fffd689028ae6cb9192d0829cb1e540f1405"
  message: "✅ T9T7B2 reconciliation: record quality review"
comments:
  -
    author: "CODER"
    body: "Start: implement rebase-aware included-task reconciliation with a regression test and preserve legacy commit fallbacks."
  -
    author: "CODER"
    body: "Verified: rebase-aware reconciliation passed focused, contract, type, lint, local CI, and 2,144-test fast-suite checks; pre-merge packet is ready."
events:
  -
    type: "status"
    at: "2026-07-10T02:47:14.965Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement rebase-aware included-task reconciliation with a regression test and preserve legacy commit fallbacks."
  -
    type: "verify"
    at: "2026-07-10T02:56:00.745Z"
    author: "CODER"
    state: "ok"
    note: "Focused reconciliation regression 3/3 passed; AgentPlane typecheck, lint:core, ci:contract, and fast suite 361 files / 2,144 tests all passed."
  -
    type: "status"
    at: "2026-07-10T03:00:44.234Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: rebase-aware reconciliation passed focused, contract, type, lint, local CI, and 2,144-test fast-suite checks; pre-merge packet is ready."
doc_version: 3
doc_updated_at: "2026-07-10T03:00:44.235Z"
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
    ### 2026-07-10T02:56:00.745Z — VERIFY — ok

    By: CODER

    Note: Focused reconciliation regression 3/3 passed; AgentPlane typecheck, lint:core, ci:contract, and fast suite 361 files / 2,144 tests all passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T02:47:14.965Z, excerpt_hash=sha256:9b2dcf35871d87c5706c394b36ea3e822b46b123bf355b32d9f9c12488d3eb64

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100244-T9T7B2-prefer-merged-pr-commit-when-reconciling-include/.agentplane/tasks/202607100244-T9T7B2/blueprint/resolved-snapshot.json
    - old_digest: a4d3d7ec5606f10f24b3fbb9c4be4a101ffa4c367e85eccff37c412d9ab1c9c8
    - current_digest: a4d3d7ec5606f10f24b3fbb9c4be4a101ffa4c367e85eccff37c412d9ab1c9c8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100244-T9T7B2

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607100244-T9T7B2
    - diagnostic_command: agentplane pr check 202607100244-T9T7B2
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: declared focused, typecheck, lint, contract, and fast-suite checks. Result: pass. Evidence: 3 focused tests and 2,144 fast tests passed. Scope: merged-commit selection and repository regressions.
      Impact: Included batch tasks can reconcile after GitHub rebase merges without accepting a rewritten-away branch SHA.
      Resolution: Prefer PR merge_commit, then task commit, then head_sha; retain regression coverage.
extensions:
  implementation_commit:
    hash: "47e34fb44dc0d32e6f13ef40ece538bea966dc05"
    message: "🐛 T9T7B2 reconciliation: prefer merged PR commit"
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
### 2026-07-10T02:56:00.745Z — VERIFY — ok

By: CODER

Note: Focused reconciliation regression 3/3 passed; AgentPlane typecheck, lint:core, ci:contract, and fast suite 361 files / 2,144 tests all passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T02:47:14.965Z, excerpt_hash=sha256:9b2dcf35871d87c5706c394b36ea3e822b46b123bf355b32d9f9c12488d3eb64

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100244-T9T7B2-prefer-merged-pr-commit-when-reconciling-include/.agentplane/tasks/202607100244-T9T7B2/blueprint/resolved-snapshot.json
- old_digest: a4d3d7ec5606f10f24b3fbb9c4be4a101ffa4c367e85eccff37c412d9ab1c9c8
- current_digest: a4d3d7ec5606f10f24b3fbb9c4be4a101ffa4c367e85eccff37c412d9ab1c9c8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100244-T9T7B2

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607100244-T9T7B2
- diagnostic_command: agentplane pr check 202607100244-T9T7B2
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: declared focused, typecheck, lint, contract, and fast-suite checks. Result: pass. Evidence: 3 focused tests and 2,144 fast tests passed. Scope: merged-commit selection and repository regressions.
  Impact: Included batch tasks can reconcile after GitHub rebase merges without accepting a rewritten-away branch SHA.
  Resolution: Prefer PR merge_commit, then task commit, then head_sha; retain regression coverage.
