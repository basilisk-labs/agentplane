---
id: "202604221918-QX0XJG"
title: "Add oversized test ratchet"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604221918-C1KTM7"
tags:
  - "code"
  - "test"
verify:
  - "bun run hotspots:check"
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
doc_updated_at: "2026-04-22T19:19:25.569Z"
doc_updated_by: "PLANNER"
description: "Add a baseline-backed oversized-test ratchet that allows current large tests but fails on new oversized tests or growth beyond the checked-in baseline."
sections:
  Summary: |-
    Add oversized test ratchet
    
    Add a baseline-backed oversized-test ratchet that allows current large tests but fails on new oversized tests or growth beyond the checked-in baseline.
  Scope: |-
    - In scope: add a baseline-backed ratchet for oversized test files.
    - In scope: allow current oversized tests only through an explicit checked-in baseline.
    - In scope: fail on new oversized tests or growth beyond baseline unless baseline is intentionally updated.
    - Out of scope: splitting oversized tests; that is a follow-up once guardrails are active.
  Plan: "Add an oversized-test ratchet backed by a deterministic baseline so the current large-test debt is explicit and future growth fails automatically."
  Verify Steps: |-
    1. Run `bun run hotspots:check`. Expected: pass with oversized-test baseline enforced.
    2. Run `bun run vitest:projects:check`. Expected: pass.
    3. Inspect the baseline artifact. Expected: it contains only current oversized tests and deterministic line counts.
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

Add oversized test ratchet

Add a baseline-backed oversized-test ratchet that allows current large tests but fails on new oversized tests or growth beyond the checked-in baseline.

## Scope

- In scope: add a baseline-backed ratchet for oversized test files.
- In scope: allow current oversized tests only through an explicit checked-in baseline.
- In scope: fail on new oversized tests or growth beyond baseline unless baseline is intentionally updated.
- Out of scope: splitting oversized tests; that is a follow-up once guardrails are active.

## Plan

Add an oversized-test ratchet backed by a deterministic baseline so the current large-test debt is explicit and future growth fails automatically.

## Verify Steps

1. Run `bun run hotspots:check`. Expected: pass with oversized-test baseline enforced.
2. Run `bun run vitest:projects:check`. Expected: pass.
3. Inspect the baseline artifact. Expected: it contains only current oversized tests and deterministic line counts.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
