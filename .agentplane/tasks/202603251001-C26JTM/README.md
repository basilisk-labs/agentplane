---
id: "202603251001-C26JTM"
title: "Make tasks-index a rebuildable cache and remove it from tracked workflow"
result_summary: "Integrated on main with the stacked branch_pr merge rooted at 202603250902-4PCA8P."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603250902-4PCA8P"
tags:
  - "code"
  - "workflow"
  - "backend"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-25T10:03:14.298Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-25T10:21:31.337Z"
  updated_by: "CODER"
  note: "Verified: bunx vitest run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx prettier --check packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; bunx eslint packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; agentplane task rebuild-index. Result: pass. Evidence: close flow no longer special-cases tasks-index, local backend rebuilds a missing or corrupt index, and branch_pr fixture repos now ignore .agentplane/cache so integrate/cleanup do not depend on committing cache artifacts. Scope: rebuildable cache contract only."
commit:
  hash: "a8c2915726dc48b2bf69dc87c560dc5a3e0fe742"
  message: "🧩 4PCA8P integrate: squash task/202603250902-4PCA8P/integrate-close-artifacts"
comments:
  -
    author: "CODER"
    body: "Start: converting tasks-index.v2.json into a rebuildable cache on top of dependency 4PCA8P; execution stays stacked on the current task branch so cache-contract cleanup lands with the branch_pr integrate changes it depends on."
  -
    author: "INTEGRATOR"
    body: "Verified: merged on main via the stacked integrate flow rooted at 202603250902-4PCA8P; the rebuildable-cache change landed in commit a8c2915726dc and the recorded verification evidence remains valid on base."
events:
  -
    type: "status"
    at: "2026-03-25T10:03:45.570Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: converting tasks-index.v2.json into a rebuildable cache on top of dependency 4PCA8P; execution stays stacked on the current task branch so cache-contract cleanup lands with the branch_pr integrate changes it depends on."
  -
    type: "verify"
    at: "2026-03-25T10:21:31.337Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bunx vitest run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx prettier --check packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; bunx eslint packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; agentplane task rebuild-index. Result: pass. Evidence: close flow no longer special-cases tasks-index, local backend rebuilds a missing or corrupt index, and branch_pr fixture repos now ignore .agentplane/cache so integrate/cleanup do not depend on committing cache artifacts. Scope: rebuildable cache contract only."
  -
    type: "status"
    at: "2026-03-25T12:20:19.470Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: merged on main via the stacked integrate flow rooted at 202603250902-4PCA8P; the rebuildable-cache change landed in commit a8c2915726dc and the recorded verification evidence remains valid on base."
doc_version: 3
doc_updated_at: "2026-03-25T12:20:19.470Z"
doc_updated_by: "INTEGRATOR"
description: "Turn .agentplane/cache/tasks-index.v2.json into a non-canonical rebuildable cache, remove it from close/integrate staging contracts, and harden rebuild/read-through behavior on fresh or stale checkouts."
sections:
  Summary: |-
    Make tasks-index a rebuildable cache and remove it from tracked workflow
    
    Turn .agentplane/cache/tasks-index.v2.json into a non-canonical rebuildable cache, remove it from close/integrate staging contracts, and harden rebuild/read-through behavior on fresh or stale checkouts.
  Scope: |-
    - In scope: Turn .agentplane/cache/tasks-index.v2.json into a non-canonical rebuildable cache, remove it from close/integrate staging contracts, and harden rebuild/read-through behavior on fresh or stale checkouts.
    - Out of scope: unrelated refactors not required for "Make tasks-index a rebuildable cache and remove it from tracked workflow".
  Plan: |-
    1. Audit all task-index read/write and git-flow touchpoints, including local backend writes, branch_pr close/integrate staging, and rebuild/doctor commands.
    2. Convert tasks-index.v2.json into a non-canonical rebuildable cache: remove tracked-workflow staging assumptions, keep read-through behavior deterministic on missing or stale cache, and preserve explicit rebuild paths.
    3. Update tests and docs so fresh checkouts, branch_pr integrate/finish, and task rebuild-index all work without treating the cache file as a required tracked artifact.
  Verify Steps: |-
    1. Run bunx vitest run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts. Expected: touched backend and branch_pr workflows stay green without requiring the tracked cache artifact.
    2. Run bun run --filter=agentplane build. Expected: the CLI builds cleanly after the cache contract change.
    3. Run agentplane task rebuild-index. Expected: index regeneration succeeds from tracked task artifacts on demand.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-25T10:21:31.337Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bunx vitest run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx prettier --check packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; bunx eslint packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; agentplane task rebuild-index. Result: pass. Evidence: close flow no longer special-cases tasks-index, local backend rebuilds a missing or corrupt index, and branch_pr fixture repos now ignore .agentplane/cache so integrate/cleanup do not depend on committing cache artifacts. Scope: rebuildable cache contract only.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T10:03:45.571Z, excerpt_hash=sha256:8c16ac92311364878fbd24c11f22d2b6ed0fbf83736b341d184ac12c816d07f4
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make tasks-index a rebuildable cache and remove it from tracked workflow

Turn .agentplane/cache/tasks-index.v2.json into a non-canonical rebuildable cache, remove it from close/integrate staging contracts, and harden rebuild/read-through behavior on fresh or stale checkouts.

## Scope

- In scope: Turn .agentplane/cache/tasks-index.v2.json into a non-canonical rebuildable cache, remove it from close/integrate staging contracts, and harden rebuild/read-through behavior on fresh or stale checkouts.
- Out of scope: unrelated refactors not required for "Make tasks-index a rebuildable cache and remove it from tracked workflow".

## Plan

1. Audit all task-index read/write and git-flow touchpoints, including local backend writes, branch_pr close/integrate staging, and rebuild/doctor commands.
2. Convert tasks-index.v2.json into a non-canonical rebuildable cache: remove tracked-workflow staging assumptions, keep read-through behavior deterministic on missing or stale cache, and preserve explicit rebuild paths.
3. Update tests and docs so fresh checkouts, branch_pr integrate/finish, and task rebuild-index all work without treating the cache file as a required tracked artifact.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts. Expected: touched backend and branch_pr workflows stay green without requiring the tracked cache artifact.
2. Run bun run --filter=agentplane build. Expected: the CLI builds cleanly after the cache contract change.
3. Run agentplane task rebuild-index. Expected: index regeneration succeeds from tracked task artifacts on demand.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-25T10:21:31.337Z — VERIFY — ok

By: CODER

Note: Verified: bunx vitest run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build; bunx prettier --check packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; bunx eslint packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts; agentplane task rebuild-index. Result: pass. Evidence: close flow no longer special-cases tasks-index, local backend rebuilds a missing or corrupt index, and branch_pr fixture repos now ignore .agentplane/cache so integrate/cleanup do not depend on committing cache artifacts. Scope: rebuildable cache contract only.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-25T10:03:45.571Z, excerpt_hash=sha256:8c16ac92311364878fbd24c11f22d2b6ed0fbf83736b341d184ac12c816d07f4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
