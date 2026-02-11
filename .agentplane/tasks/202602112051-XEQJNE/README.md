---
id: "202602112051-XEQJNE"
title: "Run full verification for P0 hardening"
result_summary: "Full release and CI gates pass after P0 hardening"
status: "DONE"
priority: "high"
owner: "TESTER"
depends_on:
  - "202602112051-A9ANGA"
tags:
  - "testing"
  - "ci"
  - "release"
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
  hash: "b8c3226410b9bdf573c7e0b0a5a9b155ea349cc0"
  message: "🧪 XEQJNE testing: run full release and CI verification"
comments:
  -
    author: "TESTER"
    body: "Start: Running full end-to-end verification for dependency parity and CI/publish gate hardening."
  -
    author: "TESTER"
    body: "Verified: release:prepublish and ci pass end-to-end with new dependency parity and workflow checks."
events:
  -
    type: "status"
    at: "2026-02-11T21:01:03.896Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: Running full end-to-end verification for dependency parity and CI/publish gate hardening."
  -
    type: "status"
    at: "2026-02-11T21:02:35.752Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: release:prepublish and ci pass end-to-end with new dependency parity and workflow checks."
doc_version: 2
doc_updated_at: "2026-02-11T21:02:35.752Z"
doc_updated_by: "TESTER"
description: "Run required test/lint/build/release checks to validate parity and CI gate changes end-to-end."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan


## Verify Steps

1) bun run release:prepublish
Expected: full release gate passes (checks, build, lint, tests, pack).
2) bun run ci
Expected: CI aggregate checks pass.
3) git status --short --untracked-files=no
Expected: no tracked pending changes after close commit.
