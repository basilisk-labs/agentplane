---
id: "202602071928-ZK2PQG"
title: "CLI2-060: Migrate branch base get/set/clear/explain to cli2"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-BESS6N"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T04:27:51.016Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: migrate branch base commands to cli2 specs with parity; keep legacy behavior for now."
verification:
  state: "ok"
  updated_at: "2026-02-08T04:31:18.029Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: Migrated branch base get/set/clear/explain to cli2 specs; ran bun run typecheck, bun run lint, bun run test:cli (includes core suites)."
commit:
  hash: "dfe0a15b7e73f208e47992372016e366dfda5507"
  message: "✅ ZK2PQG cli: migrate branch base to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Migrate branch base get/set/clear/explain into cli2 specs + handlers; wire into run-cli registry and help fast-path, then update tests to assert spec-derived usage/hints and remove legacy dispatch for these subcommands."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Migrated branch base get/set/clear/explain to cli2 specs with subgroup help; removed legacy dispatcher for branch base; updated CLI tests for spec-derived usage format. Evidence: bun run typecheck, bun run lint, bun run test:cli."
doc_version: 2
doc_updated_at: "2026-02-08T04:31:52.971Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for `branch base ...` subcommands."
---
## Summary

CLI2-060: Migrate branch base get/set/clear/explain to cli2

Spec + wiring for `branch base ...` subcommands.

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
#### 2026-02-08T04:31:18.029Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: Migrated branch base get/set/clear/explain to cli2 specs; ran bun run typecheck, bun run lint, bun run test:cli (includes core suites).

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T04:27:56.917Z, excerpt_hash=sha256:d5d903f5d4184aa0affc28a54413fddcf1d88e8a2bd363c1a0d7185ce327be73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
