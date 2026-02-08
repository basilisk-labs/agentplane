---
id: "202602071928-3758Z4"
title: "CLI2-101: Migrate verify (record-only) to cli2"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-F5FD34"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T07:44:36.126Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T07:49:05.134Z"
  updated_by: "ORCHESTRATOR"
  note: "Ran: bun run typecheck; bun run test:cli:core. verify command is now spec-driven via cli2, legacy routing removed, and lifecycle tests updated for new error formatting."
commit:
  hash: "0b4a3e1c4232f5114d4a2178c5122d4b40d01703"
  message: "🚧 3758Z4 cli: migrate verify to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: migrate verify (record-only) CLI entrypoint to cli2 spec, remove legacy routing, and update coverage for usage + parsing behavior."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run typecheck; bun run test:cli:core. verify now routes via cli2 spec with validation + suggestions, legacy routing removed, tests updated."
doc_version: 2
doc_updated_at: "2026-02-08T07:49:39.757Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for `verify` (record-only)."
---
## Summary

CLI2-101: Migrate verify (record-only) to cli2

Spec + wiring for `verify` (record-only).

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

Run:\n- bun run typecheck\n- bun run test:cli:core\n\nPass criteria:\n- agentplane verify <task-id> --ok|--rework routes via cli2\n- legacy verify routing is removed\n- tests cover at least one ok and one usage-error case.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T07:49:05.134Z — VERIFY — ok

By: ORCHESTRATOR

Note: Ran: bun run typecheck; bun run test:cli:core. verify command is now spec-driven via cli2, legacy routing removed, and lifecycle tests updated for new error formatting.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T07:44:36.407Z, excerpt_hash=sha256:ec81e1a22edfa988f08cb7e8145f5584db150afda42d3723bd13aa041e1d8f92

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
