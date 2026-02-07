---
id: "202602071657-F919EB"
title: "Core: Shared extractDocSection + isVerifyStepsFilled"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071657-XK9Q8X"
tags:
  - "code"
  - "refactor"
  - "testing"
verify:
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T17:15:12.412Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T17:16:10.737Z"
  updated_by: "CODER"
  note: "Deduped extractDocSection and added isVerifyStepsFilled with unit tests; bun run test:agentplane."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: dedupe extractDocSection and add strict Verify Steps filled-check with unit tests."
doc_version: 2
doc_updated_at: "2026-02-07T17:16:10.738Z"
doc_updated_by: "CODER"
description: "Deduplicate extractDocSection into shared and add isVerifyStepsFilled() with unit tests."
---
## Summary


## Scope


## Plan

1) Move duplicated extractDocSection() into commands/task/shared.ts and re-use from plan.ts + verify-record.ts.
2) Add isVerifyStepsFilled() that rejects missing/empty/placeholder content.
3) Add unit tests for isVerifyStepsFilled.
4) Run bun run test:agentplane.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T17:16:10.737Z — VERIFY — ok

By: CODER

Note: Deduped extractDocSection and added isVerifyStepsFilled with unit tests; bun run test:agentplane.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
