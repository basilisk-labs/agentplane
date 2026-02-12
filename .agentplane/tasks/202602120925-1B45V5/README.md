---
id: "202602120925-1B45V5"
title: "P0: auto-seed Verify Steps in task new by primary tag"
result_summary: "task new auto-seeds verify steps for required primary tags"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602120925-4VYMHT"
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-12T09:35:38.012Z"
  updated_by: "TESTER"
  note: "task new now seeds default Verify Steps doc for verify-required primary tags and includes verify command evidence scaffold."
commit:
  hash: "0ae6ffc39b41ddc03c3b0982fb31d63e5f19728c"
  message: "🛠️ 1B45V5 code: seed verify steps on task creation"
comments:
  -
    author: "CODER"
    body: "Start: seed Verify Steps defaults in task creation based on primary-tag verification policy."
  -
    author: "CODER"
    body: "Verified: code/data/ops style tasks now receive a non-placeholder Verify Steps section at creation, reducing start-time dead-ends and token-heavy remediation."
events:
  -
    type: "status"
    at: "2026-02-12T09:32:42.726Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: seed Verify Steps defaults in task creation based on primary-tag verification policy."
  -
    type: "verify"
    at: "2026-02-12T09:35:38.012Z"
    author: "TESTER"
    state: "ok"
    note: "task new now seeds default Verify Steps doc for verify-required primary tags and includes verify command evidence scaffold."
  -
    type: "status"
    at: "2026-02-12T09:35:38.191Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: code/data/ops style tasks now receive a non-placeholder Verify Steps section at creation, reducing start-time dead-ends and token-heavy remediation."
doc_version: 2
doc_updated_at: "2026-02-12T09:35:38.191Z"
doc_updated_by: "CODER"
description: "For verify-required primary tags, scaffold minimal Verify Steps automatically to avoid start-time dead-ends."
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
#### 2026-02-12T09:35:38.012Z — VERIFY — ok

By: TESTER

Note: task new now seeds default Verify Steps doc for verify-required primary tags and includes verify command evidence scaffold.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T09:32:42.726Z, excerpt_hash=sha256:0763c25a8addaf6a7069ae94f3f19d0bc3464bbb58d1519422459256f84b35f2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

1. bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000
2. bunx eslint packages/agentplane/src/commands/task/new.ts packages/agentplane/src/commands/task/new.spec.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts
