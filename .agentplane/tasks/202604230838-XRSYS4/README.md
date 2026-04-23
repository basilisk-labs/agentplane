---
id: "202604230838-XRSYS4"
title: "Cover verify flag matrix"
result_summary: "Added table-driven verify flag matrix and aligned --local-only/--repo-fixable conflict validation with findings add semantics."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202604230838-T201MB"
tags:
  - "cli"
  - "code"
  - "testing"
verify:
  - "bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.verify*.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T08:40:46.050Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T09:33:18.502Z"
  updated_by: "CODER"
  note: "Verify flag matrix passed; incidents suite passed after parser consistency fix; format check passed."
commit:
  hash: "2802ed132d92f800f5cce123e1964d476557e38d"
  message: "🧪 XRSYS4 test: cover verify flag matrix"
comments:
  -
    author: "CODER"
    body: "Start: verify flag matrix coverage is ready after lifecycle diagnostics completion."
  -
    author: "CODER"
    body: "Verified: verify matrix, incidents suite, and format check passed."
events:
  -
    type: "status"
    at: "2026-04-23T09:30:20.627Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: verify flag matrix coverage is ready after lifecycle diagnostics completion."
  -
    type: "verify"
    at: "2026-04-23T09:33:18.502Z"
    author: "CODER"
    state: "ok"
    note: "Verify flag matrix passed; incidents suite passed after parser consistency fix; format check passed."
  -
    type: "status"
    at: "2026-04-23T09:33:19.359Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: verify matrix, incidents suite, and format check passed."
doc_version: 3
doc_updated_at: "2026-04-23T09:33:19.361Z"
doc_updated_by: "CODER"
description: "Add table-driven coverage for verify flag combinations so plain verification, local-only, repo-fixable, partial findings, and complete structured findings behave predictably."
sections:
  Summary: |-
    Cover verify flag matrix
    
    Add table-driven coverage for verify flag combinations so plain verification, local-only, repo-fixable, partial findings, and complete structured findings behave predictably.
  Scope: "In scope: verify parser/CLI behavior coverage and minimal fixes for inconsistent flag semantics. Out of scope: redesigning the incidents model or changing findings promotion policy."
  Plan: |-
    1. Locate verify command tests and shared option parsing.
    2. Add table-driven tests for plain verify, --local-only, --repo-fixable, partial structured findings, full structured findings, incident tags/match fields, and collect-incidents interactions.
    3. Only change parser behavior if tests expose a real inconsistency; otherwise keep runtime unchanged and document expected behavior through tests.
    4. Run targeted verify suites.
  Verify Steps: |-
    1. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.verify*.test.ts`. Expected: verify matrix passes.
    2. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.incidents*.test.ts` if incident promotion behavior is touched. Expected: incident command behavior remains green.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T09:33:18.502Z — VERIFY — ok
    
    By: CODER
    
    Note: Verify flag matrix passed; incidents suite passed after parser consistency fix; format check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T09:30:20.643Z, excerpt_hash=sha256:fc62dc9e35e6a819a98b5d4255f8f18ca03b88975601703340ccb9c2d093db5a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert verify tests and any minimal parser changes. Existing verify command behavior should remain available."
  Findings: ""
id_source: "generated"
---
## Summary

Cover verify flag matrix

Add table-driven coverage for verify flag combinations so plain verification, local-only, repo-fixable, partial findings, and complete structured findings behave predictably.

## Scope

In scope: verify parser/CLI behavior coverage and minimal fixes for inconsistent flag semantics. Out of scope: redesigning the incidents model or changing findings promotion policy.

## Plan

1. Locate verify command tests and shared option parsing.
2. Add table-driven tests for plain verify, --local-only, --repo-fixable, partial structured findings, full structured findings, incident tags/match fields, and collect-incidents interactions.
3. Only change parser behavior if tests expose a real inconsistency; otherwise keep runtime unchanged and document expected behavior through tests.
4. Run targeted verify suites.

## Verify Steps

1. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.verify*.test.ts`. Expected: verify matrix passes.
2. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.incidents*.test.ts` if incident promotion behavior is touched. Expected: incident command behavior remains green.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T09:33:18.502Z — VERIFY — ok

By: CODER

Note: Verify flag matrix passed; incidents suite passed after parser consistency fix; format check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T09:30:20.643Z, excerpt_hash=sha256:fc62dc9e35e6a819a98b5d4255f8f18ca03b88975601703340ccb9c2d093db5a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert verify tests and any minimal parser changes. Existing verify command behavior should remain available.

## Findings
