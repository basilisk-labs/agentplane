---
id: "202602071928-7CJY3B"
title: "CLI2-088: Migrate task migrate/migrate-doc to cli2"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-V6RZ8Z"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T06:55:54.563Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T07:01:30.471Z"
  updated_by: "ORCHESTRATOR"
  note: "Ran: bun run typecheck; bun run test:cli:core."
commit:
  hash: "bba6dc006822f83ca7935464aa8931979e1c86b7"
  message: "🚧 7CJY3B cli: migrate task migrate/migrate-doc to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: migrating task migrate and task migrate-doc to cli2 specs, removing legacy flag parsing and dispatch, and aligning tests with cli2 errors."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Migrated task migrate and task migrate-doc to cli2 specs, moved input validation into the spec parser, removed legacy run-cli dispatch, and verified via typecheck + cli core tests."
doc_version: 2
doc_updated_at: "2026-02-08T07:03:17.834Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for migration commands."
---
## Summary

CLI2-088: Migrate task migrate/migrate-doc to cli2

Spec + wiring for migration commands.

## Scope

In scope:
- Add/adjust cli2 spec and wiring for this command.
- Remove any command-local argv parsing that duplicates spec.
- Update/extend CLI tests that cover this command.

Out of scope:
- Migrating unrelated commands.

## Plan

Plan:
1. Add cli2 specs + handlers for task migrate and task migrate-doc.
2. Refactor implementations to accept structured inputs and move argv parsing into cli2.
3. Register specs in cli2 registry and remove legacy dispatcher branches.
4. Update run-cli core tests for cli2 error wording (unknown/missing values).
5. Run verification: bun run typecheck; bun run test:cli:core.
6. Record verification, commit, finish, closure commit.

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
#### 2026-02-08T07:01:30.471Z — VERIFY — ok

By: ORCHESTRATOR

Note: Ran: bun run typecheck; bun run test:cli:core.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T06:55:54.689Z, excerpt_hash=sha256:d5d903f5d4184aa0affc28a54413fddcf1d88e8a2bd363c1a0d7185ce327be73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
