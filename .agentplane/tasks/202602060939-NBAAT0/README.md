---
id: "202602060939-NBAAT0"
title: "E1: Enforce require_network across all network operations"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602060821-T6304R"
tags:
  - "roadmap"
  - "approvals"
  - "network"
  - "guard"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-06T10:27:51.306Z"
  updated_by: "USER"
  note: "Approved (chat 2026-02-06)"
verification:
  state: "ok"
  updated_at: "2026-02-06T10:28:42.818Z"
  updated_by: "CODER"
  note: "E1: ensureNetworkApproved; wired to recipes/upgrade/sync; tests updated; bun run format:check, lint, test:fast, test:cli:core"
commit:
  hash: "56202849e418561f517cb60132355f077a945a73"
  message: "🛡️ NBAAT0 require_network"
comments:
  -
    author: "CODER"
    body: "Start: Implement ensureNetworkApproved guard + wire into recipes/upgrade/sync with --yes enforcement and tests."
  -
    author: "CODER"
    body: "Verified: Added ensureNetworkApproved guard (prompt in TTY; require --yes otherwise) and applied it to recipes list-remote/install, upgrade remote fetch, and backend sync; updated tests and ran format:check, lint, test:fast, test:cli:core."
doc_version: 3
doc_updated_at: "2026-02-06T10:29:09.585Z"
doc_updated_by: "CODER"
description: "Add guard ensureNetworkApproved and apply to recipe install/update/refresh, upgrade, redmine sync, remote fetch."
id_source: "generated"
---
## Summary


## Scope


## Plan

1) Add ensureNetworkApproved guard (interactive prompt; non-interactive requires --yes)
2) Apply to recipes list-remote/install, upgrade, backend sync
3) Add/adjust tests for --yes enforcement and preserve existing error mapping coverage
4) Verify: bun run format:check, lint, test:fast, test:cli:core

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-06T10:28:42.818Z — VERIFY — ok

By: CODER

Note: E1: ensureNetworkApproved; wired to recipes/upgrade/sync; tests updated; bun run format:check, lint, test:fast, test:cli:core

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Findings


## Risks
