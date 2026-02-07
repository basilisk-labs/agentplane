---
id: "202602071329-RCW48K"
title: "AP-POL-01: Single policy engine (rules + evaluatePolicy)"
status: "DONE"
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
  state: "ok"
  updated_at: "2026-02-07T15:07:46.276Z"
  updated_by: "CODER"
  note: "Implemented evaluatePolicy pipeline and core policy rules (subject, protected paths, allowlist, branch_pr base). Added unit tests."
commit:
  hash: "3d272541d4ba9ceb1a0d3ef8c1cd3bccd2f0c693"
  message: "✅ RCW48K policy: add evaluatePolicy with commit subject and protected paths rules"
comments:
  -
    author: "CODER"
    body: "Start: Implement policy engine (rules + evaluatePolicy) as a single source of truth."
  -
    author: "CODER"
    body: "Verified: evaluatePolicy(ctx) is implemented as a deterministic pipeline with rules for commit subject validation, protected paths enforcement, allowlist checks, and branch_pr base constraints; coverage added via unit tests."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T15:07:55.078Z"
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

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T15:07:46.276Z — VERIFY — ok

By: CODER

Note: Implemented evaluatePolicy pipeline and core policy rules (subject, protected paths, allowlist, branch_pr base). Added unit tests.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
