---
id: "202605211331-F6AMAP"
title: "Optimize task list read-only fast path"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "performance"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-21T13:32:16.195Z"
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
    body: "Start: Implement task list fast path in the dedicated branch_pr worktree, preserving existing rich route behavior and recording benchmark evidence."
events:
  -
    type: "status"
    at: "2026-05-21T13:33:07.219Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement task list fast path in the dedicated branch_pr worktree, preserving existing rich route behavior and recording benchmark evidence."
doc_version: 3
doc_updated_at: "2026-05-21T13:44:28.952Z"
doc_updated_by: "CODER"
description: "Reduce task list wall time by avoiding unnecessary runtime and git work when existing SQLite task projection can serve simple read-only listings."
sections:
  Summary: |-
    Optimize task list read-only fast path

    Reduce task list wall time by avoiding unnecessary runtime and git work when existing SQLite task projection can serve simple read-only listings.
  Scope: |-
    - In scope: Reduce task list wall time by avoiding unnecessary runtime and git work when existing SQLite task projection can serve simple read-only listings.
    - Out of scope: unrelated refactors not required for "Optimize task list read-only fast path".
  Plan: |-
    1. Add a narrow read-only fast path for simple local backend task list invocations that can use the existing fresh SQLite task projection without constructing the full read-only execution runtime.
    2. Preserve the current rich path for branch_pr annotations, stale-upstream warnings, strict-read behavior, non-local backends, and cases where the SQLite projection is unavailable or stale.
    3. Add focused regression coverage proving fast path parity for simple list output and fallback behavior when the projection is unavailable.
    4. Measure task list wall time before/after using the existing CLI benchmark surface and record the result.
  Verify Steps: |-
    - Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts packages/agentplane/src/cli/run-cli.core.tasks.branch-pr-list-state.test.ts
    - Command: bun run test:project -- agentplane packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend/local-task-sqlite-cache.test.ts
    - Command: bun run --filter=agentplane build
    - Command: node scripts/measure-cli-cold-path.mjs --root /Users/densmirnov/Github/agentplane --runs 5 --warmups 2 --command-id task_list --timeout-ms 10000
    - Command: node scripts/measure-cli-cold-path.mjs --root /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211331-F6AMAP-task-list-fast-path --runs 5 --warmups 2 --command-id task_list --timeout-ms 10000
    - Command: ap task list --limit 5 --quiet
    - Command: git diff --check
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Baseline task_list benchmark on base runtime measured median 1976.904 ms and avg 2576.611 ms across 5 runs with 1 warmup; earlier single cold run was 1362.263 ms.
      Impact: SQLite projection was already implemented, so the meaningful optimization target was cache freshness/runtime overhead rather than README parsing.
      Resolution: Changed task list to avoid full read-only execution context and changed local SQLite projection freshness to README mtime/size fingerprint instead of per-call git status.

    - Observation: Post-change task_list benchmark on this worktree measured min 1151.097 ms, median 1341.430 ms, avg 1317.258 ms across 5 runs with 2 warmups. Running the changed CLI against the base checkout after cache conversion measured min 746.717 ms, median 911.283 ms, avg 1105.440 ms.
      Impact: The hot path now avoids repeated git status over the task archive and has lower median wall time once the SQLite projection has a fingerprint cache key.
      Resolution: Kept full README/JSON-index fallback for missing or stale SQLite projection; no canonical task storage change.
id_source: "generated"
---
## Summary

Optimize task list read-only fast path

Reduce task list wall time by avoiding unnecessary runtime and git work when existing SQLite task projection can serve simple read-only listings.

## Scope

- In scope: Reduce task list wall time by avoiding unnecessary runtime and git work when existing SQLite task projection can serve simple read-only listings.
- Out of scope: unrelated refactors not required for "Optimize task list read-only fast path".

## Plan

1. Add a narrow read-only fast path for simple local backend task list invocations that can use the existing fresh SQLite task projection without constructing the full read-only execution runtime.
2. Preserve the current rich path for branch_pr annotations, stale-upstream warnings, strict-read behavior, non-local backends, and cases where the SQLite projection is unavailable or stale.
3. Add focused regression coverage proving fast path parity for simple list output and fallback behavior when the projection is unavailable.
4. Measure task list wall time before/after using the existing CLI benchmark surface and record the result.

## Verify Steps

- Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts packages/agentplane/src/cli/run-cli.core.tasks.branch-pr-list-state.test.ts
- Command: bun run test:project -- agentplane packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend/local-task-sqlite-cache.test.ts
- Command: bun run --filter=agentplane build
- Command: node scripts/measure-cli-cold-path.mjs --root /Users/densmirnov/Github/agentplane --runs 5 --warmups 2 --command-id task_list --timeout-ms 10000
- Command: node scripts/measure-cli-cold-path.mjs --root /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605211331-F6AMAP-task-list-fast-path --runs 5 --warmups 2 --command-id task_list --timeout-ms 10000
- Command: ap task list --limit 5 --quiet
- Command: git diff --check

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Baseline task_list benchmark on base runtime measured median 1976.904 ms and avg 2576.611 ms across 5 runs with 1 warmup; earlier single cold run was 1362.263 ms.
  Impact: SQLite projection was already implemented, so the meaningful optimization target was cache freshness/runtime overhead rather than README parsing.
  Resolution: Changed task list to avoid full read-only execution context and changed local SQLite projection freshness to README mtime/size fingerprint instead of per-call git status.

- Observation: Post-change task_list benchmark on this worktree measured min 1151.097 ms, median 1341.430 ms, avg 1317.258 ms across 5 runs with 2 warmups. Running the changed CLI against the base checkout after cache conversion measured min 746.717 ms, median 911.283 ms, avg 1105.440 ms.
  Impact: The hot path now avoids repeated git status over the task archive and has lower median wall time once the SQLite projection has a fingerprint cache key.
  Resolution: Kept full README/JSON-index fallback for missing or stale SQLite projection; no canonical task storage change.
