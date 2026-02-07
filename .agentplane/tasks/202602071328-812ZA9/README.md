---
id: "202602071328-812ZA9"
title: "AP-MOD-01: Explicit contexts and no direct env/fs access in domains"
status: "DONE"
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
  state: "ok"
  updated_at: "2026-02-07T15:07:46.287Z"
  updated_by: "CODER"
  note: "Introduced PolicyContext scaffolding and pure-policy lint boundaries; commit hooks output buffer is now robust."
commit:
  hash: "2afca6ca2a3c1da6cf342ceea7be0dc38b157be6"
  message: "✅ 812ZA9 policy: add PolicyContext and lint boundaries"
comments:
  -
    author: "CODER"
    body: "Start: Introduce PolicyContext and policy-domain lint boundaries."
  -
    author: "CODER"
    body: "Verified: Policy domain now has an explicit PolicyContext type and lint-enforced purity boundaries; git commit hook output buffer is increased to avoid hook log truncation failures."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T15:07:54.862Z"
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

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T15:07:46.287Z — VERIFY — ok

By: CODER

Note: Introduced PolicyContext scaffolding and pure-policy lint boundaries; commit hooks output buffer is now robust.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
