---
id: "202602071928-BESS6N"
title: "CLI2-056: Migrate backend sync + sync alias to cli2"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-W8696Q"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T04:14:10.634Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T04:24:23.690Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: Migrated backend sync + sync alias to cli2 specs; ran bun run typecheck, bun run lint, bun run test:cli, and bun run test."
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: migrate backend sync and sync alias to cli2 with spec-derived parsing/help/usage; refactor backend commands to accept parsed flags entrypoints; update run-cli tests accordingly."
doc_version: 2
doc_updated_at: "2026-02-08T04:24:23.691Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for `backend sync` and top-level `sync` alias."
---
## Summary

CLI2-056: Migrate backend sync + sync alias to cli2

Spec + wiring for `backend sync` and top-level `sync` alias.

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

### Scope
Validate that the migrated command parses via cli2 spec, renders correct help (text/compact/json where applicable), and preserves runtime behavior.

### Checks
- TypeScript build
- Targeted CLI suites

### Evidence / Commands
bun run typecheck
bun run test:cli:recipes

### Pass criteria
- All commands above succeed.
- Help output for the command reflects the spec (no missing/extra options).
- Invalid inputs fail with E_USAGE and include compact usage.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T04:24:23.690Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: Migrated backend sync + sync alias to cli2 specs; ran bun run typecheck, bun run lint, bun run test:cli, and bun run test.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T04:14:10.770Z, excerpt_hash=sha256:49a21b4783624e46a2b558687273ceab46dfe2bee43a66b6c9c72eba5cd63609

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
