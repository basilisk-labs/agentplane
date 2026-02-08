---
id: "202602081344-Q67G9W"
title: "Decompose CLI entrypoint run-cli.ts"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081344-5XQEDA"
tags:
  - "cli"
  - "code"
  - "refactor"
verify:
  - "bun run test:full"
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T14:03:03.462Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T14:10:15.355Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: split cli/run-cli.ts by extracting the command registry builder into cli/run-cli/registry.ts; bun run typecheck, bun run lint, and bun run test:full all pass."
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: split cli/run-cli.ts into focused modules and keep help/error behavior and the full test suite stable."
events: []
doc_version: 2
doc_updated_at: "2026-02-08T14:10:15.357Z"
doc_updated_by: "ORCHESTRATOR"
description: "Split cli/run-cli.ts into smaller modules (globals parsing, command routing, error/help plumbing) while preserving behavior and keeping full test suite green."
---
## Summary

Decompose the CLI entrypoint (cli/run-cli.ts) into smaller modules with clear responsibilities while preserving behavior and keeping tests green.

## Scope


## Plan

1. Identify cohesive boundaries inside cli/run-cli.ts (globals parsing, command match/dispatch, output/error formatting).
2. Move code into focused modules and keep run-cli.ts as a thin orchestrator (or facade).
3. Keep existing tests stable; update imports only where needed.
4. Run bun run typecheck, bun run lint, bun run test:full.

## Risks


## Verify Steps

Commands:
- bun run typecheck
- bun run lint
- bun run test:full

Pass criteria:
- Help snapshots and CLI contract tests still pass.
- Full suite passes.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T14:10:15.355Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: split cli/run-cli.ts by extracting the command registry builder into cli/run-cli/registry.ts; bun run typecheck, bun run lint, and bun run test:full all pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T14:03:10.235Z, excerpt_hash=sha256:391f44f7f8148e110a6e86422652fed60002f23081a5adef6e7d95e1ab762d95

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

1. Revert the implementation commit for 202602081344-Q67G9W.
2. Re-run bun run test:full.
3. Revert the close metadata commit if needed.
