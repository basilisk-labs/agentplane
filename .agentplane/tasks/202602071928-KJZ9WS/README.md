---
id: "202602071928-KJZ9WS"
title: "CLI2-064: Migrate pr open/update/check/note to cli2"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-6NGY6P"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T04:40:57.679Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: migrate pr open/update/check/note to cli2 specs + handlers; remove legacy dispatcher and keep behavior."
verification:
  state: "ok"
  updated_at: "2026-02-08T04:45:55.673Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: Migrated pr open/update/check/note to cli2 specs + handlers; removed legacy dispatcher; updated PR-flow CLI tests for spec-derived usage/hints. Evidence: bun run typecheck, bun run lint, bun run test:cli."
commit:
  hash: "dcd56a2f1166661e4e49b1d8c7133a130e7bfaa6"
  message: "✅ KJZ9WS cli: migrate pr commands to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Add cli2 specs + handlers for pr open/update/check/note; register in help fast-path and main cli2 registry; remove legacy parsing/dispatch; update core PR-flow CLI tests to assert spec-derived usage/hints."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Migrated pr open/update/check/note to cli2 specs + handlers and registered for help; removed legacy argv parsing/dispatch; updated PR-flow tests to assert spec-derived usage/hints. Evidence: bun run typecheck, bun run lint, bun run test:cli."
doc_version: 2
doc_updated_at: "2026-02-08T04:46:32.840Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for `pr open/update/check/note`."
---
## Summary

CLI2-064: Migrate pr open/update/check/note to cli2

Spec + wiring for `pr open/update/check/note`.

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
#### 2026-02-08T04:45:55.673Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: Migrated pr open/update/check/note to cli2 specs + handlers; removed legacy dispatcher; updated PR-flow CLI tests for spec-derived usage/hints. Evidence: bun run typecheck, bun run lint, bun run test:cli.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T04:41:02.417Z, excerpt_hash=sha256:d5d903f5d4184aa0affc28a54413fddcf1d88e8a2bd363c1a0d7185ce327be73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
