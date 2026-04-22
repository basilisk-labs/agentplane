---
id: "202604221918-HQ0WPR"
title: "Add test routing guard"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604221918-TJ7SRW"
tags:
  - "code"
  - "test"
verify:
  - "bun run test:fast"
  - "bun run vitest:projects:check"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-22T19:19:21.112Z"
doc_updated_by: "PLANNER"
description: "Add a guard that verifies every test has an explicit primary route, aggregate routes are intentional, and overlapping or uncovered tests fail fast."
sections:
  Summary: |-
    Add test routing guard
    
    Add a guard that verifies every test has an explicit primary route, aggregate routes are intentional, and overlapping or uncovered tests fail fast.
  Scope: |-
    - In scope: add a routing guard that consumes the shared test inventory.
    - In scope: fail on uncovered tests, duplicate primary routing, unknown primary route labels, and unintentional aggregate-only routing.
    - In scope: keep explicit exceptions documented in code data, not scattered script conditionals.
    - Out of scope: wiring the guard into package scripts or CI; that is handled by the next task.
  Plan: "Add a failing guard for test routing drift using the inventory from 202604221918-TJ7SRW. The guard must prove every test has exactly one intentional primary route and that aggregate routes are explicit."
  Verify Steps: |-
    1. Run `node scripts/check-test-routing.mjs`. Expected: pass and report current route coverage.
    2. Run `bun run vitest:projects:check`. Expected: pass.
    3. Run `bun run test:fast`. Expected: pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add test routing guard

Add a guard that verifies every test has an explicit primary route, aggregate routes are intentional, and overlapping or uncovered tests fail fast.

## Scope

- In scope: add a routing guard that consumes the shared test inventory.
- In scope: fail on uncovered tests, duplicate primary routing, unknown primary route labels, and unintentional aggregate-only routing.
- In scope: keep explicit exceptions documented in code data, not scattered script conditionals.
- Out of scope: wiring the guard into package scripts or CI; that is handled by the next task.

## Plan

Add a failing guard for test routing drift using the inventory from 202604221918-TJ7SRW. The guard must prove every test has exactly one intentional primary route and that aggregate routes are explicit.

## Verify Steps

1. Run `node scripts/check-test-routing.mjs`. Expected: pass and report current route coverage.
2. Run `bun run vitest:projects:check`. Expected: pass.
3. Run `bun run test:fast`. Expected: pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
