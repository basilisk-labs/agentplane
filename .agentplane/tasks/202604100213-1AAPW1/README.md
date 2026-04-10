---
id: "202604100213-1AAPW1"
title: "Seed approvable Verify Steps for verify-required task scaffolds"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-10T02:14:50.217Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: make verify-required task scaffolds immediately approvable by replacing placeholder Verify Steps with concrete acceptance steps, then cover new/derive paths with focused tests."
events:
  -
    type: "status"
    at: "2026-04-10T02:31:00.987Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make verify-required task scaffolds immediately approvable by replacing placeholder Verify Steps with concrete acceptance steps, then cover new/derive paths with focused tests."
doc_version: 3
doc_updated_at: "2026-04-10T02:31:00.993Z"
doc_updated_by: "CODER"
description: "Verify-required task scaffolds currently seed a placeholder Verify Steps block that immediately fails plan approval. Generate concrete acceptance steps from the primary tag and any explicit verify commands so a freshly scaffolded task is reviewable without manual README surgery."
sections:
  Summary: |-
    Seed approvable Verify Steps for verify-required task scaffolds
    
    Verify-required task scaffolds currently seed a placeholder Verify Steps block that immediately fails plan approval. Generate concrete acceptance steps from the primary tag and any explicit verify commands so a freshly scaffolded task is reviewable without manual README surgery.
  Scope: |-
    - In scope: Verify-required task scaffolds currently seed a placeholder Verify Steps block that immediately fails plan approval. Generate concrete acceptance steps from the primary tag and any explicit verify commands so a freshly scaffolded task is reviewable without manual README surgery.
    - Out of scope: unrelated refactors not required for "Seed approvable Verify Steps for verify-required task scaffolds".
  Plan: "1. Inspect verify-required task scaffolding and the plan-approval gate to isolate why the seeded Verify Steps block is born in an unapprovable placeholder state. 2. Replace the placeholder-only seed with concrete acceptance steps derived from the primary tag and any explicit verify commands so fresh scaffolds are immediately reviewable. 3. Add focused regression coverage for task new/derive plus plan approve on verify-required tasks, then rerun the touched test/lint slice."
  Verify Steps: |-
    1. Create or derive a verify-required task and approve its plan without manually rewriting README sections. Expected: plan approval succeeds with the scaffolded Verify Steps as-is.
    2. Run the focused task new/derive plus plan-approve regression slice for verify-required tasks. Expected: the scaffolded Verify Steps stay actionable and tests pass.
    3. Inspect the seeded Verify Steps text. Expected: it contains concrete acceptance steps and no placeholder marker.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Seed approvable Verify Steps for verify-required task scaffolds

Verify-required task scaffolds currently seed a placeholder Verify Steps block that immediately fails plan approval. Generate concrete acceptance steps from the primary tag and any explicit verify commands so a freshly scaffolded task is reviewable without manual README surgery.

## Scope

- In scope: Verify-required task scaffolds currently seed a placeholder Verify Steps block that immediately fails plan approval. Generate concrete acceptance steps from the primary tag and any explicit verify commands so a freshly scaffolded task is reviewable without manual README surgery.
- Out of scope: unrelated refactors not required for "Seed approvable Verify Steps for verify-required task scaffolds".

## Plan

1. Inspect verify-required task scaffolding and the plan-approval gate to isolate why the seeded Verify Steps block is born in an unapprovable placeholder state. 2. Replace the placeholder-only seed with concrete acceptance steps derived from the primary tag and any explicit verify commands so fresh scaffolds are immediately reviewable. 3. Add focused regression coverage for task new/derive plus plan approve on verify-required tasks, then rerun the touched test/lint slice.

## Verify Steps

1. Create or derive a verify-required task and approve its plan without manually rewriting README sections. Expected: plan approval succeeds with the scaffolded Verify Steps as-is.
2. Run the focused task new/derive plus plan-approve regression slice for verify-required tasks. Expected: the scaffolded Verify Steps stay actionable and tests pass.
3. Inspect the seeded Verify Steps text. Expected: it contains concrete acceptance steps and no placeholder marker.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
