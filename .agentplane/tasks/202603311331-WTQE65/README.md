---
id: "202603311331-WTQE65"
title: "N0.1 Lock representative text and JSON output for current hotspot commands"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "cli"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T13:35:43.686Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T13:47:28.667Z"
  updated_by: "CODER"
  note: "Focused vitest and eslint slices passed; exact-output contracts now lock JSON pretty-print and plain-text layouts for runtime/config, task run show, handoff show, reclaim, and resume-context surfaces targeted by N1."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: lock representative plain-text and JSON output contracts across the highest-value output-heavy command families so later emitter consolidation can delete formatting code without losing functional coverage."
events:
  -
    type: "status"
    at: "2026-03-31T13:36:24.922Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: lock representative plain-text and JSON output contracts across the highest-value output-heavy command families so later emitter consolidation can delete formatting code without losing functional coverage."
  -
    type: "verify"
    at: "2026-03-31T13:47:28.667Z"
    author: "CODER"
    state: "ok"
    note: "Focused vitest and eslint slices passed; exact-output contracts now lock JSON pretty-print and plain-text layouts for runtime/config, task run show, handoff show, reclaim, and resume-context surfaces targeted by N1."
doc_version: 3
doc_updated_at: "2026-03-31T13:47:28.668Z"
doc_updated_by: "CODER"
description: "Implement N0.1 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: exact-output tests cover both plain-text and JSON shapes for the command families targeted by `N1`. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N0.1 Lock representative text and JSON output for current hotspot commands
    
    Implement N0.1 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: exact-output tests cover both plain-text and JSON shapes for the command families targeted by `N1`. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N0.1 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: exact-output tests cover both plain-text and JSON shapes for the command families targeted by `N1`. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N0.1 Lock representative text and JSON output for current hotspot commands".
  Plan: |-
    1. Audit `cli/run-cli`, `task run *`, handoff/reclaim/show, runtime/config/help report paths and isolate the narrowest change set that satisfies N0.1.
    2. Implement lock representative text and json output for current hotspot commands with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `cli/run-cli`, `task run *`, handoff/reclaim/show, runtime/config/help report paths. Expected: the behavior targeted by N0.1 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-WTQE65. Expected: scope stays anchored to `cli/run-cli`, `task run *`, handoff/reclaim/show, runtime/config/help report paths plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: exact-output tests cover both plain-text and JSON shapes for the command families targeted by `N1`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T13:47:28.667Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused vitest and eslint slices passed; exact-output contracts now lock JSON pretty-print and plain-text layouts for runtime/config, task run show, handoff show, reclaim, and resume-context surfaces targeted by N1.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T13:36:24.923Z, excerpt_hash=sha256:e3d45b4f33cc50e5d323010b46f67a2bb2baa42b48bb984cdff4d9107bb543db
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N0.1 Lock representative text and JSON output for current hotspot commands

Implement N0.1 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: exact-output tests cover both plain-text and JSON shapes for the command families targeted by `N1`. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N0.1 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: exact-output tests cover both plain-text and JSON shapes for the command families targeted by `N1`. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N0.1 Lock representative text and JSON output for current hotspot commands".

## Plan

1. Audit `cli/run-cli`, `task run *`, handoff/reclaim/show, runtime/config/help report paths and isolate the narrowest change set that satisfies N0.1.
2. Implement lock representative text and json output for current hotspot commands with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `cli/run-cli`, `task run *`, handoff/reclaim/show, runtime/config/help report paths. Expected: the behavior targeted by N0.1 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-WTQE65. Expected: scope stays anchored to `cli/run-cli`, `task run *`, handoff/reclaim/show, runtime/config/help report paths plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: exact-output tests cover both plain-text and JSON shapes for the command families targeted by `N1`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T13:47:28.667Z — VERIFY — ok

By: CODER

Note: Focused vitest and eslint slices passed; exact-output contracts now lock JSON pretty-print and plain-text layouts for runtime/config, task run show, handoff show, reclaim, and resume-context surfaces targeted by N1.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T13:36:24.923Z, excerpt_hash=sha256:e3d45b4f33cc50e5d323010b46f67a2bb2baa42b48bb984cdff4d9107bb543db

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
