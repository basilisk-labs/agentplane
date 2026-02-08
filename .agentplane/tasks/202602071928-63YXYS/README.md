---
id: "202602071928-63YXYS"
title: "CLI2-073: Migrate hooks install/uninstall/run to cli2"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-CXK3WK"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T05:15:51.056Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: migrate hooks commands to spec-driven cli2 with parity tests."
verification:
  state: "ok"
  updated_at: "2026-02-08T05:20:07.033Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: bun run typecheck; bun run test:cli:core; migrated hooks install/uninstall/run to cli2 specs, wired into registry, and removed the legacy hooks dispatcher."
commit:
  hash: "b41541958474252a09cda71eaf9e2c63778c17d5"
  message: "🚧 63YXYS cli: migrate hooks commands to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: implement cli2 specs/handlers for hooks install/uninstall/run, wire into registry, then delete the legacy hooks dispatcher."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run typecheck; bun run test:cli:core; migrated hooks install/uninstall/run to cli2 specs and removed the legacy hooks dispatcher while keeping init hook installation working."
doc_version: 2
doc_updated_at: "2026-02-08T05:21:18.797Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for hooks commands."
---
## Summary

CLI2-073: Migrate hooks install/uninstall/run to cli2

Spec + wiring for hooks commands.

## Scope

In scope:
- Add/adjust cli2 spec and wiring for this command.
- Remove any command-local argv parsing that duplicates spec.
- Update/extend CLI tests that cover this command.

Out of scope:
- Migrating unrelated commands.

## Plan

Scope: migrate hooks install/uninstall/run to cli2 specs and remove legacy hooks parsing.

Steps:
1) Add cli2 specs + handlers for hooks group and leaf commands.
2) Wire commands into cli2 registries (fast help + runtime).
3) Remove legacy namespace === "hooks" dispatcher from run-cli.ts.
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
#### 2026-02-08T05:20:07.033Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: bun run typecheck; bun run test:cli:core; migrated hooks install/uninstall/run to cli2 specs, wired into registry, and removed the legacy hooks dispatcher.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T05:16:03.502Z, excerpt_hash=sha256:d5d903f5d4184aa0affc28a54413fddcf1d88e8a2bd363c1a0d7185ce327be73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
