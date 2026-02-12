---
id: "202602120411-5E23M0"
title: "Docs + regression suite for tag/status policy v2"
result_summary: "Documentation and regression suite aligned with primary-tag/status policy v2"
status: "DONE"
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
  state: "ok"
  updated_at: "2026-02-12T04:40:26.628Z"
  updated_by: "TESTER"
  note: "Verified: bunx vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/core/src/commit/commit-policy.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts passed; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build passed; bun run lint passed."
commit:
  hash: "8e7f962505023e8c17358cf0e709fb39a0fa5787"
  message: "🛠️ 5E23M0 docs: align guidance and regressions with primary-tag policy"
comments:
  -
    author: "TESTER"
    body: "Start: update docs and regression coverage for primary-tag verify policy and status-commit transition constraints."
  -
    author: "TESTER"
    body: "Verified: docs now describe primary-tag verification and status-commit major transitions, and regression coverage enforces these contracts in CLI tests."
events:
  -
    type: "status"
    at: "2026-02-12T04:36:56.612Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: update docs and regression coverage for primary-tag verify policy and status-commit transition constraints."
  -
    type: "verify"
    at: "2026-02-12T04:40:26.628Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bunx vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/core/src/commit/commit-policy.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts passed; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build passed; bun run lint passed."
  -
    type: "status"
    at: "2026-02-12T04:40:26.776Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: docs now describe primary-tag verification and status-commit major transitions, and regression coverage enforces these contracts in CLI tests."
doc_version: 2
doc_updated_at: "2026-02-12T04:40:26.776Z"
doc_updated_by: "TESTER"
description: "Update AGENTS/quickstart/help docs and add regression tests for primary tagging, status transition commit policy, and verification gates."
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
#### 2026-02-12T04:40:26.628Z — VERIFY — ok

By: TESTER

Note: Verified: bunx vitest run packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/core/src/commit/commit-policy.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts passed; bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build passed; bun run lint passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T04:38:18.480Z, excerpt_hash=sha256:505b53b7f06e42e491a694897386ddffb0cfd293c78a1c81c3c993e75d9c0b5a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

1. bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/workflow.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts
2. bunx vitest run packages/core/src/commit/commit-policy.test.ts packages/agentplane/src/commands/guard/impl/comment-commit.test.ts packages/agentplane/src/commands/task/finish.unit.test.ts
3. bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
4. bun run lint
Expected: docs reflect primary-tag policy and regression suite covers status-commit transition gating + primary-based verification requirements.
