---
id: "202602071928-6MRYS0"
title: "CLI2-085: Migrate task doc set/show to cli2"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-HJ833H"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T06:08:33.595Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T06:15:40.153Z"
  updated_by: "ORCHESTRATOR"
  note: "typecheck: bun run typecheck\\ncli core: bun run test:cli:core\\nfast suite: bun run test:fast\\nResult: OK"
commit:
  hash: "c560d5cbaf9375f1a61129998aad790126859ace"
  message: "🚧 6MRYS0 cli: migrate task doc set/show to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: migrating task doc set/show to cli2. Will model task doc as a namespace command with set/show subcommands, remove legacy dispatcher, and update CLI core tests."
  -
    author: "ORCHESTRATOR"
    body: "Verified: task doc set/show migrated to cli2 with spec-driven parsing/help; bun run typecheck; bun run test:cli:core; bun run test:fast; bun run lint."
doc_version: 2
doc_updated_at: "2026-02-08T06:17:42.651Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for `task doc set/show`."
---
## Summary

CLI2-085: Migrate task doc set/show to cli2

Spec + wiring for `task doc set/show`.

## Scope

In scope:
- Add/adjust cli2 spec and wiring for this command.
- Remove any command-local argv parsing that duplicates spec.
- Update/extend CLI tests that cover this command.

Out of scope:
- Migrating unrelated commands.

## Plan

Plan:\n1. Define cli2 specs for task doc show and task doc set (subcommands under task doc).\n2. Preserve current behavior for section selection, quiet mode, --file vs inline text, and --updated-by validation.\n3. Wire specs into cli2 registry and remove legacy dispatcher for task doc.\n4. Update run-cli core tests to match cli2 error wording (missing value/unknown option) while preserving semantics.\n5. Run bun run typecheck, bun run test:cli:core, bun run test:fast.\n6. Record verification, commit, finish, and closure commit.

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
#### 2026-02-08T06:15:40.153Z — VERIFY — ok

By: ORCHESTRATOR

Note: typecheck: bun run typecheck\ncli core: bun run test:cli:core\nfast suite: bun run test:fast\nResult: OK

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T06:08:38.754Z, excerpt_hash=sha256:d5d903f5d4184aa0affc28a54413fddcf1d88e8a2bd363c1a0d7185ce327be73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
