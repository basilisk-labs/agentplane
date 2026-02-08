---
id: "202602081822-Q1RST6"
title: "CLI: metadata-driven bootstrapping for project/config/context"
result_summary: "Metadata-driven bootstrapping"
status: "DONE"
priority: "low"
owner: "CODER"
depends_on:
  - "202602081822-1598RD"
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-08T19:11:53.606Z"
  updated_by: "TESTER"
  note: "bun run lint; bun run test:cli:core; bun run typecheck"
commit:
  hash: "f641867a20d8fc93c55203cac655ce33bdc19957"
  message: "✨ Q1RST6 cli: metadata-driven bootstrapping"
comments:
  -
    author: "CODER"
    body: "Start: Add command metadata (needsProject/needsConfig/needsTaskContext) and route runCli bootstrapping accordingly to avoid unnecessary resolveProject/loadConfig/loadContext."
  -
    author: "CODER"
    body: "Verified: Added needsProject/needsConfig/needsTaskContext metadata in command catalog and used it in runCli to skip resolveProject/config/update-check/context when not needed; added tests ensuring quickstart/role do not call resolveProject/loadConfig; lint, cli core tests, and typecheck pass."
events:
  -
    type: "status"
    at: "2026-02-08T19:07:24.607Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add command metadata (needsProject/needsConfig/needsTaskContext) and route runCli bootstrapping accordingly to avoid unnecessary resolveProject/loadConfig/loadContext."
  -
    type: "verify"
    at: "2026-02-08T19:11:53.606Z"
    author: "TESTER"
    state: "ok"
    note: "bun run lint; bun run test:cli:core; bun run typecheck"
  -
    type: "status"
    at: "2026-02-08T19:12:31.131Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Added needsProject/needsConfig/needsTaskContext metadata in command catalog and used it in runCli to skip resolveProject/config/update-check/context when not needed; added tests ensuring quickstart/role do not call resolveProject/loadConfig; lint, cli core tests, and typecheck pass."
doc_version: 2
doc_updated_at: "2026-02-08T19:12:31.131Z"
doc_updated_by: "CODER"
description: "Add needsProject/needsConfig/needsTaskContext metadata to command catalog and adjust runCli to avoid unnecessary resolveProject/loadConfig/loadTaskBackend and update-check work."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Add per-command metadata (needsProject/needsConfig/needsTaskContext) to command catalog entries.\n2) In runCli, match command id early using specs and decide whether to resolveProject/loadDotEnv/loadConfig/update-check/loadCommandContext.\n3) Add targeted tests: quickstart/role should not resolve project; commands needing ctx still work.\n4) Run lint + cli core tests + typecheck.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T19:11:53.606Z — VERIFY — ok

By: TESTER

Note: bun run lint; bun run test:cli:core; bun run typecheck

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T19:07:24.607Z, excerpt_hash=sha256:a27c69aeec2509655bf4919520ceeeb71060e34901720689e7bfdbcbb666a12f

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

- bun run lint\n- bun run test:cli:core\n- bun run typecheck\nPass criteria: commands marked as not needing project/context do not trigger resolveProject/loadDotEnv/update-check/loadCommandContext; tests pass.
