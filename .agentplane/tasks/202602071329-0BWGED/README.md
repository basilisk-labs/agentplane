---
id: "202602071329-0BWGED"
title: "AP-ENTRY-02: Hooks as a thin adapter"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071329-RCW48K"
tags:
  - "roadmap"
  - "hooks"
  - "refactor"
  - "policy"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T15:10:22.518Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Migrate hooks checks to evaluatePolicy for parity with guard."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T15:10:29.027Z"
doc_updated_by: "CODER"
description: "Move hooks (commit-msg, pre-commit, etc.) onto the same policy engine as guard. Remove hook-specific unique logic so local/CI/hooks behavior is identical."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Migrate hooks run (commit-msg, pre-commit) to call evaluatePolicy(ctx) with the same rules as guard.
2. Ensure hook messages remain actionable (env var overrides for hooks).
3. Remove duplicated path/subject/base logic from hooks.
4. Update tests to cover parity with guard.

## Risks


## Verification


## Rollback Plan
