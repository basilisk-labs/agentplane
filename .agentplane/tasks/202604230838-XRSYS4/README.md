---
id: "202604230838-XRSYS4"
title: "Cover verify flag matrix"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: verify flag matrix coverage is ready after lifecycle diagnostics completion."
events:
  -
    type: "status"
    at: "2026-04-23T09:30:20.627Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: verify flag matrix coverage is ready after lifecycle diagnostics completion."
doc_version: 3
doc_updated_at: "2026-04-23T09:30:20.643Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert verify tests and any minimal parser changes. Existing verify command behavior should remain available.

## Findings
