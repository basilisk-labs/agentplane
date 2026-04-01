---
id: "202603311332-3Z2AQ7"
title: "N5.2 Split `backends/task-backend/local-backend.ts` by read, doc, and write concerns"
result_summary: "integrate: squash task/202603311332-3Z2AQ7/split-local-backend"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202603311331-81NZD4"
  - "202603311332-95GHP9"
tags:
  - "code"
  - "refactor"
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T19:50:42.831Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T20:01:50.063Z"
  updated_by: "CODER"
  note: "Command: bunx eslint packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend/local-backend-state.ts packages/agentplane/src/backends/task-backend/local-backend-read.ts packages/agentplane/src/backends/task-backend/local-backend-doc.ts packages/agentplane/src/backends/task-backend/local-backend-write.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/backends/task-backend.load.test.ts; Result: pass; Evidence: eslint clean. Scope: local backend split. Command: bunx vitest run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/backends/task-backend.load.test.ts; Result: pass; Evidence: 3 files, 57 tests passed. Scope: local backend read/index/doc/write behavior. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: core+agentplane build ok, repo-local runtime ready. Scope: repo-local runtime freshness for verify/commit."
commit:
  hash: "9c575c1d3472485aa42f2f9ca8cec876048ca8f2"
  message: "📝 3Z2AQ7 task: update pr artifacts"
comments:
  -
    author: "CODER"
    body: "Start: split backends/task-backend/local-backend.ts by read/doc/write concern while preserving strict-vs-lenient read behavior, index cache semantics, and doc mutation contracts."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311332-3Z2AQ7/pr."
events:
  -
    type: "status"
    at: "2026-03-31T19:51:25.261Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split backends/task-backend/local-backend.ts by read/doc/write concern while preserving strict-vs-lenient read behavior, index cache semantics, and doc mutation contracts."
  -
    type: "verify"
    at: "2026-03-31T20:01:50.063Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx eslint packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend/local-backend-state.ts packages/agentplane/src/backends/task-backend/local-backend-read.ts packages/agentplane/src/backends/task-backend/local-backend-doc.ts packages/agentplane/src/backends/task-backend/local-backend-write.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/backends/task-backend.load.test.ts; Result: pass; Evidence: eslint clean. Scope: local backend split. Command: bunx vitest run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/backends/task-backend.load.test.ts; Result: pass; Evidence: 3 files, 57 tests passed. Scope: local backend read/index/doc/write behavior. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: core+agentplane build ok, repo-local runtime ready. Scope: repo-local runtime freshness for verify/commit."
  -
    type: "status"
    at: "2026-03-31T20:04:37.850Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202603311332-3Z2AQ7/pr."
doc_version: 3
doc_updated_at: "2026-03-31T20:04:37.855Z"
doc_updated_by: "INTEGRATOR"
description: "Implement N5.2 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: local backend read/index/doc/write responsibilities are separated behind small internal modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N5.2 Split `backends/task-backend/local-backend.ts` by read, doc, and write concerns
    
    Implement N5.2 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: local backend read/index/doc/write responsibilities are separated behind small internal modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N5.2 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: local backend read/index/doc/write responsibilities are separated behind small internal modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N5.2 Split `backends/task-backend/local-backend.ts` by read, doc, and write concerns".
  Plan: |-
    1. Audit the scoped modules named by this refactor item and isolate the narrowest change set that satisfies N5.2.
    2. Implement split `backends/task-backend/local-backend.ts` by read, doc, and write concerns with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering the scoped modules named by this refactor item. Expected: the behavior targeted by N5.2 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-3Z2AQ7. Expected: scope stays anchored to the scoped modules named by this refactor item plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: local backend read/index/doc/write responsibilities are separated behind small internal modules.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T20:01:50.063Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx eslint packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend/local-backend-state.ts packages/agentplane/src/backends/task-backend/local-backend-read.ts packages/agentplane/src/backends/task-backend/local-backend-doc.ts packages/agentplane/src/backends/task-backend/local-backend-write.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/backends/task-backend.load.test.ts; Result: pass; Evidence: eslint clean. Scope: local backend split. Command: bunx vitest run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/backends/task-backend.load.test.ts; Result: pass; Evidence: 3 files, 57 tests passed. Scope: local backend read/index/doc/write behavior. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: core+agentplane build ok, repo-local runtime ready. Scope: repo-local runtime freshness for verify/commit.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T19:51:25.281Z, excerpt_hash=sha256:4e021fd19e00ad1991a697be0b5ff589d97eaf883786e6406e2a17790aaa9aa1
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N5.2 Split `backends/task-backend/local-backend.ts` by read, doc, and write concerns

Implement N5.2 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: local backend read/index/doc/write responsibilities are separated behind small internal modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N5.2 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: local backend read/index/doc/write responsibilities are separated behind small internal modules. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N5.2 Split `backends/task-backend/local-backend.ts` by read, doc, and write concerns".

## Plan

1. Audit the scoped modules named by this refactor item and isolate the narrowest change set that satisfies N5.2.
2. Implement split `backends/task-backend/local-backend.ts` by read, doc, and write concerns with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering the scoped modules named by this refactor item. Expected: the behavior targeted by N5.2 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-3Z2AQ7. Expected: scope stays anchored to the scoped modules named by this refactor item plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: local backend read/index/doc/write responsibilities are separated behind small internal modules.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T20:01:50.063Z — VERIFY — ok

By: CODER

Note: Command: bunx eslint packages/agentplane/src/backends/task-backend/local-backend.ts packages/agentplane/src/backends/task-backend/local-backend-state.ts packages/agentplane/src/backends/task-backend/local-backend-read.ts packages/agentplane/src/backends/task-backend/local-backend-doc.ts packages/agentplane/src/backends/task-backend/local-backend-write.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/backends/task-backend.load.test.ts; Result: pass; Evidence: eslint clean. Scope: local backend split. Command: bunx vitest run packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/commands/shared/task-store.test.ts packages/agentplane/src/backends/task-backend.load.test.ts; Result: pass; Evidence: 3 files, 57 tests passed. Scope: local backend read/index/doc/write behavior. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: core+agentplane build ok, repo-local runtime ready. Scope: repo-local runtime freshness for verify/commit.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T19:51:25.281Z, excerpt_hash=sha256:4e021fd19e00ad1991a697be0b5ff589d97eaf883786e6406e2a17790aaa9aa1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
