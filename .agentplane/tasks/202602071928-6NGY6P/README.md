---
id: "202602071928-6NGY6P"
title: "CLI2-062: Migrate branch remove to cli2"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-85JRJD"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T04:37:50.505Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: migrate branch remove to cli2 spec + handler; remove legacy dispatcher and keep runtime behavior."
verification:
  state: "ok"
  updated_at: "2026-02-08T04:39:49.455Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: Migrated branch remove to cli2 spec + handler; removed legacy parsing; ran bun run typecheck, bun run lint, bun run test:cli (core suites included)."
commit:
  hash: "b236177214dc1c6f2fc645bd52faf671539e8276"
  message: "✅ 6NGY6P cli: migrate branch remove to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Add cli2 spec + handler for branch remove; wire into help fast-path + main registry, remove legacy parsing, and update core CLI tests to expect spec-derived usage/hints."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Migrated branch remove to cli2 spec + handler; registered in help fast-path and main cli2 registry; removed legacy parsing; kept runtime behavior. Evidence: bun run typecheck, bun run lint, bun run test:cli."
doc_version: 2
doc_updated_at: "2026-02-08T04:40:23.629Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for `branch remove`."
---
## Summary

CLI2-062: Migrate branch remove to cli2

Spec + wiring for `branch remove`.

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
bun run test:cli:core

### Pass criteria
- All commands above succeed.
- Help output for the command reflects the spec (no missing/extra options).
- Invalid inputs fail with E_USAGE and include compact usage.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T04:39:49.455Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: Migrated branch remove to cli2 spec + handler; removed legacy parsing; ran bun run typecheck, bun run lint, bun run test:cli (core suites included).

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T04:37:56.809Z, excerpt_hash=sha256:d5d903f5d4184aa0affc28a54413fddcf1d88e8a2bd363c1a0d7185ce327be73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
