---
id: "202607101059-S3N0X5"
title: "Recover queue lanes after merged PR branch deletion"
result_summary: "Protected-main queue recovery now survives deleted merged PR branches without masking stale handoff lanes."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "post-merge-followup"
  - "release-blocker"
  - "v0.6.22"
verify:
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts packages/agentplane/src/commands/pr/flow-status.pre-merge.test.ts packages/agentplane/src/commands/pr/internal/sync-github.test.ts packages/agentplane/src/commands/integrate-queue-lane.test.ts packages/agentplane/src/commands/integrate-queue-recovery.test.ts"
  - "bun run typecheck"
  - "bun run lint:core"
  - "bun run ci:contract"
  - "bun run test:fast"
  - "node .agentplane/policy/check-routing.mjs"
  - "ap doctor"
plan_approval:
  state: "approved"
  updated_at: "2026-07-10T10:59:27.319Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-10T11:26:02.468Z"
  updated_by: "REVIEWER"
  note: "Review follow-up verified: queue-only OPEN fallback is restricted to queued entries; handoff without authoritative PR evidence remains not_found for recovery. Focused suite passed (3 files, 14 tests), typecheck and lint:core passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-10T11:26:04.830Z"
  updated_by: "EVALUATOR"
  note: "Review follow-up preserves queued pre-merge safety without masking stale handoff lanes."
  evaluated_sha: "b594b8e9a1b29c1813b3c3dfbdbba4d8dbd97a8c"
  blueprint_digest: "fbb7a80b15d0ad2460b867548da199a0873c9279bc5c21640671a30ac1a6ff7d"
  evidence_refs:
    - ".agentplane/tasks/202607101059-S3N0X5/README.md"
    - ".agentplane/tasks/202607101059-S3N0X5/quality/20260710-112604830-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607101059-S3N0X5/quality/20260710-112604830-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607101059-S3N0X5/quality/20260710-112604830-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607101059-S3N0X5/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/pr/flow-status.ts"
    - "packages/agentplane/src/cli/run-cli.core.pr-flow.status.test.ts"
  findings:
    - "Queue-only PR identity is trusted conservatively only while status is queued; handoff entries still require authoritative provider or task metadata and remain recoverable when absent."
commit:
  hash: "b594b8e9a1b29c1813b3c3dfbdbba4d8dbd97a8c"
  message: "🐛 S3N0X5 task: keep handoff recovery strict"
comments:
  -
    author: "CODER"
    body: "Start: fix authoritative PR identity lookup and queue recovery regressions for v0.6.22."
  -
    author: "INTEGRATOR"
    body: "Verified: PR-number recovery, queued-task fallback, strict handoff recovery, review follow-up, local CI, hosted checks, and evaluator evidence all pass."
events:
  -
    type: "status"
    at: "2026-07-10T10:59:31.847Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix authoritative PR identity lookup and queue recovery regressions for v0.6.22."
  -
    type: "verify"
    at: "2026-07-10T11:17:33.373Z"
    author: "REVIEWER"
    state: "ok"
    note: "Focused PR-flow/queue tests passed (5 files, 17 tests); typecheck, lint:core, ci:contract, test:fast (364 files, 2150 tests), policy routing, doctor, and full-fast local CI passed. Number lookup validates head/base; queue identity fallback is conservative."
  -
    type: "verify"
    at: "2026-07-10T11:26:02.468Z"
    author: "REVIEWER"
    state: "ok"
    note: "Review follow-up verified: queue-only OPEN fallback is restricted to queued entries; handoff without authoritative PR evidence remains not_found for recovery. Focused suite passed (3 files, 14 tests), typecheck and lint:core passed."
  -
    type: "status"
    at: "2026-07-10T11:32:22.115Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR-number recovery, queued-task fallback, strict handoff recovery, review follow-up, local CI, hosted checks, and evaluator evidence all pass."
