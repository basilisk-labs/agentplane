---
id: "202602112051-XEQJNE"
title: "Run full verification for P0 hardening"
status: "DOING"
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
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: Running full end-to-end verification for dependency parity and CI/publish gate hardening."
events:
  -
    type: "status"
    at: "2026-02-11T21:01:03.896Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: Running full end-to-end verification for dependency parity and CI/publish gate hardening."
doc_version: 2
doc_updated_at: "2026-02-11T21:01:03.896Z"
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
