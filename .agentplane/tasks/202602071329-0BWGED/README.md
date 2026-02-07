---
id: "202602071329-0BWGED"
title: "AP-ENTRY-02: Hooks as a thin adapter"
status: "DONE"
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
  note: "Approved in chat on 2026-02-07T15:10:22.518Z."
verification:
  state: "ok"
  updated_at: "2026-02-07T15:26:22.655Z"
  updated_by: "CODER"
  note: "Verified: hooks are thin adapters and delegate policy checks to evaluatePolicy; format/lint/test:fast all pass."
commit:
  hash: "be9633aa69e8729457bacffcc0681064c0474e11"
  message: "✅ 0BWGED hooks: migrate checks to evaluatePolicy"
comments:
  -
    author: "CODER"
    body: "Start: Migrate hooks checks to evaluatePolicy for parity with guard."
  -
    author: "CODER"
    body: "Verified: hooks now delegate protected paths and commit subject validation to the shared policy engine (evaluatePolicy). format:check, lint, and test:fast passed."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T15:26:28.090Z"
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

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T15:26:22.655Z — VERIFY — ok

By: CODER

Note: Verified: hooks are thin adapters and delegate policy checks to evaluatePolicy; format/lint/test:fast all pass.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
