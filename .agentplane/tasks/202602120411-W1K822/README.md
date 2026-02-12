---
id: "202602120411-W1K822"
title: "Status commit policy v2: major transitions + primary-scoped commit subject/body"
result_summary: "Status commit policy v2 enforces major transitions and primary-tag subjects"
status: "DONE"
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
  state: "ok"
  updated_at: "2026-02-12T04:32:20.416Z"
  updated_by: "TESTER"
  note: "Verified: bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/core/src/commit/commit-policy.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts passed; bunx vitest run packages/agentplane/src/commands/workflow.test.ts passed; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build passed; bun run lint passed."
commit:
  hash: "5d16ea35549a3b56cf47d4e4f69158d2203610e7"
  message: "🛠️ W1K822 workflow: gate status commits by major transitions and primary scope"
comments:
  -
    author: "CODER"
    body: "Start: implement status-commit policy v2 with major-transition gating and primary-tag commit subjects for comment-driven status commits."
  -
    author: "CODER"
    body: "Verified: status/comment-driven commits are now limited to major transitions, and generated subjects/bodies encode primary tag plus target status for machine-readable audit."
events:
  -
    type: "status"
    at: "2026-02-12T04:29:56.039Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement status-commit policy v2 with major-transition gating and primary-tag commit subjects for comment-driven status commits."
  -
    type: "verify"
    at: "2026-02-12T04:32:20.416Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/core/src/commit/commit-policy.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts passed; bunx vitest run packages/agentplane/src/commands/workflow.test.ts passed; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build passed; bun run lint passed."
  -
    type: "status"
    at: "2026-02-12T04:32:20.717Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: status/comment-driven commits are now limited to major transitions, and generated subjects/bodies encode primary tag plus target status for machine-readable audit."
doc_version: 2
doc_updated_at: "2026-02-12T04:32:20.717Z"
doc_updated_by: "CODER"
description: "Allow status/comment-driven commits only on major transitions, enforce branch_pr final commit behavior, and change commit-from-comment scope to primary tag with structured body."
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
#### 2026-02-12T04:32:20.416Z — VERIFY — ok

By: TESTER

Note: Verified: bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/core/src/commit/commit-policy.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts passed; bunx vitest run packages/agentplane/src/commands/workflow.test.ts passed; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build passed; bun run lint passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T04:29:56.039Z, excerpt_hash=sha256:59fc7d094b6ca75f1245456484fafae003ee31b2d6a66d3596ad2d54be51825a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

1. bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/core/src/commit/commit-policy.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts
2. bun run --filter=@agentplaneorg/core build
3. bun run --filter=agentplane build
4. bun run lint
Expected: status commits are allowed only for major transitions; comment-driven commit subject uses primary tag + status token; tests pass.