doc_version: 3
doc_updated_at: "2026-07-10T11:32:22.116Z"
doc_updated_by: "INTEGRATOR"
description: "Make branch_pr queue recovery resolve authoritative GitHub PR state by persisted PR number when the remote head branch has been deleted, validate branch/base identity, and prevent false missing-PR diagnostics for queued pre-merge-closed tasks whose artifacts are not yet on main."
sections:
  Summary: |-
    Recover queue lanes after merged PR branch deletion

    Make branch_pr queue recovery resolve authoritative GitHub PR state by persisted PR number when the remote head branch has been deleted, validate branch/base identity, and prevent false missing-PR diagnostics for queued pre-merge-closed tasks whose artifacts are not yet on main.
  Scope: |-
    - In scope: Make branch_pr queue recovery resolve authoritative GitHub PR state by persisted PR number when the remote head branch has been deleted, validate branch/base identity, and prevent false missing-PR diagnostics for queued pre-merge-closed tasks whose artifacts are not yet on main.
    - Out of scope: unrelated refactors not required for "Recover queue lanes after merged PR branch deletion".
  Plan: "1. Add an authoritative GitHub PR lookup by persisted PR number with expected head branch and base validation. 2. Use persisted queue identity when task PR artifacts are not yet present on the base checkout, while preserving metadata and branch lookup fallbacks. 3. Add regression tests for deleted merged head branches, mismatched identities, and queued pre-merge-closed tasks. 4. Verify focused tests, typecheck, lint, CI contracts, policy routing, doctor, and the live A932-to-D7 queue handoff. 5. Update the v0.6.22 release plan and dependency graph, then merge through the protected-main flow."
  Verify Steps: |-
    1. Run the focused PR-flow and integration-queue test set. Expected: merged PRs remain discoverable after head-branch deletion, mismatched identities are rejected, and queued pre-merge tasks are not reported missing.
    2. Run bun run typecheck and bun run lint:core. Expected: no type or lint regressions.
    3. Run bun run ci:contract and bun run test:fast. Expected: repository contracts and the full fast suite pass.
    4. Run node .agentplane/policy/check-routing.mjs and ap doctor. Expected: policy routing and repository diagnostics pass.
    5. After merge, run ap integrate queue list and ap integrate queue run-next from the main checkout. Expected: A932 is normalized to done automatically and D7 becomes claimable without manual release.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-10T11:17:33.373Z — VERIFY — ok

    By: REVIEWER

    Note: Focused PR-flow/queue tests passed (5 files, 17 tests); typecheck, lint:core, ci:contract, test:fast (364 files, 2150 tests), policy routing, doctor, and full-fast local CI passed. Number lookup validates head/base; queue identity fallback is conservative.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T11:08:24.291Z, excerpt_hash=sha256:e212f9ef29de93e92c37c767f3358c8e12e651d2a154a9541fdbfaaa71d897a3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607101059-S3N0X5-recover-queue-lanes-after-merged-pr-branch-delet/.agentplane/tasks/202607101059-S3N0X5/blueprint/resolved-snapshot.json
    - old_digest: fbb7a80b15d0ad2460b867548da199a0873c9279bc5c21640671a30ac1a6ff7d
    - current_digest: fbb7a80b15d0ad2460b867548da199a0873c9279bc5c21640671a30ac1a6ff7d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607101059-S3N0X5

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607101059-S3N0X5 --branch task/202607101059-S3N0X5/recover-queue-lanes-after-merged-pr-branch-delet
    - diagnostic_command: agentplane pr check 202607101059-S3N0X5
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-07-10T11:26:02.468Z — VERIFY — ok

    By: REVIEWER

    Note: Review follow-up verified: queue-only OPEN fallback is restricted to queued entries; handoff without authoritative PR evidence remains not_found for recovery. Focused suite passed (3 files, 14 tests), typecheck and lint:core passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T11:17:33.613Z, excerpt_hash=sha256:e212f9ef29de93e92c37c767f3358c8e12e651d2a154a9541fdbfaaa71d897a3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607101059-S3N0X5-recover-queue-lanes-after-merged-pr-branch-delet/.agentplane/tasks/202607101059-S3N0X5/blueprint/resolved-snapshot.json
    - old_digest: fbb7a80b15d0ad2460b867548da199a0873c9279bc5c21640671a30ac1a6ff7d
    - current_digest: fbb7a80b15d0ad2460b867548da199a0873c9279bc5c21640671a30ac1a6ff7d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607101059-S3N0X5

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane evaluator run 202607101059-S3N0X5 --verdict pass --summary Quality review passed. --finding No blocking findings. --evidence .agentplane/tasks/202607101059-S3N0X5/README.md
    - diagnostic_command: agentplane evaluator run 202607101059-S3N0X5 --verdict pass --summary "Quality review passed." --finding "No blocking findings." --evidence .agentplane/tasks/202607101059-S3N0X5/README.md
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    Confirmed root cause: GitHub deletes the merged PR head branch, while flow status previously queried only by branch and then trusted stale OPEN metadata. Queue diagnostics also lacked task-local PR metadata before the task artifacts reached main. Resolution: prefer a persisted-number lookup validated against expected head/base, fall back to branch lookup, and use queue identity conservatively when base metadata is absent. Local verification passed: 5 focused files / 17 tests, typecheck, lint:core, ci:contract, test:fast (364 files / 2150 tests), policy routing, and doctor. Remaining live acceptance: merge this task, then prove A932 auto-normalizes and D7 becomes claimable without manual queue release.

    - Observation: Branch-only lookup lost merged PR identity after GitHub deleted the head branch, and base checkout lacked unmerged task PR metadata.
      Impact: The integration lane stayed in handoff and doctor falsely reported the next queued PR as missing.
      Resolution: Resolve persisted PR numbers authoritatively with branch/base validation and fall back to queue identity before declaring a PR missing.

    - Observation: Queue metadata fallback also applied to handoff entries when provider lookup failed.
      Impact: A missing or inaccessible handoff PR could retain the integration lane indefinitely.
      Resolution: Restrict conservative queue fallback to queued pre-merge tasks and add a handoff regression assertion.
