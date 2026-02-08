---
id: "202602071928-CXK3WK"
title: "CLI2-072: Migrate commit to cli2"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-VGVCW3"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T05:11:55.057Z"
  updated_by: "ORCHESTRATOR"
  note: "OK: proceed with the cli2 migration; preserve behavior and keep tests as the contract."
verification:
  state: "ok"
  updated_at: "2026-02-08T05:14:37.290Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: bun run typecheck; bun run test:cli:core; commit wrapper is routed through cli2 spec with legacy dispatcher removed and tests updated."
commit:
  hash: "d68da548d1ec832d1815d080ec04812683ef3d24"
  message: "🚧 CXK3WK cli: migrate commit to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: migrate the commit wrapper to cli2 spec parsing, then delete the legacy commit dispatcher and update tests."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run typecheck; bun run test:cli:core; migrated commit wrapper to cli2 spec and removed legacy commit dispatcher without changing behavior."
doc_version: 2
doc_updated_at: "2026-02-08T05:15:17.140Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for `commit` (alias/shortcut)."
---
## Summary

CLI2-072: Migrate commit to cli2

Spec + wiring for `commit` (alias/shortcut).

## Scope

In scope:
- Add/adjust cli2 spec and wiring for this command.
- Remove any command-local argv parsing that duplicates spec.
- Update/extend CLI tests that cover this command.

Out of scope:
- Migrating unrelated commands.

## Plan

Scope: migrate  to cli2 spec-driven parsing and help, preserving existing runtime behavior (guard checks, allowlist, auto-allow, quiet).\n\nSteps:\n1) Add cli2 spec + handler for  (including -m/--message and allow flags).\n2) Wire command into cli2 registries (fast help + runtime).\n3) Remove legacy  parsing from run-cli.ts.\n4) Update/extend CLI core tests for usage/help and behavior parity.\n5) Verify: bun run typecheck; bun run test:cli:core.

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
#### 2026-02-08T05:14:37.290Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: bun run typecheck; bun run test:cli:core; commit wrapper is routed through cli2 spec with legacy dispatcher removed and tests updated.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T05:12:00.680Z, excerpt_hash=sha256:d5d903f5d4184aa0affc28a54413fddcf1d88e8a2bd363c1a0d7185ce327be73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
