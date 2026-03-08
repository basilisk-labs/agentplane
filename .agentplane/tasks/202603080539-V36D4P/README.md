---
id: "202603080539-V36D4P"
title: "Plan structural refactor roadmap for high-ROI hotspots"
status: "DOING"
priority: "high"
owner: "PLANNER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T05:39:39.310Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T05:46:31.643Z"
  updated_by: "PLANNER"
  note: "Atomic refactor roadmap was created as repository tasks: doctor modularization, upgrade split, release-apply split, quality-gate split, run-cli decomposition, task-shared decomposition, and doctor performance optimization."
commit: null
comments:
  -
    author: "PLANNER"
    body: "Start: define the atomic refactor roadmap in repository tasks and hand off execution to the first bounded implementation task."
events:
  -
    type: "status"
    at: "2026-03-08T05:39:43.457Z"
    author: "PLANNER"
    from: "TODO"
    to: "DOING"
    note: "Start: define the atomic refactor roadmap in repository tasks and hand off execution to the first bounded implementation task."
  -
    type: "verify"
    at: "2026-03-08T05:46:31.643Z"
    author: "PLANNER"
    state: "ok"
    note: "Atomic refactor roadmap was created as repository tasks: doctor modularization, upgrade split, release-apply split, quality-gate split, run-cli decomposition, task-shared decomposition, and doctor performance optimization."
doc_version: 2
doc_updated_at: "2026-03-08T05:46:31.644Z"
doc_updated_by: "PLANNER"
description: "Create an atomic task graph for targeted refactors of upgrade, release apply, doctor, run-cli, task shared utilities, and local quality gates; then start implementation from the highest-ROI low-risk item."
id_source: "generated"
---
## Summary

Plan structural refactor roadmap for high-ROI hotspots

Create an atomic task graph for targeted refactors of upgrade, release apply, doctor, run-cli, task shared utilities, and local quality gates; then start implementation from the highest-ROI low-risk item.

## Scope

- In scope: Create an atomic task graph for targeted refactors of upgrade, release apply, doctor, run-cli, task shared utilities, and local quality gates; then start implementation from the highest-ROI low-risk item..
- Out of scope: unrelated refactors not required for "Plan structural refactor roadmap for high-ROI hotspots".

## Plan

1. Capture a linear refactor roadmap for the current high-ROI hotspots: upgrade, release apply, doctor, run-cli, task shared helpers, and pre-push/doctor performance. 2. Create one atomic repository task per hotspot with explicit scope boundaries so each unit can ship independently. 3. Start implementation with the smallest high-value refactor that reduces orchestration complexity without changing user-facing behavior: doctor module extraction and archive-check isolation.

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
#### 2026-03-08T05:46:31.643Z — VERIFY — ok

By: PLANNER

Note: Atomic refactor roadmap was created as repository tasks: doctor modularization, upgrade split, release-apply split, quality-gate split, run-cli decomposition, task-shared decomposition, and doctor performance optimization.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T05:39:43.457Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
