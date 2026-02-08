---
id: "202602071928-F5FD34"
title: "CLI2-100: Migrate start/block to cli2"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-CWPSGH"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T07:33:41.431Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T07:41:28.305Z"
  updated_by: "ORCHESTRATOR"
  note: "Ran: bun run typecheck; bun run test:cli:core. Start/block now route via cli2 specs; legacy dispatch removed; lifecycle CLI tests updated."
commit:
  hash: "23c45b22d916006c0e0d1644faaf8bbc56ad5814"
  message: "🚧 F5FD34 cli: migrate start/block to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: migrate start/block CLI entrypoints to cli2 specs, remove legacy dispatch, and add coverage for parsing + behavior."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run typecheck; bun run test:cli:core. start/block are spec-driven via cli2, legacy routing removed, and lifecycle CLI tests updated."
doc_version: 2
doc_updated_at: "2026-02-08T07:43:31.621Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for `start` and `block`."
---
## Summary

CLI2-100: Migrate start/block to cli2

Spec + wiring for `start` and `block`.

## Scope

In scope:
- Add/adjust cli2 spec and wiring for this command.
- Remove any command-local argv parsing that duplicates spec.
- Update/extend CLI tests that cover this command.

Out of scope:
- Migrating unrelated commands.

## Plan

1. Add a `CommandSpec` for the command (args/options/examples/notes).
2. Wire it into the cli2 registry.
3. Route execution to existing business logic (no argv parsing in command logic).
4. Delete or bypass legacy parse helpers for this command.
5. Update tests to assert:
- spec-derived help includes all options
- parse errors produce E_USAGE with compact usage

## Risks

- Behavior drift during migration (flags/positional parsing) if spec does not match the current implementation.
- Test brittleness due to exact string expectations.

## Verify Steps

Run:\n- bun run typecheck\n- bun run test:cli:core\n\nPass criteria:\n- start/block are routed via cli2 and legacy routing is removed\n- tests cover at least one success and one usage error path for each command\n- typecheck and test suite above pass.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T07:41:28.305Z — VERIFY — ok

By: ORCHESTRATOR

Note: Ran: bun run typecheck; bun run test:cli:core. Start/block now route via cli2 specs; legacy dispatch removed; lifecycle CLI tests updated.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T07:33:41.718Z, excerpt_hash=sha256:035c2e6095d0c022b098d0eb7fd6fa88c622277011b4c31aa54fbe7c67616a03

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
