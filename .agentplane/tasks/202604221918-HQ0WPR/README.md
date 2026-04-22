---
id: "202604221918-HQ0WPR"
title: "Add test routing guard"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
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
  state: "approved"
  updated_at: "2026-04-22T19:27:29.360Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T19:30:57.315Z"
  updated_by: "CODER"
  note: "Command: node scripts/check-test-routing.mjs; Result: pass; Evidence: test routing OK, total tests 315. Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK. Command: bun run test:fast; Result: pass; Evidence: 238 test files passed, 1379 tests passed, 2 skipped."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing test routing guard on top of the shared inventory to fail uncovered and duplicate primary routes."
events:
  -
    type: "status"
    at: "2026-04-22T19:27:29.764Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing test routing guard on top of the shared inventory to fail uncovered and duplicate primary routes."
  -
    type: "verify"
    at: "2026-04-22T19:30:57.315Z"
    author: "CODER"
    state: "ok"
    note: "Command: node scripts/check-test-routing.mjs; Result: pass; Evidence: test routing OK, total tests 315. Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK. Command: bun run test:fast; Result: pass; Evidence: 238 test files passed, 1379 tests passed, 2 skipped."
doc_version: 3
doc_updated_at: "2026-04-22T19:30:57.318Z"
doc_updated_by: "CODER"
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
    ### 2026-04-22T19:30:57.315Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: node scripts/check-test-routing.mjs; Result: pass; Evidence: test routing OK, total tests 315. Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK. Command: bun run test:fast; Result: pass; Evidence: 238 test files passed, 1379 tests passed, 2 skipped.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T19:27:29.772Z, excerpt_hash=sha256:1ec82fdbf5e7edc8171db7124ed07183f30311b0a735280d9dd59c4718b512c9
    
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
### 2026-04-22T19:30:57.315Z — VERIFY — ok

By: CODER

Note: Command: node scripts/check-test-routing.mjs; Result: pass; Evidence: test routing OK, total tests 315. Command: bun run vitest:projects:check; Result: pass; Evidence: vitest workspace projects OK. Command: bun run test:fast; Result: pass; Evidence: 238 test files passed, 1379 tests passed, 2 skipped.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T19:27:29.772Z, excerpt_hash=sha256:1ec82fdbf5e7edc8171db7124ed07183f30311b0a735280d9dd59c4718b512c9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
