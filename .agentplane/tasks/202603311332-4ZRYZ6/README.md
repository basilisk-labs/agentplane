---
id: "202603311332-4ZRYZ6"
title: "N6.3 Prune repeated scenario/release/runner fixtures where the new shared helpers fit"
result_summary: "integrate: squash task/202603311332-4ZRYZ6/prune-shared-fixtures"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603311332-AR77BP"
  - "202603311332-ZRVSA6"
tags:
  - "code"
  - "refactor"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T19:10:38.825Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T19:30:33.888Z"
  updated_by: "CODER"
  note: "Shared fixture helpers now cover scenario install setup, release workspace seeding, and runner executable stubs; eslint, focused vitest, and agentplane build passed in worktree."
commit:
  hash: "60b49a3ca2d628837c8282d7f5c0b16c4701d4d6"
  message: "📝 4ZRYZ6 task: add PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: audit scenario, release, and runner suites; extract the shared fixture/assertion pieces that now fit the N6 helper layer; keep only domain-specific setup local to each suite."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311332-4ZRYZ6/pr."
events:
  -
    type: "status"
    at: "2026-03-31T19:11:16.284Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: audit scenario, release, and runner suites; extract the shared fixture/assertion pieces that now fit the N6 helper layer; keep only domain-specific setup local to each suite."
  -
    type: "verify"
    at: "2026-03-31T19:30:33.888Z"
    author: "CODER"
    state: "ok"
    note: "Shared fixture helpers now cover scenario install setup, release workspace seeding, and runner executable stubs; eslint, focused vitest, and agentplane build passed in worktree."
  -
    type: "status"
    at: "2026-03-31T19:32:07.424Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311332-4ZRYZ6/pr."
doc_version: 3
doc_updated_at: "2026-03-31T19:32:07.428Z"
doc_updated_by: "INTEGRATOR"
description: "Implement N6.3 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: only domain-specific setup remains local to each suite. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N6.3 Prune repeated scenario/release/runner fixtures where the new shared helpers fit
    
    Implement N6.3 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: only domain-specific setup remains local to each suite. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N6.3 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: only domain-specific setup remains local to each suite. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N6.3 Prune repeated scenario/release/runner fixtures where the new shared helpers fit".
  Plan: |-
    1. Audit scenario, release, and runner test helpers and isolate the narrowest change set that satisfies N6.3.
    2. Implement prune repeated scenario/release/runner fixtures where the new shared helpers fit with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering scenario, release, and runner test helpers. Expected: the behavior targeted by N6.3 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-4ZRYZ6. Expected: scope stays anchored to scenario, release, and runner test helpers plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: only domain-specific setup remains local to each suite.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T19:30:33.888Z — VERIFY — ok
    
    By: CODER
    
    Note: Shared fixture helpers now cover scenario install setup, release workspace seeding, and runner executable stubs; eslint, focused vitest, and agentplane build passed in worktree.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T19:11:16.305Z, excerpt_hash=sha256:e2d0866f67dae94d1a668fa5a903c75e2a4be99c1d9040bf6eb9022cbece8659
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N6.3 Prune repeated scenario/release/runner fixtures where the new shared helpers fit

Implement N6.3 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: only domain-specific setup remains local to each suite. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N6.3 from REFACTOR.md. Reduce repeated fixture setup and assertion plumbing in the largest test suites after the new production seams are stable.. Acceptance: only domain-specific setup remains local to each suite. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N6.3 Prune repeated scenario/release/runner fixtures where the new shared helpers fit".

## Plan

1. Audit scenario, release, and runner test helpers and isolate the narrowest change set that satisfies N6.3.
2. Implement prune repeated scenario/release/runner fixtures where the new shared helpers fit with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering scenario, release, and runner test helpers. Expected: the behavior targeted by N6.3 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-4ZRYZ6. Expected: scope stays anchored to scenario, release, and runner test helpers plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: only domain-specific setup remains local to each suite.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T19:30:33.888Z — VERIFY — ok

By: CODER

Note: Shared fixture helpers now cover scenario install setup, release workspace seeding, and runner executable stubs; eslint, focused vitest, and agentplane build passed in worktree.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T19:11:16.305Z, excerpt_hash=sha256:e2d0866f67dae94d1a668fa5a903c75e2a4be99c1d9040bf6eb9022cbece8659

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
