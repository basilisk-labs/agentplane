---
id: "202603140953-1VMNZY"
title: "Align task derive and doc version defaults with README v3"
result_summary: "Derived tasks now land on README v3 and missing doc_version falls back to the canonical v3 contract."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
depends_on: []
tags:
  - "code"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T09:54:37.128Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T10:00:01.960Z"
  updated_by: "CODER"
  note: "Verified README v3 derive/doc_version alignment with vitest, TypeScript, and package builds."
commit:
  hash: "f3a1d85839c48d08691dbbcb9401eaf9b8314186"
  message: "✨ 1VMNZY code: align derive and doc_version defaults with README v3"
comments:
  -
    author: "CODER"
    body: "Start: align task derive and shared doc-version defaults with README v3, add regression tests, and keep scope to task-contract drift only."
  -
    author: "CODER"
    body: "Verified: aligned task derive with README v3 scaffolding, raised canonical doc_version defaults to v3, and covered derive/local/redmine regressions."
events:
  -
    type: "status"
    at: "2026-03-14T09:54:45.036Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: align task derive and shared doc-version defaults with README v3, add regression tests, and keep scope to task-contract drift only."
  -
    type: "verify"
    at: "2026-03-14T10:00:01.960Z"
    author: "CODER"
    state: "ok"
    note: "Verified README v3 derive/doc_version alignment with vitest, TypeScript, and package builds."
  -
    type: "status"
    at: "2026-03-14T10:00:33.835Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: aligned task derive with README v3 scaffolding, raised canonical doc_version defaults to v3, and covered derive/local/redmine regressions."
doc_version: 3
doc_updated_at: "2026-03-14T10:00:33.836Z"
doc_updated_by: "CODER"
description: "Fix task derive so derived tasks use README v3 scaffolding, align backend/core doc_version defaults with the canonical v3 contract, and add regression coverage."
sections:
  Summary: |-
    Align task derive and doc version defaults with README v3
    
    Fix task derive so derived tasks use README v3 scaffolding, align backend/core doc_version defaults with the canonical v3 contract, and add regression coverage.
  Scope: |-
    - In scope: Fix task derive so derived tasks use README v3 scaffolding, align backend/core doc_version defaults with the canonical v3 contract, and add regression coverage.
    - Out of scope: unrelated refactors not required for "Align task derive and doc version defaults with README v3".
  Plan: "1. Trace every writer/normalizer that can still create or coerce task docs to doc_version=2, and narrow the change to task creation plus backend/core defaults. 2. Fix task derive and shared doc-version defaults so new or repaired task records land on the README v3 contract without breaking legacy reads. 3. Add regression coverage for derive/local/redmine paths, then run the declared vitest and TypeScript checks."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T10:00:01.960Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified README v3 derive/doc_version alignment with vitest, TypeScript, and package builds.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T09:54:45.037Z, excerpt_hash=sha256:110f13c939d95a7473afe187297846c22219cbe23d8333ad091ee7d309ca2e3d
    
    Details:
    
    Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts\nResult: pass\nEvidence: 3 files passed; 62 tests passed.\nScope: derive/local/redmine regression paths.\n\nCommand: bun x tsc -b packages/core packages/agentplane\nResult: pass\nEvidence: exited 0 without diagnostics.\nScope: typecheck/build coverage for touched packages.\n\nCommand: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build\nResult: pass\nEvidence: both package builds exited 0.\nScope: refreshed framework runtime snapshots for follow-up agentplane lifecycle commands.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Align task derive and doc version defaults with README v3

Fix task derive so derived tasks use README v3 scaffolding, align backend/core doc_version defaults with the canonical v3 contract, and add regression coverage.

## Scope

- In scope: Fix task derive so derived tasks use README v3 scaffolding, align backend/core doc_version defaults with the canonical v3 contract, and add regression coverage.
- Out of scope: unrelated refactors not required for "Align task derive and doc version defaults with README v3".

## Plan

1. Trace every writer/normalizer that can still create or coerce task docs to doc_version=2, and narrow the change to task creation plus backend/core defaults. 2. Fix task derive and shared doc-version defaults so new or repaired task records land on the README v3 contract without breaking legacy reads. 3. Add regression coverage for derive/local/redmine paths, then run the declared vitest and TypeScript checks.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T10:00:01.960Z — VERIFY — ok

By: CODER

Note: Verified README v3 derive/doc_version alignment with vitest, TypeScript, and package builds.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T09:54:45.037Z, excerpt_hash=sha256:110f13c939d95a7473afe187297846c22219cbe23d8333ad091ee7d309ca2e3d

Details:

Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts\nResult: pass\nEvidence: 3 files passed; 62 tests passed.\nScope: derive/local/redmine regression paths.\n\nCommand: bun x tsc -b packages/core packages/agentplane\nResult: pass\nEvidence: exited 0 without diagnostics.\nScope: typecheck/build coverage for touched packages.\n\nCommand: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build\nResult: pass\nEvidence: both package builds exited 0.\nScope: refreshed framework runtime snapshots for follow-up agentplane lifecycle commands.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
