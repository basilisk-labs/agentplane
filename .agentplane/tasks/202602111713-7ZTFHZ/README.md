---
id: "202602111713-7ZTFHZ"
title: "T2: Cover remaining guard commands/comment-commit branches"
result_summary: "Added tests for remaining guard commands/comment-commit branches and raised focused guard branch coverage."
risk_level: "low"
status: "DONE"
priority: "med"
owner: "TESTER"
depends_on: []
tags:
  - "testing"
  - "coverage"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T17:16:43.739Z"
  updated_by: "ORCHESTRATOR"
  note: "Plan approved."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "4e0b25a65b68573f5029f2feb170d3e1f36d0ca9"
  message: "✅ 7ZTFHZ tests: cover remaining guard flow branches"
comments:
  -
    author: "TESTER"
    body: "Start: add branch-focused tests for remaining guard flow gaps."
  -
    author: "TESTER"
    body: "Verified: bunx vitest run packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/commands/guard/impl/policy.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts; bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/commands/guard/impl/policy.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts --coverage --coverage.reporter=text --coverage.include='packages/agentplane/src/commands/guard/**'; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build."
events:
  -
    type: "status"
    at: "2026-02-11T17:16:43.922Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: add branch-focused tests for remaining guard flow gaps."
  -
    type: "status"
    at: "2026-02-11T17:18:40.192Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bunx vitest run packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/commands/guard/impl/policy.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts; bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/commands/guard/impl/policy.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts --coverage --coverage.reporter=text --coverage.include='packages/agentplane/src/commands/guard/**'; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build."
doc_version: 2
doc_updated_at: "2026-02-11T17:18:40.192Z"
doc_updated_by: "TESTER"
description: "Add tests for command wrapper and comment-derived commit branch conditions still uncovered."
id_source: "generated"
---
## Summary

Raise coverage for remaining branch paths in guard commands/comment-commit/policy modules.

## Scope

In scope: tests for packages/agentplane/src/commands/guard/impl/{commands,comment-commit,policy}. Out of scope: runtime behavior changes.

## Plan

1) Add branch-focused unit tests for guard command wrappers. 2) Add additional comment-commit branches (invalid task id, protected path filtering, non-quiet output). 3) Run focused guard coverage and builds.

## Risks

Risk: heavy mocking may hide integration regressions. Mitigation: keep run-cli.core.guard in verify set.

## Verification


## Rollback Plan

Revert added guard tests and rerun guard suites.

## Verify Steps

- bunx vitest run packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/commands/guard/impl/policy.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts\n- bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/commands/guard/impl/policy.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts --coverage --coverage.reporter=text --coverage.include='packages/agentplane/src/commands/guard/**'\n- bun run --filter=@agentplaneorg/core build\n- bun run --filter=agentplane build
