---
id: "202602110502-71M2A6"
title: "T7: Continue spec/run split for heavy commands"
result_summary: "Split doctor and recipes install into lazy spec/run modules"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202602110502-5J1ZNE"
tags:
  - "cli"
  - "code"
  - "perf"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-11T05:16:56.059Z"
  updated_by: "TESTER"
  note: "Verified: bun build(core+agentplane), lint, test:fast; doctor/recipes/help contract tests pass."
commit:
  hash: "0e23e18137ffae113f8524f16b2a6956eb9fc850"
  message: "🚧 71M2A6 cli: split doctor and recipes install into spec/run"
comments:
  -
    author: "CODER"
    body: "Start: split doctor and recipes install into spec/run with lazy catalog wiring."
  -
    author: "CODER"
    body: "Verified: spec/run split applied for doctor and recipes install; lazy loading preserved in command catalog."
events:
  -
    type: "status"
    at: "2026-02-11T05:14:45.482Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split doctor and recipes install into spec/run with lazy catalog wiring."
  -
    type: "verify"
    at: "2026-02-11T05:16:56.059Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bun build(core+agentplane), lint, test:fast; doctor/recipes/help contract tests pass."
  -
    type: "status"
    at: "2026-02-11T05:17:04.464Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: spec/run split applied for doctor and recipes install; lazy loading preserved in command catalog."
doc_version: 2
doc_updated_at: "2026-02-11T05:17:04.464Z"
doc_updated_by: "CODER"
description: "Split selected heavy commands (doctor/commit/guard/recipes install) into spec/run to keep help path lean and avoid heavy top-level imports."
id_source: "generated"
---
## Summary

Continue spec/run split for heavy commands to reduce eager import weight in CLI command catalog and keep help path lean.

## Scope

In scope:
- split `doctor` into `doctor.spec.ts` + `doctor.run.ts`
- split `recipes install` into `install.spec.ts` + `install.run.ts`
- update command catalog to import specs and lazy-load run handlers

## Plan

1. Create spec/run files for doctor and recipes install.
2. Keep compatibility via tiny *.command.ts re-export facades.
3. Switch command catalog to spec imports and run lazy imports.
4. Run targeted and full tests, then commit.

## Risks

- Risk: import path regressions in tests/registry.
Mitigation: keep compatibility re-export files and run command-catalog/help tests.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T05:16:56.059Z — VERIFY — ok

By: TESTER

Note: Verified: bun build(core+agentplane), lint, test:fast; doctor/recipes/help contract tests pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T05:14:45.482Z, excerpt_hash=sha256:790a7f80f75ab035e0c6f159c00ac7981b3c032331d7e6e0985cd3ad58e78dd2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task commit to restore pre-split command module layout.

## Verify Steps

- `bun run --filter=@agentplaneorg/core build`
- `bun run --filter=agentplane build`
- `bun run lint`
- `bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/recipes.test.ts packages/agentplane/src/cli/run-cli.core.help-contract.test.ts`
- `bun run test:fast`
