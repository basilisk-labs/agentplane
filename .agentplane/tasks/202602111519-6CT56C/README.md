---
id: "202602111519-6CT56C"
title: "T1: Unified approval requirements API"
result_summary: "T1 completed."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "cli"
  - "policy"
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-11T15:22:19.839Z"
  updated_by: "TESTER"
  note: "Verified: unified approval requirements module added, network approval routed through ensureActionApproved, and shared approval tests pass."
commit:
  hash: "d3a6aa5f8fe8fa5f331c6b8c866317d3432c5b7b"
  message: "✅ 6CT56C approval: add unified requirements layer"
comments:
  -
    author: "CODER"
    body: "Start: introducing shared approval requirements API and unifying current network approval path without changing semantics."
  -
    author: "CODER"
    body: "Verified: unified approval-requirements API is in place, with network approval now routed through ensureActionApproved and passing tests/lint."
events:
  -
    type: "status"
    at: "2026-02-11T15:20:35.181Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: introducing shared approval requirements API and unifying current network approval path without changing semantics."
  -
    type: "verify"
    at: "2026-02-11T15:22:19.839Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: unified approval requirements module added, network approval routed through ensureActionApproved, and shared approval tests pass."
  -
    type: "status"
    at: "2026-02-11T15:23:10.933Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: unified approval-requirements API is in place, with network approval now routed through ensureActionApproved and passing tests/lint."
doc_version: 2
doc_updated_at: "2026-02-11T15:23:10.933Z"
doc_updated_by: "CODER"
description: "Create shared approval-requirements layer with action enum and ensureActionApproved helper; consolidate network approval entrypoint."
id_source: "generated"
---
## Summary

Introduce a single approval requirements layer used by commands to decide whether an action requires explicit user approval.

## Scope

In scope: shared approval module, action enum, requirement resolver, and unified runtime helper. Out of scope: execution-profile escalation matrix behavior (T2).

## Plan

1) Inspect current approval paths (network and force). 2) Add approval requirements module and shared helper. 3) Wire existing network approval through helper without behavior change. 4) Add unit tests.

## Risks

Risk: changing approval flow may alter CLI behavior unexpectedly. Mitigation: keep semantic parity for existing network approvals in this task and add focused tests.

## Verify Steps

- bun run test:agentplane -- packages/agentplane/src/commands/shared\n- bun run lint\nExpected: network approval behavior remains intact and new shared helper tests pass.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T15:22:19.839Z — VERIFY — ok

By: TESTER

Note: Verified: unified approval requirements module added, network approval routed through ensureActionApproved, and shared approval tests pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T15:20:35.181Z, excerpt_hash=sha256:c04fc142628904dcdf88f8b9e02586802eca016451396649fc9763bd455cee90

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert module wiring commit and restore previous approval call sites if regressions appear.
