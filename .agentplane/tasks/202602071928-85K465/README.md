---
id: "202602071928-85K465"
title: "CLI2-111: Remove legacy run-cli dispatcher"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-Q7XXG6"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T08:05:07.287Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T08:16:35.821Z"
  updated_by: "ORCHESTRATOR"
  note: "Ran: bun run typecheck; bun run test:cli:core; bun run test:fast. Removed legacy run-cli dispatcher; all commands now route through cli2 registry with did-you-mean suggestions for unknown commands."
commit:
  hash: "24c384f718362722875afe67a96c19a5846c3fef"
  message: "🚧 85K465 cli: remove legacy run-cli dispatcher"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: remove legacy manual run-cli dispatcher and route all commands through the cli2 registry, updating error handling and tests as needed."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run typecheck; bun run test:cli:core; bun run test:fast. run-cli now uses cli2 registry as the sole router; ready and task derive are spec-driven; unknown commands provide did-you-mean suggestions."
doc_version: 2
doc_updated_at: "2026-02-08T08:18:29.102Z"
doc_updated_by: "ORCHESTRATOR"
description: "Replace manual dispatch in `run-cli.ts` with a thin adapter delegating to cli2 router."
---
## Summary

CLI2-111: Remove legacy run-cli dispatcher

Replace manual dispatch in `run-cli.ts` with a thin adapter delegating to cli2 router.

## Scope

In scope:
- Add/adjust cli2 spec and wiring for this command.
- Remove any command-local argv parsing that duplicates spec.
- Update/extend CLI tests that cover this command.

Out of scope:
- Migrating unrelated commands.

## Plan

Scope: delete the legacy manual run-cli dispatcher and route all commands through the cli2 CommandRegistry, making cli2 the only command router.\n\nPlan:\n1) Build a single registry for all commands and route runCli through registry.match + parseCommandArgv.\n2) Remove the legacy dispatcher branches and any now-unused legacy parsers/imports.\n3) Ensure unknown command and unknown option errors are consistent (E_USAGE with cli2 help hints).\n4) Update tests if behavior/output changed.\n\nVerification: bun run typecheck; bun run test:cli:core; bun run test:fast.

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
#### 2026-02-08T08:16:35.821Z — VERIFY — ok

By: ORCHESTRATOR

Note: Ran: bun run typecheck; bun run test:cli:core; bun run test:fast. Removed legacy run-cli dispatcher; all commands now route through cli2 registry with did-you-mean suggestions for unknown commands.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T08:05:07.569Z, excerpt_hash=sha256:d5d903f5d4184aa0affc28a54413fddcf1d88e8a2bd363c1a0d7185ce327be73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
