---
id: "202602071928-HJ833H"
title: "CLI2-084: Migrate task comment + set-status to cli2"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-QZ8W8Z"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T06:01:02.473Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T06:05:26.389Z"
  updated_by: "ORCHESTRATOR"
  note: "typecheck: bun run typecheck\\ncli core: bun run test:cli:core\\nfast suite: bun run test:fast\\nResult: OK"
commit:
  hash: "361c40852799e1d13bc6fe55040bb7e869679d1f"
  message: "🚧 HJ833H cli: migrate task comment/set-status to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: migrating task comment and task set-status to cli2 (spec-driven parsing + help). Will refactor implementations to take structured inputs and update run-cli core tests."
  -
    author: "ORCHESTRATOR"
    body: "Verified: task comment and task set-status migrated to cli2 spec-driven parsing/help; bun run typecheck; bun run test:cli:core; bun run test:fast; bun run lint."
doc_version: 2
doc_updated_at: "2026-02-08T06:07:40.535Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for `task comment` and `task set-status`."
---
## Summary

CLI2-084: Migrate task comment + set-status to cli2

Spec + wiring for `task comment` and `task set-status`.

## Scope

In scope:
- Add/adjust cli2 spec and wiring for this command.
- Remove any command-local argv parsing that duplicates spec.
- Update/extend CLI tests that cover this command.

Out of scope:
- Migrating unrelated commands.

## Plan

Plan:\n1. Add cli2 specs for task comment and task set-status (args/options, including commit flags and policy toggles).\n2. Refactor command implementations to accept structured inputs (no argv parsing).\n3. Wire specs into cli2 registry and remove legacy dispatcher branches.\n4. Update unit tests for both direct command functions and run-cli core suites (including error wording changes from cli2 parser).\n5. Run bun run typecheck and bun run test:cli:core (plus bun run test:fast for hook parity).\n6. Record verification, commit implementation, finish task, and commit closure README.

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
#### 2026-02-08T06:05:26.389Z — VERIFY — ok

By: ORCHESTRATOR

Note: typecheck: bun run typecheck\ncli core: bun run test:cli:core\nfast suite: bun run test:fast\nResult: OK

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T06:01:08.967Z, excerpt_hash=sha256:d5d903f5d4184aa0affc28a54413fddcf1d88e8a2bd363c1a0d7185ce327be73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
