---
id: "202605031908-1D4BT9"
title: "T07: Promote ACR in root README"
status: "TODO"
priority: "high"
owner: "DOCS"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605031908-ZHHV9H"
tags:
  - "docs"
  - "readme"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:08:33.016Z"
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
doc_updated_at: "2026-05-03T19:08:32.533Z"
doc_updated_by: "PLANNER"
description: "Add the What is an ACR section to root README with generate, validate, and check commands."
sections:
  Summary: |-
    T07: Promote ACR in root README

    Add the What is an ACR section to root README with generate, validate, and check commands.
  Scope: |-
    - In scope: Add the What is an ACR section to root README with generate, validate, and check commands.
    - Out of scope: unrelated refactors not required for "T07: Promote ACR in root README".
  Plan: "Insert the ACR section between artifact description and first task flow without bloating the README hero, then verify grep and markdown placement."
  Verify Steps: |-
    1. Review the requested outcome for "T07: Promote ACR in root README". Expected: the visible result matches ## Summary and stays inside approved scope.
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

T07: Promote ACR in root README

Add the What is an ACR section to root README with generate, validate, and check commands.

## Scope

- In scope: Add the What is an ACR section to root README with generate, validate, and check commands.
- Out of scope: unrelated refactors not required for "T07: Promote ACR in root README".

## Plan

Insert the ACR section between artifact description and first task flow without bloating the README hero, then verify grep and markdown placement.

## Verify Steps

1. Review the requested outcome for "T07: Promote ACR in root README". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
