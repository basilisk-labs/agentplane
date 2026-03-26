---
id: "202603251535-DNNMD4"
title: "Introduce TaskDocContract and unify task entity projections"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603251535-DPZ4NN"
tags:
  - "code"
  - "architecture"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-26T15:40:16.685Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-26T17:08:05.094Z"
  updated_by: "CODER"
  note: "Local checks passed after tightening TaskDocContract validation, strict ISO metadata checks, and doc-version section enforcement."
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-03-26T15:57:34.970Z"
    author: "CODER"
    state: "ok"
    note: "Local checks passed: bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build; bunx eslint on touched files; bunx prettier --check on touched files; bunx vitest run packages/core/src/tasks/task-doc.test.ts packages/core/src/tasks/task-readme.test.ts packages/core/src/tasks/task-store.test.ts packages/core/src/tasks/tasks-export.test.ts packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts."
  -
    type: "verify"
    at: "2026-03-26T17:08:05.094Z"
    author: "CODER"
    state: "ok"
    note: "Local checks passed after tightening TaskDocContract validation, strict ISO metadata checks, and doc-version section enforcement."
doc_version: 3
doc_updated_at: "2026-03-26T17:08:05.099Z"
doc_updated_by: "CODER"
description: "Centralize task document versioning, section order, required sections, and projection rules, and reduce duplicate task entity shapes across core and backend projection layers."
sections:
  Summary: |-
    Introduce TaskDocContract and unify task entity projections
    
    Centralize task document versioning, section order, required sections, and projection rules, and reduce duplicate task entity shapes across core and backend projection layers.
  Scope: |-
    - In scope: Centralize task document versioning, section order, required sections, and projection rules, and reduce duplicate task entity shapes across core and backend projection layers.
    - Out of scope: unrelated refactors not required for "Introduce TaskDocContract and unify task entity projections".
  Plan: |-
    1. Introduce one TaskDocContract seam in core that owns doc_version support, section order, required sections, and doc rendering/parsing helpers instead of duplicating those rules across task-readme and backend shared layers.
    2. Reuse that contract from backend shared code and unify the primary task projection type so task read/write, local backend projection, and exported task entities no longer maintain parallel shapes for the same fields.
    3. Add targeted regression coverage for doc-version section projection and backend/core projection parity, then run focused tests plus build checks and record any residual follow-up in Findings.
  Verify Steps: |-
    1. Compare doc-version section handling in core and backend shared code after the refactor. Expected: one contract source defines section order, supported doc versions, and section projection behavior for both layers.
    2. Run targeted task-doc/task-backend tests. Expected: README parsing/rendering, backend record conversion, and exported task projections stay consistent across the same canonical task fields.
    3. Run the smallest relevant package builds. Expected: core and agentplane compile cleanly with the new shared contract and without downstream import breakage.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-26T15:57:34.970Z — VERIFY — ok
    
    By: CODER
    
    Note: Local checks passed: bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build; bunx eslint on touched files; bunx prettier --check on touched files; bunx vitest run packages/core/src/tasks/task-doc.test.ts packages/core/src/tasks/task-readme.test.ts packages/core/src/tasks/task-store.test.ts packages/core/src/tasks/tasks-export.test.ts packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-26T15:40:05.908Z, excerpt_hash=sha256:c42119d1f54ceddb6bf49ebf41665edda61598283de76d6eeeef8d06238aa4ee
    
    ### 2026-03-26T17:08:05.094Z — VERIFY — ok
    
    By: CODER
    
    Note: Local checks passed after tightening TaskDocContract validation, strict ISO metadata checks, and doc-version section enforcement.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-26T15:57:34.982Z, excerpt_hash=sha256:c42119d1f54ceddb6bf49ebf41665edda61598283de76d6eeeef8d06238aa4ee
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Introduce TaskDocContract and unify task entity projections

Centralize task document versioning, section order, required sections, and projection rules, and reduce duplicate task entity shapes across core and backend projection layers.

## Scope

- In scope: Centralize task document versioning, section order, required sections, and projection rules, and reduce duplicate task entity shapes across core and backend projection layers.
- Out of scope: unrelated refactors not required for "Introduce TaskDocContract and unify task entity projections".

## Plan

1. Introduce one TaskDocContract seam in core that owns doc_version support, section order, required sections, and doc rendering/parsing helpers instead of duplicating those rules across task-readme and backend shared layers.
2. Reuse that contract from backend shared code and unify the primary task projection type so task read/write, local backend projection, and exported task entities no longer maintain parallel shapes for the same fields.
3. Add targeted regression coverage for doc-version section projection and backend/core projection parity, then run focused tests plus build checks and record any residual follow-up in Findings.

## Verify Steps

1. Compare doc-version section handling in core and backend shared code after the refactor. Expected: one contract source defines section order, supported doc versions, and section projection behavior for both layers.
2. Run targeted task-doc/task-backend tests. Expected: README parsing/rendering, backend record conversion, and exported task projections stay consistent across the same canonical task fields.
3. Run the smallest relevant package builds. Expected: core and agentplane compile cleanly with the new shared contract and without downstream import breakage.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-26T15:57:34.970Z — VERIFY — ok

By: CODER

Note: Local checks passed: bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build; bunx eslint on touched files; bunx prettier --check on touched files; bunx vitest run packages/core/src/tasks/task-doc.test.ts packages/core/src/tasks/task-readme.test.ts packages/core/src/tasks/task-store.test.ts packages/core/src/tasks/tasks-export.test.ts packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/shared/task-backend.test.ts packages/agentplane/src/backends/task-backend.redmine.test.ts.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-26T15:40:05.908Z, excerpt_hash=sha256:c42119d1f54ceddb6bf49ebf41665edda61598283de76d6eeeef8d06238aa4ee

### 2026-03-26T17:08:05.094Z — VERIFY — ok

By: CODER

Note: Local checks passed after tightening TaskDocContract validation, strict ISO metadata checks, and doc-version section enforcement.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-26T15:57:34.982Z, excerpt_hash=sha256:c42119d1f54ceddb6bf49ebf41665edda61598283de76d6eeeef8d06238aa4ee

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
