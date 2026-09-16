---
id: "202609170039-R630"
title: "Fix v0.6.30 distribution recovery checkout"
status: "TODO"
priority: "high"
owner: "ORCHESTRATOR"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
  - "workflow"
  - "recovery"
verify:
  - "bun run workflows:lint"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-09-16T21:40:36.718Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-09-16T21:40:36.505Z"
doc_updated_by: "ORCHESTRATOR"
description: "Make the maintenance distribution recovery workflow skip the unavailable marketing submodule so the exact-SHA v0.6.30 release can complete through its official recovery lane."
sections:
  Summary: |-
    Fix v0.6.30 distribution recovery checkout

    Make the maintenance distribution recovery workflow skip the unavailable marketing submodule so the exact-SHA v0.6.30 release can complete through its official recovery lane.
  Scope: |-
    - In scope: Make the maintenance distribution recovery workflow skip the unavailable marketing submodule so the exact-SHA v0.6.30 release can complete through its official recovery lane.
    - Out of scope: unrelated refactors not required for "Fix v0.6.30 distribution recovery checkout".
  Plan: |-
    1. Change only .github/workflows/publish-distribution-module.yml so checkout does not recurse into optional submodules.
    2. Verify workflow contracts with bun run workflows:lint and git diff --check.
    3. Publish the narrow task PR to codex/release-v0.6.27-reclaim-fix, wait for hosted checks, merge it, then rerun v0.6.30 distribution recovery at exact SHA b44f555a14e1dad9a44368027f02d522e94c93fa.
  Verify Steps: |-
    PLANNER fallback scaffold for "Fix v0.6.30 distribution recovery checkout". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Fix v0.6.30 distribution recovery checkout". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "explicit"
---
## Summary

Fix v0.6.30 distribution recovery checkout

Make the maintenance distribution recovery workflow skip the unavailable marketing submodule so the exact-SHA v0.6.30 release can complete through its official recovery lane.

## Scope

- In scope: Make the maintenance distribution recovery workflow skip the unavailable marketing submodule so the exact-SHA v0.6.30 release can complete through its official recovery lane.
- Out of scope: unrelated refactors not required for "Fix v0.6.30 distribution recovery checkout".

## Plan

1. Change only .github/workflows/publish-distribution-module.yml so checkout does not recurse into optional submodules.
2. Verify workflow contracts with bun run workflows:lint and git diff --check.
3. Publish the narrow task PR to codex/release-v0.6.27-reclaim-fix, wait for hosted checks, merge it, then rerun v0.6.30 distribution recovery at exact SHA b44f555a14e1dad9a44368027f02d522e94c93fa.

## Verify Steps

PLANNER fallback scaffold for "Fix v0.6.30 distribution recovery checkout". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Fix v0.6.30 distribution recovery checkout". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
