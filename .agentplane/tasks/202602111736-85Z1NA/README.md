---
id: "202602111736-85Z1NA"
title: "T4: Enforce file-level coverage threshold for significant files"
result_summary: "File-level coverage regressions on critical guard files now fail CI deterministically."
risk_level: "low"
status: "DONE"
priority: "med"
owner: "TESTER"
depends_on: []
tags:
  - "testing"
  - "coverage"
  - "ci"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "0dea292e020efed6e809a92ab90bad31d938a213"
  message: "✅ 85Z1NA ci: add significant file branch coverage gate"
comments:
  -
    author: "TESTER"
    body: "Start: add significant file-level coverage gate and wire into CI flow."
  -
    author: "TESTER"
    body: "Verified: significant file coverage script enforces branch>=72 for guard critical files and CI workflow now runs the targeted guard coverage gate."
events:
  -
    type: "status"
    at: "2026-02-11T17:47:14.574Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: add significant file-level coverage gate and wire into CI flow."
  -
    type: "status"
    at: "2026-02-11T17:53:20.958Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: significant file coverage script enforces branch>=72 for guard critical files and CI workflow now runs the targeted guard coverage gate."
doc_version: 2
doc_updated_at: "2026-02-11T17:53:20.958Z"
doc_updated_by: "TESTER"
description: "Add a deterministic check for branch coverage on selected critical files so regressions fail CI even when global coverage passes."
id_source: "generated"
---
## Summary

Add deterministic file-level branch coverage gate for selected critical files.

## Scope

In scope: new coverage check script, npm script wiring, and CI/root script integration.

## Plan

1) Implement script that reads coverage-final.json and enforces per-file branch threshold. 2) Wire script into root ci pipeline. 3) Validate with focused guard coverage run.

## Risks

Risk: false negatives if coverage report path/schema changes; keep parser defensive and clear errors.

## Verification

Pending execution.

## Rollback Plan

Remove script and package.json wiring.

## Context

Global coverage can pass while critical files regress; need explicit per-file thresholds.

## Verify Steps

bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/commands/guard/impl/close-message.test.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/commands/guard/impl/policy.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts --coverage --coverage.reporter=json --coverage.include='packages/agentplane/src/commands/guard/**'\nbun run coverage:significant

## Notes

### Decisions\n- Threshold: branch >=72 for selected critical files.\n### Implementation Notes\n- Pending.
