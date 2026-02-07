---
id: "202602071915-X9V8KN"
title: "CLI2: integrate into run-cli + migrate task new/work start/recipes install"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071915-78ANFC"
tags:
  - "cli"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T19:18:01.935Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T19:45:31.348Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: cli2 integrated into run-cli for agentplane help and for migrated commands (task new/work start/recipes install). Global flag --json is scoped before the command id. Updated E_USAGE hints to point to: agentplane help <cmd...> --compact."
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: integrate cli2 into run-cli routing and migrate task new/work start/recipes install to spec-driven parsing and help."
doc_version: 2
doc_updated_at: "2026-02-07T19:45:31.349Z"
doc_updated_by: "ORCHESTRATOR"
description: "Wire cli2 into cli/run-cli.ts (help routing + spec-driven parsing for selected commands) and migrate 3 commands to spec-driven entrypoints to remove current help/usage drift."
---
## Summary

Integrate cli2 into `cli/run-cli.ts` (add `agentplane help` + per-command help) and migrate 3 commands to spec-driven parsing/usage:
- `task new`
- `work start`
- `recipes install`

## Scope

- `packages/agentplane/src/cli/run-cli.ts`
- New spec modules for the 3 commands
- Minimal refactors in existing commands to accept typed parsed inputs (no argv parsing in command logic)
- Updates/additions to run-cli tests

## Plan

1. Create a cli2 registry with: `help`, `task new`, `work start`, `recipes install`.
2. In `run-cli.ts`:
- change global flag parsing to "only before the command id"
- route `agentplane help ...`
- for migrated commands: match via registry and execute via cli2
- update E_USAGE hints to `agentplane help <cmd...> --compact`
3. Migrations:
- `task new`: move execution to a typed function and wire a spec (eliminate usage drift)
- `work start`: wire spec and call existing `cmdWorkStart`
- `recipes install`: export typed install entrypoint and wire spec (include `--on-conflict` and positional auto mode)
4. Tests:
- integration tests for `agentplane help ...` (compact/json)
- tests proving `recipes install --on-conflict` is accepted and reflected in help/usage

## Risks

- `run-cli.ts` is heavily covered by tests; keep text changes minimal and prefer invariant assertions.
- Potential conflicts between cli2 and legacy parsing around `--help`/`--json`; avoid ambiguity via strict scoping.

## Verify Steps

### Scope
Validate cli2 integration and the 3 migrated commands.

### Checks
- `bun run typecheck`
- `bun run test:cli:unit`

### Evidence / Commands
- `bun run typecheck`
- `bun run test:cli:unit`

### Pass criteria
- `agentplane help task new --compact` shows `--depends-on` and `--verify`.
- `agentplane help recipes install --compact` shows `--on-conflict`.
- `run-cli.core.*` and `run-cli.recipes.test.ts` pass.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T19:45:20.346Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: cli2 integrated into run-cli for  and for migrated commands (task new/work start/recipes install). Global flag  is scoped before command id. Updated error hints to point to .

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-07T19:21:21.778Z, excerpt_hash=sha256:813747edc08921c6024696c93d8a1a98fccd4e754b5193154122e6980d7616db

Details:

Commands: bun run typecheck; bun run test:cli:unit; node packages/agentplane/bin/agentplane.js help task new --compact; node packages/agentplane/bin/agentplane.js help recipes install --compact

#### 2026-02-07T19:45:31.348Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: cli2 integrated into run-cli for agentplane help and for migrated commands (task new/work start/recipes install). Global flag --json is scoped before the command id. Updated E_USAGE hints to point to: agentplane help <cmd...> --compact.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-07T19:45:20.347Z, excerpt_hash=sha256:813747edc08921c6024696c93d8a1a98fccd4e754b5193154122e6980d7616db

Details:

Commands: bun run typecheck; bun run test:cli:unit; node packages/agentplane/bin/agentplane.js help task new --compact; node packages/agentplane/bin/agentplane.js help recipes install --compact

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert changes in `packages/agentplane/src/cli/run-cli.ts`.
2. Delete the new spec modules and restore previous exports in migrated commands.
3. Re-run `bun run test:cli:unit`.