extensions:
  implementation_commit:
    hash: "b594b8e9a1b29c1813b3c3dfbdbba4d8dbd97a8c"
    message: "🐛 S3N0X5 task: keep handoff recovery strict"
id_source: "generated"
---
## Summary

Recover queue lanes after merged PR branch deletion

Make branch_pr queue recovery resolve authoritative GitHub PR state by persisted PR number when the remote head branch has been deleted, validate branch/base identity, and prevent false missing-PR diagnostics for queued pre-merge-closed tasks whose artifacts are not yet on main.

## Scope

- In scope: Make branch_pr queue recovery resolve authoritative GitHub PR state by persisted PR number when the remote head branch has been deleted, validate branch/base identity, and prevent false missing-PR diagnostics for queued pre-merge-closed tasks whose artifacts are not yet on main.
- Out of scope: unrelated refactors not required for "Recover queue lanes after merged PR branch deletion".

## Plan

1. Add an authoritative GitHub PR lookup by persisted PR number with expected head branch and base validation. 2. Use persisted queue identity when task PR artifacts are not yet present on the base checkout, while preserving metadata and branch lookup fallbacks. 3. Add regression tests for deleted merged head branches, mismatched identities, and queued pre-merge-closed tasks. 4. Verify focused tests, typecheck, lint, CI contracts, policy routing, doctor, and the live A932-to-D7 queue handoff. 5. Update the v0.6.22 release plan and dependency graph, then merge through the protected-main flow.

## Verify Steps

1. Run the focused PR-flow and integration-queue test set. Expected: merged PRs remain discoverable after head-branch deletion, mismatched identities are rejected, and queued pre-merge tasks are not reported missing.
2. Run bun run typecheck and bun run lint:core. Expected: no type or lint regressions.
3. Run bun run ci:contract and bun run test:fast. Expected: repository contracts and the full fast suite pass.
4. Run node .agentplane/policy/check-routing.mjs and ap doctor. Expected: policy routing and repository diagnostics pass.
5. After merge, run ap integrate queue list and ap integrate queue run-next from the main checkout. Expected: A932 is normalized to done automatically and D7 becomes claimable without manual release.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-10T11:17:33.373Z — VERIFY — ok

