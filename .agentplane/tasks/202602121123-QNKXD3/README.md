---
id: "202602121123-QNKXD3"
title: "Fix docs:cli freshness checker formatting mismatch"
result_summary: "cli docs freshness checker now compares canonical formatted output"
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
  updated_at: "2026-02-12T11:25:49.021Z"
  updated_by: "CODER"
  note: "Verified: docs checker now formats generated temp output before compare; docs:cli:check and release gates no longer fail on formatting-only drift."
commit:
  hash: "8aa1f5ce5a99110789f3f3534c3d81364ab00467"
  message: "✅ QNKXD3 release: normalize cli docs freshness check formatting"
comments:
  -
    author: "CODER"
    body: "Start: fix docs freshness checker to compare canonical formatted output and remove false stale failures."
  -
    author: "CODER"
    body: "Verified: checker formats temporary generated docs before comparison, eliminating formatting-only false positives in release gates."
events:
  -
    type: "status"
    at: "2026-02-12T11:23:34.084Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix docs freshness checker to compare canonical formatted output and remove false stale failures."
  -
    type: "verify"
    at: "2026-02-12T11:25:49.021Z"
    author: "CODER"
    state: "ok"
    note: "Verified: docs checker now formats generated temp output before compare; docs:cli:check and release gates no longer fail on formatting-only drift."
  -
    type: "status"
    at: "2026-02-12T11:26:34.047Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: checker formats temporary generated docs before comparison, eliminating formatting-only false positives in release gates."
doc_version: 2
doc_updated_at: "2026-02-12T11:26:34.047Z"
doc_updated_by: "CODER"
description: "Normalize generated temporary CLI docs with Prettier before comparing to committed docs/user/cli-reference.generated.mdx to avoid false stale failures."
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
#### 2026-02-12T11:25:49.021Z — VERIFY — ok

By: CODER

Note: Verified: docs checker now formats generated temp output before compare; docs:cli:check and release gates no longer fail on formatting-only drift.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T11:23:34.084Z, excerpt_hash=sha256:c91af47da9722dced79a92ebc9f713dadc460b65154e71806dff420f2639776a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

1. node scripts/check-cli-reference-fresh.mjs
2. bun run format:check
3. bun run release:prepublish
