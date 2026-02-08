---
id: "202602081051-G8M5DW"
title: "CLI2-FULL-011: Remove legacy argv parsing from task new"
status: "DOING"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081051-BAY4H5"
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T10:52:24.020Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T11:02:37.385Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: removed legacy task new argv parsing/usage exports (TASK_NEW_USAGE/parseTaskNewFlags/cmdTaskNew), updated workflow tests to parsed-only APIs, and confirmed typecheck + cli core + fast tests pass."
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: remove legacy task new argv parsing/usage constants, update any callers/tests to cli2 spec or parsed-only API, and keep behavior stable."
doc_version: 2
doc_updated_at: "2026-02-08T11:02:37.386Z"
doc_updated_by: "ORCHESTRATOR"
description: "Delete parseTaskNewFlags/usage constants and legacy argv entrypoints; ensure only cli2 spec drives parsing/help."
id_source: "generated"
---
## Summary


## Scope


## Plan

Remove legacy task new argv parsing: delete parse/usage constants in task/new.ts; ensure only cli2 spec drives parsing/help; update tests accordingly.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T11:02:37.385Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: removed legacy task new argv parsing/usage exports (TASK_NEW_USAGE/parseTaskNewFlags/cmdTaskNew), updated workflow tests to parsed-only APIs, and confirmed typecheck + cli core + fast tests pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T11:02:25.308Z, excerpt_hash=sha256:d0caa34cf018e162431481c1374de658634588734a0fcc43c3c938ee3f438abb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Commands
- `bun run typecheck`
- `bun run test:cli:core`
- `bun run test:fast`

### Assertions
- `rg -n "parseTaskNewFlags\\(" packages/agentplane/src/commands/task/new.ts` returns empty.
- `rg -n "TASK_NEW_USAGE(_EXAMPLE)?\\b" packages/agentplane/src/commands/task/new.ts` returns empty.
- `rg -n "cmdTaskNew\\b" packages/agentplane/src/commands` returns empty.

### Pass criteria
- All commands succeed.
- The assertions are satisfied.
