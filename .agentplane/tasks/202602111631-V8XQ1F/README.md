---
id: "202602111631-V8XQ1F"
title: "T5: Raise branch coverage for commands/pr and commands/guard critical paths"
result_summary: "Added targeted PR/guard tests and improved focused branch coverage for critical command paths."
risk_level: "low"
status: "DONE"
priority: "med"
owner: "TESTER"
depends_on:
  - "202602111631-XV07Z9"
tags:
  - "testing"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T16:46:47.884Z"
  updated_by: "ORCHESTRATOR"
  note: "Plan approved."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "139bf399bbb96b5a43e75b50091f2b263ac181be"
  message: "✅ V8XQ1F tests: add guard/pr branch coverage for critical paths"
comments:
  -
    author: "TESTER"
    body: "Start: add focused branch-coverage tests for PR and guard critical paths."
  -
    author: "TESTER"
    body: "Verified: bunx vitest run packages/agentplane/src/commands/pr/input-validation.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts; bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/commands/pr/input-validation.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts --coverage --coverage.reporter=text --coverage.include='packages/agentplane/src/commands/pr/**' --coverage.include='packages/agentplane/src/commands/guard/**'; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build."
events:
  -
    type: "status"
    at: "2026-02-11T16:46:48.106Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: add focused branch-coverage tests for PR and guard critical paths."
  -
    type: "status"
    at: "2026-02-11T16:47:30.427Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bunx vitest run packages/agentplane/src/commands/pr/input-validation.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts; bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/commands/pr/input-validation.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts --coverage --coverage.reporter=text --coverage.include='packages/agentplane/src/commands/pr/**' --coverage.include='packages/agentplane/src/commands/guard/**'; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build."
doc_version: 2
doc_updated_at: "2026-02-11T16:47:30.427Z"
doc_updated_by: "TESTER"
description: "Add targeted tests for error/branch paths in commands/pr/* and commands/guard/* where regressions are high-risk."
id_source: "generated"
---
## Summary

Increase branch coverage on high-risk PR/guard command paths with focused unit tests for input validation and comment-derived commit flows.

## Scope

In scope: tests under packages/agentplane/src/commands/pr and packages/agentplane/src/commands/guard/impl. Out of scope: behavioral changes to runtime command logic.

## Plan

1) Add PR input-validation tests for early E_USAGE branches. 2) Add comment-commit tests for allowlist/auto-allow failures and successful commit metadata flow. 3) Run targeted tests and compare focused coverage report.

## Risks

Risk: brittle tests coupled to exact error text. Mitigation: assert stable key fragments and error codes only.

## Verification


## Rollback Plan

Remove newly added test files and rerun related test suites to restore baseline.

## Verify Steps

- bunx vitest run packages/agentplane/src/commands/pr/input-validation.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts\n- bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/commands/pr/input-validation.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts --coverage --coverage.reporter=text --coverage.include='packages/agentplane/src/commands/pr/**' --coverage.include='packages/agentplane/src/commands/guard/**'\n- bun run --filter=@agentplaneorg/core build\n- bun run --filter=agentplane build
