---
id: "202602071928-T078T3"
title: "CLI2-082: Migrate task add to cli2"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-5T378D"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T05:36:43.763Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: migrate task add to cli2 with spec-driven parsing and tests as the contract."
verification:
  state: "ok"
  updated_at: "2026-02-08T05:44:28.877Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: bun run typecheck; bun run test:cli:core; bun run lint; migrated task add to cli2 spec-driven parsing/help and removed legacy run-cli dispatch, with command logic consuming structured inputs."
commit:
  hash: "a2c76a727418c787e3f33328caf865680d455230"
  message: "🚧 T078T3 cli: migrate task add to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: implement cli2 spec/handler for task add, route it through the registry, delete the legacy dispatcher branch, and update tests for spec-driven usage/errors."
  -
    author: "ORCHESTRATOR"
    body: "Verified: migrated task add to cli2; bun run test:fast; bun run lint; bun run typecheck; help/usage derived from spec."
doc_version: 2
doc_updated_at: "2026-02-08T05:51:46.875Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for `task add`."
---
## Summary

CLI2-082: Migrate task add to cli2

Spec + wiring for `task add`.

## Scope

In scope:
- Add/adjust cli2 spec and wiring for this command.
- Remove any command-local argv parsing that duplicates spec.
- Update/extend CLI tests that cover this command.

Out of scope:
- Migrating unrelated commands.

## Plan

Scope: migrate `task add` to cli2 spec-driven parsing/help and remove legacy dispatch for this command.

Steps:
1) Add cli2 spec + handler for `task add` (positional task id(s), required fields, repeatable options, and comment options).
2) Refactor `cmdTaskAdd` to consume spec-parsed input (avoid manual argv parsing drift).
3) Wire command into cli2 registries (fast help + runtime) and remove the legacy `task add` branch in run-cli.ts.
4) Update CLI core tests for usage/errors parity.
5) Verify: bun run typecheck; bun run test:cli:core.

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
#### 2026-02-08T05:44:28.877Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: bun run typecheck; bun run test:cli:core; bun run lint; migrated task add to cli2 spec-driven parsing/help and removed legacy run-cli dispatch, with command logic consuming structured inputs.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T05:36:49.329Z, excerpt_hash=sha256:d5d903f5d4184aa0affc28a54413fddcf1d88e8a2bd363c1a0d7185ce327be73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
