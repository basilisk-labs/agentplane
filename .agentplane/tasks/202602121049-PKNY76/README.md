---
id: "202602121049-PKNY76"
title: "guard/impl/allow: simplify matching and strengthen tests"
result_summary: "allowlist matching simplified and edge-case coverage expanded"
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
  updated_at: "2026-02-12T10:52:54.888Z"
  updated_by: "CODER"
  note: "Verified: allow-prefix normalization/compaction refactor implemented; allow guard tests and lint pass."
commit:
  hash: "fc76bec2032ecd3492835aa76c300dff28436963"
  message: "✅ PKNY76 guard: normalize and compact allow prefixes"
comments:
  -
    author: "CODER"
    body: "Start: refactor guard allow implementation to simplify matching and strengthen tests for edge cases."
  -
    author: "CODER"
    body: "Verified: allow prefix normalization/compaction is implemented and covered by updated unit tests plus guard suite/lint."
events:
  -
    type: "status"
    at: "2026-02-12T10:50:53.121Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: refactor guard allow implementation to simplify matching and strengthen tests for edge cases."
  -
    type: "verify"
    at: "2026-02-12T10:52:54.888Z"
    author: "CODER"
    state: "ok"
    note: "Verified: allow-prefix normalization/compaction refactor implemented; allow guard tests and lint pass."
  -
    type: "status"
    at: "2026-02-12T10:53:24.644Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: allow prefix normalization/compaction is implemented and covered by updated unit tests plus guard suite/lint."
doc_version: 2
doc_updated_at: "2026-02-12T10:53:24.644Z"
doc_updated_by: "CODER"
description: "Refactor guard allowlist implementation for clearer behavior and reduced branching, then add focused tests for edge cases and regressions."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Inspect guard allow implementation and current tests for duplication/complexity hotspots.\n2. Refactor allow matching logic to reduce branching and clarify precedence semantics.\n3. Add or update focused unit tests for prefix rules, edge paths, and backward compatibility.\n4. Run targeted test suite and lint/build checks.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-12T10:52:54.888Z — VERIFY — ok

By: CODER

Note: Verified: allow-prefix normalization/compaction refactor implemented; allow guard tests and lint pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T10:50:53.121Z, excerpt_hash=sha256:85d4bf19bc8b8d9a33e5dc5e02cefbdf9af2c45ecef076acfb76e10a207b8d62

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

1. bunx vitest run packages/agentplane/src/commands/guard/impl/allow.test.ts
2. bunx vitest run packages/agentplane/src/commands/guard/**/*.test.ts
3. bun run lint
