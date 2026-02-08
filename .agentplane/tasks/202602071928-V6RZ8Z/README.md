---
id: "202602071928-V6RZ8Z"
title: "CLI2-087: Migrate task export/lint/normalize to cli2"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-Z82KCA"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T06:49:56.836Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T06:53:53.711Z"
  updated_by: "ORCHESTRATOR"
  note: "Ran: bun run typecheck; bun run test:cli:core."
commit:
  hash: "a089cb5f7b69959b87a96ba4bc7c65191586446d"
  message: "🚧 V6RZ8Z cli: migrate task export/lint/normalize to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: migrating task export/lint/normalize to cli2 specs, removing legacy parsing/dispatch, and updating run-cli core tests."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Migrated task export/lint/normalize to cli2 specs, removed legacy run-cli dispatch, moved normalize flag parsing into spec-driven parser, and verified via typecheck + run-cli core tests."
doc_version: 2
doc_updated_at: "2026-02-08T06:54:46.386Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for `task export/lint/normalize`."
---
## Summary

CLI2-087: Migrate task export/lint/normalize to cli2

Spec + wiring for `task export/lint/normalize`.

## Scope

In scope:
- Add/adjust cli2 spec and wiring for this command.
- Remove any command-local argv parsing that duplicates spec.
- Update/extend CLI tests that cover this command.

Out of scope:
- Migrating unrelated commands.

## Plan

Plan:
1. Add cli2 CommandSpec + handlers for: task export, task lint, task normalize.
2. Refactor implementations to accept structured inputs (no argv parsing inside command modules).
3. Register specs in cli2 registry and remove legacy dispatcher branches in run-cli.
4. Update/extend run-cli core tests to match cli2 parse error wording for these commands.
5. Run verification: bun run typecheck; bun run test:cli:core.
6. Record verification, commit changes, finish task, and create closure commit.

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
#### 2026-02-08T06:53:53.711Z — VERIFY — ok

By: ORCHESTRATOR

Note: Ran: bun run typecheck; bun run test:cli:core.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T06:50:01.745Z, excerpt_hash=sha256:d5d903f5d4184aa0affc28a54413fddcf1d88e8a2bd363c1a0d7185ce327be73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
