---
id: "202603090655-YYCRJ2"
title: "Introduce backend capabilities and projection/snapshot contracts"
result_summary: "Added explicit backend capabilities, projection snapshot export, and Redmine cache-backed snapshot behavior as the first universal backend contract step."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-09T07:08:46.159Z"
  updated_by: "CODER"
  note: "Validated backend capability/projection contract with targeted vitest, lint:core, and agentplane build; projection snapshot export now works for local and cache-backed Redmine flows."
commit:
  hash: "a8fb7eb915eb0971ce78ad4807fbc16244208a51"
  message: "✨ YYCRJ2 backend: add projection snapshot capabilities"
comments:
  -
    author: "CODER"
    body: "Start: define the backend capability and source/projection/snapshot contract before changing Redmine behavior."
  -
    author: "CODER"
    body: "Verified: backend capability/projection contract passes targeted tests and build; projection snapshot export is now backend-aware."
events:
  -
    type: "status"
    at: "2026-03-09T07:01:45.860Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: define the backend capability and source/projection/snapshot contract before changing Redmine behavior."
  -
    type: "verify"
    at: "2026-03-09T07:08:46.159Z"
    author: "CODER"
    state: "ok"
    note: "Validated backend capability/projection contract with targeted vitest, lint:core, and agentplane build; projection snapshot export now works for local and cache-backed Redmine flows."
  -
    type: "status"
    at: "2026-03-09T07:08:51.994Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: backend capability/projection contract passes targeted tests and build; projection snapshot export is now backend-aware."
doc_version: 3
doc_updated_at: "2026-03-09T07:08:51.994Z"
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
#### 2026-03-09T07:08:46.159Z — VERIFY — ok

By: CODER

Note: Validated backend capability/projection contract with targeted vitest, lint:core, and agentplane build; projection snapshot export now works for local and cache-backed Redmine flows.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T07:01:45.860Z, excerpt_hash=sha256:08814d656012a6159209e52e9f371b4443285df85e842f7eccd0be3e79563206

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
