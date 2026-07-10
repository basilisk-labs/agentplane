---
id: "202607100404-WPRBVK"
title: "Make doctor batch consistency rebase-aware"
result_summary: "Removed false batch warnings for both current and branchless legacy merged PR metadata."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 15
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "doctor"
  - "reconciliation"
  - "release-0.6.22"
verify:
  - "bun run ci:contract"
  - "bun run lint:core"
  - "bun run test:fast"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/doctor.command.open-pr.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-07-10T04:09:19.762Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-10T04:26:46.784Z"
  updated_by: "CODER"
  note: "Review fix pass: branchless MERGED metadata keeps merge_commit authoritative; focused doctor tests 14/14, typecheck, lint:core, ci:contract, and full fast suite pass."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-10T04:27:12.246Z"
  updated_by: "EVALUATOR"
  note: "Doctor remains rebase-aware for both current and branchless legacy MERGED PR metadata."
  evaluated_sha: "aa92f67e7bc0968ba5298ac5e21b741b44c208f0"
  blueprint_digest: "394824c048ea615d12625ab64d5cb51bf8663e6b1ec9c90b3b82aa94254bee32"
  evidence_refs:
    - ".agentplane/tasks/202607100404-WPRBVK/README.md"
    - ".agentplane/tasks/202607100404-WPRBVK/quality/20260710-042712246-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607100404-WPRBVK/quality/20260710-042712246-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607100404-WPRBVK/quality/20260710-042712246-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607100404-WPRBVK/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/doctor.branch-pr.batch.test.ts"
    - "packages/agentplane/src/commands/doctor/branch-pr.ts"
  findings:
    - "No blocking findings; direct merge_commit fallback precedes stale task/head SHA, the branchless regression passes, and focused, type, lint, contract, and full fast checks are green."
commit:
  hash: "aa92f67e7bc0968ba5298ac5e21b741b44c208f0"
  message: "🐛 WPRBVK doctor: preserve branchless merge fallback"
comments:
  -
    author: "CODER"
    body: "Start: make doctor compare included batch closure with the authoritative landed commit from MERGED primary PR metadata after rebase."
  -
    author: "CODER"
    body: "Verified: doctor resolves branch_pr batch consistency from the landed MERGED PR commit after rebase, with focused and full regression coverage."
  -
    author: "CODER"
    body: "Verified: review fix preserves authoritative merge_commit for branchless MERGED metadata with refreshed regression evidence."
events:
  -
    type: "status"
    at: "2026-07-10T04:04:49.094Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make doctor compare included batch closure with the authoritative landed commit from MERGED primary PR metadata after rebase."
  -
    type: "verify"
    at: "2026-07-10T04:11:51.449Z"
    author: "CODER"
    state: "ok"
    note: "Pass: focused doctor tests 14/14; typecheck; lint:core; ci:contract; full fast suite; hotspot baseline; policy routing; diff validation; live doctor exits OK without the false batch-consistency warning."
  -
    type: "status"
    at: "2026-07-10T04:12:25.977Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: doctor resolves branch_pr batch consistency from the landed MERGED PR commit after rebase, with focused and full regression coverage."
  -
    type: "verify"
    at: "2026-07-10T04:26:46.784Z"
    author: "CODER"
    state: "ok"
    note: "Review fix pass: branchless MERGED metadata keeps merge_commit authoritative; focused doctor tests 14/14, typecheck, lint:core, ci:contract, and full fast suite pass."
  -
    type: "status"
    at: "2026-07-10T04:27:17.214Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: review fix preserves authoritative merge_commit for branchless MERGED metadata with refreshed regression evidence."
