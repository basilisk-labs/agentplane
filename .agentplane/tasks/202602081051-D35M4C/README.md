---
id: "202602081051-D35M4C"
title: "CLI2-FULL-012: Remove legacy argv parsing from verify recording"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202602081051-G8M5DW"
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-08T10:52:24.395Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-08T11:08:22.211Z"
  updated_by: "ORCHESTRATOR"
  note: "Verified: removed legacy verify argv parsing/usage constants (parseVerifyRecordFlags/VERIFY_USAGE/TASK_VERIFY_USAGE/cmdVerify wrapper), updated workflow tests to structured verify APIs, and confirmed typecheck + cli core + fast tests pass."
commit:
  hash: "a62781ad659c974633ac2ba3d83f3ff3e14556ba"
  message: "✨ D35M4C cli: remove legacy verify argv parsing"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: refactor verify recording to parsed-only API, delete legacy argv parsing and usage constants, and keep cli2 specs as the only CLI source of truth."
  -
    author: "ORCHESTRATOR"
    body: "Verified: verify recording is fully spec-driven (no legacy argv parser/usage constants); verify APIs are structured, workflow tests no longer pass argv arrays, and typecheck + cli core + fast tests pass."
doc_version: 2
doc_updated_at: "2026-02-08T11:08:53.434Z"
doc_updated_by: "ORCHESTRATOR"
description: "Refactor verify recording to parsed-only API; delete parseVerifyRecordFlags and usage constants; strengthen E_USAGE tests."
id_source: "generated"
---
## Summary


## Scope


## Plan

Remove legacy verify-record argv parsing: refactor verify-record to parsed-only API; delete parse/usage constants; ensure cli2 specs handle validation and usage consistently.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T11:08:22.211Z — VERIFY — ok

By: ORCHESTRATOR

Note: Verified: removed legacy verify argv parsing/usage constants (parseVerifyRecordFlags/VERIFY_USAGE/TASK_VERIFY_USAGE/cmdVerify wrapper), updated workflow tests to structured verify APIs, and confirmed typecheck + cli core + fast tests pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T11:08:08.239Z, excerpt_hash=sha256:19244d0ce184d77fc49f21e5e9d5ecba96942ea3bd73755ca84be409c998d784

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Commands
- `bun run typecheck`
- `bun run test:cli:core`
- `bun run test:fast`

### Assertions
- `rg -n "parseVerifyRecordFlags\\(" packages/agentplane/src/commands/task/verify-record.ts` returns empty.
- `rg -n "VERIFY_USAGE(_EXAMPLE)?\\b" packages/agentplane/src/commands/task/verify-record.ts` returns empty.
- `rg -n "TASK_VERIFY_USAGE(_EXAMPLE)?\\b" packages/agentplane/src/commands/task/verify-record.ts` returns empty.
- `rg -n "export \\{.*cmdVerify" packages/agentplane/src/commands/task` returns empty.

### Pass criteria
- All commands succeed.
- The assertions are satisfied.
