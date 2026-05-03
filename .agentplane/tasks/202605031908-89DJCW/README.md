---
id: "202605031908-89DJCW"
title: "T11: Add ACR to homepage artifact tree"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605031908-ZHHV9H"
tags:
  - "frontend"
  - "website"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:08:47.103Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-03T19:08:46.722Z"
doc_updated_by: "PLANNER"
description: "Show acr.json in homepage artifacts and add a bullet explaining the open stable schema."
sections:
  Summary: |-
    T11: Add ACR to homepage artifact tree

    Show acr.json in homepage artifacts and add a bullet explaining the open stable schema.
  Scope: |-
    - In scope: Show acr.json in homepage artifacts and add a bullet explaining the open stable schema.
    - Out of scope: unrelated refactors not required for "T11: Add ACR to homepage artifact tree".
  Plan: "Update website/src/data/homepage-content.ts artifact tree and bullet copy, then verify source and site checks."
  Verify Steps: |-
    1. Review the requested outcome for "T11: Add ACR to homepage artifact tree". Expected: the visible result matches ## Summary and stays inside approved scope.
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

T11: Add ACR to homepage artifact tree

Show acr.json in homepage artifacts and add a bullet explaining the open stable schema.

## Scope

- In scope: Show acr.json in homepage artifacts and add a bullet explaining the open stable schema.
- Out of scope: unrelated refactors not required for "T11: Add ACR to homepage artifact tree".

## Plan

Update website/src/data/homepage-content.ts artifact tree and bullet copy, then verify source and site checks.

## Verify Steps

1. Review the requested outcome for "T11: Add ACR to homepage artifact tree". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
