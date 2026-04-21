---
id: "202604210900-0KTEA5"
title: "Remove legacy task index v1 support"
result_summary: "Removed legacy task index v1 support."
breaking: true
status: "DONE"
priority: "normal"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on:
  - "202604210900-RP5GA0"
tags:
  - "breaking"
  - "code"
  - "migration"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T09:45:23.863Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-21T09:48:47.038Z"
  updated_by: "CODER"
  note: "Removed live tasks-index.v1 compatibility fallback; only migration docs and the targeted negative test mention tasks-index.v1; task-index test and agentplane typecheck pass."
commit:
  hash: "851fc3d7bc752275144170027db143693fa57d8d"
  message: "✅ 0KTEA5 code: done"
comments:
  -
    author: "CODER"
    body: "Start: remove tasks-index.v1 compatibility branches under approved patch-release breaking cleanup policy, update targeted tests/docs, and verify no live tasks-index.v1 references remain."
  -
    author: "CODER"
    body: "Verified: removed tasks-index.v1 fallback, documented cache recovery, rebuilt framework runtime, and passed targeted task-index test plus agentplane typecheck."
events:
  -
    type: "status"
    at: "2026-04-21T09:45:40.283Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove tasks-index.v1 compatibility branches under approved patch-release breaking cleanup policy, update targeted tests/docs, and verify no live tasks-index.v1 references remain."
  -
    type: "verify"
    at: "2026-04-21T09:48:47.038Z"
    author: "CODER"
    state: "ok"
    note: "Removed live tasks-index.v1 compatibility fallback; only migration docs and the targeted negative test mention tasks-index.v1; task-index test and agentplane typecheck pass."
  -
    type: "status"
    at: "2026-04-21T09:50:09.118Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: removed tasks-index.v1 fallback, documented cache recovery, rebuilt framework runtime, and passed targeted task-index test plus agentplane typecheck."
doc_version: 3
doc_updated_at: "2026-04-21T09:50:09.121Z"
doc_updated_by: "CODER"
description: "Remove tasks-index.v1 compatibility only after the legacy bridge policy allows breaking cleanup."
sections:
  Summary: "Delete legacy v1 task index support if T23 approves removal; otherwise close as deferred with rationale."
  Scope: "In scope: task-index v1 constants/branches/tests and migration documentation. Out of scope: unrelated task backend rewrites."
  Plan: |-
    1. Confirm T23 authorizes removal.
    2. Remove LEGACY_TASK_INDEX_FILENAME and v1 load branches.
    3. Update tests and migration/release notes.
    4. Run task backend tests.
  Verify Steps: |-
    - No live code references tasks-index.v1.json.
    - Migration guidance exists.
    - Task backend tests pass.
  Verification: |-
    - Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane task verify-show 202604210900-0KTEA5`
      - Result: pass
      - Evidence: verification contract listed no live tasks-index.v1 references, migration guidance, and task backend tests.
      - Scope: task acceptance contract.
    - Command: `bun run test:project -- agentplane --run packages/agentplane/src/backends/task-index.test.ts`
      - Result: pass
      - Evidence: 1 file passed, 3 tests passed.
      - Scope: task-index cache behavior.
    - Command: `rg -n 'tasks-index\.v1|LEGACY_TASK_INDEX|TaskIndexFileV1|resolveLegacyIndexPath|toV2FromEntries|isTaskIndexFileV1' packages/agentplane/src docs/help/legacy-upgrade-recovery.mdx`
      - Result: pass
      - Evidence: only migration docs and the targeted negative test mention tasks-index.v1; no live compatibility code remains.
      - Scope: live code reference cleanup.
    - Command: `bun run framework:dev:bootstrap`
      - Result: pass
      - Evidence: framework dev runtime is ready.
      - Scope: rebuilt watched runtime after task-index source change.
    - Command: `bun run --filter=agentplane typecheck`
      - Result: pass
      - Evidence: agentplane typecheck exited with code 0.
      - Scope: agentplane package type safety.
    - Command: `git diff --check -- packages/agentplane/src/backends/task-index.ts packages/agentplane/src/backends/task-index.test.ts docs/help/legacy-upgrade-recovery.mdx .agentplane/tasks/202604210900-0KTEA5/README.md`
      - Result: pass
      - Evidence: no whitespace errors.
      - Scope: changed files for this task.
    
    ### 2026-04-21T09:48:47.038Z — VERIFY — ok
    
    By: CODER
    
    Note: Removed live tasks-index.v1 compatibility fallback; only migration docs and the targeted negative test mention tasks-index.v1; task-index test and agentplane typecheck pass.
  Rollback Plan: "Restore v1 support branches and tests."
  Findings: "This is intentionally gated because it can break old repositories."
id_source: "generated"
---
## Summary

Delete legacy v1 task index support if T23 approves removal; otherwise close as deferred with rationale.

## Scope

In scope: task-index v1 constants/branches/tests and migration documentation. Out of scope: unrelated task backend rewrites.

## Plan

1. Confirm T23 authorizes removal.
2. Remove LEGACY_TASK_INDEX_FILENAME and v1 load branches.
3. Update tests and migration/release notes.
4. Run task backend tests.

## Verify Steps

- No live code references tasks-index.v1.json.
- Migration guidance exists.
- Task backend tests pass.

## Verification

- Command: `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane task verify-show 202604210900-0KTEA5`
  - Result: pass
  - Evidence: verification contract listed no live tasks-index.v1 references, migration guidance, and task backend tests.
  - Scope: task acceptance contract.
- Command: `bun run test:project -- agentplane --run packages/agentplane/src/backends/task-index.test.ts`
  - Result: pass
  - Evidence: 1 file passed, 3 tests passed.
  - Scope: task-index cache behavior.
- Command: `rg -n 'tasks-index\.v1|LEGACY_TASK_INDEX|TaskIndexFileV1|resolveLegacyIndexPath|toV2FromEntries|isTaskIndexFileV1' packages/agentplane/src docs/help/legacy-upgrade-recovery.mdx`
  - Result: pass
  - Evidence: only migration docs and the targeted negative test mention tasks-index.v1; no live compatibility code remains.
  - Scope: live code reference cleanup.
- Command: `bun run framework:dev:bootstrap`
  - Result: pass
  - Evidence: framework dev runtime is ready.
  - Scope: rebuilt watched runtime after task-index source change.
- Command: `bun run --filter=agentplane typecheck`
  - Result: pass
  - Evidence: agentplane typecheck exited with code 0.
  - Scope: agentplane package type safety.
- Command: `git diff --check -- packages/agentplane/src/backends/task-index.ts packages/agentplane/src/backends/task-index.test.ts docs/help/legacy-upgrade-recovery.mdx .agentplane/tasks/202604210900-0KTEA5/README.md`
  - Result: pass
  - Evidence: no whitespace errors.
  - Scope: changed files for this task.

### 2026-04-21T09:48:47.038Z — VERIFY — ok

By: CODER

Note: Removed live tasks-index.v1 compatibility fallback; only migration docs and the targeted negative test mention tasks-index.v1; task-index test and agentplane typecheck pass.

## Rollback Plan

Restore v1 support branches and tests.

## Findings

This is intentionally gated because it can break old repositories.
