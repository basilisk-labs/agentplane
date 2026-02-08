---
id: "202602071928-DD4P76"
title: "CLI2-052: Migrate recipes info/explain to cli2"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071928-TNFT8R"
tags:
  - "cli code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T02:47:54.562Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T02:49:21.776Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: migrated recipes info/explain to cli2 with spec-derived parsing/help/usage and routed via cli2 registry. Refactored implementations to accept parsed args (cmdRecipeInfoParsed/cmdRecipeExplainParsed) and updated run-cli recipes tests for new E_USAGE output/help hints. Checks: bun run typecheck, bun run lint, bun run format:check, bun run test:cli:unit."
commit:
  hash: "cac38c27624eb9ea7025778cbb033a6527e957d7"
  message: "✅ DD4P76 cli: migrate recipes info/explain to cli2"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: migrate recipes info/explain to cli2 with spec-derived parsing/help/usage; refactor implementations to accept parsed args; update run-cli recipes tests accordingly."
  -
    author: "ORCHESTRATOR"
    body: "Verified: recipes info/explain are cli2-routed with spec-derived help/usage; implementations accept parsed args entrypoints; tests passing (typecheck/lint/format/test:cli:unit)."
doc_version: 2
doc_updated_at: "2026-02-08T02:49:49.028Z"
doc_updated_by: "ORCHESTRATOR"
description: "Spec + wiring for `recipes info` / `recipes explain`."
---
## Summary

CLI2-052: Migrate recipes info/explain to cli2

Spec + wiring for `recipes info` / `recipes explain`.

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
bun run test:cli:recipes

### Pass criteria
- All commands above succeed.
- Help output for the command reflects the spec (no missing/extra options).
- Invalid inputs fail with E_USAGE and include compact usage.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T02:49:21.776Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: migrated recipes info/explain to cli2 with spec-derived parsing/help/usage and routed via cli2 registry. Refactored implementations to accept parsed args (cmdRecipeInfoParsed/cmdRecipeExplainParsed) and updated run-cli recipes tests for new E_USAGE output/help hints. Checks: bun run typecheck, bun run lint, bun run format:check, bun run test:cli:unit.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T02:47:54.705Z, excerpt_hash=sha256:49a21b4783624e46a2b558687273ceab46dfe2bee43a66b6c9c72eba5cd63609

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the cli2 wiring/spec for this command.
2. Restore legacy parsing/dispatch for the command.
3. Re-run the targeted CLI tests.
