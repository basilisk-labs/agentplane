---
id: "202603311331-SZBKHW"
title: "N3.4 Converge comment-commit integration around the shared executor"
result_summary: "integrate: squash task/202603311331-SZBKHW/converge-comment-commit-integration"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202603311331-CMRND8"
  - "202603311331-NERBXG"
tags:
  - "code"
  - "refactor"
  - "workflow"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T16:41:00.452Z"
  updated_by: "CODER"
  note: "Focused lifecycle comment-commit suites passed: eslint, build, task unit suites, run-cli lifecycle and block-finish contracts."
commit:
  hash: "7f127bc2f4387dbea60f84dcef342d1657529ec9"
  message: "🧩 SZBKHW integrate: squash task/202603311331-SZBKHW/converge-comment-commit-integration"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311331-SZBKHW/pr."
events:
  -
    type: "verify"
    at: "2026-03-31T16:41:00.452Z"
    author: "CODER"
    state: "ok"
    note: "Focused lifecycle comment-commit suites passed: eslint, build, task unit suites, run-cli lifecycle and block-finish contracts."
  -
    type: "status"
    at: "2026-03-31T16:44:18.372Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311331-SZBKHW/pr."
doc_version: 3
doc_updated_at: "2026-03-31T16:44:18.374Z"
doc_updated_by: "INTEGRATOR"
description: "Implement N3.4 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: comment-commit policy is wired once and reused by all transition commands that need it. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N3.4 Converge comment-commit integration around the shared executor
    
    Implement N3.4 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: comment-commit policy is wired once and reused by all transition commands that need it. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N3.4 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: comment-commit policy is wired once and reused by all transition commands that need it. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N3.4 Converge comment-commit integration around the shared executor".
  Plan: |-
    1. Audit status-commit warnings, commit metadata preparation, structured comment handling and isolate the narrowest change set that satisfies N3.4.
    2. Implement converge comment-commit integration around the shared executor with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering status-commit warnings, commit metadata preparation, structured comment handling. Expected: the behavior targeted by N3.4 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-SZBKHW. Expected: scope stays anchored to status-commit warnings, commit metadata preparation, structured comment handling plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: comment-commit policy is wired once and reused by all transition commands that need it.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T16:41:00.452Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused lifecycle comment-commit suites passed: eslint, build, task unit suites, run-cli lifecycle and block-finish contracts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T13:31:27.631Z, excerpt_hash=sha256:1a4af0ecbaa985f9b853c9e7bac493f209f50e08eb27a7e8f858bf36a2859145
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N3.4 Converge comment-commit integration around the shared executor

Implement N3.4 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: comment-commit policy is wired once and reused by all transition commands that need it. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N3.4 from REFACTOR.md. Collapse the repeated orchestration around task status transitions into one shared transition executor.. Acceptance: comment-commit policy is wired once and reused by all transition commands that need it. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N3.4 Converge comment-commit integration around the shared executor".

## Plan

1. Audit status-commit warnings, commit metadata preparation, structured comment handling and isolate the narrowest change set that satisfies N3.4.
2. Implement converge comment-commit integration around the shared executor with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering status-commit warnings, commit metadata preparation, structured comment handling. Expected: the behavior targeted by N3.4 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-SZBKHW. Expected: scope stays anchored to status-commit warnings, commit metadata preparation, structured comment handling plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: comment-commit policy is wired once and reused by all transition commands that need it.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T16:41:00.452Z — VERIFY — ok

By: CODER

Note: Focused lifecycle comment-commit suites passed: eslint, build, task unit suites, run-cli lifecycle and block-finish contracts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T13:31:27.631Z, excerpt_hash=sha256:1a4af0ecbaa985f9b853c9e7bac493f209f50e08eb27a7e8f858bf36a2859145

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
