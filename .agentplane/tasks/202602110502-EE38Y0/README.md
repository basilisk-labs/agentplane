---
id: "202602110502-EE38Y0"
title: "T9: Add wrapCommand helper and pilot in config/core/ide"
result_summary: "Reduced duplicated command error handling via shared wrapper"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202602110502-71M2A6"
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
  updated_at: "2026-02-11T05:22:33.936Z"
  updated_by: "TESTER"
  note: "Verified: build(core+agentplane), lint, test:fast, and run-cli core tests pass after wrapper migration."
commit:
  hash: "699d080821b2414622354c3532505da219ea94cd"
  message: "🚧 EE38Y0 cli: add shared wrapCommand for run-cli handlers"
comments:
  -
    author: "CODER"
    body: "Start: add wrapCommand helper and migrate config/core/ide command handlers."
  -
    author: "CODER"
    body: "Verified: config/core/ide now use shared wrapCommand with unchanged error mapping semantics."
events:
  -
    type: "status"
    at: "2026-02-11T05:20:20.149Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add wrapCommand helper and migrate config/core/ide command handlers."
  -
    type: "verify"
    at: "2026-02-11T05:22:33.936Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: build(core+agentplane), lint, test:fast, and run-cli core tests pass after wrapper migration."
  -
    type: "status"
    at: "2026-02-11T05:22:34.084Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: config/core/ide now use shared wrapCommand with unchanged error mapping semantics."
doc_version: 2
doc_updated_at: "2026-02-11T05:22:34.084Z"
doc_updated_by: "CODER"
description: "Introduce shared command wrapper for consistent mapCoreError handling and migrate config/core/ide command handlers as pilot."
id_source: "generated"
---
## Summary

Introduce a shared CLI wrapper for command error handling and migrate pilot command modules to reduce repeated try/catch + mapCoreError logic.

## Scope

In scope: run-cli command modules config/core/ide and new wrapper utility in run-cli command layer. Out of scope: full migration of every command module.

## Plan

1) Add wrapCommand helper that preserves CliError and maps others through mapCoreError. 2) Apply helper to config/core/ide modules. 3) Keep behavior and outputs unchanged via tests.

## Risks

Risk: changed command error text/exit mapping. Mitigation: preserve existing mapCoreError contexts and run CLI core tests.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T05:22:33.936Z — VERIFY — ok

By: TESTER

Note: Verified: build(core+agentplane), lint, test:fast, and run-cli core tests pass after wrapper migration.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T05:20:20.149Z, excerpt_hash=sha256:d7bfdf63df118c696a631002ec1c0dea80812a86fd1930fc725547278dcad2e9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task commit to restore per-command local try/catch behavior.

## Verify Steps

- bun run --filter=@agentplaneorg/core build
- bun run --filter=agentplane build
- bun run lint
- bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts packages/agentplane/src/cli/run-cli/commands/core.unit.test.ts
- bun run test:fast
