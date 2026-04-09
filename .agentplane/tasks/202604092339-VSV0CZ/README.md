---
id: "202604092339-VSV0CZ"
title: "Make finish closeout idempotent after partial DONE retries"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T23:40:21.939Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T23:54:20.202Z"
  updated_by: "CODER"
  note: "Verified: targeted finish retry unit tests and eslint passed for idempotent DONE closeout handling."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: make finish retries idempotent after partial DONE closeout failures so operators can recreate the close commit without duplicating lifecycle metadata."
events:
  -
    type: "status"
    at: "2026-04-09T23:40:22.406Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make finish retries idempotent after partial DONE closeout failures so operators can recreate the close commit without duplicating lifecycle metadata."
  -
    type: "verify"
    at: "2026-04-09T23:54:20.202Z"
    author: "CODER"
    state: "ok"
    note: "Verified: targeted finish retry unit tests and eslint passed for idempotent DONE closeout handling."
doc_version: 3
doc_updated_at: "2026-04-09T23:54:20.204Z"
doc_updated_by: "CODER"
description: "If finish reaches DONE state before the deterministic close commit fails, rerunning finish for the same task/result should not append duplicate DONE comments or duplicate status events before recreating the close commit."
sections:
  Summary: |-
    Make finish closeout idempotent after partial DONE retries
    
    If finish reaches DONE state before the deterministic close commit fails, rerunning finish for the same task/result should not append duplicate DONE comments or duplicate status events before recreating the close commit.
  Scope: |-
    - In scope: If finish reaches DONE state before the deterministic close commit fails, rerunning finish for the same task/result should not append duplicate DONE comments or duplicate status events before recreating the close commit.
    - Out of scope: unrelated refactors not required for "Make finish closeout idempotent after partial DONE retries".
  Plan: "1. Reproduce a finish path that marks the task DONE before deterministic close commit creation fails. 2. Make rerun finish for the same result/body idempotent so it can recreate the close commit without duplicating DONE comments or duplicate status events. 3. Add regression coverage for partial closeout retries."
  Verify Steps: |-
    1. Simulate a finish path where task status flips to DONE but close commit creation fails. Expected: the task metadata reflects a single DONE transition.
    2. Rerun finish --force for the same task/result after clearing the blocking condition. Expected: the close commit is created without duplicate DONE comments or duplicate status events.
    3. Run targeted regression tests. Expected: retrying closeout is idempotent while distinct finish inputs still append the expected new metadata.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T23:54:20.202Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: targeted finish retry unit tests and eslint passed for idempotent DONE closeout handling.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:40:22.412Z, excerpt_hash=sha256:df6edb527f13862f5b18ad938f4fd4b5af58f55799851e70ee102f3693cdda1d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make finish closeout idempotent after partial DONE retries

If finish reaches DONE state before the deterministic close commit fails, rerunning finish for the same task/result should not append duplicate DONE comments or duplicate status events before recreating the close commit.

## Scope

- In scope: If finish reaches DONE state before the deterministic close commit fails, rerunning finish for the same task/result should not append duplicate DONE comments or duplicate status events before recreating the close commit.
- Out of scope: unrelated refactors not required for "Make finish closeout idempotent after partial DONE retries".

## Plan

1. Reproduce a finish path that marks the task DONE before deterministic close commit creation fails. 2. Make rerun finish for the same result/body idempotent so it can recreate the close commit without duplicating DONE comments or duplicate status events. 3. Add regression coverage for partial closeout retries.

## Verify Steps

1. Simulate a finish path where task status flips to DONE but close commit creation fails. Expected: the task metadata reflects a single DONE transition.
2. Rerun finish --force for the same task/result after clearing the blocking condition. Expected: the close commit is created without duplicate DONE comments or duplicate status events.
3. Run targeted regression tests. Expected: retrying closeout is idempotent while distinct finish inputs still append the expected new metadata.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T23:54:20.202Z — VERIFY — ok

By: CODER

Note: Verified: targeted finish retry unit tests and eslint passed for idempotent DONE closeout handling.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:40:22.412Z, excerpt_hash=sha256:df6edb527f13862f5b18ad938f4fd4b5af58f55799851e70ee102f3693cdda1d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
