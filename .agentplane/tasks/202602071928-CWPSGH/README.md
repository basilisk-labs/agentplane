---
id: "202602071928-CWPSGH"
title: "CLI2-090: Migrate task verify commands to cli2"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-623HH2"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T07:23:03.566Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T07:29:41.666Z"
  updated_by: "ORCHESTRATOR"
  note: "Ran: bun run typecheck; bun run test:cli:core."
commit:
  hash: "a6400eea6ea09e73d0e2c074e82c6107166da1ed"
  message: "🚧 CWPSGH cli: migrate task verify to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: migrating task verify (ok/rework + verify-show) to cli2 specs, refactoring handlers to structured inputs, removing legacy dispatch, and updating tests."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run typecheck; bun run test:cli:core. Migrated task verify commands to cli2 leaf commands."
doc_version: 2
doc_updated_at: "2026-02-08T07:32:43.506Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for `task verify ...` and `task verify-show`."
---
## Summary

CLI2-090: Migrate task verify commands to cli2

Spec + wiring for `task verify ...` and `task verify-show`.

## Scope

In scope:
- Add/adjust cli2 spec and wiring for this command.
- Remove any command-local argv parsing that duplicates spec.
- Update/extend CLI tests that cover this command.

Out of scope:
- Migrating unrelated commands.

## Plan

Plan:
1. Add cli2 specs for: task verify (parent), task verify ok, task verify rework, task verify-show.
2. Refactor verify-record implementation to accept structured inputs (no argv parsing in task verify handlers).
3. Register specs in cli2 registry and remove legacy run-cli dispatch branches for task verify/verify-show.
4. Update tests (workflow + run-cli core) to use the new handlers and cli2 parse wording.
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
#### 2026-02-08T07:29:41.666Z — VERIFY — ok

By: ORCHESTRATOR

Note: Ran: bun run typecheck; bun run test:cli:core.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T07:23:08.578Z, excerpt_hash=sha256:d5d903f5d4184aa0affc28a54413fddcf1d88e8a2bd363c1a0d7185ce327be73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
