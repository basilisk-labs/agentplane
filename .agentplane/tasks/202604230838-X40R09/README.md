---
id: "202604230838-X40R09"
title: "Keep quickstart installed-user guidance self-contained"
result_summary: "Updated quickstart/role/bootstrap guidance to route branch_pr users through CLI-native commands and mark workflow:wait-remote-checks as an optional framework-maintainer helper only."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on:
  - "202604230838-YPDDS3"
tags:
  - "cli"
  - "code"
  - "guidance"
verify:
  - "bun run docs:cli:check"
  - "bun run test:project -- agentplane packages/agentplane/src/cli/command-guide.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T08:40:45.621Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T09:25:15.944Z"
  updated_by: "CODER"
  note: "Quickstart and bootstrap guidance are self-contained for installed users; command-guide tests, docs:cli:check, docs:bootstrap:check, and format check passed."
commit:
  hash: "a94c38ef0e5b4ef50e00c540d7aa42c05409bbcd"
  message: "🧭 X40R09 guide: keep quickstart self-contained"
comments:
  -
    author: "CODER"
    body: "Start: installed quickstart guidance is ready after stale hook diagnostics completion."
  -
    author: "CODER"
    body: "Verified: command-guide tests, CLI docs freshness, bootstrap docs freshness, and format check passed."
events:
  -
    type: "status"
    at: "2026-04-23T09:21:54.549Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: installed quickstart guidance is ready after stale hook diagnostics completion."
  -
    type: "verify"
    at: "2026-04-23T09:25:15.944Z"
    author: "CODER"
    state: "ok"
    note: "Quickstart and bootstrap guidance are self-contained for installed users; command-guide tests, docs:cli:check, docs:bootstrap:check, and format check passed."
  -
    type: "status"
    at: "2026-04-23T09:25:17.384Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: command-guide tests, CLI docs freshness, bootstrap docs freshness, and format check passed."
doc_version: 3
doc_updated_at: "2026-04-23T09:25:17.386Z"
doc_updated_by: "CODER"
description: "Remove repo-only command assumptions from installed quickstart guidance and route branch_pr users to CLI-native commands or explicitly optional framework-maintainer scripts."
sections:
  Summary: |-
    Keep quickstart installed-user guidance self-contained
    
    Remove repo-only command assumptions from installed quickstart guidance and route branch_pr users to CLI-native commands or explicitly optional framework-maintainer scripts.
  Scope: "In scope: installed quickstart and role guidance text that currently implies repo-local scripts are required. Out of scope: changing branch_pr command behavior or release workflow implementation."
  Plan: |-
    1. Inspect quickstart and role supplement rendering for repo-only command references.
    2. Replace installed-user quickstart branch_pr guidance with CLI-native steps and mark framework-maintainer scripts as optional/non-default.
    3. Update snapshots/generated docs as needed.
    4. Run command-guide and docs freshness checks.
  Verify Steps: |-
    1. Run `bun run test:project -- agentplane packages/agentplane/src/cli/command-guide.test.ts`. Expected: quickstart text tests pass.
    2. Run `bun run docs:cli:check`. Expected: generated CLI docs are fresh if help output changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T09:25:15.944Z — VERIFY — ok
    
    By: CODER
    
    Note: Quickstart and bootstrap guidance are self-contained for installed users; command-guide tests, docs:cli:check, docs:bootstrap:check, and format check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T09:21:54.564Z, excerpt_hash=sha256:c7cb750449cad9fb38d45d99c44833a21b12c8c427fdb7d3751703d071fe0a6d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert quickstart/role guidance edits and any regenerated documentation."
  Findings: ""
id_source: "generated"
---
## Summary

Keep quickstart installed-user guidance self-contained

Remove repo-only command assumptions from installed quickstart guidance and route branch_pr users to CLI-native commands or explicitly optional framework-maintainer scripts.

## Scope

In scope: installed quickstart and role guidance text that currently implies repo-local scripts are required. Out of scope: changing branch_pr command behavior or release workflow implementation.

## Plan

1. Inspect quickstart and role supplement rendering for repo-only command references.
2. Replace installed-user quickstart branch_pr guidance with CLI-native steps and mark framework-maintainer scripts as optional/non-default.
3. Update snapshots/generated docs as needed.
4. Run command-guide and docs freshness checks.

## Verify Steps

1. Run `bun run test:project -- agentplane packages/agentplane/src/cli/command-guide.test.ts`. Expected: quickstart text tests pass.
2. Run `bun run docs:cli:check`. Expected: generated CLI docs are fresh if help output changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T09:25:15.944Z — VERIFY — ok

By: CODER

Note: Quickstart and bootstrap guidance are self-contained for installed users; command-guide tests, docs:cli:check, docs:bootstrap:check, and format check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T09:21:54.564Z, excerpt_hash=sha256:c7cb750449cad9fb38d45d99c44833a21b12c8c427fdb7d3751703d071fe0a6d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert quickstart/role guidance edits and any regenerated documentation.

## Findings
