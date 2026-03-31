---
id: "202603311331-D3Q9CQ"
title: "N2.3 Move low-risk task mutators onto the bridge"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603311331-BVYTP3"
tags:
  - "code"
  - "refactor"
  - "backend"
verify: []
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
doc_updated_at: "2026-03-31T13:31:22.094Z"
doc_updated_by: "PLANNER"
description: "Implement N2.3 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: these commands become thin wrappers around the shared mutation helper. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N2.3 Move low-risk task mutators onto the bridge
    
    Implement N2.3 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: these commands become thin wrappers around the shared mutation helper. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N2.3 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: these commands become thin wrappers around the shared mutation helper. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N2.3 Move low-risk task mutators onto the bridge".
  Plan: |-
    1. Audit `task/comment.ts`, `task/close-noop.ts`, and other simple patch-style commands and isolate the narrowest change set that satisfies N2.3.
    2. Implement move low-risk task mutators onto the bridge with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `task/comment.ts`, `task/close-noop.ts`, and other simple patch-style commands. Expected: the behavior targeted by N2.3 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-D3Q9CQ. Expected: scope stays anchored to `task/comment.ts`, `task/close-noop.ts`, and other simple patch-style commands plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: these commands become thin wrappers around the shared mutation helper.
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

N2.3 Move low-risk task mutators onto the bridge

Implement N2.3 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: these commands become thin wrappers around the shared mutation helper. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N2.3 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: these commands become thin wrappers around the shared mutation helper. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N2.3 Move low-risk task mutators onto the bridge".

## Plan

1. Audit `task/comment.ts`, `task/close-noop.ts`, and other simple patch-style commands and isolate the narrowest change set that satisfies N2.3.
2. Implement move low-risk task mutators onto the bridge with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `task/comment.ts`, `task/close-noop.ts`, and other simple patch-style commands. Expected: the behavior targeted by N2.3 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-D3Q9CQ. Expected: scope stays anchored to `task/comment.ts`, `task/close-noop.ts`, and other simple patch-style commands plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: these commands become thin wrappers around the shared mutation helper.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
