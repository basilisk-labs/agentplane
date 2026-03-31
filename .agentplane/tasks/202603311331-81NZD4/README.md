---
id: "202603311331-81NZD4"
title: "N2.5 Move remaining non-lifecycle task mutators onto the bridge"
result_summary: "integrate: squash task/202603311331-81NZD4/remaining-nonlifecycle-mutators"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603311331-BVYTP3"
  - "202603311331-Y8QMNA"
tags:
  - "code"
  - "refactor"
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T15:53:42.528Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T16:03:27.499Z"
  updated_by: "CODER"
  note: "Moved plan/doc/verify mutators onto the shared storage bridge so local task-store and backend paths converge on one mutation seam; verified with targeted lint, task command unit suites, parity tests, and agentplane build."
commit:
  hash: "08f4a1333849466fa4bb76a92d2d9a894552a831"
  message: "📝 81NZD4 task: finalize PR artifacts"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311331-81NZD4/pr."
events:
  -
    type: "verify"
    at: "2026-03-31T16:03:27.499Z"
    author: "CODER"
    state: "ok"
    note: "Moved plan/doc/verify mutators onto the shared storage bridge so local task-store and backend paths converge on one mutation seam; verified with targeted lint, task command unit suites, parity tests, and agentplane build."
  -
    type: "status"
    at: "2026-03-31T16:05:54.370Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311331-81NZD4/pr."
doc_version: 3
doc_updated_at: "2026-03-31T16:05:54.373Z"
doc_updated_by: "INTEGRATOR"
description: "Implement N2.5 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: backend-type branching no longer appears in these command handlers. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N2.5 Move remaining non-lifecycle task mutators onto the bridge
    
    Implement N2.5 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: backend-type branching no longer appears in these command handlers. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N2.5 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: backend-type branching no longer appears in these command handlers. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N2.5 Move remaining non-lifecycle task mutators onto the bridge".
  Plan: |-
    1. Audit `task/doc.ts`, `task/plan.ts`, `task/verify-record.ts`, and similar field/doc mutators that do not own lifecycle orchestration and isolate the narrowest change set that satisfies N2.5.
    2. Implement move remaining non-lifecycle task mutators onto the bridge with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `task/doc.ts`, `task/plan.ts`, `task/verify-record.ts`, and similar field/doc mutators that do not own lifecycle orchestration. Expected: the behavior targeted by N2.5 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-81NZD4. Expected: scope stays anchored to `task/doc.ts`, `task/plan.ts`, `task/verify-record.ts`, and similar field/doc mutators that do not own lifecycle orchestration plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: backend-type branching no longer appears in these command handlers.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T16:03:27.499Z — VERIFY — ok
    
    By: CODER
    
    Note: Moved plan/doc/verify mutators onto the shared storage bridge so local task-store and backend paths converge on one mutation seam; verified with targeted lint, task command unit suites, parity tests, and agentplane build.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T13:31:23.950Z, excerpt_hash=sha256:c297b15cce195f6e111f98b46dd8af954ae02a5adc41e85346dc9646fdfe3ad0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N2.5 Move remaining non-lifecycle task mutators onto the bridge

Implement N2.5 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: backend-type branching no longer appears in these command handlers. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N2.5 from REFACTOR.md. Hide local-store vs backend branching behind shared mutation helpers and remove repeated bulk-write fallback logic.. Acceptance: backend-type branching no longer appears in these command handlers. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N2.5 Move remaining non-lifecycle task mutators onto the bridge".

## Plan

1. Audit `task/doc.ts`, `task/plan.ts`, `task/verify-record.ts`, and similar field/doc mutators that do not own lifecycle orchestration and isolate the narrowest change set that satisfies N2.5.
2. Implement move remaining non-lifecycle task mutators onto the bridge with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `task/doc.ts`, `task/plan.ts`, `task/verify-record.ts`, and similar field/doc mutators that do not own lifecycle orchestration. Expected: the behavior targeted by N2.5 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-81NZD4. Expected: scope stays anchored to `task/doc.ts`, `task/plan.ts`, `task/verify-record.ts`, and similar field/doc mutators that do not own lifecycle orchestration plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: backend-type branching no longer appears in these command handlers.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T16:03:27.499Z — VERIFY — ok

By: CODER

Note: Moved plan/doc/verify mutators onto the shared storage bridge so local task-store and backend paths converge on one mutation seam; verified with targeted lint, task command unit suites, parity tests, and agentplane build.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T13:31:23.950Z, excerpt_hash=sha256:c297b15cce195f6e111f98b46dd8af954ae02a5adc41e85346dc9646fdfe3ad0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
