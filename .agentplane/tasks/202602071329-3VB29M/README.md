---
id: "202602071329-3VB29M"
title: "AP-GIT-01: Strict resolveBaseBranch without fallbacks"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071328-RDATF2"
  - "202602071328-812ZA9"
tags:
  - "roadmap"
  - "git"
  - "refactor"
  - "policy"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T13:48:46.675Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07T13:48:46.675Z."
verification:
  state: "ok"
  updated_at: "2026-02-07T13:53:01.875Z"
  updated_by: "CODER"
  note: "resolveBaseBranch is now fail-fast when unpinned; core + CLI tests updated."
commit:
  hash: "0582e8570f945c25991ab1f8c71bad8e62b73a75"
  message: "✅ 3VB29M git: require explicit pinned base branch"
comments:
  -
    author: "CODER"
    body: "Start: Make base branch resolution fail-fast (no implicit defaults)."
  -
    author: "CODER"
    body: "Verified: Base branch resolution no longer guesses defaults; commands require an explicit pinned base branch or an explicit --base."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T13:53:01.886Z"
doc_updated_by: "CODER"
description: "Centralize base branch resolution in the git domain: a single resolveBaseBranch(gitCtx) function. Remove heuristics (origin/HEAD, silent env fallbacks). Base branch must be explicitly pinned/set or the command fails fast."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Make resolveBaseBranch fail-fast when not explicitly pinned or provided via CLI.
2. Remove any fallback guesses (main/master branch existence).
3. Update core and agentplane tests that relied on fallback behavior.
4. Verify: vitest core + agentplane CLI suites.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T13:53:01.875Z — VERIFY — ok

By: CODER

Note: resolveBaseBranch is now fail-fast when unpinned; core + CLI tests updated.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
