---
id: "202603251539-YTQX10"
title: "Consolidate CI, freshness, and sync tooling into shared generators"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202603251539-1WNAZX"
tags:
  - "code"
  - "architecture"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-27T18:32:56.147Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-27T18:41:28.926Z"
  updated_by: "CODER"
  note: "Consolidated generated-artifact freshness scripts onto shared helpers, consolidated sync scripts onto shared directory/schema helpers, and collapsed run-local-ci baseline step duplication. Verified with docs freshness scripts, sync checks, local-ci selection tests, prettier, eslint, and agentplane build."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extracting shared freshness and sync harnesses for generated artifacts and local CI orchestration without changing task routing semantics or broadening the refactor surface."
events:
  -
    type: "status"
    at: "2026-03-27T18:33:06.163Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extracting shared freshness and sync harnesses for generated artifacts and local CI orchestration without changing task routing semantics or broadening the refactor surface."
  -
    type: "verify"
    at: "2026-03-27T18:41:28.926Z"
    author: "CODER"
    state: "ok"
    note: "Consolidated generated-artifact freshness scripts onto shared helpers, consolidated sync scripts onto shared directory/schema helpers, and collapsed run-local-ci baseline step duplication. Verified with docs freshness scripts, sync checks, local-ci selection tests, prettier, eslint, and agentplane build."
doc_version: 3
doc_updated_at: "2026-03-27T18:41:28.940Z"
doc_updated_by: "CODER"
description: "Replace duplicated CI orchestration, freshness checks, and mirror-sync scripts with declarative shared helpers so generated docs, inventories, schemas, and local CI pipelines derive from one reusable control model."
sections:
  Summary: |-
    Consolidate CI, freshness, and sync tooling into shared generators
    
    Replace duplicated CI orchestration, freshness checks, and mirror-sync scripts with declarative shared helpers so generated docs, inventories, schemas, and local CI pipelines derive from one reusable control model.
  Scope: |-
    - In scope: Replace duplicated CI orchestration, freshness checks, and mirror-sync scripts with declarative shared helpers so generated docs, inventories, schemas, and local CI pipelines derive from one reusable control model.
    - Out of scope: unrelated refactors not required for "Consolidate CI, freshness, and sync tooling into shared generators".
  Plan: |-
    1. Extract a shared freshness harness that generates and checks CLI/reference/bootstrap/inventory artifacts from one declarative definition instead of per-script bespoke runners.
    2. Extract a shared sync harness for mirror/schema/agent-template style scripts, then rewire local CI selection to compose the shared freshness and sync steps rather than duplicating step lists.
    3. Run focused freshness/sync/local-CI regressions and minimal script checks, then record any remaining workflow-specific exceptions explicitly in Findings.
  Verify Steps: |-
    1. Run the focused freshness and sync script checks. Expected: the shared helper paths report no drift and no script loses its existing contract.
    2. Run targeted local-CI selection or harness regressions for the touched orchestration paths. Expected: fast-path selection still chooses the correct step set without widening scope.
    3. Run the smallest relevant builds/format/lint pass for touched script and CLI surfaces. Expected: the refactor stays task-scoped and leaves no generated artifact drift behind.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-27T18:41:28.926Z — VERIFY — ok
    
    By: CODER
    
    Note: Consolidated generated-artifact freshness scripts onto shared helpers, consolidated sync scripts onto shared directory/schema helpers, and collapsed run-local-ci baseline step duplication. Verified with docs freshness scripts, sync checks, local-ci selection tests, prettier, eslint, and agentplane build.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T18:33:06.164Z, excerpt_hash=sha256:d114982638abb53e1d72fd2ab6d6d80f547b6c99c58e5211f1d3835710e192f9
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Consolidate CI, freshness, and sync tooling into shared generators

Replace duplicated CI orchestration, freshness checks, and mirror-sync scripts with declarative shared helpers so generated docs, inventories, schemas, and local CI pipelines derive from one reusable control model.

## Scope

- In scope: Replace duplicated CI orchestration, freshness checks, and mirror-sync scripts with declarative shared helpers so generated docs, inventories, schemas, and local CI pipelines derive from one reusable control model.
- Out of scope: unrelated refactors not required for "Consolidate CI, freshness, and sync tooling into shared generators".

## Plan

1. Extract a shared freshness harness that generates and checks CLI/reference/bootstrap/inventory artifacts from one declarative definition instead of per-script bespoke runners.
2. Extract a shared sync harness for mirror/schema/agent-template style scripts, then rewire local CI selection to compose the shared freshness and sync steps rather than duplicating step lists.
3. Run focused freshness/sync/local-CI regressions and minimal script checks, then record any remaining workflow-specific exceptions explicitly in Findings.

## Verify Steps

1. Run the focused freshness and sync script checks. Expected: the shared helper paths report no drift and no script loses its existing contract.
2. Run targeted local-CI selection or harness regressions for the touched orchestration paths. Expected: fast-path selection still chooses the correct step set without widening scope.
3. Run the smallest relevant builds/format/lint pass for touched script and CLI surfaces. Expected: the refactor stays task-scoped and leaves no generated artifact drift behind.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-27T18:41:28.926Z — VERIFY — ok

By: CODER

Note: Consolidated generated-artifact freshness scripts onto shared helpers, consolidated sync scripts onto shared directory/schema helpers, and collapsed run-local-ci baseline step duplication. Verified with docs freshness scripts, sync checks, local-ci selection tests, prettier, eslint, and agentplane build.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-27T18:33:06.164Z, excerpt_hash=sha256:d114982638abb53e1d72fd2ab6d6d80f547b6c99c58e5211f1d3835710e192f9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
