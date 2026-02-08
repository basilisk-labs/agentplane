---
id: "202602081231-VXDAE2"
title: "Fix pre-push test failures after CLI2 migration"
status: "DONE"
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
  state: "ok"
  updated_at: "2026-02-08T12:36:29.564Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: added recipes/scenario namespace specs so missing/unknown subcommands render spec-derived usage; wrapped recipes install to rethrow E_USAGE with usage; updated smoke+recipes/scenario tests and help snapshot; bun typecheck/lint/test:full pass."
commit:
  hash: "36255b70361a771c38809bae76b35811a2630256"
  message: "✨ VXDAE2 cli: fix pre-push full test failures"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: fix full-suite test failures triggered by pre-push hook by improving CLI2 namespace routing (recipes/scenario) and aligning smoke/CLI tests with spec-driven usage output."
  -
    author: "ORCHESTRATOR"
    body: "Verified: pre-push full test suite now passes after adding CLI2 namespace routing for recipes/scenario (and recipes cache) and aligning tests/snapshots with spec-driven usage; git push succeeds again."
doc_version: 2
doc_updated_at: "2026-02-08T12:36:34.765Z"
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

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T12:36:29.564Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: added recipes/scenario namespace specs so missing/unknown subcommands render spec-derived usage; wrapped recipes install to rethrow E_USAGE with usage; updated smoke+recipes/scenario tests and help snapshot; bun typecheck/lint/test:full pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T12:31:46.686Z, excerpt_hash=sha256:6548e2f1fcff6637e26954a639fc57400adcb4faff2e8ec5d3ccee0a26a4e9f5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Commands
- `bun run typecheck`
- `bun run lint`
- `bun run test:full`

### Pass criteria
- Pre-push `lefthook` passes (no failing vitest files).
- `git push origin main` succeeds.
