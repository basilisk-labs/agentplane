---
id: "202602071928-VGVCW3"
title: "CLI2-071: Migrate guard commit to cli2"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-ZJMZY4"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T05:01:21.464Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: migrate guard commit (-m/--message, allow flags, auto-allow, require-clean) to cli2 spec + handler; remove legacy dispatcher and update tests."
verification:
  state: "ok"
  updated_at: "2026-02-08T05:08:50.132Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: bun run typecheck; bun run test:cli:core; cli2 guard commit routes via spec, and guard namespace uses guardSpec for unknown subcommands."
commit:
  hash: "76fdda4849b6d159af0042870f52f6e3af7d67b8"
  message: "🚧 VGVCW3 cli: migrate guard commit to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Implement cli2 spec + handler for guard commit with -m/--message, repeatable --allow, allow-* flags, --auto-allow behavior, and --require-clean; wire into registries, remove legacy parsing, and update guard CLI tests for spec-derived usage/hints."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run typecheck; bun run test:cli:core; migrated guard commit to cli2 with spec-derived help and preserved runtime policy behavior."
doc_version: 2
doc_updated_at: "2026-02-08T05:10:43.741Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for `guard commit` (-m, allow flags, auto-allow, require-clean)."
---
## Summary

CLI2-071: Migrate guard commit to cli2

Spec + wiring for `guard commit` (-m, allow flags, auto-allow, require-clean).

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
#### 2026-02-08T05:08:50.132Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: bun run typecheck; bun run test:cli:core; cli2 guard commit routes via spec, and guard namespace uses guardSpec for unknown subcommands.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T05:01:21.645Z, excerpt_hash=sha256:d5d903f5d4184aa0affc28a54413fddcf1d88e8a2bd363c1a0d7185ce327be73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
