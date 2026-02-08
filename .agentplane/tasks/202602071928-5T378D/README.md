---
id: "202602071928-5T378D"
title: "CLI2-080: Migrate task list/next/search/show to cli2"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-63YXYS"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T05:22:04.376Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: migrate read-only task commands to cli2 with parity tests and core verification."
verification:
  state: "ok"
  updated_at: "2026-02-08T05:30:45.809Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: bun run typecheck; bun run test:cli:core; migrated task list/next/search/show to cli2 specs, refactored implementations to accept validated filters, and removed legacy dispatch for these commands."
commit:
  hash: "002d31fb0beae0777eebfc1dc5d0bf30aeb4f4d8"
  message: "🚧 5T378D cli: migrate read-only task commands to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: add cli2 specs/handlers for task list/next/search/show and a task group command, wire into registry, then remove the legacy dispatcher branches."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run typecheck; bun run test:cli:core; migrated task list/next/search/show to cli2 specs and refactored implementations to accept validated filters, keeping other task subcommands on legacy dispatch."
doc_version: 2
doc_updated_at: "2026-02-08T05:34:27.584Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for read-only task commands."
---
## Summary

CLI2-080: Migrate task list/next/search/show to cli2

Spec + wiring for read-only task commands.

## Scope

In scope:
- Add/adjust cli2 spec and wiring for this command.
- Remove any command-local argv parsing that duplicates spec.
- Update/extend CLI tests that cover this command.

Out of scope:
- Migrating unrelated commands.

## Plan

Scope: migrate read-only task commands (task list/next/search/show) to cli2 specs and remove their legacy dispatch.

Steps:
1) Add cli2 specs + handlers for task group and leaf commands.
2) Wire commands into cli2 registries (fast help + runtime).
3) Remove legacy dispatch branches for these commands in run-cli.ts.
4) Update CLI core tests for usage/help and behavior parity.
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
#### 2026-02-08T05:30:45.809Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: bun run typecheck; bun run test:cli:core; migrated task list/next/search/show to cli2 specs, refactored implementations to accept validated filters, and removed legacy dispatch for these commands.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T05:22:08.332Z, excerpt_hash=sha256:d5d903f5d4184aa0affc28a54413fddcf1d88e8a2bd363c1a0d7185ce327be73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