By: REVIEWER

Note: Focused PR-flow/queue tests passed (5 files, 17 tests); typecheck, lint:core, ci:contract, test:fast (364 files, 2150 tests), policy routing, doctor, and full-fast local CI passed. Number lookup validates head/base; queue identity fallback is conservative.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T11:08:24.291Z, excerpt_hash=sha256:e212f9ef29de93e92c37c767f3358c8e12e651d2a154a9541fdbfaaa71d897a3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607101059-S3N0X5-recover-queue-lanes-after-merged-pr-branch-delet/.agentplane/tasks/202607101059-S3N0X5/blueprint/resolved-snapshot.json
- old_digest: fbb7a80b15d0ad2460b867548da199a0873c9279bc5c21640671a30ac1a6ff7d
- current_digest: fbb7a80b15d0ad2460b867548da199a0873c9279bc5c21640671a30ac1a6ff7d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607101059-S3N0X5

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607101059-S3N0X5 --branch task/202607101059-S3N0X5/recover-queue-lanes-after-merged-pr-branch-delet
- diagnostic_command: agentplane pr check 202607101059-S3N0X5
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-07-10T11:26:02.468Z — VERIFY — ok

By: REVIEWER

Note: Review follow-up verified: queue-only OPEN fallback is restricted to queued entries; handoff without authoritative PR evidence remains not_found for recovery. Focused suite passed (3 files, 14 tests), typecheck and lint:core passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T11:17:33.613Z, excerpt_hash=sha256:e212f9ef29de93e92c37c767f3358c8e12e651d2a154a9541fdbfaaa71d897a3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607101059-S3N0X5-recover-queue-lanes-after-merged-pr-branch-delet/.agentplane/tasks/202607101059-S3N0X5/blueprint/resolved-snapshot.json
- old_digest: fbb7a80b15d0ad2460b867548da199a0873c9279bc5c21640671a30ac1a6ff7d
- current_digest: fbb7a80b15d0ad2460b867548da199a0873c9279bc5c21640671a30ac1a6ff7d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607101059-S3N0X5

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane evaluator run 202607101059-S3N0X5 --verdict pass --summary Quality review passed. --finding No blocking findings. --evidence .agentplane/tasks/202607101059-S3N0X5/README.md
- diagnostic_command: agentplane evaluator run 202607101059-S3N0X5 --verdict pass --summary "Quality review passed." --finding "No blocking findings." --evidence .agentplane/tasks/202607101059-S3N0X5/README.md
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Confirmed root cause: GitHub deletes the merged PR head branch, while flow status previously queried only by branch and then trusted stale OPEN metadata. Queue diagnostics also lacked task-local PR metadata before the task artifacts reached main. Resolution: prefer a persisted-number lookup validated against expected head/base, fall back to branch lookup, and use queue identity conservatively when base metadata is absent. Local verification passed: 5 focused files / 17 tests, typecheck, lint:core, ci:contract, test:fast (364 files / 2150 tests), policy routing, and doctor. Remaining live acceptance: merge this task, then prove A932 auto-normalizes and D7 becomes claimable without manual queue release.

- Observation: Branch-only lookup lost merged PR identity after GitHub deleted the head branch, and base checkout lacked unmerged task PR metadata.
  Impact: The integration lane stayed in handoff and doctor falsely reported the next queued PR as missing.
  Resolution: Resolve persisted PR numbers authoritatively with branch/base validation and fall back to queue identity before declaring a PR missing.

- Observation: Queue metadata fallback also applied to handoff entries when provider lookup failed.
  Impact: A missing or inaccessible handoff PR could retain the integration lane indefinitely.
  Resolution: Restrict conservative queue fallback to queued pre-merge tasks and add a handoff regression assertion.
