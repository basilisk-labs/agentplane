---
id: "202602071328-812ZA9"
title: "AP-MOD-01: Explicit contexts and no direct env/fs access in domains"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071328-RDATF2"
tags:
  - "roadmap"
  - "refactor"
  - "policy"
  - "contract"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T14:51:31.769Z"
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
    body: "Start: Introduce PolicyContext and policy-domain lint boundaries."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T14:51:43.028Z"
doc_updated_by: "CODER"
description: "Introduce PolicyContext next to existing GitContext/CommandContext and enforce a strict boundary: policy/git domains must not read process/env/fs directly. Add lint restrictions for the policy directory to prevent hidden fallbacks and IO."
id_source: "generated"
---
## Summary


## Scope


## Plan

1. Introduce a dedicated policy domain (types + rule interfaces) with PolicyContext as the only input to policy evaluation.
2. Ensure policy code has no direct access to process/env/fs by construction: all facts are injected via contexts.
3. Add ESLint restrictions for the policy directory to prevent IO and hidden fallbacks.
4. Verify by running lint and core CLI tests.

## Risks


## Verification


## Rollback Plan
