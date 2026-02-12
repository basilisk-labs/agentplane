---
id: "202602120902-H6B9WC"
title: "P1: add regression tests for lean duplicate/close workflows"
result_summary: "regression coverage added for lean close flow"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "TESTER"
depends_on:
  - "202602120902-576ZM1"
  - "202602120902-K20GM7"
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-12T09:17:37.838Z"
  updated_by: "TESTER"
  note: "Added commit-wrapper regression cases for --unstage-others/--check-only behavior and parser guards; run-cli core guard tests pass."
commit:
  hash: "08bdfce9eff472b532cbf15d106043e79331c1fb"
  message: "🧪 H6B9WC code: extend close-commit regression coverage"
comments:
  -
    author: "TESTER"
    body: "Start: validate and harden regression coverage for duplicate-close and close-commit ergonomics."
  -
    author: "TESTER"
    body: "Verified: close-commit regression suite now covers parser-level option guards plus operational behavior for preflight and auto-unstage flows."
events:
  -
    type: "status"
    at: "2026-02-12T09:15:57.328Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: validate and harden regression coverage for duplicate-close and close-commit ergonomics."
  -
    type: "verify"
    at: "2026-02-12T09:17:37.838Z"
    author: "TESTER"
    state: "ok"
    note: "Added commit-wrapper regression cases for --unstage-others/--check-only behavior and parser guards; run-cli core guard tests pass."
  -
    type: "status"
    at: "2026-02-12T09:17:37.987Z"
    author: "TESTER"
    from: "DOING"
    to: "DONE"
    note: "Verified: close-commit regression suite now covers parser-level option guards plus operational behavior for preflight and auto-unstage flows."
doc_version: 2
doc_updated_at: "2026-02-12T09:17:37.987Z"
doc_updated_by: "TESTER"
description: "Cover duplicate close command, unstage-others behavior, and check-only semantics in CLI tests."
id_source: "generated"
---
## Summary


## Scope


## Plan


## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-12T09:17:37.838Z — VERIFY — ok

By: TESTER

Note: Added commit-wrapper regression cases for --unstage-others/--check-only behavior and parser guards; run-cli core guard tests pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T09:15:57.328Z, excerpt_hash=sha256:872ee63ef6613387f4d4706e71034c7a22211a0af310b9b70ca96a0f5a49f734

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

1. bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.test.ts --hookTimeout 60000 --testTimeout 60000
2. bunx vitest run packages/agentplane/src/cli/run-cli.core.guard.test.ts --hookTimeout 60000 --testTimeout 60000
3. bunx eslint packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.guard.test.ts
