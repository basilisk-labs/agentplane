---
id: "202602081051-QSHZVZ"
title: "CLI2-FULL-021: Decompose PR command monolith"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081051-X7B54P"
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T10:52:25.146Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T11:32:31.354Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: decomposed pr/index.ts into per-command modules (open/update/check/note/integrate) plus shared internals; removed legacy *_USAGE constants and usageMessage usage; updated workflow reexports; typecheck, lint, test:fast, and cli core tests pass."
commit:
  hash: "9eef9e56fc6863b8c5b06e9bc328f0d1cfe3eb9a"
  message: "✨ QSHZVZ cli: decompose pr commands"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: decompose the PR command implementation into smaller modules, remove any remaining legacy argv routing/parsing, and keep behavior stable via updated cli core tests and targeted unit tests."
  -
    author: "ORCHESTRATOR"
    body: "Verified: decomposed pr/index.ts into focused modules (open/update/check/note/integrate) with shared internals; removed legacy *_USAGE constants and usageMessage-based errors; updated workflow reexports; typecheck, format, lint, test:fast, and cli core PR flow tests all pass."
doc_version: 2
doc_updated_at: "2026-02-08T11:34:12.191Z"
doc_updated_by: "ORCHESTRATOR"
description: "Split commands/pr/index.ts into focused modules with clean boundaries and targeted tests."
id_source: "generated"
---
## Summary


## Scope


## Plan

Decompose PR monolith: split commands/pr/index.ts into focused modules; keep cli2 command handlers thin; keep behavior stable via tests.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T11:32:31.354Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: decomposed pr/index.ts into per-command modules (open/update/check/note/integrate) plus shared internals; removed legacy *_USAGE constants and usageMessage usage; updated workflow reexports; typecheck, lint, test:fast, and cli core tests pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T11:24:03.333Z, excerpt_hash=sha256:7bc5014efa5bbd821d821a27433aeda126d5ae599a39eed9f9587279b1d39262

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Commands
- `bun run typecheck`
- `bun run test:cli:core`
- `bun run test:fast`

### Assertions
- `rg -n \"parse[A-Za-z0-9]*Flags\\(\" packages/agentplane/src/commands` returns empty.
- `rg -n \"_USAGE(_EXAMPLE)?\b\" packages/agentplane/src/commands` returns empty.

### Pass criteria
- All commands succeed.
- The assertions are satisfied.
