---
id: "202607101059-S3N0X5"
title: "Recover queue lanes after merged PR branch deletion"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fix authoritative PR identity lookup and queue recovery regressions for v0.6.22."
events:
  -
    type: "status"
    at: "2026-07-10T10:59:31.847Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix authoritative PR identity lookup and queue recovery regressions for v0.6.22."
doc_version: 3
doc_updated_at: "2026-07-10T11:08:24.291Z"
doc_updated_by: "CODER"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "Confirmed root cause: GitHub deletes the merged PR head branch, while flow status previously queried only by branch and then trusted stale OPEN metadata. Queue diagnostics also lacked task-local PR metadata before the task artifacts reached main. Resolution: prefer a persisted-number lookup validated against expected head/base, fall back to branch lookup, and use queue identity conservatively when base metadata is absent. Local verification passed: 5 focused files / 17 tests, typecheck, lint:core, ci:contract, test:fast (364 files / 2150 tests), policy routing, and doctor. Remaining live acceptance: merge this task, then prove A932 auto-normalizes and D7 becomes claimable without manual queue release."
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Confirmed root cause: GitHub deletes the merged PR head branch, while flow status previously queried only by branch and then trusted stale OPEN metadata. Queue diagnostics also lacked task-local PR metadata before the task artifacts reached main. Resolution: prefer a persisted-number lookup validated against expected head/base, fall back to branch lookup, and use queue identity conservatively when base metadata is absent. Local verification passed: 5 focused files / 17 tests, typecheck, lint:core, ci:contract, test:fast (364 files / 2150 tests), policy routing, and doctor. Remaining live acceptance: merge this task, then prove A932 auto-normalizes and D7 becomes claimable without manual queue release.
