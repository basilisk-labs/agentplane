---
id: "202603311331-QDTKY4"
title: "N0.3 Add task README/doc mutation concurrency tests"
result_summary: "integrate: squash task/202603311331-QDTKY4/task-doc-concurrency-tests"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
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
  updated_at: "2026-03-31T14:49:04.333Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T14:50:58.026Z"
  updated_by: "CODER"
  note: "Expanded doc-concurrency safety net with command-level full-doc/section conflict coverage plus intent-path local-store tests; verified with bunx eslint packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts and bunx vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts."
commit:
  hash: "827968153e367336e35efb8543e70ae5c866b206"
  message: "📝 QDTKY4 task: add PR artifacts"
comments:
  -
    author: "CODER"
    body: "Start: lock README section/full-doc conflict semantics before the shared doc mutation contract in N4 rewires local backend and task-store patching."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311331-QDTKY4/pr."
events:
  -
    type: "status"
    at: "2026-03-31T14:49:04.904Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: lock README section/full-doc conflict semantics before the shared doc mutation contract in N4 rewires local backend and task-store patching."
  -
    type: "verify"
    at: "2026-03-31T14:49:11.011Z"
    author: "CODER"
    state: "ok"
    note: "Added command-level and intent-path concurrency tests for section and full-doc conflicts; verified with bunx eslint packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts and bunx vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts."
  -
    type: "verify"
    at: "2026-03-31T14:50:58.026Z"
    author: "CODER"
    state: "ok"
    note: "Expanded doc-concurrency safety net with command-level full-doc/section conflict coverage plus intent-path local-store tests; verified with bunx eslint packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts and bunx vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts."
  -
    type: "status"
    at: "2026-03-31T14:53:09.253Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311331-QDTKY4/pr."
doc_version: 3
doc_updated_at: "2026-03-31T14:53:09.255Z"
doc_updated_by: "INTEGRATOR"
description: "Implement N0.3 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: doc conflicts and section conflicts are behavior-locked before `N4` starts deleting code. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N0.3 Add task README/doc mutation concurrency tests
    
    Implement N0.3 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: doc conflicts and section conflicts are behavior-locked before `N4` starts deleting code. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N0.3 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: doc conflicts and section conflicts are behavior-locked before `N4` starts deleting code. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N0.3 Add task README/doc mutation concurrency tests".
  Plan: |-
    1. Audit section updates, full-doc replacement, expected-current conflict handling and isolate the narrowest change set that satisfies N0.3.
    2. Implement add task readme/doc mutation concurrency tests with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering section updates, full-doc replacement, expected-current conflict handling. Expected: the behavior targeted by N0.3 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311331-QDTKY4. Expected: scope stays anchored to section updates, full-doc replacement, expected-current conflict handling plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: doc conflicts and section conflicts are behavior-locked before `N4` starts deleting code.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T14:49:11.011Z — VERIFY — ok
    
    By: CODER
    
    Note: Added command-level and intent-path concurrency tests for section and full-doc conflicts; verified with bunx eslint packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts and bunx vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T14:49:04.905Z, excerpt_hash=sha256:1696398b7dba31bc74a9f522f847254893e2fbbdeab3ab3dc0be0bde74b39887
    
    ### 2026-03-31T14:50:58.026Z — VERIFY — ok
    
    By: CODER
    
    Note: Expanded doc-concurrency safety net with command-level full-doc/section conflict coverage plus intent-path local-store tests; verified with bunx eslint packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts and bunx vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T14:49:11.013Z, excerpt_hash=sha256:1696398b7dba31bc74a9f522f847254893e2fbbdeab3ab3dc0be0bde74b39887
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N0.3 Add task README/doc mutation concurrency tests

Implement N0.3 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: doc conflicts and section conflicts are behavior-locked before `N4` starts deleting code. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N0.3 from REFACTOR.md. Lock the behavior that the next refactor wave is most likely to disturb: output formatting, local-vs-remote task mutation parity, and task-doc mutation semantics.. Acceptance: doc conflicts and section conflicts are behavior-locked before `N4` starts deleting code. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N0.3 Add task README/doc mutation concurrency tests".

## Plan

1. Audit section updates, full-doc replacement, expected-current conflict handling and isolate the narrowest change set that satisfies N0.3.
2. Implement add task readme/doc mutation concurrency tests with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering section updates, full-doc replacement, expected-current conflict handling. Expected: the behavior targeted by N0.3 is observable and stable after the refactor.
2. Inspect the final diff for 202603311331-QDTKY4. Expected: scope stays anchored to section updates, full-doc replacement, expected-current conflict handling plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: doc conflicts and section conflicts are behavior-locked before `N4` starts deleting code.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T14:49:11.011Z — VERIFY — ok

By: CODER

Note: Added command-level and intent-path concurrency tests for section and full-doc conflicts; verified with bunx eslint packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts and bunx vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T14:49:04.905Z, excerpt_hash=sha256:1696398b7dba31bc74a9f522f847254893e2fbbdeab3ab3dc0be0bde74b39887

### 2026-03-31T14:50:58.026Z — VERIFY — ok

By: CODER

Note: Expanded doc-concurrency safety net with command-level full-doc/section conflict coverage plus intent-path local-store tests; verified with bunx eslint packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts and bunx vitest run packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T14:49:11.013Z, excerpt_hash=sha256:1696398b7dba31bc74a9f522f847254893e2fbbdeab3ab3dc0be0bde74b39887

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
