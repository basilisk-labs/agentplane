---
id: "202602071657-KAQA47"
title: "Verify log: Add VerifyStepsRef/hash to Verification entries"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071657-NN3DSJ"
tags:
  - "code"
  - "verify"
  - "tasks"
verify:
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T17:31:19.494Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T17:33:32.465Z"
  updated_by: "CODER"
  note: "verify-record now appends VerifyStepsRef (doc_version/doc_updated_at + sha256) to each Verification entry; tests: bun run test:agentplane, bun run test:cli:core."
commit:
  hash: "7f0eac518345338b5b8d3f856fc1d403b29b4fa0"
  message: "✅ KAQA47 verify: record VerifyStepsRef in Verification"
comments:
  -
    author: "CODER"
    body: "Start: include Verify Steps reference (doc version/mtime + sha256) in each Verification result entry."
  -
    author: "CODER"
    body: "Verified: verification entries now include VerifyStepsRef with doc_version/doc_updated_at and sha256 hash; tests: bun run test:agentplane, bun run test:cli:core."
doc_version: 2
doc_updated_at: "2026-02-07T17:34:14.453Z"
doc_updated_by: "CODER"
description: "verify-record should reference the current Verify Steps (doc_version/doc_updated_at + sha256 excerpt hash)."
---
## Summary


## Scope


## Plan

1) In verify-record, compute a reference to current Verify Steps (doc_version/doc_updated_at + sha256 hash).
2) Append the reference into each Verification entry without copying full Verify Steps text.
3) Run bun run test:agentplane and bun run test:cli:core.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T17:33:32.465Z — VERIFY — ok

By: CODER

Note: verify-record now appends VerifyStepsRef (doc_version/doc_updated_at + sha256) to each Verification entry; tests: bun run test:agentplane, bun run test:cli:core.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Scope

Enrich Verification entries with a stable reference to the Verify Steps criteria.

### Checks

- Each verify entry includes a VerifyStepsRef with doc_version, doc_updated_at, and sha256 hash of Verify Steps excerpt.

### Evidence / Commands

- bun run test:cli:core

### Pass criteria

- verify-record appends the ref on every entry; no full Verify Steps text duplication.
