---
id: "202603311331-Y8QMNA"
title: "N0.2 Add local-backend vs non-local-backend parity tests for task mutation commands"
result_summary: "integrate: squash task/202603311331-Y8QMNA/backend-mutation-parity-tests"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "backend"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T14:11:09.940Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T14:26:17.880Z"
  updated_by: "CODER"
  note: "Added parity suite for task comment/block/start/set-status/verify/doc set across local-file and non-local backends; verified with bunx eslint packages/agentplane/src/commands/task/mutation-parity.unit.test.ts and bunx vitest run packages/agentplane/src/commands/task/mutation-parity.unit.test.ts."
commit:
  hash: "dd2973b54d1894c55c08de1e2c7ef791ecbf2628"
  message: "📝 Y8QMNA task: add PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: lock parity contracts for representative task mutation commands across local-file and non-local backends before the bridge work in N2 deletes backend-specific branching."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311331-Y8QMNA/pr."
events:
  -
    type: "status"
    at: "2026-03-31T14:11:50.262Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: lock parity contracts for representative task mutation commands across local-file and non-local backends before the bridge work in N2 deletes backend-specific branching."
  -
    type: "verify"
    at: "2026-03-31T14:26:17.880Z"
    author: "CODER"
    state: "ok"
    note: "Added parity suite for task comment/block/start/set-status/verify/doc set across local-file and non-local backends; verified with bunx eslint packages/agentplane/src/commands/task/mutation-parity.unit.test.ts and bunx vitest run packages/agentplane/src/commands/task/mutation-parity.unit.test.ts."
  -
    type: "status"
    at: "2026-03-31T14:29:44.830Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311331-Y8QMNA/pr."
doc_version: 3
doc_updated_at: "2026-03-31T14:29:44.832Z"
doc_updated_by: "INTEGRATOR"
description: "Implement N0.2 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: the same high-level mutation contract is asserted against both storage paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N0.2 Add local-backend vs non-local-backend parity tests for task mutation commands
    
    Implement N0.2 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: the same high-level mutation contract is asserted against both storage paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N0.2 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: the same high-level mutation contract is asserted against both storage paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N0.2 Add local-backend vs non-local-backend parity tests for task mutation commands".
  Plan: |-
    1. Audit `task comment`, `task block`, `task start`, `task set-status`, `task verify-record`, `task doc set` and isolate the narrowest change set that satisfies N0.2.
    2. Implement add local-backend vs non-local-backend parity tests for task mutation commands with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering `task comment`, `task block`, `task start`, `task set-status`, `task verify-record`, `task doc set`. Expected: the behavior targeted by N0.2 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-Y8QMNA. Expected: scope stays anchored to `task comment`, `task block`, `task start`, `task set-status`, `task verify-record`, `task doc set` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: the same high-level mutation contract is asserted against both storage paths.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T14:26:17.880Z — VERIFY — ok
    
    By: CODER
    
    Note: Added parity suite for task comment/block/start/set-status/verify/doc set across local-file and non-local backends; verified with bunx eslint packages/agentplane/src/commands/task/mutation-parity.unit.test.ts and bunx vitest run packages/agentplane/src/commands/task/mutation-parity.unit.test.ts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T14:11:50.263Z, excerpt_hash=sha256:00df574ca41aea42077a2be7176511432f9a97c07f13086e4a02919f404bef09
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N0.2 Add local-backend vs non-local-backend parity tests for task mutation commands

Implement N0.2 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: the same high-level mutation contract is asserted against both storage paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N0.2 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: the same high-level mutation contract is asserted against both storage paths. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N0.2 Add local-backend vs non-local-backend parity tests for task mutation commands".

## Plan

1. Audit `task comment`, `task block`, `task start`, `task set-status`, `task verify-record`, `task doc set` and isolate the narrowest change set that satisfies N0.2.
2. Implement add local-backend vs non-local-backend parity tests for task mutation commands with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering `task comment`, `task block`, `task start`, `task set-status`, `task verify-record`, `task doc set`. Expected: the behavior targeted by N0.2 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-Y8QMNA. Expected: scope stays anchored to `task comment`, `task block`, `task start`, `task set-status`, `task verify-record`, `task doc set` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: the same high-level mutation contract is asserted against both storage paths.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T14:26:17.880Z — VERIFY — ok

By: CODER

Note: Added parity suite for task comment/block/start/set-status/verify/doc set across local-file and non-local backends; verified with bunx eslint packages/agentplane/src/commands/task/mutation-parity.unit.test.ts and bunx vitest run packages/agentplane/src/commands/task/mutation-parity.unit.test.ts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T14:11:50.263Z, excerpt_hash=sha256:00df574ca41aea42077a2be7176511432f9a97c07f13086e4a02919f404bef09

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
