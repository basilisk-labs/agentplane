---
id: "202603080540-RH0T06"
title: "P0: refactor release apply into explicit state machine helpers"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T06:04:07.621Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T06:08:39.807Z"
  updated_by: "CODER"
  note: "Release apply was refactored into explicit preflight, mutation, reporting, and orchestration helpers. Release apply tests and release plan tests passed, lint passed, TypeScript noEmit passed, and agentplane build passed while preserving the release push/report contract."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extracting release apply into explicit preflight, mutation, report, and push/publish helpers while keeping release semantics stable."
events:
  -
    type: "status"
    at: "2026-03-08T06:04:07.918Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extracting release apply into explicit preflight, mutation, report, and push/publish helpers while keeping release semantics stable."
  -
    type: "verify"
    at: "2026-03-08T06:08:39.807Z"
    author: "CODER"
    state: "ok"
    note: "Release apply was refactored into explicit preflight, mutation, reporting, and orchestration helpers. Release apply tests and release plan tests passed, lint passed, TypeScript noEmit passed, and agentplane build passed while preserving the release push/report contract."
doc_version: 2
doc_updated_at: "2026-03-08T06:08:39.808Z"
doc_updated_by: "CODER"
description: "Decompose release apply into preflight, version mutation, artifact sync, commit/tag, and push/publish helpers to reduce orchestration risk and improve recovery clarity."
id_source: "generated"
---
## Summary

P0: refactor release apply into explicit state machine helpers

Decompose release apply into preflight, version mutation, artifact sync, commit/tag, and push/publish helpers to reduce orchestration risk and improve recovery clarity.

## Scope

- In scope: Decompose release apply into preflight, version mutation, artifact sync, commit/tag, and push/publish helpers to reduce orchestration risk and improve recovery clarity..
- Out of scope: unrelated refactors not required for "P0: refactor release apply into explicit state machine helpers".

## Plan

1. Inventory the current release apply flow and identify stable state boundaries: preflight, version/artifact mutation, commit/tag creation, push/publish, and recovery reporting. 2. Extract those boundaries into dedicated helpers while preserving current release semantics and existing safeguards. 3. Run targeted release apply tests, lint, build, and release-grade validation to confirm no behavioral drift.

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
#### 2026-03-08T06:08:39.807Z — VERIFY — ok

By: CODER

Note: Release apply was refactored into explicit preflight, mutation, reporting, and orchestration helpers. Release apply tests and release plan tests passed, lint passed, TypeScript noEmit passed, and agentplane build passed while preserving the release push/report contract.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T06:04:07.918Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
