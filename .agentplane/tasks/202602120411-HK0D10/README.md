---
id: "202602120411-HK0D10"
title: "Task model: enforce primary tag selection and lock primary changes"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602120411-23GJNP"
tags:
  - "code"
  - "tasks"
  - "policy"
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
commit: null
comments:
  -
    author: "CODER"
    body: "Start: enforce canonical primary tag resolution and lock primary-tag mutation unless explicit override is provided, with tests for strict and fallback flows."
events:
  -
    type: "status"
    at: "2026-02-12T04:23:53.997Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: enforce canonical primary tag resolution and lock primary-tag mutation unless explicit override is provided, with tests for strict and fallback flows."
doc_version: 2
doc_updated_at: "2026-02-12T04:23:53.997Z"
doc_updated_by: "CODER"
description: "Resolve exactly one primary tag from allowlist, fallback/error by strict mode, and prevent primary drift on update unless explicit override flag."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan


## Verify Steps

1. bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/workflow.test.ts
2. bun run --filter=agentplane build
3. bun run lint
Expected: all commands exit 0; primary-tag lock rejects changes without --allow-primary-change and passes with override.
