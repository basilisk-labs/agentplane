---
id: "202602081344-GF5VSS"
title: "Decompose recipes impl commands module"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081344-Q67G9W"
tags:
  - "cli"
  - "code"
  - "refactor"
verify:
  - "bun run test:full"
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T14:12:39.680Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T14:21:07.211Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: bun run test:full (vitest) PASS after splitting recipes impl commands monolith into per-command modules; behavior preserved; lint/typecheck clean."
commit:
  hash: "34e22d3454f8ace5726042212a8aaab5bab68175"
  message: "✨ GF5VSS recipes: split impl commands into per-command modules"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: split recipes impl commands into per-command modules and keep recipes CLI behavior and the full suite stable."
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run test:full PASS (vitest run, 704 tests). Refactor: split recipes impl commands monolith into per-command modules; no behavior changes; lint/typecheck clean."
events: []
doc_version: 2
doc_updated_at: "2026-02-08T14:22:01.776Z"
doc_updated_by: "ORCHESTRATOR"
description: "Split commands/recipes/impl/commands.ts into per-command modules (list/install/remove/cache/explain) with stable shared helpers and keep all tests green."
---
## Summary

Decompose commands/recipes/impl/commands.ts into smaller per-command modules while preserving behavior and test coverage.

## Scope


## Plan

1. Split the large commands module into per-command handlers (list, list-remote, info, explain, install, remove, cache).
2. Keep shared helpers in existing impl modules (index, apply, archive, manifest, format, etc).
3. Update imports/exports so existing command entrypoints keep working.
4. Run bun run typecheck, bun run lint, bun run test:full.

## Risks

1. Behavior regressions in recipes install branching and on-conflict handling.
2. Changes in help/error outputs due to handler moves.
3. Import cycles between recipes impl modules.

## Verify Steps

Commands:
- bun run typecheck
- bun run lint
- bun run test:full

Pass criteria:
- recipes-related tests pass (run-cli.recipes + commands/recipes).
- Full suite passes.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T14:21:07.211Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: bun run test:full (vitest) PASS after splitting recipes impl commands monolith into per-command modules; behavior preserved; lint/typecheck clean.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T14:12:45.727Z, excerpt_hash=sha256:a6ee31fb41d834b9b97561035581727cdf66253311c0a8e690a76953f60f7a50

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the implementation commit for 202602081344-GF5VSS.
2. Re-run bun run test:full.
3. Revert close metadata commit if needed.
