---
id: "202602121124-15R0VZ"
title: "Fix guard suggestAllowPrefixes absolute path regression"
result_summary: "absolute-path allow prefix suggestions restored"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
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
  updated_at: "2026-02-12T11:25:49.190Z"
  updated_by: "CODER"
  note: "Verified: suggestAllowPrefixes preserves absolute path prefixes while keeping normalization for relative path forms; workflow and guard tests pass."
commit:
  hash: "87319ec425581d73d8fbd83b858f6bef5e187bc0"
  message: "✅ 15R0VZ guard: preserve absolute allow-prefix suggestions"
comments:
  -
    author: "CODER"
    body: "Start: restore absolute path allow-prefix suggestions to match established workflow contract and tests."
  -
    author: "CODER"
    body: "Verified: suggestAllowPrefixes keeps /abs for absolute inputs while retaining normalization for relative path forms."
events:
  -
    type: "status"
    at: "2026-02-12T11:24:37.288Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: restore absolute path allow-prefix suggestions to match established workflow contract and tests."
  -
    type: "verify"
    at: "2026-02-12T11:25:49.190Z"
    author: "CODER"
    state: "ok"
    note: "Verified: suggestAllowPrefixes preserves absolute path prefixes while keeping normalization for relative path forms; workflow and guard tests pass."
  -
    type: "status"
    at: "2026-02-12T11:28:15.482Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: suggestAllowPrefixes keeps /abs for absolute inputs while retaining normalization for relative path forms."
doc_version: 2
doc_updated_at: "2026-02-12T11:28:15.482Z"
doc_updated_by: "CODER"
description: "Restore absolute-path suggestion behavior (/abs) in suggestAllowPrefixes while keeping allowlist stage compaction changes."
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
#### 2026-02-12T11:25:49.190Z — VERIFY — ok

By: CODER

Note: Verified: suggestAllowPrefixes preserves absolute path prefixes while keeping normalization for relative path forms; workflow and guard tests pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T11:24:37.288Z, excerpt_hash=sha256:5ca06703e496f820576ac1e4a5004b14135705c928174c6042dff180c3062b9a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

1. bunx vitest run packages/agentplane/src/commands/workflow.test.ts
2. bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts
3. bun run lint
