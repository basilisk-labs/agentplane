---
id: "202602081822-745Q3R"
title: "CLI: lazy handler loading via dynamic import"
result_summary: "Lazy-load handlers"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202602081822-B4YH3Y"
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
  updated_at: "2026-02-08T19:02:55.269Z"
  updated_by: "TESTER"
  note: "bun run lint; bun run test:cli:core; bun run typecheck"
commit:
  hash: "57690a8eaefcca4215613baf617e589dbb2cddc2"
  message: "✨ 745Q3R cli: lazy-load command handlers"
comments:
  -
    author: "CODER"
    body: "Start: Implement lazy handler loading via dynamic import() in run registry; cache loaded handlers; keep help path spec-only."
  -
    author: "CODER"
    body: "Verified: Run registry now registers wrapper handlers that lazy-load real handlers via dynamic import() and cache them; command catalog provides per-command load() functions; lint, cli core tests, and typecheck pass."
events:
  -
    type: "status"
    at: "2026-02-08T19:00:19.055Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement lazy handler loading via dynamic import() in run registry; cache loaded handlers; keep help path spec-only."
  -
    type: "verify"
    at: "2026-02-08T19:02:55.269Z"
    author: "TESTER"
    state: "ok"
    note: "bun run lint; bun run test:cli:core; bun run typecheck"
  -
    type: "status"
    at: "2026-02-08T19:03:56.161Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Run registry now registers wrapper handlers that lazy-load real handlers via dynamic import() and cache them; command catalog provides per-command load() functions; lint, cli core tests, and typecheck pass."
doc_version: 2
doc_updated_at: "2026-02-08T19:03:56.161Z"
doc_updated_by: "CODER"
description: "Introduce LazyCommandEntry with load() using import(); run registry registers wrapper handler and caches loaded handler; help/docs use only specs."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Change command catalog entries to define load() that dynamic-imports handler modules and builds handler with deps (getCtx/getHelpJsonForDocs).\n2) Update registry.run.ts to register wrapper handlers that await load() once and cache the loaded handler.\n3) Keep help registry spec-only (no handler loads).\n4) Run lint + cli core tests + typecheck.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-08T19:02:55.269Z — VERIFY — ok

By: TESTER

Note: bun run lint; bun run test:cli:core; bun run typecheck

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-08T19:00:19.055Z, excerpt_hash=sha256:828efac55d6ede74fe3f76477ba7b671d24d7a10d6b6190955a22c057a39ab35

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

- bun run lint\n- bun run test:cli:core\n- bun run typecheck\nPass criteria: CLI behavior unchanged; no eager imports of handlers needed for help; tests pass.
