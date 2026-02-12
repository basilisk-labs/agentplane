---
id: "202602120925-QJGEVP"
title: "Docs/tests: prod UX contracts and migration notes"
result_summary: "Updated setup/release/troubleshooting docs for compact init and strict release parity contracts."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602120925-ZVAM62"
  - "202602120925-4VYMHT"
  - "202602120925-1B45V5"
  - "202602120925-AEGANR"
  - "202602120925-E3AY8S"
  - "202602120925-EH560H"
  - "202602120925-5DY3DV"
  - "202602120925-PMJ8FT"
tags:
  - "meta"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-12T10:19:41.008Z"
  updated_by: "CODER"
  note: "Verified: docs formatting passes; targeted init/task/branch core tests pass; lint/build pass."
commit:
  hash: "0c1d604dbbd95821b5f5cab7e606bc3087f0fb86"
  message: "✅ QJGEVP docs: update prod UX and release parity guidance"
comments:
  -
    author: "CODER"
    body: "Start: document prod UX contracts (init compact flow, release parity checks) and add troubleshooting migration notes."
  -
    author: "CODER"
    body: "Verified: docs formatted; targeted CLI and context tests pass; lint/build pass."
events:
  -
    type: "status"
    at: "2026-02-12T10:19:31.286Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: document prod UX contracts (init compact flow, release parity checks) and add troubleshooting migration notes."
  -
    type: "verify"
    at: "2026-02-12T10:19:41.008Z"
    author: "CODER"
    state: "ok"
    note: "Verified: docs formatting passes; targeted init/task/branch core tests pass; lint/build pass."
  -
    type: "status"
    at: "2026-02-12T10:20:18.919Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: docs formatted; targeted CLI and context tests pass; lint/build pass."
doc_version: 2
doc_updated_at: "2026-02-12T10:20:18.919Z"
doc_updated_by: "CODER"
description: "Document new prod commands/contracts and add regression coverage for deterministic next-actions."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Update setup docs for compact prod init and explicit dev full mode.\n2. Update release docs with parity checks and dependency-version contract.\n3. Add troubleshooting entry for parity-related publish failures.\n4. Verify formatting and targeted CLI tests.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-12T10:19:41.008Z — VERIFY — ok

By: CODER

Note: Verified: docs formatting passes; targeted init/task/branch core tests pass; lint/build pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T10:19:31.286Z, excerpt_hash=sha256:missing

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
