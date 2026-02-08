---
id: "202602081231-VXDAE2"
title: "Fix pre-push test failures after CLI2 migration"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "cli"
  - "code"
verify:
  - "bun run test:full"
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T12:31:41.658Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: fix full-suite test failures triggered by pre-push hook by improving CLI2 namespace routing (recipes/scenario) and aligning smoke/CLI tests with spec-driven usage output."
doc_version: 2
doc_updated_at: "2026-02-08T12:31:46.686Z"
doc_updated_by: "ORCHESTRATOR"
description: "Pre-push hook runs bun test:full; update CLI2 namespace routing (recipes/scenario) and tests to match spec-driven usage so full suite passes and push succeeds."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Add namespace specs for recipes/scenario (and recipes cache) so missing/unknown subcommands produce spec-derived usage instead of falling back to help usage.
2) Wrap recipes install handler to rethrow E_USAGE as usageError(recipesInstallSpec) so usage is included.
3) Update smoke test to use canonical plural 'recipes' (no 'recipe' alias).
4) Update run-cli.recipes/scenario tests to assert the new spec-derived usage formatting.
5) Run bun typecheck/lint/test:full and re-attempt git push.

## Risks


## Verification


## Rollback Plan


## Verify Steps

### Commands
- `bun run typecheck`
- `bun run lint`
- `bun run test:full`

### Pass criteria
- Pre-push `lefthook` passes (no failing vitest files).
- `git push origin main` succeeds.
