---
id: "202602112104-XCJ7RC"
title: "Allow hierarchical commit scopes in commit policy"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on:
  - "202602112104-V79E54"
tags:
  - "code"
  - "git"
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
    author: "CODER"
    body: "Start: Extending commit subject validation to support hierarchical scope tokens."
events:
  -
    type: "status"
    at: "2026-02-11T21:06:27.840Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extending commit subject validation to support hierarchical scope tokens."
doc_version: 2
doc_updated_at: "2026-02-11T21:06:27.840Z"
doc_updated_by: "CODER"
description: "Support scopes like core/guard and cli/run-cli in commit subject validation and cover with tests."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification


## Rollback Plan


## Verify Steps

1) bunx vitest run packages/core/src/commit/commit-policy.test.ts
Expected: all tests pass including hierarchical scope cases.
2) bun run lint
Expected: no lint errors.
3) bun run test:critical
Expected: critical CLI tests still pass.
