---
id: "202603311332-0QBGN0"
title: "N5.4 Split `commands/upgrade.ts` by planning, apply, report, and lock concerns"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603311331-C3JHD2"
  - "202603311331-81NZD4"
tags:
  - "code"
  - "refactor"
  - "upgrade"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T20:21:36.574Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T20:41:55.577Z"
  updated_by: "CODER"
  note: "Split commands/upgrade.ts into policy/materialize/plan modules and kept upgrade CLI contracts green via focused lint, vitest, and framework bootstrap."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split commands/upgrade.ts into policy, materialize, and planning modules while preserving lock lifecycle, managed-file policy, agent/auto mode sequencing, and public cmdUpgradeParsed entrypoints."
events:
  -
    type: "status"
    at: "2026-03-31T20:23:19.619Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split commands/upgrade.ts into policy, materialize, and planning modules while preserving lock lifecycle, managed-file policy, agent/auto mode sequencing, and public cmdUpgradeParsed entrypoints."
  -
    type: "verify"
    at: "2026-03-31T20:41:55.577Z"
    author: "CODER"
    state: "ok"
    note: "Split commands/upgrade.ts into policy/materialize/plan modules and kept upgrade CLI contracts green via focused lint, vitest, and framework bootstrap."
doc_version: 3
doc_updated_at: "2026-03-31T20:41:55.580Z"
doc_updated_by: "CODER"
description: "Implement N5.4 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: upgrade flow orchestration is easier to test without loading the whole module. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N5.4 Split `commands/upgrade.ts` by planning, apply, report, and lock concerns
    
    Implement N5.4 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: upgrade flow orchestration is easier to test without loading the whole module. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N5.4 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: upgrade flow orchestration is easier to test without loading the whole module. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N5.4 Split `commands/upgrade.ts` by planning, apply, report, and lock concerns".
  Plan: |-
    1. Audit the scoped modules named by this refactor item and isolate the narrowest change set that satisfies N5.4.
    2. Implement split `commands/upgrade.ts` by planning, apply, report, and lock concerns with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering the scoped modules named by this refactor item. Expected: the behavior targeted by N5.4 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-0QBGN0. Expected: scope stays anchored to the scoped modules named by this refactor item plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: upgrade flow orchestration is easier to test without loading the whole module.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T20:41:55.577Z — VERIFY — ok
    
    By: CODER
    
    Note: Split commands/upgrade.ts into policy/materialize/plan modules and kept upgrade CLI contracts green via focused lint, vitest, and framework bootstrap.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T20:23:19.639Z, excerpt_hash=sha256:e8978efaeeb679ccb085274001f4fd9b2c9b9a0e274c061bbc6ae2352ce64a30
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N5.4 Split `commands/upgrade.ts` by planning, apply, report, and lock concerns

Implement N5.4 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: upgrade flow orchestration is easier to test without loading the whole module. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N5.4 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: upgrade flow orchestration is easier to test without loading the whole module. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N5.4 Split `commands/upgrade.ts` by planning, apply, report, and lock concerns".

## Plan

1. Audit the scoped modules named by this refactor item and isolate the narrowest change set that satisfies N5.4.
2. Implement split `commands/upgrade.ts` by planning, apply, report, and lock concerns with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering the scoped modules named by this refactor item. Expected: the behavior targeted by N5.4 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-0QBGN0. Expected: scope stays anchored to the scoped modules named by this refactor item plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: upgrade flow orchestration is easier to test without loading the whole module.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T20:41:55.577Z — VERIFY — ok

By: CODER

Note: Split commands/upgrade.ts into policy/materialize/plan modules and kept upgrade CLI contracts green via focused lint, vitest, and framework bootstrap.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T20:23:19.639Z, excerpt_hash=sha256:e8978efaeeb679ccb085274001f4fd9b2c9b9a0e274c061bbc6ae2352ce64a30

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
