---
id: "202603090655-YYCRJ2"
title: "Introduce backend capabilities and projection/snapshot contracts"
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
  updated_at: "2026-03-09T07:01:41.834Z"
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
    body: "Start: define the backend capability and source/projection/snapshot contract before changing Redmine behavior."
events:
  -
    type: "status"
    at: "2026-03-09T07:01:45.860Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: define the backend capability and source/projection/snapshot contract before changing Redmine behavior."
doc_version: 3
doc_updated_at: "2026-03-09T07:01:45.860Z"
doc_updated_by: "CODER"
description: "Add formal backend capability metadata and split the source/projection/export responsibilities needed for local and remote backends."
id_source: "generated"
---
## Summary

Introduce backend capabilities and projection/snapshot contracts

Add formal backend capability metadata and split the source/projection/export responsibilities needed for local and remote backends.

## Scope

- In scope: Add formal backend capability metadata and split the source/projection/export responsibilities needed for local and remote backends.
- Out of scope: unrelated refactors not required for "Introduce backend capabilities and projection/snapshot contracts".

## Plan

1. Define explicit backend capabilities that separate canonical source, local projection, refresh, push, and export responsibilities.
2. Refactor backend interfaces and shared command context to use capability-based decisions instead of backend id checks where possible.
3. Add focused tests that lock the new contract before Redmine-specific behavior changes.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/task/migrate-doc.test.ts. Expected: the backend contract and migrate-doc tests pass with the new capability model.
2. Run bun run lint:core -- packages/agentplane/src/backends/task-backend/*.ts packages/agentplane/src/commands/task/migrate-doc.ts. Expected: no lint errors on touched backend contract files.
3. Run bun run --filter=agentplane build. Expected: the CLI builds successfully after the contract refactor.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
