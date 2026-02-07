---
id: "202602071329-N6F413"
title: "AP-ENTRY-01: Guard as a thin adapter"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071329-RCW48K"
tags:
  - "roadmap"
  - "guard"
  - "refactor"
  - "policy"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T15:10:22.447Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07."
verification:
  state: "ok"
  updated_at: "2026-02-07T15:31:05.083Z"
  updated_by: "CODER"
  note: "Verified: guard is a thin adapter and delegates checks to evaluatePolicy; format:check, lint, and test:fast passed in this checkout."
commit:
  hash: "29fe2e170dc38e546262900f13633f1d265b4c6e"
  message: "✅ N6F413 guard: migrate commit checks to evaluatePolicy"
comments:
  -
    author: "CODER"
    body: "Start: Migrate guard commit checks to evaluatePolicy."
  -
    author: "CODER"
    body: "Verified: guard now delegates allowlist/protected paths/commit subject/branch_pr base pin checks to the shared policy engine (evaluatePolicy). format:check, lint, and test:fast passed."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T15:31:05.159Z"
doc_updated_by: "CODER"
description: "Reduce guard to: parse args -> build ctx -> evaluatePolicy(ctx) -> exit. Remove business logic from guard; path protection, subject checks, base branch checks, and staging checks must live in git/policy domains."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Replace guardCommitCheck logic with evaluatePolicy(ctx) evaluation.
2. Build PolicyContext from CommandContext + git facts; keep git fact collection outside policy domain.
3. Keep guard as an adapter: parse -> build ctx -> evaluate -> throw uniform CliError.
4. Update tests to assert guard and hooks share identical behavior.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T15:31:05.083Z — VERIFY — ok

By: CODER

Note: Verified: guard is a thin adapter and delegates checks to evaluatePolicy; format:check, lint, and test:fast passed in this checkout.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
