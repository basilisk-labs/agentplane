---
id: "202604171502-KYS9TX"
title: "Re-baseline schema validation strategy after generated AJV migration"
result_summary: "Merged via PR #408."
status: "DONE"
priority: "med"
owner: "PLANNER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "code"
  - "schemas"
verify:
  - "bun run schemas:check"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T18:54:31.471Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T18:57:02.363Z"
  updated_by: "PLANNER"
  note: "Audited the remaining schema boundary drift, documented the chosen core-first validation architecture, and corrected developer docs that still described packages/spec as the canonical schema authority; verified schemas:check and typecheck."
commit:
  hash: "5f9e054d2ea83f8bf77715b9faf77853ce128c02"
  message: "architecture/schemas: Re-baseline schema validation strategy after generated AJV migration (KYS9TX) (#408)"
comments:
  -
    author: "PLANNER"
    body: "Start: audit remaining AJV/manual schema drift, select the target validation architecture, and record the migration baseline before any larger rewrite."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #408 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-17T18:54:50.939Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: audit remaining AJV/manual schema drift, select the target validation architecture, and record the migration baseline before any larger rewrite."
  -
    type: "verify"
    at: "2026-04-17T18:57:02.363Z"
    author: "PLANNER"
    state: "ok"
    note: "Audited the remaining schema boundary drift, documented the chosen core-first validation architecture, and corrected developer docs that still described packages/spec as the canonical schema authority; verified schemas:check and typecheck."
  -
    type: "status"
    at: "2026-04-17T19:01:30.316Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #408 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-17T19:01:30.322Z"
doc_updated_by: "INTEGRATOR"
description: "Audit the remaining AJV plus manual type drift, decide the target validation architecture, and capture the approved migration path in repository docs before any large schema rewrite."
sections:
  Summary: |-
    Re-baseline schema validation strategy after generated AJV migration
    
    Audit the remaining AJV plus manual type drift, decide the target validation architecture, and capture the approved migration path in repository docs before any large schema rewrite.
  Scope: |-
    - In scope: Audit the remaining AJV plus manual type drift, decide the target validation architecture, and capture the approved migration path in repository docs before any large schema rewrite.
    - Out of scope: unrelated refactors not required for "Re-baseline schema validation strategy after generated AJV migration".
  Plan: |-
    1. Audit the current generated schema flow, remaining AJV usage, and the exact sources of manual type drift.
    2. Compare at least two viable target architectures and select the one with the lowest long-term maintenance cost for this repository.
    3. Record the approved migration path in repository docs and verify schemas:check plus typecheck still pass.
  Verify Steps: |-
    1. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T18:57:02.363Z — VERIFY — ok
    
    By: PLANNER
    
    Note: Audited the remaining schema boundary drift, documented the chosen core-first validation architecture, and corrected developer docs that still described packages/spec as the canonical schema authority; verified schemas:check and typecheck.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T18:54:50.961Z, excerpt_hash=sha256:98e1bb12247b819a8d47c1a20d4b9fa34d0e7b2b11dad687b2c2c070a9d69d01
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Re-baseline schema validation strategy after generated AJV migration

Audit the remaining AJV plus manual type drift, decide the target validation architecture, and capture the approved migration path in repository docs before any large schema rewrite.

## Scope

- In scope: Audit the remaining AJV plus manual type drift, decide the target validation architecture, and capture the approved migration path in repository docs before any large schema rewrite.
- Out of scope: unrelated refactors not required for "Re-baseline schema validation strategy after generated AJV migration".

## Plan

1. Audit the current generated schema flow, remaining AJV usage, and the exact sources of manual type drift.
2. Compare at least two viable target architectures and select the one with the lowest long-term maintenance cost for this repository.
3. Record the approved migration path in repository docs and verify schemas:check plus typecheck still pass.

## Verify Steps

1. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T18:57:02.363Z — VERIFY — ok

By: PLANNER

Note: Audited the remaining schema boundary drift, documented the chosen core-first validation architecture, and corrected developer docs that still described packages/spec as the canonical schema authority; verified schemas:check and typecheck.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T18:54:50.961Z, excerpt_hash=sha256:98e1bb12247b819a8d47c1a20d4b9fa34d0e7b2b11dad687b2c2c070a9d69d01

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
