---
id: "202602081051-C1R7DS"
title: "CLI2-FULL-040: Add enforcement tests against legacy argv parsing"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081051-4W84S1"
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T10:52:26.274Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T12:20:31.297Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: added vitest regression guard packages/agentplane/src/cli/legacy-cli-regressions.test.ts to prevent legacy parse*Flags/usageMessage/process.argv or exported *_USAGE constants under commands/; ran typecheck, lint, and test:fast; rg assertions are clean."
commit:
  hash: "532088b885ef754c06b21dd9a0f7f933e4c0c32f"
  message: "✨ C1R7DS cli: add legacy regression tests"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: add vitest-based regression guards that fail when legacy parse*Flags or exported *_USAGE constants are reintroduced under packages/agentplane/src/commands."
  -
    author: "ORCHESTRATOR"
    body: "Verified: added repo-level vitest regression guards to prevent legacy CLI parsing/usage drift (parse*Flags, exported *_USAGE, usageMessage, process.argv) under packages/agentplane/src/commands; lint+typecheck+tests are green and rg assertions are clean."
doc_version: 2
doc_updated_at: "2026-02-08T12:21:31.762Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add tests that fail on parse*Flags, *_USAGE constants, or legacy argv entrypoints under commands; prevent regressions."
id_source: "generated"
---
## Summary


## Scope


## Plan

Add enforcement tests: fail on any reintroduced parse*Flags, *_USAGE constants, or legacy argv entrypoints; ensure tests are deterministic and low-noise.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T12:20:31.297Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: added vitest regression guard packages/agentplane/src/cli/legacy-cli-regressions.test.ts to prevent legacy parse*Flags/usageMessage/process.argv or exported *_USAGE constants under commands/; ran typecheck, lint, and test:fast; rg assertions are clean.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T12:19:00.612Z, excerpt_hash=sha256:00816f2ff834f5fd94be9ce9f0959f73bb38061fd373d803f7b7823bd6f5f743

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Commands
- `bun run typecheck`
- `bun run lint`
- `bun run test:fast`

### Assertions
- `rg -n "parse[A-Za-z0-9]*Flags\(" packages/agentplane/src/commands` returns empty.
- `rg -n "export const [A-Z0-9_]+_USAGE(_EXAMPLE)?\b" packages/agentplane/src/commands` returns empty.
- Regression test fails if any of the above patterns are reintroduced.

### Pass criteria
- All commands succeed.
- The assertions are satisfied.
