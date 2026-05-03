---
id: "202605031909-7WXAF0"
title: "T21: Fix site webmanifest color drift"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "manifest"
  - "website"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:09:16.760Z"
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
    at: "2026-05-03T19:30:10.923Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: executing this approved launch backlog atom inside the primary ACR launch branch_pr worktree with scoped verification evidence."
doc_version: 3
doc_updated_at: "2026-05-03T19:30:10.923Z"
doc_updated_by: "CODER"
description: "Align site.webmanifest theme color and description with DESIGN.md and launch positioning."
sections:
  Summary: |-
    T21: Fix site webmanifest color drift

    Align site.webmanifest theme color and description with DESIGN.md and launch positioning.
  Scope: |-
    - In scope: Align site.webmanifest theme color and description with DESIGN.md and launch positioning.
    - Out of scope: unrelated refactors not required for "T21: Fix site webmanifest color drift".
  Plan: "Update manifest theme_color and description, then verify source values."
  Verify Steps: |-
    1. Review the requested outcome for "T21: Fix site webmanifest color drift". Expected: the visible result matches ## Summary and stays inside approved scope.
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

T21: Fix site webmanifest color drift

Align site.webmanifest theme color and description with DESIGN.md and launch positioning.

## Scope

- In scope: Align site.webmanifest theme color and description with DESIGN.md and launch positioning.
- Out of scope: unrelated refactors not required for "T21: Fix site webmanifest color drift".

## Plan

Update manifest theme_color and description, then verify source values.

## Verify Steps

1. Review the requested outcome for "T21: Fix site webmanifest color drift". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
