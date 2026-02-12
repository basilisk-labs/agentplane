---
id: "202602120411-5E23M0"
title: "Docs + regression suite for tag/status policy v2"
status: "DOING"
priority: "high"
owner: "TESTER"
depends_on:
  - "202602120411-HF80PC"
tags:
  - "testing"
  - "docs"
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
    author: "TESTER"
    body: "Start: update docs and regression coverage for primary-tag verify policy and status-commit transition constraints."
events:
  -
    type: "status"
    at: "2026-02-12T04:36:56.612Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: update docs and regression coverage for primary-tag verify policy and status-commit transition constraints."
doc_version: 2
doc_updated_at: "2026-02-12T04:38:18.480Z"
doc_updated_by: "TESTER"
description: "Update AGENTS/quickstart/help docs and add regression tests for primary tagging, status transition commit policy, and verification gates."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan


## Verify Steps

1. bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts
2. bunx vitest run packages/core/src/commit/commit-policy.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts
3. bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
4. bun run lint
Expected: docs reflect primary-tag policy and regression suite covers status-commit transition gating + primary-based verification requirements.