doc_version: 3
doc_updated_at: "2026-07-10T04:27:17.214Z"
doc_updated_by: "CODER"
description: "For v0.6.22, make branch_pr batch consistency diagnostics compare included task commits with the authoritative landed merge_commit from MERGED primary PR metadata before falling back to the primary task commit."
sections:
  Summary: |-
    Make doctor batch consistency rebase-aware

    For v0.6.22, make branch_pr batch consistency diagnostics compare included task commits with the authoritative landed merge_commit from MERGED primary PR metadata before falling back to the primary task commit.
  Scope: |-
    - In scope: For v0.6.22, make branch_pr batch consistency diagnostics compare included task commits with the authoritative landed merge_commit from MERGED primary PR metadata before falling back to the primary task commit.
    - Out of scope: unrelated refactors not required for "Make doctor batch consistency rebase-aware".
  Plan: |-
    1. Add a doctor regression where the primary task records a pre-rebase implementation SHA while MERGED PR metadata and the included task record the landed commit.
    2. Resolve the primary landed commit from authoritative MERGED PR metadata before task-commit and head-SHA fallbacks.
    3. Preserve warnings when included tasks are open, missing, or closed on a different landed commit.
    4. Replace the matching doctor follow-up placeholder in docs/internal/v0.6.22-refactor-plan.md with this task id and keep the release task dependent on it.
    5. Run focused doctor tests, typecheck, lint:core, ci:contract, the full fast suite, policy routing, and doctor.
  Verify Steps: |-
    1. `bunx vitest run packages/agentplane/src/commands/doctor.branch-pr.batch.test.ts packages/agentplane/src/commands/doctor.command.open-pr.test.ts`
    2. `bun run typecheck`
    3. `bun run lint:core`
    4. `bun run ci:contract`
    5. `bun run test:fast`
    6. `node .agentplane/policy/check-routing.mjs`
    7. `ap doctor`
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-10T04:11:51.449Z — VERIFY — ok

    By: CODER

    Note: Pass: focused doctor tests 14/14; typecheck; lint:core; ci:contract; full fast suite; hotspot baseline; policy routing; diff validation; live doctor exits OK without the false batch-consistency warning.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T04:09:19.434Z, excerpt_hash=sha256:ab089f6d66391fc091abe1ee79a965a181ecde23a0a987e908266d0484c4a25f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100404-WPRBVK-make-doctor-batch-consistency-rebase-aware/.agentplane/tasks/202607100404-WPRBVK/blueprint/resolved-snapshot.json
    - old_digest: 394824c048ea615d12625ab64d5cb51bf8663e6b1ec9c90b3b82aa94254bee32
    - current_digest: 394824c048ea615d12625ab64d5cb51bf8663e6b1ec9c90b3b82aa94254bee32
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100404-WPRBVK

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607100404-WPRBVK
    - diagnostic_command: agentplane pr check 202607100404-WPRBVK
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-07-10T04:26:46.784Z — VERIFY — ok

    By: CODER

    Note: Review fix pass: branchless MERGED metadata keeps merge_commit authoritative; focused doctor tests 14/14, typecheck, lint:core, ci:contract, and full fast suite pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T04:12:25.978Z, excerpt_hash=sha256:ab089f6d66391fc091abe1ee79a965a181ecde23a0a987e908266d0484c4a25f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100404-WPRBVK-make-doctor-batch-consistency-rebase-aware/.agentplane/tasks/202607100404-WPRBVK/blueprint/resolved-snapshot.json
    - old_digest: 394824c048ea615d12625ab64d5cb51bf8663e6b1ec9c90b3b82aa94254bee32
    - current_digest: 394824c048ea615d12625ab64d5cb51bf8663e6b1ec9c90b3b82aa94254bee32
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100404-WPRBVK

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607100404-WPRBVK --branch task/202607100404-WPRBVK/make-doctor-batch-consistency-rebase-aware
    - diagnostic_command: agentplane pr check 202607100404-WPRBVK
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Doctor preferred the primary task implementation SHA over MERGED PR metadata, so a GitHub rebase made a correctly reconciled included task look inconsistent.
      Impact: Operators received a false hosted-close recovery warning even though primary and included tasks were already closed on the landed main commit.
      Resolution: Doctor now prefers authoritative MERGED PR merge_commit, with task commit and head SHA only as fallbacks; a dedicated regression preserves the oversized-test baseline.

    - Observation: MERGED metadata without branch bypassed resolveLocalMergedPrMeta and could fall back to a stale pre-rebase task SHA.
      Impact: Legacy branchless PR metadata could still produce the same false batch-consistency warning.
      Resolution: Added direct merge_commit fallback before task/head SHA and converted the regression to a branchless MERGED fixture.
extensions:
  implementation_commit:
    hash: "aa92f67e7bc0968ba5298ac5e21b741b44c208f0"
    message: "🐛 WPRBVK doctor: preserve branchless merge fallback"
id_source: "generated"
---
## Summary

