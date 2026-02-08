---
id: "202602081051-4W84S1"
title: "CLI2-FULL-030: Decompose run-cli.ts"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081051-0B7J4E"
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T10:52:25.896Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T12:17:17.078Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: decomposed cli/run-cli.ts by extracting core/config/ide/init command specs+handlers into packages/agentplane/src/cli/run-cli/commands/*; removed remaining exported *_USAGE constants to prevent help drift; ran typecheck, lint, test:fast, test:cli:core; rg assertions for legacy flag parsers and *_USAGE exports are clean."
commit:
  hash: "7b6b86afd52af98bcac390cb8bd7310ab2213427"
  message: "✨ 4W84S1 cli: decompose run-cli.ts"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: decompose packages/agentplane/src/cli/run-cli.ts into smaller modules (globals parsing, help routing, registry build, update-check gating, project/bootstrap), while preserving behavior via cli core tests and focused unit tests."
  -
    author: "ORCHESTRATOR"
    body: "Verified: extracted init/core/config/ide CLI2 command specs+handlers into packages/agentplane/src/cli/run-cli/commands and removed remaining exported *_USAGE constants/re-exports to keep help/usage spec-driven; typecheck+lint+tests green."
doc_version: 2
doc_updated_at: "2026-02-08T12:18:09.999Z"
doc_updated_by: "ORCHESTRATOR"
description: "Extract globals/help fast-path/registry builder/update-check gating into modules; keep CLI behavior stable."
id_source: "generated"
---
## Summary


## Scope


## Plan

Decompose run-cli.ts: extract globals parsing, help fast-path, registry construction, update-check gating, and project bootstrap into cohesive modules without behavior changes.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T12:17:17.078Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: decomposed cli/run-cli.ts by extracting core/config/ide/init command specs+handlers into packages/agentplane/src/cli/run-cli/commands/*; removed remaining exported *_USAGE constants to prevent help drift; ran typecheck, lint, test:fast, test:cli:core; rg assertions for legacy flag parsers and *_USAGE exports are clean.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T12:16:40.807Z, excerpt_hash=sha256:81c4fd78229ac94cc4e21f2ff8bf1814622474d2eeb9d33a225aef87ecab9a07

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Commands
- `bun run typecheck`
- `bun run lint`
- `bun run test:cli:core`
- `bun run test:fast`

### Assertions
- `rg -n "parse[A-Za-z0-9]*Flags\(" packages/agentplane/src/commands` returns empty.
- `rg -n "export const [A-Z0-9_]+_USAGE(_EXAMPLE)?\b" packages/agentplane/src/commands` returns empty.

### Pass criteria
- All commands succeed.
- The assertions are satisfied.
