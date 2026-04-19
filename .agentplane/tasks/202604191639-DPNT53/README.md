---
id: "202604191639-DPNT53"
title: "Introduce reusable repository and backend fixtures in testkit"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "testkit"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T17:32:54.808Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T17:38:50.280Z"
  updated_by: "CODER"
  note: "Added reusable testkit repo/config/PR fixtures and migrated an initial consumer batch."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: audit duplicated temp repo and backend fixture patterns, add shared testkit fixtures, and migrate an initial high-duplication batch of tests."
events:
  -
    type: "status"
    at: "2026-04-19T17:33:32.555Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: audit duplicated temp repo and backend fixture patterns, add shared testkit fixtures, and migrate an initial high-duplication batch of tests."
  -
    type: "verify"
    at: "2026-04-19T17:38:50.280Z"
    author: "CODER"
    state: "ok"
    note: "Added reusable testkit repo/config/PR fixtures and migrated an initial consumer batch."
doc_version: 3
doc_updated_at: "2026-04-19T17:38:50.286Z"
doc_updated_by: "CODER"
description: "Epic E′. Add shared tempRepo, mockTaskBackend, mockPrApi, and mockConfig fixtures in @agentplane/testkit and replace duplicated local helpers."
sections:
  Summary: |-
    Introduce reusable repository and backend fixtures in testkit
    
    Epic E′. Add shared tempRepo, mockTaskBackend, mockPrApi, and mockConfig fixtures in @agentplane/testkit and replace duplicated local helpers.
  Scope: |-
    - In scope: Epic E′. Add shared tempRepo, mockTaskBackend, mockPrApi, and mockConfig fixtures in @agentplane/testkit and replace duplicated local helpers.
    - Out of scope: unrelated refactors not required for "Introduce reusable repository and backend fixtures in testkit".
  Plan: "1. Audit duplicated temp repo and backend/pr-api fixture patterns across recipes, task, release, and runner tests to identify the minimum reusable surface. 2. Add typed tempRepo, mockTaskBackend, mockPrApi, and mockConfig fixtures under packages/testkit/src with cleanup semantics and stable exports. 3. Repoint an initial batch of high-duplication tests to the shared fixtures, preserving existing expectations. 4. Run focused testkit and consumer test suites, record evidence, and finish with task-scoped commits."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T17:38:50.280Z — VERIFY — ok
    
    By: CODER
    
    Note: Added reusable testkit repo/config/PR fixtures and migrated an initial consumer batch.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T17:33:32.567Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Introduced tempRepo, mockConfig, mockTaskBackend, and fake GH PR helpers in @agentplane/testkit; extended the agentplane testing compatibility layer; task-backend and targeted pr-flow PR consumers now use the shared fixtures and pass.
      Impact: Test-only setup code is now centralized in testkit instead of being redefined inside large consumer files, reducing repeated mkdtemp/git/gh fake setup and giving later E′ fixture migrations a stable API.
      Resolution: Added shared fixture modules, exported them through testkit and the compatibility layer, then validated the new surface with testkit build plus focused task-backend and pr-flow PR tests.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Introduce reusable repository and backend fixtures in testkit

Epic E′. Add shared tempRepo, mockTaskBackend, mockPrApi, and mockConfig fixtures in @agentplane/testkit and replace duplicated local helpers.

## Scope

- In scope: Epic E′. Add shared tempRepo, mockTaskBackend, mockPrApi, and mockConfig fixtures in @agentplane/testkit and replace duplicated local helpers.
- Out of scope: unrelated refactors not required for "Introduce reusable repository and backend fixtures in testkit".

## Plan

1. Audit duplicated temp repo and backend/pr-api fixture patterns across recipes, task, release, and runner tests to identify the minimum reusable surface. 2. Add typed tempRepo, mockTaskBackend, mockPrApi, and mockConfig fixtures under packages/testkit/src with cleanup semantics and stable exports. 3. Repoint an initial batch of high-duplication tests to the shared fixtures, preserving existing expectations. 4. Run focused testkit and consumer test suites, record evidence, and finish with task-scoped commits.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T17:38:50.280Z — VERIFY — ok

By: CODER

Note: Added reusable testkit repo/config/PR fixtures and migrated an initial consumer batch.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T17:33:32.567Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Introduced tempRepo, mockConfig, mockTaskBackend, and fake GH PR helpers in @agentplane/testkit; extended the agentplane testing compatibility layer; task-backend and targeted pr-flow PR consumers now use the shared fixtures and pass.
  Impact: Test-only setup code is now centralized in testkit instead of being redefined inside large consumer files, reducing repeated mkdtemp/git/gh fake setup and giving later E′ fixture migrations a stable API.
  Resolution: Added shared fixture modules, exported them through testkit and the compatibility layer, then validated the new surface with testkit build plus focused task-backend and pr-flow PR tests.
  Promotion: incident-candidate
  Fixability: external
