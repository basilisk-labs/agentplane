---
id: "202603080540-5M0ZZW"
title: "P1: decompose run-cli orchestration layers"
result_summary: "run-cli.ts is now a narrower orchestrator around extracted helper modules, and the requested fast-gate optimization backlog task was persisted in the task graph."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T06:35:12.293Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T06:41:20.991Z"
  updated_by: "CODER"
  note: "Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit\nResult: pass\nEvidence: TypeScript no-emit completed with exit code 0 after extracting globals, catalog, error-guidance, and update-warning helpers.\nScope: run-cli orchestration typing and module boundaries.\n\nCommand: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.misc.test.ts packages/agentplane/src/cli/run-cli.core.boot.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000\nResult: pass\nEvidence: 4 files, 19 tests passed; help, misc, and boot behavior remained green.\nScope: run-cli help surfaces and boot path behavior.\n\nCommand: bun run lint:core -- packages/agentplane/src/cli/run-cli.ts packages/agentplane/src/cli/run-cli/catalog.ts packages/agentplane/src/cli/run-cli/globals.ts packages/agentplane/src/cli/run-cli/error-guidance.ts packages/agentplane/src/cli/run-cli/update-warning.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.misc.test.ts packages/agentplane/src/cli/run-cli.core.boot.test.ts\nResult: pass\nEvidence: eslint finished clean after import/type cleanup in extracted helpers.\nScope: modified run-cli source files and targeted regression tests.\n\nCommand: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build\nResult: pass\nEvidence: both package builds exited with code 0 after the extraction.\nScope: build output freshness for framework checkout and agentplane package assembly."
commit:
  hash: "358b354fa40f9e812df92c6a8a44117354d99729"
  message: "♻️ 5M0ZZW cli: split run-cli orchestration helpers"
comments:
  -
    author: "CODER"
    body: "Start: splitting run-cli into narrower orchestration helpers while preserving help, boot, and dispatch behavior."
  -
    author: "CODER"
    body: "Verified: run-cli orchestration was split into globals, catalog, error-guidance, and update-warning helpers; targeted run-cli tests, lint, TypeScript no-emit, and package builds all passed without CLI contract drift."
events:
  -
    type: "status"
    at: "2026-03-08T06:35:16.259Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: splitting run-cli into narrower orchestration helpers while preserving help, boot, and dispatch behavior."
  -
    type: "verify"
    at: "2026-03-08T06:41:20.991Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit\nResult: pass\nEvidence: TypeScript no-emit completed with exit code 0 after extracting globals, catalog, error-guidance, and update-warning helpers.\nScope: run-cli orchestration typing and module boundaries.\n\nCommand: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.misc.test.ts packages/agentplane/src/cli/run-cli.core.boot.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000\nResult: pass\nEvidence: 4 files, 19 tests passed; help, misc, and boot behavior remained green.\nScope: run-cli help surfaces and boot path behavior.\n\nCommand: bun run lint:core -- packages/agentplane/src/cli/run-cli.ts packages/agentplane/src/cli/run-cli/catalog.ts packages/agentplane/src/cli/run-cli/globals.ts packages/agentplane/src/cli/run-cli/error-guidance.ts packages/agentplane/src/cli/run-cli/update-warning.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.misc.test.ts packages/agentplane/src/cli/run-cli.core.boot.test.ts\nResult: pass\nEvidence: eslint finished clean after import/type cleanup in extracted helpers.\nScope: modified run-cli source files and targeted regression tests.\n\nCommand: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build\nResult: pass\nEvidence: both package builds exited with code 0 after the extraction.\nScope: build output freshness for framework checkout and agentplane package assembly."
  -
    type: "status"
    at: "2026-03-08T06:41:57.906Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: run-cli orchestration was split into globals, catalog, error-guidance, and update-warning helpers; targeted run-cli tests, lint, TypeScript no-emit, and package builds all passed without CLI contract drift."
doc_version: 2
doc_updated_at: "2026-03-08T06:41:57.906Z"
doc_updated_by: "CODER"
description: "Split run-cli bootstrap, dispatch, runtime diagnostics, and render/error glue into narrower modules without changing command contracts."
id_source: "generated"
---
## Summary

P1: decompose run-cli orchestration layers

Split run-cli bootstrap, dispatch, runtime diagnostics, and render/error glue into narrower modules without changing command contracts.

## Scope

- In scope: Split run-cli bootstrap, dispatch, runtime diagnostics, and render/error glue into narrower modules without changing command contracts..
- Out of scope: unrelated refactors not required for "P1: decompose run-cli orchestration layers".

## Plan

1. Extract stable helpers from cli/run-cli.ts into focused modules for globals/output handling, command catalog matching, and error/update guidance.
2. Keep run-cli.ts as the orchestration layer that wires project/config resolution and dispatch without changing command contracts or help behavior.
3. Verify with targeted run-cli test suites, lint, TypeScript no-emit, and a package build before finish.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- `bunx tsc -p packages/agentplane/tsconfig.json --noEmit`
- `bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.misc.test.ts packages/agentplane/src/cli/run-cli.core.boot.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000`
- `bun run lint:core -- packages/agentplane/src/cli/run-cli.ts packages/agentplane/src/cli/run-cli/*.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.misc.test.ts packages/agentplane/src/cli/run-cli.core.boot.test.ts`
- `bun run --filter=agentplane build`

### Evidence / Commands
- Record the exact commands, affected files, and whether help/boot behavior remained unchanged.

### Pass criteria
- run-cli command contracts, help surfaces, and boot path remain unchanged while orchestration code is split into narrower modules.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T06:41:20.991Z — VERIFY — ok

By: CODER

Note: Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit
Result: pass
Evidence: TypeScript no-emit completed with exit code 0 after extracting globals, catalog, error-guidance, and update-warning helpers.
Scope: run-cli orchestration typing and module boundaries.

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.misc.test.ts packages/agentplane/src/cli/run-cli.core.boot.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000
Result: pass
Evidence: 4 files, 19 tests passed; help, misc, and boot behavior remained green.
Scope: run-cli help surfaces and boot path behavior.

Command: bun run lint:core -- packages/agentplane/src/cli/run-cli.ts packages/agentplane/src/cli/run-cli/catalog.ts packages/agentplane/src/cli/run-cli/globals.ts packages/agentplane/src/cli/run-cli/error-guidance.ts packages/agentplane/src/cli/run-cli/update-warning.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.misc.test.ts packages/agentplane/src/cli/run-cli.core.boot.test.ts
Result: pass
Evidence: eslint finished clean after import/type cleanup in extracted helpers.
Scope: modified run-cli source files and targeted regression tests.

Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: both package builds exited with code 0 after the extraction.
Scope: build output freshness for framework checkout and agentplane package assembly.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T06:35:16.259Z, excerpt_hash=sha256:e876423a0a8b8f9265301a652cba56f094b0dcc9f05bed512ad168056747fef2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
