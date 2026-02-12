---
id: "202602121056-JSW7PA"
title: "Release: add post-publish npm smoke verification"
result_summary: "publish workflow now validates npm visibility post-publish"
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
  updated_at: "2026-02-12T11:06:35.388Z"
  updated_by: "CODER"
  note: "Verified: added post-publish smoke script with retry and --spec test mode; publish workflow now runs release:smoke:published; lint passes."
commit:
  hash: "fa53dce7f00fec10a6d62e9fe2ae7e09ba38b311"
  message: "✅ JSW7PA release: add post-publish npm smoke gate"
comments:
  -
    author: "CODER"
    body: "Start: add post-publish npm smoke verification step for both published packages."
  -
    author: "CODER"
    body: "Verified: publish workflow runs release:smoke:published and smoke checker validates both package versions with retries."
events:
  -
    type: "status"
    at: "2026-02-12T11:04:29.247Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add post-publish npm smoke verification step for both published packages."
  -
    type: "verify"
    at: "2026-02-12T11:06:35.388Z"
    author: "CODER"
    state: "ok"
    note: "Verified: added post-publish smoke script with retry and --spec test mode; publish workflow now runs release:smoke:published; lint passes."
  -
    type: "status"
    at: "2026-02-12T11:07:10.322Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: publish workflow runs release:smoke:published and smoke checker validates both package versions with retries."
doc_version: 2
doc_updated_at: "2026-02-12T11:07:10.322Z"
doc_updated_by: "CODER"
description: "After GitHub publish completes, verify published versions for both packages on npm registry and fail workflow on mismatch."
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
#### 2026-02-12T11:06:35.388Z — VERIFY — ok

By: CODER

Note: Verified: added post-publish smoke script with retry and --spec test mode; publish workflow now runs release:smoke:published; lint passes.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T11:04:29.247Z, excerpt_hash=sha256:fdaed047cdaf49009c72beec5763ece2fac69aac5e34e55a34f370f3abf20af6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

1. node scripts/check-published-packages.mjs
2. bun run lint
