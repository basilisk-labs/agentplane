---
id: "202602120902-576ZM1"
title: "P0: add task close-duplicate command"
result_summary: "task close-duplicate is implemented and tested"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-12T09:10:15.344Z"
  updated_by: "TESTER"
  note: "Added task close-duplicate command and CLI spec wiring; covered by run-cli core tests including happy path and validation guard."
commit:
  hash: "e1149bcf9eddfb9794a9e4c421235e8da89dde08"
  message: "🛠️ 576ZM1 code: add task close-duplicate command"
comments:
  -
    author: "CODER"
    body: "Start: implement task close-duplicate to collapse duplicate/no-op closure workflows into a single command with deterministic bookkeeping."
  -
    author: "CODER"
    body: "Verified: implemented task close-duplicate to collapse duplicate/no-op closure into one command, with validation and CLI wiring; regression tests pass for success and same-id rejection."
events:
  -
    type: "status"
    at: "2026-02-12T09:03:32.330Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement task close-duplicate to collapse duplicate/no-op closure workflows into a single command with deterministic bookkeeping."
  -
    type: "verify"
    at: "2026-02-12T09:10:15.344Z"
    author: "TESTER"
    state: "ok"
    note: "Added task close-duplicate command and CLI spec wiring; covered by run-cli core tests including happy path and validation guard."
  -
    type: "status"
    at: "2026-02-12T09:10:15.486Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: implemented task close-duplicate to collapse duplicate/no-op closure into one command, with validation and CLI wiring; regression tests pass for success and same-id rejection."
doc_version: 2
doc_updated_at: "2026-02-12T09:10:15.486Z"
doc_updated_by: "CODER"
description: "Add an atomic command to close duplicate/no-op tasks with minimal required metadata and optional single close commit path."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Add new command . 2) Implement no-op duplicate closure flow (status/comment/optional metadata commit). 3) Register command in catalog/help. 4) Add CLI tests for minimal happy path and validation errors.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-12T09:10:15.344Z — VERIFY — ok

By: TESTER

Note: Added task close-duplicate command and CLI spec wiring; covered by run-cli core tests including happy path and validation guard.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T09:03:32.330Z, excerpt_hash=sha256:7c4c12d06b40225a188d5c48bd764ae6fdbd9e72e66bde18f1db1af5df4a37cc

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

1) bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts -t "task close-duplicate" 2) bun run test:cli:core 3) bun run lint
