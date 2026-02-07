---
id: "202602071915-78ANFC"
title: "CLI2: core spec/parse/registry/help-render"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602071915-50D60W"
tags:
  - "cli"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T19:18:01.946Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T19:45:13.185Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: cli2 core modules implemented (spec/registry/parse/help-render/suggest/errors) with unit tests; typecheck passes; cli2 unit suite passes."
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: implement cli2 spec types, argv parser with validation/suggestions, registry match, and help renderers with unit tests."
doc_version: 2
doc_updated_at: "2026-02-07T19:45:13.186Z"
doc_updated_by: "ORCHESTRATOR"
description: "Implement cli2 microframework: CommandSpec types, argv parser w/ validation, command registry (longest prefix), did-you-mean suggestions, and help renderer (text/compact/json) with tests."
---
## Summary

Implement the spec-driven CLI core (`cli2`): command specs, argv parser with validations, command registry (longest-prefix matching), did-you-mean suggestions, and help rendering (text/compact/json) with unit tests.

## Scope

- `packages/agentplane/src/cli2/spec.ts`
- `packages/agentplane/src/cli2/parse.ts`
- `packages/agentplane/src/cli2/registry.ts`
- `packages/agentplane/src/cli2/suggest.ts`
- `packages/agentplane/src/cli2/help-render.ts`
- `packages/agentplane/src/cli2/*.test.ts`

## Plan

1. Define `CommandSpec/ArgSpec/OptionSpec/ExampleSpec`.
2. Implement `parseArgv(spec, argv)`:
- `--flag value`, `--flag=value`, `-m value`
- repeatable + minCount
- choices + pattern
- unknown option + suggestions
3. Implement `registry.match(tokens)` (longest prefix) + tests.
4. Implement help rendering: text/compact/json (strictly per the JSON contract).
5. Add unit tests for parse failures and rendering invariants.

## Risks

- Parser complexity (edge cases): keep v1 syntax intentionally small and cover the supported subset with tests.
- Non-deterministic output: enforce stable ordering in spec + JSON serialization.

## Verify Steps

### Scope
Unit tests must cover:
- missing value
- unknown option + did-you-mean
- repeatable + minCount
- enum/choices mismatch
- pattern mismatch
- longest-prefix matching

### Checks
- `bun run test:agentplane`

### Evidence / Commands
- `bun run test:agentplane`

### Pass criteria
- All cli2 tests pass.
- Parse errors surface as `CliError` with `code=E_USAGE` and deterministic usage output.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T19:45:13.185Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: cli2 core modules implemented (spec/registry/parse/help-render/suggest/errors) with unit tests; typecheck passes; cli2 unit suite passes.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-07T19:21:20.406Z, excerpt_hash=sha256:7a594033f871872ffa2013c91a625493e9aaa11fb6ad330e91d401f15f1514cb

Details:

Commands: bun run typecheck; bun run test:agentplane packages/agentplane/src/cli2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Delete `packages/agentplane/src/cli2/**` and the associated tests.
