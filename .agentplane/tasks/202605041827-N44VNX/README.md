---
id: "202605041827-N44VNX"
title: "Make task projection cache read safe under parallel CLI"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
  - "performance"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T18:28:37.519Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T18:40:02.439Z"
  updated_by: "CODER"
  note: "Focused backend cache tests, task list smoke, typecheck, formatting, and lint passed for read-safe projection cache behavior."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement read-safe projection cache behavior in the same approved performance batch worktree owned by the primary task branch."
events:
  -
    type: "status"
    at: "2026-05-04T18:29:25.993Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement read-safe projection cache behavior in the same approved performance batch worktree owned by the primary task branch."
  -
    type: "verify"
    at: "2026-05-04T18:40:02.439Z"
    author: "CODER"
    state: "ok"
    note: "Focused backend cache tests, task list smoke, typecheck, formatting, and lint passed for read-safe projection cache behavior."
doc_version: 3
doc_updated_at: "2026-05-04T18:40:02.446Z"
doc_updated_by: "CODER"
description: "Prevent read-heavy commands from contending on task projection cache writes by separating read-only projection reads from explicit cache rebuilds and preserving correctness on stale cache fallback."
sections:
  Summary: |-
    Make task projection cache read safe under parallel CLI
    
    Prevent read-heavy commands from contending on task projection cache writes by separating read-only projection reads from explicit cache rebuilds and preserving correctness on stale cache fallback.
  Scope: |-
    - In scope: Prevent read-heavy commands from contending on task projection cache writes by separating read-only projection reads from explicit cache rebuilds and preserving correctness on stale cache fallback.
    - Out of scope: unrelated refactors not required for "Make task projection cache read safe under parallel CLI".
  Plan: "1. Inspect local projection cache read/write behavior for listProjectionTasks and listTasks. 2. Introduce a read-only projection path or cache write guard so read-heavy commands do not rewrite cache during normal reads. 3. Preserve explicit index rebuild behavior and stale-cache correctness. 4. Add focused backend tests for stale cache fallback and no cache rewrite in read-only flows."
  Verify Steps: |-
    1. Run focused local backend task-index tests. Expected: read-only projection reads do not rewrite a valid cache and stale cache fallback remains correct.
    2. Run task list on this repository. Expected: output succeeds and remains projection-backed.
    3. Run TypeScript/typecheck for changed backend paths. Expected: no type errors.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T18:40:02.439Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused backend cache tests, task list smoke, typecheck, formatting, and lint passed for read-safe projection cache behavior.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:29:25.993Z, excerpt_hash=sha256:75c41ef4b222c639f17aee129e83b887966c0077051a45432eea4ba6181d3fb6
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local.test.ts; Result: pass; Evidence: 28 tests passed. Command: agentplane task list --status TODO; Result: pass; Evidence: Total: 3 TODO tasks. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bunx eslint changed backend/test files; Result: pass; Evidence: eslint exited 0.
      Impact: Read-heavy projection commands no longer rebuild or rewrite the task index cache as a side effect, reducing parallel CLI cache contention.
      Resolution: Added writeIndex control to listLocalTasks and made LocalBackend.listProjectionTasks use read-only cache behavior; explicit listTasks/rebuild-index still writes cache.
id_source: "generated"
---
## Summary

Make task projection cache read safe under parallel CLI

Prevent read-heavy commands from contending on task projection cache writes by separating read-only projection reads from explicit cache rebuilds and preserving correctness on stale cache fallback.

## Scope

- In scope: Prevent read-heavy commands from contending on task projection cache writes by separating read-only projection reads from explicit cache rebuilds and preserving correctness on stale cache fallback.
- Out of scope: unrelated refactors not required for "Make task projection cache read safe under parallel CLI".

## Plan

1. Inspect local projection cache read/write behavior for listProjectionTasks and listTasks. 2. Introduce a read-only projection path or cache write guard so read-heavy commands do not rewrite cache during normal reads. 3. Preserve explicit index rebuild behavior and stale-cache correctness. 4. Add focused backend tests for stale cache fallback and no cache rewrite in read-only flows.

## Verify Steps

1. Run focused local backend task-index tests. Expected: read-only projection reads do not rewrite a valid cache and stale cache fallback remains correct.
2. Run task list on this repository. Expected: output succeeds and remains projection-backed.
3. Run TypeScript/typecheck for changed backend paths. Expected: no type errors.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T18:40:02.439Z — VERIFY — ok

By: CODER

Note: Focused backend cache tests, task list smoke, typecheck, formatting, and lint passed for read-safe projection cache behavior.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:29:25.993Z, excerpt_hash=sha256:75c41ef4b222c639f17aee129e83b887966c0077051a45432eea4ba6181d3fb6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local.test.ts; Result: pass; Evidence: 28 tests passed. Command: agentplane task list --status TODO; Result: pass; Evidence: Total: 3 TODO tasks. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: bunx eslint changed backend/test files; Result: pass; Evidence: eslint exited 0.
  Impact: Read-heavy projection commands no longer rebuild or rewrite the task index cache as a side effect, reducing parallel CLI cache contention.
  Resolution: Added writeIndex control to listLocalTasks and made LocalBackend.listProjectionTasks use read-only cache behavior; explicit listTasks/rebuild-index still writes cache.
