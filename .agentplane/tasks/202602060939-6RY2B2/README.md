---
id: "202602060939-6RY2B2"
title: "B3: Atomic writes for config/meta/index and other critical files"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602060825-KT3S1B"
tags:
  - "roadmap"
  - "io"
  - "safety"
  - "config"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T09:51:40.301Z"
  updated_by: "USER"
  note: "Approved"
verification:
  state: "ok"
  updated_at: "2026-02-06T10:08:26.807Z"
  updated_by: "CODER"
  note: "B3: atomic writes; bun run format:check, lint, test:fast, test:cli:core"
commit:
  hash: "6918fa5dd08b220b6caf65a429567206aec1a1e9"
  message: "🛡️ 6RY2B2 atomic writes for config/meta/cache"
comments:
  -
    author: "CODER"
    body: "Start: audit critical file writers and switch remaining config/meta/index writes to atomic write helpers with tests."
  -
    author: "CODER"
    body: "Verified: Switched config/meta/cache writes to atomicWriteFile; updated init/recipes/pr/index; added atomic-write regression test and ran format:check, lint, test:fast, test:cli:core."
doc_version: 2
doc_updated_at: "2026-02-06T10:08:34.887Z"
doc_updated_by: "CODER"
description: "Replace non-atomic writes (config save, task index/meta) with atomicWriteFile; add tests."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Audit non-atomic writes (config, index/meta, caches)\n2) Replace with atomicWriteFile where safe\n3) Add targeted unit tests for critical writers\n4) Verify: format:check, lint, test:fast

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T10:08:26.807Z — VERIFY — ok

By: CODER

Note: B3: atomic writes; bun run format:check, lint, test:fast, test:cli:core

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
