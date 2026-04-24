---
id: "202604241136-ATVM0G"
title: "v0.3 freeze D1: document lifecycle and close taxonomy"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "lifecycle"
  - "v0.3"
verify:
  - "bun run docs:cli:check"
  - "bun run docs:onboarding:check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T12:59:34.814Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved docs-only D1 scope: user lifecycle taxonomy plus developer close taxonomy; no command behavior changes."
verification:
  state: "ok"
  updated_at: "2026-04-24T13:02:20.034Z"
  updated_by: "DOCS"
  note: "D1 verified: task lifecycle docs now include v0.3 close taxonomy, developer close taxonomy added, docs CLI/onboarding checks pass, routing/doctor/format checks pass."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: document v0.3 lifecycle and close taxonomy across user and developer docs without changing command behavior."
events:
  -
    type: "status"
    at: "2026-04-24T12:59:35.857Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: document v0.3 lifecycle and close taxonomy across user and developer docs without changing command behavior."
  -
    type: "verify"
    at: "2026-04-24T13:02:20.034Z"
    author: "DOCS"
    state: "ok"
    note: "D1 verified: task lifecycle docs now include v0.3 close taxonomy, developer close taxonomy added, docs CLI/onboarding checks pass, routing/doctor/format checks pass."
doc_version: 3
doc_updated_at: "2026-04-24T13:02:20.064Z"
doc_updated_by: "DOCS"
description: "Add the v0.3 task lifecycle and close taxonomy documentation that maps close/finish commands to modes, git writes, docs writes, and final statuses."
sections:
  Summary: |-
    v0.3 freeze D1: document lifecycle and close taxonomy
    
    Add the v0.3 task lifecycle and close taxonomy documentation that maps close/finish commands to modes, git writes, docs writes, and final statuses.
  Scope: |-
    - In scope: Add the v0.3 task lifecycle and close taxonomy documentation that maps close/finish commands to modes, git writes, docs writes, and final statuses.
    - Out of scope: unrelated refactors not required for "v0.3 freeze D1: document lifecycle and close taxonomy".
  Plan: |-
    1. Add a user-facing v0.3 lifecycle lock section to docs/user/task-lifecycle.mdx that maps close/finish variants to workflow mode, git writes, task docs writes, and terminal status.
    2. Add docs/developer/close-taxonomy.mdx as the developer-facing taxonomy for finish, close-noop, close-duplicate, hosted-close, hosted-close-pr, pr close, and pr close-superseded, with D2 precheck extraction notes.
    3. Verify with docs checks, routing check, doctor, and formatting/diff checks.
  Verify Steps: |-
    1. Run `rg -n 'Lifecycle and close taxonomy|close-taxonomy|task hosted-close-pr|pr close-superseded' docs/user/task-lifecycle.mdx docs/developer/close-taxonomy.mdx`. Expected: user and developer docs cover the v0.3 close taxonomy.
    2. Run `bun run docs:cli:check`. Expected: pass.
    3. Run `bun run docs:onboarding:check`. Expected: pass.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: pass.
    5. Run `agentplane doctor`. Expected: OK.
    6. Run `git diff --check && bun run format:check`. Expected: pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T13:02:20.034Z — VERIFY — ok
    
    By: DOCS
    
    Note: D1 verified: task lifecycle docs now include v0.3 close taxonomy, developer close taxonomy added, docs CLI/onboarding checks pass, routing/doctor/format checks pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T12:59:35.880Z, excerpt_hash=sha256:eca62141938cd899f9539422d58933f89aab18cd87f328e9e4002851e43d892e
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

v0.3 freeze D1: document lifecycle and close taxonomy

Add the v0.3 task lifecycle and close taxonomy documentation that maps close/finish commands to modes, git writes, docs writes, and final statuses.

## Scope

- In scope: Add the v0.3 task lifecycle and close taxonomy documentation that maps close/finish commands to modes, git writes, docs writes, and final statuses.
- Out of scope: unrelated refactors not required for "v0.3 freeze D1: document lifecycle and close taxonomy".

## Plan

1. Add a user-facing v0.3 lifecycle lock section to docs/user/task-lifecycle.mdx that maps close/finish variants to workflow mode, git writes, task docs writes, and terminal status.
2. Add docs/developer/close-taxonomy.mdx as the developer-facing taxonomy for finish, close-noop, close-duplicate, hosted-close, hosted-close-pr, pr close, and pr close-superseded, with D2 precheck extraction notes.
3. Verify with docs checks, routing check, doctor, and formatting/diff checks.

## Verify Steps

1. Run `rg -n 'Lifecycle and close taxonomy|close-taxonomy|task hosted-close-pr|pr close-superseded' docs/user/task-lifecycle.mdx docs/developer/close-taxonomy.mdx`. Expected: user and developer docs cover the v0.3 close taxonomy.
2. Run `bun run docs:cli:check`. Expected: pass.
3. Run `bun run docs:onboarding:check`. Expected: pass.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: pass.
5. Run `agentplane doctor`. Expected: OK.
6. Run `git diff --check && bun run format:check`. Expected: pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T13:02:20.034Z — VERIFY — ok

By: DOCS

Note: D1 verified: task lifecycle docs now include v0.3 close taxonomy, developer close taxonomy added, docs CLI/onboarding checks pass, routing/doctor/format checks pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T12:59:35.880Z, excerpt_hash=sha256:eca62141938cd899f9539422d58933f89aab18cd87f328e9e4002851e43d892e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
