---
id: "202602071928-7ETDMW"
title: "CLI2-112: Tests for help + spec contract"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-85K465"
tags:
  - "cli testing code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T08:19:26.913Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T08:21:25.457Z"
  updated_by: "ORCHESTRATOR"
  note: "Ran: bun run typecheck; bun run test:cli:core; bun run test:fast. Added help snapshots and a JSON-registry contract test for unique ids/options."
commit:
  hash: "b822577431eb40038a8bd69b357ad22211a3ec99"
  message: "🚧 7ETDMW test: add cli2 help snapshots and contract"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: add snapshot tests for cli2 help output and invariant/property tests for registry/spec to prevent help drift."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run typecheck; bun run test:cli:core; bun run test:fast. Added stable help snapshots and JSON-registry contract tests to prevent CLI help drift."
doc_version: 2
doc_updated_at: "2026-02-08T08:22:10.606Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add help snapshots and spec/registry invariant tests."
---
## Summary

CLI2-112: Tests for help + spec contract

Add help snapshots and spec/registry invariant tests.

## Scope

In scope:
- Add/adjust cli2 spec and wiring for this command.
- Remove any command-local argv parsing that duplicates spec.
- Update/extend CLI tests that cover this command.

Out of scope:
- Migrating unrelated commands.

## Plan

Scope: add tests that lock cli2 help output and validate spec/registry invariants to prevent drift.\n\nPlan:\n1) Add snapshot tests for agentplane help (text), and for selected commands in --compact and --json modes.\n2) Add registry/spec invariant tests: unique command ids; unique option names/shorts within a command; no longest-prefix ambiguities.\n3) Ensure tests are deterministic (stable ordering).\n\nVerification: bun run typecheck; bun run test:cli:core; bun run test:fast.

## Risks

- Behavior drift during migration (flags/positional parsing) if spec does not match the current implementation.
- Test brittleness due to exact string expectations.

## Verify Steps

Run:\n- bun run typecheck\n- bun run test:cli:core\n- bun run test:fast\n\nPass criteria:\n- new snapshots are stable\n- invariants tests fail on duplicate ids/options\n- all tests above pass.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T08:21:25.457Z — VERIFY — ok

By: ORCHESTRATOR

Note: Ran: bun run typecheck; bun run test:cli:core; bun run test:fast. Added help snapshots and a JSON-registry contract test for unique ids/options.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T08:19:27.200Z, excerpt_hash=sha256:ee3b9b20520150b5f3afde36b22aa6a9b86dfa0efffc783cd8374071d9d52ef3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
