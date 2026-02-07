---
id: "202602071329-RCW48K"
title: "AP-POL-01: Single policy engine (rules + evaluatePolicy)"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071328-RDATF2"
  - "202602071328-812ZA9"
  - "202602071329-3VB29M"
tags:
  - "roadmap"
  - "policy"
  - "refactor"
  - "guardrails"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T14:51:31.763Z"
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
    body: "Start: Implement policy engine (rules + evaluatePolicy) as a single source of truth."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T14:51:50.451Z"
doc_updated_by: "CODER"
description: "Implement a policy domain with protectedPathsRule(ctx), commitSubjectRule(ctx), and evaluatePolicy(ctx) as an explicit pipeline. Entry points (guard/hooks/cli) must not orchestrate checks or call individual rules; they call only evaluatePolicy."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Implement policy rules: protected paths and commit subject validation as pure functions.
2. Implement evaluatePolicy(ctx) as an explicit pipeline; entry points must call only evaluatePolicy.
3. Add unit tests for rules and for error formatting consistency.
4. Verify via vitest CLI/core suites.

## Risks


## Verification


## Rollback Plan
