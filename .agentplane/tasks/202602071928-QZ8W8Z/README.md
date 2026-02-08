---
id: "202602071928-QZ8W8Z"
title: "CLI2-083: Migrate task update to cli2"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-T078T3"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T05:53:24.985Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T05:59:01.177Z"
  updated_by: "ORCHESTRATOR"
  note: "typecheck: bun run typecheck\\ncli core: bun run test:cli:core\\nfast suite: bun run test:fast\\nResult: OK"
commit:
  hash: "0e23faa882e29effd88018e208efe4d376dc4039"
  message: "🚧 QZ8W8Z cli: migrate task update to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: migrating task update to cli2 (spec-driven parsing + help). Will refactor cmdTaskUpdate to take structured inputs, wire registry, remove legacy dispatcher, and update tests."
  -
    author: "ORCHESTRATOR"
    body: "Verified: task update migrated to cli2 spec-driven parsing/help; bun run typecheck; bun run test:cli:core; bun run test:fast."
doc_version: 2
doc_updated_at: "2026-02-08T06:00:14.280Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for `task update` (replace-* flags, depends-on, verify)."
---
## Summary

CLI2-083: Migrate task update to cli2

Spec + wiring for `task update` (replace-* flags, depends-on, verify).

## Scope

In scope:
- Add/adjust cli2 spec and wiring for this command.
- Remove any command-local argv parsing that duplicates spec.
- Update/extend CLI tests that cover this command.

Out of scope:
- Migrating unrelated commands.

## Plan

Plan:\n1. Define cli2 spec for task update (args/options/choices/repeatable/minCount) matching current semantics.\n2. Refactor cmdTaskUpdate implementation to accept parsed structured opts (no argv parsing).\n3. Wire spec into cli2 registry and remove legacy dispatcher branch for task update.\n4. Update/extend unit tests (workflow and run-cli core) to cover key flags: replace-tags/verify/depends-on, status, comment metadata, and E_USAGE cases.\n5. Run bun run typecheck and bun run test:cli:core (plus bun run test:fast if needed).\n6. Record verification, commit implementation, finish task, and commit closure README.

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
#### 2026-02-08T05:59:01.177Z — VERIFY — ok

By: ORCHESTRATOR

Note: typecheck: bun run typecheck\ncli core: bun run test:cli:core\nfast suite: bun run test:fast\nResult: OK

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T05:53:37.195Z, excerpt_hash=sha256:d5d903f5d4184aa0affc28a54413fddcf1d88e8a2bd363c1a0d7185ce327be73

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
