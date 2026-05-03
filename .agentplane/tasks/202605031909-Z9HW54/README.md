---
id: "202605031909-Z9HW54"
title: "T16: Add trust badge row to root README"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "readme"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:09:01.663Z"
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
    body: "Start: executing this approved launch backlog atom inside the primary ACR launch branch_pr worktree with scoped verification evidence."
events:
  -
    type: "status"
    at: "2026-05-03T19:30:08.730Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: executing this approved launch backlog atom inside the primary ACR launch branch_pr worktree with scoped verification evidence."
doc_version: 3
doc_updated_at: "2026-05-03T19:30:08.730Z"
doc_updated_by: "CODER"
description: "Expose SLSA v1 provenance, trusted publisher, and Ed25519 recipes badges in root README."
sections:
  Summary: |-
    T16: Add trust badge row to root README

    Expose SLSA v1 provenance, trusted publisher, and Ed25519 recipes badges in root README.
  Scope: |-
    - In scope: Expose SLSA v1 provenance, trusted publisher, and Ed25519 recipes badges in root README.
    - Out of scope: unrelated refactors not required for "T16: Add trust badge row to root README".
  Plan: "Add the badge row below existing badges and verify markdown links/source."
  Verify Steps: |-
    1. Review the requested outcome for "T16: Add trust badge row to root README". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

T16: Add trust badge row to root README

Expose SLSA v1 provenance, trusted publisher, and Ed25519 recipes badges in root README.

## Scope

- In scope: Expose SLSA v1 provenance, trusted publisher, and Ed25519 recipes badges in root README.
- Out of scope: unrelated refactors not required for "T16: Add trust badge row to root README".

## Plan

Add the badge row below existing badges and verify markdown links/source.

## Verify Steps

1. Review the requested outcome for "T16: Add trust badge row to root README". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
