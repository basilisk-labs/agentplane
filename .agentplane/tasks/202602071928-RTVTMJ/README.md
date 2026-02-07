---
id: "202602071928-RTVTMJ"
title: "CLI2-040: Migrate config show to cli2"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071927-ZGB1P1"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T20:16:38.865Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T20:18:34.442Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: migrated config show to cli2 registry with spec-derived help/usage and removed legacy dispatcher branch. Updated cli2 parser to accept global --yes for commands that do not declare it (preserves legacy update-check approval patterns); tests passing (typecheck/lint/format/test:cli:core)."
commit:
  hash: "4f4bd7cb775bec7fe7edade4a3dca72196545474"
  message: "✅ RTVTMJ cli: migrate config show to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: migrate config show to cli2 (spec-derived parsing/help/usage), remove legacy dispatcher branch, and keep output stable."
  -
    author: "ORCHESTRATOR"
    body: "Verified: config show is cli2-routed with spec-derived help/usage; legacy branch removed; cli2 parsing tolerates global --yes for approval patterns; tests passing (typecheck/lint/format/test:cli:core)."
doc_version: 2
doc_updated_at: "2026-02-07T20:19:02.758Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for `config show`."
---
## Summary

CLI2-040: Migrate config show to cli2

Spec + wiring for `config show`.

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
#### 2026-02-07T20:18:34.442Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: migrated config show to cli2 registry with spec-derived help/usage and removed legacy dispatcher branch. Updated cli2 parser to accept global --yes for commands that do not declare it (preserves legacy update-check approval patterns); tests passing (typecheck/lint/format/test:cli:core).

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-07T20:16:38.999Z, excerpt_hash=sha256:d5d903f5d4184aa0affc28a54413fddcf1d88e8a2bd363c1a0d7185ce327be73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
