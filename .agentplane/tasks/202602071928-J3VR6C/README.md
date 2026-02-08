---
id: "202602071928-J3VR6C"
title: "CLI2-113: Generate docs from registry/spec (optional)"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-7ETDMW"
tags:
  - "cli docs code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T08:23:46.004Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T08:38:03.441Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: bun run typecheck, bun run test:cli:core, and bun run test:fast all pass; docs cli writes deterministic MDX derived from cli2 specs."
commit:
  hash: "080ed6df43654e343f2ed5b0265afa0001ea65d7"
  message: "🚧 J3VR6C docs: generate CLI reference from specs"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: implement a cli2 registry/spec docs generator (docs cli) with deterministic MDX output and coverage."
  -
    author: "ORCHESTRATOR"
    body: "Verified: docs cli renders deterministic MDX from cli2 specs; typecheck, cli core tests, and fast tests pass."
doc_version: 2
doc_updated_at: "2026-02-08T08:43:58.138Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add a generator to render registry/spec to Markdown/MDX and keep docs in sync."
---
## Summary

CLI2-113: Generate docs from registry/spec (optional)

Add a generator to render registry/spec to Markdown/MDX and keep docs in sync.

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

### Commands
- `bun run typecheck`
- `bun run test:cli:core`
- `bun run test:fast`

### Pass criteria
- `agentplane docs cli --out <path>` writes a deterministic MDX file derived from cli2 specs.
- The generated output includes core command groups and key migrated commands (e.g. `task new`).
- All commands above succeed.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T08:38:03.441Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: bun run typecheck, bun run test:cli:core, and bun run test:fast all pass; docs cli writes deterministic MDX derived from cli2 specs.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T08:37:51.179Z, excerpt_hash=sha256:065736de9b141364216f092dc216321131625b196ca7ab7f02907896cffdbcc5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
