---
id: "202603071647-M0Q79C"
title: "Detect framework checkout and prefer repo-local agentplane"
result_summary: "The wrapper now has a reusable framework-checkout context helper that resolves the nearest repo root and repo-local binary without changing runtime behavior yet."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T16:47:51.739Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: extract framework-checkout detection and repo-local binary resolution first."
verification:
  state: "ok"
  updated_at: "2026-03-07T16:50:36.279Z"
  updated_by: "REVIEWER"
  note: "Verified: framework checkout detection now resolves the nearest repo root and local binary from nested cwd with focused regression coverage."
commit:
  hash: "093183c001bee1489ed981203e1af703be3f6c51"
  message: "🧭 M0Q79C task: detect framework checkout context"
comments:
  -
    author: "CODER"
    body: "Start: extract a reusable framework-checkout detector and repo-local binary resolver before wiring runtime handoff into the wrapper."
  -
    author: "CODER"
    body: "Verified: extracted framework-checkout detection and repo-local binary resolution with focused nested-cwd tests."
events:
  -
    type: "status"
    at: "2026-03-07T16:47:51.853Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract a reusable framework-checkout detector and repo-local binary resolver before wiring runtime handoff into the wrapper."
  -
    type: "verify"
    at: "2026-03-07T16:50:36.279Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: framework checkout detection now resolves the nearest repo root and local binary from nested cwd with focused regression coverage."
  -
    type: "status"
    at: "2026-03-07T16:50:36.488Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: extracted framework-checkout detection and repo-local binary resolution with focused nested-cwd tests."
doc_version: 2
doc_updated_at: "2026-03-07T16:50:36.488Z"
doc_updated_by: "CODER"
description: "Add framework-checkout detection that can resolve the nearest agentplane repo root from any nested cwd and identify the matching repo-local binary for handoff."
id_source: "generated"
---
## Summary

Detect framework checkout and prefer repo-local agentplane

Add framework-checkout detection that can resolve the nearest agentplane repo root from any nested cwd and identify the matching repo-local binary for handoff.

## Scope

- In scope: Add framework-checkout detection that can resolve the nearest agentplane repo root from any nested cwd and identify the matching repo-local binary for handoff..
- Out of scope: unrelated refactors not required for "Detect framework checkout and prefer repo-local agentplane".

## Plan

1. Extract a helper that can detect the nearest framework checkout from any cwd by walking ancestors. 2. Resolve the matching repo-local agentplane binary and expose whether the current process is already that binary. 3. Add focused tests for repo-root and nested-cwd detection without changing runtime handoff yet.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- Add explicit checks/commands for this task before approval.

### Evidence / Commands
- Record executed commands and key outputs.

### Pass criteria
- Steps are reproducible and produce expected results.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-07T16:50:36.279Z — VERIFY — ok

By: REVIEWER

Note: Verified: framework checkout detection now resolves the nearest repo root and local binary from nested cwd with focused regression coverage.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T16:47:51.853Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
