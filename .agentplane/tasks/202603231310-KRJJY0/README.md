---
id: "202603231310-KRJJY0"
title: "R2: Add task provenance origin model"
result_summary: "Threaded origin provenance through task data and surfaces."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
depends_on:
  - "202603231310-JNT74T"
tags:
  - "code"
  - "tasks"
  - "schema"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T13:10:39.139Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved task graph for runner/scenario execute rollout"
verification:
  state: "ok"
  updated_at: "2026-03-23T13:41:05.425Z"
  updated_by: "CODER"
  note: "Origin metadata round-trip and task show coverage verified."
commit:
  hash: "b60157b43540481ead1c366a352c70c77f838597"
  message: "✅ KRJJY0 code: done"
comments:
  -
    author: "CODER"
    body: "Start: thread task provenance through TaskData, README frontmatter, and task show surfaces."
  -
    author: "CODER"
    body: "Verified: threaded origin provenance through TaskData, frontmatter, task show, local export, and Redmine canonical-state mapping."
events:
  -
    type: "status"
    at: "2026-03-23T13:29:03.518Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: thread task provenance through TaskData, README frontmatter, and task show surfaces."
  -
    type: "verify"
    at: "2026-03-23T13:41:05.425Z"
    author: "CODER"
    state: "ok"
    note: "Origin metadata round-trip and task show coverage verified."
  -
    type: "status"
    at: "2026-03-23T13:41:18.102Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: threaded origin provenance through TaskData, frontmatter, task show, local export, and Redmine canonical-state mapping."
doc_version: 3
doc_updated_at: "2026-03-23T13:41:40.694Z"
doc_updated_by: "CODER"
description: "Carry origin metadata through TaskData, task backends, README frontmatter, and task show output for manual and recipe-created tasks."
sections:
  Summary: |-
    R2: Add task provenance origin model
    
    Carry origin metadata through TaskData, task backends, README frontmatter, and task show output for manual and recipe-created tasks.
  Scope: |-
    - In scope: Carry origin metadata through TaskData, task backends, README frontmatter, and task show output for manual and recipe-created tasks.
    - Out of scope: unrelated refactors not required for "R2: Add task provenance origin model".
  Plan: |-
    1. Extend task state types with origin metadata for manual and recipe sources.
    2. Thread origin through backend adapters, frontmatter render/parse, and task show serialization.
    3. Add round-trip tests to keep origin stable across reads and writes.
  Verify Steps: |-
    1. Create or load a task with origin metadata and round-trip it through the backend. Expected: origin is preserved exactly.
    2. Run task show for an origin-bearing task. Expected: origin fields are present in the JSON output.
    3. Run relevant task README/frontmatter tests. Expected: no regression in existing task serialization behavior.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T13:41:05.425Z — VERIFY — ok
    
    By: CODER
    
    Note: Origin metadata round-trip and task show coverage verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T13:29:03.519Z, excerpt_hash=sha256:3a41af6042b81576bed49e282029f74922fc3fa3c8c2457a0fc5d4b415b0dfd5
    
    Details:
    
    Command: bunx vitest run packages/core/src/tasks/task-store.test.ts packages/core/src/tasks/tasks-export.test.ts packages/core/src/tasks/task-readme.test.ts packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts
    Result: pass
    Evidence: 8 test files passed, 157 tests passed.
    Scope: core task frontmatter/origin, backend round-trips, Redmine canonical-state origin, CLI task show/task new surfaces.
    
    Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane task show 202603231310-KRJJY0
    Result: pass
    Evidence: task show emitted origin-bearing JSON for the active task metadata.
    Scope: user-visible task show contract for origin.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

R2: Add task provenance origin model

Carry origin metadata through TaskData, task backends, README frontmatter, and task show output for manual and recipe-created tasks.

## Scope

- In scope: Carry origin metadata through TaskData, task backends, README frontmatter, and task show output for manual and recipe-created tasks.
- Out of scope: unrelated refactors not required for "R2: Add task provenance origin model".

## Plan

1. Extend task state types with origin metadata for manual and recipe sources.
2. Thread origin through backend adapters, frontmatter render/parse, and task show serialization.
3. Add round-trip tests to keep origin stable across reads and writes.

## Verify Steps

1. Create or load a task with origin metadata and round-trip it through the backend. Expected: origin is preserved exactly.
2. Run task show for an origin-bearing task. Expected: origin fields are present in the JSON output.
3. Run relevant task README/frontmatter tests. Expected: no regression in existing task serialization behavior.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T13:41:05.425Z — VERIFY — ok

By: CODER

Note: Origin metadata round-trip and task show coverage verified.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T13:29:03.519Z, excerpt_hash=sha256:3a41af6042b81576bed49e282029f74922fc3fa3c8c2457a0fc5d4b415b0dfd5

Details:

Command: bunx vitest run packages/core/src/tasks/task-store.test.ts packages/core/src/tasks/tasks-export.test.ts packages/core/src/tasks/task-readme.test.ts packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts
Result: pass
Evidence: 8 test files passed, 157 tests passed.
Scope: core task frontmatter/origin, backend round-trips, Redmine canonical-state origin, CLI task show/task new surfaces.

Command: AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane task show 202603231310-KRJJY0
Result: pass
Evidence: task show emitted origin-bearing JSON for the active task metadata.
Scope: user-visible task show contract for origin.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
