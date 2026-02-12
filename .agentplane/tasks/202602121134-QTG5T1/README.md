---
id: "202602121134-QTG5T1"
title: "Fix release pre-push npm availability check parity coupling"
result_summary: "release pre-push availability gate now works before version bump"
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
  updated_at: "2026-02-12T11:35:51.150Z"
  updated_by: "CODER"
  note: "Verified: npm availability check now validates local parity without requiring pre-bump target version; script/test/lint pass."
commit:
  hash: "9de6689049d72e189e4fda5fe330d9011b3121a3"
  message: "✅ QTG5T1 release: decouple availability check from target parity"
comments:
  -
    author: "CODER"
    body: "Start: decouple npm availability check from requiredVersion parity to unblock release apply pre-bump flow."
  -
    author: "CODER"
    body: "Verified: availability probe checks npm publishability for target version while local parity validation remains version-agnostic pre-bump."
events:
  -
    type: "status"
    at: "2026-02-12T11:35:06.012Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decouple npm availability check from requiredVersion parity to unblock release apply pre-bump flow."
  -
    type: "verify"
    at: "2026-02-12T11:35:51.150Z"
    author: "CODER"
    state: "ok"
    note: "Verified: npm availability check now validates local parity without requiring pre-bump target version; script/test/lint pass."
  -
    type: "status"
    at: "2026-02-12T11:36:27.652Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: availability probe checks npm publishability for target version while local parity validation remains version-agnostic pre-bump."
doc_version: 2
doc_updated_at: "2026-02-12T11:36:27.652Z"
doc_updated_by: "CODER"
description: "Decouple npm version availability probe from requiredVersion parity so release apply --push can run before version bump while still enforcing local parity consistency."
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
#### 2026-02-12T11:35:51.150Z — VERIFY — ok

By: CODER

Note: Verified: npm availability check now validates local parity without requiring pre-bump target version; script/test/lint pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T11:35:06.012Z, excerpt_hash=sha256:8df3a1abcb7133c1ca46c34befd453fb5b302448d4a4867bb730f9e877a14ea9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

1. node scripts/check-npm-version-availability.mjs --version 0.2.21
2. bunx vitest run packages/agentplane/src/commands/release/check-release-version-script.test.ts
3. bun run lint
