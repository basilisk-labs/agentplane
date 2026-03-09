---
id: "202603090655-P6BRCZ"
title: "Switch Redmine backend to projection-first reads"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "backend"
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
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
    body: "Start: switching Redmine reads to projection-first so install-first users get deterministic local task state and explicit network boundaries."
events:
  -
    type: "status"
    at: "2026-03-09T07:30:26.072Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: switching Redmine reads to projection-first so install-first users get deterministic local task state and explicit network boundaries."
doc_version: 3
doc_updated_at: "2026-03-09T07:36:30.155Z"
doc_updated_by: "CODER"
description: "Use the local projection as the default read model for Redmine-backed repos and keep network access behind explicit refresh/sync paths."
id_source: "generated"
---
## Summary

Switch Redmine backend to projection-first reads

Use the local projection as the default read model for Redmine-backed repos and keep network access behind explicit refresh/sync paths.

## Scope

- In scope: Use the local projection as the default read model for Redmine-backed repos and keep network access behind explicit refresh/sync paths.
- Out of scope: unrelated refactors not required for "Switch Redmine backend to projection-first reads".

## Plan

1. Implement the change for "Switch Redmine backend to projection-first reads".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. bunx vitest run packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/task/export.unit.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000
2. bun run lint:core -- packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/doctor/workspace.ts packages/agentplane/src/commands/shared/task-backend.ts
3. bun run --filter=agentplane build

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
