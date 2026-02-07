---
id: "202602070742-J3Z64D"
title: "Enforce network approval before update-check"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T07:42:09.046Z"
  updated_by: "USER"
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-07T08:54:09.287Z"
  updated_by: "ORCHESTRATOR"
  note: "bun run test:cli:core (vitest)"
commit:
  hash: "2f8d62947a297e95666bc4aac0f17c58bfa8818d"
  message: "✨ J3Z64D cli: gate update-check behind require_network approval"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: enforce require_network gating for update-check before any network call."
  -
    author: "ORCHESTRATOR"
    body: "Verified: update-check no longer runs before config load; when require_network=true it is skipped unless --yes is present. Tests: bun run test:cli:core; lint/format/test-fast via pre-commit hook."
events:
  -
    type: "status"
    at: "2026-02-07T07:42:13.535Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: enforce require_network gating for update-check before any network call."
  -
    type: "verify"
    at: "2026-02-07T08:54:09.287Z"
    author: "ORCHESTRATOR"
    state: "ok"
    note: "bun run test:cli:core (vitest)"
  -
    type: "status"
    at: "2026-02-07T09:19:12.460Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: update-check no longer runs before config load; when require_network=true it is skipped unless --yes is present. Tests: bun run test:cli:core; lint/format/test-fast via pre-commit hook."
doc_version: 2
doc_updated_at: "2026-02-07T09:19:12.460Z"
doc_updated_by: "ORCHESTRATOR"
description: "Move update-check after config load and skip when require_network=true unless explicitly allowed"
id_source: "generated"
---
## Summary

Gate CLI update-check behind config load and require_network approval; avoid preflight network calls.

## Scope

Touch only CLI update-check gating and its tests.

## Plan

1. Locate update-check invocation and config load in run-cli. 2. Move update-check after config load. 3. If require_network=true, force update-check skip unless explicit allow flag exists. 4. Adjust tests or add minimal test coverage. 5. Verify behavior and document.

## Risks

Low risk. Update-check behavior changes only when approvals are enabled; for require_network=true, update-check requires an explicit --yes token somewhere in argv.

## Verification

- bun run test:cli:core

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T08:54:09.287Z — VERIFY — ok

By: ORCHESTRATOR

Note: bun run test:cli:core (vitest)

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commit for this task; update-check will run unconditionally again (pre-fix behavior).
