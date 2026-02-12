---
id: "202602120902-K20GM7"
title: "P0: simplify commit close ergonomics"
result_summary: "close commit ergonomics added"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602120902-576ZM1"
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
  updated_at: "2026-02-12T09:14:38.256Z"
  updated_by: "TESTER"
  note: "Added --unstage-others and --check-only for commit --close, with guard CLI regression tests for both flows and lint compliance."
commit:
  hash: "307ce4f218badb95623109382c1e66d864826f21"
  message: "🛠️ K20GM7 code: add close preflight and auto-unstage flags"
comments:
  -
    author: "CODER"
    body: "Start: implement close-commit ergonomics to reduce token churn and manual git staging cleanup (add --unstage-others and --check-only)."
  -
    author: "CODER"
    body: "Verified: commit --close now supports preflight-only checks and optional auto-unstage of index noise, reducing duplicate guard/commit cycles while preserving deterministic close commit behavior."
events:
  -
    type: "status"
    at: "2026-02-12T09:14:02.377Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement close-commit ergonomics to reduce token churn and manual git staging cleanup (add --unstage-others and --check-only)."
  -
    type: "verify"
    at: "2026-02-12T09:14:38.256Z"
    author: "TESTER"
    state: "ok"
    note: "Added --unstage-others and --check-only for commit --close, with guard CLI regression tests for both flows and lint compliance."
  -
    type: "status"
    at: "2026-02-12T09:14:38.404Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: commit --close now supports preflight-only checks and optional auto-unstage of index noise, reducing duplicate guard/commit cycles while preserving deterministic close commit behavior."
doc_version: 2
doc_updated_at: "2026-02-12T09:14:38.404Z"
doc_updated_by: "CODER"
description: "Add commit --close --unstage-others and commit --check-only to remove guard/commit duplication and staging churn."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-12T09:14:38.256Z — VERIFY — ok

By: TESTER

Note: Added --unstage-others and --check-only for commit --close, with guard CLI regression tests for both flows and lint compliance.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T09:14:02.377Z, excerpt_hash=sha256:c5215dbe522f417ae838e66f479abc022aa0dd577d70df837f60eb1169716ed8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

1. bunx vitest run packages/agentplane/src/cli/run-cli.core.guard.test.ts --hookTimeout 60000 --testTimeout 60000
2. bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000
3. bunx eslint packages/agentplane/src/commands/commit.spec.ts packages/agentplane/src/commands/commit.command.ts packages/agentplane/src/commands/guard/impl/commands.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts
