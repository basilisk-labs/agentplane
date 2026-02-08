---
id: "202602071928-Z82KCA"
title: "CLI2-086: Migrate task scrub/scaffold to cli2"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-6MRYS0"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T06:39:39.492Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T06:46:44.612Z"
  updated_by: "ORCHESTRATOR"
  note: "Ran: bun run typecheck; bun run test:cli:core; bun run test:fast."
commit:
  hash: "805577ca25bbd2406a66612907b015bb46636ebf"
  message: "🚧 Z82KCA cli: migrate task scrub/scaffold to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: migrating task scrub and task scaffold to cli2 (spec-driven parsing/help), removing legacy dispatch, and updating tests."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Migrated task scrub/scaffold to cli2 specs, removed legacy argv parsing/dispatch, updated tests, and verified with typecheck + test:cli:core + test:fast."
doc_version: 2
doc_updated_at: "2026-02-08T06:48:45.376Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for `task scrub` and `task scaffold`."
---
## Summary

CLI2-086: Migrate task scrub/scaffold to cli2

Spec + wiring for `task scrub` and `task scaffold`.

## Scope

In scope:
- Add/adjust cli2 spec and wiring for this command.
- Remove any command-local argv parsing that duplicates spec.
- Update/extend CLI tests that cover this command.

Out of scope:
- Migrating unrelated commands.

## Plan

Plan:
1. Add cli2 specs for task scrub and task scaffold (args/options, quiet/dry-run/overwrite/title as applicable).
2. Refactor implementations to accept structured inputs (no argv parsing).
3. Wire specs into cli2 registry and remove legacy dispatcher branches.
4. Update run-cli core tests to match cli2 error wording and ensure help includes all options.
5. Run bun run typecheck, bun run test:cli:core, bun run test:fast.
6. Record verification, commit, finish, and closure commit.

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
#### 2026-02-08T06:46:44.612Z — VERIFY — ok

By: ORCHESTRATOR

Note: Ran: bun run typecheck; bun run test:cli:core; bun run test:fast.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T06:39:44.030Z, excerpt_hash=sha256:d5d903f5d4184aa0affc28a54413fddcf1d88e8a2bd363c1a0d7185ce327be73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
