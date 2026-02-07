---
id: "202602071915-Y81PM2"
title: "Spec-driven CLI (cli2) tracking"
status: "TODO"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "cli"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T19:18:01.936Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T19:46:26.633Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: created a sequential CLI2 migration task chain and implemented the initial cli2 core + help and migrated 3 commands (task new/work start/recipes install) with tests and docs updates."
commit: null
comments: []
doc_version: 2
doc_updated_at: "2026-02-07T19:46:26.634Z"
doc_updated_by: "ORCHESTRATOR"
description: "Introduce spec-driven CLI framework (cli2) to eliminate help/usage drift and reduce per-command manual parsing."
---
## Summary

Introduce a spec-driven CLI layer (`cli2`) as the single source of truth for parsing + help/usage, to eliminate drift and reduce per-command manual flag parsing.

Initial increment: implement cli2 core + `agentplane help` (text/compact/json) and migrate 3 drift-prone commands (`task new`, `work start`, `recipes install`).

## Scope

In scope:
- `packages/agentplane/src/cli2/**` (spec/parse/registry/help/suggest)
- `packages/agentplane/src/cli/run-cli.ts` (cli2 integration: help routing + spec-driven parsing)
- Spec-driven entrypoints for:
  - `packages/agentplane/src/commands/task/new.ts`
  - `packages/agentplane/src/commands/branch/index.ts` (via spec wiring; keep business logic)
  - `packages/agentplane/src/commands/recipes.ts`
  - New `*.command.ts` modules holding specs
- Tests (`vitest`) for cli2 and integration

Out of scope:
- Full migration of all commands to cli2
- Shell completion generation
- Docs generation from registry/spec (optional follow-up)

## Plan

1. Freeze the CLI2 help JSON contract and global flag scoping decisions (task 202602071915-50D60W).
2. Implement cli2 core: spec types, argv parser, registry, suggestions, help renderer + unit tests (task 202602071915-78ANFC).
3. Integrate cli2 into `cli/run-cli.ts` and migrate 3 commands (`task new`, `work start`, `recipes install`) to spec-driven parsing (task 202602071915-X9V8KN).

## Risks

- Regression risk in global flag behavior (especially `--json` and `--help`) when changing scoping rules.
- Snapshot/string-expectation brittleness in tests due to help/error text changes.
- Partial migration state (cli2 + legacy coexistence) can create ambiguous behavior unless routing is explicit.

## Verify Steps

### Scope
Validate cli2 correctness (unit) and integration correctness (run-cli tests) for the initial migrated commands.

### Checks
- TypeScript build
- CLI test suites (core + recipes)

### Evidence / Commands
- `bun run typecheck`
- `bun run test:agentplane`
- `bun run test:cli:unit`

### Pass criteria
- All commands above succeed.
- `agentplane help task new --compact` includes `--depends-on` and `--verify`.
- `agentplane help recipes install --compact` includes `--on-conflict` and documents positional auto mode.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T19:46:26.633Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: created a sequential CLI2 migration task chain and implemented the initial cli2 core + help and migrated 3 commands (task new/work start/recipes install) with tests and docs updates.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-07T19:21:17.635Z, excerpt_hash=sha256:e8ec1d0377ddf9c4d9f81eca1a96a4c7ae083cb3e3fb46b922898abac9bd16fe

Details:

Commands: bun run typecheck; bun run test:cli:unit; bun run test:agentplane packages/agentplane/src/cli2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert commits touching `packages/agentplane/src/cli2/**` and `packages/agentplane/src/cli/run-cli.ts` integration.
2. Restore legacy exports/visibility in `packages/agentplane/src/commands/recipes.ts` and `packages/agentplane/src/commands/task/new.ts`.
3. Re-run `bun run test:cli:unit` to confirm baseline behavior.
