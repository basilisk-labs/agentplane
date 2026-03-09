---
id: "202603090655-P6BRCZ"
title: "Switch Redmine backend to projection-first reads"
result_summary: "Switched Redmine list/get reads to projection-first semantics, updated backend capabilities to mark reads as local/non-network by default, and rewrote regressions so explicit sync pull is the only refresh path for remote task state."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-09T07:36:58.318Z"
  updated_by: "CODER"
  note: "Redmine now uses the local projection cache for list/get reads; explicit sync pull remains the refresh boundary. Targeted backend/doctor/export tests, lint:core, and agentplane build passed."
commit:
  hash: "ff63722b058b74ca6c8d56ce641a6dd7ef5e00f5"
  message: "✨ P6BRCZ backend: switch Redmine reads to projection-first"
comments:
  -
    author: "CODER"
    body: "Start: switching Redmine reads to projection-first so install-first users get deterministic local task state and explicit network boundaries."
  -
    author: "CODER"
    body: "Verified: Redmine list/get now read from projection cache only; sync pull remains the explicit network refresh boundary and backend tests cover the new contract."
events:
  -
    type: "status"
    at: "2026-03-09T07:30:26.072Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: switching Redmine reads to projection-first so install-first users get deterministic local task state and explicit network boundaries."
  -
    type: "verify"
    at: "2026-03-09T07:36:58.318Z"
    author: "CODER"
    state: "ok"
    note: "Redmine now uses the local projection cache for list/get reads; explicit sync pull remains the refresh boundary. Targeted backend/doctor/export tests, lint:core, and agentplane build passed."
  -
    type: "status"
    at: "2026-03-09T07:37:03.842Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Redmine list/get now read from projection cache only; sync pull remains the explicit network refresh boundary and backend tests cover the new contract."
doc_version: 3
doc_updated_at: "2026-03-09T07:37:03.842Z"
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
#### 2026-03-09T07:36:58.318Z — VERIFY — ok

By: CODER

Note: Redmine now uses the local projection cache for list/get reads; explicit sync pull remains the refresh boundary. Targeted backend/doctor/export tests, lint:core, and agentplane build passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T07:36:30.155Z, excerpt_hash=sha256:8a01e1a8e15e6b0fc53c61570cf7585e6caa294cee01c0d6e695472500057a48

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
