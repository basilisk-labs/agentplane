---
id: "202603131310-MKYRHY"
title: "Prepare backend revision interface groundwork"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
depends_on:
  - "202603131309-YDAC7K"
tags:
  - "code"
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T04:20:03.282Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T04:26:07.030Z"
  updated_by: "CODER"
  note: |-
    Command: bun x vitest run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.export.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts --hookTimeout 60000 --testTimeout 60000
    Result: pass
    Evidence: 55 tests passed; local backend rejects stale expectedRevision writes, and backend/load mocks now expose explicit revision capability flags without changing existing task flows.
    Scope: backend revision groundwork, local backend enforcement, and mock-based contract consumers.
    
    Command: ./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/shared/types.ts packages/agentplane/src/backends/task-backend/shared.ts packages/agentplane/src/backends/task-backend.ts packages/agentplane/src/ports/task-backend-port.ts packages/agentplane/src/adapters/task-backend/task-backend-adapter.ts packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.export.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: eslint clean; both package builds exited 0.
    Scope: touched backend contract/runtime files and dependent test surfaces.
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add explicit revision-aware backend groundwork so shared backend types can express compare-and-swap support, local backend can advertise the contract honestly, and remote backends stay clearly marked as future parity work."
events:
  -
    type: "status"
    at: "2026-03-14T04:20:13.873Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add explicit revision-aware backend groundwork so shared backend types can express compare-and-swap support, local backend can advertise the contract honestly, and remote backends stay clearly marked as future parity work."
  -
    type: "verify"
    at: "2026-03-14T04:26:07.030Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bun x vitest run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.export.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts --hookTimeout 60000 --testTimeout 60000
      Result: pass
      Evidence: 55 tests passed; local backend rejects stale expectedRevision writes, and backend/load mocks now expose explicit revision capability flags without changing existing task flows.
      Scope: backend revision groundwork, local backend enforcement, and mock-based contract consumers.
      
      Command: ./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/shared/types.ts packages/agentplane/src/backends/task-backend/shared.ts packages/agentplane/src/backends/task-backend.ts packages/agentplane/src/ports/task-backend-port.ts packages/agentplane/src/adapters/task-backend/task-backend-adapter.ts packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.export.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
      Result: pass
      Evidence: eslint clean; both package builds exited 0.
      Scope: touched backend contract/runtime files and dependent test surfaces.
doc_version: 3
doc_updated_at: "2026-03-14T04:26:07.033Z"
doc_updated_by: "CODER"
description: "Extend backend contracts to accommodate revision-aware task reads and writes so non-local backends can later match local canonical-state concurrency semantics."
sections:
  Summary: |-
    Prepare backend revision interface groundwork
    
    Extend backend contracts to accommodate revision-aware task reads and writes so non-local backends can later match local canonical-state concurrency semantics.
  Scope: |-
    - In scope: Extend backend contracts to accommodate revision-aware task reads and writes so non-local backends can later match local canonical-state concurrency semantics.
    - Out of scope: unrelated refactors not required for "Prepare backend revision interface groundwork".
  Plan: |-
    1. Audit the current TaskBackend and TaskStore revision flow to separate what is already local-only CAS from what is still missing in the shared backend contract.
    2. Extend shared backend types and capabilities with revision-aware groundwork so future non-local backends can advertise support without changing today's task lifecycle commands.
    3. Update local backend and focused regressions to prove the new contract is wired, while remote backends still report revision writes as unsupported groundwork rather than falsely claiming parity.
  Verify Steps: |-
    1. Run backend contract regressions around revision-aware types/capabilities. Expected: the new contract compiles and tests show which backends expose revision-aware writes.
    2. Run targeted local and remote backend regressions. Expected: local backend keeps current behavior while non-local backends are explicitly marked as not yet supporting revision CAS parity.
    3. Build both packages after the task. Expected: @agentplaneorg/core and agentplane build cleanly with no new tracked drift outside the approved scope.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T04:26:07.030Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.export.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts --hookTimeout 60000 --testTimeout 60000
    Result: pass
    Evidence: 55 tests passed; local backend rejects stale expectedRevision writes, and backend/load mocks now expose explicit revision capability flags without changing existing task flows.
    Scope: backend revision groundwork, local backend enforcement, and mock-based contract consumers.
    
    Command: ./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/shared/types.ts packages/agentplane/src/backends/task-backend/shared.ts packages/agentplane/src/backends/task-backend.ts packages/agentplane/src/ports/task-backend-port.ts packages/agentplane/src/adapters/task-backend/task-backend-adapter.ts packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.export.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: eslint clean; both package builds exited 0.
    Scope: touched backend contract/runtime files and dependent test surfaces.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T04:20:13.874Z, excerpt_hash=sha256:b8aae5318637578e590222ea0bf8d1926e354eb0d0ece8dc3f8922db4d386160
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prepare backend revision interface groundwork

Extend backend contracts to accommodate revision-aware task reads and writes so non-local backends can later match local canonical-state concurrency semantics.

## Scope

- In scope: Extend backend contracts to accommodate revision-aware task reads and writes so non-local backends can later match local canonical-state concurrency semantics.
- Out of scope: unrelated refactors not required for "Prepare backend revision interface groundwork".

## Plan

1. Audit the current TaskBackend and TaskStore revision flow to separate what is already local-only CAS from what is still missing in the shared backend contract.
2. Extend shared backend types and capabilities with revision-aware groundwork so future non-local backends can advertise support without changing today's task lifecycle commands.
3. Update local backend and focused regressions to prove the new contract is wired, while remote backends still report revision writes as unsupported groundwork rather than falsely claiming parity.

## Verify Steps

1. Run backend contract regressions around revision-aware types/capabilities. Expected: the new contract compiles and tests show which backends expose revision-aware writes.
2. Run targeted local and remote backend regressions. Expected: local backend keeps current behavior while non-local backends are explicitly marked as not yet supporting revision CAS parity.
3. Build both packages after the task. Expected: @agentplaneorg/core and agentplane build cleanly with no new tracked drift outside the approved scope.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T04:26:07.030Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.export.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts --hookTimeout 60000 --testTimeout 60000
Result: pass
Evidence: 55 tests passed; local backend rejects stale expectedRevision writes, and backend/load mocks now expose explicit revision capability flags without changing existing task flows.
Scope: backend revision groundwork, local backend enforcement, and mock-based contract consumers.

Command: ./node_modules/.bin/eslint packages/agentplane/src/backends/task-backend/shared/types.ts packages/agentplane/src/backends/task-backend/shared.ts packages/agentplane/src/backends/task-backend.ts packages/agentplane/src/ports/task-backend-port.ts packages/agentplane/src/adapters/task-backend/task-backend-adapter.ts packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.load.test.ts packages/agentplane/src/commands/task/export.unit.test.ts packages/agentplane/src/cli/run-cli.core.tasks.export.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts && bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: eslint clean; both package builds exited 0.
Scope: touched backend contract/runtime files and dependent test surfaces.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T04:20:13.874Z, excerpt_hash=sha256:b8aae5318637578e590222ea0bf8d1926e354eb0d0ece8dc3f8922db4d386160

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
