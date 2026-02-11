---
id: "202602112104-V79E54"
title: "Optimize CI/publish workflows: cache, concurrency, pinned runners"
result_summary: "CI and publish workflows now use pinned runners, concurrency, and Bun cache"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "ci"
  - "performance"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "94d82368bf5650e74670b017c291a5625a1c7d7e"
  message: "🛠️ V79E54 ci: harden workflow runtime with cache and concurrency"
comments:
  -
    author: "CODER"
    body: "Start: Hardening workflow determinism and throughput with runner pinning, concurrency, and Bun caching."
  -
    author: "CODER"
    body: "Verified: critical tests pass and both workflows include concurrency, ubuntu-24.04, and actions/cache for Bun artifacts."
events:
  -
    type: "status"
    at: "2026-02-11T21:05:15.705Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Hardening workflow determinism and throughput with runner pinning, concurrency, and Bun caching."
  -
    type: "status"
    at: "2026-02-11T21:06:05.468Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: critical tests pass and both workflows include concurrency, ubuntu-24.04, and actions/cache for Bun artifacts."
doc_version: 2
doc_updated_at: "2026-02-11T21:06:05.468Z"
doc_updated_by: "CODER"
description: "Add deterministic runtime defaults and speedups: runner pinning, concurrency cancellation, and Bun cache for CI and publish workflows."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan


## Verify Steps

1) bun run format:check
Expected: workflow YAML formatted/valid.
2) bun run test:critical
Expected: CLI critical tests pass after workflow edits.
3) rg -n "concurrency|runs-on: ubuntu-24.04|actions/cache@v4" .github/workflows/{ci,publish}.yml
Expected: markers present in both workflows.
