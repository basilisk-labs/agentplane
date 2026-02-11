---
id: "202602111653-X3QFDG"
title: "Coverage uplift: pr/internal and guard allow branches"
result_summary: "Coverage uplift tasks for pr/internal and guard allow completed with atomic commits."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on:
  - "202602111653-X32XPT"
  - "202602111653-QRQWRQ"
tags:
  - "epic"
  - "testing"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T17:02:53.221Z"
  updated_by: "ORCHESTRATOR"
  note: "Plan approved."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "85e66ba9deb85c3cacbfff96f5c075c5fc059b59"
  message: "✅ QRQWRQ close: Added allow.ts branch tests for clean checks, allowlist staging branches, and GitContex... (202602111653-QRQWRQ) [cli,coverage,testing]"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: close coverage uplift epic after downstream tasks completion."
  -
    author: "ORCHESTRATOR"
    body: "Verified: downstream tasks X32XPT and QRQWRQ are DONE with passing targeted tests and builds."
events:
  -
    type: "status"
    at: "2026-02-11T17:02:53.402Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: close coverage uplift epic after downstream tasks completion."
  -
    type: "status"
    at: "2026-02-11T17:02:53.555Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: downstream tasks X32XPT and QRQWRQ are DONE with passing targeted tests and builds."
doc_version: 2
doc_updated_at: "2026-02-11T17:02:53.555Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add targeted tests to increase branch coverage in pr/internal modules and guard allow helper paths, with per-task commits."
id_source: "generated"
---
## Summary

Complete a focused coverage uplift for PR internal flows and guard allow helpers via atomic test tasks.

## Scope

In scope: downstream tasks X32XPT and QRQWRQ and their test-only changes. Out of scope: functional behavior changes in CLI commands.

## Plan

1) Execute coverage tasks for pr/internal and guard allow modules. 2) Validate tests/builds and capture focused coverage reports. 3) Close epic with result summary.

## Risks

Residual risk: global branch threshold is not targeted by these two tasks alone; broader module coverage remains future work.

## Verification


## Rollback Plan

Revert downstream commits for X32XPT and QRQWRQ if regressions appear in PR/guard test suites.

## Verify Steps

- bunx vitest run packages/agentplane/src/commands/pr/internal/pr-paths.test.ts packages/agentplane/src/commands/pr/integrate/internal/worktree.test.ts packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts\n- bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts\n- bun run --filter=@agentplaneorg/core build\n- bun run --filter=agentplane build
