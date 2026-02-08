---
id: "202602081051-BAY4H5"
title: "CLI2-FULL-010: Remove legacy argv parsing from upgrade"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T10:52:23.636Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T10:56:54.350Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: removed legacy upgrade argv parsing (parseUpgradeFlags/usage constants/cmdUpgrade wrapper), updated extractArchive API, and confirmed typecheck + cli core + fast tests pass."
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: remove legacy upgrade argv parsing and usage constants, migrate unit tests to parsed-only API, and keep CLI behavior spec-driven."
events: []
doc_version: 2
doc_updated_at: "2026-02-08T10:56:54.351Z"
doc_updated_by: "ORCHESTRATOR"
description: "Delete parseUpgradeFlags/usage constants and legacy argv entrypoints; migrate tests to spec-driven/parsed APIs."
id_source: "generated"
---
## Summary


## Scope


## Plan

Remove legacy upgrade argv parsing: delete parse/usage constants and legacy argv entrypoints; rewrite tests to use parsed-only APIs or runCli.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T10:56:54.350Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: removed legacy upgrade argv parsing (parseUpgradeFlags/usage constants/cmdUpgrade wrapper), updated extractArchive API, and confirmed typecheck + cli core + fast tests pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T10:56:42.439Z, excerpt_hash=sha256:c03bf8f1c7d84f2aa83c2fab81c935aac32925c4ba0e6d4b1e13bf8874bbf69c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Commands
- `bun run typecheck`
- `bun run test:cli:core`
- `bun run test:fast`

### Assertions
- `rg -n "parseUpgradeFlags\\(" packages/agentplane/src/commands/upgrade.ts` returns empty.
- `rg -n "UPGRADE_USAGE(_EXAMPLE)?\\b" packages/agentplane/src/commands/upgrade.ts` returns empty.
- `rg -n "cmdUpgrade\\(" packages/agentplane/src/commands/upgrade.ts packages/agentplane/src/commands` returns empty.

### Pass criteria
- All commands succeed.
- The assertions are satisfied.
