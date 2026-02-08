---
id: "202602081238-E47R1X"
title: "Decompose commands/recipes.ts"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "cli"
  - "code"
  - "refactor"
verify:
  - "bun run test:full"
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T12:39:22.678Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T12:53:29.731Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: bun run typecheck; bun run lint; bun run test:full (704 tests)."
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: decompose packages/agentplane/src/commands/recipes.ts into smaller modules under commands/recipes/ while keeping the CLI2 specs stable and all tests passing."
doc_version: 2
doc_updated_at: "2026-02-08T12:53:29.732Z"
doc_updated_by: "ORCHESTRATOR"
description: "Split packages/agentplane/src/commands/recipes.ts into focused modules (index/cache, install, manifest validation, IO helpers). Keep CLI2 specs unchanged and preserve behavior; update tests as needed."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Identify logical areas inside packages/agentplane/src/commands/recipes.ts (index cache IO, manifest validation, install application, list/remove, shared utils).
2) Extract modules under packages/agentplane/src/commands/recipes/internal/* (and/or install-impl.ts etc) and keep a thin packages/agentplane/src/commands/recipes.ts facade with exports used by *.command.ts.
3) Keep public exports stable; update import sites and tests.
4) Run bun typecheck/lint/test:full; update snapshots if needed.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T12:53:29.731Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: bun run typecheck; bun run lint; bun run test:full (704 tests).

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T12:39:30.095Z, excerpt_hash=sha256:5798c6423a378a7e6ba7e1c322554a26623ee760b973b274f12f2d7bda541df7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Commands
- `bun run typecheck`
- `bun run lint`
- `bun run test:full`

### Pass criteria
- `packages/agentplane/src/commands/recipes.ts` is split into smaller modules under `packages/agentplane/src/commands/recipes/` (or `internal/`) with clear boundaries.
- No behavior changes (CLI2 tests + recipes/scenario/cli smoke tests still pass).
- No legacy CLI patterns reintroduced (legacy regression tests pass).
