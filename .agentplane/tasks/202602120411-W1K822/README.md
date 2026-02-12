---
id: "202602120411-W1K822"
title: "Status commit policy v2: major transitions + primary-scoped commit subject/body"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602120411-HK0D10"
tags:
  - "code"
  - "git"
  - "workflow"
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
    body: "Start: implement status-commit policy v2 with major-transition gating and primary-tag commit subjects for comment-driven status commits."
events:
  -
    type: "status"
    at: "2026-02-12T04:29:56.039Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement status-commit policy v2 with major-transition gating and primary-tag commit subjects for comment-driven status commits."
doc_version: 2
doc_updated_at: "2026-02-12T04:29:56.039Z"
doc_updated_by: "CODER"
description: "Allow status/comment-driven commits only on major transitions, enforce branch_pr final commit behavior, and change commit-from-comment scope to primary tag with structured body."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan


## Verify Steps

1. bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/core/src/commit/commit-policy.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts
2. bun run --filter=@agentplaneorg/core build
3. bun run --filter=agentplane build
4. bun run lint
Expected: status commits are allowed only for major transitions; comment-driven commit subject uses primary tag + status token; tests pass.
