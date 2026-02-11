---
id: "202602101258-87TTSB"
title: "T8: Consolidate global flags definitions"
result_summary: "Consolidated global flags parsing into single source"
risk_level: "low"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202602101258-KN6RMG"
tags:
  - "code"
  - "cli"
  - "refactor"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-10T14:10:07.085Z"
  updated_by: "CODER"
  note: "lint OK; run-cli core boot + misc test suites OK"
commit:
  hash: "fb32f9a5690e6dff3ef7f0d30666d4681cfd6ba5"
  message: "🚧 87TTSB cli: unify global flags parsing"
comments:
  -
    author: "CODER"
    body: "Start: consolidate global flags definitions so prescanJsonErrors and parseGlobalArgs share a single source of truth."
  -
    author: "CODER"
    body: "Verified: global flag parsing now uses a single GLOBAL_FLAGS table for both prescanJsonErrors and parseGlobalArgs; lint and CLI core test suites pass."
events:
  -
    type: "status"
    at: "2026-02-10T14:08:12.147Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: consolidate global flags definitions so prescanJsonErrors and parseGlobalArgs share a single source of truth."
  -
    type: "verify"
    at: "2026-02-10T14:10:07.085Z"
    author: "CODER"
    state: "ok"
    note: "lint OK; run-cli core boot + misc test suites OK"
  -
    type: "status"
    at: "2026-02-10T14:11:07.017Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: global flag parsing now uses a single GLOBAL_FLAGS table for both prescanJsonErrors and parseGlobalArgs; lint and CLI core test suites pass."
doc_version: 2
doc_updated_at: "2026-02-10T14:11:07.017Z"
doc_updated_by: "CODER"
description: "Remove duplication between prescanJsonErrors/parseGlobalArgs by introducing a single global flags table; update tests."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verify Steps

### Scope\n- Global flag parsing and jsonErrors prescan in packages/agentplane/src/cli/run-cli.ts.\n\n### Checks\n- Lint\n- CLI boot and misc parsing tests\n\n### Evidence / Commands\n- bun run lint\n- bun run test:agentplane packages/agentplane/src/cli/run-cli.core.boot.test.ts\n- bun run test:agentplane packages/agentplane/src/cli/run-cli.core.misc.test.ts\n\n### Pass criteria\n- Lint passes.\n- Tests pass.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-10T14:10:07.085Z — VERIFY — ok

By: CODER

Note: lint OK; run-cli core boot + misc test suites OK

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-10T14:08:12.147Z, excerpt_hash=sha256:e8da555f6f0efc81b58dae3c93c2135373f8d2af965a2f6a89e6b332180ce8a4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
