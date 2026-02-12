---
id: "202602120411-HF80PC"
title: "Verification gates by primary tags (code/data/ops)"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602120411-W1K822"
tags:
  - "code"
  - "workflow"
  - "quality"
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
    body: "Start: migrate verify gating from secondary tag lists to primary-tag policy with compatibility fallback for legacy config fields."
events:
  -
    type: "status"
    at: "2026-02-12T04:35:33.732Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate verify gating from secondary tag lists to primary-tag policy with compatibility fallback for legacy config fields."
doc_version: 2
doc_updated_at: "2026-02-12T04:35:33.732Z"
doc_updated_by: "CODER"
description: "Move Verify Steps gating to primary-tag policy with compatibility fallback; keep secondary tags for filtering only."
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
2. bun run --filter=@agentplaneorg/core build
3. bun run --filter=agentplane build
4. bun run lint
Expected: verify-step gates depend on primary tags (with fallback), and verification-required gates apply only to configured primary tags.
