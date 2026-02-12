---
id: "202602120925-PMJ8FT"
title: "P1: central runtime artifact cleanup policy"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on:
  - "202602120925-ZVAM62"
tags:
  - "meta"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-12T10:05:53.017Z"
  updated_by: "CODER"
  note: "Verified: doctor, upgrade cleanup, and init gitignore tests pass; lint and agentplane build pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: unify runtime artifact ignore/cleanup policy across init, doctor, and upgrade to reduce noisy git status in installed repositories."
events:
  -
    type: "status"
    at: "2026-02-12T10:05:23.452Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: unify runtime artifact ignore/cleanup policy across init, doctor, and upgrade to reduce noisy git status in installed repositories."
  -
    type: "verify"
    at: "2026-02-12T10:05:53.017Z"
    author: "CODER"
    state: "ok"
    note: "Verified: doctor, upgrade cleanup, and init gitignore tests pass; lint and agentplane build pass."
doc_version: 2
doc_updated_at: "2026-02-12T10:05:53.018Z"
doc_updated_by: "CODER"
description: "Ensure upgrade/release/cache transient artifacts are cleaned or ignored to avoid noisy statuses."
id_source: "generated"
---
## Summary


## Scope

In-scope: runtime artifact ignore constants, init gitignore writer, doctor --fix gitignore sync, related tests. Out-of-scope: task artifact tracking model changes.

## Plan


## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-12T10:05:53.017Z — VERIFY — ok

By: CODER

Note: Verified: doctor, upgrade cleanup, and init gitignore tests pass; lint and agentplane build pass.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-12T10:05:23.452Z, excerpt_hash=sha256:missing

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert runtime-artifact constant wiring and gitignore behavior changes.
