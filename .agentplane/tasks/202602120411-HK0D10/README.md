---
id: "202602120411-HK0D10"
title: "Task model: enforce primary tag selection and lock primary changes"
result_summary: "Primary-tag policy enforced with explicit override for mutation"
status: "DONE"
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
  state: "ok"
  updated_at: "2026-02-12T04:24:41.126Z"
  updated_by: "TESTER"
  note: "Verified: bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/workflow.test.ts passed; bun run --filter=agentplane build passed; bun run lint passed."
commit:
  hash: "e31f5f99f07355f86d61f591c2a42574f2d13f62"
  message: "🛠️ HK0D10 task: enforce primary tag resolution and lock updates"
comments:
  -
    author: "CODER"
    body: "Start: enforce canonical primary tag resolution and lock primary-tag mutation unless explicit override is provided, with tests for strict and fallback flows."
  -
    author: "CODER"
    body: "Verified: primary-tag policy is now enforced on create/update, strict/fallback behavior is covered by tests, and explicit --allow-primary-change is required to mutate primary classification."
events:
  -
    type: "status"
    at: "2026-02-12T04:23:53.997Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: enforce canonical primary tag resolution and lock primary-tag mutation unless explicit override is provided, with tests for strict and fallback flows."
  -
    type: "verify"
    at: "2026-02-12T04:24:41.126Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/workflow.test.ts passed; bun run --filter=agentplane build passed; bun run lint passed."
  -
    type: "status"
    at: "2026-02-12T04:24:56.025Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: primary-tag policy is now enforced on create/update, strict/fallback behavior is covered by tests, and explicit --allow-primary-change is required to mutate primary classification."
doc_version: 2
doc_updated_at: "2026-02-12T04:24:56.025Z"
doc_updated_by: "CODER"
description: "Resolve exactly one primary tag from allowlist, fallback/error by strict mode, and prevent primary drift on update unless explicit override flag."
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
#### 2026-02-12T04:24:41.126Z — VERIFY — ok

By: TESTER

Note: Verified: bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/workflow.test.ts passed; bun run --filter=agentplane build passed; bun run lint passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T04:23:53.997Z, excerpt_hash=sha256:6d9df9cf923833706118929bd1dfffc542d962b3ceeb12f64ad3f01b3328963d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

1. bunx vitest run packages/agentplane/src/commands/task/shared.unit.test.ts packages/agentplane/src/commands/workflow.test.ts
2. bun run --filter=agentplane build
3. bun run lint
Expected: all commands exit 0; primary-tag lock rejects changes without --allow-primary-change and passes with override.
