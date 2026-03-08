---
id: "202603081006-32D0Y2"
title: "Detect legacy and mixed task README formats in doctor"
result_summary: "Added doctor diagnostics for legacy and mixed README v2/v3 states, with targeted tests and actionable migration guidance for old or partially migrated projects."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on:
  - "202603081006-SDFADJ"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T11:23:59.919Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T11:27:34.854Z"
  updated_by: "CODER"
  note: "Doctor now reports legacy and mixed README migration state with exact next action. Targeted doctor tests and build passed; repository doctor emits the new warning as expected because the task archive is not yet migrated to README v3."
commit:
  hash: "95813d1e42f403d1d596ff468a6f548cc857f5b8"
  message: "🩺 32D0Y2 task: detect legacy README migration drift"
comments:
  -
    author: "CODER"
    body: "Start: add doctor diagnostics for legacy and mixed task README formats so README v3 rollout is actionable on old or partially migrated projects."
  -
    author: "CODER"
    body: "Verified: doctor now detects legacy and mixed task README migration drift, emits exact task migrate-doc next actions, and distinguishes active drift from archive-only leftovers."
events:
  -
    type: "status"
    at: "2026-03-08T11:24:05.140Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add doctor diagnostics for legacy and mixed task README formats so README v3 rollout is actionable on old or partially migrated projects."
  -
    type: "verify"
    at: "2026-03-08T11:27:34.854Z"
    author: "CODER"
    state: "ok"
    note: "Doctor now reports legacy and mixed README migration state with exact next action. Targeted doctor tests and build passed; repository doctor emits the new warning as expected because the task archive is not yet migrated to README v3."
  -
    type: "status"
    at: "2026-03-08T11:27:53.947Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: doctor now detects legacy and mixed task README migration drift, emits exact task migrate-doc next actions, and distinguishes active drift from archive-only leftovers."
doc_version: 3
doc_updated_at: "2026-03-08T11:27:53.947Z"
doc_updated_by: "CODER"
description: "Surface legacy v2 and mixed v2/v3 task README states in doctor with exact migration next actions."
id_source: "generated"
---
## Summary

Detect legacy and mixed task README formats in doctor

Surface legacy v2 and mixed v2/v3 task README states in doctor with exact migration next actions.

## Scope

- In scope: Surface legacy v2 and mixed v2/v3 task README states in doctor with exact migration next actions..
- Out of scope: unrelated refactors not required for "Detect legacy and mixed task README formats in doctor".

## Plan

1. Extend doctor to detect legacy README v2 tasks and mixed v2/v3 task-doc states after the README v3 rollout, with exact next actions instead of silent drift. 2. Add focused doctor coverage for legacy-only, mixed, and already-migrated workspaces so the signal stays actionable and non-noisy. 3. Run targeted doctor tests plus build and doctor, then verify, finish, and push main.

## Verify Steps

1. Run doctor on a workspace with only legacy doc_version=2 task READMEs. Expected: doctor reports a precise README migration next action instead of a generic or silent state. 2. Run doctor on a mixed v2/v3 workspace. Expected: doctor distinguishes mixed-state migration drift from a fully migrated repository. 3. Run targeted doctor tests, builds, and doctor. Expected: README migration diagnostics pass without adding noisy findings to already-normalized workspaces.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T11:27:34.854Z — VERIFY — ok

By: CODER

Note: Doctor now reports legacy and mixed README migration state with exact next action. Targeted doctor tests and build passed; repository doctor emits the new warning as expected because the task archive is not yet migrated to README v3.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T11:24:05.140Z, excerpt_hash=sha256:019d0221ad7d6837ba8b768976df8909633c1c613091d92553f40292c795ddc8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings


## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.
