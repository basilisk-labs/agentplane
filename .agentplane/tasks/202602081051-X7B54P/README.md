---
id: "202602081051-X7B54P"
title: "CLI2-FULL-020: Decompose recipes monolith and remove legacy routing"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081051-D35M4C"
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T10:52:24.768Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T11:17:35.962Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: removed recipes legacy CLI dispatch/parsers (cmdRecipes and parseRecipe* helpers), updated recipes tests to use cli2 specs + parsed command functions, and confirmed typecheck + cli core + fast tests pass."
commit:
  hash: "4301f76e5d24318cff758e2518c4b862be9f66ea"
  message: "✨ X7B54P cli: remove recipes legacy parsing"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: decompose commands/recipes.ts into focused modules, remove remaining legacy CLI routing/parsers, and keep behavior stable via tests."
  -
    author: "ORCHESTRATOR"
    body: "Verified: removed recipes legacy argv parsing/dispatch; deleted stale usage constants; recipes tests now parse via cli2 specs and call parsed impls; typecheck, lint, test:fast, and cli core tests all pass."
doc_version: 2
doc_updated_at: "2026-02-08T11:23:20.007Z"
doc_updated_by: "ORCHESTRATOR"
description: "Split commands/recipes.ts into per-command impl modules; remove remaining legacy CLI dispatch/parsers; keep behavior stable."
id_source: "generated"
---
## Summary


## Scope


## Plan

Decompose recipes monolith: split commands/recipes.ts into focused impl modules; remove any remaining legacy CLI routing/parsers; keep behavior stable via tests.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T11:17:35.962Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: removed recipes legacy CLI dispatch/parsers (cmdRecipes and parseRecipe* helpers), updated recipes tests to use cli2 specs + parsed command functions, and confirmed typecheck + cli core + fast tests pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T11:17:23.603Z, excerpt_hash=sha256:5a58934f46a6cc7c0b829b0df130bb79cadaef7c50fb3d94ea23c7b7de3f0b57

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Commands
- `bun run typecheck`
- `bun run test:cli:core`
- `bun run test:fast`

### Assertions
- `rg -n "parseRecipe" packages/agentplane/src/commands/recipes.ts` returns empty.
- `rg -n "export async function cmdRecipes\\(" packages/agentplane/src/commands/recipes.ts` returns empty.
- `rg -n "\\bcmdRecipes\\b" packages/agentplane/src/commands/recipes.test.ts` returns empty.

### Pass criteria
- All commands succeed.
- The assertions are satisfied.
