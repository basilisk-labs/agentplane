---
id: "202602081822-1598RD"
title: "CLI: simplify/remove help-fast registry after lazy handlers"
status: "DOING"
priority: "low"
owner: "CODER"
depends_on:
  - "202602081822-745Q3R"
tags:
  - "cli"
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-08T19:06:25.169Z"
  updated_by: "TESTER"
  note: "bun run lint; bun run test:cli:core; bun run typecheck"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Remove dedicated help-fast registry module now that handlers are lazy; route help through main registry without loading command context."
events:
  -
    type: "status"
    at: "2026-02-08T19:05:17.862Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Remove dedicated help-fast registry module now that handlers are lazy; route help through main registry without loading command context."
  -
    type: "verify"
    at: "2026-02-08T19:06:25.169Z"
    author: "TESTER"
    state: "ok"
    note: "bun run lint; bun run test:cli:core; bun run typecheck"
doc_version: 2
doc_updated_at: "2026-02-08T19:06:25.170Z"
doc_updated_by: "TESTER"
description: "After lazy loading is in place, remove or simplify buildHelpFastRegistry (or keep it auto-generated) so there is no second manual registry list."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Remove registry.help.ts and route help path through buildRegistry with a stub getCtx (must not be called).\n2) Update help-contract test to assert registry ids match COMMANDS ids (plus help).\n3) Run lint + cli core tests + typecheck.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T19:06:25.169Z — VERIFY — ok

By: TESTER

Note: bun run lint; bun run test:cli:core; bun run typecheck

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T19:05:17.862Z, excerpt_hash=sha256:edda2232695ca4355251ccee554b7afa1d4f09901eeccf8c482d5669bf98868e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

- bun run lint\n- bun run test:cli:core\n- bun run typecheck\nPass criteria: help path still works; no separate help registry module needed; tests pass.
