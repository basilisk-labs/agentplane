---
id: "202602111721-FCPVFM"
title: "T1: Raise commands.ts branch to >=72"
result_summary: "commands.ts branch coverage raised above 72%."
risk_level: "low"
status: "DONE"
priority: "med"
owner: "TESTER"
depends_on: []
tags:
  - "testing"
  - "coverage"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-11T17:22:08.983Z"
  updated_by: "ORCHESTRATOR"
  note: "Plan approved."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "6ad2043d1099f933de7d9edc00233b933c71b178"
  message: "✅ FCPVFM test: expand guard command wrapper branch coverage"
comments:
  -
    author: "TESTER"
    body: "Start: add missing branch tests for guard commands.ts."
  -
    author: "TESTER"
    body: "Verified: added guard wrapper branch tests and confirmed focused guard coverage run passes."
events:
  -
    type: "status"
    at: "2026-02-11T17:22:09.173Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: add missing branch tests for guard commands.ts."
  -
    type: "status"
    at: "2026-02-11T17:28:47.119Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: added guard wrapper branch tests and confirmed focused guard coverage run passes."
doc_version: 2
doc_updated_at: "2026-02-11T17:28:47.119Z"
doc_updated_by: "TESTER"
description: "Add focused tests for guard command wrapper branches in commands.ts."
id_source: "generated"
---
## Summary

Raise branch coverage for guard commands.ts via focused unit tests on error/catch branches and guard wrappers.

## Scope

In scope: packages/agentplane/src/commands/guard/impl/commands.unit.test.ts only.

## Plan

1) Add tests for cmdGuardClean/cmdGuardSuggestAllow/cmdGuardCommit mapCoreError branches. 2) Add no-staged branch for cmdGuardSuggestAllow. 3) Run focused guard coverage.

## Risks

Low; tests-only changes with mocked dependencies.

## Verification


## Rollback Plan

Revert new unit tests in commands.unit.test.ts.

## Verify Steps

- bunx vitest run packages/agentplane/src/commands/guard/impl/commands.unit.test.ts\n- bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/commands/guard/impl/policy.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts --coverage --coverage.reporter=text --coverage.include='packages/agentplane/src/commands/guard/**'
