---
id: "202602112104-6BDZJ3"
title: "Run full verification for P1 hardening"
status: "DOING"
priority: "high"
owner: "TESTER"
depends_on:
  - "202602112104-XCJ7RC"
tags:
  - "testing"
  - "ci"
  - "quality"
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
    body: "Start: Running full verification for workflow hardening and commit scope policy updates."
events:
  -
    type: "status"
    at: "2026-02-11T21:08:26.076Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: Running full verification for workflow hardening and commit scope policy updates."
doc_version: 2
doc_updated_at: "2026-02-11T21:08:26.076Z"
doc_updated_by: "TESTER"
description: "Run CI-equivalent and release-prepublish checks after workflow and commit policy updates."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan


## Verify Steps

1) bun run ci
Expected: all checks pass (format/schemas/agents/typecheck/lint/coverage).
2) bun run release:prepublish
Expected: release prepublish gate passes end-to-end.
3) git status --short --untracked-files=no
Expected: clean tracked tree after close commit.
