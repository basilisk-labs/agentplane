---
id: "202603090655-TZHRG4"
title: "Make doctor and task migration backend-aware"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "backend"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T07:17:33.245Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: make doctor and task doc migration flows read backend projection state instead of stale exported snapshots."
events:
  -
    type: "status"
    at: "2026-03-09T07:17:42.842Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make doctor and task doc migration flows read backend projection state instead of stale exported snapshots."
doc_version: 3
doc_updated_at: "2026-03-09T07:17:42.842Z"
doc_updated_by: "CODER"
description: "Teach doctor and task doc migration flows to reason about backend projection state instead of stale export snapshots."
id_source: "generated"
---
## Summary

Make doctor and task migration backend-aware

Teach doctor and task doc migration flows to reason about backend projection state instead of stale export snapshots.

## Scope

- In scope: Teach doctor and task doc migration flows to reason about backend projection state instead of stale export snapshots.
- Out of scope: unrelated refactors not required for "Make doctor and task migration backend-aware".

## Plan

1. Replace the doctor migration check so it reads task migration state from backend projection data instead of the exported tasks.json snapshot.
2. Reuse the same projection-aware logic in task-doc migration flows so local and remote backends keep doctor-visible state in sync after migration.
3. Add regression coverage for local and backend-provided projection scenarios, including stale snapshot cases.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/task/migrate-doc.test.ts packages/agentplane/src/commands/task/export.unit.test.ts. Expected: doctor and migration flows use backend projection state without stale-snapshot false positives.
2. Run bun run lint:core -- packages/agentplane/src/commands/doctor/workspace.ts packages/agentplane/src/commands/task/migrate-doc.ts packages/agentplane/src/commands/shared/task-backend.ts packages/agentplane/src/commands/task/export.ts. Expected: no lint errors in touched backend-aware command paths.
3. Run bun run --filter=agentplane build. Expected: the CLI builds successfully after the backend-aware doctor and migration refactor.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
