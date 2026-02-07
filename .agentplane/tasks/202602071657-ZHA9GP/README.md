---
id: "202602071657-ZHA9GP"
title: "Spec: Verify Steps vs Verification semantics"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "docs"
  - "spec"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T16:59:08.376Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T17:00:48.250Z"
  updated_by: "ORCHESTRATOR"
  note: "Documented Verify Steps (ex-ante) vs Verification (ex-post) semantics; bun run test:fast."
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: define canonical semantics for Verify Steps vs Verification and align user docs accordingly."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T17:00:48.251Z"
doc_updated_by: "ORCHESTRATOR"
description: "Define canonical README semantics: Verify Steps = ex-ante contract; Verification = append-only ex-post log."
---
## Summary


## Scope


## Plan

1) Add canonical documentation: Verify Steps = ex-ante contract; Verification = append-only ex-post log.
2) Update user docs where verification is described (task lifecycle + tasks storage) with this semantics.
3) Verify docs build is not required; run repo fast tests for safety.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T17:00:48.250Z — VERIFY — ok

By: ORCHESTRATOR

Note: Documented Verify Steps (ex-ante) vs Verification (ex-post) semantics; bun run test:fast.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan
