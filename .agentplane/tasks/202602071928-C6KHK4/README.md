---
id: "202602071928-C6KHK4"
title: "CLI2-066: Migrate cleanup merged to cli2"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-FWTFRR"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T04:51:26.419Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: migrate cleanup merged to cli2 spec + handler; remove legacy parsing; keep behavior and tests."
verification:
  state: "ok"
  updated_at: "2026-02-08T04:53:55.508Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: Migrated cleanup merged to cli2 specs + handlers; removed legacy dispatcher; updated PR-flow cleanup tests for spec-derived usage/hints. Evidence: bun run typecheck, bun run lint, bun run test:cli."
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Add cli2 spec + handler for cleanup merged; register in help fast-path and main registry; remove legacy dispatcher; update tests for spec-derived usage/hints."
doc_version: 2
doc_updated_at: "2026-02-08T04:53:55.509Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for `cleanup merged`."
---
## Summary

CLI2-066: Migrate cleanup merged to cli2

Spec + wiring for `cleanup merged`.

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
#### 2026-02-08T04:53:55.508Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: Migrated cleanup merged to cli2 specs + handlers; removed legacy dispatcher; updated PR-flow cleanup tests for spec-derived usage/hints. Evidence: bun run typecheck, bun run lint, bun run test:cli.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T04:51:32.335Z, excerpt_hash=sha256:d5d903f5d4184aa0affc28a54413fddcf1d88e8a2bd363c1a0d7185ce327be73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
