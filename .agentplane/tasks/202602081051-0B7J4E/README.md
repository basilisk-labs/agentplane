---
id: "202602081051-0B7J4E"
title: "CLI2-FULL-022: Decompose branch/scenario monoliths"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081051-QSHZVZ"
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T10:52:25.522Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T11:47:16.600Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: decomposed commands/branch/index.ts into focused modules (base/status/remove/work-start/cleanup-merged + internal helpers), removed legacy *_USAGE constants and usageMessage-based errors, removed legacy scenario dispatcher cmdScenario and usage constants, updated scenario-related tests to route via cli2 specs + parsed scenario functions, and confirmed format/lint/typecheck/test:fast + cli core tests pass."
commit:
  hash: "510a8dd92e6807a1e82036dafda49dce8c7ce0cf"
  message: "✨ 0B7J4E cli: decompose branch and scenario"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: split branch/index.ts and scenario.ts into smaller modules, remove remaining legacy argv routing/parsers and *_USAGE constants, and preserve behavior via updated cli core tests and unit coverage."
  -
    author: "ORCHESTRATOR"
    body: "Verified: split branch/index.ts into focused modules and internal helpers; removed legacy *_USAGE constants and usageMessage coupling; removed legacy scenario dispatcher cmdScenario and usage constants; updated scenario-related tests to route through cli2 specs + parsed command functions; format, lint, typecheck, test:fast, and cli core suites pass."
doc_version: 2
doc_updated_at: "2026-02-08T11:47:52.327Z"
doc_updated_by: "ORCHESTRATOR"
description: "Split commands/branch/index.ts and commands/scenario.ts into focused modules; preserve behavior."
id_source: "generated"
---
## Summary


## Scope


## Plan

Decompose branch/scenario monoliths: split commands/branch/index.ts and commands/scenario.ts into focused modules; keep cli2 command handlers thin; keep behavior stable via tests.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T11:47:16.600Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: decomposed commands/branch/index.ts into focused modules (base/status/remove/work-start/cleanup-merged + internal helpers), removed legacy *_USAGE constants and usageMessage-based errors, removed legacy scenario dispatcher cmdScenario and usage constants, updated scenario-related tests to route via cli2 specs + parsed scenario functions, and confirmed format/lint/typecheck/test:fast + cli core tests pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T11:34:36.239Z, excerpt_hash=sha256:7bc5014efa5bbd821d821a27433aeda126d5ae599a39eed9f9587279b1d39262

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
