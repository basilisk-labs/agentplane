---
id: "202603311331-C3JHD2"
title: "N1.5 Delete obsolete ad-hoc render helpers and document the output conventions"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603311331-VPRQXR"
  - "202603311331-PRG60Z"
  - "202603311331-Z22BB6"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T17:16:56.675Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T17:19:11.166Z"
  updated_by: "CODER"
  note: "Emitter cleanup verified with focused eslint, output/scenario vitest suites, package build, and diff scope audit; the shared output contract is now documented around the emitter API and the obsolete scenario-local JSON section helper is gone."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: delete the remaining ad-hoc render helpers, keep the shared emitter contract as the only user-facing output path, and document the surviving conventions where future command work can follow one model."
events:
  -
    type: "status"
    at: "2026-03-31T17:15:04.186Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: delete the remaining ad-hoc render helpers, keep the shared emitter contract as the only user-facing output path, and document the surviving conventions where future command work can follow one model."
  -
    type: "verify"
    at: "2026-03-31T17:19:11.166Z"
    author: "CODER"
    state: "ok"
    note: "Emitter cleanup verified with focused eslint, output/scenario vitest suites, package build, and diff scope audit; the shared output contract is now documented around the emitter API and the obsolete scenario-local JSON section helper is gone."
doc_version: 3
doc_updated_at: "2026-03-31T17:19:11.170Z"
doc_updated_by: "CODER"
description: "Implement N1.5 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: duplicate render helpers are removed and the new output conventions are documented. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N1.5 Delete obsolete ad-hoc render helpers and document the output conventions
    
    Implement N1.5 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: duplicate render helpers are removed and the new output conventions are documented. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N1.5 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: duplicate render helpers are removed and the new output conventions are documented. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N1.5 Delete obsolete ad-hoc render helpers and document the output conventions".
  Plan: |-
    1. Audit affected CLI modules and developer docs and isolate the narrowest change set that satisfies N1.5.
    2. Implement delete obsolete ad-hoc render helpers and document the output conventions with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering affected CLI modules and developer docs. Expected: the behavior targeted by N1.5 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-C3JHD2. Expected: scope stays anchored to affected CLI modules and developer docs plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: duplicate render helpers are removed and the new output conventions are documented.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T17:19:11.166Z — VERIFY — ok
    
    By: CODER
    
    Note: Emitter cleanup verified with focused eslint, output/scenario vitest suites, package build, and diff scope audit; the shared output contract is now documented around the emitter API and the obsolete scenario-local JSON section helper is gone.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T17:15:04.208Z, excerpt_hash=sha256:6fe8d497f4f2b1b2cdf9f9f0ed5e8b954d829a74d05390d6c0be7c68988daf61
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N1.5 Delete obsolete ad-hoc render helpers and document the output conventions

Implement N1.5 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: duplicate render helpers are removed and the new output conventions are documented. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N1.5 from REFACTOR.md. Replace the current scattered output/render patterns with one small shared emission layer for user-facing command output.. Acceptance: duplicate render helpers are removed and the new output conventions are documented. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N1.5 Delete obsolete ad-hoc render helpers and document the output conventions".

## Plan

1. Audit affected CLI modules and developer docs and isolate the narrowest change set that satisfies N1.5.
2. Implement delete obsolete ad-hoc render helpers and document the output conventions with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering affected CLI modules and developer docs. Expected: the behavior targeted by N1.5 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-C3JHD2. Expected: scope stays anchored to affected CLI modules and developer docs plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: duplicate render helpers are removed and the new output conventions are documented.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T17:19:11.166Z — VERIFY — ok

By: CODER

Note: Emitter cleanup verified with focused eslint, output/scenario vitest suites, package build, and diff scope audit; the shared output contract is now documented around the emitter API and the obsolete scenario-local JSON section helper is gone.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T17:15:04.208Z, excerpt_hash=sha256:6fe8d497f4f2b1b2cdf9f9f0ed5e8b954d829a74d05390d6c0be7c68988daf61

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