Make doctor batch consistency rebase-aware

For v0.6.22, make branch_pr batch consistency diagnostics compare included task commits with the authoritative landed merge_commit from MERGED primary PR metadata before falling back to the primary task commit.

## Scope

- In scope: For v0.6.22, make branch_pr batch consistency diagnostics compare included task commits with the authoritative landed merge_commit from MERGED primary PR metadata before falling back to the primary task commit.
- Out of scope: unrelated refactors not required for "Make doctor batch consistency rebase-aware".

## Plan

1. Add a doctor regression where the primary task records a pre-rebase implementation SHA while MERGED PR metadata and the included task record the landed commit.
2. Resolve the primary landed commit from authoritative MERGED PR metadata before task-commit and head-SHA fallbacks.
3. Preserve warnings when included tasks are open, missing, or closed on a different landed commit.
4. Replace the matching doctor follow-up placeholder in docs/internal/v0.6.22-refactor-plan.md with this task id and keep the release task dependent on it.
5. Run focused doctor tests, typecheck, lint:core, ci:contract, the full fast suite, policy routing, and doctor.

## Verify Steps

1. `bunx vitest run packages/agentplane/src/commands/doctor.branch-pr.batch.test.ts packages/agentplane/src/commands/doctor.command.open-pr.test.ts`
2. `bun run typecheck`
3. `bun run lint:core`
4. `bun run ci:contract`
5. `bun run test:fast`
6. `node .agentplane/policy/check-routing.mjs`
7. `ap doctor`

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-10T04:11:51.449Z — VERIFY — ok

By: CODER

Note: Pass: focused doctor tests 14/14; typecheck; lint:core; ci:contract; full fast suite; hotspot baseline; policy routing; diff validation; live doctor exits OK without the false batch-consistency warning.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T04:09:19.434Z, excerpt_hash=sha256:ab089f6d66391fc091abe1ee79a965a181ecde23a0a987e908266d0484c4a25f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100404-WPRBVK-make-doctor-batch-consistency-rebase-aware/.agentplane/tasks/202607100404-WPRBVK/blueprint/resolved-snapshot.json
- old_digest: 394824c048ea615d12625ab64d5cb51bf8663e6b1ec9c90b3b82aa94254bee32
- current_digest: 394824c048ea615d12625ab64d5cb51bf8663e6b1ec9c90b3b82aa94254bee32
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100404-WPRBVK

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607100404-WPRBVK
- diagnostic_command: agentplane pr check 202607100404-WPRBVK
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-07-10T04:26:46.784Z — VERIFY — ok

By: CODER

Note: Review fix pass: branchless MERGED metadata keeps merge_commit authoritative; focused doctor tests 14/14, typecheck, lint:core, ci:contract, and full fast suite pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T04:12:25.978Z, excerpt_hash=sha256:ab089f6d66391fc091abe1ee79a965a181ecde23a0a987e908266d0484c4a25f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100404-WPRBVK-make-doctor-batch-consistency-rebase-aware/.agentplane/tasks/202607100404-WPRBVK/blueprint/resolved-snapshot.json
- old_digest: 394824c048ea615d12625ab64d5cb51bf8663e6b1ec9c90b3b82aa94254bee32
- current_digest: 394824c048ea615d12625ab64d5cb51bf8663e6b1ec9c90b3b82aa94254bee32
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100404-WPRBVK

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607100404-WPRBVK --branch task/202607100404-WPRBVK/make-doctor-batch-consistency-rebase-aware
- diagnostic_command: agentplane pr check 202607100404-WPRBVK
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Doctor preferred the primary task implementation SHA over MERGED PR metadata, so a GitHub rebase made a correctly reconciled included task look inconsistent.
  Impact: Operators received a false hosted-close recovery warning even though primary and included tasks were already closed on the landed main commit.
  Resolution: Doctor now prefers authoritative MERGED PR merge_commit, with task commit and head SHA only as fallbacks; a dedicated regression preserves the oversized-test baseline.

- Observation: MERGED metadata without branch bypassed resolveLocalMergedPrMeta and could fall back to a stale pre-rebase task SHA.
  Impact: Legacy branchless PR metadata could still produce the same false batch-consistency warning.
  Resolution: Added direct merge_commit fallback before task/head SHA and converted the regression to a branchless MERGED fixture.
