---
id: "202606042325-S2SCRB"
title: "Prepare v0.6.17 release candidate"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "publish"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-04T23:25:36.498Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: prepare v0.6.17 release candidate from checked main head 693430900."
events:
  -
    type: "status"
    at: "2026-06-04T23:25:48.488Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare v0.6.17 release candidate from checked main head 693430900."
doc_version: 3
doc_updated_at: "2026-06-04T23:25:48.488Z"
doc_updated_by: "CODER"
description: "Prepare and merge the v0.6.17 patch release candidate after the cognitive-load refactor and release notes/social assets are complete."
sections:
  Summary: |-
    Prepare v0.6.17 release candidate

    Prepare and merge the v0.6.17 patch release candidate after the cognitive-load refactor and release notes/social assets are complete.
  Scope: |-
    - In scope: Prepare and merge the v0.6.17 patch release candidate after the cognitive-load refactor and release notes/social assets are complete.
    - Out of scope: unrelated refactors not required for "Prepare v0.6.17 release candidate".
  Plan: "Prepare v0.6.17 patch release candidate from the checked main head after all refactor, release notes, and social asset tasks are DONE. Use a dedicated branch_pr worktree, run release candidate --push --yes, merge the candidate PR after required checks, then publish v0.6.17 from the exact release commit SHA and verify GitHub Release plus npm package versions."
  Verify Steps: |-
    PLANNER fallback scaffold for "Prepare v0.6.17 release candidate". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Prepare v0.6.17 release candidate". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Prepare v0.6.17 release candidate

Prepare and merge the v0.6.17 patch release candidate after the cognitive-load refactor and release notes/social assets are complete.

## Scope

- In scope: Prepare and merge the v0.6.17 patch release candidate after the cognitive-load refactor and release notes/social assets are complete.
- Out of scope: unrelated refactors not required for "Prepare v0.6.17 release candidate".

## Plan

Prepare v0.6.17 patch release candidate from the checked main head after all refactor, release notes, and social asset tasks are DONE. Use a dedicated branch_pr worktree, run release candidate --push --yes, merge the candidate PR after required checks, then publish v0.6.17 from the exact release commit SHA and verify GitHub Release plus npm package versions.

## Verify Steps

PLANNER fallback scaffold for "Prepare v0.6.17 release candidate". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Prepare v0.6.17 release candidate". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
