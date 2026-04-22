---
id: "202604221918-C1KTM7"
title: "Validate suite and selector test targets"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604221918-25GXRR"
tags:
  - "code"
  - "test"
verify:
  - "bun run test:precommit"
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
doc_updated_at: "2026-04-22T19:19:24.087Z"
doc_updated_by: "PLANNER"
description: "Make run-vitest-suite and local CI selector targets validate against the shared test inventory so stale hard-coded test paths cannot survive silently."
sections:
  Summary: |-
    Validate suite and selector test targets
    
    Make run-vitest-suite and local CI selector targets validate against the shared test inventory so stale hard-coded test paths cannot survive silently.
  Scope: |-
    - In scope: validate hard-coded run-vitest-suite targets and local CI selector targets against the shared inventory.
    - In scope: make stale suite files fail before an individual suite happens to run.
    - In scope: keep target validation cheap and deterministic.
    - Out of scope: redesigning all suite definitions into a new DSL.
  Plan: "Validate hard-coded Vitest suite and local CI selector targets against the shared inventory, preventing stale test file references from surviving silently."
  Verify Steps: |-
    1. Run `bun run vitest:projects:check`. Expected: validates suite/selector targets and passes.
    2. Run `bun run test:precommit`. Expected: pass.
    3. Run a direct validation command if added. Expected: stale target detection is covered.
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

Validate suite and selector test targets

Make run-vitest-suite and local CI selector targets validate against the shared test inventory so stale hard-coded test paths cannot survive silently.

## Scope

- In scope: validate hard-coded run-vitest-suite targets and local CI selector targets against the shared inventory.
- In scope: make stale suite files fail before an individual suite happens to run.
- In scope: keep target validation cheap and deterministic.
- Out of scope: redesigning all suite definitions into a new DSL.

## Plan

Validate hard-coded Vitest suite and local CI selector targets against the shared inventory, preventing stale test file references from surviving silently.

## Verify Steps

1. Run `bun run vitest:projects:check`. Expected: validates suite/selector targets and passes.
2. Run `bun run test:precommit`. Expected: pass.
3. Run a direct validation command if added. Expected: stale target detection is covered.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
