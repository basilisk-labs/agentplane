---
id: "202603311332-EFWRER"
title: "N6.4 Delete obsolete bespoke helpers after migration"
result_summary: "integrate: squash task/202603311332-EFWRER/delete-bespoke-helpers"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603311332-AR77BP"
  - "202603311332-ZRVSA6"
  - "202603311332-4ZRYZ6"
tags:
  - "code"
  - "refactor"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T19:33:44.142Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T19:39:20.588Z"
  updated_by: "CODER"
  note: "Deleted obsolete backends/task-backend.test-helpers.ts, moved backend suites onto shared mkTempDir/silenceStdIO helpers, and removed remaining runner wrapper-builders; eslint plus focused backend/runner vitest passed (130 tests)."
commit:
  hash: "264735a956b29f595d0050316cdabd11827d768a"
  message: "📝 EFWRER task: add PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: delete obsolete bespoke test helpers now that shared backend, CLI, scenario, release, and runner helpers have landed; keep all relevant suites green."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311332-EFWRER/pr."
events:
  -
    type: "status"
    at: "2026-03-31T19:34:19.142Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: delete obsolete bespoke test helpers now that shared backend, CLI, scenario, release, and runner helpers have landed; keep all relevant suites green."
  -
    type: "verify"
    at: "2026-03-31T19:39:20.588Z"
    author: "CODER"
    state: "ok"
    note: "Deleted obsolete backends/task-backend.test-helpers.ts, moved backend suites onto shared mkTempDir/silenceStdIO helpers, and removed remaining runner wrapper-builders; eslint plus focused backend/runner vitest passed (130 tests)."
  -
    type: "status"
    at: "2026-03-31T19:40:36.881Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311332-EFWRER/pr."
doc_version: 3
doc_updated_at: "2026-03-31T19:40:36.886Z"
doc_updated_by: "INTEGRATOR"
description: "Implement N6.4 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: the new shared testkit replaces the superseded helpers cleanly. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N6.4 Delete obsolete bespoke helpers after migration
    
    Implement N6.4 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: the new shared testkit replaces the superseded helpers cleanly. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N6.4 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: the new shared testkit replaces the superseded helpers cleanly. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N6.4 Delete obsolete bespoke helpers after migration".
  Plan: |-
    1. Audit old test-only helper modules and local duplicate builders and isolate the narrowest change set that satisfies N6.4.
    2. Implement delete obsolete bespoke helpers after migration with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering old test-only helper modules and local duplicate builders. Expected: the behavior targeted by N6.4 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-EFWRER. Expected: scope stays anchored to old test-only helper modules and local duplicate builders plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: the new shared testkit replaces the superseded helpers cleanly.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T19:39:20.588Z — VERIFY — ok
    
    By: CODER
    
    Note: Deleted obsolete backends/task-backend.test-helpers.ts, moved backend suites onto shared mkTempDir/silenceStdIO helpers, and removed remaining runner wrapper-builders; eslint plus focused backend/runner vitest passed (130 tests).
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T19:34:19.164Z, excerpt_hash=sha256:355660da8105c15e9ffa0989afcb867bfdbd3a955621b80c8b8fb0ad2fe0d282
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N6.4 Delete obsolete bespoke helpers after migration

Implement N6.4 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: the new shared testkit replaces the superseded helpers cleanly. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N6.4 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: the new shared testkit replaces the superseded helpers cleanly. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N6.4 Delete obsolete bespoke helpers after migration".

## Plan

1. Audit old test-only helper modules and local duplicate builders and isolate the narrowest change set that satisfies N6.4.
2. Implement delete obsolete bespoke helpers after migration with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering old test-only helper modules and local duplicate builders. Expected: the behavior targeted by N6.4 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-EFWRER. Expected: scope stays anchored to old test-only helper modules and local duplicate builders plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: the new shared testkit replaces the superseded helpers cleanly.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T19:39:20.588Z — VERIFY — ok

By: CODER

Note: Deleted obsolete backends/task-backend.test-helpers.ts, moved backend suites onto shared mkTempDir/silenceStdIO helpers, and removed remaining runner wrapper-builders; eslint plus focused backend/runner vitest passed (130 tests).

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T19:34:19.164Z, excerpt_hash=sha256:355660da8105c15e9ffa0989afcb867bfdbd3a955621b80c8b8fb0ad2fe0d282

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
