---
id: "202603311332-9MGM0Y"
title: "N5.3 Split `backends/task-backend/redmine-backend.ts` by sync, cache/doc, and reporting concerns"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603311332-5K9CNK"
tags:
  - "code"
  - "refactor"
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-31T20:05:38.392Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T20:20:06.338Z"
  updated_by: "CODER"
  note: "Command: bunx eslint packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend/redmine/backend-report.ts packages/agentplane/src/backends/task-backend/redmine/backend-cache-doc.ts packages/agentplane/src/backends/task-backend/redmine/backend-sync.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/backends/task-backend.load.test.ts; Result: pass; Evidence: eslint clean after split. Scope: redmine backend facade plus extracted sync/cache-doc/report modules. Command: bunx vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/backends/task-backend.load.test.ts; Result: pass; Evidence: 2 files, 54 tests passed. Scope: redmine cache-only reads, offline fallback, monkey-patched wrapper seams, and backend load contract. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: core+agentplane build ok, repo-local runtime ready. Scope: compile/runtime freshness for verify and commit."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split backends/task-backend/redmine-backend.ts into cache/doc, sync/mutation, and reporting modules while preserving the class facade, cache-only projection reads, offline fallback semantics, and private wrapper seams used by tests."
events:
  -
    type: "status"
    at: "2026-03-31T20:06:13.144Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split backends/task-backend/redmine-backend.ts into cache/doc, sync/mutation, and reporting modules while preserving the class facade, cache-only projection reads, offline fallback semantics, and private wrapper seams used by tests."
  -
    type: "verify"
    at: "2026-03-31T20:20:06.338Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx eslint packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend/redmine/backend-report.ts packages/agentplane/src/backends/task-backend/redmine/backend-cache-doc.ts packages/agentplane/src/backends/task-backend/redmine/backend-sync.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/backends/task-backend.load.test.ts; Result: pass; Evidence: eslint clean after split. Scope: redmine backend facade plus extracted sync/cache-doc/report modules. Command: bunx vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/backends/task-backend.load.test.ts; Result: pass; Evidence: 2 files, 54 tests passed. Scope: redmine cache-only reads, offline fallback, monkey-patched wrapper seams, and backend load contract. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: core+agentplane build ok, repo-local runtime ready. Scope: compile/runtime freshness for verify and commit."
doc_version: 3
doc_updated_at: "2026-03-31T20:20:06.342Z"
doc_updated_by: "CODER"
description: "Implement N5.3 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: Redmine-specific sync/report code stops living in one monolithic file. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead."
sections:
  Summary: |-
    N5.3 Split `backends/task-backend/redmine-backend.ts` by sync, cache/doc, and reporting concerns
    
    Implement N5.3 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: Redmine-specific sync/report code stops living in one monolithic file. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
  Scope: |-
    - In scope: Implement N5.3 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: Redmine-specific sync/report code stops living in one monolithic file. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
    - Out of scope: unrelated refactors not required for "N5.3 Split `backends/task-backend/redmine-backend.ts` by sync, cache/doc, and reporting concerns".
  Plan: |-
    1. Audit the scoped modules named by this refactor item and isolate the narrowest change set that satisfies N5.3.
    2. Implement split `backends/task-backend/redmine-backend.ts` by sync, cache/doc, and reporting concerns with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
    3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.
  Verify Steps: |-
    1. Run a focused verification slice covering the scoped modules named by this refactor item. Expected: the behavior targeted by N5.3 is observable and stable after the refactor.
    2. Inspect the final diff for 202603311332-9MGM0Y. Expected: scope stays anchored to the scoped modules named by this refactor item plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: Redmine-specific sync/report code stops living in one monolithic file.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-31T20:20:06.338Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx eslint packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend/redmine/backend-report.ts packages/agentplane/src/backends/task-backend/redmine/backend-cache-doc.ts packages/agentplane/src/backends/task-backend/redmine/backend-sync.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/backends/task-backend.load.test.ts; Result: pass; Evidence: eslint clean after split. Scope: redmine backend facade plus extracted sync/cache-doc/report modules. Command: bunx vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/backends/task-backend.load.test.ts; Result: pass; Evidence: 2 files, 54 tests passed. Scope: redmine cache-only reads, offline fallback, monkey-patched wrapper seams, and backend load contract. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: core+agentplane build ok, repo-local runtime ready. Scope: compile/runtime freshness for verify and commit.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T20:06:13.162Z, excerpt_hash=sha256:7cca23de6c21111350f74164cb1e1404e507c4fb1aab1946595b2c6edf404ced
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

N5.3 Split `backends/task-backend/redmine-backend.ts` by sync, cache/doc, and reporting concerns

Implement N5.3 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: Redmine-specific sync/report code stops living in one monolithic file. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.

## Scope

- In scope: Implement N5.3 from REFACTOR.md. Use the seams created by `N1` through `N4` to split the current oversized runtime modules into narrower units.. Acceptance: Redmine-specific sync/report code stops living in one monolithic file. Under the current optimization-first directive, simplify aggressively, keep the command family working, and allow non-essential compatibility changes when they materially reduce duplication or overhead.
- Out of scope: unrelated refactors not required for "N5.3 Split `backends/task-backend/redmine-backend.ts` by sync, cache/doc, and reporting concerns".

## Plan

1. Audit the scoped modules named by this refactor item and isolate the narrowest change set that satisfies N5.3.
2. Implement split `backends/task-backend/redmine-backend.ts` by sync, cache/doc, and reporting concerns with an optimization-first bias, deleting duplicated paths where possible instead of layering new wrappers.
3. Run focused verification, record the evidence in the task README, and keep any intentional compatibility breaks explicit.

## Verify Steps

1. Run a focused verification slice covering the scoped modules named by this refactor item. Expected: the behavior targeted by N5.3 is observable and stable after the refactor.
2. Inspect the final diff for 202603311332-9MGM0Y. Expected: scope stays anchored to the scoped modules named by this refactor item plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: Redmine-specific sync/report code stops living in one monolithic file.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-31T20:20:06.338Z — VERIFY — ok

By: CODER

Note: Command: bunx eslint packages/agentplane/src/backends/task-backend/redmine-backend.ts packages/agentplane/src/backends/task-backend/redmine/backend-report.ts packages/agentplane/src/backends/task-backend/redmine/backend-cache-doc.ts packages/agentplane/src/backends/task-backend/redmine/backend-sync.ts packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/backends/task-backend.load.test.ts; Result: pass; Evidence: eslint clean after split. Scope: redmine backend facade plus extracted sync/cache-doc/report modules. Command: bunx vitest run packages/agentplane/src/backends/task-backend.redmine.test.ts packages/agentplane/src/backends/task-backend.load.test.ts; Result: pass; Evidence: 2 files, 54 tests passed. Scope: redmine cache-only reads, offline fallback, monkey-patched wrapper seams, and backend load contract. Command: bun run framework:dev:bootstrap; Result: pass; Evidence: core+agentplane build ok, repo-local runtime ready. Scope: compile/runtime freshness for verify and commit.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T20:06:13.162Z, excerpt_hash=sha256:7cca23de6c21111350f74164cb1e1404e507c4fb1aab1946595b2c6edf404ced

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
